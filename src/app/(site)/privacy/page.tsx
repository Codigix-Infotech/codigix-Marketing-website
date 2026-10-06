import Link from 'next/link';
import LegalPage from '@/components/legal/LegalPage';
import { getSettings } from '@/lib/api';
import { pageMetadata } from '@/lib/page-seo';

// Template policy — have it reviewed by your legal advisor before relying on it.
export const generateMetadata = () =>
  pageMetadata({
    title: 'Privacy Policy | Codigix Infotech',
    description: 'How Codigix Infotech collects, uses and protects the personal information you share through our website, contact forms and job applications.',
    path: '/privacy',
  });

export default async function PrivacyPage() {
  const { contact, site } = await getSettings();
  const name = site.name || 'Codigix Infotech';

  return (
    <LegalPage
      title="Privacy Policy"
      intro={`This policy explains what personal information ${name} collects through this website, why we collect it and how we keep it safe.`}
      path="/privacy"
      updated="26 September 2026"
      contact={contact}
      siteName={name}
      sections={[
        {
          heading: 'Information we collect',
          body: (
            <>
              <p>We only collect information you choose to give us:</p>
              <ul>
                <li><strong>Enquiries:</strong> your name, email, phone number, organisation, the service you are interested in and your message when you use our contact form.</li>
                <li><strong>Job applications:</strong> your name, contact details, experience, current company, LinkedIn or portfolio links, cover letter and the résumé you upload.</li>
                <li><strong>Newsletter:</strong> your email address if you subscribe through the form in our website footer.</li>
              </ul>
              <p>Like most websites, our servers also record basic technical data (IP address, browser type, pages requested and time of visit) to keep the site secure and working.</p>
            </>
          ),
        },
        {
          heading: 'How we use your information',
          body: (
            <ul>
              <li>To reply to your enquiry and provide proposals or services you request.</li>
              <li>To assess job applications and contact candidates.</li>
              <li>To send newsletters you have subscribed to — contact us at any time to unsubscribe.</li>
              <li>To protect the website against spam, abuse and security threats.</li>
            </ul>
          ),
        },
        {
          heading: 'Sharing your information',
          body: (
            <p>
              We do not sell or rent your personal information. We share it only with service providers who help us run this website (such as
              hosting and email providers) under confidentiality obligations, or when required by law.
            </p>
          ),
        },
        {
          heading: 'Data retention and security',
          body: (
            <p>
              We keep enquiries and applications only as long as needed for the purpose they were shared for, or as required by law. Résumés are
              stored privately and are accessible only to authorised team members. We use reasonable technical and organisational safeguards,
              but no method of transmission over the internet is completely secure.
            </p>
          ),
        },
        {
          heading: 'Your rights',
          body: (
            <p>
              In line with India&apos;s Digital Personal Data Protection Act, 2023, you may ask us to access, correct or erase the personal
              information you have shared with us, or withdraw your consent. Use the contact details below and we will respond within a
              reasonable time.
            </p>
          ),
        },
        {
          heading: 'Cookies and third-party services',
          body: (
            <p>
              Our use of browser storage and embedded third-party content is described in our <Link href="/cookies">Cookie Policy</Link>.
            </p>
          ),
        },
        {
          heading: 'Changes to this policy',
          body: <p>We may update this policy from time to time. The &ldquo;Last updated&rdquo; date above shows when it last changed.</p>,
        },
      ]}
    />
  );
}
