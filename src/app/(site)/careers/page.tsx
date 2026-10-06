import React from 'react';
import { Mail, MessageSquare, Sparkles, ArrowDown } from 'lucide-react';
import CareersHero from '@/components/careers/CareersHero';
import CultureAndPerks from '@/components/careers/CultureAndPerks';
import MarketingDisciplines from '@/components/careers/MarketingDisciplines';
import OpenRolesSection from '@/components/careers/OpenRolesSection';
import DayInTheLife from '@/components/careers/DayInTheLife';
import HiringProcess from '@/components/careers/HiringProcess';
import CareersFaq from '@/components/careers/CareersFaq';
import CtaSection from '@/components/home/CtaSection';
import ApplicationForm from '@/components/forms/ApplicationForm';
import { getJobs, getSettings } from '@/lib/api';
import { SITE_URL } from '@/lib/config';
import { jsonLd } from '@/lib/seo';
import { pageMetadata } from '@/lib/page-seo';

export const generateMetadata = () =>
  pageMetadata({
    title: 'Digital Marketing Jobs in Pune | Codigix Infotech Careers',
    description:
      'Join Pune’s healthcare digital marketing agency. We’re hiring SEO specialists, Google Ads marketers, video creators and growth strategists.',
    path: '/careers',
  });

export default async function CareersPage() {
  const [jobs, { contact, site }] = await Promise.all([getJobs(), getSettings()]);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Careers', item: `${SITE_URL}/careers` },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      {/* 1. High-Energy Digital Marketing Careers Hero Banner */}
      <CareersHero />

      {/* 2. Active Open Roles (On top right below hero) */}
      <OpenRolesSection jobs={jobs} />

      {/* 3. Culture, Perks & Agency Advantages (6 Bento Cards) */}
      <CultureAndPerks />

      {/* 4. The 5 Core Digital Marketing Disciplines */}
      <MarketingDisciplines />

      {/* 5. A Day in the Life of a Codigix Digital Marketer */}
      <DayInTheLife />

      {/* 6. 4-Step Transparent Hiring Blueprint */}
      <HiringProcess />

      {/* 7. Fast-Track & General Application Section */}
      <section id="apply" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-xs font-bold uppercase tracking-wider text-[#1a1053] mb-3">
                <Sparkles size={13} className="text-[#e20b27]" />
                Fast-Track Application
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1053] tracking-tight mb-3">
                Don&apos;t See the Exact Role? Let&apos;s Talk Anyway.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We are constantly expanding our digital marketing roster. Send us your resume and past campaign wins, or reach out directly to our talent scouting team.
              </p>

              {/* Direct Contact Pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                {contact.careers_email && (
                  <a
                    href={`mailto:${contact.careers_email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    <Mail size={14} className="text-[#e20b27]" />
                    <span>{contact.careers_email}</span>
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=Hi%20Codigix%20Hiring%20Team%2C%20I%20am%20interested%20in%20career%20opportunities.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold text-emerald-800 border border-emerald-200/60 transition-colors"
                  >
                    <MessageSquare size={14} className="text-emerald-600" />
                    <span>Chat with Talent Scout on WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* Application Form */}
            <ApplicationForm />
          </div>
        </div>
      </section>

      {/* 8. Candidate Questions & FAQs */}
      <CareersFaq />

      {/* 9. Final Agency Conversion CTA */}
      <CtaSection />
    </div>
  );
}
