import { MetadataRoute } from 'next';
import { INDEXABLE, SITE_URL } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  // Local, staging and preview deployments must never be crawled.
  if (!INDEXABLE) return { rules: { userAgent: '*', disallow: '/' } };

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /_next/ assets stay crawlable: Google needs the JS/CSS to render pages.
      disallow: ['/api/', '/admin'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
