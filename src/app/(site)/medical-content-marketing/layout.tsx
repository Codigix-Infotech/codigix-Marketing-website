import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/medical-content-marketing';
const TITLE = 'Medical Content Marketing for Doctors & Clinics | Codigix';
const DESCRIPTION = 'Educate patients, build authority and earn trust with healthcare content marketing: clinical blogs, patient education guides and doctor branding.';

export const generateMetadata = () =>
  pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, keywords: ['medical content marketing', 'healthcare content writing', 'doctor personal branding', 'patient education content'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = serviceJsonLd({ name: 'Medical Content Marketing', serviceType: 'Content marketing', description: DESCRIPTION, path: PATH });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {children}
    </>
  );
}
