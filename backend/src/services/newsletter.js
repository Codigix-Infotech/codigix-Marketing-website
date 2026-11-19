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

/* ---------------- Template building blocks ---------------- */

const button = (href, label, { solid = true } = {}) =>
  `<a href="${esc(href)}" style="display:inline-block;margin:4px 6px 4px 0;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:bold;text-decoration:none;${
    solid ? `background:${RED};color:#ffffff;` : `background:#ffffff;color:${NAVY};border:1px solid #d8dbe9;`
  }">${esc(label)}</a>`;

const feature = (title, text, accent) => `
<tr><td style="padding:0 0 12px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fe;border-radius:12px"><tr>
    <td width="6" style="background:${accent};border-radius:12px 0 0 12px"></td>
    <td style="padding:14px 16px">
      <div style="font-size:15px;font-weight:bold;color:${NAVY};margin-bottom:3px">${esc(title)}</div>
      <div style="font-size:13.5px;line-height:1.6;color:#4b5563">${esc(text)}</div>
    </td></tr></table>
</td></tr>`;

function postCards(posts) {
  if (!posts.length) return '';
  const cards = posts
    .map(
      (p) => `
<tr><td style="padding:0 0 12px">
  <a href="${esc(`${env.siteUrl}/blog/${p.slug}`)}" style="text-decoration:none;display:block;border:1px solid #e5e7f2;border-radius:12px;padding:14px 16px">
    <div style="font-size:15px;font-weight:bold;color:${NAVY};line-height:1.4">${esc(p.title)}</div>
    ${p.excerpt ? `<div style="font-size:13px;line-height:1.6;color:#6b7280;margin-top:4px">${esc(String(p.excerpt).slice(0, 160))}${String(p.excerpt).length > 160 ? '…' : ''}</div>` : ''}
    <div style="font-size:13px;font-weight:bold;color:${BLUE};margin-top:8px">Read the article &rarr;</div>
  </a>
</td></tr>`
    )
    .join('');
  return `
<tr><td style="padding:8px 32px 8px">
  <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${RED};margin-bottom:10px">Latest from our blog</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${cards}</table>
</td></tr>`;
}

function contactBlock({ contact, social }) {
  const lines = [];
  if (contact.email) lines.push(`<a href="mailto:${esc(contact.email)}" style="color:${BLUE};text-decoration:none">${esc(contact.email)}</a>`);
  if (contact.phone) lines.push(esc(contact.phone));
  const addr = [contact.address_line1, contact.address_line2].filter(Boolean).join(', ');
  if (addr) lines.push(esc(addr));
  const socials = [
    ['LinkedIn', social.linkedin],
    ['Instagram', social.instagram],
    ['Facebook', social.facebook],
    ['YouTube', social.youtube],
    ['X', social.twitter],
  ]
    .filter(([, url]) => url)
    .map(([name, url]) => `<a href="${esc(url)}" style="color:${NAVY};text-decoration:none;font-weight:bold">${name}</a>`)
    .join(' &nbsp;&middot;&nbsp; ');
  return `
<tr><td style="padding:8px 32px 28px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7f2"><tr><td style="padding-top:18px;font-size:13px;line-height:1.8;color:#4b5563">
    <div style="font-weight:bold;color:${NAVY};margin-bottom:2px">Questions? We are happy to help.</div>
    ${lines.join('<br>')}
    ${socials ? `<div style="margin-top:10px">${socials}</div>` : ''}
  </td></tr></table>
</td></tr>`;
}

