import fs from 'node:fs/promises';
import path from 'node:path';
import { Router } from 'express';
import env from '../config/env.js';
import { one, query } from '../config/db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { imageUpload, saveImage } from '../middleware/upload.js';
import { createCrudRouter } from '../services/crud.js';
import { revalidate } from '../services/revalidate.js';
import { getSetting, setSetting, SETTING_KEYS } from '../services/settings.js';
import { badRequest, notFound } from '../utils/httpError.js';
import { usersRouter } from './auth.js';
import { adminBlogsRouter } from './blogs.js';
import {
  categoriesRouter,
  clientsRouter,
  faqsRouter,
  jobsRouter,
  messagesRouter,
  subscribersRouter,
  testimonialsRouter,
  videosRouter,
} from './resources.js';

const router = Router();
router.use(requireAuth);

/* ---------------- Overview (admin dashboard home) ---------------- */
router.get('/overview', async (_req, res) => {
  const count = async (sql, params) => (await one(sql, params)).n;
  const [blogs, published, drafts, scheduled, views, clients, videos, openJobs, newApps, newMessages, subscribers] =
    await Promise.all([
      count('SELECT COUNT(*) AS n FROM blogs'),
      count("SELECT COUNT(*) AS n FROM blogs WHERE status = 'published'"),
      count("SELECT COUNT(*) AS n FROM blogs WHERE status = 'draft'"),
      count("SELECT COUNT(*) AS n FROM blogs WHERE status = 'scheduled' AND published_at > UTC_TIMESTAMP()"),
      count('SELECT COALESCE(SUM(views),0) AS n FROM blogs'),
      count('SELECT COUNT(*) AS n FROM clients WHERE is_active = 1'),
      count('SELECT COUNT(*) AS n FROM videos WHERE is_active = 1'),
      count("SELECT COUNT(*) AS n FROM jobs WHERE status = 'open'"),
      count("SELECT COUNT(*) AS n FROM job_applications WHERE status = 'new'"),
      count("SELECT COUNT(*) AS n FROM contact_messages WHERE status = 'new'"),
      count("SELECT COUNT(*) AS n FROM subscribers WHERE status = 'subscribed'"),
    ]);

  const [recentMessages, recentApplications, topPosts, recentPosts, leadsByDay] = await Promise.all([
    query('SELECT id, first_name, last_name, email, service, status, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 5'),
    query('SELECT id, name, email, job_title, status, created_at FROM job_applications ORDER BY created_at DESC LIMIT 5'),
    query("SELECT id, title, slug, views, published_at FROM blogs WHERE status = 'published' ORDER BY views DESC LIMIT 5"),
    query('SELECT id, title, status, updated_at FROM blogs ORDER BY updated_at DESC LIMIT 5'),
    query(
      `SELECT DATE(created_at) AS day, COUNT(*) AS n FROM contact_messages
       WHERE created_at >= UTC_TIMESTAMP() - INTERVAL 30 DAY GROUP BY DATE(created_at) ORDER BY day`
    ),
  ]);

  // SEO health: published posts missing key SEO fields.
  const seoIssues = await query(
    `SELECT * FROM (SELECT id, title, updated_at,
       (meta_title IS NULL OR meta_title = '') AS no_meta_title,
       (meta_description IS NULL OR meta_description = '') AS no_meta_description,
       (focus_keyword IS NULL OR focus_keyword = '') AS no_focus_keyword,
       (cover_image IS NULL OR cover_image = '') AS no_cover,
       (cover_image_alt IS NULL OR cover_image_alt = '') AS no_cover_alt
     FROM blogs WHERE status <> 'draft') t
     WHERE no_meta_title OR no_meta_description OR no_focus_keyword OR no_cover OR no_cover_alt
     ORDER BY updated_at DESC LIMIT 8`
  );

  res.json({
    stats: { blogs, published, drafts, scheduled, views: Number(views), clients, videos, openJobs, newApps, newMessages, subscribers },
    recentMessages,
    recentApplications,
    topPosts,
    recentPosts,
    leadsByDay,
    seoIssues,
  });
});

