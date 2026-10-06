import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/web-design-development';
const TITLE = 'Healthcare Website Design & Development Pune | Codigix';
const DESCRIPTION = 'A website your patients can trust at first glance. Modern, mobile-responsive, sub-1.5s fast loading healthcare websites with seamless appointment booking.';

export const generateMetadata = () =>
  pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, keywords: ['healthcare website design Pune', 'clinic website development', 'hospital website design PCMC'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = serviceJsonLd({ name: 'Website Design & Development', serviceType: 'Web design and development', description: DESCRIPTION, path: PATH });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {children}
    </>
  );
}
