"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ClientShowcaseSection from '@/components/services/ClientShowcaseSection';
import {
  Zap,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  BarChart3,
  ShieldCheck,
  Globe,
  PhoneCall,
  Layers,
  Clock,
  Award,
  Activity,
  Cpu,
  Star,
  Search,
  Layout,
  Youtube,
  Instagram,
  RotateCw,
  MousePointerClick,
  DollarSign,
  Users,
  Eye,
  Check,
  Building2,
  Calendar,
  Filter,
  Sliders,
  PieChart,
  MessageSquare,
  MapPin
} from 'lucide-react';

const whatWeDoList = [
  {
    num: "01",
    title: "Google Search & Display Campaigns",
    desc: "Policy-compliant search and display campaigns with clear, truthful messaging that describes services, departments, and facilities factually.",
    icon: Search,
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    num: "02",
    title: "Meta (Facebook & Instagram) Campaigns",
    desc: "Awareness and institutional-update campaigns on Instagram and Facebook, with transparent audience disclosures and educational, non-promotional framing.",
    icon: Instagram,
    color: "from-pink-600 to-purple-600",
    bg: "bg-pink-50 text-pink-600 border-pink-200"
  },
  {
    num: "03",
    title: "Audience Settings & Privacy Controls",
    desc: "Clear audience definitions and consent-aware tracking configuration, with no sensitive health data used for targeting.",
    icon: RotateCw,
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    num: "04",
    title: "Landing Page Design & Disclosures",
    desc: "Fast-loading, accessible landing pages with factual information, practitioner credential disclosures, and clear privacy notices.",
    icon: Layout,
    color: "from-indigo-600 to-blue-600",
    bg: "bg-indigo-50 text-indigo-600 border-indigo-200"
  },
  {
    num: "05",
    title: "Ad Copy Review & Testing",
    desc: "Copy and creative variants are reviewed for factual accuracy, with no fear-based messaging, cure promises, or inducements.",
    icon: Sliders,
    color: "from-amber-600 to-orange-600",
    bg: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    num: "06",
    title: "Transparent Campaign Reporting",
    desc: "Clear reporting on ad spend, impressions, click-through rate, and policy status, so you always know how campaigns are running.",
    icon: BarChart3,
    color: "from-purple-600 to-pink-600",
    bg: "bg-purple-50 text-purple-600 border-purple-200"
  }
];

const whatYouGetCards = [
  {
    icon: Zap,
    title: "Truthful, Factual Messaging",
    desc: "Ad copy that describes your organization, departments, and services accurately, without exaggeration or unsubstantiated claims.",
    stat: "Factual",
    statLabel: "Ad Copy Standard",
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50/80 border-blue-200/70"
  },
  {
    icon: Target,
    title: "Transparent Audience Settings",
    desc: "Audiences are defined by location and general topical relevance, with clear disclosure of how campaigns are targeted.",
    stat: "Disclosed",
    statLabel: "Audience Targeting",
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50/80 border-emerald-200/70"
  },
  {
    icon: DollarSign,
    title: "Clear Budget Reporting",
    desc: "Transparent reporting on every rupee of ad spend, with fees that are service-based and never tied to acquiring individual patients.",
    stat: "Service-Based",
    statLabel: "Fee Model",
    color: "from-purple-600 to-pink-600",
    bg: "bg-purple-50/80 border-purple-200/70"
  },
  {
    icon: TrendingUp,
    title: "Policy Alignment",
    desc: "Campaigns are reviewed against platform advertising policies and applicable NMC, NDC, and AYUSH communication principles before launch.",
    stat: "Reviewed",
    statLabel: "Before Launch",
    color: "from-rose-600 to-amber-600",
    bg: "bg-rose-50/80 border-rose-200/70"
  }
];

