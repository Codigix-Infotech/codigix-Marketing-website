import crypto from 'node:crypto';
import env from '../config/env.js';
import { one, query } from '../config/db.js';
import { getSettings } from './settings.js';
import { sendMail } from './mailer.js';

const NAVY = '#1a1053';
const RED = '#e20b27';
const BLUE = '#2563eb';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const htmlToText = (html) =>
  String(html)
    .replace(/<(br|\/p|\/h[1-6]|\/li|\/div|\/tr)\s*\/?>/gi, '\n')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

export const newToken = () => crypto.randomBytes(24).toString('hex');

export function unsubscribeUrl(token) {
  return `${env.siteUrl}/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}

/**
 * Unsubscribe headers. Mailbox providers (Gmail, Yahoo) expect an https List-Unsubscribe plus the
 * RFC 8058 one-click POST header for bulk mail; missing them is a common reason for the spam folder.
 * The one-click URL must be reachable from the internet, so it is only added when API_PUBLIC_URL is public.
 */
export function unsubscribeHeaders(token) {
  const page = unsubscribeUrl(token);
  const apiPublic = /^https:\/\/(?!localhost|127\.)/i.test(env.apiPublicUrl);
  if (!apiPublic) return { 'List-Unsubscribe': `<${page}>` };
  return {
    'List-Unsubscribe': `<${env.apiPublicUrl}/api/public/newsletter/unsubscribe/${encodeURIComponent(token)}>, <${page}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  };
}

