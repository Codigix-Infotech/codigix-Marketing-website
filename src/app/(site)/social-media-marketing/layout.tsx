import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/social-media-marketing';
const TITLE = 'Social Media Marketing for Doctors in Pune | Codigix';
const DESCRIPTION = 'Grow your clinic with healthcare social media marketing in Pune. Instagram Reels, Facebook and targeted campaigns that bring doctors more patients.';

export const generateMetadata = () =>
  pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, keywords: ['social media marketing for doctors', 'healthcare social media Pune', 'Instagram marketing for clinics'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = serviceJsonLd({ name: 'Social Media Marketing', serviceType: 'Social media marketing', description: DESCRIPTION, path: PATH });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {children}
    </>
  );
}
