"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  MapPin,
  Link2,
  Instagram,
  Youtube,
  Code2,
  Search,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Sparkles,
  ChevronDown,
  BarChart3,
  ShieldCheck,
  Globe,
  PhoneCall,
  Zap,
  Target,
  Layers,
  Clock,
  Award,
  Activity,
  Cpu,
  Star,
  ShoppingCart,
  FileText,
  Building2,
  Factory,
  Stethoscope,
  UtensilsCrossed
} from 'lucide-react';

const whatWeDoList = [
  {
    num: "01",
    title: "Local SEO for businesses in Pune/PCMC",
    desc: "Target customers in your specific locality (Kothrud, Baner, Wakad, Pimpri, Chinchwad, Hinjewadi) searching for your products or services.",
    icon: MapPin,
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    num: "02",
    title: "On-page & off-page SEO optimization",
    desc: "Comprehensive metadata, semantic HTML hierarchy, internal linking architecture, and high-authority industry backlinks.",
    icon: Layers,
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    num: "03",
    title: "Google Business Profile management",
    desc: "Optimization of Google Maps 3-pack listing, weekly updates, verified review generation, and local business citation building.",
    icon: Globe,
    color: "from-purple-600 to-fuchsia-600",
    bg: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    num: "04",
    title: "High-intent keyword strategy",
    desc: "Target search queries with strong purchase intent (e.g. 'best [service] near me', 'top [product] in Pune').",
    icon: Search,
    color: "from-rose-600 to-red-600",
    bg: "bg-rose-50 text-rose-600 border-rose-200"
  },
  {
    num: "05",
    title: "Technical SEO & website speed optimization",
    desc: "Core Web Vitals tuning, mobile responsiveness, fast load speeds, schema structured data, and flawless indexation.",
    icon: Cpu,
    color: "from-amber-600 to-orange-600",
    bg: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    num: "06",
    title: "Monthly ranking & ROI tracking",
    desc: "Transparent monthly analytics tracking keyword positions, Google Maps calls, sales inquiries, and website visits.",
    icon: BarChart3,
    color: "from-cyan-600 to-blue-600",
    bg: "bg-cyan-50 text-cyan-600 border-cyan-200"
  }
];

const whatYouGetCards = [
  {
    icon: Target,
    title: "High-Intent Traffic",
    desc: "We bring visitors who are actively searching for your specific products and services.",
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50/80 border-blue-200/70"
  },
  {
    icon: PhoneCall,
    title: "Consistent Lead Generation",
    desc: "Turn organic traffic into verified inquiries, phone calls, and scheduled consultations or sales.",
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50/80 border-emerald-200/70"
  },
  {
    icon: MapPin,
    title: "Local Market Domination",
    desc: "Rank in the Google Maps 3-Pack and capture local 'near me' searches across Pune & PCMC.",
    color: "from-purple-600 to-pink-600",
    bg: "bg-purple-50/80 border-purple-200/70"
  },
  {
    icon: TrendingUp,
    title: "Long-Term Growth",
    desc: "Build a permanent organic customer acquisition asset without having to pay per click on ad networks.",
    color: "from-rose-600 to-amber-600",
    bg: "bg-rose-50/80 border-rose-200/70"
  }
];

