"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Stethoscope,
  Building2,
  Factory,
  UtensilsCrossed,
  Activity,
  Globe,
  MapPin,
  Star,
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  ShieldCheck,
  type LucideIcon
} from 'lucide-react';

export interface AdvantageItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface ClientShowcaseSectionProps {
  badgeText?: string;
  headingPrefix?: string;
  headingGradient?: string;
  subtitle?: string;
  strategicAdvantageTitle?: string;
  strategicAdvantageSubtitle?: string;
  advantages?: AdvantageItem[];
  guaranteeTitle?: string;
  guaranteeQuote?: string;
  themeColor?: 'blue' | 'purple' | 'emerald' | 'pink';
}

const defaultAdvantages: AdvantageItem[] = [
  {
    title: "Performance-Driven Approach",
    desc: "We focus on real ROI, qualified patient leads, and sales, not just vanity impressions.",
    icon: Zap
  },
  {
    title: "Conversion-Focused Architecture",
    desc: "Traffic is useless without conversions — we optimize funnels for phone calls and direct bookings.",
    icon: Target
  },
  {
    title: "Data-Backed Strategy",
    desc: "Every recommendation and campaign is backed by deep analytics, search volume, and intent insights.",
    icon: BarChart3
  },
  {
    title: "Local Market Mastery in Pune & PCMC",
    desc: "Decade of experience dominating local searches across Pune, PCMC, Wakad, Baner, and surrounding hubs.",
    icon: MapPin
  }
];

export const clientShowcaseList = [
  {
    name: "Dr. Sheetal's Glow Clinic",
    tag: "Healthcare & Dermatology",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    avatarBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    logo: "/clients/sheetals-glow.webp",
    coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    icon: Stethoscope,
    duration: "6+ Mos Active",
    result: "+380% Inquiries",
    rankKeyword: "Rank #1: Skin Clinic PCMC",
    area: "Pimpri-Chinchwad",
    rating: "5.0",
    reviews: "140+ Reviews",
    trendPath: "M0 18 Q 20 16, 40 10 T 70 6 T 90 2"
  },
  {
    name: "CorpLegal Solutions & Co",
    tag: "Corporate Law & B2B",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    avatarBg: "bg-blue-50 text-blue-600 border-blue-200",
    logo: "/clients/corplegal.webp",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    icon: Building2,
    duration: "1 Year Active",
    result: "#1 Organic Authority",
    rankKeyword: "Rank #1: Corporate Law Pune",
    area: "Pune & PCMC",
    rating: "4.9",
    reviews: "85+ Reviews",
    trendPath: "M0 20 Q 25 18, 45 11 T 72 5 T 90 2"
  },
  {
    name: "Precision Tech Engineering",
    tag: "Manufacturing & Industrial",
    tagColor: "bg-amber-50 text-amber-800 border-amber-200/80",
    avatarBg: "bg-amber-50 text-amber-600 border-amber-200",
    logo: "/clients/regain.webp",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    icon: Factory,
    duration: "8 Mos Active",
    result: "High-Ticket RFQs",
    rankKeyword: "Rank #1: Bhosari MIDC Machining",
    area: "Bhosari MIDC",
    rating: "5.0",
    reviews: "MIDC Verified",
    trendPath: "M0 19 Q 22 17, 42 12 T 68 7 T 90 3"
  },
  {
    name: "Bakul Hospitality & Catering",
    tag: "Hospitality & Events",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    avatarBg: "bg-purple-50 text-purple-600 border-purple-200",
    logo: "/clients/bakul.webp",
    coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
    icon: UtensilsCrossed,
    duration: "1 Year Active",
    result: "3.4x Phone Calls",
    rankKeyword: "Top 3: Event Catering PCMC",
    area: "Pune Metro",
    rating: "4.9",
    reviews: "210+ Reviews",
    trendPath: "M0 20 Q 20 19, 45 13 T 70 6 T 90 2"
  },
  {
    name: "Canopy Healthcare & Aligners",
    tag: "Dental & Specialized Care",
    tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200/80",
    avatarBg: "bg-cyan-50 text-cyan-600 border-cyan-200",
    logo: "/clients/canopy.webp",
    coverImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    icon: Activity,
    duration: "1 Year Active",
    result: "185+ 5★ Reviews",
    rankKeyword: "Rank #1: Invisalign Wakad",
    area: "Wakad & Hinjawadi",
    rating: "5.0",
    reviews: "185+ Reviews",
    trendPath: "M0 18 Q 24 15, 48 9 T 72 4 T 90 1"
  },
  {
    name: "Sanskruti Agro Tourism",
    tag: "Tourism & Leisure",
    tagColor: "bg-rose-50 text-rose-700 border-rose-200/80",
    avatarBg: "bg-rose-50 text-rose-600 border-rose-200",
    logo: "/clients/sanskruti-agro-farm.webp",
    coverImage: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=800",
    icon: Globe,
    duration: "4 Mos Active",
    result: "+300% Footfall",
    rankKeyword: "Rank #1: Agro Resort Pune",
    area: "Pune Outskirts",
    rating: "4.9",
    reviews: "320+ Reviews",
    trendPath: "M0 19 Q 20 18, 44 11 T 70 5 T 90 2"
  }
];

