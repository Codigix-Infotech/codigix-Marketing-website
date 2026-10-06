import { Router } from 'express';
import { one, query } from '../config/db.js';
import { normalizeRow, uniqueSlug } from '../services/crud.js';
import { revalidate } from '../services/revalidate.js';
import { buildRecord, pageMeta, pagination } from '../utils/fields.js';
import { badRequest, notFound } from '../utils/httpError.js';
import { readingTime, slugify, stripHtml, truncate, wordCount } from '../utils/text.js';

const JSON_COLS = ['tags', 'faqs'];
const BOOL_COLS = ['is_featured', 'robots_index', 'robots_follow'];

export const blogFields = {
  title: { type: 'string', required: true, max: 255, label: 'Title' },
  slug: { type: 'string', max: 255 },
  excerpt: { type: 'text', max: 1000 },
  content: { type: 'html' },
  cover_image: { type: 'string', max: 500 },
  cover_image_alt: { type: 'string', max: 255 },
  category_id: { type: 'int' },
  tags: { type: 'json', default: [] },
  author_name: { type: 'string', max: 120 },
  author_role: { type: 'string', max: 120 },
  author_bio: { type: 'text', max: 1000 },
  author_avatar: { type: 'string', max: 500 },
  author_url: { type: 'url', label: 'Author profile link' },
  // Medical review (E-E-A-T for health content): shown on the article and as WebPage.reviewedBy.
  reviewed_by: { type: 'string', max: 160 },
  reviewer_credentials: { type: 'string', max: 160 },
  last_reviewed_at: { type: 'date' },
  status: { type: 'enum', values: ['draft', 'published', 'scheduled'], default: 'draft' },
  is_featured: { type: 'bool', default: 0 },
  published_at: { type: 'datetime' },
  meta_title: { type: 'string', max: 255 },
  meta_description: { type: 'string', max: 500 },
  focus_keyword: { type: 'string', max: 160 },
  secondary_keywords: { type: 'string', max: 500 },
  canonical_url: { type: 'url' },
  og_title: { type: 'string', max: 255 },
  og_description: { type: 'string', max: 500 },
  og_image: { type: 'string', max: 500 },
  robots_index: { type: 'bool', default: 1 },
  robots_follow: { type: 'bool', default: 1 },
  schema_type: { type: 'enum', values: ['BlogPosting', 'Article', 'NewsArticle', 'MedicalWebPage'], default: 'BlogPosting' },
  custom_schema: { type: 'text', max: 10000 },
  faqs: { type: 'json', default: [] },
};

const norm = (row) => normalizeRow(row, { jsonColumns: JSON_COLS, boolColumns: BOOL_COLS });

/** Derived fields that should never be typed by hand. */
function applyDerived(record, existing = {}) {
  const content = record.content ?? existing.content ?? '';
  if ('content' in record) {
    record.word_count = wordCount(content);
    record.reading_time = readingTime(content);
  }
  const excerpt = record.excerpt ?? existing.excerpt;
  if (!excerpt && content) record.excerpt = truncate(stripHtml(content), 220);

  if (record.tags) {
    const tags = JSON.parse(record.tags);
    if (!Array.isArray(tags)) throw badRequest('tags must be an array');
    record.tags = JSON.stringify([...new Set(tags.map((t) => String(t).trim()).filter(Boolean))].slice(0, 20));
  }
  if (record.custom_schema) {
    try {
      const parsed = JSON.parse(record.custom_schema);
      if (!parsed || typeof parsed !== 'object') throw new Error('not an object');
    } catch {
      throw badRequest('Custom schema must be valid JSON-LD (a JSON object or array, without <script> tags)');
    }
  }
  if (record.faqs) {
    const faqs = JSON.parse(record.faqs);
    if (!Array.isArray(faqs)) throw badRequest('faqs must be an array');
    record.faqs = JSON.stringify(
      faqs
        .map((f) => ({ question: String(f?.question || '').trim(), answer: String(f?.answer || '').trim() }))
        .filter((f) => f.question && f.answer)
    );
  }

  const status = record.status ?? existing.status;
  // First publish stamps the date; scheduled posts must carry a date.
  if (status === 'published' && !(record.published_at || existing.published_at)) {
    record.published_at = new Date();
  }
  if (status === 'scheduled' && !(record.published_at || existing.published_at)) {
    throw badRequest('Pick a publish date & time for a scheduled post');
  }
}

