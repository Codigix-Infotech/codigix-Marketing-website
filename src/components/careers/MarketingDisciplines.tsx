import React from 'react';
import {
  TrendingUp,
  Search,
  Video,
  Layout,
  Users,
  ArrowUpRight,
  Layers,
} from 'lucide-react';

const disciplines = [
  {
    icon: Search,
    title: 'SEO & Organic Growth',
    tagline: 'Google Maps 3-Pack, Technical SEO, High-DA Link Acquisition & AEO',
    description:
      'We crack high-intent medical and business search queries. Our SEO team drives hundreds of thousands of organic visits by mastering entities, schema markup, and Google Business Profile algorithms.',
    rolesCount: '2 Open Roles',
    tools: ['Ahrefs', 'Semrush', 'Screaming Frog', 'GA4 & GSC'],
  },
  {
    icon: TrendingUp,
    title: 'Performance & Paid Media',
    tagline: 'Google Search & PMax, Meta Ads, Call-Only Campaigns, ROAS Funnels',
    description:
      'Turn ad clicks into booked consultations and e-commerce transactions. Manage high-budget campaigns, craft bulletproof landing pages, and optimize cost-per-acquisition with surgical precision.',
    rolesCount: '2 Open Roles',
    tools: ['Google Ads', 'Meta Ads Manager', 'Tag Manager', 'TripleWhale'],
  },
  {
    icon: Video,
    title: 'Creative & Short-Form Video',
    tagline: 'Doctor Authority Reels, YouTube Shorts, Hook Scripting & Editing',
    description:
      'Capture human attention in the first 2 seconds. We shoot and edit engaging, trust-building video content that humanizes doctors, explains complex treatments, and drives viral social reach.',
    rolesCount: '1 Open Role',
    tools: ['Premiere Pro', 'CapCut', 'After Effects', 'Canva Pro'],
  },
  {
    icon: Layout,
    title: 'UI/UX & Web Conversion',
    tagline: 'Next.js & React Engineering, Tailwind, Appointment Flow CRO',
    description:
      'Design and build lightning-fast web experiences engineered specifically to turn anxious patients into confirmed consultations with sub-second page speeds.',
    rolesCount: '1 Open Role',
    tools: ['Figma', 'Next.js 14', 'TailwindCSS', 'Hotjar'],
  },
  {
    icon: Users,
    title: 'Client Growth & Strategy',
    tagline: 'Healthcare Partnerships, Account Direction, Revenue Reviews',
    description:
      'Act as the true digital partner for clinic founders, hospital directors, and growing brands. Translate complex analytics into clear business growth narratives.',
    rolesCount: '1 Open Role',
    tools: ['HubSpot CRM', 'Looker Studio', 'Slack', 'Notion'],
  },
];

export default function MarketingDisciplines() {
  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-200/80 relative">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#1a1053] mb-3 shadow-sm">
              <Layers size={13} className="text-[#e20b27]" />
              Our Growth Engines
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              Pick Your Arena in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Digital Marketing
              </span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-md text-sm sm:text-base">
            Whether you love technical ranking signals, creative viral hooks, or scaling ad spend, we have a specialized division for your superpower.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#1a1053] flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                      {d.rolesCount}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1a1053] mb-1.5">{d.title}</h3>
                  <p className="text-xs font-semibold text-[#e20b27] uppercase tracking-wider mb-3.5">
                    {d.tagline}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {d.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {d.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Bonus Talent Pool Card */}
          <div className="bg-gradient-to-br from-[#1a1053] to-[#2a1b7e] rounded-3xl p-7 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 bg-[#e20b27]/20 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-5">
                <Users size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Have a Unique Superpower?</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed mb-6">
                Don&apos;t see your exact role listed? If you have proven proof of work in SEO, content, design, or growth marketing, we always create custom seats for exceptional talent.
              </p>
            </div>
            <a
              href="#apply"
              className="inline-flex items-center justify-between w-full px-5 py-3 rounded-full bg-white text-[#1a1053] hover:bg-[#e20b27] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
            >
              <span>Submit General Application</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