export function ClientShowcaseSection({
  badgeText = "Proven Track Record & Client Success",
  headingPrefix = "Why Businesses Across PCMC & Pune",
  headingGradient = "Partner With Codigix Infotech",
  subtitle = "Delivering verified business growth, high-ticket leads, and top-3 Google rankings across enterprise B2B, healthcare clinics, local services, and retail brands.",
  strategicAdvantageTitle = "The Codigix Strategic Advantage",
  strategicAdvantageSubtitle = "We blend technical mastery with deep local consumer psychology across Pune & PCMC.",
  advantages = defaultAdvantages,
  guaranteeTitle = "100% White-Hat Growth Guarantee",
  guaranteeQuote = '"Engineered specifically for manufacturers, growing enterprises, healthcare providers, and local services in Pune & PCMC who demand real business revenue over superficial metrics."'
}: ClientShowcaseSectionProps) {
  const col1 = clientShowcaseList.slice(0, 3);
  const col2 = clientShowcaseList.slice(3, 6);

  const renderCard = (client: typeof clientShowcaseList[0], key: string) => {
    const ClientIcon = client.icon;
    return (
      <div
        key={key}
        className="rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer shrink-0"
      >
        {/* Visual Photography Header */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={client.coverImage}
            alt={client.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top Bar on Image */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10">
            <span className="px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-md text-[9px] font-bold text-slate-800 shadow-xs border border-white/60">
              {client.tag}
            </span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-medium border border-white/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              {client.duration}
            </span>
          </div>

          {/* Bottom Growth Result Pill */}
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-600/95 backdrop-blur-md text-white shadow-md border border-emerald-400/40 text-[11px] font-bold group-hover:scale-105 transition-transform">
              <TrendingUp size={11} className="stroke-[2.5]" />
              <span>{client.result}</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 flex flex-col justify-between flex-1">
          <div>
            {/* Client Identity */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 shadow-2xs p-1 flex items-center justify-center shrink-0 overflow-hidden relative group-hover:scale-105 group-hover:shadow-sm transition-all duration-300">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-contain relative z-10"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '0';
                  }}
                />
                <div className={`absolute inset-0 flex items-center justify-center ${client.avatarBg}`}>
                  <ClientIcon size={16} />
                </div>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-[#1a1053] leading-snug group-hover:text-blue-700 transition-colors truncate">
                  {client.name}
                </h4>
                <span className="text-[10px] font-light text-slate-500 truncate block">
                  {client.area} • Verified Client
                </span>
              </div>
            </div>

            {/* Google Search Snippet with Sparkline */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 mb-2 flex items-center justify-between gap-1.5 group-hover:bg-blue-50/40 group-hover:border-blue-200/60 transition-colors">
              <div className="min-w-0 flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-black text-[10px] group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  G
                </div>
                <div className="truncate">
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Top Google Ranking</div>
                  <div className="text-[11px] font-bold text-slate-800 truncate">{client.rankKeyword}</div>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <svg className="w-14 h-4 text-emerald-500 overflow-visible" viewBox="0 0 90 24" fill="none">
                  <path
                    d={client.trendPath}
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="90" cy="2" r="3.5" className="fill-emerald-500" />
                </svg>
                <span className="text-[8px] font-bold text-emerald-700">Verified</span>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
            <div className="flex items-center gap-1 text-slate-600 font-medium">
              <MapPin size={11} className="text-[#e20b27] shrink-0" />
              <span>{client.area}</span>
            </div>
            <div className="flex items-center gap-1 bg-amber-50/80 border border-amber-200/60 px-1.5 py-0.5 rounded-lg">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={9} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-800">{client.rating}</span>
              <span className="text-[9px] text-slate-500">({client.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="case-studies" className="scroll-mt-24 py-14 lg:py-20 bg-gradient-to-b from-[#f8faff] via-white to-slate-50 relative border-b border-slate-200/80 overflow-hidden">
      {/* Ambient subtle glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#e20b27]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className=" mx-auto px-4 lg:px-8  relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs text-xs font-bold text-blue-700 tracking-wide mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>{badgeText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] leading-[1.15] tracking-tight mb-4">
            {headingPrefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
              {headingGradient}
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Split Layout: Strategic Advantages (4 Cols Sticky) vs Continuous Scrolling Marquee (8 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Advantages (4 Cols - Sticky) */}
          <motion.div
            initial={{ opacity: 0, transform: "translate(-20px, 0px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex flex-col gap-3.5 lg:sticky lg:top-24"
          >
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <h3 className="text-base font-extrabold text-[#1a1053] mb-1">
                {strategicAdvantageTitle}
              </h3>
              <p className="text-xs text-slate-500 font-light mb-4">
                {strategicAdvantageSubtitle}
              </p>

              <div className="space-y-2.5">
                {advantages.slice(0, 4).map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <IconComp size={15} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#1a1053] group-hover:text-blue-700 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-light leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Trust Endorsement Quote */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-xl bg-slate-50 border-l-3 border-[#e20b27] text-xs font-light text-slate-700 leading-relaxed shadow-2xs hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-1.5 font-bold text-[#1a1053] text-xs mb-1">
                <Award size={14} className="text-[#e20b27]" />
                <span>{guaranteeTitle}</span>
              </div>
              {guaranteeQuote}
            </motion.div>
          </motion.div>

          {/* Right Column: Continuous Vertical Auto-Scrolling Client Showcase (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes scrollMarqueeCol1 {
                0% { transform: translateY(0%); }
                100% { transform: translateY(-50%); }
              }
              @keyframes scrollMarqueeCol2 {
                0% { transform: translateY(0%); }
                100% { transform: translateY(-50%); }
              }
              @keyframes scrollMarqueeMobile {
                0% { transform: translateY(0%); }
                100% { transform: translateY(-50%); }
              }
              .animate-scroll-vertical-1 {
                animation: scrollMarqueeCol1 13s linear infinite;
              }
              .animate-scroll-vertical-2 {
                animation: scrollMarqueeCol2 16s linear infinite;
              }
              .animate-scroll-vertical-mobile {
                animation: scrollMarqueeMobile 18s linear infinite;
              }
              .group\\/marquee:hover .animate-scroll-vertical-1,
              .group\\/marquee:hover .animate-scroll-vertical-2,
              .group\\/marquee:hover .animate-scroll-vertical-mobile,
              .animate-scroll-vertical-1:hover,
              .animate-scroll-vertical-2:hover,
              .animate-scroll-vertical-mobile:hover {
                animation-play-state: paused !important;
              }
            ` }} />

            {/* Ticker Status Bar */}
            <div className="flex items-center justify-between gap-2 mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-[#1a1053]">
                  Live Verified Client Search Results
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200/70 text-[10px] font-medium text-slate-500">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Hover to pause scroll</span>
              </div>
            </div>

            {/* Scrollable Viewport with Gradient Fade Masks */}
            <div
              className="h-[620px] sm:h-[660px] overflow-hidden relative group/marquee rounded-3xl"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)'
              }}
            >
              {/* Desktop Dual-Column Scrolling Marquee */}
              <div className="hidden sm:grid sm:grid-cols-2 gap-4 h-full">
                <div className="flex flex-col gap-4 animate-scroll-vertical-1">
                  {[...col1, ...col1].map((client, i) => renderCard(client, `col1-${i}`))}
                </div>
                <div className="flex flex-col gap-4 animate-scroll-vertical-2">
                  {[...col2, ...col2].map((client, i) => renderCard(client, `col2-${i}`))}
                </div>
              </div>

              {/* Mobile Single-Column Scrolling Marquee */}
              <div className="sm:hidden flex flex-col gap-4 animate-scroll-vertical-mobile">
                {[...clientShowcaseList, ...clientShowcaseList].map((client, i) => renderCard(client, `mob-${i}`))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientShowcaseSection;
