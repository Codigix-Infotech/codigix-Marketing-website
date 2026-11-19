import { Router } from 'express';
import { dialect, one, query } from '../config/db.js';
import env from '../config/env.js';
import { createCrudRouter } from '../services/crud.js';
import { mailConfigured } from '../services/mailer.js';
import { newToken, sendTest, sendToSubscribers, sendWelcome, sendWelcomeTest } from '../services/newsletter.js';
import { buildRecord } from '../utils/fields.js';
import { badRequest, notFound } from '../utils/httpError.js';

const crud = createCrudRouter({
  table: 'newsletters',
  fields: {
    subject: { type: 'string', required: true, max: 200, label: 'Subject' },
    preview_text: { type: 'string', max: 255 },
    body_html: { type: 'html', required: true, label: 'Content' },
    include_posts: { type: 'bool', default: 0 },
  },
  boolColumns: ['include_posts'],
  searchable: ['subject'],
  filterable: ['status'],
  defaultOrder: 'created_at DESC',
  sortable: ['subject', 'status', 'sent_at'],
});

const router = Router();

/** Sending needs SMTP settings; the admin page shows this so staff know before they hit Send. */
router.get('/mail-status', async (_req, res) => {
  const row = await one("SELECT COUNT(*) AS n FROM subscribers WHERE status = 'subscribed'");
  // Links in every email (buttons, unsubscribe) are built from SITE_URL, so localhost there means broken links.
  const siteUrlIsLocal = /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i.test(env.siteUrl);
  // Sending from a free-mail address (gmail.com etc.) is the most common cause of newsletters landing in spam.
  const fromAddress = (env.smtp.from.match(/<([^>]+)>/)?.[1] || env.smtp.from || '').toLowerCase();
  const senderIsFreeMail = /@(gmail|googlemail|yahoo|outlook|hotmail|live|rediffmail)\./.test(fromAddress);
  res.json({
    configured: mailConfigured(),
    from: mailConfigured() ? env.smtp.from : null,
    subscribers: Number(row?.n || 0),
    siteUrl: env.siteUrl,
    siteUrlIsLocal,
    senderIsFreeMail,
    senderDomain: fromAddress.split('@')[1] || '',
  });
});

/** Numbers for the hub header cards. */
router.get('/stats', async (_req, res) => {
  const n = async (sql) => Number((await one(sql))?.n || 0);
  const [active, unsubscribed, last30, issuesSent, drafts] = await Promise.all([
    n("SELECT COUNT(*) AS n FROM subscribers WHERE status = 'subscribed'"),
    n("SELECT COUNT(*) AS n FROM subscribers WHERE status = 'unsubscribed'"),
    n(`SELECT COUNT(*) AS n FROM subscribers WHERE created_at >= ${dialect === 'mysql' ? 'DATE_SUB(UTC_TIMESTAMP(), INTERVAL 30 DAY)' : "datetime('now', '-30 days')"}`),
    n("SELECT COUNT(*) AS n FROM newsletters WHERE status = 'sent'"),
    n("SELECT COUNT(*) AS n FROM newsletters WHERE status = 'draft'"),
  ]);
  const last = await one("SELECT subject, sent_at, sent_count FROM newsletters WHERE status = 'sent' ORDER BY sent_at DESC LIMIT 1");
  res.json({ active, unsubscribed, last30, issuesSent, drafts, last });
});

/**
 * Add subscribers by hand: paste one or many emails (separated by commas, semicolons, spaces or new lines).
 * Existing subscribers are left alone, and anyone who has unsubscribed is NOT re-subscribed:
 * they withdrew consent and must sign up again themselves.
 */
