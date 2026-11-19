import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/best-seo-services-in-pcmc';
const TITLE = 'Technical SEO & Accurate Local Information Management | Codigix';
const DESCRIPTION = 'We help organizations maintain crawlable, fast, and well-structured websites along with accurate business listings across search and map directories. Rankings cannot be guaranteed.';

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
