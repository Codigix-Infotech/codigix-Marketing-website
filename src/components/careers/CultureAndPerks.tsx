import React from 'react';
import {
  TrendingUp,
  Wrench,
  Stethoscope,
  Users2,
  Laptop,
  GraduationCap,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

const perks = [
  {
    icon: TrendingUp,
    badge: 'Real Scale',
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-200/60 text-blue-600',
    title: 'High-Impact Budgets & Real Growth',
    description:
      'Manage multi-lakh monthly paid ad spends across Google & Meta, and orchestrate SEO campaigns driving hundreds of organic patient appointments every month.',
    bullets: ['Multi-channel attribution', 'Direct ROI accountability', 'No small-budget sandbox work'],
  },
  {
    icon: Wrench,
    badge: 'Enterprise Stack',
    color: 'from-purple-500/10 to-pink-500/10 border-purple-200/60 text-purple-600',
    title: 'Unlimited Access to the Best Marketing Tools',
    description:
      'Never be held back by tools. You get full access to Ahrefs, Semrush, SurferSEO, Meta Business Suite, Adobe Premiere Pro, Midjourney, and Figma.',
    bullets: ['Ahrefs & Semrush enterprise', 'AI creative & copywriting tools', 'GA4 & BigQuery analytics'],
  },
  {
    icon: Stethoscope,
    badge: 'Recession-Proof Niche',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200/60 text-emerald-600',
    title: 'Master Healthcare Digital Marketing',
    description:
      'Specialize in the single most resilient, high-paying marketing sector: healthcare and hospital growth marketing. Learn medical compliance and patient-first conversion.',
    bullets: ['Rare, high-value skill set', 'Google Maps 3-pack mastery', 'Doctor personal branding'],
  },
  {
    icon: GraduationCap,
    badge: 'Growth & Certifications',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-200/60 text-amber-600',
    title: '100% Sponsored Learning & Certifications',
    description:
      'We invest heavily in your professional trajectory. We pay for your Google, Meta Blueprint, and HubSpot certifications plus ₹25,000 annual book and course allowance.',
    bullets: ['Sponsored official certifications', 'Course & masterclass budget', 'Dedicated learning hours'],
  },
  {
    icon: Laptop,
    badge: 'Modern Studio',
    color: 'from-rose-500/10 to-red-500/10 border-rose-200/60 text-[#e20b27]',
    title: 'Flexible Hybrid Work & Ergonomic Studio',
    description:
      'Work in our vibrant Pune creative studio or take advantage of our hybrid work-from-home policy. We care about outcomes and creative output, not micro-managing hours.',
    bullets: ['Flexible hybrid model', 'Ergonomic dual-monitor setups', 'High-speed gigabit fiber'],
  },
  {
    icon: Users2,
    badge: 'Merit Culture',
    color: 'from-indigo-500/10 to-cyan-500/10 border-indigo-200/60 text-indigo-600',
    title: 'Transparent Merit-Based Fast-Track',
    description:
      'No waiting years for annual bureaucratic cycles. If your campaigns crush targets and you lead initiatives, you will be promoted and compensated accordingly.',
    bullets: ['Quarterly performance reviews', 'Campaign revenue bonuses', 'Clear progression roadmap'],
  },
];

export default function CultureAndPerks() {
  return (
    <section id="culture" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4  relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#1a1053] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} className="text-[#e20b27]" />
            Why Marketers Choose Codigix
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight leading-tight mb-5">
            Designed for Marketers Who Want to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
              Win and Compound.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            We built Codigix to be the kind of agency ambitious digital marketers dream of working at: serious budgets, world-class tools, zero red tape, and real ownership.
          </p>
        </div>

        {/* 6 Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={i}
                className="group relative bg-slate-50/60 hover:bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-indigo-300 hover:shadow-[0_20px_45px_rgba(26,16,83,0.07)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200/70 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={24} className={perk.color.split(' ').pop()} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm">
                      {perk.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1a1053] mb-3 leading-snug group-hover:text-[#e20b27] transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {perk.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 space-y-2">
                  {perk.bullets.map((b, bi) => (
                    <div key={bi} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