router.post('/subscribers/import', async (req, res) => {
  const raw = String(req.body?.emails || '');
  if (req.body?.consent !== true) throw badRequest('Please confirm that these people have agreed to receive your emails.');
  const found = [...new Set(raw.split(/[\s,;]+/).map((e) => e.trim().toLowerCase()).filter(Boolean))];
  if (!found.length) throw badRequest('Paste at least one email address.');
  if (found.length > 2000) throw badRequest('Please import 2,000 addresses or fewer at a time.');
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  let added = 0;
  let existing = 0;
  let unsubscribed = 0;
  const invalid = [];
  for (const email of found) {
    if (!EMAIL_RE.test(email) || email.length > 190) {
      invalid.push(email);
      continue;
    }
    const row = await one('SELECT id, status FROM subscribers WHERE email = ?', [email]);
    if (!row) {
      await query('INSERT INTO subscribers (email, source, unsubscribe_token) VALUES (?, ?, ?)', [email, 'admin-import', newToken()]);
      added += 1;
    } else if (row.status === 'unsubscribed') {
      unsubscribed += 1;
    } else {
      existing += 1;
    }
  }
  res.json({ ok: true, added, existing, unsubscribed, invalid: invalid.slice(0, 20), invalidCount: invalid.length });
});

/** (Re)send the welcome email to one subscriber, e.g. someone who signed up before email was set up. */
router.post('/subscribers/:id/welcome', async (req, res) => {
  const sub = await one('SELECT id, email, status FROM subscribers WHERE id = ?', [req.params.id]);
  if (!sub) throw notFound('Subscriber not found');
  if (sub.status !== 'subscribed') throw badRequest('This person has unsubscribed, so no email can be sent.');
  if (!mailConfigured()) throw badRequest('Email is not configured. Set SMTP_HOST and MAIL_FROM in backend/.env and restart the API.');
  try {
    await sendWelcome(sub.email);
  } catch (err) {
    throw badRequest(`Could not send the welcome email: ${err.message}`);
  }
  res.json({ ok: true, message: `Welcome email sent to ${sub.email}.` });
});

/** Send yourself a copy of the automatic welcome email, to see exactly what new subscribers get. */
router.post('/welcome-test', async (req, res) => {
  const { email } = buildRecord({ email: { type: 'email', required: true, label: 'Email' } }, req.body);
  if (!mailConfigured()) throw badRequest('Email is not configured. Set SMTP_HOST and MAIL_FROM in backend/.env and restart the API.');
  try {
    await sendWelcomeTest(email);
  } catch (err) {
    throw badRequest(`Could not send the test email: ${err.message}`);
  }
  res.json({ ok: true, message: `Welcome email sent to ${email}.` });
});

router.post('/:id/test', async (req, res) => {
  const { email } = buildRecord({ email: { type: 'email', required: true, label: 'Email' } }, req.body);
  const issue = await one('SELECT subject, preview_text, body_html, include_posts FROM newsletters WHERE id = ?', [req.params.id]);
  if (!issue) throw notFound('Newsletter not found');
  if (!mailConfigured()) throw badRequest('Email is not configured. Set SMTP_HOST and MAIL_FROM in backend/.env and restart the API.');
  try {
    await sendTest(issue, email);
  } catch (err) {
    throw badRequest(`Could not send the test email: ${err.message}`);
  }
  res.json({ ok: true, message: `Test email sent to ${email}.` });
});

router.post('/:id/send', async (req, res) => {
  const issue = await one('SELECT id, status FROM newsletters WHERE id = ?', [req.params.id]);
  if (!issue) throw notFound('Newsletter not found');
  if (!mailConfigured()) throw badRequest('Email is not configured. Set SMTP_HOST and MAIL_FROM in backend/.env and restart the API.');
  if (issue.status === 'sending') throw badRequest('This newsletter is already being sent.');
  if (issue.status === 'sent') throw badRequest('This newsletter has already been sent. Duplicate it to send again.');
  await query("UPDATE newsletters SET status = 'sending', sent_count = 0, failed_count = 0, last_error = NULL WHERE id = ?", [issue.id]);
  const recipients = await sendToSubscribers(issue.id);
  if (recipients === 0) {
    await query("UPDATE newsletters SET status = 'draft' WHERE id = ?", [issue.id]);
    throw badRequest('There are no active subscribers to send to yet.');
  }
  res.status(202).json({ ok: true, recipients, message: `Sending to ${recipients} subscriber${recipients === 1 ? '' : 's'}…` });
});

router.use(crud);
export default router;
