import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/medical-content-marketing';
const TITLE = 'Health & Institutional Content Architecture | Codigix';
const DESCRIPTION = 'Accurate public-health education, department guides and institutional content, written for clarity and reviewed for compliance before publication.';

export const generateMetadata = () =>
  pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, keywords: ['medical content marketing', 'healthcare content writing', 'practitioner credential disclosure', 'patient education content'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = serviceJsonLd({ name: 'Medical Content Marketing', serviceType: 'Content marketing', description: DESCRIPTION, path: PATH });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {children}
    </>
  );
}