/** The shared outer layout: header, content rows, footer. */
function layout({ title, preview, rows, unsubUrl, ctx }) {
  const footerLine = unsubUrl
    ? `You are receiving this email because you subscribed to updates from Codigix Infotech.<br><a href="${esc(unsubUrl)}" style="color:#6b7280;text-decoration:underline">Unsubscribe</a> at any time.`
    : 'This is a test send of a Codigix Infotech email.';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f5fb;font-family:Arial,Helvetica,sans-serif;color:#1f2937">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preview || '')}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5fb;padding:28px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(26,16,83,0.08)">
  <tr><td style="background:${NAVY};padding:22px 32px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="font-size:26px;font-weight:bold;color:#ffffff;letter-spacing:-0.5px"><span style="color:${RED}">&#9679;</span> codigix</td>
      <td align="right" style="font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#b9b4e6">Infotech</td>
    </tr></table>
  </td></tr>
  <tr><td style="height:4px;background:${BLUE};background:linear-gradient(90deg,${BLUE},#7c3aed,${RED});font-size:0;line-height:0">&nbsp;</td></tr>
  ${rows}
  ${contactBlock(ctx)}
  <tr><td style="padding:18px 32px;background:#f9fafb;font-size:12px;line-height:1.7;color:#6b7280;text-align:center">
    ${footerLine}<br>
    Codigix Infotech, Pune, India. The information shared is for general informational purposes only and is not medical advice.
  </td></tr>
</table></td></tr></table></body></html>`;
}

/* ---------------- The two emails ---------------- */

/** A regular issue written in the admin panel. */
export function renderEmail({ subject, preview_text, body_html, include_posts }, unsubUrl, ctx) {
  const rows = `
  <tr><td style="padding:32px 32px 6px">
    <h1 style="margin:0;font-size:24px;line-height:1.3;color:${NAVY}">${esc(subject)}</h1>
  </td></tr>
  <tr><td style="padding:10px 32px 18px;font-size:15px;line-height:1.7;color:#374151">${body_html}</td></tr>
  <tr><td style="padding:0 32px 22px">${button(env.siteUrl, 'Visit our website')}${button(`${env.siteUrl}/blog`, 'Read the blog', { solid: false })}</td></tr>
  ${include_posts ? postCards(ctx.posts) : ''}`;
  const html = layout({ title: subject, preview: preview_text, rows, unsubUrl, ctx });
  const text = `${subject}\n\n${htmlToText(body_html)}\n\nWebsite: ${env.siteUrl}\nBlog: ${env.siteUrl}/blog\n\n--\n${unsubUrl ? `Unsubscribe: ${unsubUrl}` : 'Test send'}`;
  return { html, text };
}

/** The email every new subscriber receives straight after signing up. */
export function renderWelcome(unsubUrl, ctx) {
  const subject = 'Welcome to the Codigix Infotech newsletter';
  const rows = `
  <tr><td style="padding:0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f5ff;background:linear-gradient(135deg,#f3f4ff,#fff5f6)"><tr><td style="padding:34px 32px 30px">
      <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${RED}">You are subscribed</div>
      <h1 style="margin:8px 0 10px;font-size:28px;line-height:1.25;color:${NAVY}">Welcome to Codigix Infotech</h1>
      <p style="margin:0;font-size:15px;line-height:1.7;color:#4b5563">Thank you for subscribing. We are a Pune-based technology and digital communication firm, and we will occasionally share practical, factual updates you can use.</p>
    </td></tr></table>
  </td></tr>
  <tr><td style="padding:26px 32px 6px">
    <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${RED};margin-bottom:12px">What you can expect</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${feature('Web engineering insights', 'Clear guidance on fast, accessible and well-structured websites.', BLUE)}
      ${feature('Accurate digital information', 'Practical tips for keeping listings, service details and content correct and consistent.', '#7c3aed')}
      ${feature('Responsible health communication', 'Educational, non-promotional approaches aligned with Indian ethical communication guidelines.', RED)}
    </table>
  </td></tr>
  <tr><td style="padding:10px 32px 18px">
    <div style="font-size:15px;line-height:1.7;color:#374151;margin-bottom:12px">A good place to start:</div>
    ${button(`${env.siteUrl}/services`, 'Explore our services')}${button(`${env.siteUrl}/blog`, 'Read the blog', { solid: false })}${button(`${env.siteUrl}/contact`, 'Get in touch', { solid: false })}
  </td></tr>
  <tr><td style="padding:6px 32px 20px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fe;border-radius:12px"><tr><td style="padding:14px 16px;font-size:13px;line-height:1.7;color:#4b5563">
      <strong style="color:${NAVY}">Your privacy.</strong> We only store your email address and handle it under the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023. We never sell it, and every email has an unsubscribe link.
    </td></tr></table>
  </td></tr>`;
  const html = layout({ title: subject, preview: 'Thank you for subscribing. Here is what to expect from us.', rows, unsubUrl, ctx });
  const text = `Welcome to Codigix Infotech\n\nThank you for subscribing. We will occasionally share practical, factual updates on web engineering, accurate digital information and responsible health communication.\n\nServices: ${env.siteUrl}/services\nBlog: ${env.siteUrl}/blog\nContact: ${env.siteUrl}/contact\n\nWe only store your email address and handle it under the IT Act, 2000 and the DPDP Act, 2023.\n\n--\n${unsubUrl ? `Unsubscribe: ${unsubUrl}` : 'Test send'}`;
  return { subject, html, text };
}

/* ---------------- Sending ---------------- */

export async function sendTest(newsletter, email) {
  const ctx = await loadContext({ withPosts: !!newsletter.include_posts });
  const { html, text } = renderEmail(newsletter, null, ctx);
  await sendMail({ to: email, subject: `[Test] ${newsletter.subject}`, html, text });
}

export async function sendWelcomeTest(email) {
  const ctx = await loadContext();
  const { subject, html, text } = renderWelcome(null, ctx);
  await sendMail({ to: email, subject: `[Test] ${subject}`, html, text });
}

async function tokenFor(sub) {
  if (sub.unsubscribe_token) return sub.unsubscribe_token;
  const token = newToken();
  await query('UPDATE subscribers SET unsubscribe_token = ? WHERE id = ?', [token, sub.id]);
  return token;
}

export async function sendWelcome(email) {
  const sub = await one('SELECT id, unsubscribe_token FROM subscribers WHERE email = ?', [email]);
  if (!sub) return;
  const token = await tokenFor(sub);
  const url = unsubscribeUrl(token);
  const ctx = await loadContext();
  const { subject, html, text } = renderWelcome(url, ctx);
  await sendMail({ to: email, subject, html, text, headers: unsubscribeHeaders(token) });
  await query('UPDATE subscribers SET welcome_sent_at = ? WHERE id = ?', [new Date().toISOString().slice(0, 19).replace('T', ' '), sub.id]);
}

/**
 * Send an issue to every current subscriber. Runs in the background; progress is written to the
 * newsletters row (status, sent_count, failed_count). Returns the number of recipients.
 */
export async function sendToSubscribers(id) {
  const subs = await query("SELECT id, email, unsubscribe_token FROM subscribers WHERE status = 'subscribed' ORDER BY id");
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
          const { html, text } = renderEmail(issue, url, ctx);
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
