import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/medical-content-marketing';
const TITLE = 'Health Education & Institutional Content Architecture | Codigix';
const DESCRIPTION = 'We help hospitals, clinics, and health organizations publish clear, well-structured informational pages and public-health educational guides.';

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