const ppcAdTypes = [
  {
    title: "Google Search Ads",
    subtitle: "Search-Based Visibility",
    desc: "Factual search ads that present accurate organization, department, and location details to people already looking for that information.",
    icon: Search,
    color: "text-blue-600 bg-blue-50 border-blue-200/70",
    pill: "Search",
    points: ["Accurate location and department details", "Policy-compliant ad copy", "Click-to-call extensions with verified numbers"]
  },
  {
    title: "Display Ads",
    subtitle: "Visual Information Placement",
    desc: "Informational display creative for institutional updates and public-health awareness, placed with transparent targeting.",
    icon: Layout,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200/70",
    pill: "Awareness",
    points: ["Clear informational banners", "Practitioner credential disclosures", "Geographic placement settings"]
  },
  {
    title: "YouTube Ads",
    subtitle: "Educational Video",
    desc: "Educational explainer videos on public-health topics and institutional updates, with practitioner credentials disclosed and AI-assisted media labelled.",
    icon: Youtube,
    color: "text-rose-600 bg-rose-50 border-rose-200/70",
    pill: "Educational",
    points: ["Public-health explainer videos", "Credential and registration disclosure", "AI-assisted media labelled"]
  },
  {
    title: "Meta Ads (FB & IG)",
    subtitle: "Social Awareness",
    desc: "Awareness and informational campaigns using video and carousel formats, with transparent audience disclosures.",
    icon: Instagram,
    color: "text-pink-600 bg-pink-50 border-pink-200/70",
    pill: "Awareness",
    points: ["Transparent audience disclosures", "Informational carousels", "Educational Reels & Story formats"]
  },
  {
    title: "Audience Settings",
    subtitle: "Privacy-Aware Configuration",
    desc: "Consent-aware tracking and audience configuration aligned with the DPDP Act, 2023, with no sensitive health data used for targeting.",
    icon: RotateCw,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200/70",
    pill: "Privacy",
    points: ["Consent-aware tracking setup", "No sensitive health-data targeting", "Clear privacy notices"]
  }
];

const ppcStrategySteps = [
  {
    phase: "01",
    stepNum: 1,
    name: "Research",
    time: "Days 1–3",
    title: "Policy & Messaging Review",
    stage: "Research & Review",
    timeline: "Days 1–3",
    icon: Search,
    deliverable: "Messaging Guidelines & Policy Checklist",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200",
    boxBg: "bg-blue-50/70 border-blue-200/90",
    points: [
      "Review the organization's factual details and credentials",
      "Map the relevant geography across Pune & PCMC",
      "Check applicable platform and medical advertising policies"
    ]
  },
  {
    phase: "02",
    stepNum: 2,
    name: "Structure",
    time: "Days 4–7",
    title: "Campaign Architecture Setup",
    stage: "Campaign Architecture",
    timeline: "Days 4–7",
    icon: Layers,
    deliverable: "Organized Search & Social Campaign Structure",
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200",
    boxBg: "bg-purple-50/70 border-purple-200/90",
    points: [
      "Search campaigns built around accurate, informational queries",
      "Social campaigns focused on public-health awareness",
      "Clear separation of campaign topics and audiences"
    ]
  },
  {
    phase: "03",
    stepNum: 3,
    name: "Targeting",
    time: "Week 2",
    title: "Keyword & Location Settings",
    stage: "Targeting & Filters",
    timeline: "Week 2",
    icon: Target,
    deliverable: "Keyword List & Negative Keyword Filters",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    boxBg: "bg-emerald-50/70 border-emerald-200/90",
    points: [
      "Location settings across Baner, Wakad, Hinjewadi, PCMC",
      "Negative keyword list to keep ads relevant",
      "Transparent audience definitions with no sensitive-data targeting"
    ]
  },
  {
    phase: "04",
    stepNum: 4,
    name: "Creatives",
    time: "Weeks 2–3",
    title: "Factual Visuals & Copy",
    stage: "Creative Production",
    timeline: "Weeks 2–3",
    icon: Sparkles,
    deliverable: "Reviewed Ad Creatives & Educational Video",
    badgeBg: "bg-rose-50 text-rose-600 border-rose-200",
    boxBg: "bg-rose-50/70 border-rose-200/90",
    points: [
      "Educational explainers with practitioner credential disclosure",
      "Calm, factual copywriting without fear-based messaging",
      "AI-assisted media labelled where applicable"
    ]
  },
  {
    phase: "05",
    stepNum: 5,
    name: "Landing Pages",
    time: "Weeks 3–4",
    title: "Accessible Landing Pages",
    stage: "Landing Page Build",
    timeline: "Weeks 3–4",
    icon: Layout,
    deliverable: "Fast-Loading, Accessible Information Pages",
    badgeBg: "bg-amber-50 text-amber-600 border-amber-200",
    boxBg: "bg-amber-50/70 border-amber-200/90",
    points: [
      "Click-to-call and contact options with clear privacy notices",
      "Core Web Vitals focused, mobile-friendly pages",
      "Practitioner credentials and registration details disclosed"
    ]
  },
  {
    phase: "06",
    stepNum: 6,
    name: "Review",
    time: "Ongoing",
    title: "Ongoing Policy & Performance Review",
    stage: "Review & Reporting",
    timeline: "Ongoing",
    icon: TrendingUp,
    deliverable: "Transparent Reporting Dashboard",
    badgeBg: "bg-cyan-50 text-cyan-600 border-cyan-200",
    boxBg: "bg-cyan-50/70 border-cyan-200/90",
    points: [
      "Regular review of ad copy against policy changes",
      "Budget adjustments agreed in advance with you",
      "Transparent monthly reporting on spend and delivery"
    ]
  }
];

