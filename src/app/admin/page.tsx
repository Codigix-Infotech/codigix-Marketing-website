'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  type LucideIcon, AlertTriangle, ArrowRight, Briefcase, Building2, Eye, FileText, UserCheck, Inbox, Mail, PenSquare, PlaySquare, Settings, Gauge,
} from 'lucide-react';
import { api } from '@/lib/admin/api';
import { useAuth } from '@/components/admin/AuthProvider';
import { Card, cx, EmptyState, Spinner, StatusBadge, timeAgo, useToast } from '@/components/admin/ui';

interface Overview {
  stats: Record<string, number>;
  recentMessages: { id: number; first_name: string; last_name: string | null; email: string; service: string | null; status: string; created_at: string }[];
  recentApplications: { id: number; name: string; email: string; job_title: string; status: string; created_at: string }[];
  topPosts: { id: number; title: string; slug: string; views: number }[];
  recentPosts: { id: number; title: string; status: string; updated_at: string }[];
  leadsByDay: { day: string; n: number }[];
  seoIssues: { id: number; title: string; no_meta_title: number; no_meta_description: number; no_focus_keyword: number; no_cover: number; no_cover_alt: number }[];
}

function StatCard({ label, value, icon: Icon, href, tone, sub }: { label: string; value: number | string; icon: LucideIcon; href: string; tone: string; sub?: string }) {
  return (
    <Link href={href} className="group bg-white rounded-xl border border-slate-200/80 p-5 hover:shadow-md hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2 tabular-nums">{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
        </div>
        <span className={cx('w-10 h-10 rounded-lg flex items-center justify-center', tone)}>
          <Icon size={19} />
        </span>
      </div>
    </Link>
  );
}

function LeadsChart({ data }: { data: { day: string; n: number }[] }) {
  const days: { key: string; label: string; n: number }[] = [];
  const map = new Map(data.map((d) => [String(d.day).slice(0, 10), Number(d.n)]));
  for (let i = 29; i >= 0; i -= 1) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    days.push({ key, label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), n: map.get(key) || 0 });
  }
  const max = Math.max(1, ...days.map((d) => d.n));
  const total = days.reduce((s, d) => s + d.n, 0);
  return (
    <div>
      <p className="text-sm text-slate-500 mb-4"><span className="text-2xl font-bold text-slate-900 mr-1.5 tabular-nums">{total}</span>enquiries in the last 30 days</p>
      <div className="flex items-end gap-[3px] h-32" role="img" aria-label={`Contact enquiries per day for the last 30 days, total ${total}`}>
        {days.map((d) => (
          <div key={d.key} className="group relative flex-1 h-full flex items-end">
            <div
              className={cx('w-full rounded-t-[3px] transition-colors', d.n ? 'bg-indigo-500 group-hover:bg-indigo-600' : 'bg-slate-100')}
              style={{ height: `${d.n ? Math.max(8, (d.n / max) * 100) : 4}%` }}
            />
            <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-white opacity-0 group-hover:opacity-100">
              {d.label}: {d.n}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
        <span>{days[0].label}</span>
        <span>Today</span>
      </div>
    </div>
  );
}

export default function AdminHome() {
  const { user } = useAuth();
  const [data, setData] = useState<Overview | null>(null);
  const toast = useToast();

  useEffect(() => {
    api<Overview>('/admin/overview').then(setData).catch((e) => toast(e.message, 'error'));
  }, [toast]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  if (!data) return <Spinner label="Loading dashboard…" />;
  const s = data.stats;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{greeting}, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-sm text-slate-500 mt-1">Here&apos;s what&apos;s happening on codigix.com.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/admin/blogs/new', label: 'Write a post', icon: PenSquare },
            { href: '/admin/hero-dashboard', label: 'Edit hero numbers', icon: Gauge },
            { href: '/admin/settings', label: 'Contact details', icon: Settings },
          ].map((a) => (
            <Link key={a.href} href={a.href} className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50">
              <a.icon size={15} /> {a.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="New messages" value={s.newMessages} icon={Inbox} href="/admin/messages" tone="bg-amber-50 text-amber-600" sub="Awaiting a reply" />
        <StatCard label="New applications" value={s.newApps} icon={UserCheck} href="/admin/applications" tone="bg-violet-50 text-violet-600" sub={`${s.openJobs} open positions`} />
        <StatCard label="Published posts" value={s.published} icon={FileText} href="/admin/blogs" tone="bg-emerald-50 text-emerald-600" sub={`${s.drafts} drafts · ${s.scheduled} scheduled`} />
        <StatCard label="Blog views" value={s.views.toLocaleString('en-IN')} icon={Eye} href="/admin/blogs?sort=views" tone="bg-blue-50 text-blue-600" sub="All-time article views" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card title="Leads" description="Contact form submissions" className="xl:col-span-2">
          <LeadsChart data={data.leadsByDay} />
        </Card>
        <Card title="Website content">
          <ul className="divide-y divide-slate-100 -my-2">
            {[
              { label: 'Clients', value: s.clients, href: '/admin/clients', icon: Building2 },
              { label: 'Videos', value: s.videos, href: '/admin/videos', icon: PlaySquare },
              { label: 'Open jobs', value: s.openJobs, href: '/admin/careers', icon: Briefcase },
              { label: 'Subscribers', value: s.subscribers, href: '/admin/subscribers', icon: Mail },
            ].map((i) => (
              <li key={i.label}>
                <Link href={i.href} className="flex items-center gap-3 py-2.5 group">
                  <i.icon size={16} className="text-slate-400" />
                  <span className="flex-1 text-sm text-slate-700 group-hover:text-indigo-600">{i.label}</span>
                  <span className="text-sm font-semibold text-slate-900 tabular-nums">{i.value}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Recent messages" actions={<Link href="/admin/messages" className="text-xs font-semibold text-indigo-600 inline-flex items-center gap-1">View all <ArrowRight size={13} /></Link>} bodyClassName="p-0">
          {data.recentMessages.length ? (
            <ul className="divide-y divide-slate-100">
              {data.recentMessages.map((m) => (
                <li key={m.id} className="px-5 py-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold flex items-center justify-center shrink-0">{m.first_name.charAt(0).toUpperCase()}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{m.first_name} {m.last_name}</p>
                    <p className="text-xs text-slate-500 truncate">{m.service || m.email}</p>
                  </div>
                  <StatusBadge status={m.status} />
                  <span className="text-xs text-slate-400 w-16 text-right">{timeAgo(m.created_at)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="No messages yet" description="Contact form submissions will appear here." />
          )}
        </Card>

        <Card title="Recent applications" actions={<Link href="/admin/applications" className="text-xs font-semibold text-indigo-600 inline-flex items-center gap-1">View all <ArrowRight size={13} /></Link>} bodyClassName="p-0">
          {data.recentApplications.length ? (
            <ul className="divide-y divide-slate-100">
              {data.recentApplications.map((a) => (
                <li key={a.id} className="px-5 py-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold flex items-center justify-center shrink-0">{a.name.charAt(0).toUpperCase()}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{a.name}</p>
                    <p className="text-xs text-slate-500 truncate">{a.job_title}</p>
                  </div>
                  <StatusBadge status={a.status} />
                  <span className="text-xs text-slate-400 w-16 text-right">{timeAgo(a.created_at)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="No applications yet" description="Job applications will appear here." />
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Top articles" description="By views" bodyClassName="p-0">
          {data.topPosts.length ? (
            <ol className="divide-y divide-slate-100">
              {data.topPosts.map((p, i) => (
                <li key={p.id} className="px-5 py-3 flex items-center gap-3">
                  <span className="w-6 text-sm font-bold text-slate-300 tabular-nums">{i + 1}</span>
                  <Link href={`/admin/blogs/${p.id}`} className="flex-1 min-w-0 text-sm font-medium text-slate-800 hover:text-indigo-600 truncate">{p.title}</Link>
                  <span className="text-sm text-slate-500 tabular-nums inline-flex items-center gap-1"><Eye size={13} /> {p.views}</span>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState title="No published posts yet" />
          )}
        </Card>

        <Card
          title={<span className="inline-flex items-center gap-2"><AlertTriangle size={15} className="text-amber-500" /> SEO health</span>}
          description="Live posts missing important SEO fields"
          bodyClassName="p-0"
        >
          {data.seoIssues.length ? (
            <ul className="divide-y divide-slate-100">
              {data.seoIssues.map((p) => {
                const issues = [
                  p.no_meta_title && 'meta title',
                  p.no_meta_description && 'meta description',
                  p.no_focus_keyword && 'focus keyword',
                  p.no_cover && 'cover image',
                  !p.no_cover && p.no_cover_alt && 'image alt text',
                ].filter(Boolean);
                return (
                  <li key={p.id} className="px-5 py-3">
                    <Link href={`/admin/blogs/${p.id}`} className="text-sm font-medium text-slate-800 hover:text-indigo-600">{p.title}</Link>
                    <p className="text-xs text-amber-700 mt-0.5">Missing: {issues.join(', ')}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyState title="All live posts look great" description="Every published post has its core SEO fields filled in." />
          )}
        </Card>
      </div>
    </div>
  );
}
