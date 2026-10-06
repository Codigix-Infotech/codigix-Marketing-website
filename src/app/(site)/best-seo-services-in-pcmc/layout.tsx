import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/best-seo-services-in-pcmc';
const TITLE = 'Best SEO Services in PCMC | Healthcare SEO Agency Pune';
const DESCRIPTION = 'Boost rankings, traffic & patient leads with the best SEO services in PCMC: local SEO, healthcare SEO, technical SEO and content strategy by Codigix.';

export const generateMetadata = () =>
  pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, keywords: ['SEO services in PCMC', 'healthcare SEO Pune', 'local SEO', 'technical SEO', 'Google Maps ranking'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = serviceJsonLd({ name: 'SEO Services', serviceType: 'Search Engine Optimization', description: DESCRIPTION, path: PATH });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {children}
    </>
  );
}
