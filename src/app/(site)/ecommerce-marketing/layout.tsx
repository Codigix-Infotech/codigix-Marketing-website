import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/ecommerce-marketing';
const TITLE = 'Commercial & E-Commerce Solutions in Pune & PCMC | Codigix';
const DESCRIPTION = 'Catalog architecture, storefront performance and digital workflows for commercial and non-regulated retail businesses in Pune & PCMC.';

export const generateMetadata = () =>
  pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, keywords: ['ecommerce marketing Pune', 'ecommerce SEO PCMC', 'Amazon Flipkart optimization', 'retail ecommerce solutions'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = serviceJsonLd({ name: 'E-Commerce Marketing', serviceType: 'E-commerce marketing', description: DESCRIPTION, path: PATH });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {children}
    </>
  );
}
