import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Briefcase, CalendarClock, CheckCircle2, Clock, IndianRupee, MapPin, Users } from 'lucide-react';
import ApplicationForm from '@/components/forms/ApplicationForm';
import { getJob, getJobs, getSettings } from '@/lib/api';
import { absoluteUrl, SITE_URL } from '@/lib/config';
import { formatDate, jsonLd, withTemplate } from '@/lib/seo';
import type { Job } from '@/lib/types';

const FALLBACK_JOBS: Record<string, Job> = {
  'performance-marketing-specialist': {
    id: 2,
    title: 'Performance Marketing & Google Ads Specialist',
    slug: 'performance-marketing-specialist',
    department: 'Paid Digital Campaigns',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'Hybrid',
    experience: '2–4 years',
    salary_range: '₹5.5L – ₹9.5L + Campaign Bonuses',
    openings: 2,
    status: 'open',
    summary: 'Plan and manage policy-compliant Google Ads and Meta campaigns with clear, truthful messaging and transparent audience disclosures.',
    description: '<p>Plan search and social campaigns for our healthcare institutions and commercial clients. Healthcare campaigns follow applicable ethical communication guidelines: factual, non-soliciting copy with no cure promises or inducements.</p>',
    responsibilities: [
      'Set up Google Search and display campaigns with factual, policy-compliant ad copy',
      'Manage Meta Ads Manager campaigns with transparent audience disclosures',
      'Run A/B tests on ad copy and landing page clarity within platform and advertising policies',
      'Report on campaign delivery in GA4 & Looker Studio using consent-based, privacy-aware tracking',
      'Collaborate with healthcare clients so that all campaign messaging is accurate and non-solicitous',
    ],
    requirements: [
      '2+ years of hands-on paid media management experience',
      'Certified in Google Ads (Search & Measurement) and Meta Blueprint',
      'Strong grasp of UTM tagging, consent-aware tracking, and landing page clarity',
      'Analytical mindset with proficiency in Excel/Sheets and GA4',
    ],
    benefits: [
      'Performance-based incentives, never linked to patient procurement',
      'Annual learning and certification allowance',
      'Flexible hybrid work schedule (Pune office + remote)',
      'Direct client exposure and strategic autonomy',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'medical-content-strategist': {
    id: 4,
    title: 'Medical Content Strategist & Copywriter',
    slug: 'medical-content-strategist',
    department: 'Content & Strategy',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'Hybrid',
    experience: '1–4 years',
    salary_range: '₹4.5L – ₹7.5L',
    openings: 2,
    status: 'open',
    summary: 'Translate complex medical topics into accurate, source-referenced public-health information, reviewed before publication.',
    description: '<p>Translate complex clinical topics into clear, empathetic and factual public-health information that is structured for search discoverability, with practitioner credential disclosures and no unsubstantiated claims or cure promises.</p>',
    responsibilities: [
      'Research and write accurate public-health education drawn from established consensus and published literature',
      'Script educational Q&A videos and explainers with practitioner credential disclosures',
      'Collaborate with qualified reviewers on pre-publication accuracy, source and disclosure checks',
      'Optimize content for Answer Engine Optimization (AEO) and AI Overviews',
    ],
    requirements: [
      '1+ years writing experience in healthcare, wellness, or B2B content',
      'Understanding of search intent, on-page SEO, and E-E-A-T principles',
      'Exceptional written English with strong empathy and narrative flow',
    ],
    benefits: [
      'Work alongside qualified reviewers and healthcare professionals',
      'Flexible working hours and comprehensive medical coverage',
      'Continuous mentorship from senior content and compliance reviewers',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'ui-ux-conversion-designer': {
    id: 5,
    title: 'UI/UX & Web Designer',
    slug: 'ui-ux-conversion-designer',
    department: 'Design & Tech',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'Hybrid',
    experience: '2–4 years',
    salary_range: '₹5.0L – ₹8.5L',
    openings: 1,
    status: 'open',
    summary: 'Design accessible, privacy-aware healthcare web interfaces, department and service pages, and responsive design systems in Figma.',
    description: '<p>Design fast, accessible and clear digital experiences for clinical and enterprise websites with Figma, Tailwind, and modern UX patterns, with transparent privacy notices and minimal data collection.</p>',
    responsibilities: [
      'Design responsive, mobile-first web pages and enquiry flows in Figma',
      'Build and maintain scalable design systems with reusable components',
      'Partner closely with frontend engineers to ensure pixel-perfect Next.js delivery',
      'Improve clarity and accessibility through usability testing, with consent-based analytics',
    ],
    requirements: [
      '2+ years in digital product or web UI/UX design with strong Figma portfolio',
      'Deep understanding of visual hierarchy, typography, and mobile UX',
      'Knowledge of web performance fundamentals and Tailwind CSS is a plus',
    ],
    benefits: [
      'High-end workstation setup with dual ergonomic displays',
      'Creative leadership opportunities and freedom to experiment',
      'Generous paid time off and annual team retreats',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'healthcare-client-growth-manager': {
    id: 6,
    title: 'Healthcare Client Partnerships & Account Manager',
    slug: 'healthcare-client-growth-manager',
    department: 'Client Partnerships',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'On-site',
    experience: '2–5 years',
    salary_range: '₹6.0L – ₹10.0L + Incentives',
    openings: 1,
    status: 'open',
    summary: 'Serve as the day-to-day partner for hospital administrators and medical clinics, keeping engagements service-based and aligned with applicable communication guidelines.',
    description: '<p>Own client relationships with clinic directors and administrators, and coordinate delivery across web, SEO, content and campaign teams.</p>',
    responsibilities: [
      'Lead regular delivery reviews with clinic directors and administrators',
      'Coordinate execution across SEO, Paid Media, and Creative production teams',
      'Identify opportunities to improve site quality, accessibility and information accuracy',
      'Ensure clear client communication and that no engagement is tied to patient procurement or referral incentives',
    ],
    requirements: [
      '2+ years in account management or client servicing at a digital agency',
      'Polished communication and presentation skills',
      'Ability to interpret Google Analytics 4 and site health reports',
    ],
    benefits: [
      'Direct exposure to client leadership and decision making',
      'Performance-based incentives, never linked to patient procurement',
      'Clear progression path within client partnerships',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

type Props = { params: { slug: string } };

// Prerender known roles at build time (ISR); new roles render on first visit and are then cached.
export async function generateStaticParams() {
  const jobs = await getJobs();
  const slugs = new Set([...jobs.map((j) => j.slug), ...Object.keys(FALLBACK_JOBS)]);
  return Array.from(slugs, (slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [remoteJob, { seo }] = await Promise.all([getJob(params.slug), getSettings()]);
  const job = remoteJob || FALLBACK_JOBS[params.slug];
  if (!job) return { title: 'Job not found', robots: { index: false } };
  const title = job.meta_title || `${job.title}${job.location ? ` – ${job.location}` : ''}`;
  const description = job.meta_description || job.summary || `Apply for ${job.title} at Codigix Infotech.`;
  const image = absoluteUrl(seo.default_og_image || '/logo.png');
  return {
    title: job.meta_title || withTemplate(seo.title_template, title),
    description,
    alternates: { canonical: `/careers/${job.slug}` },
    robots: job.status === 'open' ? undefined : { index: false },
    openGraph: { title, description, url: `${SITE_URL}/careers/${job.slug}`, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

const EMPLOYMENT: Record<string, string> = {
  'full-time': 'FULL_TIME', 'part-time': 'PART_TIME', contract: 'CONTRACTOR', internship: 'INTERN', temporary: 'TEMPORARY', freelance: 'CONTRACTOR',
};

function List({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-[#1a1053] mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
            <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-1" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function JobPage({ params }: Props) {
  const [remoteJob, { site, contact }] = await Promise.all([getJob(params.slug), getSettings()]);
  const job = remoteJob || FALLBACK_JOBS[params.slug];
  if (!job) notFound();
  const isOpen = job.status === 'open' && (!job.deadline || new Date(job.deadline) >= new Date(new Date().toDateString()));

  const posting = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description || job.summary || job.title,
    datePosted: job.created_at,
    validThrough: job.deadline || undefined,
    employmentType: EMPLOYMENT[(job.employment_type || '').toLowerCase()] || undefined,
    hiringOrganization: { '@type': 'Organization', name: site.name, sameAs: SITE_URL, logo: absoluteUrl(site.logo || '/logo.png') },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: contact.city || 'Pune', addressRegion: contact.state, addressCountry: 'IN' },
    },
    jobLocationType: /remote/i.test(job.work_mode || '') ? 'TELECOMMUTE' : undefined,
    experienceRequirements: job.experience || undefined,
    totalJobOpenings: job.openings,
  };

  return (
    <div className="bg-white">
      {isOpen && (
        /* eslint-disable-next-line @next/next/no-script-component */
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(posting)} />
      )}
      <header className="relative pt-32 pb-14 lg:pt-40 bg-[#fafbfe] overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4   relative z-10">
          <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-accent mb-6">
            <ArrowLeft size={15} /> All positions
          </Link>
          {job.department && <p className="text-xs font-bold uppercase tracking-wider text-primary-accent mb-3">{job.department}</p>}
          <h1 className="text-3xl md:text-5xl font-semibold text-[#1a1053] tracking-tight mb-6">{job.title}</h1>
          <div className="flex flex-wrap gap-3 text-sm">
            {[
              job.location && { icon: MapPin, text: job.location },
              job.employment_type && { icon: Clock, text: `${job.employment_type}${job.work_mode ? ` · ${job.work_mode}` : ''}` },
              job.experience && { icon: Briefcase, text: job.experience },
              job.salary_range && { icon: IndianRupee, text: job.salary_range },
              job.openings > 1 && { icon: Users, text: `${job.openings} openings` },
              job.deadline && { icon: CalendarClock, text: `Apply by ${formatDate(job.deadline)}` },
            ]
              .filter(Boolean)
              .map((item, i) => {
                const { icon: Icon, text } = item as { icon: typeof MapPin; text: string };
                return (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 text-slate-600">
                    <Icon size={14} /> {text}
                  </span>
                );
              })}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4   py-14">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          <div>
            {job.summary && <p className="text-lg text-slate-600 leading-relaxed mb-8">{job.summary}</p>}
            {job.description && (
              <div className="prose prose-slate max-w-none mb-10 prose-headings:text-[#1a1053]" dangerouslySetInnerHTML={{ __html: job.description }} />
            )}
            <List title="What you'll do" items={job.responsibilities} />
            <List title="What we're looking for" items={job.requirements} />
            <List title="Why you'll love working here" items={job.benefits} />
          </div>
          <aside id="apply">
            <div className="lg:sticky lg:top-28 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
              {isOpen ? (
                <>
                  <h2 className="text-xl font-bold text-[#1a1053] mb-6">Apply for this role</h2>
                  <ApplicationForm jobId={job.id} jobTitle={job.title} />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-[#1a1053] mb-2">This position is closed</h2>
                  <p className="text-slate-500 mb-6">We're no longer accepting applications for this role.</p>
                  <Link href="/careers" className="inline-flex px-5 py-2.5 rounded-full bg-[#1a1053] text-white text-sm font-semibold">See open positions</Link>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
