import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const env = {
  root,
  port: Number(process.env.PORT || 5000),
  isProd: process.env.NODE_ENV === 'production',
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:3002')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  apiPublicUrl: (process.env.API_PUBLIC_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, ''),
  db: {
    // sqlite (default, no setup) or mysql
    client: (process.env.DB_CLIENT || 'sqlite').toLowerCase() === 'mysql' ? 'mysql' : 'sqlite',
    sqliteFile: path.resolve(root, process.env.SQLITE_FILE || 'data/codigix.db'),
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'codigix_cms',
  },
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  admin: {
    name: process.env.ADMIN_NAME || 'Codigix Admin',
    email: process.env.ADMIN_EMAIL || 'admin@codigix.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@12345',
  },
  siteUrl: (process.env.SITE_URL || 'http://localhost:3002').replace(/\/$/, ''),
  revalidateSecret: process.env.REVALIDATE_SECRET || '',
  uploadDir: path.join(root, 'uploads'),
  privateUploadDir: path.join(root, 'private_uploads'),
  maxImageBytes: Number(process.env.MAX_IMAGE_MB || 8) * 1024 * 1024,
  maxResumeBytes: Number(process.env.MAX_RESUME_MB || 5) * 1024 * 1024,
};

if (!env.jwtSecret || (env.isProd && env.jwtSecret.startsWith('change-me'))) {
  if (env.isProd) {
    throw new Error('JWT_SECRET must be set to a strong random value in production');
  }
  env.jwtSecret = env.jwtSecret || 'dev-only-insecure-secret';
}

export default env;
