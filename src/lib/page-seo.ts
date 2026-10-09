import 'server-only';
import type { Metadata } from 'next';
import { getSettings } from './api';
import { absoluteUrl, SITE_URL } from './config';

interface PageSeo {
  title: string;
  description: string;
  /** Path of the page, e.g. "/about" — used as the canonical URL. */
  path: string;
  image?: string;
  keywords?: string[];
}

/**
 * Full per-page metadata: canonical, Open Graph and Twitter. Next.js replaces (not merges)
 * nested openGraph/twitter objects, so every static page must set its own or it would
 * inherit the homepage's URL and title.
 */
export async function pageMetadata({ title, description, path, image, keywords }: PageSeo): Promise<Metadata> {
  const { seo, site } = await getSettings();
  const ogImage = absoluteUrl(image || seo.default_og_image || site.logo || '/logo.webp');
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name || 'Codigix Infotech',
      type: 'website',
      locale: 'en_IN',
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: seo.twitter_handle || undefined,
      images: [ogImage],
    },
  };
}

/** JSON-LD for a service landing page: the Service plus its breadcrumb trail. */
export function serviceJsonLd({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType: string }) {
  const url = `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name,
        description,
        serviceType,
        url,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: [
          { '@type': 'City', name: 'Pune' },
          { '@type': 'City', name: 'Pimpri-Chinchwad' },
          { '@type': 'Country', name: 'India' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name, item: url },
        ],
      },
    ],
  };
}
