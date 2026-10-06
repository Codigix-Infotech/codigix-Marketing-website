import fs from 'node:fs';
import path from 'node:path';
import { createApp } from './app.js';
import env from './config/env.js';
import { closeDb, dialect } from './config/db.js';
import { runMigrations } from './db/migrate.js';
import { seedIfEmpty } from './db/seed.js';

for (const dir of [env.uploadDir, path.join(env.privateUploadDir, 'resumes')]) {
  fs.mkdirSync(dir, { recursive: true });
}

let dbConnected = false;
try {
  await runMigrations();
  // First run on a fresh database: create the admin user and the site's starting content.
  await seedIfEmpty();
  dbConnected = true;
  console.log(`[db] Connected and synchronized to ${dialect.toUpperCase()} (${dialect === 'mysql' ? `${env.db.user}@${env.db.host}:${env.db.port}/${env.db.database}` : env.db.sqliteFile})`);
} catch (err) {
  console.error(`\n--------------------------------------------------------------`);
  console.error(`[db] NOTICE: Could not connect to ${dialect.toUpperCase()}`);
  console.error(`Target: ${dialect === 'mysql' ? `${env.db.user}@${env.db.host}:${env.db.port}/${env.db.database}` : env.db.sqliteFile}`);
  console.error(`Reason: ${err.message}`);
  console.error(`Troubleshooting:`);
  console.error(` 1. Verify MySQL is running on ${env.db.host}:${env.db.port}`);
  console.error(` 2. Ensure database '${env.db.database}' exists or user has privileges`);
  console.error(` 3. Check credentials in backend/.env`);
  console.error(` 4. Test connectivity anytime via: http://localhost:${env.port}/api/health`);
  console.error(`--------------------------------------------------------------\n`);
}

const server = createApp().listen(env.port, () => {
  console.log(`[api] Codigix API listening on http://localhost:${env.port}`);
  console.log(`[api] Database: ${dialect.toUpperCase()} (${dbConnected ? 'ONLINE' : 'CONNECTING/CHECK NEEDED'})`);
});

function shutdown(signal) {
  console.log(`[api] ${signal} received, shutting down`);
  server.close(() => closeDb().finally(() => process.exit(0)));
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