const whyChooseCodigix = [
  {
    title: "Policy-Compliant Campaigns",
    desc: "We prioritize truthful, non-soliciting messaging that follows platform policies and applicable communication principles.",
    icon: Zap
  },
  {
    title: "Clear Information Flow",
    desc: "We make sure the path from ad to landing page presents accurate information with clear privacy and credential disclosures.",
    icon: Target
  },
  {
    title: "Transparent Measurement",
    desc: "Tracking is configured with Google Tag Manager and consent-aware settings, aligned with the DPDP Act, 2023.",
    icon: BarChart3
  },
  {
    title: "Local Familiarity",
    desc: "A Pune-based team familiar with the geography of Pune, PCMC, Wakad, Baner, and Hinjewadi.",
    icon: Globe
  },
  {
    title: "Ethical Communication Principles",
    desc: "Awareness of NMC, NDC, and AYUSH communication principles and strict advertising policies for healthcare engagements.",
    icon: ShieldCheck
  }
];

const clientShowcase = [
  {
    name: "Dr. Sheetal's Glow Clinic",
    tag: "Dermatology (NMC scope)",
    location: "Kothrud, Pune",
    duration: "Ongoing engagement",
    services: "Website development, technical SEO, factual service pages",
    result: "Website & Information Architecture",
    highlight: "Factual service pages"
  },
  {
    name: "Canopy Dental Care",
    tag: "Dental (NDC scope)",
    location: "Baner, Pune",
    duration: "Ongoing engagement",
    services: "Website development, accurate local listings",
    result: "Website & Accessibility Work",
    highlight: "Accurate listings"
  },
  {
    name: "CorpLegal Solutions & Co",
    tag: "Corporate Law & B2B (non-medical)",
    location: "Bavdhan, Pune",
    duration: "Ongoing engagement",
    services: "Web development, content writing, technical SEO",
    result: "Structured Web Content",
    highlight: "Technical SEO hygiene"
  },
  {
    name: "Bakul Hospitality & Catering",
    tag: "Hospitality & Events (non-medical)",
    location: "Pune Metro",
    duration: "Ongoing engagement",
    services: "Web pages, accurate local listings",
    result: "Responsive Website Refresh",
    highlight: "Clear service pages"
  }
];

const toolsList = [
  "Google Ads (Search, Display, Video)",
  "Meta Ads Manager (Facebook & Instagram)",
  "Google Analytics 4 (GA4)",
  "Google Tag Manager (consent-aware setup)",
  "Platform Policy & Ad Review Tools",
  "Privacy Notice & Consent Banner Configuration"
];

