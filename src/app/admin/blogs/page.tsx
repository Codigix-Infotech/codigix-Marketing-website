'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Copy, ExternalLink, Eye, FileText, Pencil, Plus, Star, Trash2 } from 'lucide-react';
import { api, type ListResponse } from '@/lib/admin/api';
import { mediaUrl } from '@/lib/config';
import {
  Button, Card, cx, EmptyState, PageHeader, Pagination, SearchInput, Select, Spinner, StatusBadge, timeAgo, useConfirm, useToast,
} from '@/components/admin/ui';

interface BlogRow {
  id: number;
  title: string;
  slug: string;
  cover_image: string | null;
  category_name: string | null;
  status: 'draft' | 'published' | 'scheduled';
  is_featured: boolean;
  published_at: string | null;
  updated_at: string;
  views: number;
  reading_time: number;
  focus_keyword: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

const TABS = [
  { value: '', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
  { value: 'scheduled', label: 'Scheduled' },
];

function BlogList() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const confirm = useConfirm();
  const [rows, setRows] = useState<BlogRow[]>([]);
  const [meta, setMeta] = useState<ListResponse<BlogRow>['meta']>({ total: 0, page: 1, limit: 20, pages: 1 });
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number[]>([]);

  const status = params.get('status') || '';
  const search = params.get('search') || '';
  const category = params.get('category_id') || '';
  const sort = params.get('sort') || 'updated';
  const page = Number(params.get('page')) || 1;

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      if (key !== 'page') next.delete('page');
      router.replace(`/admin/blogs?${next}`);
    },
    [params, router]
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({ page: String(page), limit: '20', sort });
      if (status) q.set('status', status);
      if (search) q.set('search', search);
      if (category) q.set('category_id', category);
      const res = await api<ListResponse<BlogRow>>(`/admin/blogs?${q}`);
      setRows(res.data);
      setMeta(res.meta);
      setSelected([]);
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  }, [page, sort, status, search, category, toast]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    api<ListResponse<{ id: number; name: string }>>('/admin/blog-categories?limit=200').then((r) => setCategories(r.data)).catch(() => { });
  }, []);

  const counts = meta.counts || {};
  const totalAll = useMemo(() => Object.values(counts).reduce((a, b) => a + b, 0), [counts]);

  async function bulk(action: 'publish' | 'draft' | 'delete') {
    if (action === 'delete') {
      const ok = await confirm({ title: `Delete ${selected.length} posts?`, message: 'These posts will be permanently removed from the website.', confirmLabel: 'Delete', danger: true });
      if (!ok) return;
    }
    try {
      await api('/admin/blogs/bulk', { method: 'POST', body: { ids: selected, action } });
      toast(`${selected.length} posts ${action === 'delete' ? 'deleted' : action === 'publish' ? 'published' : 'moved to drafts'}`);
      load();
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  }

  async function remove(row: BlogRow) {
    const ok = await confirm({ title: 'Delete this post?', message: `"${row.title}" will be permanently removed.`, confirmLabel: 'Delete', danger: true });
    if (!ok) return;
    try {
      await api(`/admin/blogs/${row.id}`, { method: 'DELETE' });
      toast('Post deleted');
      load();
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  }

  async function duplicate(row: BlogRow) {
    try {
      const { data } = await api<{ data: { id: number } }>(`/admin/blogs/${row.id}/duplicate`, { method: 'POST' });
      toast('Post duplicated as a draft');
      router.push(`/admin/blogs/${data.id}`);
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  }

  const seoGaps = (r: BlogRow) => [!r.focus_keyword, !r.meta_title, !r.meta_description].filter(Boolean).length;

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        description="Write, optimise and publish articles. Published posts appear on /blog instantly."
        actions={<Link href="/admin/blogs/new"><Button icon={<Plus size={16} />}>New post</Button></Link>}
      />

      <div className="flex gap-1 mb-4 border-b border-slate-200">
        {TABS.map((t) => {
          const n = t.value ? counts[t.value] || 0 : totalAll;
          return (
            <button
              key={t.value}
              onClick={() => setParam('status', t.value)}
              className={cx(
                'px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors',
                status === t.value ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
              )}
            >
              {t.label} <span className="ml-1 text-xs font-medium text-slate-400">{n}</span>
            </button>
          );
        })}
      </div>

      <Card bodyClassName="p-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-5 py-3 border-b border-slate-100">
          <div className="flex flex-wrap gap-2">
            <SearchInput value={search} onChange={(v) => setParam('search', v)} placeholder="Search title, slug or keyword…" />
            <Select aria-label="Category" value={category} onChange={(e) => setParam('category_id', e.target.value)} className="!w-auto">
              <option value="">All categories</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
            <Select aria-label="Sort" value={sort} onChange={(e) => setParam('sort', e.target.value)} className="!w-auto">
              <option value="updated">Recently updated</option>
              <option value="newest">Newest published</option>
              <option value="oldest">Oldest</option>
              <option value="views">Most viewed</option>
              <option value="title">Title A–Z</option>
            </Select>
          </div>
          {selected.length > 0 && (
            <div className="flex gap-2">
              <Button size="sm" variant="success" onClick={() => bulk('publish')}>Publish</Button>
              <Button size="sm" variant="secondary" onClick={() => bulk('draft')}>Unpublish</Button>
              <Button size="sm" variant="danger" icon={<Trash2 size={14} />} onClick={() => bulk('delete')}>Delete {selected.length}</Button>
            </div>
          )}
        </div>

        {loading ? (
          <Spinner />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={<FileText size={20} />}
            title={search || status || category ? 'No posts match your filters' : 'No blog posts yet'}
            description="Great content brings patients from Google. Write your first article."
            action={<Link href="/admin/blogs/new"><Button icon={<Plus size={16} />}>Write a post</Button></Link>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 bg-slate-50/70 border-b border-slate-100">
                  <th className="w-10 pl-5 py-2.5">
                    <input
                      type="checkbox"
                      aria-label="Select all"
                      checked={selected.length === rows.length}
                      onChange={() => setSelected(selected.length === rows.length ? [] : rows.map((r) => r.id))}
                    />
                  </th>
                  <th className="px-3 py-2.5">Post</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5 hidden lg:table-cell">SEO</th>
                  <th className="px-3 py-2.5 text-right hidden md:table-cell">Views</th>
                  <th className="px-3 py-2.5 hidden md:table-cell">Updated</th>
                  <th className="pr-5" />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70">
                    <td className="pl-5 py-3">
                      <input
                        type="checkbox"
                        aria-label="Select post"
                        checked={selected.includes(r.id)}
                        onChange={() => setSelected((s) => (s.includes(r.id) ? s.filter((x) => x !== r.id) : [...s, r.id]))}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3 min-w-[280px]">
                        <div className="w-16 h-11 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                          {r.cover_image && <img src={mediaUrl(r.cover_image)} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div className="min-w-0">
                          <Link href={`/admin/blogs/${r.id}`} className="font-semibold text-slate-800 hover:text-indigo-600 line-clamp-1">
                            {r.is_featured && <Star size={13} className="inline mr-1 -mt-0.5 text-amber-500 fill-amber-400" />}
                            {r.title}
                          </Link>
                          <p className="text-xs text-slate-500 truncate">
                            {r.category_name || 'Uncategorised'} · {r.reading_time} min · /blog/{r.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={r.status} />
                      {r.status === 'scheduled' && r.published_at && (
                        <p className="text-[11px] text-slate-500 mt-1">{new Date(r.published_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                      )}
                    </td>
                    <td className="px-3 py-3 hidden lg:table-cell">
                      {seoGaps(r) === 0 ? (
                        <span className="text-xs font-semibold text-emerald-600">✓ Complete</span>
                      ) : (
                        <span className="text-xs font-semibold text-amber-600">{seoGaps(r)} missing</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums text-slate-600 hidden md:table-cell">{r.views.toLocaleString('en-IN')}</td>
                    <td className="px-3 py-3 text-slate-500 text-xs hidden md:table-cell whitespace-nowrap">{timeAgo(r.updated_at)}</td>
                    <td className="pr-5 py-3">
                      <div className="flex items-center justify-end gap-0.5">
                        {r.status !== 'draft' && (
                          <a href={`/blog/${r.slug}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" aria-label="View on website">
                            <ExternalLink size={15} />
                          </a>
                        )}
                        <button onClick={() => duplicate(r)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" aria-label="Duplicate">
                          <Copy size={15} />
                        </button>
                        <Link href={`/admin/blogs/${r.id}`} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" aria-label="Edit">
                          <Pencil size={15} />
                        </Link>
                        <button onClick={() => remove(r)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50" aria-label="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && rows.length > 0 && <Pagination page={meta.page} pages={meta.pages} total={meta.total} onChange={(p) => setParam('page', String(p))} />}
      </Card>
      <p className="text-xs text-slate-400 mt-3 flex items-center gap-1"><Eye size={12} /> Views count one visit per reader session.</p>
    </div>
  );
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <BlogList />
    </Suspense>
  );
}
