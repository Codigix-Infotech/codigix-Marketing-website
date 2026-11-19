/**
 * Copies the 38 blog posts in scripts/blogs-import.json to any running Codigix API (e.g. your live site).
 *
 *   node scripts/import-blogs.mjs https://YOUR-API-HOST ADMIN_EMAIL ADMIN_PASSWORD
 *
 * - Safe to run twice: posts whose slug already exists are skipped.
 * - Posts are back-dated, so they are NOT emailed to subscribers by the automatic new-post newsletter.
 * - API host is the backend (the one that answers /api/health), not the website address.
 */
import fs from 'node:fs';

const [apiHost, email, password] = process.argv.slice(2);
if (!apiHost || !email || !password) {
  console.error('Usage: node scripts/import-blogs.mjs <API host, e.g. https://api.example.com> <admin email> <admin password>');
  process.exit(1);
}
const API = apiHost.replace(/\/+$/, '').replace(/\/api$/, '') + '/api';
const posts = JSON.parse(fs.readFileSync(new URL('./blogs-import.json', import.meta.url), 'utf8'));

async function call(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(API + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(json).slice(0, 200)}`);
  return json;
}

const { token } = await call('/auth/login', { method: 'POST', body: { email, password } });
const existing = new Set((await call('/admin/blogs?limit=500', { token })).data.map((b) => b.slug));
const cats = (await call('/admin/blog-categories', { token })).data;
const catId = async (slug, name) => {
  if (!slug) return undefined;
  let c = cats.find((x) => x.slug === slug);
  if (!c) {
    c = (await call('/admin/blog-categories', { method: 'POST', token, body: { name, slug } })).data;
    cats.push(c);
  }
  return Number(c.id);
};

let made = 0;
let skipped = 0;
for (const [i, p] of posts.entries()) {
  if (existing.has(p.slug)) { skipped++; continue; }
  const { category_slug, category_name, ...rest } = p;
  const day = new Date(Date.now() - (40 + i) * 86400000).toISOString().slice(0, 19).replace('T', ' ');
  await call('/admin/blogs', {
    method: 'POST', token,
    body: { ...rest, category_id: await catId(category_slug, category_name), status: 'published', published_at: day },
  });
  made++;
  console.log('added', p.slug);
}
console.log(`Done. ${made} added, ${skipped} already existed.`);