const kpiList = [
  "Impressions — Visibility of campaign delivery",
  "Click-Through Rate (CTR) — Relevance of ad copy",
  "Ad Policy Status — Approval and compliance checks",
  "Landing Page Speed — Core Web Vitals focused",
  "Accessibility Checks — WCAG 2.1 AA aligned",
  "Consent & Privacy Checks — DPDP-aligned forms"
];

const faqs = [
  {
    q: "What are paid digital campaigns?",
    a: "Paid digital campaigns are search and social advertisements that you pay to run on platforms such as Google, Facebook, and Instagram. We design them around clear, truthful messaging and transparent audience disclosures."
  },
  {
    q: "Why would my organization use paid campaigns?",
    a: "Paid campaigns can share accurate institutional information, public-health awareness content, or service updates with relevant audiences while organic search structure is being built. For medical engagements, copy follows applicable NMC, NDC, or AYUSH communication principles."
  },
  {
    q: "Do you promise specific results?",
    a: "No. We do not promise or guarantee rankings, volumes of enquiries, or business outcomes. We focus on accurate messaging, policy-compliant setup, and transparent reporting."
  },
  {
    q: "Which is better: Google Ads or Meta Ads?",
    a: "They serve different purposes. Google Ads presents factual information to people searching for it. Meta Ads suit educational and awareness content in video or carousel formats. We recommend a mix based on your content and goals, and never use fear-based messaging, cure promises, or inducements."
  },
  {
    q: "How do you handle privacy and tracking?",
    a: "Tracking is configured with consent-aware settings and clear privacy notices, aligned with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (and 2025 Rules). We do not use sensitive health information for targeting."
  },
  {
    q: "What ad budget should we start with?",
    a: "We tailor budgets to your goals and geography. Budget decisions are made with you in advance, reported transparently, and our fees are service-based and never tied to acquiring individual patients."
  }
];

