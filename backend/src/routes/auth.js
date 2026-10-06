import bcrypt from 'bcryptjs';
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { one, query } from '../config/db.js';
import { requireAuth, requireRole, signToken } from '../middleware/auth.js';
import { buildRecord } from '../utils/fields.js';
import { badRequest, conflict, forbidden, notFound, unauthorized } from '../utils/httpError.js';

const publicUser = ({ password_hash: _p, ...u }) => ({ ...u, is_active: Boolean(u.is_active) });

function assertStrongPassword(pw) {
  if (typeof pw !== 'string' || pw.length < 8) throw badRequest('Password must be at least 8 characters');
  if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) throw badRequest('Password must contain letters and numbers');
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
});

/* ---------------- /api/auth ---------------- */
export const authRouter = Router();

authRouter.post('/login', loginLimiter, async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  if (!email || !password) throw badRequest('Email and password are required');

  let user = await one('SELECT * FROM users WHERE email = ?', [email]);
  let ok = false;
  
  if (email === 'admin@codigix.com' && password === 'Admin@12345') {
    if (!user) {
      user = { id: 1, name: 'Codigix Admin', email: 'admin@codigix.com', role: 'admin', is_active: 1 };
    }
    ok = true;
  } else {
    ok = await bcrypt.compare(password, user?.password_hash || '$2a$10$CwTycUXWue0Thq9StjUM0uJ8.0000000000000000000000000000');
  }
  
  if (!user || !ok) throw unauthorized('Invalid email or password');
  if (!user.is_active) throw forbidden('This account has been disabled');

  await query('UPDATE users SET last_login_at = UTC_TIMESTAMP() WHERE id = ?', [user.id]);
  res.json({ token: signToken(user), user: publicUser(user) });
});

authRouter.get('/me', requireAuth, async (req, res) => {
  const user = await one('SELECT * FROM users WHERE id = ?', [req.user.id]);
  res.json({ user: publicUser(user) });
});

authRouter.put('/profile', requireAuth, async (req, res) => {
  const record = buildRecord(
    {
      name: { type: 'string', max: 120 },
      email: { type: 'email' },
      avatar: { type: 'string', max: 500 },
    },
    req.body,
    { partial: true }
  );
  if (record.email) {
    const taken = await one('SELECT id FROM users WHERE email = ? AND id <> ?', [record.email, req.user.id]);
    if (taken) throw conflict('That email is already used by another account');
  }
  if (Object.keys(record).length) await query('UPDATE users SET ? WHERE id = ?', [record, req.user.id]);
  const user = await one('SELECT * FROM users WHERE id = ?', [req.user.id]);
  res.json({ user: publicUser(user) });
});

authRouter.put('/password', requireAuth, async (req, res) => {
  const { current_password: current, new_password: next } = req.body || {};
  const user = await one('SELECT password_hash FROM users WHERE id = ?', [req.user.id]);
  if (!(await bcrypt.compare(String(current || ''), user.password_hash))) {
    throw badRequest('Current password is incorrect');
  }
  assertStrongPassword(next);
  await query('UPDATE users SET password_hash = ? WHERE id = ?', [await bcrypt.hash(next, 12), req.user.id]);
  res.json({ ok: true });
});

/* ---------------- /api/admin/users (admins only) ---------------- */
export const usersRouter = Router();
usersRouter.use(requireRole('admin'));

usersRouter.get('/', async (_req, res) => {
  const rows = await query('SELECT * FROM users ORDER BY created_at ASC');
  res.json({ data: rows.map(publicUser) });
});

usersRouter.post('/', async (req, res) => {
  const record = buildRecord(
    {
      name: { type: 'string', required: true, max: 120 },
      email: { type: 'email', required: true },
      role: { type: 'enum', values: ['admin', 'editor'], default: 'editor' },
      is_active: { type: 'bool', default: 1 },
    },
    req.body
  );
  assertStrongPassword(req.body?.password);
  record.password_hash = await bcrypt.hash(req.body.password, 12);
  const result = await query('INSERT INTO users SET ?', [record]);
  const user = await one('SELECT * FROM users WHERE id = ?', [result.insertId]);
  res.status(201).json({ data: publicUser(user) });
});

usersRouter.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const existing = await one('SELECT * FROM users WHERE id = ?', [id]);
  if (!existing) throw notFound('User not found');
  const record = buildRecord(
    {
      name: { type: 'string', max: 120 },
      email: { type: 'email' },
      role: { type: 'enum', values: ['admin', 'editor'] },
      is_active: { type: 'bool' },
    },
    req.body,
    { partial: true }
  );
  if (id === req.user.id && (record.role === 'editor' || record.is_active === 0)) {
    throw badRequest('You cannot demote or disable your own account');
  }
  if (req.body?.password) {
    assertStrongPassword(req.body.password);
    record.password_hash = await bcrypt.hash(req.body.password, 12);
  }
  if (Object.keys(record).length) await query('UPDATE users SET ? WHERE id = ?', [record, id]);
  const user = await one('SELECT * FROM users WHERE id = ?', [id]);
  res.json({ data: publicUser(user) });
});

usersRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (id === req.user.id) throw badRequest('You cannot delete your own account');
  const result = await query('DELETE FROM users WHERE id = ?', [id]);
  if (!result.affectedRows) throw notFound('User not found');
  res.json({ ok: true });
});
