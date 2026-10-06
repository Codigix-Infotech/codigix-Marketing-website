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
    title: "Google Search & Display Ads for Healthcare",
    desc: "Target patients actively searching for specific treatments, surgeries, and emergency clinic visits with high-intent Google Search campaigns and high-reach Display networks.",
    icon: Search,
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    num: "02",
    title: "Meta (Facebook & Instagram) Ad Campaigns",
    desc: "Engage local communities and target specific demographics with visually stunning reels, carousel ads, and patient awareness campaigns on Instagram and Facebook.",
    icon: Instagram,
    color: "from-pink-600 to-purple-600",
    bg: "bg-pink-50 text-pink-600 border-pink-200"
  },
  {
    num: "03",
    title: "Retargeting & Remarketing Strategies",
    desc: "Re-engage patients who visited your website, viewed your doctor profiles, or browsed treatment pages but left without scheduling an appointment.",
    icon: RotateCw,
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    num: "04",
    title: "Landing Page Design & Conversion Optimization",
    desc: "Custom-built, sub-second loading healthcare landing pages with one-tap WhatsApp booking, click-to-call, and trust badges designed to convert up to 35%+ of visitors into leads.",
    icon: Layout,
    color: "from-indigo-600 to-blue-600",
    bg: "bg-indigo-50 text-indigo-600 border-indigo-200"
  },
  {
    num: "05",
    title: "A/B Testing for Ad Creatives & Copy",
    desc: "Continuous multi-variant split testing on headlines, visuals, call-to-actions, and patient psychology hooks to steadily reduce your Cost Per Lead (CPL).",
    icon: Sliders,
    color: "from-amber-600 to-orange-600",
    bg: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    num: "06",
    title: "Detailed Campaign Performance Reporting",
    desc: "100% transparent real-time dashboards showing exact ad spend, impressions, CTR, total qualified leads, cost per booking, and Return On Ad Spend (ROAS).",
    icon: BarChart3,
    color: "from-purple-600 to-pink-600",
    bg: "bg-purple-50 text-purple-600 border-purple-200"
  }
];

const whatYouGetCards = [
  {
    icon: Zap,
    title: "Instant Lead Generation",
    desc: "Start getting qualified patient inquiries, phone calls, and appointment bookings within 24 to 48 hours of campaign launch.",
    stat: "24-48 hrs",
    statLabel: "Time to First Lead",
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50/80 border-blue-200/70"
  },
  {
    icon: Target,
    title: "Highly Targeted Audience",
    desc: "Reach people actively searching for your specialized medical services within your exact city, pin codes, and radius.",
    stat: "100%",
    statLabel: "Intent-Targeted",
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50/80 border-emerald-200/70"
  },
  {
    icon: DollarSign,
    title: "Controlled Budget & Measurable ROI",
    desc: "Track every single rupee spent and optimize bids continuously so your ad budget generates predictable clinic revenue.",
    stat: "4.8x+",
    statLabel: "Average ROAS",
    color: "from-purple-600 to-pink-600",
    bg: "bg-purple-50/80 border-purple-200/70"
  },
  {
    icon: TrendingUp,
    title: "Scalable Growth",
    desc: "Increase ad spend with complete confidence only when conversion rates and patient acquisition profits are proven.",
    stat: "300%+",
    statLabel: "Scalable Capacity",
    color: "from-rose-600 to-amber-600",
    bg: "bg-rose-50/80 border-rose-200/70"
  }
];

