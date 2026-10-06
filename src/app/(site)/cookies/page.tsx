import Link from 'next/link';
import LegalPage from '@/components/legal/LegalPage';
import { getSettings } from '@/lib/api';
import { pageMetadata } from '@/lib/page-seo';

// Reflects the site as built: no analytics or advertising cookies. Update it if tracking tools are added.
export const generateMetadata = () =>
  pageMetadata({
    title: 'Cookie Policy | Codigix Infotech',
    description: 'How the Codigix Infotech website uses cookies, browser storage and embedded third-party content such as maps, fonts and videos.',
    path: '/cookies',
  });

export default async function CookiesPage() {
  const { contact, site } = await getSettings();
  const name = site.name || 'Codigix Infotech';

  return (
    <LegalPage
      title="Cookie Policy"
      intro="This policy explains how our website uses cookies and similar browser storage, and what third-party content may set its own cookies."
      path="/cookies"
      updated="26 September 2026"
      contact={contact}
      siteName={name}
      sections={[
        {
          heading: 'What are cookies?',
          body: (
            <p>
              Cookies are small text files a website stores in your browser. Similar technologies, such as session storage, keep small pieces
              of information for the duration of your visit.
            </p>
          ),
        },
        {
          heading: 'How we use them',
          body: (
            <>
              <p>Our website does not use advertising or analytics cookies. We use only:</p>
              <ul>
                <li>
                  <strong>Session storage</strong> to count a blog article view once per visit. It contains no personal information and is
                  cleared when you close the tab.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Third-party content',
          body: (
            <>
              <p>Some pages embed content from other services, which may set their own cookies under their own policies:</p>
              <ul>
                <li><strong>Google Maps</strong> — the office map on our contact page.</li>
                <li><strong>Google Fonts</strong> — the typefaces used across the site.</li>
                <li><strong>YouTube</strong> — embedded client and case-study videos.</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Managing cookies',
          body: (
            <p>
              You can block or delete cookies in your browser settings. Blocking third-party cookies may stop embedded maps or videos from
              loading, but the rest of the site will work normally. See our <Link href="/privacy">Privacy Policy</Link> for how we handle
              personal information.
            </p>
          ),
        },
      ]}
    />
  );
}
