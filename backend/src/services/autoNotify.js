import env from '../config/env.js';
import { one, query } from '../config/db.js';
import { mailConfigured } from './mailer.js';
import { sendToSubscribers } from './newsletter.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const NAVY = '#1a1053';
const SETTLE_MS = 5 * 60 * 1000; // wait a few minutes after publishing so quick edits don't go out half-finished
const toDate = (v) => new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(String(v)) ? v : `${String(v).replace(' ', 'T')}Z`);
const nowSql = () => new Date().toISOString().slice(0, 19).replace('T', ' ');
let running = false;

function buildBody(posts) {
  const items = posts
    .map(
      (p) => `<p style="margin:0 0 14px"><a href="${env.siteUrl}/blog/${esc(p.slug)}" style="color:#1a56db;text-decoration:underline">${esc(p.title)}</a>${
        p.excerpt ? `<br><span style="color:#4b5563">${esc(String(p.excerpt).slice(0, 200))}</span>` : ''
      }</p>`
    )
    .join('');
  return `<p style="margin:0 0 14px">{{hello}}</p><p style="margin:0 0 14px">${posts.length === 1 ? 'We have just published a new article on our blog that we thought you might find useful:' : `We have just published ${posts.length} new articles on our blog:`}</p>${items}<p style="margin:0">If you have a question about any of these, just reply to this email.</p>`;
}

/** Find newly published posts that have not been announced yet and email them to subscribers. */
export async function notifyNewPosts() {
  if (running) return;
  running = true;
  try {
    if (String(process.env.NEWSLETTER_AUTO_SEND ?? 'true').toLowerCase() === 'false') return;
    if (!mailConfigured()) return;
    const rows = await query(
      "SELECT id, title, slug, excerpt, published_at FROM blogs WHERE status = 'published' AND notified_at IS NULL AND published_at IS NOT NULL ORDER BY published_at ASC"
    );
    const ready = rows.filter((r) => {
      const t = toDate(r.published_at).getTime();
      return t <= Date.now() - SETTLE_MS;
    });
    // Anything published more than 3 days ago (back-dated imports, old drafts finally published) is
    // marked as announced without emailing, so only genuinely new posts reach subscribers.
    const stale = ready.filter((r) => toDate(r.published_at).getTime() < Date.now() - 3 * 86400000);
    for (const r of stale) await query('UPDATE blogs SET notified_at = ? WHERE id = ?', [nowSql(), r.id]);
    ready.splice(0, ready.length, ...ready.filter((r) => !stale.includes(r)));
    if (!ready.length) return;
    // Claim them first so a slow send or a restart can never announce the same post twice.
    for (const r of ready) await query('UPDATE blogs SET notified_at = ? WHERE id = ?', [nowSql(), r.id]);
    const subs = await one("SELECT COUNT(*) AS n FROM subscribers WHERE status = 'subscribed'");
    if (!Number(subs?.n)) return;
    const subject = ready.length === 1 ? ready[0].title : `${ready.length} new articles from Codigix Infotech`;
    await query('INSERT INTO newsletters (subject, preview_text, body_html, include_posts) VALUES (?, ?, ?, 0)', [
      subject.slice(0, 250),
      ready.length === 1 ? String(ready[0].excerpt || '').slice(0, 140) : 'Fresh guides from the Codigix team.',
      buildBody(ready),
    ]);
    const issue = await one('SELECT id FROM newsletters ORDER BY id DESC LIMIT 1');
    const n = await sendToSubscribers(issue.id);
    console.log(`[newsletter] auto-sent "${subject}" to ${n} subscriber(s)`);
  } catch (err) {
    console.error('[newsletter] auto-notify failed:', err.message);
  } finally {
    running = false;
  }
}

export function startAutoNotify() {
  setTimeout(notifyNewPosts, 30_000).unref();
  setInterval(notifyNewPosts, 5 * 60 * 1000).unref();
  console.log('[newsletter] auto-notify on new blog posts: enabled');
}