const ppcAdTypes = [
  {
    title: "Google Search Ads",
    subtitle: "High-Intent Search",
    desc: "Capture patients actively looking for doctors, clinics, and treatments at the exact moment of need.",
    icon: Search,
    color: "text-blue-600 bg-blue-50 border-blue-200/70",
    pill: "High Intent",
    points: ["Target 'near me' medical keywords", "Appear above organic rankings", "Direct Click-to-Call extensions"]
  },
  {
    title: "Display Ads",
    subtitle: "Visual Brand Recall",
    desc: "Increase brand awareness across trusted health websites, medical blogs, and local news portals.",
    icon: Layout,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200/70",
    pill: "Brand Reach",
    points: ["High-impact visual banners", "Doctor profile promotions", "Hyper-local geo-fenced placements"]
  },
  {
    title: "YouTube Ads",
    subtitle: "Video Storytelling",
    desc: "Engage prospective patients through educational clinical videos, treatment explainers, and patient testimonials.",
    icon: Youtube,
    color: "text-rose-600 bg-rose-50 border-rose-200/70",
    pill: "High Trust",
    points: ["Doctor authority video clips", "Patient recovery testimonials", "Non-skippable & bumper ad formats"]
  },
  {
    title: "Meta Ads (FB & IG)",
    subtitle: "Social Engagement",
    desc: "Generate consistent patient leads with engaging video reels, carousel ads, and lead generation forms.",
    icon: Instagram,
    color: "text-pink-600 bg-pink-50 border-pink-200/70",
    pill: "Viral Reach",
    points: ["Targeted demographic filters", "Interactive Instant Lead Forms", "Instagram Reels & Story ads"]
  },
  {
    title: "Remarketing Ads",
    subtitle: "Re-engage Visitors",
    desc: "Re-target prospective patients who visited your site or social profiles but haven't yet booked an appointment.",
    icon: RotateCw,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200/70",
    pill: "Max Conversion",
    points: ["Recover dropped visitors", "Special clinic offer reminders", "Cross-channel patient recall"]
  }
];

const ppcStrategySteps = [
  {
    phase: "01",
    stepNum: 1,
    name: "Research",
    time: "Days 1–3",
    title: "Healthcare Market & Competitor Audit",
    stage: "Research & Audit",
    timeline: "Days 1–3",
    icon: Search,
    deliverable: "Competitor Benchmark & Patient Persona Blueprint",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200",
    boxBg: "bg-blue-50/70 border-blue-200/90",
    points: [
      "Analyze top competitor ads and high-converting keywords",
      "Map target patient demographics across Pune & PCMC",
      "Ensure strict compliance with medical advertising policies"
    ]
  },
  {
    phase: "02",
    stepNum: 2,
    name: "Funnel Setup",
    time: "Days 4–7",
    title: "Multi-Channel Ad Architecture Setup",
    stage: "Funnel Architecture",
    timeline: "Days 4–7",
    icon: Layers,
    deliverable: "Synchronized Search, Meta & Retargeting Funnel",
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200",
    boxBg: "bg-purple-50/70 border-purple-200/90",
    points: [
      "High-intent Google Search ads for urgent medical needs",
      "Targeted Meta reels & carousels for treatment awareness",
      "Automated retargeting to re-engage prospective patients"
    ]
  },
  {
    phase: "03",
    stepNum: 3,
    name: "Targeting",
    time: "Week 2",
    title: "High-Intent Keyword & Geo-Targeting",
    stage: "Targeting & Filters",
    timeline: "Week 2",
    icon: Target,
    deliverable: "High-Intent Search Matrix & Negative Keyword Shield",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    boxBg: "bg-emerald-50/70 border-emerald-200/90",
    points: [
      "Pin-point radius geo-fencing (Baner, Wakad, Hinjewadi, PCMC)",
      "Strict negative keyword list to eliminate wasted ad spend",
      "Custom interest and lookalike patient audience building"
    ]
  },
  {
    phase: "04",
    stepNum: 4,
    name: "Creatives",
    time: "Weeks 2–3",
    title: "Scroll-Stopping Visuals & Doctor Copy",
    stage: "Creative Production",
    timeline: "Weeks 2–3",
    icon: Sparkles,
    deliverable: "High-CTR Visual Ad Banners & Video Reels",
    badgeBg: "bg-rose-50 text-rose-600 border-rose-200",
    boxBg: "bg-rose-50/70 border-rose-200/90",
    points: [
      "Visual treatment explainers & doctor authority videos",
      "Empathetic, patient-focused medical ad copywriting",
      "Continuous A/B split testing on hooks and headlines"
    ]
  },
  {
    phase: "05",
    stepNum: 5,
    name: "Landing Pages",
    time: "Weeks 3–4",
    title: "Sub-Second Conversion Landing Pages",
    stage: "Conversion Optimization",
    timeline: "Weeks 3–4",
    icon: Layout,
    deliverable: "Fast-Loading WhatsApp & Call Booking Pages",
    badgeBg: "bg-amber-50 text-amber-600 border-amber-200",
    boxBg: "bg-amber-50/70 border-amber-200/90",
    points: [
      "Instant 1-tap WhatsApp consultation and click-to-call",
      "Sub-second mobile loading speed for highest conversion",
      "Verified patient reviews, doctor credentials and trust badges"
    ]
  },
  {
    phase: "06",
    stepNum: 6,
    name: "Scale & ROI",
    time: "Ongoing",
    title: "Daily Bid Tuning & Budget Scaling",
    stage: "Scaling & Analytics",
    timeline: "Ongoing Growth",
    icon: TrendingUp,
    deliverable: "Real-Time ROI Dashboard & Lead Scaling",
    badgeBg: "bg-cyan-50 text-cyan-600 border-cyan-200",
    boxBg: "bg-cyan-50/70 border-cyan-200/90",
    points: [
      "Daily bid management to steadily reduce Cost Per Lead (CPL)",
      "Aggressive budget scaling on top-performing treatments",
      "Transparent monthly reporting tracking revenue & ROAS"
    ]
  }
];

