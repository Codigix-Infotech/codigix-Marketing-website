/**
 * Makes a running Codigix API (e.g. your LIVE site) match the content exported from your local site:
 * blogs, blog categories, videos, testimonials, FAQs and clients (scripts/content-export.json).
 *
 *   node scripts/sync-content.mjs <API host> <admin email> <admin password> [--add-only] [--prune]
 *
 *   (default)   adds what is missing AND updates items that already exist so they match local
 *   --add-only  only adds what is missing; existing live items are left untouched
 *   --prune     also DELETES live videos/testimonials/FAQs/blogs that are not in the local export
 *               (so live ends up identical to local). Off by default: nothing is deleted unless you ask.
 *
 * Matching: blogs by slug, videos by YouTube id, testimonials by name, FAQs by question, clients by name.
 * Uploaded image files (client logos, avatars) live on the server's disk, not in the data, so copy the
 * local backend/uploads folder to the live server separately if those images are missing there.
 * Blogs are back-dated and flagged so the automatic new-post newsletter does not email them.
 */
import fs from 'node:fs';

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const [host, email, password] = args.filter((a) => !a.startsWith('--'));
if (!host || !email || !password) {
  console.error('Usage: node scripts/sync-content.mjs <API host> <admin email> <admin password> [--add-only] [--prune]');
  process.exit(1);
}
const API = host.replace(/\/+$/, '').replace(/\/api$/, '') + '/api';
const data = JSON.parse(fs.readFileSync(new URL('./content-export.json', import.meta.url), 'utf8'));
const updateExisting = !flags.has('--add-only');
const prune = flags.has('--prune');

async function call(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(API + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(json).slice(0, 240)}`);
  return json;
}

const { token } = await call('/auth/login', { method: 'POST', body: { email, password } });
const list = async (p) => (await call(`${p}${p.includes('?') ? '&' : '?'}limit=500`, { token })).data;
const stats = {};
const bump = (k, w) => ((stats[k] ??= { added: 0, updated: 0, deleted: 0, skipped: 0 })[w] += 1);

async function syncSet({ label, path, rows, keyOf, prepare = (r) => r }) {
  const live = await list(path);
  const byKey = new Map(live.map((l) => [keyOf(l), l]));
  const wanted = new Set(rows.map(keyOf));
  for (const row of rows) {
    const hit = byKey.get(keyOf(row));
    try {
      if (!hit) { await call(path, { method: 'POST', token, body: await prepare(row) }); bump(label, 'added'); }
      else if (updateExisting) { await call(`${path}/${hit.id}`, { method: 'PUT', token, body: await prepare(row) }); bump(label, 'updated'); }
      else bump(label, 'skipped');
    } catch (e) { console.error(`  ! ${label} "${keyOf(row)}": ${e.message}`); }
  }
  if (prune) for (const l of live) if (!wanted.has(keyOf(l))) { await call(`${path}/${l.id}`, { method: 'DELETE', token }); bump(label, 'deleted'); }
}

// categories first (blogs need their ids)
await syncSet({ label: 'categories', path: '/admin/blog-categories', rows: data.categories, keyOf: (r) => r.slug });
const cats = await list('/admin/blog-categories');
const catId = (slug) => (slug ? Number(cats.find((c) => c.slug === slug)?.id) || undefined : undefined);

await syncSet({
  label: 'blogs', path: '/admin/blogs', rows: data.blogs, keyOf: (r) => r.slug,
  prepare: (r) => {
    const { category_slug, category_name, ...rest } = r;
    // Published long ago => the automatic "new post" email ignores it.
    return { ...rest, category_id: catId(category_slug), published_at: rest.published_at || new Date(Date.now() - 45 * 86400000).toISOString().slice(0, 19).replace('T', ' ') };
  },
});
await syncSet({ label: 'videos', path: '/admin/videos', rows: data.videos, keyOf: (r) => r.youtube_id });
await syncSet({ label: 'testimonials', path: '/admin/testimonials', rows: data.testimonials, keyOf: (r) => r.name });
await syncSet({ label: 'faqs', path: '/admin/faqs', rows: data.faqs, keyOf: (r) => r.question });
await syncSet({ label: 'clients', path: '/admin/clients', rows: data.clients, keyOf: (r) => r.name });

console.table(stats);
