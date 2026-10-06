'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3, Briefcase, ChevronDown, ExternalLink, FileText, FolderTree, Gauge, HelpCircle, ImageIcon, Inbox, LayoutDashboard,
  LogOut, Mail, Menu, MessageSquareQuote, PlaySquare, Settings, UserCircle, Users, UsersRound, X, Building2, UserCheck,
  type LucideIcon,
} from 'lucide-react';
import { api } from '@/lib/admin/api';
import { AuthProvider, useAuth } from './AuthProvider';
import { cx, FeedbackProvider, Spinner } from './ui';

type NavItem = { href: string; label: string; icon: LucideIcon; badge?: string; adminOnly?: boolean };

const NAV: { heading: string; items: NavItem[] }[] = [
  { heading: '', items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }] },
  {
    heading: 'Content',
    items: [
      { href: '/admin/blogs', label: 'Blog Posts', icon: FileText },
      { href: '/admin/categories', label: 'Categories', icon: FolderTree },
      { href: '/admin/hero-dashboard', label: 'Hero Dashboard', icon: Gauge },
      { href: '/admin/clients', label: 'Clients', icon: Building2 },
      { href: '/admin/videos', label: 'Videos', icon: PlaySquare },
      { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
      { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
      { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
    ],
  },
  {
    heading: 'Careers',
    items: [
      { href: '/admin/careers', label: 'Job Openings', icon: Briefcase },
      { href: '/admin/applications', label: 'Applications', icon: UserCheck, badge: 'newApps' },
    ],
  },
  {
    heading: 'Leads',
    items: [
      { href: '/admin/messages', label: 'Contact Messages', icon: Inbox, badge: 'newMessages' },
      { href: '/admin/subscribers', label: 'Subscribers', icon: Mail },
    ],
  },
  {
    heading: 'System',
    items: [
      { href: '/admin/settings', label: 'Site Settings', icon: Settings, adminOnly: true },
      { href: '/admin/users', label: 'Users', icon: UsersRound, adminOnly: true },
    ],
  },
];

function isActive(pathname: string, href: string) {
  return href === '/admin' ? pathname === '/admin' : pathname === href || pathname.startsWith(`${href}/`);
}

function Sidebar({ open, onClose, badges = {} }: { open: boolean; onClose: () => void; badges?: Record<string, number> }) {
  const pathname = usePathname();
  const { user } = useAuth();
  return (
    <>
      <div className={cx('fixed inset-0 z-40 bg-slate-900/40 lg:hidden', open ? 'block' : 'hidden')} onClick={onClose} />
      <aside
        className={cx(
          'fixed inset-y-0 left-0 z-50 w-64 bg-[#130c3d] text-slate-300 flex flex-col transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-1">
              <img src="/logo.png" alt="" className="w-full h-full object-contain" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white leading-tight">Codigix Infotech</span>
              <span className="block text-[10px] uppercase tracking-wider text-indigo-300/80">Admin Panel</span>
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white" aria-label="Close menu"><X size={18} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {NAV.map((group) => {
            const items = group.items.filter((i) => !i.adminOnly || user?.role === 'admin');
            if (!items.length) return null;
            return (
              <div key={group.heading || 'main'}>
                {group.heading && <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{group.heading}</p>}
                <ul className="space-y-0.5">
                  {items.map((item) => {
                    const active = isActive(pathname, item.href);
                    const count = item.badge ? (badges?.[item.badge] ?? 0) : 0;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cx(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                            active ? 'bg-white/10 text-white shadow-[inset_2px_0_0_#818cf8]' : 'hover:bg-white/5 hover:text-white'
                          )}
                        >
                          <item.icon size={17} className={active ? 'text-indigo-300' : 'text-slate-400'} />
                          <span className="flex-1">{item.label}</span>
                          {count > 0 && <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#e20b27] text-white text-[10px] font-bold flex items-center justify-center">{count}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/5 hover:text-white">
            <ExternalLink size={16} /> View website
          </a>
        </div>
      </aside>
    </>
  );
}

function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  if (!user) return null;
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2.5 rounded-lg pl-1 pr-2 py-1 hover:bg-slate-100">
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-[#1a1053] text-white text-sm font-semibold flex items-center justify-center">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <span className="hidden sm:block text-left">
          <span className="block text-sm font-semibold text-slate-800 leading-tight">{user.name}</span>
          <span className="block text-[11px] text-slate-500 capitalize">{user.role}</span>
        </span>
        <ChevronDown size={14} className="text-slate-400" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-52 z-40 rounded-xl bg-white shadow-xl ring-1 ring-slate-200 py-1.5">
            <p className="px-4 py-2 text-xs text-slate-500 truncate">{user.email}</p>
            <Link href="/admin/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <UserCircle size={16} /> My profile
            </Link>
            <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [badges, setBadges] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) return;
    api<{ stats?: Record<string, number>; counts?: Record<string, number> }>('/admin/overview')
      .then((r) => setBadges(r?.stats || r?.counts || {}))
      .catch(() => setBadges({}));
  }, [user, pathname]);

  if (pathname === '/admin/login') return <>{children}</>;
  if (loading || !user) return <div className="min-h-screen bg-slate-50"><Spinner label="Checking your session…" /></div>;

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} badges={badges} />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur border-b border-slate-200/70 flex items-center justify-between px-4 md:px-8">
          <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-600" aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500">
            <BarChart3 size={14} /> Changes publish to the live website instantly.
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/blogs/new" className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-[#1a1053] text-white text-sm font-semibold hover:bg-[#2b1f7a]">
              + New post
            </Link>
            <UserMenu />
          </div>
        </header>
        <main className="px-4 md:px-8 py-6 md:py-8 ">{children}</main>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FeedbackProvider>
        <Shell>{children}</Shell>
      </FeedbackProvider>
    </AuthProvider>
  );
}

