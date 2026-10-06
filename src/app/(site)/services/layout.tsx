import { jsonLd } from '@/lib/seo';
import { pageMetadata } from '@/lib/page-seo';
import { SITE_URL } from '@/lib/config';

// The page itself is a client component, so its metadata and structured data live here.
export const generateMetadata = () =>
  pageMetadata({
    title: 'Healthcare Digital Marketing Services in Pune | Codigix',
    description:
      'SEO, Google & Meta ads, social media, content, e-commerce and website development for clinics, hospitals and healthcare brands in Pune & PCMC.',
    path: '/services',
  });

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
  ],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      {children}
    </>
  );
}
