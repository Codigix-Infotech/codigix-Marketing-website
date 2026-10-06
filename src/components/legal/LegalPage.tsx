import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import { jsonLd } from '@/lib/seo';
import type { ContactSettings } from '@/lib/types';

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

interface Props {
  title: string;
  intro: string;
  path: string;
  updated: string;
  sections: LegalSection[];
  contact: ContactSettings;
  siteName: string;
}

const others = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/cookies', label: 'Cookie Policy' },
];

/** Shared server-rendered layout for the Privacy / Terms / Cookie policy pages. */
export default function LegalPage({ title, intro, path, updated, sections, contact, siteName }: Props) {
  const address = [contact.address_line1, contact.address_line2, contact.city, contact.state, contact.postal_code]
    .filter(Boolean)
    .join(', ');
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: title, item: `${SITE_URL}${path}` },
    ],
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <header className="relative pt-32 pb-12 lg:pt-40 lg:pb-14 bg-[#fafbfe] overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="container mx-auto px-4 relative z-10 px-2 sm:px-4 lg:px-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold text-[#1a1053] tracking-tight mb-4">{title}</h1>
          <p className="text-slate-500 leading-relaxed">{intro}</p>
          <p className="mt-4 text-sm text-slate-400">Last updated: {updated}</p>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-3xl py-14">
        <article className="prose prose-slate max-w-none prose-headings:text-[#1a1053] prose-headings:font-semibold prose-a:text-[#e20b27]">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2>
                {i + 1}. {s.heading}
              </h2>
              {s.body}
            </section>
          ))}
          <section>
            <h2>{sections.length + 1}. Contact us</h2>
            <p>If you have any questions about this policy, contact {siteName}:</p>
            <ul>
              {contact.email && (
                <li>
                  Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
              )}
              {contact.phone && <li>Phone: {contact.phone}</li>}
              {address && <li>Address: {address}</li>}
            </ul>
          </section>
        </article>

        <nav aria-label="Legal" className="mt-14 pt-8 border-t border-slate-200 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          {others
            .filter((o) => o.href !== path)
            .map((o) => (
              <Link key={o.href} href={o.href} className="text-slate-500 hover:text-[#e20b27] transition-colors">
                {o.label}
              </Link>
            ))}
        </nav>
      </div>
    </div>
  );
}
