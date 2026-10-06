import 'server-only';
import { API_URL } from './config';
import { defaultClients, defaultDashboard, defaultSettings, defaultVideos } from './defaults';
import type {
  BlogCategory,
  BlogDetailResponse,
  BlogSummary,
  Client,
  Faq,
  HeroDashboardData,
  Job,
  JobSummary,
  PageMeta,
  PublicSettings,
  Testimonial,
  Video,
} from './types';

// Server-side data access for the public site. Every request is cached with ISR and
// tagged so the backend can purge it instantly after an admin edit (see /api/revalidate).
const REVALIDATE_SECONDS = 300;
const SERVER_API_URL = (process.env.API_INTERNAL_URL || API_URL).replace(/\/$/, '');

class NotFoundError extends Error {}

async function get<T>(path: string, tags: string[], revalidate = REVALIDATE_SECONDS): Promise<T> {
  const res = await fetch(`${SERVER_API_URL}/api/public${path}`, {
    next: { revalidate, tags },
    signal: AbortSignal.timeout(8000),
  });
  if (res.status === 404) throw new NotFoundError(path);
  if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

/** Return the fallback when the API is down, so pages still render. */
async function safe<T>(fn: () => Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.warn(`[api] ${label} unavailable, using fallback:`, (err as Error).message);
    return fallback;
  }
}

function merge<T extends object>(base: T, value: Partial<T> | null | undefined): T {
  if (!value) return base;
  const result = { ...base };
  for (const [k, v] of Object.entries(value)) {
    if (v !== undefined && v !== null && v !== '') {
      (result as any)[k] = v;
    }
  }
  return result;
}

export async function getSettings(): Promise<PublicSettings> {
  return safe(
    async () => {
      const { data } = await get<{ data: Partial<PublicSettings> }>('/settings', ['settings']);
      const contactMerged = merge(defaultSettings.contact, data.contact);
      if (contactMerged.address_line1?.includes('Tech Park')) {
        contactMerged.address_line1 = defaultSettings.contact.address_line1;
        contactMerged.address_line2 = defaultSettings.contact.address_line2;
        contactMerged.postal_code = defaultSettings.contact.postal_code;
      }
      return {
        site: merge(defaultSettings.site, data.site),
        seo: merge(defaultSettings.seo, data.seo),
        contact: contactMerged,
        social: merge(defaultSettings.social, data.social),
      };
    },
    defaultSettings,
    'settings'
  );
}

export async function getDashboard(): Promise<HeroDashboardData> {
  return safe(
    async () => {
      const { data } = await get<{ data: Partial<HeroDashboardData> }>('/dashboard', ['dashboard']);
      const merged = merge(defaultDashboard, data);
      if (merged.keywords?.some((k) => /erp|crm|manufacturing/i.test(k.keyword))) {
        merged.keywords = defaultDashboard.keywords;
      }
      if (merged.content?.some((c) => /erp|manufacturing/i.test(c.title))) {
        merged.content = defaultDashboard.content;
      }
      return merged;
    },
    defaultDashboard,
    'dashboard'
  );
}

export const getClients = () =>
  safe(async () => (await get<{ data: Client[] }>('/clients', ['clients'])).data, defaultClients, 'clients');

export const getVideos = () =>
  safe(async () => (await get<{ data: Video[] }>('/videos', ['videos'])).data, defaultVideos, 'videos');

export const getTestimonials = () =>
  safe(async () => (await get<{ data: Testimonial[] }>('/testimonials', ['testimonials'])).data, [], 'testimonials');

export const getFaqs = (page = 'home') =>
  safe(async () => (await get<{ data: Faq[] }>(`/faqs?page=${encodeURIComponent(page)}`, ['faqs'])).data, [], 'faqs');

/* ---------------- Blog ---------------- */
export interface BlogQuery {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  exclude?: string;
}

export async function getBlogs(q: BlogQuery = {}): Promise<{ data: BlogSummary[]; meta: PageMeta }> {
  const params = new URLSearchParams();
  if (q.page) params.set('page', String(q.page));
  if (q.limit) params.set('limit', String(q.limit));
  if (q.category) params.set('category', q.category);
  if (q.tag) params.set('tag', q.tag);
  if (q.search) params.set('search', q.search);
  if (q.featured) params.set('featured', '1');
  if (q.exclude) params.set('exclude', q.exclude);
  return safe(
    () => get(`/blogs?${params}`, ['blogs']),
    { data: [], meta: { total: 0, page: 1, limit: q.limit || 9, pages: 1 } },
    'blogs'
  );
}

export const getBlogCategories = () =>
  safe(async () => (await get<{ data: BlogCategory[] }>('/blogs/categories', ['blogs'])).data, [], 'blog categories');

export const getBlogTags = () =>
  safe(async () => (await get<{ data: { name: string; count: number }[] }>('/blogs/tags', ['blogs'])).data, [], 'blog tags');

/**
 * Returns null only when the post really does not exist (or is not yet published).
 * Any other failure (API or database down) is re-thrown: a 404 would tell Google the article
 * is gone, whereas an error keeps serving the last cached copy (ISR) or shows the error page.
 */
export async function getBlog(slug: string): Promise<BlogDetailResponse | null> {
  try {
    return await get<BlogDetailResponse>(`/blogs/${encodeURIComponent(slug)}`, ['blogs', `blog:${slug}`]);
  } catch (err) {
    if (err instanceof NotFoundError) return null;
    console.warn(`[api] blog ${slug} unavailable:`, (err as Error).message);
    throw err;
  }
}

export const getBlogSitemap = () =>
  safe(
    () =>
      get<{ data: { slug: string; updated_at: string }[]; categories: { slug: string; updated_at: string }[] }>(
        '/blogs/sitemap',
        ['blogs']
      ),
    { data: [], categories: [] },
    'blog sitemap'
  );

/* ---------------- Careers ---------------- */
export const getJobs = () =>
  safe(async () => (await get<{ data: JobSummary[] }>('/jobs', ['jobs'])).data, [], 'jobs');

export async function getJob(slug: string): Promise<Job | null> {
  try {
    return (await get<{ data: Job }>(`/jobs/${encodeURIComponent(slug)}`, ['jobs'])).data;
  } catch (err) {
    if (!(err instanceof NotFoundError)) console.warn(`[api] job ${slug} unavailable:`, (err as Error).message);
    return null;
  }
}
