import path from 'node:path';
import fs from 'node:fs/promises';
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import env from '../config/env.js';
import { one, query } from '../config/db.js';
import { resumeUpload } from '../middleware/upload.js';
import { normalizeRow } from '../services/crud.js';
import { getSettings, PUBLIC_KEYS } from '../services/settings.js';
import { buildRecord } from '../utils/fields.js';
import { badRequest, notFound } from '../utils/httpError.js';
import { publicBlogsRouter } from './blogs.js';

const router = Router();

// Form endpoints are the only public writes: keep them throttled.
const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please try again in a few minutes.' },
});

/** Hidden "website" field: humans leave it empty, naive bots fill it. */
function isBot(body) {
  return Boolean(body?.website_url || body?.company_website);
}

router.get('/settings', async (_req, res) => {
  res.json({ data: await getSettings(PUBLIC_KEYS) });
});

router.get('/dashboard', async (_req, res) => {
  const { hero_dashboard: data } = await getSettings(['hero_dashboard']);
  res.json({ data: data || {} });
});

router.get('/clients', async (req, res) => {
  const rows = await query(
    `SELECT id, name, location, logo, website, industry, is_healthcare, show_on_map, map_x, map_y
     FROM clients WHERE is_active = 1 ${req.query.map === '1' ? 'AND show_on_map = 1' : ''}
     ORDER BY sort_order ASC, id ASC`
  );
  res.json({
    data: rows.map((r) => ({
      ...normalizeRow(r, { boolColumns: ['is_healthcare', 'show_on_map'] }),
      map_x: r.map_x == null ? null : Number(r.map_x),
      map_y: r.map_y == null ? null : Number(r.map_y),
    })),
  });
});

router.get('/videos', async (_req, res) => {
  const rows = await query(
    'SELECT id, youtube_id, category, title, subtitle, description, duration, thumbnail FROM videos WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
  );
  res.json({ data: rows });
});

router.get('/testimonials', async (_req, res) => {
  const rows = await query(
    'SELECT id, name, role, company, content, avatar, rating FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC, id DESC'
  );
  res.json({ data: rows });
});

router.get('/faqs', async (req, res) => {
  const page = String(req.query.page || 'home');
  const rows = await query(
    'SELECT id, question, answer FROM faqs WHERE is_active = 1 AND page = ? ORDER BY sort_order ASC, id ASC',
    [page]
  );
  res.json({ data: rows });
});

/* ---------------- Careers ---------------- */
const JOB_JSON = ['responsibilities', 'requirements', 'benefits'];

router.get('/jobs', async (_req, res) => {
  const rows = await query(
    `SELECT id, title, slug, department, location, employment_type, work_mode, experience, salary_range,
       openings, summary, deadline, created_at, updated_at
     FROM jobs WHERE status = 'open' AND (deadline IS NULL OR deadline >= UTC_DATE())
     ORDER BY sort_order ASC, created_at DESC`
  );
  res.json({ data: rows });
});

router.get('/jobs/:slug', async (req, res) => {
  const row = await one("SELECT * FROM jobs WHERE slug = ? AND status <> 'draft'", [req.params.slug]);
  if (!row) throw notFound('Job not found');
  res.json({ data: normalizeRow(row, { jsonColumns: JOB_JSON }) });
});

router.post('/jobs/apply', formLimiter, resumeUpload.single('resume'), async (req, res) => {
  const cleanup = () => (req.file ? fs.rm(req.file.path, { force: true }) : Promise.resolve());
  try {
    if (isBot(req.body)) {
      await cleanup();
      return res.status(201).json({ ok: true });
    }
    const record = buildRecord(
      {
        job_id: { type: 'int' },
        name: { type: 'string', required: true, max: 160, label: 'Full name' },
        email: { type: 'email', required: true, label: 'Email' },
        phone: { type: 'string', max: 40 },
        experience: { type: 'string', max: 80 },
        current_company: { type: 'string', max: 160 },
        portfolio_url: { type: 'url', label: 'Portfolio URL' },
        linkedin_url: { type: 'url', label: 'LinkedIn URL' },
        cover_letter: { type: 'text', max: 5000 },
      },
      req.body
    );
    if (record.job_id) {
      const job = await one("SELECT id, title FROM jobs WHERE id = ? AND status = 'open'", [record.job_id]);
      if (!job) throw badRequest('This position is no longer accepting applications');
      record.job_title = job.title;
    } else {
      record.job_title = 'General application';
    }
    if (!req.file) throw badRequest('Please attach your resume (PDF, DOC or DOCX)');
    record.resume_path = path.relative(env.privateUploadDir, req.file.path).split(path.sep).join('/');
    record.resume_original_name = req.file.originalname.slice(0, 255);
    await query('INSERT INTO job_applications SET ?', [record]);
    res.status(201).json({ ok: true, message: 'Thank you! Your application has been received.' });
  } catch (err) {
    await cleanup();
    throw err;
  }
});

/* ---------------- Contact & newsletter ---------------- */
router.post('/contact', formLimiter, async (req, res) => {
  if (isBot(req.body)) return res.status(201).json({ ok: true });
  const record = buildRecord(
    {
      first_name: { type: 'string', required: true, max: 120, label: 'First name' },
      last_name: { type: 'string', max: 120 },
      email: { type: 'email', required: true, label: 'Email' },
      phone: { type: 'string', max: 40 },
      company: { type: 'string', max: 160 },
      service: { type: 'string', max: 160 },
      message: { type: 'text', required: true, max: 5000, label: 'Message' },
      source_page: { type: 'string', max: 255 },
    },
    req.body
  );
  if (record.message.trim().length < 5) throw badRequest('Please write a slightly longer message');
  record.ip = req.ip?.slice(0, 64) || null;
  record.user_agent = String(req.headers['user-agent'] || '').slice(0, 500);
  await query('INSERT INTO contact_messages SET ?', [record]);
  res.status(201).json({ ok: true, message: "Thanks! We've received your message and will get back to you within one business day." });
});

router.post('/newsletter', formLimiter, async (req, res) => {
  if (isBot(req.body)) return res.status(201).json({ ok: true });
  const { email, source } = buildRecord(
    { email: { type: 'email', required: true, label: 'Email' }, source: { type: 'string', max: 120 } },
    req.body
  );
  await query(
    "INSERT INTO subscribers (email, source) VALUES (?, ?) ON DUPLICATE KEY UPDATE status = 'subscribed'",
    [email, source || 'footer']
  );
  res.status(201).json({ ok: true, message: "You're subscribed! Watch your inbox for our next insights." });
});

router.use('/blogs', publicBlogsRouter);

export default router;
