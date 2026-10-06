import { pathToFileURL } from 'node:url';
import { closeDb, dialect, ensureDatabase, execSchema, query } from '../config/db.js';
import { schema } from './schema.js';
import { sqliteSchema } from './schema.sqlite.js';

/**
 * Columns added after a table was first created. `CREATE TABLE IF NOT EXISTS` never alters an
 * existing table, so each one is added here if missing. Add-only and idempotent: safe on every start.
 */
const addedColumns = [
  // table, column, MySQL type, SQLite type
  ['blogs', 'custom_schema', 'TEXT NULL', 'TEXT'],
  ['blogs', 'author_url', 'VARCHAR(500) NULL', 'TEXT'],
  ['blogs', 'reviewed_by', 'VARCHAR(160) NULL', 'TEXT'],
  ['blogs', 'reviewer_credentials', 'VARCHAR(160) NULL', 'TEXT'],
  ['blogs', 'last_reviewed_at', 'DATETIME NULL', 'TEXT'],
];

async function ensureColumns(log) {
  for (const [table, column, mysqlType, sqliteType] of addedColumns) {
    const existing =
      dialect === 'mysql'
        ? (await query(`SHOW COLUMNS FROM ${table}`)).map((c) => c.Field)
        : (await query(`PRAGMA table_info(${table})`)).map((c) => c.name);
    if (existing.includes(column)) continue;
    await query(`ALTER TABLE ${table} ADD COLUMN ${column} ${dialect === 'mysql' ? mysqlType : sqliteType}`);
    if (log) console.log(`[db] added column ${table}.${column}`);
  }
}

export async function runMigrations({ log = true } = {}) {
  await ensureDatabase();
  const statements = dialect === 'mysql' ? schema : sqliteSchema;
  await execSchema(statements);
  await ensureColumns(log);
  if (log) console.log(`[db] ${dialect} schema ready`);
}

// Allow `node src/db/migrate.js`
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runMigrations()
    .then(() => closeDb())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
