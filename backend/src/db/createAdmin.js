// Usage: npm run create-admin -- "Full Name" email@example.com "StrongPass123"
// Creates the user, or resets the password and re-activates it if the email already exists.
import bcrypt from 'bcryptjs';
import env from '../config/env.js';
import { closeDb, one, query } from '../config/db.js';
import { runMigrations } from './migrate.js';

const [name = env.admin.name, email = env.admin.email, password = env.admin.password] = process.argv.slice(2);

async function main() {
  if (password.length < 8) throw new Error('Password must be at least 8 characters');
  await runMigrations({ log: false });
  const hash = await bcrypt.hash(password, 12);
  const existing = await one('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
  if (existing) {
    await query("UPDATE users SET password_hash = ?, role = 'admin', is_active = 1 WHERE id = ?", [hash, existing.id]);
    console.log(`Updated admin ${email}`);
  } else {
    await query('INSERT INTO users SET ?', [{ name, email: email.toLowerCase(), password_hash: hash, role: 'admin' }]);
    console.log(`Created admin ${email}`);
  }
}

main()
  .catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  })
  .finally(() => closeDb());
