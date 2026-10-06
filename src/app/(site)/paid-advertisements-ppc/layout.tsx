import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/paid-advertisements-ppc';
const TITLE = 'Google & Meta Ads (PPC) for Healthcare in Pune | Codigix';
const DESCRIPTION = 'Generate high-quality patient leads immediately with data-driven Google Ads & Meta advertising campaigns tailored for clinics and healthcare practices.';

export const generateMetadata = () =>
  pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, keywords: ['PPC agency Pune', 'Google Ads for doctors', 'Meta ads for clinics', 'healthcare PPC'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = serviceJsonLd({ name: 'Paid Advertisements (PPC)', serviceType: 'Pay-per-click advertising', description: DESCRIPTION, path: PATH });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {children}
    </>
  );
}
