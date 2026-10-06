import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env.js';
import { dialect, query } from './config/db.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import adminRouter from './routes/admin.js';
import { authRouter } from './routes/auth.js';
import publicRouter from './routes/public.js';

export function createApp() {
  const app = express();
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(
    helmet({
      // Images from /uploads are embedded by the website on a different origin.
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );
  app.use(
    cors({
      origin(origin, cb) {
        // Allow server-to-server calls (no Origin header) and configured browsers.
        if (!origin || env.corsOrigins.includes(origin)) return cb(null, true);
        // Allow any localhost/127.0.0.1 port in development mode
        if (!env.isProd && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
          return cb(null, true);
        }
        cb(null, false);
      },
      credentials: true,
    })
  );
  app.use(compression());
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));
  if (!env.isProd) app.use(morgan('dev'));

  app.use(
    '/uploads',
    express.static(env.uploadDir, {
      maxAge: '30d',
      immutable: true,
      fallthrough: false,
      setHeaders: (res) => res.setHeader('X-Content-Type-Options', 'nosniff'),
    })
  );

  // The API host must not show up in search results (JSON, admin endpoints). /uploads stays
  // crawlable: the website's images are served from there and belong in Google Images.
  app.use('/api', (_req, res, next) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    next();
  });
  app.get('/robots.txt', (_req, res) => {
    res.type('text/plain').send('User-agent: *\nDisallow: /api/\nAllow: /uploads/\n');
  });

  // Don't reveal database connection details on a public server.
  const dbTarget = () =>
    env.isProd ? undefined : dialect === 'mysql' ? `${env.db.user}@${env.db.host}:${env.db.port}/${env.db.database}` : env.db.sqliteFile;

  app.get('/api/health', async (_req, res) => {
    try {
      await query('SELECT 1 AS alive');
      res.json({
        ok: true,
        status: 'healthy',
        database: dialect,
        connected: true,
        target: dbTarget(),
        time: new Date().toISOString(),
      });
    } catch (err) {
      res.status(503).json({
        ok: false,
        status: 'database_error',
        database: dialect,
        connected: false,
        target: dbTarget(),
        error: env.isProd ? undefined : err.message,
        time: new Date().toISOString(),
      });
    }
  });
  app.use('/api/auth', authRouter);
  app.use('/api/public', publicRouter);
  app.use('/api/admin', adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
