import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { one } from '../config/db.js';
import { forbidden, unauthorized } from '../utils/httpError.js';

export function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export async function requireAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) throw unauthorized();

  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch {
    throw unauthorized('Your session has expired. Please sign in again.');
  }

  // Re-read the user so deactivated accounts and role changes take effect immediately.
  const user = await one('SELECT id, name, email, role, avatar, is_active FROM users WHERE id = ?', [payload.sub]);
  if (!user || !user.is_active) throw unauthorized('Account is disabled');
  req.user = user;
  next();
}

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) throw forbidden();
  next();
};