const LIST_COLUMNS = `b.id, b.title, b.slug, b.excerpt, b.cover_image, b.cover_image_alt, b.category_id,
  b.tags, b.author_name, b.author_role, b.author_avatar, b.status, b.is_featured, b.published_at, b.reading_time,
  b.word_count, b.views, b.focus_keyword, b.meta_title, b.meta_description, b.created_at, b.updated_at,
  c.name AS category_name, c.slug AS category_slug`;

/* ------------------------------------------------------------------ */
/* Admin                                                               */
/* ------------------------------------------------------------------ */
export const adminBlogsRouter = Router();

adminBlogsRouter.get('/', async (req, res) => {
  const p = pagination(req.query, { defaultLimit: 20, maxLimit: 200 });
  const where = [];
  const params = [];
  if (req.query.search) {
    where.push('(b.title LIKE ? OR b.slug LIKE ? OR b.focus_keyword LIKE ?)');
    const s = `%${req.query.search}%`;
    params.push(s, s, s);
  }
  if (req.query.status) {
    where.push('b.status = ?');
    params.push(req.query.status);
  }
  if (req.query.category_id) {
    where.push('b.category_id = ?');
    params.push(req.query.category_id);
  }
  if (req.query.featured === '1') where.push('b.is_featured = 1');
  const w = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const sorts = {
    newest: 'COALESCE(b.published_at, b.created_at) DESC',
    oldest: 'COALESCE(b.published_at, b.created_at) ASC',
    updated: 'b.updated_at DESC',
    views: 'b.views DESC',
    title: 'b.title ASC',
  };
  const order = sorts[req.query.sort] || sorts.updated;

  const [{ total }] = await query(`SELECT COUNT(*) AS total FROM blogs b ${w}`, params);
  const rows = await query(
    `SELECT ${LIST_COLUMNS} FROM blogs b LEFT JOIN blog_categories c ON c.id = b.category_id ${w}
     ORDER BY ${order} LIMIT ? OFFSET ?`,
    [...params, p.limit, p.offset]
  );
  const counts = await query('SELECT status, COUNT(*) AS n FROM blogs GROUP BY status');
  res.json({
    data: rows.map(norm),
    meta: { ...pageMeta(total, p), counts: Object.fromEntries(counts.map((r) => [r.status, r.n])) },
  });
});

adminBlogsRouter.get('/slug-available', async (req, res) => {
  const slug = slugify(req.query.slug || '');
  const row = slug ? await one('SELECT id FROM blogs WHERE slug = ? AND id <> ?', [slug, Number(req.query.exclude) || 0]) : null;
  res.json({ slug, available: Boolean(slug) && !row });
});

adminBlogsRouter.get('/:id', async (req, res) => {
  const row = await one('SELECT * FROM blogs WHERE id = ?', [req.params.id]);
  if (!row) throw notFound('Blog not found');
  res.json({ data: norm(row) });
});

adminBlogsRouter.post('/', async (req, res) => {
  const record = buildRecord(blogFields, req.body);
  record.slug = await uniqueSlug('blogs', record.slug || record.title);
  applyDerived(record);
  record.created_by = req.user.id;
  record.updated_by = req.user.id;
  const result = await query('INSERT INTO blogs SET ?', [record]);
  const row = await one('SELECT * FROM blogs WHERE id = ?', [result.insertId]);
  revalidate('blogs');
  res.status(201).json({ data: norm(row) });
});

adminBlogsRouter.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const existing = await one('SELECT * FROM blogs WHERE id = ?', [id]);
  if (!existing) throw notFound('Blog not found');
  const record = buildRecord(blogFields, req.body, { partial: true });
  if ('slug' in record || 'title' in record) {
    record.slug = await uniqueSlug('blogs', record.slug || existing.slug || record.title, id);
  }
  applyDerived(record, existing);
  record.updated_by = req.user.id;
  await query('UPDATE blogs SET ? WHERE id = ?', [record, id]);
  const row = await one('SELECT * FROM blogs WHERE id = ?', [id]);
  revalidate('blogs', `blog:${existing.slug}`, `blog:${row.slug}`);
  res.json({ data: norm(row) });
});

