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
    badge: 'Real Projects',
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-200/60 text-blue-600',
    title: 'Meaningful Work & Clear Ownership',
    description:
      'Work on real web engineering, technical SEO and content projects for hospitals, clinics and enterprises, with clear ownership of your deliverables.',
    bullets: ['Clear ownership', 'Quality & accuracy focus', 'Real client projects'],
  },
  {
    icon: Wrench,
    badge: 'Professional Tools',
    color: 'from-purple-500/10 to-pink-500/10 border-purple-200/60 text-purple-600',
    title: 'Professional Tools for Your Role',
    description:
      'You get access to the professional SEO, design, video and development tools your role needs. Where AI tools are used, outputs are reviewed and labelled.',
    bullets: ['SEO & analytics tools', 'Design & video tools', 'Reviewed, labelled AI assistance'],
  },
  {
    icon: Stethoscope,
    badge: 'Ethical Practice',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200/60 text-emerald-600',
    title: 'Learn Ethical Healthcare Communication',
    description:
      'Learn how to communicate responsibly in healthcare: factual framing, practitioner credential disclosure, NMC, NDC and AYUSH communication principles, and data protection under the IT Act, 2000 and DPDP Act, 2023 (and 2025 Rules).',
    bullets: ['No patient solicitation', 'Factual, non-promotional content', 'Data protection first'],
  },
  {
    icon: GraduationCap,
    badge: 'Learning',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-200/60 text-amber-600',
    title: 'Learning & Certification Support',
    description:
      'We support your professional development with role-relevant certifications and a course and book allowance. Details are shared during the interview process.',
    bullets: ['Role-relevant certifications', 'Course & book allowance', 'Dedicated learning hours'],
  },
  {
    icon: Laptop,
    badge: 'Work Environment',
    color: 'from-rose-500/10 to-red-500/10 border-rose-200/60 text-[#e20b27]',
    title: 'Flexible Hybrid Work',
    description:
      'Work from our Pune office or take advantage of our hybrid policy. We focus on quality of work rather than micro-managing hours.',
    bullets: ['Flexible hybrid model', 'Ergonomic workstations', 'Reliable connectivity'],
  },
  {
    icon: Users2,
    badge: 'Merit Culture',
    color: 'from-indigo-500/10 to-cyan-500/10 border-indigo-200/60 text-indigo-600',
    title: 'Transparent Merit-Based Growth',
    description:
      'Roles are reviewed regularly. Strong, accurate and compliant work, and initiative in leading improvements, is recognised through progression and compensation.',
    bullets: ['Regular performance reviews', 'Quality & compliance recognition', 'Clear progression roadmap'],
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
            Life at Codigix
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight leading-tight mb-5">
            Designed for People Who Value{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
              Quality and Integrity.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            We want Codigix to be a place where engineers, writers and marketers do careful, accurate work with real ownership, good tools and clear ethical and data-protection expectations.
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
