import React from 'react';
import { getClients, getSettings } from '@/lib/api';
import ContactMapSplit from '@/components/contact/ContactMapSplit';
import { pageMetadata } from '@/lib/page-seo';
import { absoluteUrl, SITE_URL } from '@/lib/config';
import { jsonLd } from '@/lib/seo';

export const generateMetadata = () =>
  pageMetadata({
    title: 'Contact Codigix Infotech | Healthcare Marketing Agency Pune',
    description:
      'Contact Codigix Infotech in Pune. Grow your clinic or hospital with healthcare SEO, Google Maps 3-Pack rankings and performance marketing.',
    path: '/contact',
  });

export default async function ContactPage() {
  const [{ contact, site }, clients] = await Promise.all([getSettings(), getClients()]);

  // LocalBusiness data powers the Google Maps / "near me" knowledge panel.
  const business = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/contact#business`,
    name: site.name || 'Codigix Infotech',
    url: SITE_URL,
    image: absoluteUrl(site.logo || '/logo.png'),
    telephone: contact.phone || undefined,
    email: contact.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [contact.address_line1, contact.address_line2].filter(Boolean).join(', ') || undefined,
      addressLocality: contact.city || 'Pune',
      addressRegion: contact.state || undefined,
      postalCode: contact.postal_code || undefined,
      addressCountry: 'IN',
    },
    areaServed: ['Pune', 'Pimpri-Chinchwad'],
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(business)} />
      <ContactMapSplit contact={contact} clients={clients} />
    </div>
  );
}
