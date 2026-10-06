import Link from 'next/link';
import LegalPage from '@/components/legal/LegalPage';
import { getSettings } from '@/lib/api';
import { pageMetadata } from '@/lib/page-seo';

// Template terms — have them reviewed by your legal advisor before relying on them.
export const generateMetadata = () =>
  pageMetadata({
    title: 'Terms of Service | Codigix Infotech',
    description: 'The terms that apply when you use the Codigix Infotech website, including content ownership, acceptable use and limitation of liability.',
    path: '/terms',
  });

export default async function TermsPage() {
  const { contact, site } = await getSettings();
  const name = site.name || 'Codigix Infotech';

  return (
    <LegalPage
      title="Terms of Service"
      intro={`These terms apply to your use of this website. By using the site you agree to them. Client engagements are governed by the separate agreement signed with ${name}.`}
      path="/terms"
      updated="26 September 2026"
      contact={contact}
      siteName={name}
      sections={[
        {
          heading: 'Use of the website',
          body: (
            <p>
              You may browse and share our content for personal and informational purposes. You agree not to misuse the site — for example by
              attempting to gain unauthorised access, submitting spam through our forms, or interfering with its operation.
            </p>
          ),
        },
        {
          heading: 'Content and intellectual property',
          body: (
            <p>
              All text, graphics, logos, case studies and other content on this site belong to {name} or its licensors. You may not copy,
              republish or use them commercially without our written permission. Client names and logos are shown with their permission and
              remain the property of their owners.
            </p>
          ),
        },
        {
          heading: 'No professional or medical advice',
          body: (
            <p>
              Articles and resources on this site are for general information about digital marketing. They are not medical, legal or
              financial advice, and results described in case studies are not a guarantee of future performance.
            </p>
          ),
        },
        {
          heading: 'Third-party links',
          body: (
            <p>
              The site may link to third-party websites. We are not responsible for their content or privacy practices.
            </p>
          ),
        },
        {
          heading: 'Limitation of liability',
          body: (
            <p>
              The website is provided &ldquo;as is&rdquo;. To the extent permitted by law, {name} is not liable for any loss arising from
              your use of, or inability to use, the website or its content.
            </p>
          ),
        },
        {
          heading: 'Privacy',
          body: (
            <p>
              Personal information you submit is handled as described in our <Link href="/privacy">Privacy Policy</Link>.
            </p>
          ),
        },
        {
          heading: 'Governing law',
          body: <p>These terms are governed by the laws of India, and the courts of Pune, Maharashtra have jurisdiction.</p>,
        },
        {
          heading: 'Changes to these terms',
          body: <p>We may update these terms from time to time. Continued use of the site after changes means you accept the updated terms.</p>,
        },
      ]}
    />
  );
}