const whyChooseCodigix = [
  {
    title: "ROI-Focused Campaigns",
    desc: "We prioritize actual booked patient consultations and clinic revenue over meaningless clicks and impressions.",
    icon: Zap
  },
  {
    title: "Conversion-Focused Strategy",
    desc: "We optimize the entire patient acquisition funnel — from the first ad view to landing page submission.",
    icon: Target
  },
  {
    title: "Data-Driven Decisions",
    desc: "Every marketing rupee is tracked with precision via Google Tag Manager and Server-Side Meta Conversion API.",
    icon: BarChart3
  },
  {
    title: "Local Market Expertise",
    desc: "Deep knowledge of patient demographics and search patterns across Pune, PCMC, Wakad, Baner, and Hinjewadi.",
    icon: Globe
  },
  {
    title: "Healthcare Marketing Specialists",
    desc: "Specialized in medical terminology, patient psychology, doctor brand authority, and strict healthcare ad policies.",
    icon: ShieldCheck
  }
];

const clientShowcase = [
  {
    name: "Dr. Sheetal's Glow Clinic",
    tag: "Skin & Dermatology",
    location: "Kothrud, Pune",
    duration: "6+ Months Active",
    services: "Social Media Marketing, SEO & GMB, Meta Lead Ads, Web Development",
    result: "+380% Inquiries",
    highlight: "Rank #1: Skin Clinic PCMC"
  },
  {
    name: "Regain Hair & Skin Clinic",
    tag: "Trichology & Hair",
    location: "Wakad, Pune",
    duration: "1 Year Active",
    services: "Social Media Marketing, SEO, Google Business Profile (GMB), Ad Funnels",
    result: "650+ Inquiries/Mo",
    highlight: "4.9x Ad ROAS"
  },
  {
    name: "Dr. Prasad Kasbekar Clinic",
    tag: "Oncology Specialist",
    location: "Pune & PCMC",
    duration: "1 Year Active",
    services: "Doctor Authority Branding, High-Intent Search Ads, Video Content",
    result: "180+ Consultations",
    highlight: "High-Intent Patients"
  },
  {
    name: "Canopy Dental Care",
    tag: "Dental & Aligners",
    location: "Baner, Pune",
    duration: "1 Year Active",
    services: "Local Geo-Targeted SEO, WhatsApp Funnels, Website Development",
    result: "320+ Patients",
    highlight: "Rank #1: Invisalign Wakad"
  },
  {
    name: "CorpLegal Solutions & Co",
    tag: "Corporate Law & B2B",
    location: "Bavdhan, Pune",
    duration: "1 Year Active",
    services: "Web Development, Social Media Content Writing, B2B Search",
    result: "#1 Organic Authority",
    highlight: "Rank #1: Corporate Law Pune"
  },
  {
    name: "Bakul Hospitality & Catering",
    tag: "Hospitality & Events",
    location: "Pune Metro",
    duration: "1 Year Active",
    services: "Social Media Marketing, SEO, Local Maps Optimization, Web Pages",
    result: "3.4x Direct Calls",
    highlight: "210+ Verified Reviews"
  },
  {
    name: "Sanskruti Agro Tourism",
    tag: "Agro Tourism & Leisure",
    location: "Chakan & Outskirts",
    duration: "4 Months Active",
    services: "Social Media Marketing, Meta Ad Campaigns, Local SEO Optimization",
    result: "+300% Footfall",
    highlight: "Rank #1: Agro Resort Pune"
  }
];