const GENERIC = new Set(['info', 'admin', 'sales', 'contact', 'hello', 'support', 'mail', 'office', 'team', 'noreply', 'enquiry', 'inquiry', 'hr', 'accounts', 'billing', 'webmaster']);
/** Best available first name: the stored name, else a name-like start of the email address. */
export function firstName(sub = {}) {
  const clean = (v) => String(v || '').replace(/[^A-Za-zÀ-ɏ' -]/g, ' ').trim().split(/\s+/)[0] || '';
  let n = clean(sub.name);
  if (!n && sub.email) {
    const chunk = String(sub.email).split('@')[0].split(/[._\-+]/)[0].replace(/\d+/g, '');
    n = /^[A-Za-z]{3,}$/.test(chunk) && !GENERIC.has(chunk.toLowerCase()) ? chunk : '';
  }
  return n ? n.charAt(0).toUpperCase() + n.slice(1).toLowerCase() : '';
}
const hello = (name) => (name ? `Hello ${esc(name)},` : 'Hello,');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------------- Data the templates draw on ---------------- */

/** Company details, social links and (optionally) the latest published blog posts. */
async function loadContext({ withPosts = false } = {}) {
  const s = await getSettings(['site', 'contact', 'social']).catch(() => ({}));
  let posts = [];
  if (withPosts) {
    posts = await query(
      "SELECT title, slug, excerpt FROM blogs WHERE status = 'published' ORDER BY published_at DESC, id DESC LIMIT 3"
    ).catch(() => []);
  }
  return { site: s.site || {}, contact: s.contact || {}, social: s.social || {}, posts };
}

/* ---------------- Template building blocks ----------------
 * Deliberately plain and personal: no banner, buttons, boxes or gradients. Gmail files heavily
 * designed, image-and-button emails under "Promotions"; a short note that reads like a message
 * from a person, with ordinary text links, is far more likely to reach the Primary inbox. */

const link = (href, label) => `<a href="${esc(href)}" style="color:#1a56db;text-decoration:underline">${esc(label)}</a>`;

function postCards(posts) {
  if (!posts.length) return '';
  const items = posts
    .map(
      (p) => `<p style="margin:0 0 14px">${link(`${env.siteUrl}/blog/${p.slug}`, p.title)}${
        p.excerpt ? `<br><span style="color:#4b5563">${esc(String(p.excerpt).slice(0, 160))}${String(p.excerpt).length > 160 ? '…' : ''}</span>` : ''
      }</p>`
    )
    .join('');
  return `<p style="margin:18px 0 8px"><strong>Recent articles</strong></p>${items}`;
}

const SIGNATURE = { name: 'Codigix Infotech Team', phone: '7066556768', email: 'info@codigix.co', website: 'codigix.co' };

function signature() {
  return `<p style="margin:22px 0 0">Regards,<br>${esc(SIGNATURE.name)}<br>Phone: ${esc(SIGNATURE.phone)}<br>Email: ${link(`mailto:${SIGNATURE.email}`, SIGNATURE.email)}<br>Website: ${link(`https://${SIGNATURE.website}`, SIGNATURE.website)}</p>`;
}

/** Plain, single-column layout: just the message and a short footer. */
function layout({ title, preview, rows, unsubUrl, ctx }) {
  const footerLine = unsubUrl
    ? `You are receiving this because you subscribed to updates from Codigix Infotech. If you would rather not hear from us, you can ${link(unsubUrl, 'unsubscribe')} at any time.`
    : 'You are receiving this because you subscribed to updates from Codigix Infotech.';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#ffffff">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preview || '')}</span>
<div style="max-width:560px;margin:0 auto;padding:24px 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#222222">
${rows}
${signature(ctx)}
<p style="margin:28px 0 0;padding-top:14px;border-top:1px solid #e5e7eb;font-size:12px;line-height:1.6;color:#6b7280">${footerLine}<br>Codigix Infotech, Pune, India. This message is for general information only and is not medical advice.</p>
</div></body></html>`;
}

/** A regular issue written in the admin panel. */
export function renderEmail({ subject, preview_text, body_html, include_posts }, unsubUrl, ctx, name = '') {
  body_html = String(body_html).replace(/\{\{\s*hello\s*\}\}/gi, hello(name)).replace(/\{\{\s*name\s*\}\}/gi, name ? esc(name) : 'there');
  const rows = `${body_html}${include_posts ? postCards(ctx.posts) : ''}<p style="margin:18px 0 0">More on our ${link(`${env.siteUrl}/blog`, 'blog')}.</p>`;
  const html = layout({ title: subject, preview: preview_text, rows, unsubUrl, ctx });
  const text = `${htmlToText(body_html)}\n\nBlog: ${env.siteUrl}/blog\nWebsite: ${env.siteUrl}\n\n--\n${unsubUrl ? `Unsubscribe: ${unsubUrl}` : 'You are receiving this because you subscribed to updates from Codigix Infotech.'}`;
  return { html, text };
}

/** The email every new subscriber receives straight after signing up. */
export function renderWelcome(unsubUrl, ctx, name = '') {
  const subject = 'Thanks for subscribing to Codigix Infotech';
  const rows = `<p style="margin:0 0 14px">${hello(name)}</p>
<p style="margin:0 0 14px">Thank you for subscribing. We are Codigix Infotech, a small team in Pune that builds websites and helps organizations keep their online information accurate, accessible and clearly written.</p>
<p style="margin:0 0 14px">From time to time we will send you a short note when we publish something useful, such as a new guide on website performance, accessibility, or keeping listings and service details correct. We will not send you anything frequently, and we do not share your email address.</p>
<p style="margin:0 0 14px">If you would like to see what we have written so far, our ${link(`${env.siteUrl}/blog`, 'blog')} is the best place to start. And if you have a question or something you would like us to cover, just reply to this email. A real person reads it.</p>`;
  const html = layout({ title: subject, preview: 'Thank you for subscribing. A short note from the Codigix team.', rows, unsubUrl, ctx });
  const text = `${hello(name)}\n\nThank you for subscribing. We are Codigix Infotech, a small team in Pune that builds websites and helps organizations keep their online information accurate, accessible and clearly written.\n\nFrom time to time we will send you a short note when we publish something useful. We do not share your email address.\n\nOur blog is the best place to start: ${env.siteUrl}/blog\nIf you have a question, just reply to this email.\n\nRegards,\nThe team at Codigix Infotech\n${env.siteUrl}\n\n--\n${unsubUrl ? `Unsubscribe: ${unsubUrl}` : 'You are receiving this because you subscribed to updates from Codigix Infotech.'}`;
  return { subject, html, text };
}

/* ---------------- Sending ---------------- */

export async function sendTest(newsletter, email) {
  const ctx = await loadContext({ withPosts: !!newsletter.include_posts });
  const { html, text } = renderEmail(newsletter, null, ctx, firstName({ email }));
  await sendMail({ to: email, subject: newsletter.subject, html, text });
}

export async function sendWelcomeTest(email) {
  const ctx = await loadContext();
  const { subject, html, text } = renderWelcome(null, ctx, firstName({ email }));
  await sendMail({ to: email, subject: subject, html, text });
}

async function tokenFor(sub) {
  if (sub.unsubscribe_token) return sub.unsubscribe_token;
  const token = newToken();
  await query('UPDATE subscribers SET unsubscribe_token = ? WHERE id = ?', [token, sub.id]);
  return token;
}

export async function sendWelcome(email) {
  const sub = await one('SELECT id, email, name, unsubscribe_token FROM subscribers WHERE email = ?', [email]);
  if (!sub) return;
  const token = await tokenFor(sub);
  const url = unsubscribeUrl(token);
  const ctx = await loadContext();
  const { subject, html, text } = renderWelcome(url, ctx, firstName(sub));
  await sendMail({ to: email, subject, html, text, headers: unsubscribeHeaders(token) });
  await query('UPDATE subscribers SET welcome_sent_at = ? WHERE id = ?', [new Date().toISOString().slice(0, 19).replace('T', ' '), sub.id]);
}

/**
 * Send an issue to every current subscriber. Runs in the background; progress is written to the
 * newsletters row (status, sent_count, failed_count). Returns the number of recipients.
 */
export async function sendToSubscribers(id) {
  const subs = await query("SELECT id, email, name, unsubscribe_token FROM subscribers WHERE status = 'subscribed' ORDER BY id");
  setImmediate(async () => {
    let sent = 0;
    let failed = 0;
    let lastError = null;
    try {
      const issue = await one('SELECT subject, preview_text, body_html, include_posts FROM newsletters WHERE id = ?', [id]);
      const ctx = await loadContext({ withPosts: !!issue.include_posts });
      for (const sub of subs) {
        try {
          const token = await tokenFor(sub);
          const url = unsubscribeUrl(token);
          const { html, text } = renderEmail(issue, url, ctx, firstName(sub));
          await sendMail({ to: sub.email, subject: issue.subject, html, text, headers: unsubscribeHeaders(token) });
          sent += 1;
        } catch (err) {
          failed += 1;
          lastError = String(err.message || err).slice(0, 480);
        }
        await sleep(Number(process.env.MAIL_SEND_DELAY_MS || 400));
        // Keep the progress visible while a long list is going out.
        if ((sent + failed) % 10 === 0) {
          await query('UPDATE newsletters SET sent_count = ?, failed_count = ? WHERE id = ?', [sent, failed, id]);
        }
      }
      const status = sent === 0 && failed > 0 ? 'failed' : 'sent';
      await query('UPDATE newsletters SET status = ?, sent_count = ?, failed_count = ?, last_error = ?, sent_at = ? WHERE id = ?', [
        status, sent, failed, lastError, new Date().toISOString().slice(0, 19).replace('T', ' '), id,
      ]);
    } catch (err) {
      await query("UPDATE newsletters SET status = 'failed', sent_count = ?, failed_count = ?, last_error = ? WHERE id = ?", [
        sent, failed, String(err.message || err).slice(0, 480), id,
      ]).catch(() => {});
    }
  });
  return subs.length;
}
