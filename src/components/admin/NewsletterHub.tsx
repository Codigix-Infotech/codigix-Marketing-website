'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Mail, Send, UserPlus, Users } from 'lucide-react';
import ResourceManager from './ResourceManager';
import { Button, cx, formatDateTime, Modal, StatusBadge, Textarea, useConfirm, useToast } from './ui';
import { api } from '@/lib/admin/api';

type MailStatus = { configured: boolean; from: string | null; subscribers: number; siteUrl?: string; siteUrlIsLocal?: boolean; senderIsFreeMail?: boolean; senderDomain?: string };
type Stats = {
  active: number;
  unsubscribed: number;
  last30: number;
  issuesSent: number;
  drafts: number;
  last: { subject: string; sent_at: string; sent_count: number } | null;
};
type Tab = 'newsletters' | 'subscribers';

const code = 'rounded bg-white/70 px-1';

function StatCard({ label, value, hint, tone }: { label: string; value: React.ReactNode; hint?: React.ReactNode; tone: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
        <span className={cx('h-2.5 w-2.5 rounded-full', tone)} />
      </div>
      <div className="mt-2 text-2xl font-bold text-slate-900">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-slate-500 truncate">{hint}</div>}
    </div>
  );
}

/* ---------------- Add / import subscribers ---------------- */
function ImportModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
  const toast = useToast();
  const [emails, setEmails] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<null | { added: number; existing: number; unsubscribed: number; invalidCount: number; invalid: string[] }>(null);

  useEffect(() => {
    if (open) {
      setEmails('');
      setConsent(false);
      setResult(null);
    }
  }, [open]);

  const submit = async () => {
    setBusy(true);
    try {
      const res = await api<any>('/admin/newsletters/subscribers/import', { method: 'POST', body: { emails, consent } });
      setResult(res);
      onDone();
      toast(`${res.added} subscriber${res.added === 1 ? '' : 's'} added.`, 'success');
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add subscribers"
      size="max-w-xl"
      footer={
        result ? (
          <Button onClick={onClose}>Done</Button>
        ) : (
          <>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button onClick={submit} loading={busy} disabled={!emails.trim() || !consent} icon={<UserPlus size={16} />}>Add subscribers</Button>
          </>
        )
      }
    >
      {result ? (
        <div className="space-y-2 text-sm text-slate-700">
          <p><strong className="text-emerald-700">{result.added}</strong> new subscriber{result.added === 1 ? '' : 's'} added.</p>
          {result.existing > 0 && <p>{result.existing} already subscribed (skipped).</p>}
          {result.unsubscribed > 0 && <p>{result.unsubscribed} had unsubscribed earlier and were <strong>not</strong> re-added. They must sign up again themselves.</p>}
          {result.invalidCount > 0 && (
            <p className="text-rose-600">
              {result.invalidCount} not valid: {result.invalid.join(', ')}
              {result.invalidCount > result.invalid.length ? '…' : ''}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="import-emails" className="mb-1.5 block text-sm font-medium text-slate-700">Email addresses</label>
            <Textarea
              id="import-emails"
              rows={7}
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder={'one@example.com\ntwo@example.com, three@example.com'}
            />
            <p className="mt-1 text-xs text-slate-500">Paste one or many, separated by new lines, commas or spaces. Duplicates are ignored.</p>
          </div>
          <label className="flex items-start gap-2.5 text-sm text-slate-600">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300" />
            <span>I confirm these people have agreed to receive emails from Codigix Infotech (required under the DPDP Act, 2023). Every email includes an unsubscribe link.</span>
          </label>
        </div>
      )}
    </Modal>
  );
}

/* ---------------- Newsletters tab ---------------- */
function NewslettersPanel({ mail, onChanged }: { mail: MailStatus | null; onChanged: () => void }) {
  const toast = useToast();
  const confirm = useConfirm();
  const [refreshKey, setRefreshKey] = useState(0);
  const [watching, setWatching] = useState(false);
  const watchRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // While an issue is going out, poll until nothing is "sending" any more, then refresh.
  useEffect(() => {
    if (!watching) return undefined;
    watchRef.current = setInterval(async () => {
      try {
        const res = await api<{ data: unknown[] }>('/admin/newsletters?status=sending&limit=1');
        if (!res.data.length) {
          setWatching(false);
          setRefreshKey((k) => k + 1);
          onChanged();
          toast('Newsletter finished sending.', 'success');
        }
      } catch {
        /* keep polling */
      }
    }, 2500);
    return () => {
      if (watchRef.current) clearInterval(watchRef.current);
    };
  }, [watching, toast, onChanged]);

  const sendTest = async (id: number) => {
    const email = window.prompt('Send a test copy to which email address?');
    if (!email) return;
    try {
      const res = await api<{ message: string }>(`/admin/newsletters/${id}/test`, { method: 'POST', body: { email } });
      toast(res.message, 'success');
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  };

  const sendWelcomePreview = async () => {
    const email = window.prompt('Send a copy of the automatic welcome email to which address?');
    if (!email) return;
    try {
      const res = await api<{ message: string }>('/admin/newsletters/welcome-test', { method: 'POST', body: { email } });
      toast(res.message, 'success');
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  };

  const sendAll = async (id: number, subject: string) => {
    const count = mail?.subscribers;
    const ok = await confirm({
      title: 'Send to all subscribers?',
      message: `"${subject}" will be emailed to ${count ?? 'all'} active subscriber${count === 1 ? '' : 's'}. This cannot be undone.`,
      confirmLabel: 'Send now',
    });
    if (!ok) return;
    try {
      const res = await api<{ message: string }>(`/admin/newsletters/${id}/send`, { method: 'POST' });
      toast(res.message, 'success');
      setWatching(true);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  };

  return (
    <ResourceManager
      key={refreshKey}
      config={{
        endpoint: '/admin/newsletters',
        title: 'Newsletters',
        singular: 'Newsletter',
        description: 'Write news and updates, send a test to yourself, then send it to everyone who subscribed.',
        emptyIcon: <Mail size={20} />,
        drawerWidth: 'max-w-3xl',
        searchPlaceholder: 'Search by subject…',
        filters: [
          {
            name: 'status',
            label: 'Status',
            options: ['draft', 'sending', 'sent', 'failed'].map((v) => ({ value: v, label: v[0].toUpperCase() + v.slice(1) })),
          },
        ],
        defaults: { subject: '', preview_text: '', body_html: '', include_posts: false },
        columns: [
          {
            key: 'subject',
            label: 'Subject',
            render: (r) => (
              <span>
                <span className="block font-semibold text-slate-800">{r.subject}</span>
                {r.preview_text && <span className="block text-xs text-slate-500">{r.preview_text}</span>}
              </span>
            ),
          },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
          {
            key: 'sent_count',
            label: 'Delivery',
            render: (r) =>
              r.status === 'draft' ? (
                <span className="text-slate-400">—</span>
              ) : (
                <span className="text-xs text-slate-600">
                  {r.sent_count} sent
                  {r.failed_count ? <span className="text-rose-600"> · {r.failed_count} failed</span> : null}
                  {r.last_error && r.failed_count ? (
                    <span className="block text-[11px] text-rose-500 max-w-[220px] truncate" title={r.last_error}>
                      {r.last_error}
                    </span>
                  ) : null}
                </span>
              ),
          },
          { key: 'sent_at', label: 'Sent on', render: (r) => <span className="text-xs text-slate-500">{r.sent_at ? formatDateTime(r.sent_at) : '—'}</span> },
        ],
        fields: [
          { name: 'subject', label: 'Subject', required: true, counter: { max: 200 }, full: true, hint: 'Shown as the email subject and the heading of the email.' },
          { name: 'preview_text', label: 'Preview text', counter: { max: 255 }, full: true, hint: 'Short line shown next to the subject in most inboxes.' },
          {
            name: 'body_html',
            label: 'Content',
            type: 'richtext',
            required: true,
            full: true,
            hint: 'Share news, updates and links. Keep it factual: no patient testimonials, rankings or outcome claims. The Codigix header, buttons, contact details and unsubscribe link are added automatically.',
          },
          {
            name: 'include_posts',
            label: 'Add my latest blog posts to the bottom of this email',
            type: 'toggle',
            full: true,
            description: 'Shows your 3 most recent published blog posts as clickable cards, so subscribers also see your newest articles.',
          },
        ],
        headerActions: (
          <Button variant="secondary" icon={<Mail size={16} />} onClick={sendWelcomePreview}>
            Preview welcome email
          </Button>
        ),
        rowActions: (r) =>
          r.status === 'sending' ? (
            <span className="px-1 text-[11px] font-medium text-indigo-600">Sending…</span>
          ) : (
            <>
              <button type="button" onClick={() => sendTest(r.id)} className="rounded-lg px-2 py-1 text-xs font-medium text-slate-500 hover:bg-indigo-50 hover:text-indigo-600">
                Test
              </button>
              {r.status !== 'sent' && (
                <button
                  type="button"
                  onClick={() => sendAll(r.id, r.subject)}
                  className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-2 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
                >
                  <Send size={12} /> Send
                </button>
              )}
            </>
          ),
      }}
    />
  );
}

/* ---------------- Subscribers tab ---------------- */
function SubscribersPanel({ onChanged }: { onChanged: () => void }) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [sendingId, setSendingId] = useState<number | null>(null);
  const sendWelcome = async (id: number) => {
    setSendingId(id);
    try {
      const res = await api<{ message: string }>(`/admin/newsletters/subscribers/${id}/welcome`, { method: 'POST' });
      toast(res.message, 'success');
      setRefreshKey((k) => k + 1);
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setSendingId(null);
    }
  };
  const [refreshKey, setRefreshKey] = useState(0);
  const statusOptions = [
    { value: 'subscribed', label: 'Subscribed' },
    { value: 'unsubscribed', label: 'Unsubscribed' },
  ];

  return (
    <>
      <ResourceManager
        key={refreshKey}
        config={{
          endpoint: '/admin/subscribers',
          title: 'Subscribers',
          singular: 'Subscriber',
          description: 'Everyone who signed up from the website, plus anyone you add. Export to CSV at any time.',
          emptyIcon: <Mail size={20} />,
          canCreate: false,
          exportable: true,
          searchPlaceholder: 'Search by email…',
          headerActions: (
            <Button icon={<UserPlus size={16} />} onClick={() => setOpen(true)}>
              Add / Import
            </Button>
          ),
          filters: [{ name: 'status', label: 'Status', options: statusOptions }],
          columns: [
            { key: 'email', label: 'Email', render: (r) => <span className="font-medium text-slate-800">{r.email}</span> },
            { key: 'source', label: 'Source', render: (r) => <span className="text-slate-600">{r.source || '—'}</span> },
            { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
            { key: 'created_at', label: 'Subscribed on', render: (r) => <span className="text-xs text-slate-500">{formatDateTime(r.created_at)}</span> },
            {
              key: 'welcome_sent_at',
              label: 'Welcome email',
              render: (r) =>
                r.status !== 'subscribed' ? (
                  <span className="text-slate-400">—</span>
                ) : r.welcome_sent_at ? (
                  <span className="text-xs text-emerald-700">Sent {formatDateTime(r.welcome_sent_at).split(',')[0]}</span>
                ) : (
                  <span className="text-xs font-medium text-amber-600">Not sent</span>
                ),
            },
          ],
          rowActions: (r) =>
            r.status === 'subscribed' ? (
              <button
                type="button"
                disabled={sendingId === r.id}
                onClick={() => sendWelcome(r.id)}
                className="rounded-lg px-2 py-1 text-xs font-medium text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-50"
              >
                {sendingId === r.id ? 'Sending…' : r.welcome_sent_at ? 'Resend welcome' : 'Send welcome'}
              </button>
            ) : null,
          fields: [{ name: 'status', label: 'Status', type: 'select', options: statusOptions }],
        }}
      />
      <ImportModal
        open={open}
        onClose={() => setOpen(false)}
        onDone={() => {
          setRefreshKey((k) => k + 1);
          onChanged();
        }}
      />
    </>
  );
}

/* ---------------- Hub ---------------- */
export default function NewsletterHub({ initialTab = 'newsletters' }: { initialTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [mail, setMail] = useState<MailStatus | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  const load = useCallback(() => {
    api<MailStatus>('/admin/newsletters/mail-status').then(setMail).catch(() => setMail(null));
    api<Stats>('/admin/newsletters/stats').then(setStats).catch(() => setStats(null));
  }, []);
  useEffect(load, [load]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'newsletters', label: 'Newsletters', icon: <Send size={15} /> },
    { id: 'subscribers', label: 'Subscribers', icon: <Users size={15} /> },
  ];

  return (
    <div>
      {mail && (
        <div
          className={cx(
            'mb-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm',
            mail.configured ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-900'
          )}
        >
          {mail.configured ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertTriangle size={18} className="mt-0.5 shrink-0" />}
          <div>
            {mail.configured ? (
              <>Email is configured. Sending from <strong>{mail.from}</strong>.</>
            ) : (
              <>
                <strong>Email sending is not set up yet.</strong> You can write and save newsletters, but to send them add{' '}
                <code className={code}>SMTP_HOST</code>, <code className={code}>SMTP_USER</code>, <code className={code}>SMTP_PASS</code> and{' '}
                <code className={code}>MAIL_FROM</code> to <code className={code}>backend/.env</code> and restart the API.
              </>
            )}
          </div>
        </div>
      )}

      {mail?.configured && mail.siteUrlIsLocal && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <div>
            <strong>Fix the website address before sending real emails.</strong> <code className={code}>SITE_URL</code> in{' '}
            <code className={code}>backend/.env</code> is <code className={code}>{mail.siteUrl}</code>, so the buttons and the unsubscribe link in
            every email would point to your own computer and not work for subscribers. Set it to your live website address and restart the API.
          </div>
        </div>
      )}

      {mail?.configured && mail.senderIsFreeMail && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
            <div>
              <strong>Emails may land in spam: they are sent from a free {mail.senderDomain} address.</strong> Inbox providers trust mail that
              comes from your own domain far more than from a shared one, and they compare the sender with the links inside the email (yours point
              to your website). To fix it:
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>Create a mailbox on your own domain, for example <code className={code}>news@codigix.co</code>, with your hosting or email provider (or use Brevo, Amazon SES or Zoho).</li>
                <li>In your domain&apos;s DNS, add the <strong>SPF</strong>, <strong>DKIM</strong> and <strong>DMARC</strong> records that provider gives you.</li>
                <li>Put that mailbox&apos;s SMTP details in <code className={code}>backend/.env</code> (<code className={code}>EMAIL_HOST / USER / PASS / FROM</code>) and restart the API.</li>
              </ol>
              <div className="mt-2 text-xs">Until then: ask subscribers to mark the email &ldquo;Not spam&rdquo; and add you to contacts, and send small batches.</div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active subscribers" value={stats ? stats.active : '—'} hint={stats ? `${stats.unsubscribed} unsubscribed` : undefined} tone="bg-emerald-500" />
        <StatCard label="New, last 30 days" value={stats ? stats.last30 : '—'} hint="Sign-ups and imports" tone="bg-blue-500" />
        <StatCard label="Issues sent" value={stats ? stats.issuesSent : '—'} hint={stats ? `${stats.drafts} draft${stats.drafts === 1 ? '' : 's'}` : undefined} tone="bg-indigo-500" />
        <StatCard
          label="Last issue"
          value={stats?.last ? `${stats.last.sent_count} sent` : '—'}
          hint={stats?.last ? `${stats.last.subject} · ${formatDateTime(stats.last.sent_at).split(',')[0]}` : 'Nothing sent yet'}
          tone="bg-amber-500"
        />
      </div>

      <div role="tablist" className="mb-5 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cx(
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              tab === t.id ? 'bg-[#1a1053] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'newsletters' ? <NewslettersPanel mail={mail} onChanged={load} /> : <SubscribersPanel onChanged={load} />}
    </div>
  );
}
