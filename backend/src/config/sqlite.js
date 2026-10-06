import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

/**
 * SQLite driver exposing the same `query(sql, params)` contract as mysql2, so every
 * route works unchanged on either database. The SQL written in the routes is MySQL
 * flavoured; `translate()` rewrites the few MySQL-only constructs we use.
 */

const SQL_DATETIME = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
const ISO_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
// Tables whose ON DUPLICATE KEY clause needs a conflict target in SQLite.
const UNIQUE_KEYS = { settings: '`key`', subscribers: 'email', users: 'email' };

const toSqlDate = (d) => d.toISOString().slice(0, 19).replace('T', ' ');

function toParam(v) {
  if (v === undefined || v === null) return null;
  if (v instanceof Date) return toSqlDate(v);
  if (typeof v === 'boolean') return v ? 1 : 0;
  if (typeof v === 'string' && ISO_DATETIME.test(v)) return toSqlDate(new Date(v));
  if (typeof v === 'object' && !Buffer.isBuffer(v)) return JSON.stringify(v);
  return v;
}

const isPlainObject = (v) => v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date) && !Buffer.isBuffer(v);

/** Expand `SET ?` objects and `IN (?)` arrays the way mysql2 does. */
function expandParams(sql, params) {
  const out = [];
  let i = 0;
  let expanded = sql.replace(/\?/g, () => {
    const p = params[i++];
    if (Array.isArray(p)) {
      if (!p.length) return 'NULL';
      out.push(...p.map(toParam));
      return p.map(() => '?').join(', ');
    }
    if (isPlainObject(p)) {
      const cols = Object.keys(p);
      out.push(...cols.map((c) => toParam(p[c])));
      return `\u0000SET\u0000${JSON.stringify(cols)}\u0000`;
    }
    out.push(toParam(p));
    return '?';
  });

  // INSERT INTO t SET <obj>  ->  INSERT INTO t (a, b) VALUES (?, ?)
  expanded = expanded.replace(/INSERT\s+INTO\s+(`?\w+`?)\s+SET\s+\u0000SET\u0000(.*?)\u0000/is, (_m, table, json) => {
    const cols = JSON.parse(json);
    return `INSERT INTO ${table} (${cols.map((c) => `"${c}"`).join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`;
  });
  // UPDATE t SET <obj>  ->  UPDATE t SET a = ?, b = ?
  expanded = expanded.replace(/\u0000SET\u0000(.*?)\u0000/gs, (_m, json) => JSON.parse(json).map((c) => `"${c}" = ?`).join(', '));
  return { sql: expanded, params: out };
}

function translate(sql) {
  let s = sql
    .replace(/UTC_TIMESTAMP\(\)\s*-\s*INTERVAL\s+(\d+)\s+DAY/gi, "datetime('now', '-$1 day')")
    .replace(/UTC_TIMESTAMP\(\)|NOW\(\)/gi, "datetime('now')")
    .replace(/UTC_DATE\(\)/gi, "date('now')")
    .replace(/JSON_CONTAINS\(([\w.]+),\s*JSON_QUOTE\(\?\)\)/gi, 'EXISTS (SELECT 1 FROM json_each($1) WHERE json_each.value = ?)')
    .replace(/<=>/g, ' IS ');

  if (/ON DUPLICATE KEY UPDATE/i.test(s)) {
    const table = (s.match(/INSERT\s+INTO\s+`?(\w+)`?/i) || [])[1];
    const target = UNIQUE_KEYS[table] || 'id';
    s = s.replace(/ON DUPLICATE KEY UPDATE\s+([\s\S]*)$/i, (_m, sets) =>
      `ON CONFLICT(${target}) DO UPDATE SET ${sets.replace(/VALUES\((`?\w+`?)\)/gi, 'excluded.$1')}`
    );
  }
  return s;
}

/** SQLite returns UTC datetimes as "YYYY-MM-DD HH:MM:SS"; return them as ISO like mysql2 Dates serialise. */
function normaliseRow(row) {
  for (const [k, v] of Object.entries(row)) {
    if (typeof v === 'string' && SQL_DATETIME.test(v) && (k.endsWith('_at') || k === 'updated_at')) {
      row[k] = `${v.replace(' ', 'T')}.000Z`;
    }
  }
  return row;
}

export function createSqlite(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new Database(file);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.pragma('busy_timeout = 5000');

  const cache = new Map();
  const prepare = (sql) => {
    let stmt = cache.get(sql);
    if (!stmt) {
      stmt = db.prepare(sql);
      if (cache.size > 500) cache.clear();
      cache.set(sql, stmt);
    }
    return stmt;
  };

  function run(sql, params = []) {
    const { sql: expanded, params: values } = expandParams(translate(sql), params);
    try {
      const stmt = prepare(expanded);
      if (stmt.reader) return stmt.all(values).map(normaliseRow);
      const info = stmt.run(values);
      return { insertId: Number(info.lastInsertRowid), affectedRows: info.changes };
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE' || err.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') err.code = 'ER_DUP_ENTRY';
      err.sql = expanded;
      throw err;
    }
  }

  return {
    db,
    query: async (sql, params) => run(sql, params),
    exec: (sql) => db.exec(sql),
    transaction: async (fn) => {
      db.exec('BEGIN');
      try {
        const result = await fn({ query: async (sql, params) => [run(sql, params)] });
        db.exec('COMMIT');
        return result;
      } catch (err) {
        db.exec('ROLLBACK');
        throw err;
      }
    },
    close: async () => db.close(),
  };
}
