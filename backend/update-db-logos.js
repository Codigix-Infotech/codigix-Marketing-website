import { query, closeDb, dialect } from './src/config/db.js';
import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

const clientLogoUpdates = [
  { id: 1, logo: '/uploads/clients/sheetals-glow.webp' },
  { id: 2, logo: '/uploads/clients/smiles-for-all.webp' },
  { id: 3, logo: '/uploads/clients/aayurlekha.webp' },
  { id: 4, logo: '/uploads/clients/corplegal.webp' },
  { id: 5, logo: '/uploads/clients/dr-shagun-rao.webp' },
  { id: 6, logo: '/uploads/clients/shriraj-clinic.webp' },
  { id: 7, logo: '/uploads/clients/sanskruti-agro-farm.webp' },
  { id: 8, logo: '/uploads/clients/morya.webp' },
  { id: 9, logo: '/uploads/clients/canopy.webp' },
  { id: 10, logo: '/uploads/clients/kimaya.webp' },
  { id: 11, logo: '/uploads/clients/bakul.webp' },
  { id: 12, logo: '/uploads/clients/kitchen-canvas.webp' },
  { id: 13, logo: '/uploads/clients/regain.webp' },
  { id: 14, logo: '/uploads/clients/shushrut.webp' },
  { id: 15, logo: '/uploads/clients/shushrut.webp' },
  { id: 16, logo: '/uploads/clients/shushrut.webp' },
  { id: 17, logo: '/uploads/clients/viranjany.webp' },
];

async function updateDb() {
  console.log('Updating active database (' + dialect + ')...');
  for (const item of clientLogoUpdates) {
    await query('UPDATE clients SET logo = ? WHERE id = ?', [item.logo, item.id]);
  }
  console.log('Updated ' + clientLogoUpdates.length + ' clients in ' + dialect);

  // Also update sqlite if codigix.db exists
  const sqlitePath = path.resolve('data/codigix.db');
  if (fs.existsSync(sqlitePath)) {
    try {
      const sqlite = new Database(sqlitePath);
      const stmt = sqlite.prepare('UPDATE clients SET logo = ? WHERE id = ?');
      for (const item of clientLogoUpdates) {
        stmt.run(item.logo, item.id);
      }
      sqlite.close();
      console.log('Updated clients in SQLite database as well.');
    } catch (e) {
      console.warn('SQLite update note:', e.message);
    }
  }

  await closeDb();
}

updateDb().catch(err => {
  console.error(err);
  process.exit(1);
});
