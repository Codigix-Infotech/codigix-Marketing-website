import { MetadataRoute } from 'next';
import { getBlogSitemap, getJobs } from '@/lib/api';
import { SITE_URL } from '@/lib/config';

export const revalidate = 3600;

// Static pages change on deploy, so report the server start (deploy) time rather than
// "now" on every regeneration — a lastmod that always moves teaches Google to ignore it.
const DEPLOYED_AT = new Date();

const staticPages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/best-seo-services-in-pcmc', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/paid-advertisements-ppc', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/social-media-marketing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/ecommerce-marketing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/medical-content-marketing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/web-design-development', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/cookies', changeFrequency: 'yearly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blog, jobs] = await Promise.all([getBlogSitemap(), getJobs()]);

  return [
    ...staticPages.map((p) => ({ url: `${SITE_URL}${p.path}`, lastModified: DEPLOYED_AT, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...blog.categories.map((c) => ({
      url: `${SITE_URL}/blog/category/${c.slug}`,
      lastModified: new Date(c.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...blog.data.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...jobs.map((j) => ({
      url: `${SITE_URL}/careers/${j.slug}`,
      lastModified: new Date(j.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
  ];
}