const seoProcessSteps = [
  {
    step: "01",
    title: "Website Audit & Research",
    points: ["Complete technical audit", "Competitor analysis", "Keyword gap identification"]
  },
  {
    step: "02",
    title: "Keyword Strategy (Intent-Based)",
    points: ["Transactional keywords", "Local keywords", "Informational keywords"]
  },
  {
    step: "03",
    title: "On-Page Optimization",
    points: ["Meta tags optimization", "Content structuring", "Internal linking", "Image SEO", "Schema markup"]
  },
  {
    step: "04",
    title: "Technical SEO",
    points: ["Website speed optimization", "Mobile-first optimization", "Indexing & crawl fixes", "Core Web Vitals improvement"]
  },
  {
    step: "05",
    title: "Local SEO (Google Business Optimization)",
    points: ["Google Business Profile setup & optimization", "Local citations", "Review management", "Map ranking improvement"]
  },
  {
    step: "06",
    title: "Content Marketing",
    points: ["SEO blogs & topic clusters", "Service/Product page optimization", "Industry authority content"]
  },
  {
    step: "07",
    title: "Link Building",
    points: ["High-quality backlinks", "Niche-specific authority links", "Domain authority growth"]
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

const whyChoosePoints = [
  {
    title: "Performance-Driven Approach",
    desc: "We focus on real ROI, qualified leads, and sales, not just vanity keyword rankings.",
    icon: Zap
  },
  {
    title: "Conversion-Focused SEO",
    desc: "Traffic is useless without conversions — we optimize web layouts for phone calls and inquiries.",
    icon: Target
  },
  {
    title: "Data-Backed Strategy",
    desc: "Every recommendation and strategy is backed by deep analytics, search volume, and intent insights.",
    icon: BarChart3
  },
  {
    title: "Local SEO Experts in Pune & PCMC",
    desc: "Decade of experience dominating Google Maps 3-Pack searches across Pune, PCMC, and surrounding hubs.",
    icon: MapPin
  },
  {
    title: "Digital Growth Specialists",
    desc: "We understand consumer psychology, search intent, and how to build scalable digital growth engines.",
    icon: ShieldCheck
  }
];

const toolsList = [
  "Google Analytics 4",
  "Google Search Console",
  "SEMrush / Ahrefs",
  "Screaming Frog SEO Spider",
  "Google Tag Manager",
  "PageSpeed Insights & Lighthouse"
];

const expectedResults = [
  "Increased organic search traffic",
  "Higher Google Maps & organic keyword rankings",
  "More verified leads and phone calls",
  "Significantly higher conversion rates",
  "Strong domain authority and brand credibility"
];

const faqs = [
  {
    q: "Why does my business need SEO?",
    a: "SEO helps your business get discovered by people who are already actively searching for your products and services on Google. This results in far higher trust, lower customer acquisition costs, and better conversion rates than cold ads."
  },
  {
    q: "How long does SEO take to show results?",
    a: "SEO typically shows measurable ranking improvements within 3 to 6 months, depending on competitive intensity in your micro-location and current website health. Local GMB 3-Pack optimizations often begin driving initial phone calls even sooner."
  },
  {
    q: "Do you provide local SEO for Pune and PCMC?",
    a: "Yes, we specialize in Local SEO and Google Business Profile optimization. We optimize your citations, categories, reviews, and geo-targeted landing pages so your business ranks at the very top of Google Maps and 'near me' local searches."
  },
  {
    q: "Is SEO better than paid ads?",
    a: "Both play vital roles. SEO builds long-term organic authority and continuous lead flow with zero per-click costs, while Paid Ads provide immediate visibility. We recommend a combined strategy for maximum ROI."
  },
  {
    q: "What makes Codigix Infotech different?",
    a: "We don't just stop at ranking keywords on page 1. We build complete, end-to-end customer acquisition systems — combining technical SEO, intent-driven content, Google Maps domination, and conversion rate optimization to generate verifiable revenue."
  },
  {
    q: "Do you provide monthly ranking & ROI reports?",
    a: "Yes, you receive transparent monthly performance reports detailing keyword ranking progress, Google Maps phone calls, verified website inquiries, organic traffic metrics, and next-month strategic action items."
  }
];

const allServices = [
  {
    id: "seo",
    name: "Search Engine Optimization",
    desc: "Dominate Google search results for your brand, products, and services.",
    icon: Search,
    badge: "Organic Search",
    href: "/best-seo-services-in-pcmc"
  },
  {
    id: "ppc",
    name: "Paid Advertisements (PPC)",
    desc: "Generate high-intent leads immediately with multi-channel ad campaigns.",
    icon: Zap,
    badge: "Instant Leads",
    href: "/paid-advertisements-ppc"
  },
  {
    id: "social",
    name: "Social Media Marketing",
    desc: "Engage customers with authentic reels, service explainers, and targeted social branding.",
    icon: Instagram,
    badge: "Viral Reach",
    href: "/social-media-marketing"
  },
  {
    id: "ecommerce",
    name: "E-Commerce Marketing",
    desc: "Drive high-converting sales, product rankings, and ROI for online stores.",
    icon: ShoppingCart,
    badge: "E-Commerce",
    href: "/ecommerce-marketing"
  },
  {
    id: "content",
    name: "Content Marketing",
    desc: "Build immense trust with educational blogs, buying guides, and industry authority copy.",
    icon: FileText,
    badge: "Authority",
    href: "/medical-content-marketing"
  },
  {
    id: "web",
    name: "Web Design & Development",
    desc: "Fast, mobile-first, and conversion-optimized websites engineered to turn visitors into paying customers.",
    icon: Code2,
    badge: "Conversion",
    href: "/web-design-development"
  }
];

const roadmapPhases = [
  {
    phase: "01",
    stepNum: 1,
    name: "Audit",
    time: "Wks 1–2",
    title: "Find & Fix All Website Errors",
    stage: "Audit & Fixes",
    timeline: "Weeks 1–2",
    icon: Search,
    deliverable: "Complete Website Health & Fix Report",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200",
    boxBg: "bg-blue-50/70 border-blue-200/90",
    points: [
      "Find hidden technical bugs stopping your Google ranking",
      "Analyze top competitors to uncover their best keywords",
      "Action plan to outrank local competitors in PCMC & Pune"
    ]
  },
  {
    phase: "02",
    stepNum: 2,
    name: "Keywords",
    time: "Wks 2–3",
    title: "Pick Keywords That Bring Customers",
    stage: "Keyword Research",
    timeline: "Weeks 2–3",
    icon: Target,
    deliverable: "Ready-to-Rank Buying Keywords List",
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200",
    boxBg: "bg-purple-50/70 border-purple-200/90",
    points: [
      "Find exact search words people use when ready to buy",
      "Target high-intent local areas (Baner, Wakad, Hinjewadi)",
      "Filter out useless traffic to focus on real sales inquiries"
    ]
  },
  {
    phase: "03",
    stepNum: 3,
    name: "On-Page",
    time: "Wks 3–5",
    title: "Turn Visitors Into Calls & Leads",
    stage: "Lead Optimization",
    timeline: "Weeks 3–5",
    icon: Layers,
    deliverable: "High-Converting Sales Web Pages",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    boxBg: "bg-emerald-50/70 border-emerald-200/90",
    points: [
      "Add direct WhatsApp and Call buttons for quick inquiries",
      "Write titles & headings so more searchers click your link",
      "Add verified business FAQs to rank higher on Google search"
    ]
  },
  {
    phase: "04",
    stepNum: 4,
    name: "Speed",
    time: "Wks 5–6",
    title: "Make Pages Open in Under 1 Second",
    stage: "Speed & Performance",
    timeline: "Weeks 5–6",
    icon: Zap,
    deliverable: "Under 1-Second Page Load Speed",
    badgeBg: "bg-amber-50 text-amber-600 border-amber-200",
    boxBg: "bg-amber-50/70 border-amber-200/90",
    points: [
      "Compress heavy images and code for lightning-fast loading",
      "Score 90+ on Google Mobile PageSpeed Insights",
      "Prevent customers from leaving due to a slow website"
    ]
  },
  {
    phase: "05",
    stepNum: 5,
    name: "Google Maps",
    time: "Wks 6–8",
    title: "Rank #1 on Google Maps for Nearby Buyers",
    stage: "Local Search",
    timeline: "Weeks 6–8",
    icon: MapPin,
    deliverable: "Top 3 Google Maps Placement & Reviews",
    badgeBg: "bg-rose-50 text-rose-600 border-rose-200",
    boxBg: "bg-rose-50/70 border-rose-200/90",
    points: [
      "Optimize Google Business Profile with correct local categories",
      "List your business in trusted Pune business directories",
      "Automated system to get more genuine 5-star customer reviews"
    ]
  },
  {
    phase: "06",
    stepNum: 6,
    name: "Authority",
    time: "Ongoing",
    title: "Build Trust & Keep Rankings on Top",
    stage: "Long-Term Growth",
    timeline: "Ongoing Growth",
    icon: Award,
    deliverable: "Monthly Backlinks & Traffic Growth",
    isFinal: true,
    badgeBg: "bg-cyan-50 text-cyan-600 border-cyan-200",
    boxBg: "bg-cyan-50/70 border-cyan-200/90",
    points: [
      "Get quality backlinks from popular, trusted websites",
      "Publish helpful guides that establish you as the #1 expert",
      "Get cited in AI search results (Google AI, ChatGPT)"
    ]
  }
];

export default function BestSeoServicesPage() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const [activePhase, setActivePhase] = useState(0);
  const [isPhasePaused, setIsPhasePaused] = useState(false);
  const phaseCardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calm Phase 6 Loop: cycle back from final milestone to Phase 1 gently
  useEffect(() => {
    if (activePhase === 5 && !isPhasePaused) {
      const timer = setTimeout(() => {
        setActivePhase(0);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [activePhase, isPhasePaused]);

  // Smooth calm scroll phase cards one by one when activePhase changes (NO SLIDER, NO SNAP CONFLICT)
  useEffect(() => {
    const container = phaseCardsContainerRef.current;
    const card = cardRefs.current[activePhase];
    if (container && card) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const currentScroll = container.scrollLeft;
      const cardCenter = cardRect.left + cardRect.width / 2;
      const containerCenter = containerRect.left + containerRect.width / 2;
      const targetScroll = currentScroll + (cardCenter - containerCenter);

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }, [activePhase]);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* 1. HERO SECTION: Premium High-Conversion Light Luxury Centered Layout */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-[#f8fafe] via-white to-[#f4f7fc] overflow-hidden border-b border-slate-200/80">

        {/* Subtle Decorative Geometry & Background Elements */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#1a1053 1px, transparent 1px), linear-gradient(90deg, #1a1053 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[#e20b27]/8 rounded-full blur-[140px] pointer-events-none" />

        {/* Floating Animated Result Badges */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden  mx-auto">
          {/* Top Left */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, -15px) rotate(-1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[2%] xl:left-[8%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <MapPin size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Local SEO</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">#1 on Maps 3-Pack</p>
            </div>
          </motion.div>

          {/* Bottom Left */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, 15px) rotate(1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[35%] left-[5%] xl:left-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <PhoneCall size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Conversions</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">+340% Inbound Inquiries</p>
            </div>
          </motion.div>

          {/* Top Right */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, 15px) rotate(1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[22%] right-[2%] xl:right-[8%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-[#f8fafe] text-[#1a1053] flex items-center justify-center shrink-0 border border-slate-200">
              <Search size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Organic</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">Page 1 Rankings</p>
            </div>
          </motion.div>

          {/* Bottom Right */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, -15px) rotate(-1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[38%] right-[5%] xl:right-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-rose-50 text-[#e20b27] flex items-center justify-center shrink-0 border border-rose-100">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Growth</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">High-Intent Traffic</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 lg:px-8   relative z-10 text-center flex flex-col items-center"
        >

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm mb-7">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e20b27] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e20b27]"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#1a1053] tracking-wide">
              Pune's #1 Digital Growth & SEO Experts
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#1a1053] tracking-tight leading-[1.1] mb-6 max-w-4xl">
            Be the First Business Customers <br className="hidden lg:block" /> Find on Google.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] mt-3">
              More Visibility. More Growth.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            In today’s digital world, customers search online before making a purchase or booking a service. Codigix Infotech’s Advanced SEO services ensure your business appears at the very top of Google search results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-20">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1053] hover:bg-[#281878] text-white rounded-full font-semibold text-base transition-all shadow-[0_10px_25px_-5px_rgba(26,16,83,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(26,16,83,0.35)] transform hover:-translate-y-0.5"
            >
              <span>Get a Free SEO Audit</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href="#what-we-do"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-[#1a1053] rounded-full font-semibold text-base shadow-xs transition-all"
            >
              <span>Explore Deliverables</span>
              <ChevronDown size={18} />
            </a>
          </div>

        </motion.div>
      </section>

      {/* 2. WHAT WE DO: High-End Symmetrical Grid */}
      <section id="what-we-do" className="py-20 lg:py-28 bg-[#f8fafe] relative overflow-hidden">

        {/* Decorative ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className=" mx-auto px-4 lg:px-8  relative z-10 max-w-7xl">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs text-xs font-bold text-blue-700 tracking-wide mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Our Execution Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] leading-[1.15] tracking-tight mb-4">
              Comprehensive <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Business SEO & Growth Services
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Engineered for Pune and PCMC enterprises, local businesses, and modern brands looking to dominate organic search and attract high-converting buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {whatWeDoList.map((item, idx) => (
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
                      <item.icon size={24} strokeWidth={1.75} />
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
            ))}
          </div>

        </div>
      </section>

      {/* 2.5 THE 4 PILLARS OF MODERN SEARCH: DIGITAL MARKETING AGENCY GROWTH MATRIX */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#f8faff] via-[#ffffff] to-[#f4f7fc] relative border-b border-slate-200/80 overflow-hidden">

        {/* Ambient subtle brand glows */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#e20b27]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, transform: "translate(0px, 30px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className=" mx-auto px-4 lg:px-8  relative z-10 max-w-7xl"
        >
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs text-xs font-bold text-blue-700 tracking-wide mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>360° Omnichannel Search Strategy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] leading-[1.15] tracking-tight mb-4">
              Capturing Inbound Demand Across <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                The 4 Pillars of Search: SEO, GEO, GMB & AEO
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
              Modern buyers don’t search in just one place. We position your brand across every touchpoint—traditional Google SERPs, AI Overviews, local Google Maps 3-Packs, and instant voice answers.
            </p>
          </div>

          {/* Agency Multi-Channel Matrix Chassis (Asymmetrical 2-Row Growth Pipeline) */}
          <div className="rounded-[36px] bg-white/90 backdrop-blur-xl border border-slate-200 shadow-[0_20px_60px_rgba(26,16,83,0.06)] p-6 sm:p-8 lg:p-10">

            {/* Top Agency Status Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2 font-semibold text-[#1a1053]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="tracking-wide uppercase text-[11px]">Omnichannel Search Engine Framework</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-100 font-medium text-slate-600 text-[11px]">
                  Coverage: PCMC & Pune Metro
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200">
                  100% Demand Capture
                </span>
              </div>
            </div>

            {/* Asymmetrical 2-Row Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

              {/* 1. SEO: The Organic Traffic & Keyword Authority Engine (7 COLS) */}
              <motion.div
                initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
                whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-slate-50/80 via-white to-blue-50/20 border border-slate-200/90 hover:border-blue-400 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-700 font-bold text-[10px] tracking-wider uppercase">
                          Channel 01 • Organic Search
                        </span>
                        <span className="text-slate-400 text-xs font-mono">• Google SERP Dominance</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1053] tracking-tight">
                        High-Volume Organic SEO
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                      <Search size={22} strokeWidth={2.2} />
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    Target high-intent transactional search terms that convert prospects into buyers. We optimize site architecture, build authoritative backlinks, and secure top-3 organic Google rankings.
                  </p>

                  {/* Interactive SERP Simulator & Live Traffic Chart Widget */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm mb-5">
                    {/* SERP Preview (7 Cols) */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100 text-[11px] text-slate-500 font-mono">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="truncate">google.com/search?q=best+services+in+pcmc</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                          <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">G</span>
                          <span className="font-mono text-[10px] text-slate-400">yourbrand.com › pcmc</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold text-[9px] border border-emerald-200">
                            Rank #1
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-blue-700 leading-snug hover:underline cursor-pointer mb-1">
                          Top-Ranked Enterprise Services in PCMC | #1 Inbound Partner
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          Capturing top search market share across PCMC & Pune with validated business deliverables and proven conversion funnels.
                        </p>
                      </div>
                    </div>

                    {/* Animated SVG Traffic Growth Chart (5 Cols) */}
                    <div className="md:col-span-5 bg-gradient-to-br from-blue-50/70 to-indigo-50/40 rounded-xl p-3 border border-blue-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Organic Visits</span>
                        <span className="text-xs font-extrabold text-blue-600">+340%</span>
                      </div>

                      {/* SVG Mini Chart with Animated Line */}
                      <div className="relative h-14 w-full my-1">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 120 40">
                          <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 35 Q 30 32, 50 24 T 90 14 T 120 4 L 120 40 L 0 40 Z"
                            fill="url(#chartGradient)"
                          />
                          <path
                            d="M 0 35 Q 30 32, 50 24 T 90 14 T 120 4"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          <circle cx="120" cy="4" r="3.5" fill="#2563eb" className="animate-ping" />
                          <circle cx="120" cy="4" r="3" fill="#2563eb" />
                        </svg>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-blue-200/50">
                        <span>Month 1: 2.1k</span>
                        <span className="font-bold text-[#1a1053]">Month 6: 12.8k</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Marketing Deliverables */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[11px]">
                      Commercial Keywords
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[11px]">
                      High-DA Link Building
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[11px]">
                      Technical Speed (99+)
                    </span>
                  </div>
                  <span className="font-bold text-blue-700 text-xs">
                    Dominates Google Page #1
                  </span>
                </div>
              </motion.div>

              {/* 2. GMB: Local 3-Pack & Instant Phone Calls (5 COLS) */}
              <motion.div
                initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
                whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-emerald-50/20 via-white to-slate-50/80 border border-slate-200/90 hover:border-emerald-400 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-[10px] tracking-wider uppercase">
                          Channel 02 • Local Lead Gen
                        </span>
                        <span className="text-slate-400 text-xs font-mono">• Google 3-Pack</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1053] tracking-tight">
                        Google Maps & GMB
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                      <MapPin size={22} strokeWidth={2.2} />
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    Capture nearby customers searching "near me" across PCMC and Pune. Directly drives high-intent phone inquiries, store visits, and quotation requests.
                  </p>

                  {/* Google Maps Business Profile Interactive Simulation */}
                  <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm mb-5">
                    <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                      <div>
                        <h4 className="text-sm font-bold text-[#1a1053] flex items-center gap-1.5">
                          Your Business Listing <span className="text-blue-500 font-bold">✓</span>
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-0.5">
                          <span>4.9</span>
                          <div className="flex text-amber-400 text-[11px]">★★★★★</div>
                          <span className="text-slate-400 font-normal text-[11px]">(185+ Google Reviews)</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                        Top 3 Ranked
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mb-3">
                      📍 PCMC Coverage: Wakad, Hinjawadi, Chinchwad, Pimpri, Bhosari
                    </p>

                    {/* 3 High-Conversion Direct Action Buttons */}
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="py-2 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-center text-[11px] font-bold flex items-center justify-center gap-1 shadow-sm transition-transform hover:scale-105 cursor-pointer">
                        <PhoneCall size={12} /> Call Now
                      </div>
                      <div className="py-2 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-center text-[11px] font-semibold flex items-center justify-center gap-1 transition-transform hover:scale-105 cursor-pointer">
                        <MapPin size={12} /> Directions
                      </div>
                      <div className="py-2 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-center text-[11px] font-semibold flex items-center justify-center gap-1 transition-transform hover:scale-105 cursor-pointer">
                        <Globe size={12} /> Website
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Marketing Deliverables */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium">Near Me • Citations • Geofencing</span>
                  <span className="font-bold text-emerald-600 text-xs">3.4x More Phone Inquiries</span>
                </div>
              </motion.div>

              {/* 3. GEO: Google AI Overviews & Generative Search (5 COLS) */}
              <motion.div
                initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
                whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-indigo-50/20 via-white to-purple-50/20 border border-slate-200/90 hover:border-indigo-400 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-[10px] tracking-wider uppercase">
                          Channel 03 • Next-Gen Search
                        </span>
                        <span className="text-slate-400 text-xs font-mono">• AI Overviews</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1053] tracking-tight">
                        GEO (AI Overviews)
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
                      <Sparkles size={22} strokeWidth={2.2} />
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    When buyers ask Google AI Overviews, Gemini, or Perplexity for trusted providers, we structure your brand’s digital footprint so you are the primary recommended authority.
                  </p>

                  {/* Google AI Overview Style Card */}
                  <div className="rounded-2xl bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 border border-indigo-200/80 p-4 shadow-sm mb-5">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-indigo-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                        <Sparkles size={14} className="text-indigo-600" />
                        <span>Google AI Overview</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-semibold">
                        Grounded Citation
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed mb-3">
                      "For top-rated marketing and business growth solutions in PCMC, <strong className="text-indigo-900 font-bold underline decoration-indigo-400">[Your Business]</strong> is highlighted for validated client ROI and verified local presence..."
                    </p>

                    {/* Official-Style Source Link Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="text-slate-400 font-mono">Sources:</span>
                      <span className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                        🔗 Official Brand Page
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                        🔗 Verified Client Reviews
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Marketing Deliverables */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium">Google SGE • Entity Citations</span>
                  <span className="font-bold text-indigo-700 text-xs">Primary Brand Recommendation</span>
                </div>
              </motion.div>

              {/* 4. AEO: Position Zero & Instant Voice Answers (7 COLS) */}
              <motion.div
                initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
                whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-cyan-50/20 via-white to-slate-50/80 border border-slate-200/90 hover:border-cyan-400 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-lg bg-cyan-100 text-cyan-800 font-bold text-[10px] tracking-wider uppercase">
                          Channel 04 • Zero-Click Answers
                        </span>
                        <span className="text-slate-400 text-xs font-mono">• Featured Snippet & Voice</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1053] tracking-tight">
                        AEO (Position Zero & Voice)
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-md shadow-cyan-500/20 shrink-0">
                      <Zap size={22} strokeWidth={2.2} />
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    Claim Google’s coveted Position Zero featured answer box and provide instant responses to voice assistant queries (Siri, Alexa, Google Assistant) using validated Schema JSON-LD.
                  </p>

                  {/* Google Featured Snippet & Voice Waveform Widget */}
                  <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm mb-5">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs">
                      <span className="font-bold text-cyan-900 bg-cyan-50 px-2.5 py-0.5 rounded-lg border border-cyan-200">
                        Featured Snippet from the Web
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        Google Position 0
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 mb-3 text-xs">
                      <p className="font-bold text-[#1a1053] mb-1">
                        Q: How do PCMC businesses generate consistent high-value client inquiries?
                      </p>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        "By integrating commercial keyword SEO, verified Google Maps 3-Pack authority, and structured Schema rich snippets to capture 100% of local organic buyer intent."
                      </p>
                    </div>

                    {/* Animated Voice Equalizer Frequency Bars */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="flex items-end gap-1 h-4">
                          <span className="w-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:0ms] h-2.5" />
                          <span className="w-1 bg-cyan-600 rounded-full animate-bounce [animation-delay:150ms] h-4" />
                          <span className="w-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:300ms] h-2" />
                          <span className="w-1 bg-cyan-600 rounded-full animate-bounce [animation-delay:100ms] h-3.5" />
                          <span className="w-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:250ms] h-2" />
                        </div>
                        <span className="text-[11px] text-slate-600 font-medium">
                          Voice Assistant Ready (Siri / Alexa / Google)
                        </span>
                      </div>
                      <span className="text-cyan-700 font-bold text-[11px]">
                        Zero-Click Instant Authority
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Marketing Deliverables */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[11px]">
                      FAQ Schema Markup
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[11px]">
                      Rich Snippet Badges
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[11px]">
                      Voice Search Optimization
                    </span>
                  </div>
                  <span className="font-bold text-cyan-700 text-xs">
                    Position Zero Dominance
                  </span>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. NOT JUST SEO — A COMPLETE REVENUE GROWTH SYSTEM (COMPACT AGENCY EDITION) */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-[#f8faff] via-[#ffffff] to-[#f4f7fc] relative border-b border-slate-200/80 overflow-hidden">

        {/* Ambient subtle brand glows */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#e20b27]/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className=" mx-auto px-4 lg:px-8  relative z-10 max-w-7xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

            {/* Left Column: Strategic Growth Framework (7 COLS) */}
            <div className="lg:col-span-7 flex flex-col">

              {/* Strategic Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-blue-700 tracking-wider uppercase w-fit mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Strategic Differentiation • Revenue-First SEO</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1053] leading-tight tracking-tight mb-3">
                Not Just Keyword Rankings — <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                  A Complete Inbound Revenue Engine
                </span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed mb-6 max-w-2xl">
                Typical agencies celebrate vanity rankings for terms nobody searches. At Codigix, we engineer high-converting acquisition funnels designed to deliver <strong className="text-[#1a1053] font-semibold">qualified inquiries, direct phone calls, and closed deals.</strong>
              </p>

              {/* 3 Streamlined Growth Nodes */}
              <div className="space-y-2.5 mb-4">

                {/* Node 01 */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-sm transition-all duration-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 font-mono text-xs font-extrabold">
                    01
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-[#1a1053] tracking-tight">
                        Commercial Buyer Intent Targeting
                      </h3>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200/80 w-fit">
                        Zero Vanity Keywords
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                      Target decision-makers actively searching for service providers, pricing, and quotes in PCMC & Pune.
                    </p>
                  </div>
                </div>

                {/* Node 02 */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/80 hover:border-rose-300 shadow-2xs hover:shadow-sm transition-all duration-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 text-[#e20b27] border border-rose-200 flex items-center justify-center shrink-0 font-mono text-xs font-extrabold">
                    02
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-[#1a1053] tracking-tight">
                        Frictionless Conversion Architecture (CRO)
                      </h3>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold border border-rose-200/80 w-fit">
                        3.4x Conversion Lift
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                      Landing layouts and 1-tap call triggers engineered to turn organic traffic into immediate inquiries.
                    </p>
                  </div>
                </div>

                {/* Node 03 */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/80 hover:border-emerald-300 shadow-2xs hover:shadow-sm transition-all duration-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 font-mono text-xs font-extrabold">
                    03
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-[#1a1053] tracking-tight">
                        Direct Revenue & Pipeline Attribution
                      </h3>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/80 w-fit">
                        100% Trackable ROI
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                      Real-time analytics tracking actual business outcomes: qualified phone calls and customer revenue.
                    </p>
                  </div>
                </div>

              </div>

              {/* Compact Trust Endorsement */}
              <div className="px-4 py-3 mt-2 rounded-lg bg-slate-50 border-l-4 border-[#e20b27] text-sm font-light text-slate-600 leading-relaxed">
                "Engineered for businesses across PCMC & Pune who demand real client revenue over superficial metrics."
              </div>

            </div>

            {/* Right Column: Compact Marketing Performance Hub (5 COLS) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-[0_12px_35px_rgba(26,16,83,0.06)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden h-full">

                <div>
                  {/* Top Status Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xs">
                        <Activity size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-[#1a1053] text-base leading-tight">Codigix Growth Index</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Verified Campaign Telemetry</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Live ROI
                    </span>
                  </div>

                  {/* Standard Agency vs Codigix Comparison */}
                  <div className="grid grid-cols-2 gap-3 mb-5 p-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <div className="p-2.5 rounded-lg bg-white text-slate-500 text-center border border-slate-200/50">
                      <span className="block font-bold text-rose-600 mb-0.5">Other Agencies</span>
                      <span className="text-[11px]">Vanity Rankings ❌</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-center border border-emerald-200 font-semibold">
                      <span className="block font-bold text-emerald-700 mb-0.5">Codigix SEO</span>
                      <span className="text-[11px]">Paying Clients ✓</span>
                    </div>
                  </div>

                  {/* 3 High-Impact KPI Performance Blocks */}
                  <div className="space-y-3 mb-5">

                    {/* Metric 01 */}
                    <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-semibold text-slate-700">Average Inbound Inquiries</span>
                        <span className="text-sm font-black text-emerald-600 font-mono">+340%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div className="w-[85%] h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Measured in first 90 days</span>
                        <span className="text-slate-600 font-medium">Verified Calls & Leads</span>
                      </div>
                    </div>

                    {/* Metric 02 */}
                    <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-semibold text-slate-700">Google Maps 3-Pack Visibility</span>
                        <span className="text-sm font-black text-blue-600 font-mono">Rank #1</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div className="w-[92%] h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Across 5km local radius</span>
                        <span className="text-slate-600 font-medium">High-Intent Calls</span>
                      </div>
                    </div>

                    {/* Metric 03 */}
                    <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-semibold text-slate-700">Cost Per Acquisition (CPA)</span>
                        <span className="text-sm font-black text-amber-600 font-mono">-70% vs Ads</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div className="w-[75%] h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Compounding organic asset</span>
                        <span className="text-slate-600 font-medium">Permanent ROI</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Compact CTA Button */}
                <div>
                  <Link
                    href="/contact"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] hover:from-blue-500 hover:to-[#ff1f3d] text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>Schedule Free Strategy Session</span>
                    <ArrowRight size={14} />
                  </Link>

                  {/* Micro Trust Proof */}
                  <div className="flex items-center justify-center gap-2 mt-2 text-[9px] text-slate-400">
                    <span>✓ Free 30-Min Call</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>✓ Custom PCMC Audit</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>✓ No Obligation</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* MASTER SECTION 1: SEARCH DELIVERABLES & 6-PHASE EXECUTION ROADMAP (CONSOLIDATED) */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-200/80 relative overflow-hidden">

        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className=" mx-auto px-4 lg:px-8  relative z-10 max-w-7xl"
        >
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs text-xs font-bold text-blue-700 tracking-wide mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Tangible Deliverables & Proven Strategy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] leading-[1.15] tracking-tight mb-4">
              What You Get & How We Execute : <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                The 6-Phase Growth Roadmap
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Every deliverable is engineered to create a permanent customer acquisition asset, transforming search traffic into verified phone inquiries and closed deals.
            </p>
          </div>

          {/* Top 4 Core Deliverables Ribbon (Sleek Compact Highlights) */}
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {whatYouGetCards.map((card, i) => {
              const IconComp = card.icon;
              return (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-xs transition-all duration-300 flex items-center gap-3 group"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105 ${card.bg}`}>
                    <IconComp size={16} className="text-[#1a1053]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13px] min-[480px]:text-xs font-bold text-[#1a1053] leading-snug min-[480px]:truncate">
                      {card.title}
                    </h3>
                    <p className="text-xs min-[480px]:text-[11px] text-slate-500 font-light min-[480px]:truncate">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ultra-Minimalist Process Stepper Timeline */}
          <div
            onMouseEnter={() => setIsPhasePaused(true)}
            onMouseLeave={() => setIsPhasePaused(false)}
            className="mb-8 w-full px-1"
          >
            <style>{`
              @keyframes segmentProgress {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}</style>

            <div className="flex items-start justify-between w-full">
              {roadmapPhases.map((stage, sIdx, arr) => {
                const isPast = sIdx < activePhase;
                const isActive = sIdx === activePhase;

                return (
                  <React.Fragment key={stage.phase}>
                    {/* Minimalist Step Node Button */}
                    <button
                      type="button"
                      onClick={() => setActivePhase(sIdx)}
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
                              animation: 'segmentProgress 5.5s linear forwards',
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

          {/* Smoothly Auto-Scrolled Phase Cards (One-By-One Centered Sync, No Slider) */}
          <div className="relative">

            {/* Left and Right Edge Gradient Fade Masks (Prevents Harsh Text Clipping) */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

            {/* Smooth Horizontal Scroll Track (NO SLIDER, NO SNAP CONFLICT, DYNAMIC CENTERED PADDING) */}
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
              {roadmapPhases.map((step, idx) => {
                const PhaseIcon = step.icon;
                const isActiveCard = idx === activePhase;

                return (
                  <div
                    key={step.phase}
                    ref={(el) => { cardRefs.current[idx] = el; }}
                    onClick={() => setActivePhase(idx)}
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
                      {/* Compact Single Header: Step Squircle + Phase Meta + Active Pill */}
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

                      {/* Clear, Simple Title */}
                      <h3 className={`text-base sm:text-lg font-bold mb-3 leading-snug tracking-tight transition-colors ${isActiveCard ? 'text-[#1a1053]' : 'text-slate-700'
                        }`}>
                        {step.title}
                      </h3>

                      {/* Deliverables Checklist: Simple, Plain English */}
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

                    {/* What You Get Deliverable Box (Compact & High Clarity) */}
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
        </motion.div>
      </section>

      {/* MASTER SECTION 2: CLIENT SUCCESS, INDUSTRY PROOF & TECH STACK (CONSOLIDATED) */}
      <section className="py-14 lg:py-20 bg-gradient-to-b from-[#f8faff] via-white to-slate-50 relative border-b border-slate-200/80 overflow-hidden">

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
              <span>Proven Track Record & Client Success</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] leading-[1.15] tracking-tight mb-4">
              Why Businesses Across PCMC & Pune <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Partner With Codigix Infotech
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Delivering verified business growth, high-ticket leads, and top-3 Google rankings across enterprise B2B, healthcare clinics, local services, and retail brands.
            </p>
          </motion.div>

          {/* Split Layout: Why Us (4 Cols Sticky) vs Multi-Industry Client Showcase (8 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">

            {/* Left Column: Why Choose Codigix Strategic Advantages (4 Cols - Sticky) */}
            <motion.div
              initial={{ opacity: 0, transform: "translate(-20px, 0px)" }}
              whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 flex flex-col gap-3.5 lg:sticky lg:top-24"
            >
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
                <h3 className="text-base font-extrabold text-[#1a1053] mb-1">
                  The Codigix Strategic Advantage
                </h3>
                <p className="text-xs text-slate-500 font-light mb-4">
                  We blend technical search mastery with deep local consumer psychology across Pune & PCMC.
                </p>

                <div className="space-y-2.5">
                  {whyChoosePoints.slice(0, 4).map((item, idx) => {
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
                          <h4 className="text-xs font-bold text-[#1a1053] group-hover:text-blue-700 transition-colors">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 font-light leading-snug">{item.desc}</p>
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
                  <span>100% White-Hat Google ROI Guarantee</span>
                </div>
                "Engineered specifically for manufacturers, growing enterprises, healthcare providers, and local services in Pune & PCMC who demand real business revenue over superficial metrics."
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
                {(() => {
                  const clientShowcaseList = [
                    {
                      name: "Dr. Sheetal's Glow Clinic",
                      tag: "Healthcare & Dermatology",
                      tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
                      avatarBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
                      logo: "/clients/sheetals-glow.png",
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
                      logo: "/clients/corplegal.png",
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
                      logo: "/clients/regain.png",
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
                      logo: "/clients/bakul.png",
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
                      logo: "/clients/canopy.png",
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
                      logo: "/clients/sanskruti-agro-farm.jpg",
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

                  const col1 = clientShowcaseList.slice(0, 3);
                  const col2 = clientShowcaseList.slice(3, 6);

                  const renderCard = (client: any, key: string) => {
                    const ClientIcon = client.icon;
                    return (
                      <div
                        key={key}
                        className="rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer shrink-0"
                      >
                        {/* Visual Photography Header with Big, Full Image */}
                        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                          <img
                            src={client.coverImage}
                            alt={client.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          {/* Soft gradient to keep photo bright & readable */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                          {/* Top Bar on Image: Category Badge + Active Duration */}
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

                          {/* Bottom on Image: Growth Highlight Pill */}
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
                            {/* Client Identity: Real Logo & Name */}
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

                            {/* Visual Google Search & SEO Ranking Snippet with Sparkline */}
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
                              {/* Sparkline Indicator */}
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
                    <>
                      {/* Desktop & Tablet Dual-Column Scrolling Marquee */}
                      <div className="hidden sm:grid sm:grid-cols-2 gap-4 h-full">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-4 animate-scroll-vertical-1">
                          {[...col1, ...col1].map((client, i) => renderCard(client, `col1-${i}`))}
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-4 animate-scroll-vertical-2">
                          {[...col2, ...col2].map((client, i) => renderCard(client, `col2-${i}`))}
                        </div>
                      </div>

                      {/* Mobile Single-Column Scrolling Marquee */}
                      <div className="sm:hidden flex flex-col gap-4 animate-scroll-vertical-mobile">
                        {[...clientShowcaseList, ...clientShowcaseList].map((client, i) => renderCard(client, `mob-${i}`))}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

          </div>

          {/* Consolidated Enterprise Tech Stack & Measurable Outcomes Banner */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left: Enterprise Tools (6 Cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1a1053]">Enterprise Tech Stack We Deploy</h3>
                    <p className="text-[11px] text-slate-500">Industry-standard auditing and analytics infrastructure</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                  {[
                    "Google Analytics 4",
                    "Search Console",
                    "Ahrefs & SEMrush",
                    "Screaming Frog",
                    "Google Tag Manager",
                    "Lighthouse 99+"
                  ].map((tool, i) => (
                    <div key={i} className="py-2 px-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-center text-[11px] font-semibold text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 transition-colors">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Guaranteed Business Outcomes (6 Cols) */}
              <div className="lg:col-span-6 lg:pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1a1053]">Measurable Business Outcomes</h3>
                    <p className="text-[11px] text-slate-500">Actual ROI metrics delivered to your pipeline</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    "Over +340% average increase in organic search traffic within 90 days",
                    "Dominant Google Maps 3-Pack rankings for local 'near me' queries",
                    "Verified high-ticket client inquiries, phone calls & quotation forms",
                    "Lower Cost-Per-Acquisition (CPA) compared to paid search campaigns"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-light text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 9. FAQ GRID (RESPONSIVE 2-COLUMN GRID) */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8  ">

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs text-xs font-bold text-blue-700 tracking-wide mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] leading-[1.15] tracking-tight mb-4">
              FAQ : <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Frequently Asked Questions</span>
            </h2>
            <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Clear answers to the most common questions business owners and marketing leaders in PCMC & Pune ask about our SEO services.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-start">
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

        </div>
      </section>




    </div>
  );
}