adminBlogsRouter.post('/:id/duplicate', async (req, res) => {
  const src = await one('SELECT * FROM blogs WHERE id = ?', [req.params.id]);
  if (!src) throw notFound('Blog not found');
  const { id: _id, created_at: _c, updated_at: _u, views: _v, ...copy } = src;
  copy.title = `${src.title} (Copy)`;
  copy.slug = await uniqueSlug('blogs', `${src.slug}-copy`);
  copy.status = 'draft';
  copy.published_at = null;
  copy.is_featured = 0;
  copy.created_by = req.user.id;
  copy.updated_by = req.user.id;
  for (const c of JSON_COLS) if (copy[c] != null && typeof copy[c] !== 'string') copy[c] = JSON.stringify(copy[c]);
  const result = await query('INSERT INTO blogs SET ?', [copy]);
  const row = await one('SELECT * FROM blogs WHERE id = ?', [result.insertId]);
  revalidate('blogs');
  res.status(201).json({ data: norm(row) });
});

adminBlogsRouter.delete('/:id', async (req, res) => {
  const existing = await one('SELECT slug FROM blogs WHERE id = ?', [req.params.id]);
  if (!existing) throw notFound('Blog not found');
  await query('DELETE FROM blogs WHERE id = ?', [req.params.id]);
  revalidate('blogs', `blog:${existing.slug}`);
  res.json({ ok: true });
});

adminBlogsRouter.post('/bulk', async (req, res) => {
  const ids = Array.isArray(req.body?.ids) ? req.body.ids.map(Number).filter(Boolean) : [];
  const action = req.body?.action;
  if (!ids.length) throw badRequest('ids array is required');
  if (action === 'delete') {
    await query('DELETE FROM blogs WHERE id IN (?)', [ids]);
  } else if (action === 'publish') {
    await query("UPDATE blogs SET status = 'published', published_at = COALESCE(published_at, NOW()) WHERE id IN (?)", [ids]);
  } else if (action === 'draft') {
    await query("UPDATE blogs SET status = 'draft' WHERE id IN (?)", [ids]);
  } else {
    throw badRequest('action must be delete, publish or draft');
  }
  revalidate('blogs');
  res.json({ ok: true });
});

/* ------------------------------------------------------------------ */
/* Public                                                              */
/* ------------------------------------------------------------------ */
// A post is live if published, or scheduled and its time has come.
const LIVE = "(b.status IN ('published','scheduled') AND b.published_at IS NOT NULL AND b.published_at <= UTC_TIMESTAMP())";

