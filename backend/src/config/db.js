import mysql from 'mysql2/promise';
import env from './env.js';
import { createSqlite } from './sqlite.js';

/**
 * Database access used by every route: `query()`, `one()`, `transaction()`.
 * DB_CLIENT=sqlite (default, zero setup, file in backend/data/) or DB_CLIENT=mysql.
 */
export const dialect = env.db.client;

let sqlite = null;
let mysqlPool = null;

if (dialect === 'mysql') {
  mysqlPool = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    charset: 'utf8mb4',
    timezone: 'Z',
  });
  // Store and compare all DATETIMEs in UTC regardless of the MySQL server's time zone.
  mysqlPool.pool.on('connection', (conn) => {
    conn.query("SET time_zone = '+00:00'");
  });
} else {
  sqlite = createSqlite(env.db.sqliteFile);
}

export async function query(sql, params = []) {
  if (sqlite) return sqlite.query(sql, params);
  const [rows] = await mysqlPool.query(sql, params);
  return rows;
}

export async function one(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] || null;
}

export async function transaction(fn) {
  if (sqlite) return sqlite.transaction(fn);
  const conn = await mysqlPool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

/** Run raw DDL (used by migrations). */
export async function execSchema(statements) {
  if (sqlite) {
    for (const s of statements) sqlite.exec(s);
    return;
  }
  for (const s of statements) await mysqlPool.query(s);
}

/** Create the MySQL database itself if it does not exist yet (no-op for SQLite). */
export async function ensureDatabase() {
  if (dialect !== 'mysql') return;
  try {
    const conn = await mysql.createConnection({
      host: env.db.host,
      port: env.db.port,
      user: env.db.user,
      password: env.db.password,
    });
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${env.db.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await conn.end();
  } catch (err) {
    // If user lacks CREATE DATABASE privilege (e.g. non-root user like 'marketing_user'),
    // check if the database already exists and can be accessed directly.
    try {
      const directConn = await mysql.createConnection({
        host: env.db.host,
        port: env.db.port,
        user: env.db.user,
        password: env.db.password,
        database: env.db.database,
      });
      await directConn.end();
    } catch (directErr) {
      throw new Error(`Cannot connect to MySQL database "${env.db.database}" on ${env.db.host}:${env.db.port} as "${env.db.user}": ${directErr.message}`);
    }
  }
}

export async function closeDb() {
  if (sqlite) return sqlite.close();
  return mysqlPool.end();
}
