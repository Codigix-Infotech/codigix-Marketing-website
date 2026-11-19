import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/best-seo-services-in-pcmc';
const TITLE = 'SEO Services in PCMC | Technical & Local Profile SEO | Codigix';
const DESCRIPTION = 'Technical SEO, structured data, accurate local profile management and content architecture in PCMC, with no ranking guarantees, by Codigix Infotech.';

export const generateMetadata = () =>
  pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, keywords: ['SEO services in PCMC', 'healthcare SEO Pune', 'local SEO', 'technical SEO', 'Google Business Profile management'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = serviceJsonLd({ name: 'SEO Services', serviceType: 'Search Engine Optimization', description: DESCRIPTION, path: PATH });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {children}
    </>
  );
}