/** Adds ids to h2/h3 headings and returns a table of contents. */
export function withToc(html = '') {
  const toc = [];
  const used = new Map();
  const content = String(html).replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
    const text = stripHtml(inner);
    if (!text) return match;
    const existingId = attrs.match(/\sid="([^"]+)"/);
    let id = existingId ? existingId[1] : slugify(text) || `section-${toc.length + 1}`;
    const n = used.get(id) || 0;
    used.set(id, n + 1);
    if (n && !existingId) id = `${id}-${n + 1}`;
    toc.push({ id, text, level: Number(level) });
    return existingId ? match : `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
  return { content, toc };
}

export const publicBlogsRouter = Router();

publicBlogsRouter.get('/', async (req, res) => {
  const p = pagination(req.query, { defaultLimit: 9, maxLimit: 50 });
  const where = [LIVE];
  const params = [];
  if (req.query.category) {
    where.push('c.slug = ?');
    params.push(req.query.category);
  }
  if (req.query.tag) {
    where.push('JSON_CONTAINS(b.tags, JSON_QUOTE(?))');
    params.push(req.query.tag);
  }
  if (req.query.search) {
    where.push('(b.title LIKE ? OR b.excerpt LIKE ?)');
    params.push(`%${req.query.search}%`, `%${req.query.search}%`);
  }
  if (req.query.featured === '1') where.push('b.is_featured = 1');
  if (req.query.exclude) {
    where.push('b.slug <> ?');
    params.push(req.query.exclude);
  }
  const w = `WHERE ${where.join(' AND ')}`;
  const from = 'FROM blogs b LEFT JOIN blog_categories c ON c.id = b.category_id';
  const [{ total }] = await query(`SELECT COUNT(*) AS total ${from} ${w}`, params);
  const rows = await query(
    `SELECT ${LIST_COLUMNS} ${from} ${w} ORDER BY b.is_featured DESC, b.published_at DESC LIMIT ? OFFSET ?`,
    [...params, p.limit, p.offset]
  );
  res.json({ data: rows.map(norm), meta: pageMeta(total, p) });
});

publicBlogsRouter.get('/sitemap', async (_req, res) => {
  const rows = await query(
    `SELECT b.slug, b.updated_at, b.published_at FROM blogs b WHERE ${LIVE} AND b.robots_index = 1 ORDER BY b.published_at DESC`
  );
  const categories = await query(
    `SELECT c.slug, MAX(b.updated_at) AS updated_at FROM blog_categories c
     JOIN blogs b ON b.category_id = c.id AND ${LIVE} GROUP BY c.id`
  );
  res.json({ data: rows, categories });
});

publicBlogsRouter.get('/categories', async (_req, res) => {
  const rows = await query(
    `SELECT c.id, c.name, c.slug, c.description, c.meta_title, c.meta_description,
       (SELECT COUNT(*) FROM blogs b WHERE b.category_id = c.id AND ${LIVE}) AS post_count
     FROM blog_categories c ORDER BY c.sort_order ASC, c.name ASC`
  );
  res.json({ data: rows });
});

publicBlogsRouter.get('/tags', async (_req, res) => {
  const rows = await query(`SELECT b.tags FROM blogs b WHERE ${LIVE}`);
  const counts = new Map();
  for (const r of rows) {
    const tags = typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags || [];
    for (const t of tags) counts.set(t, (counts.get(t) || 0) + 1);
  }
  res.json({ data: [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count) });
});

publicBlogsRouter.get('/:slug', async (req, res) => {
  const row = await one(
    `SELECT b.*, c.name AS category_name, c.slug AS category_slug
     FROM blogs b LEFT JOIN blog_categories c ON c.id = b.category_id
     WHERE b.slug = ? AND ${LIVE}`,
    [req.params.slug]
  );
  if (!row) throw notFound('Post not found');
  norm(row);
  const { content, toc } = withToc(row.content || '');
  row.content = content;
  row.toc = toc;
  delete row.created_by;
  delete row.updated_by;

  // Related: same category first, then shared tags, then most recent.
  const related = await query(
    `SELECT ${LIST_COLUMNS} FROM blogs b LEFT JOIN blog_categories c ON c.id = b.category_id
     WHERE ${LIVE} AND b.id <> ?
     ORDER BY (b.category_id <=> ?) DESC, b.published_at DESC LIMIT 3`,
    [row.id, row.category_id]
  );
  const prev = await one(
    `SELECT b.title, b.slug FROM blogs b WHERE ${LIVE} AND b.published_at < ? ORDER BY b.published_at DESC LIMIT 1`,
    [row.published_at]
  );
  const next = await one(
    `SELECT b.title, b.slug FROM blogs b WHERE ${LIVE} AND b.published_at > ? ORDER BY b.published_at ASC LIMIT 1`,
    [row.published_at]
  );
  res.json({ data: row, related: related.map(norm), prev, next });
});

// Separate endpoint so cached (ISR) page renders still count real visits.
publicBlogsRouter.post('/:slug/view', async (req, res) => {
  const post = await one(`SELECT b.id FROM blogs b WHERE b.slug = ? AND ${LIVE}`, [req.params.slug]);
  if (post) await query('UPDATE blogs SET views = views + 1 WHERE id = ?', [post.id]);
  res.json({ ok: true });
});
