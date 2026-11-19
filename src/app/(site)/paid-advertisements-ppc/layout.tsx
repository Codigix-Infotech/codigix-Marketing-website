import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/paid-advertisements-ppc';
const TITLE = 'Policy-Compliant Paid Digital Campaigns in Pune | Codigix';
const DESCRIPTION = 'Targeted, policy-compliant Google and Meta campaigns with clear, truthful messaging and transparent audience disclosures for organizations in Pune.';

export const generateMetadata = () =>
  pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, keywords: ['PPC agency Pune', 'Google Ads compliance', 'Meta ads for clinics', 'policy-compliant paid campaigns'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = serviceJsonLd({ name: 'Paid Advertisements (PPC)', serviceType: 'Pay-per-click advertising', description: DESCRIPTION, path: PATH });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {children}
    </>
  );
}