/* ---------------- Content resources ---------------- */
router.use('/blogs', adminBlogsRouter);
router.use('/blog-categories', categoriesRouter);
router.use('/clients', clientsRouter);
router.use('/videos', videosRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/faqs', faqsRouter);
router.use('/jobs', jobsRouter);
router.use('/messages', messagesRouter);
router.use('/subscribers', subscribersRouter);
router.use('/users', usersRouter);

/* ---------------- Job applications ---------------- */
const applicationsRouter = createCrudRouter({
  table: 'job_applications',
  fields: {
    status: { type: 'enum', values: ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'] },
    notes: { type: 'text', max: 5000 },
  },
  allow: { create: false, remove: false },
  searchable: ['name', 'email', 'phone', 'job_title', 'current_company'],
  filterable: ['status', 'job_id'],
  defaultOrder: 'created_at DESC',
  sortable: ['status', 'name'],
  exportColumns: ['id', 'created_at', 'status', 'job_title', 'name', 'email', 'phone', 'experience', 'current_company', 'linkedin_url', 'portfolio_url', 'notes'],
});

// Resumes live outside the public uploads folder and are only served to signed-in staff.
applicationsRouter.get('/:id/resume', async (req, res) => {
  const app = await one('SELECT resume_path, resume_original_name, name FROM job_applications WHERE id = ?', [req.params.id]);
  if (!app?.resume_path) throw notFound('No resume attached');
  const abs = path.resolve(env.privateUploadDir, app.resume_path);
  if (!abs.startsWith(path.resolve(env.privateUploadDir))) throw notFound();
  res.download(abs, app.resume_original_name || path.basename(abs));
});

applicationsRouter.delete('/:id', async (req, res) => {
  const app = await one('SELECT resume_path FROM job_applications WHERE id = ?', [req.params.id]);
  if (!app) throw notFound();
  await query('DELETE FROM job_applications WHERE id = ?', [req.params.id]);
  if (app.resume_path) await fs.rm(path.join(env.privateUploadDir, app.resume_path), { force: true });
  res.json({ ok: true });
});
router.use('/applications', applicationsRouter);

/* ---------------- Settings ---------------- */
router.get('/settings', async (_req, res) => {
  const out = {};
  for (const key of SETTING_KEYS) out[key] = (await getSetting(key)) || {};
  res.json({ data: out });
});

router.get('/settings/:key', async (req, res) => {
  if (!SETTING_KEYS.includes(req.params.key)) throw notFound('Unknown settings group');
  res.json({ data: (await getSetting(req.params.key)) || {} });
});

router.put('/settings/:key', requireRole('admin'), async (req, res) => {
  const { key } = req.params;
  if (!SETTING_KEYS.includes(key)) throw notFound('Unknown settings group');
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) throw badRequest('Body must be an object');
  const value = await setSetting(key, req.body);
  revalidate(key === 'hero_dashboard' ? 'dashboard' : 'settings');
  res.json({ data: value });
});

/* ---------------- Media library ---------------- */
router.get('/media', async (req, res) => {
  const where = [];
  const params = [];
  if (req.query.folder) {
    where.push('folder = ?');
    params.push(req.query.folder);
  }
  if (req.query.search) {
    where.push('(original_name LIKE ? OR alt LIKE ?)');
    params.push(`%${req.query.search}%`, `%${req.query.search}%`);
  }
  const w = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const limit = Math.min(200, Number(req.query.limit) || 60);
  const offset = Math.max(0, (Number(req.query.page) || 1) - 1) * limit;
  const [{ total }] = await query(`SELECT COUNT(*) AS total FROM media ${w}`, params);
  const rows = await query(`SELECT * FROM media ${w} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, limit, offset]);
  res.json({ data: rows, meta: { total, limit, page: Number(req.query.page) || 1 } });
});

router.post('/media', imageUpload.array('files', 20), async (req, res) => {
  if (!req.files?.length) throw badRequest('No files uploaded (field name must be "files")');
  const folder = String(req.body.folder || 'general');
  const saved = [];
  for (const file of req.files) {
    const info = await saveImage(file, folder);
    const result = await query('INSERT INTO media SET ?', [{ ...info, alt: req.body.alt || null, uploaded_by: req.user.id }]);
    saved.push({ id: result.insertId, ...info });
  }
  res.status(201).json({ data: saved });
});

router.put('/media/:id', async (req, res) => {
  await query('UPDATE media SET alt = ? WHERE id = ?', [String(req.body?.alt || '').slice(0, 255), req.params.id]);
  res.json({ data: await one('SELECT * FROM media WHERE id = ?', [req.params.id]) });
});

router.delete('/media/:id', async (req, res) => {
  const row = await one('SELECT * FROM media WHERE id = ?', [req.params.id]);
  if (!row) throw notFound();
  await query('DELETE FROM media WHERE id = ?', [row.id]);
  const abs = path.resolve(env.uploadDir, row.folder, row.filename);
  if (abs.startsWith(path.resolve(env.uploadDir))) await fs.rm(abs, { force: true });
  res.json({ ok: true });
});

/* ---------------- Cache ---------------- */
router.post('/revalidate', async (_req, res) => {
  revalidate('blogs', 'clients', 'videos', 'testimonials', 'faqs', 'jobs', 'settings', 'dashboard');
  res.json({ ok: true });
});

export default router;
