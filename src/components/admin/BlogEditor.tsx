'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, CalendarClock, Check, CheckCircle2, ChevronDown, Circle, Copy, ExternalLink, Globe, Loader2, Plus, Search, Share2,
  Sparkles, Trash2, X, XCircle, AlertCircle, Wrench,
} from 'lucide-react';
import { api, type ListResponse } from '@/lib/admin/api';
import { mediaUrl, SITE_URL } from '@/lib/config';
import { analyzeSeo, stripHtml } from '@/lib/admin/seo-analysis';
import RichTextEditor from './RichTextEditor';
import { ImageField } from './MediaLibrary';
import { ObjectListEditor } from './ListEditors';
import { Badge, Button, Card, cx, Field, Input, Select, Spinner, Textarea, Toggle, useConfirm, useToast } from './ui';

export interface BlogForm {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  cover_image_alt: string;
  category_id: number | '';
  tags: string[];
  author_name: string;
  author_role: string;
  author_bio: string;
  author_avatar: string;
  author_url: string;
  reviewed_by: string;
  reviewer_credentials: string;
  last_reviewed_at: string | null;
  status: 'draft' | 'published' | 'scheduled';
  is_featured: boolean;
  published_at: string | null;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  secondary_keywords: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  robots_index: boolean;
  robots_follow: boolean;
  schema_type: 'BlogPosting' | 'Article' | 'NewsArticle' | 'MedicalWebPage';
  faqs: { question: string; answer: string }[];
  custom_schema?: string;
  views?: number;
  word_count?: number;
  reading_time?: number;
  updated_at?: string;
}

const EMPTY: BlogForm = {
  title: '', slug: '', excerpt: '', content: '', cover_image: '', cover_image_alt: '', category_id: '', tags: [],
  author_name: 'Codigix Team', author_role: 'Healthcare Growth Strategists', author_bio: '', author_avatar: '', author_url: '',
  reviewed_by: '', reviewer_credentials: '', last_reviewed_at: null,
  status: 'draft', is_featured: false, published_at: null, meta_title: '', meta_description: '', focus_keyword: '',
  secondary_keywords: '', canonical_url: '', og_title: '', og_description: '', og_image: '', robots_index: true,
  robots_follow: true, schema_type: 'BlogPosting', custom_schema: '', faqs: [],
};

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/&/g, ' and ').replace(/_/g, ' ')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 200);

const toLocalInput = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** Calendar date for <input type="date">, read in local time (MySQL returns local midnight). */
const toDateInput = (v: string | null) => {
  if (!v) return '';
  if (/^\d{4}-\d{2}-\d{2}(T00:00:00(\.000)?Z)?$/.test(v)) return v.slice(0, 10); // date-only value
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const siteHost = SITE_URL.replace(/^https?:\/\//, '');
const trunc = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/* ---------------- SEO widgets ---------------- */
function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-16 h-16 shrink-0" role="img" aria-label={`SEO score ${score} out of 100`}>
      <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
        <circle cx="32" cy="32" r={r} stroke="#e2e8f0" strokeWidth="6" fill="none" />
        <circle cx="32" cy="32" r={r} stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (score / 100) * c} className="transition-all duration-500" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-800 tabular-nums">{score}</span>
    </div>
  );
}

function SerpPreview({ form }: { form: BlogForm }) {
  const [mobile, setMobile] = useState(false);
  const title = form.meta_title || form.title || 'Your post title';
  const desc = form.meta_description || form.excerpt || stripHtml(form.content).slice(0, 160) || 'Your meta description will appear here. Write a compelling summary that makes searchers click.';
  const date = form.published_at ? new Date(form.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5"><Search size={13} /> Google search preview</p>
        <div className="flex rounded-lg border border-slate-200 text-[11px] overflow-hidden">
          <button type="button" onClick={() => setMobile(false)} className={cx('px-2 py-0.5', !mobile && 'bg-slate-100 font-semibold')}>Desktop</button>
          <button type="button" onClick={() => setMobile(true)} className={cx('px-2 py-0.5', mobile && 'bg-slate-100 font-semibold')}>Mobile</button>
        </div>
      </div>
      <div className={cx('rounded-lg border border-slate-200 bg-white p-4 font-[arial,sans-serif]', mobile ? 'max-w-[380px]' : '')}>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
            <img src="/logo.webp" alt="" className="w-5 h-5 object-contain" onError={(e) => { if (!e.currentTarget.src.endsWith('/logo.png')) e.currentTarget.src = '/logo.png'; }} />
          </span>
          <div className="leading-tight">
            <p className="text-[13px] text-[#202124]">Codigix Infotech</p>
            <p className="text-[12px] text-[#4d5156]">{siteHost} › blog › {form.slug || 'your-post-url'}</p>
          </div>
        </div>
        <p className={cx('text-[#1a0dab] hover:underline cursor-pointer leading-snug', mobile ? 'text-[18px]' : 'text-[20px]')}>{trunc(title, 60)}</p>
        <p className="text-[14px] text-[#4d5156] leading-[1.58] mt-1">
          {date && <span className="text-[#70757a]">{date} — </span>}
          {trunc(desc, mobile ? 120 : 160)}
        </p>
      </div>
    </div>
  );
}