const toolsList = [
  "Google Ads (Search, Display, Video, Discovery)",
  "Meta Ads Manager (Facebook & Instagram)",
  "Google Analytics 4 (GA4)",
  "Google Tag Manager & Server-Side Tracking",
  "Meta Conversions API (CAPI)",
  "CallRail & Lead Tracking CRM"
];

const kpiList = [
  "Cost Per Lead (CPL) — Minimize ad cost per inquiry",
  "Click-Through Rate (CTR) — Maximize ad engagement",
  "Conversion Rate (CVR) — Turn visitors into booked patients",
  "Cost Per Acquisition (CPA) — Exact cost per treated patient",
  "Return On Ad Spend (ROAS) — Measure clinic revenue multiples",
  "Appointment Show-Up Rate — High-intent patient filtering"
];

const faqs = [
  {
    q: "What is PPC advertising?",
    a: "PPC (Pay-Per-Click) is a digital advertising model where you only pay when a prospective patient clicks on your ad or calls your clinic. It delivers immediate visibility at the very top of Google search results and on social platforms like Facebook and Instagram."
  },
  {
    q: "Why does my healthcare practice need PPC?",
    a: "Unlike SEO which takes 3 to 6 months to build organic momentum, PPC delivers instant patient inquiries within 24 to 48 hours. It allows you to target high-intent patients searching for emergency treatments, specialized surgeries, or consultations right now in your specific neighborhood."
  },
  {
    q: "How quickly do PPC ads deliver results?",
    a: "PPC campaigns can start generating phone calls and appointment requests within 24 to 48 hours of launch. Once your ads and dedicated landing pages are live, patients searching for your medical services will immediately see your clinic."
  },
  {
    q: "Which is better: Google Ads or Meta Ads?",
    a: "Both platforms serve complementary purposes. Google Ads captures high-intent patients actively searching for immediate medical help ('emergency dentist near me' or 'best orthopedic doctor in Pune'). Meta Ads (Facebook & Instagram) excel at visual treatments (dermatology, cosmetology, IVF, hair transplants) and building brand trust through video reels."
  },
  {
    q: "How do you ensure our ad budget is not wasted?",
    a: "We implement rigorous negative keyword lists, laser-focused radius geo-targeting, click-fraud prevention, continuous A/B split testing on ad copy, and high-converting custom landing pages. Every single rupee is tracked against verified patient appointments."
  },
  {
    q: "What ad budget should we start with?",
    a: "We tailor ad budgets to your clinic's specialty and geographic target. Most clinics start with a comfortable testing budget that allows us to test multiple ad sets and keywords, and scale up spend only when positive ROI and patient bookings are clearly demonstrated."
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
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">High-Intent Clicks</p>
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
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">ROAS</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">4.8x Return</p>
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
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Leads</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">24-48h Patient Flow</p>
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
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Max ROI Driven</p>
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
              Google & Meta Ads Experts
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#1a1053] tracking-tight leading-[1.1] mb-6 max-w-4xl relative z-20">
            Build a Healthcare Brand Patients <br className="hidden lg:block" /> Follow & Trust.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] mt-3">
              More Clicks. More Leads.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto mb-10 relative z-20">
            Don’t wait months for organic results. Our data-driven PPC campaigns put your clinic in front of high-intent patients immediately — across Google, Facebook, and Instagram — with every rupee of your budget optimized for maximum ROI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-20">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1053] hover:bg-[#281878] text-white rounded-full font-semibold text-base transition-all shadow-[0_10px_25px_-5px_rgba(26,16,83,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(26,16,83,0.35)] transform hover:-translate-y-0.5"
            >
              <span>Book Free Ad Strategy Call</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href="#strategy"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-[#1a1053] rounded-full font-semibold text-base shadow-xs transition-all"
            >
              <span>Explore 6-Step Strategy</span>
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
                Paid Advertising & Growth Services
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              A custom brand strategy designed for healthcare providers. We combine patient psychology, high-intent targeting, and multi-channel advertising to scale your patient consultations.
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
        {/* SECTION 3: NOT JUST ADS — A PROFIT-GENERATING SYSTEM */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 max-w-7xl m-auto">
          <div className="rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30 border border-blue-200/60 shadow-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

              {/* Left Column: Visual System Infographic */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl bg-white border border-slate-200/90 shadow-lg p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-600 uppercase">PPC Profit System</span>
                    <span className="text-xs font-bold text-[#e20b27]">High Conversion</span>
                  </div>

                  {/* Step visual */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                        <span className="text-xs font-bold text-slate-800">Targeted Healthcare Search</span>
                      </div>
                      <span className="text-[11px] text-blue-600 font-semibold">High Intent</span>
                    </div>

                    <div className="flex justify-center text-slate-300">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                        <span className="text-xs font-bold text-slate-800">High-Converting Landing Page</span>
                      </div>
                      <span className="text-[11px] text-indigo-600 font-semibold">35%+ CVR</span>
                    </div>

                    <div className="flex justify-center text-slate-300">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                        <span className="text-xs font-bold text-emerald-900">Booked Patient Consultation</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-bold">4.8x ROI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Copy & Bullet Points */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#e20b27]/10 border border-[#e20b27]/20 text-[#e20b27] text-xs font-bold uppercase tracking-wider">
                  Strategic Performance
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
                  Not Just Ads — A Profit-Generating System
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Paid advertising (PPC) allows you to pay only when users take action — whether it’s clicking your ad, calling your clinic, or scheduling an appointment.
                </p>

                <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm font-semibold">
                  ⚠️ But running ads without strategy = burning money.
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-sm font-bold text-[#1a1053]">We focus on building an end-to-end patient funnel:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>High-conversion targeting</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Funnel-based ad campaigns</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Continuous bid optimization</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>More leads at lower cost & higher ROI</span>
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
              Guaranteed Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What You Get With Our PPC Services
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Predictable, scalable, and fully transparent advertising systems engineered to maximize clinic revenue and patient trust.
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
              Complete Multi-Channel Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What Is Included In Our Healthcare PPC Services?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              From searching for doctors near them on Google to seeing targeted ads on Facebook & Instagram, we cover the entire patient journey.
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
              Proven Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              Our 6-Step PPC Strategy & Growth Roadmap
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              A synchronized medical advertising roadmap designed to eliminate ad waste, drive urgent patient bookings, and maximize clinic revenue.
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
              We combine deep healthcare industry understanding with advanced advertising algorithms to turn ad spend into profitable practice growth.
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
                  <Sparkles className="w-3.5 h-3.5" /> Direct Doctor Consultation
                </span>
                <h3 className="text-lg font-bold text-white">Need a custom PPC audit?</h3>
                <p className="text-xs text-slate-300">We analyze your competitor ads, keyword costs, and projected CPL within 24 hours.</p>
              </div>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg bg-[#e20b27] hover:bg-red-700 text-white transition-colors"
                >
                  <span>Request Free Audit</span>
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
          badgeText="Verified Paid Ads & Client Growth"
          headingPrefix="Why Leading Brands Across Pune & PCMC"
          headingGradient="Scale With Codigix Ad Campaigns"
          subtitle="Delivering high-intent qualified leads, predictable patient flow, and verified 4.8x+ ROAS across clinics, hospitals, B2B enterprises, and local brands."
          strategicAdvantageTitle="The Codigix PPC Advantage"
          strategicAdvantageSubtitle="Precision geo-targeting, conversion rate optimization, and transparent real-time reporting."
          guaranteeTitle="100% Transparent ROI & Budget Safety"
          guaranteeQuote='"Every single marketing rupee is tracked through server-side APIs to deliver verified patient appointments and sales revenue."'
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
                  <p className="text-xs text-slate-300">Enterprise ad platforms and analytics stack</p>
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
                  <p className="text-xs text-slate-300">Metrics that directly drive clinic bottom-line</p>
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
              Clear answers to the most common questions healthcare practitioners and clinic managers ask about our paid advertising services.
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
                <p className="text-xs text-slate-600">Our senior healthcare ad strategists are ready to evaluate your target location and budget.</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-[#e20b27] hover:bg-red-700 text-white font-bold text-xs shrink-0 shadow-sm transition-colors"
            >
              <PhoneCall size={14} />
              <span>Talk to PPC Specialist</span>
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
                <span>Immediate Patient Pipeline</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Generate High-Quality Leads with Paid Ads?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Start with a performance-driven ad campaign for your healthcare practice. Book your free 1-on-1 ad strategy consultation today.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-base shadow-lg shadow-amber-400/20 hover:shadow-xl transition-all"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Book Your Free PPC Consultation</span>
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
