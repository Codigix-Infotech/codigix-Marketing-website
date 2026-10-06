import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/ecommerce-marketing';
const TITLE = 'Healthcare E-Commerce Marketing in Pune & PCMC | Codigix';
const DESCRIPTION = 'Sell healthcare products online with confidence: e-commerce SEO, Amazon & Flipkart optimization and ROI-driven ads for health brands in Pune & PCMC.';

export const generateMetadata = () =>
  pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, keywords: ['ecommerce marketing Pune', 'ecommerce SEO PCMC', 'Amazon Flipkart optimization', 'healthcare ecommerce'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = serviceJsonLd({ name: 'E-Commerce Marketing', serviceType: 'E-commerce marketing', description: DESCRIPTION, path: PATH });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {children}
    </>
  );
}