export default function PaidAdvertisementsPage() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);
  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const [activePhase, setActivePhase] = useState(0);
  const [isPhasePaused, setIsPhasePaused] = useState(false);
  const phaseCardsContainerRef = useRef<HTMLDivElement>(null);
  // Auto-advancing re-renders this whole page, so only do it while the phase cards are visible.
  const phaseInView = useInView(phaseCardsContainerRef, { amount: 0.2 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth continuous auto-cycle through all 6 phases without needing clicks
  useEffect(() => {
    if (isPhasePaused || !phaseInView) return;
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % ppcStrategySteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPhasePaused, phaseInView]);

  // Smooth calm scroll phase cards one by one when activePhase changes
  useEffect(() => {
    const container = phaseCardsContainerRef.current;
    const activeEl = cardRefs.current[activePhase];
    if (container && activeEl) {
      const containerCenter = container.offsetWidth / 2;
      const cardCenter = activeEl.offsetLeft + activeEl.offsetWidth / 2;
      const currentScroll = container.scrollLeft;
      const targetScroll = currentScroll + (cardCenter - containerCenter);

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }, [activePhase]);

  return (
    <div className="min-h-screen bg-[#fafbff] text-[#1a1053] selection:bg-[#e20b27] selection:text-white overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/10 via-indigo-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-gradient-to-tr from-[#e20b27]/8 via-purple-400/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-400/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION */}
        {/* ========================================================================= */}
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-[#f8fafe] via-white to-[#f4f7fc] overflow-hidden border-b border-slate-200/80 text-center flex flex-col items-center">

          {/* Floating Animated Result Badges */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-visible">
            {/* Top Left */}
            <motion.div
              animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, -15px) rotate(-1deg)", "translate(0px, 0px) rotate(0deg)"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] left-[2%] xl:left-[8%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
            >
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <Search size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Search Ads</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Factual Search Copy</p>
              </div>
            </motion.div>

            {/* Bottom Left */}
            <motion.div
              animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, 15px) rotate(1deg)", "translate(0px, 0px) rotate(0deg)"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] left-[5%] xl:left-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <TrendingUp size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Reporting</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Transparent Spend</p>
              </div>
            </motion.div>

            {/* Top Right */}
            <motion.div
              animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, 15px) rotate(1deg)", "translate(0px, 0px) rotate(0deg)"] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-[15%] right-[2%] xl:right-[8%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <PhoneCall size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Messaging</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Truthful & Non-Soliciting</p>
              </div>
            </motion.div>

            {/* Bottom Right */}
            <motion.div
              animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, -15px) rotate(-1deg)", "translate(0px, 0px) rotate(0deg)"] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-[25%] right-[5%] xl:right-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
            >
              <div className="w-8 h-8 rounded-full bg-rose-50 text-[#e20b27] flex items-center justify-center shrink-0 border border-rose-100">
                <Zap size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Optimization</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Policy-Aligned</p>
              </div>
            </motion.div>
          </div>

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm mb-7 relative z-20">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#1a1053] tracking-wide">
              Policy-Compliant Search & Social Campaigns
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#1a1053] tracking-tight leading-[1.1] mb-6 max-w-4xl relative z-20">
            Clear, Truthful Messaging <br className="hidden lg:block" /> for Search & Social.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] mt-3">
              Transparent, Policy-Compliant Campaigns.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto mb-10 relative z-20">
            Targeted, policy-compliant search and social campaigns designed around clear, truthful messaging and transparent audience disclosures, across Google, Facebook, and Instagram.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-20">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1053] hover:bg-[#281878] text-white rounded-full font-semibold text-base transition-all shadow-[0_10px_25px_-5px_rgba(26,16,83,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(26,16,83,0.35)] transform hover:-translate-y-0.5"
            >
              <span>Schedule a Discovery Call</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href="#strategy"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-[#1a1053] rounded-full font-semibold text-base shadow-xs transition-all"
            >
              <span>Explore Our 6-Step Process</span>
              <ChevronDown size={18} />
            </a>
          </div>

        </section>


        {/* ========================================================================= */}
        {/* SECTION 2: WHAT WE DO (COMPREHENSIVE ANIMATED 6-CARD GRID - NO CLICKS NEEDED) */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto border-t border-slate-200/80 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs text-xs font-bold text-blue-700 tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Our Execution Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight leading-[1.15]">
              Comprehensive <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Paid Digital Campaign Services
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Campaign services designed for organizations that need accurate, transparent communication. We combine factual messaging, clear audience disclosures, and policy review across search and social channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {whatWeDoList.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
                  whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col justify-between p-7 lg:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_2px_12px_rgba(26,16,83,0.03)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:border-blue-300 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle Hover Gradient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="w-13 h-13 rounded-2xl bg-slate-50 text-[#1a1053] flex items-center justify-center border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-xs group-hover:scale-105">
                        <IconComp size={24} strokeWidth={1.75} />
                      </div>
                      <span className="font-mono text-sm font-extrabold text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100">
                        {item.num}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-lg lg:text-xl font-bold text-[#1a1053] mb-3 group-hover:text-blue-700 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 font-light text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Explore Deliverable</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 3: NOT JUST ADS — A TRANSPARENT PROCESS */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 max-w-7xl m-auto">
          <div className="rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30 border border-blue-200/60 shadow-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

              {/* Left Column: Visual System Infographic */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl bg-white border border-slate-200/90 shadow-lg p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-600 uppercase">Campaign Process</span>
                    <span className="text-xs font-bold text-[#e20b27]">Policy Reviewed</span>
                  </div>

                  {/* Step visual */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                        <span className="text-xs font-bold text-slate-800">Relevant Search Query</span>
                      </div>
                      <span className="text-[11px] text-blue-600 font-semibold">Relevant</span>
                    </div>

                    <div className="flex justify-center text-slate-300">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                        <span className="text-xs font-bold text-slate-800">Accessible Landing Page</span>
                      </div>
                      <span className="text-[11px] text-indigo-600 font-semibold">Clear Disclosures</span>
                    </div>

                    <div className="flex justify-center text-slate-300">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                        <span className="text-xs font-bold text-emerald-900">Clear Contact Information</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-bold">Privacy Notice</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Copy & Bullet Points */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#e20b27]/10 border border-[#e20b27]/20 text-[#e20b27] text-xs font-bold uppercase tracking-wider">
                  Transparent Process
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
                  Not Just Ads — A Transparent, Policy-Aware Process
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Paid advertising (PPC) lets you pay when users click your ad. For healthcare and institutional communication, the quality of the message and the landing page matter as much as the setup.
                </p>

                <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm font-semibold">
                  Running ads without clear messaging and policy review creates compliance and reputation risk.
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-sm font-bold text-[#1a1053]">We focus on an end-to-end, transparent campaign process:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Transparent audience targeting</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Policy-compliant ad campaigns</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Clear budget reporting</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Truthful, non-soliciting ad copy</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 4: WHAT YOU GET WITH OUR PPC SERVICES */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              Transparent Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What You Get With Our PPC Services
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Clear, transparent advertising systems built around accurate messaging and responsible communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatYouGetCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold text-slate-400 font-mono">0{idx + 1}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1a1053] group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{card.statLabel}</p>
                      <p className="text-lg font-black text-[#1a1053]">{card.stat}</p>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 5: WHAT IS INCLUDED IN OUR HEALTHCARE PPC SERVICES? (5 AD TYPES) */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto border-t border-slate-200/80 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Search & Social Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What Is Included In Our Paid Campaign Services?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              From search ads on Google to awareness campaigns on Facebook & Instagram, each is built around accurate, non-promotional information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {ppcAdTypes.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.color} shadow-sm`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {item.pill}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#1a1053]">{item.title}</h3>
                      <p className="text-xs text-blue-600 font-semibold">{item.subtitle}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      {item.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 6: OUR 6-STEP PPC STRATEGY & EXECUTION ROADMAP */}
        {/* ========================================================================= */}
        <section id="strategy" className="py-16 sm:py-24 max-w-7xl m-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              Our Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              Our 6-Step Campaign Process
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              A structured roadmap designed around policy review, factual messaging, accessible landing pages, and transparent reporting.
            </p>
          </div>

          {/* Ultra-Minimalist Process Stepper Timeline */}
          <div
            onMouseEnter={() => setIsPhasePaused(true)}
            onMouseLeave={() => setIsPhasePaused(false)}
            className="mb-8 w-full px-1"
          >
            <style>{`
              @keyframes segmentProgressPPC {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}</style>

            <div className="flex items-start justify-between w-full">
              {ppcStrategySteps.map((stage, sIdx, arr) => {
                const isPast = sIdx < activePhase;
                const isActive = sIdx === activePhase;

                return (
                  <React.Fragment key={stage.phase}>
                    {/* Minimalist Step Node Button */}
                    <button
                      type="button"
                      onClick={() => setActivePhase(sIdx)}
                      onMouseEnter={() => setActivePhase(sIdx)}
                      className="flex flex-col items-center group cursor-pointer focus:outline-none shrink-0"
                      style={{ width: 'clamp(44px, 12vw, 80px)' }}
                    >
                      {/* Step Circle Badge */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all duration-300 ${isActive
                          ? 'bg-blue-600 text-white shadow-xs ring-4 ring-blue-100 scale-105'
                          : isPast
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-400 border border-slate-300 group-hover:border-slate-400'
                          }`}
                      >
                        {isPast ? <Check size={13} className="stroke-[2.5]" /> : stage.phase}
                      </div>

                      {/* Step Name & Time */}
                      <span
                        className={`text-[11px] sm:text-xs font-bold mt-2 leading-tight text-center transition-colors truncate max-w-full ${isActive
                          ? 'text-[#1a1053]'
                          : isPast
                            ? 'text-slate-700'
                            : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                      >
                        {stage.name}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                        {stage.time}
                      </span>
                    </button>

                    {/* Connecting Animated Line Between Steps */}
                    {sIdx < arr.length - 1 && (
                      <div className="flex-1 mt-3.5 sm:mt-4 mx-1.5 sm:mx-2 h-0.5 bg-slate-200 relative rounded-full overflow-hidden">
                        {/* Completed Line */}
                        {isPast && (
                          <div className="absolute inset-0 bg-blue-600" />
                        )}

                        {/* Active Animated Traveling Line */}
                        {isActive && (
                          <div
                            key={activePhase}
                            className="absolute left-0 top-0 bottom-0 bg-blue-600"
                            style={{
                              animation: 'segmentProgressPPC 5.5s linear forwards',
                              animationPlayState: isPhasePaused ? 'paused' : 'running'
                            }}
                            onAnimationEnd={() => {
                              if (!isPhasePaused) {
                                setActivePhase((prev) => (prev + 1) % 6);
                              }
                            }}
                          />
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Smoothly Auto-Scrolled Strategy Cards */}
          <div className="relative">
            {/* Left and Right Edge Gradient Fade Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-r from-[#fafbff] via-[#fafbff]/80 to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-l from-[#fafbff] via-[#fafbff]/80 to-transparent z-20" />

            {/* Smooth Horizontal Scroll Track */}
            <div
              ref={phaseCardsContainerRef}
              onMouseEnter={() => setIsPhasePaused(true)}
              onMouseLeave={() => setIsPhasePaused(false)}
              className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-8 pt-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                paddingLeft: 'max(1.5rem, calc(50% - 215px))',
                paddingRight: 'max(1.5rem, calc(50% - 215px))'
              }}
            >
              {ppcStrategySteps.map((step, idx) => {
                const PhaseIcon = step.icon;
                const isActiveCard = idx === activePhase;

                return (
                  <div
                    key={step.phase}
                    ref={(el) => { cardRefs.current[idx] = el; }}
                    onClick={() => setActivePhase(idx)}
                    onMouseEnter={() => setActivePhase(idx)}
                    className={`w-[85vw] sm:w-[380px] lg:w-[410px] shrink-0 p-5 sm:p-6 rounded-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer relative overflow-hidden ${isActiveCard
                      ? 'bg-white border-2 border-blue-600 shadow-lg ring-2 ring-blue-500/10 scale-100 opacity-100 z-10'
                      : 'bg-white/90 border border-slate-200/80 hover:border-slate-300 shadow-xs opacity-60 hover:opacity-90 scale-[0.98] hover:scale-100'
                      }`}
                  >
                    {/* Top Accent Gradient Bar for Active Card */}
                    {isActiveCard && (
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]" />
                    )}

                    <div>
                      {/* Compact Header: Step Badge + Phase Meta */}
                      <div className="flex items-center justify-between gap-3 mb-3 pb-2.5 border-b border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border font-mono font-extrabold text-xs shadow-2xs ${step.badgeBg}`}>
                            {step.phase}
                          </div>
                          <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 block">
                              Phase {step.stepNum} • {step.stage}
                            </span>
                            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                              <Clock size={11} className="text-slate-400" />
                              {step.timeline}
                            </span>
                          </div>
                        </div>

                        {isActiveCard ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200 shadow-2xs shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                            ACTIVE
                          </span>
                        ) : (
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center border shadow-2xs shrink-0 ${step.badgeBg}`}>
                            <PhaseIcon size={14} className="stroke-[2.2]" />
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className={`text-base sm:text-lg font-bold mb-3 leading-snug tracking-tight transition-colors ${isActiveCard ? 'text-[#1a1053]' : 'text-slate-700'
                        }`}>
                        {step.title}
                      </h3>

                      {/* Checklist */}
                      <ul className="space-y-2 mb-4">
                        {step.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-600 leading-snug">
                            <div className="w-4 h-4 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 size={11} className="stroke-[2.5]" />
                            </div>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What You Get Deliverable Box */}
                    <div className="pt-3 border-t border-slate-100 mt-auto">
                      <div className={`p-3 rounded-xl border transition-all ${step.boxBg}`}>
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                          <span>What You Get</span>
                          <span className="text-emerald-700 bg-emerald-100/90 px-1.5 py-0.5 rounded font-bold text-[9px]">
                            DELIVERABLE ✓
                          </span>
                        </div>
                        <div className="text-xs sm:text-[13px] font-extrabold text-[#1a1053] leading-snug">
                          {step.deliverable}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 7: WHY CHOOSE CODIGIX INFOTECH */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto border-t border-slate-200/80 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
              The Codigix Edge
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              Why Choose Codigix Infotech
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We combine healthcare industry awareness with careful advertising setup so that campaigns stay accurate, transparent, and policy-compliant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6   mx-auto">
            {whyChooseCodigix.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1053]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* 6th Card: Direct Strategy Call Booking */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1a1053] to-slate-900 text-white p-6 sm:p-7 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Campaign Discovery Call
                </span>
                <h3 className="text-lg font-bold text-white">Need a campaign policy review?</h3>
                <p className="text-xs text-slate-300">We review your messaging, audience settings, and landing pages for accuracy and policy alignment.</p>
              </div>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg bg-[#e20b27] hover:bg-red-700 text-white transition-colors"
                >
                  <span>Schedule a Discovery Call</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 8: CLIENT SUCCESS SHOWCASE (SAME AS SEO PAGE) */}
        {/* ========================================================================= */}
        <ClientShowcaseSection
          badgeText="Selected Work by Regulatory Scope"
          headingPrefix="Organizations Across Pune & PCMC"
          headingGradient="Work With Codigix Infotech"
          subtitle="Website architecture, factual service pages, and technical hygiene for healthcare organizations (NMC and NDC frameworks) and non-medical businesses, which sit outside NMC scope."
          strategicAdvantageTitle="How We Run Campaigns"
          strategicAdvantageSubtitle="Transparent audience settings, factual messaging, and clear reporting."
          guaranteeTitle="Ethical Communication Commitment"
          guaranteeQuote='"Campaign messaging is truthful and non-soliciting, with no inducements or cure promises, and tracking is configured in line with the IT Act, 2000 and the DPDP Act, 2023."'
        />


        {/* ========================================================================= */}
        {/* SECTION 9: TOOLS & PLATFORMS WE USE & KPIS WE TRACK */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto border-t border-slate-200/80 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left Card: Tools & Platforms We Use */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-[#1a1053] text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Tools & Platforms We Use</h3>
                  <p className="text-xs text-slate-300">Ad platforms and analytics stack</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {toolsList.map((tool, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs font-semibold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: KPIs We Track */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1a1053] to-slate-900 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center text-red-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">KPIs We Track</h3>
                  <p className="text-xs text-slate-300">Transparent indicators we review</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {kpiList.map((kpi, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs font-semibold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{kpi}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 10: FAQ (RESPONSIVE 2-COLUMN GRID) */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              Answers to Your Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              FAQ : <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Frequently Asked Questions</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Clear answers to common questions about our paid campaign services.
            </p>
          </div>

          {/* 2-Column Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-start   mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqs.includes(idx);
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                    ? 'border-blue-300 bg-white shadow-xs ring-2 ring-blue-500/10'
                    : 'border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-[#1a1053] text-sm sm:text-base hover:text-blue-600 transition-colors gap-3 cursor-pointer"
                  >
                    <span className="leading-snug">{faq.q}</span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-white border border-slate-200 text-slate-500'
                      }`}>
                      <ChevronDown size={15} />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm font-light text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick Contact Card Below FAQ */}
          <div className="mt-10 max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageSquare size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1053]">Have a specific advertising question?</h4>
                <p className="text-xs text-slate-600">Our team is ready to discuss your location, messaging needs, and budget.</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-[#e20b27] hover:bg-red-700 text-white font-bold text-xs shrink-0 shadow-sm transition-colors"
            >
              <PhoneCall size={14} />
              <span>Talk to Our Team</span>
            </Link>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 11: BOTTOM CTA BANNER */}
        {/* ========================================================================= */}
        <section className="py-12">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#1a1053] to-slate-900 text-white p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>Transparent Campaign Setup</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Plan Policy-Compliant Paid Campaigns?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Connect with our team to discuss clear, truthful, policy-compliant search and social campaigns for your organization.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-base shadow-lg shadow-amber-400/20 hover:shadow-xl transition-all"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Schedule a Discovery Call</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-base transition-colors"
                >
                  <span>View All 6 Services</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