function SocialPreview({ form }: { form: BlogForm }) {
  const image = form.og_image || form.cover_image;
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5"><Share2 size={13} /> Facebook / LinkedIn / WhatsApp preview</p>
      <div className="max-w-[500px] rounded-lg border border-slate-200 overflow-hidden bg-white">
        <div className="aspect-[1.91/1] bg-slate-100">
          {image ? <img src={mediaUrl(image)} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No image — add a cover or social image</div>}
        </div>
        <div className="px-3 py-2.5 bg-[#f0f2f5]">
          <p className="text-[11px] uppercase text-slate-500">{siteHost}</p>
          <p className="text-[15px] font-semibold text-slate-900 leading-snug line-clamp-2">{form.og_title || form.meta_title || form.title || 'Post title'}</p>
          <p className="text-[13px] text-slate-600 line-clamp-1">{form.og_description || form.meta_description || form.excerpt}</p>
        </div>
      </div>
    </div>
  );
}

function TagInput({ value, onChange, suggestions }: { value: string[]; onChange: (v: string[]) => void; suggestions: string[] }) {
  const [text, setText] = useState('');
  const add = (raw: string) => {
    const t = raw.trim().replace(/^#/, '');
    if (t && !value.some((v) => v.toLowerCase() === t.toLowerCase())) onChange([...value, t]);
    setText('');
  };
  const options = suggestions.filter((s) => !value.includes(s) && s.toLowerCase().includes(text.toLowerCase())).slice(0, 6);
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 rounded-lg border border-slate-200 bg-white p-1.5 focus-within:ring-2 focus-within:ring-indigo-500/40 focus-within:border-indigo-500">
        {value.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium pl-2 pr-1 py-1">
            #{t}
            <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} className="hover:text-rose-600" aria-label={`Remove ${t}`}><X size={12} /></button>
          </span>
        ))}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              add(text);
            } else if (e.key === 'Backspace' && !text && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          onBlur={() => text && add(text)}
          placeholder={value.length ? '' : 'Type and press Enter'}
          className="flex-1 min-w-[100px] text-sm px-1.5 py-1 outline-none bg-transparent"
        />
      </div>
      {text && options.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {options.map((o) => (
            <button key={o} type="button" onClick={() => add(o)} className="text-xs px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600">+ {o}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function Section({ title, children, defaultOpen = true, badge }: { title: string; children: React.ReactNode; defaultOpen?: boolean; badge?: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="bg-white rounded-xl border border-slate-200/80">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-5 py-3.5">
        <span className="text-sm font-semibold text-slate-900 flex items-center gap-2">{title} {badge}</span>
        <ChevronDown size={16} className={cx('text-slate-400 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="px-5 pb-5 pt-1 border-t border-slate-100">{children}</div>}
    </section>
  );
}

/* ---------------- Editor ---------------- */
export default function BlogEditor({ id }: { id?: number }) {
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();
  const [form, setForm] = useState<BlogForm>(EMPTY);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!id);
  const [savedSlug, setSavedSlug] = useState('');
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'ok' | 'taken'>('idle');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [seoTab, setSeoTab] = useState<'search' | 'social' | 'advanced'>('search');
  const saveRef = useRef<(s?: BlogForm['status']) => void>(() => { });

  const set = useCallback(<K extends keyof BlogForm>(key: K, value: BlogForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
  }, []);

  useEffect(() => {
    api<ListResponse<{ id: number; name: string }>>('/admin/blog-categories?limit=200').then((r) => setCategories(r.data)).catch(() => { });
    api<ListResponse<{ tags: string[] }>>('/admin/blogs?limit=200')
      .then((r) => setTagSuggestions(Array.from(new Set(r.data.flatMap((b) => b.tags || [])))))
      .catch(() => { });
  }, []);

  useEffect(() => {
    if (!id) return;
    api<{ data: BlogForm }>(`/admin/blogs/${id}`)
      .then(({ data }) => {
        const clean = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v === null && k !== 'published_at' ? (EMPTY as any)[k] ?? '' : v]));
        setForm({ ...EMPTY, ...clean, category_id: data.category_id ?? '', tags: data.tags || [], faqs: data.faqs || [] } as BlogForm);
        setSavedSlug(data.slug);
        setDirty(false);
      })
      .catch((e) => toast(e.message, 'error'))
      .finally(() => setLoading(false));
  }, [id, toast]);

  // Auto slug from title until the slug is edited by hand.
  useEffect(() => {
    if (!slugTouched) setForm((f) => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, slugTouched]);

  useEffect(() => {
    if (!form.slug) return setSlugStatus('idle');
    setSlugStatus('checking');
    const t = setTimeout(() => {
      api<{ available: boolean }>(`/admin/blogs/slug-available?slug=${encodeURIComponent(form.slug)}&exclude=${id || 0}`)
        .then((r) => setSlugStatus(r.available ? 'ok' : 'taken'))
        .catch(() => setSlugStatus('idle'));
    }, 400);
    return () => clearTimeout(t);
  }, [form.slug, id]);

  // Warn before leaving with unsaved changes; Ctrl/Cmd+S saves.
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener('beforeunload', beforeUnload);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
      window.removeEventListener('keydown', onKey);
    };
  }, [dirty]);

  const seo = useMemo(() => analyzeSeo(form), [form]);

  async function save(nextStatus?: BlogForm['status']) {
    if (!form.title.trim()) {
      toast('Please add a title first', 'error');
      return;
    }
    let status = nextStatus || form.status;
    let published_at = form.published_at;
    if (status === 'published' && published_at && new Date(published_at) > new Date(Date.now() + 60000)) status = 'scheduled';
    if (status === 'scheduled' && !published_at) {
      toast('Choose a publish date & time to schedule this post', 'error');
      return;
    }
    if (status === 'published' && !published_at) published_at = new Date().toISOString();

    setSaving(nextStatus || 'save');
    try {
      const payload = { ...form, status, published_at, category_id: form.category_id || null };
      delete (payload as any).id;
      delete (payload as any).views;
      delete (payload as any).word_count;
      delete (payload as any).reading_time;
      delete (payload as any).updated_at;
      const res = id
        ? await api<{ data: BlogForm }>(`/admin/blogs/${id}`, { method: 'PUT', body: payload })
        : await api<{ data: BlogForm }>('/admin/blogs', { method: 'POST', body: payload });
      setForm((f) => ({ ...f, ...res.data, category_id: res.data.category_id ?? '', tags: res.data.tags || [], faqs: res.data.faqs || [] }));
      setDirty(false);
      setSlugTouched(true);
      setSavedSlug(res.data.slug);
      toast(status === 'published' ? 'Post published — it is live on the website' : status === 'scheduled' ? 'Post scheduled' : 'Draft saved');
      if (!id && res.data.id) router.replace(`/admin/blogs/${res.data.id}`);
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setSaving(null);
    }
  }
  saveRef.current = save;

  async function remove() {
    if (!id) return;
    const ok = await confirm({ title: 'Delete this post?', message: 'It will be removed from the website permanently.', confirmLabel: 'Delete', danger: true });
    if (!ok) return;
    try {
      await api(`/admin/blogs/${id}`, { method: 'DELETE' });
      setDirty(false);
      toast('Post deleted');
      router.push('/admin/blogs');
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  }

  async function addCategory() {
    if (!newCategory.trim()) return;
    try {
      const { data } = await api<{ data: { id: number; name: string } }>('/admin/blog-categories', { method: 'POST', body: { name: newCategory.trim() } });
      setCategories((c) => [...c, data]);
      set('category_id', data.id);
      setNewCategory('');
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  }

  function autofillSeo() {
    const text = stripHtml(form.content);
    setForm((f) => ({
      ...f,
      meta_title: f.meta_title || trunc(f.title, 60),
      meta_description: f.meta_description || trunc(f.excerpt || text, 158),
      excerpt: f.excerpt || trunc(text, 200),
      cover_image_alt: f.cover_image_alt || (f.cover_image ? f.title : ''),
    }));
    setDirty(true);
    toast('Empty SEO fields filled from your content — review them before publishing', 'info');
  }

  if (loading) return <Spinner label="Loading post…" />;

  const isLive = form.status === 'published' || (form.status === 'scheduled' && form.published_at && new Date(form.published_at) <= new Date());
  const groups = ['Keyword', 'Meta', 'Trust', 'Content', 'Readability'] as const;
  const customSchemaError = (() => {
    const raw = (form.custom_schema || '').trim();
    if (!raw) return null;
    if (/^<script/i.test(raw)) return 'Remove the <script> tags — paste only the JSON inside them.';
    try {
      const v = JSON.parse(raw);
      return v && typeof v === 'object' ? null : 'Must be a JSON object or array.';
    } catch (e) {
      return `Invalid JSON: ${(e as Error).message}`;
    }
  })();

  return (
    <div className="pb-16">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/blogs" className="p-2 rounded-lg hover:bg-white text-slate-500" aria-label="Back to posts"><ArrowLeft size={18} /></Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{id ? 'Edit post' : 'New post'}</h1>
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <Badge tone={form.status === 'published' ? 'green' : form.status === 'scheduled' ? 'blue' : 'gray'}>{form.status}</Badge>
              {dirty ? <span className="text-amber-600">Unsaved changes</span> : id ? <span>All changes saved</span> : null}
              <span className="hidden sm:inline text-slate-400">· Ctrl+S to save</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {isLive && form.slug && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noreferrer">
              <Button variant="secondary" icon={<ExternalLink size={15} />}>View live</Button>
            </a>
          )}
          {form.status === 'draft' ? (
            <>
              <Button variant="secondary" onClick={() => save('draft')} loading={saving === 'draft'}>Save draft</Button>
              <Button variant="success" onClick={() => save('published')} loading={saving === 'published'} icon={<Globe size={15} />}>
                {form.published_at && new Date(form.published_at) > new Date() ? 'Schedule' : 'Publish'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={() => save('draft')} loading={saving === 'draft'}>Unpublish</Button>
              <Button onClick={() => save()} loading={saving === 'save'} icon={<Check size={15} />}>Update</Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        {/* Main column */}
        <div className="space-y-6 min-w-0">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
            <div>
              <textarea
                value={form.title}
                onChange={(e) => set('title', e.target.value.replace(/\n/g, ''))}
                placeholder="Post title"
                rows={1}
                className="w-full resize-none text-2xl md:text-3xl font-bold text-slate-900 placeholder:text-slate-300 outline-none leading-tight"
                style={{ fieldSizing: 'content' } as React.CSSProperties}
                aria-label="Post title"
              />
              <p className={cx('text-[11px] font-semibold mt-1', form.title.length > 70 ? 'text-amber-600' : 'text-slate-400')}>{form.title.length} characters · shown as the H1 on the article</p>
            </div>
            <Field label="URL slug" hint={<span className="font-mono">{siteHost}/blog/<strong className="text-slate-700">{form.slug || '…'}</strong></span>}>
              <div className="relative">
                <Input
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set('slug', slugify(e.target.value).slice(0, 200) + (e.target.value.endsWith('-') ? '-' : ''));
                  }}
                  onBlur={() => set('slug', slugify(form.slug))}
                  className="pr-28 font-mono text-[13px]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold">
                  {slugStatus === 'checking' && <Loader2 size={14} className="animate-spin text-slate-400" />}
                  {slugStatus === 'ok' && <span className="text-emerald-600">Available</span>}
                  {slugStatus === 'taken' && <span className="text-amber-600">Taken · will add -2</span>}
                </span>
              </div>
            </Field>
            {form.status === 'published' && savedSlug && form.slug !== savedSlug && (
              <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">Changing the URL of a published post breaks existing links and rankings. Only change it if you have to.</p>
            )}
            <Field label="Excerpt" hint="Short summary shown on blog cards and under the title (1–2 sentences)." counter={{ value: form.excerpt.length, min: 80, max: 220 }}>
              <Textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} placeholder="What will readers learn from this article?" />
            </Field>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-slate-700">Content</p>
              <p className="text-xs text-slate-500 tabular-nums">{seo.words.toLocaleString('en-IN')} words · ~{Math.max(1, Math.round(seo.words / 200))} min read</p>
            </div>
            <RichTextEditor value={form.content} onChange={(html) => set('content', html)} folder="blog" />
            <p className="text-xs text-slate-500 mt-2">Tip: use H2 for main sections and H3 for sub-sections — they build the article&apos;s table of contents automatically.</p>
          </div>

          <Section title="FAQ section" badge={form.faqs.length ? <Badge tone="blue">{form.faqs.length}</Badge> : <Badge>Recommended</Badge>} defaultOpen={form.faqs.length > 0}>
            <p className="text-xs text-slate-500 mb-3">FAQs are shown at the end of the article and added as FAQPage schema, which can win extra space in Google results and AI answers.</p>
            <ObjectListEditor
              layout="card"
              value={form.faqs}
              onChange={(v) => set('faqs', v)}
              newItem={() => ({ question: '', answer: '' })}
              addLabel="Add question"
              columns={[
                { key: 'question', label: 'Question', placeholder: 'e.g. How long does SEO take for a clinic?' },
                { key: 'answer', label: 'Answer', type: 'textarea', placeholder: 'A clear, direct answer in 2–4 sentences.' },
              ]}
            />
          </Section>

          {/* SEO */}
          <section className="bg-white rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between px-5 pt-4">
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Search size={15} className="text-indigo-600" /> SEO & social</h2>
              <Button size="sm" variant="ghost" icon={<Sparkles size={14} />} onClick={autofillSeo}>Auto-fill empty fields</Button>
            </div>
            <div className="flex gap-1 px-5 mt-3 border-b border-slate-100">
              {([['search', 'Search engines'], ['social', 'Social sharing'], ['advanced', 'Advanced']] as const).map(([k, label]) => (
                <button key={k} type="button" onClick={() => setSeoTab(k)} className={cx('px-3 py-2 text-sm font-medium border-b-2 -mb-px', seoTab === k ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800')}>
                  {label}
                </button>
              ))}
            </div>
            <div className="p-5 space-y-5">
              {seoTab === 'search' && (
                <>
                  <SerpPreview form={form} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Focus keyword" hint="The main phrase you want this post to rank for, e.g. “dermatologist in Kothrud”.">
                      <Input value={form.focus_keyword} onChange={(e) => set('focus_keyword', e.target.value)} placeholder="e.g. healthcare SEO Pune" />
                    </Field>
                    <Field label="Secondary keywords" hint="Comma-separated related phrases and synonyms.">
                      <Input value={form.secondary_keywords} onChange={(e) => set('secondary_keywords', e.target.value)} placeholder="clinic SEO, doctor marketing" />
                    </Field>
                  </div>
                  <Field label="SEO title" hint="The blue headline in Google. Leave empty to use the post title." counter={{ value: (form.meta_title || '').length, min: 30, max: 60 }}>
                    <Input value={form.meta_title} onChange={(e) => set('meta_title', e.target.value)} placeholder={form.title} />
                  </Field>
                  <Field label="Meta description" hint="The grey text under the title in Google. Include the keyword and a reason to click." counter={{ value: (form.meta_description || '').length, min: 120, max: 160 }}>
                    <Textarea value={form.meta_description} onChange={(e) => set('meta_description', e.target.value)} rows={3} placeholder={form.excerpt} />
                  </Field>
                </>
              )}
              {seoTab === 'social' && (
                <>
                  <SocialPreview form={form} />
                  <Field label="Social title" hint="Defaults to the SEO title." counter={{ value: (form.og_title || '').length, max: 70 }}>
                    <Input value={form.og_title} onChange={(e) => set('og_title', e.target.value)} placeholder={form.meta_title || form.title} />
                  </Field>
                  <Field label="Social description" hint="Defaults to the meta description." counter={{ value: (form.og_description || '').length, max: 200 }}>
                    <Textarea value={form.og_description} onChange={(e) => set('og_description', e.target.value)} rows={2} />
                  </Field>
                  <Field label="Social image" hint="1200×630px works best. Defaults to the cover image.">
                    <ImageField value={form.og_image} onChange={(v) => set('og_image', v)} folder="blog" aspect="aspect-[1.91/1] max-w-md" />
                  </Field>
                </>
              )}
              {seoTab === 'advanced' && (
                <div className="space-y-5">
                  <Field label="Canonical URL" hint="Only set this if the article was first published on another site. Leave empty to use this post's own URL.">
                    <Input value={form.canonical_url} onChange={(e) => set('canonical_url', e.target.value)} placeholder={`${SITE_URL}/blog/${form.slug}`} />
                  </Field>
                  <Field label="Schema type" hint="Structured data type added to the page for rich results.">
                    <Select value={form.schema_type} onChange={(e) => set('schema_type', e.target.value as BlogForm['schema_type'])}>
                      <option value="BlogPosting">BlogPosting (recommended for blogs)</option>
                      <option value="Article">Article</option>
                      <option value="NewsArticle">NewsArticle (time-sensitive news)</option>
                      <option value="MedicalWebPage">MedicalWebPage (health information)</option>
                    </Select>
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Toggle checked={form.robots_index} onChange={(v) => set('robots_index', v)} label="Allow search engines to index" description="Turn off to hide this post from Google (noindex)." />
                    <Toggle checked={form.robots_follow} onChange={(v) => set('robots_follow', v)} label="Follow links in this post" description="Turn off to add nofollow to the page." />
                  </div>
                  {!form.robots_index && <p className="text-xs text-rose-700 bg-rose-50 rounded-lg px-3 py-2">This post will not appear in Google and is removed from the sitemap.</p>}
                  <Field label="Custom schema (JSON-LD)" hint="Optional extra structured data, added alongside the automatic Article, Breadcrumb and FAQ schema. Paste the JSON only, without <script> tags. Test it at search.google.com/test/rich-results.">
                    <Textarea value={form.custom_schema || ''} onChange={(e) => set('custom_schema', e.target.value)} rows={6} placeholder='{\n  "@context": "https://schema.org",\n  "@type": "HowTo",\n  "name": "..."\n}' className={cx('font-mono text-xs', customSchemaError && 'border-rose-400 focus:ring-rose-400/40')} />
                  </Field>
                  {customSchemaError ? (
                    <p className="text-xs text-rose-700 bg-rose-50 rounded-lg px-3 py-2 -mt-3">{customSchemaError}</p>
                  ) : (form.custom_schema || '').trim() ? (
                    <p className="text-xs text-emerald-700 -mt-3 flex items-center gap-1"><CheckCircle2 size={13} /> Valid JSON</p>
                  ) : null}
                  {form.faqs.length > 0 && /"FAQPage"/.test(form.custom_schema || '') && (
                    <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 -mt-3">FAQ schema is already generated from the FAQ section — a second FAQPage block duplicates it.</p>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <Card title="Publishing">
            <div className="space-y-4">
              <Field label={form.status === 'draft' ? 'Publish date (optional)' : 'Publish date'} hint="Pick a future date & time to schedule the post.">
                <div className="relative">
                  <CalendarClock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="datetime-local"
                    value={toLocalInput(form.published_at)}
                    onChange={(e) => set('published_at', e.target.value ? new Date(e.target.value).toISOString() : null)}
                    className="pl-9"
                  />
                </div>
              </Field>
              {form.published_at && new Date(form.published_at) > new Date() && (
                <p className="text-xs text-blue-700 bg-blue-50 rounded-lg px-3 py-2">
                  Goes live on {new Date(form.published_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}.
                </p>
              )}
              <Toggle checked={form.is_featured} onChange={(v) => set('is_featured', v)} label="Featured post" description="Pinned to the top of the blog & home page." />
              {id && (
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500">
                  <span>Views</span><span className="text-right font-semibold text-slate-800">{form.views ?? 0}</span>
                  <span>Last saved</span><span className="text-right">{form.updated_at ? new Date(form.updated_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : '—'}</span>
                </div>
              )}
              {id && (
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={<Copy size={13} />}
                    onClick={async () => {
                      const { data } = await api<{ data: { id: number } }>(`/admin/blogs/${id}/duplicate`, { method: 'POST' });
                      toast('Duplicated as a new draft');
                      router.push(`/admin/blogs/${data.id}`);
                    }}
                  >
                    Duplicate
                  </Button>
                  <Button size="sm" variant="ghost" className="text-rose-600 hover:bg-rose-50" icon={<Trash2 size={13} />} onClick={remove}>Delete</Button>
                </div>
              )}
            </div>
          </Card>

          <Card title="SEO score" actions={<Wrench size={14} className="text-slate-400" />}>
            <div className="flex items-center gap-4 mb-4">
              <ScoreRing score={seo.score} />
              <div>
                <p className="text-sm font-semibold text-slate-800">{seo.score >= 80 ? 'Great — ready to rank' : seo.score >= 50 ? 'Good, but can improve' : 'Needs work'}</p>
                <p className="text-xs text-slate-500">
                  {seo.checks.filter((c) => c.status === 'good').length}/{seo.checks.length} checks passed
                </p>
              </div>
            </div>
            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1 -mr-1">
              {groups.map((g) => {
                const items = seo.checks.filter((c) => c.group === g);
                if (!items.length) return null;
                return (
                  <div key={g}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{g}</p>
                    <ul className="space-y-1.5">
                      {items.map((c) => (
                        <li key={c.id} className="flex gap-2 text-xs leading-snug">
                          {c.status === 'good' ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-px" /> : c.status === 'warn' ? <AlertCircle size={14} className="text-amber-500 shrink-0 mt-px" /> : <XCircle size={14} className="text-rose-500 shrink-0 mt-px" />}
                          <span className={c.status === 'good' ? 'text-slate-500' : 'text-slate-700'}>{c.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Cover image">
            <ImageField value={form.cover_image} onChange={(v) => set('cover_image', v)} folder="blog" />
            <Field label="Alt text" className="mt-3" hint="Describe the image — important for SEO & accessibility.">
              <Input value={form.cover_image_alt} onChange={(e) => set('cover_image_alt', e.target.value)} placeholder="e.g. Doctor reviewing clinic website analytics" />
            </Field>
          </Card>

          <Card title="Category & tags">
            <div className="space-y-4">
              <Field label="Category">
                <Select value={form.category_id} onChange={(e) => set('category_id', e.target.value ? Number(e.target.value) : '')}>
                  <option value="">Uncategorised</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Select>
              </Field>
              <div className="flex gap-2">
                <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New category" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())} />
                <Button variant="secondary" onClick={addCategory} icon={<Plus size={14} />} aria-label="Add category" />
              </div>
              <Field label="Tags" hint="Press Enter after each tag.">
                <TagInput value={form.tags} onChange={(v) => set('tags', v)} suggestions={tagSuggestions} />
              </Field>
            </div>
          </Card>

          <Card title="Author" description="Shown on the article — builds E-E-A-T trust signals.">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ImageField value={form.author_avatar} onChange={(v) => set('author_avatar', v)} folder="avatars" compact />
                <div className="flex-1 space-y-2">
                  <Input value={form.author_name} onChange={(e) => set('author_name', e.target.value)} placeholder="Author name" aria-label="Author name" />
                  <Input value={form.author_role} onChange={(e) => set('author_role', e.target.value)} placeholder="Role / credentials" aria-label="Author role" />
                </div>
              </div>
              <Textarea value={form.author_bio} onChange={(e) => set('author_bio', e.target.value)} rows={3} placeholder="Short bio: expertise, qualifications, experience…" aria-label="Author bio" />
              <Field label="Author profile link" hint="LinkedIn or team page — links the author to their credentials.">
                <Input value={form.author_url} onChange={(e) => set('author_url', e.target.value)} placeholder="https://www.linkedin.com/in/…" />
              </Field>
            </div>
          </Card>

          <Card title="Medical review" description="For health advice: the doctor who checked the facts. Shown as “Medically reviewed by” — a key trust signal for Google.">
            <div className="space-y-3">
              <Input value={form.reviewed_by} onChange={(e) => set('reviewed_by', e.target.value)} placeholder="Reviewer name, e.g. Dr. Priya Sharma" aria-label="Reviewer name" />
              <Input value={form.reviewer_credentials} onChange={(e) => set('reviewer_credentials', e.target.value)} placeholder="Credentials, e.g. MBBS, MD (Dermatology)" aria-label="Reviewer credentials" />
              <Field label="Last reviewed on">
                <Input
                  type="date"
                  value={toDateInput(form.last_reviewed_at)}
                  onChange={(e) => set('last_reviewed_at', e.target.value || null)}
                />
              </Field>
            </div>
          </Card>

          <p className="text-[11px] text-slate-400 flex items-center gap-1.5"><Circle size={8} className="fill-slate-300 text-slate-300" /> Reading time, word count and table of contents are generated automatically.</p>
        </aside>
      </div>
    </div>
  );
}
