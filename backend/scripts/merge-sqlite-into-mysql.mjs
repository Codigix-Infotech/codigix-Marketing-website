/**
 * One-off, repeatable merge: copies the content from the local SQLite file (backend/data/codigix.db) into the
 * MySQL database named in backend/.env, so MySQL becomes the single source of truth.
 *
 *   node scripts/merge-sqlite-into-mysql.mjs [--dry-run]
 *
 * - MySQL is backed up to backend/data/backup-mysql-<timestamp>.json first.
 * - Existing MySQL rows are matched by a natural key (slug / youtube_id / name / question / email / key) and
 *   UPDATED with the local values; rows only in MySQL are never deleted; rows only in SQLite are inserted.
 * - Blogs are marked as already announced, so the automatic "new post" newsletter does not email them.
 */
process.env.DB_CLIENT = 'mysql';
import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import env from '../src/config/env.js';
import { closeDb, query } from '../src/config/db.js';
import { runMigrations } from '../src/db/migrate.js';

const dry = process.argv.includes('--dry-run');
const sqlite = new Database(env.db.sqliteFile, { readonly: true });
const src = (t) => sqlite.prepare(`SELECT * FROM ${t}`).all();
const toSqlDate = (v) => {
  if (v == null || v === '') return null;
  const s = String(v);
  const d = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(s) ? s : s.replace(' ', 'T') + 'Z');
  return isNaN(d) ? v : d.toISOString().slice(0, 19).replace('T', ' ');
};

await runMigrations({ log: true });

// ---- backup MySQL ----
const TABLES = ['blog_categories', 'blogs', 'videos', 'testimonials', 'faqs', 'clients', 'jobs', 'settings', 'subscribers', 'newsletters'];
const backup = {};
for (const t of TABLES) backup[t] = await query(`SELECT * FROM \`${t}\``);
const file = path.join(path.dirname(env.db.sqliteFile), `backup-mysql-${Date.now()}.json`);
fs.writeFileSync(file, JSON.stringify(backup));
console.log(`MySQL backup written: ${file}`);

const colsOf = async (t) => (await query(`SHOW COLUMNS FROM \`${t}\``)).map((c) => c.Field);
const DATE_COLS = new Set(['created_at', 'updated_at', 'published_at', 'sent_at', 'welcome_sent_at', 'last_reviewed_at', 'notified_at']);
const report = {};

async function merge(table, keyCol, { transform = (r) => r, only } = {}) {
  const mysqlCols = await colsOf(table);
  const live = await query(`SELECT * FROM \`${table}\``);
  const byKey = new Map(live.map((r) => [String(r[keyCol] ?? '').toLowerCase(), r]));
  const stat = (report[table] = { inserted: 0, updated: 0 });
  for (const raw of src(table)) {
    const row = transform({ ...raw });
    if (!row) continue;
    delete row.id;
    const rec = {};
    for (const c of mysqlCols) {
      if (c === 'id' || !(c in row)) continue;
      let v = row[c];
      if (DATE_COLS.has(c)) v = toSqlDate(v);
      rec[c] = v;
    }
    const hit = byKey.get(String(row[keyCol] ?? '').toLowerCase());
    if (dry) { hit ? stat.updated++ : stat.inserted++; continue; }
    if (hit) {
      delete rec.created_at;
      await query(`UPDATE \`${table}\` SET ? WHERE id = ?`, [rec, hit.id]);
      stat.updated++;
    } else {
      await query(`INSERT INTO \`${table}\` SET ?`, [rec]);
      stat.inserted++;
    }
  }
}

// categories first, so blog category ids can be re-mapped by slug
await merge('blog_categories', 'slug');
const mysqlCats = await query('SELECT id, slug FROM blog_categories');
const catIdBySlug = new Map(mysqlCats.map((c) => [c.slug, c.id]));
const sqliteCatSlug = new Map(src('blog_categories').map((c) => [c.id, c.slug]));

await merge('blogs', 'slug', {
  transform: (b) => {
    b.category_id = catIdBySlug.get(sqliteCatSlug.get(b.category_id)) ?? null;
    b.notified_at = toSqlDate(b.published_at) || toSqlDate(new Date().toISOString());
    return b;
  },
});
await merge('videos', 'youtube_id');
await merge('testimonials', 'name');
await merge('faqs', 'question');
await merge('clients', 'name');
await merge('jobs', 'slug');
await merge('subscribers', 'email');
await merge('newsletters', 'subject');

// settings: key/value JSON
{
  const live = new Map((await query('SELECT `key` FROM settings')).map((r) => [r.key, true]));
  const stat = (report.settings = { inserted: 0, updated: 0 });
  for (const r of src('settings')) {
    if (!dry) await query('INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)', [r.key, typeof r.value === 'string' ? r.value : JSON.stringify(r.value)]);
    live.has(r.key) ? stat.updated++ : stat.inserted++;
  }
}

console.table(report);
console.log(dry ? 'Dry run: nothing was written.' : 'Merge complete.');
sqlite.close();
await closeDb();
