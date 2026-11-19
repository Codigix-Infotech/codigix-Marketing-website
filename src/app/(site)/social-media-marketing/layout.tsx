import { jsonLd } from '@/lib/seo';
import { pageMetadata, serviceJsonLd } from '@/lib/page-seo';

// The page itself is a client component, so its metadata and structured data live here.
const PATH = '/social-media-marketing';
const TITLE = 'Educational Video & Structured Social Communication | Codigix';
const DESCRIPTION = 'We plan, shoot, edit, and structure short- and long-form video and social content focused on public-health education, institutional updates, and clear brand storytelling.';

export const generateMetadata = () =>
  pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, keywords: ['educational social media content', 'healthcare social media Pune', 'Instagram marketing for clinics'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = serviceJsonLd({ name: 'Social Media Marketing', serviceType: 'Social media marketing', description: DESCRIPTION, path: PATH });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {children}
    </>
  );
}
