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
    title: "Local profile & listing accuracy for Pune/PCMC",
    desc: "Accurate location, hours, departments, and service details across your locality (Kothrud, Baner, Wakad, Pimpri, Chinchwad, Hinjewadi) so people can find correct information.",
    icon: MapPin,
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    num: "02",
    title: "On-page & structural SEO optimization",
    desc: "Comprehensive metadata, semantic HTML hierarchy, and internal linking architecture, with no link schemes or purchased backlinks.",
    icon: Layers,
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    num: "03",
    title: "Google Business Profile management",
    desc: "Accurate management of business listing details (location, hours, departments, services), regular factual updates, and consistent citations, without ranking manipulation.",
    icon: Globe,
    color: "from-purple-600 to-fuchsia-600",
    bg: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    num: "04",
    title: "Informational keyword research",
    desc: "Research into the queries people use to find accurate information about your services, departments, and facilities.",
    icon: Search,
    color: "from-rose-600 to-red-600",
    bg: "bg-rose-50 text-rose-600 border-rose-200"
  },
  {
    num: "05",
    title: "Technical SEO & website speed optimization",
    desc: "Core Web Vitals tuning, mobile responsiveness, schema structured data, and crawl and index health.",
    icon: Cpu,
    color: "from-amber-600 to-orange-600",
    bg: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    num: "06",
    title: "Monthly technical reporting",
    desc: "Transparent monthly reporting on crawl and index status, site performance, listing accuracy, and website visits.",
    icon: BarChart3,
    color: "from-cyan-600 to-blue-600",
    bg: "bg-cyan-50 text-cyan-600 border-cyan-200"
  }
];

const whatYouGetCards = [
  {
    icon: Target,
    title: "Accurate, Findable Information",
    desc: "Clear site structure and accurate metadata that help people find correct information about your services.",
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50/80 border-blue-200/70"
  },
  {
    icon: PhoneCall,
    title: "Accurate Contact & Listing Details",
    desc: "Consistent phone numbers, addresses, and hours across your website and business listings.",
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50/80 border-emerald-200/70"
  },
  {
    icon: MapPin,
    title: "Local Profile Accuracy",
    desc: "Accurate Google Business Profile details for Pune & PCMC, with no ranking manipulation or guaranteed positions.",
    color: "from-purple-600 to-pink-600",
    bg: "bg-purple-50/80 border-purple-200/70"
  },
  {
    icon: TrendingUp,
    title: "Sound Technical Foundation",
    desc: "A technically healthy site that is easy to maintain and to build on over time.",
    color: "from-rose-600 to-amber-600",
    bg: "bg-rose-50/80 border-rose-200/70"
  }
];

const seoProcessSteps = [
  {
    step: "01",
    title: "Website Audit & Research",
    points: ["Complete technical audit", "Existing content review", "Keyword gap identification"]
  },
  {
    step: "02",
    title: "Keyword Research (Informational)",
    points: ["Informational keywords", "Local keywords", "Service and department terms"]
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
    title: "Local Profile Management",
    points: ["Google Business Profile setup & accuracy review", "Consistent local citations", "Factual profile updates"]
  },
  {
    step: "06",
    title: "Content Architecture",
    points: ["Informational articles & topic clusters", "Service/department page structure", "Source-referenced content"]
  },
  {
    step: "07",
    title: "Reporting & Review",
    points: ["Crawl and index status", "Listing accuracy review", "Monthly summary of work delivered"]
  }
];

const clientShowcase = [
  {
    name: "Dr. Sheetal's Glow Clinic",
    tag: "Healthcare & Dermatology (NMC scope)",
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
    tag: "Corporate Law & B2B (Non-medical)",
    location: "Bavdhan, Pune",
    duration: "Ongoing engagement",
    services: "Web development, content writing, technical SEO",
    result: "Structured Web Content",
    highlight: "Technical SEO hygiene"
  },
  {
    name: "Bakul Hospitality & Catering",
    tag: "Hospitality & Events (Non-medical)",
    location: "Pune Metro",
    duration: "Ongoing engagement",
    services: "Web pages, accurate local listings",
    result: "Responsive Website Refresh",
    highlight: "Clear service pages"
  }
];

const whyChoosePoints = [
  {
    title: "Engineering-Led Approach",
    desc: "We focus on technical health, accurate information, and clear site structure, not on promises of rankings.",
    icon: Zap
  },
  {
    title: "Clear Site Architecture",
    desc: "We structure pages, navigation, and metadata so information is easy for people and search engines to understand.",
    icon: Target
  },
  {
    title: "Documented Process",
    desc: "Every recommendation is documented and explained, based on analytics, search data, and platform guidelines.",
    icon: BarChart3
  },
  {
    title: "Local Presence in Pune & PCMC",
    desc: "A Pune-based team familiar with the local areas across Pune, PCMC, and surrounding hubs.",
    icon: MapPin
  },
  {
    title: "Ethical Search Practices",
    desc: "No ranking manipulation, purchased links, fake reviews, or guaranteed position claims.",
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
  "A technically healthy, crawlable website",
  "Accurate metadata and structured data",
  "Consistent business listing details",
  "Clear information architecture",
  "Transparent monthly reporting"
];

const faqs = [
  {
    q: "Why does my organization need SEO?",
    a: "SEO helps people who are searching on Google find accurate information about your organization, its services, and its locations. It focuses on site structure, metadata, and content clarity."
  },
  {
    q: "How long does SEO take to show results?",
    a: "Search visibility changes gradually and depends on competition, site health, and search engine decisions. We do not promise or guarantee any specific timeline, ranking, or position."
  },
  {
    q: "Do you provide local profile management for Pune and PCMC?",
    a: "Yes. We manage the accuracy of your Google Business Profile and local listings, including location, hours, departments, services, and factual information, without ranking manipulation."
  },
  {
    q: "Is SEO better than paid campaigns?",
    a: "They serve different purposes. SEO builds technical and informational foundations over time, while paid campaigns, which we run in a policy-compliant way, can share information in the shorter term. We can recommend a combination based on your goals."
  },
  {
    q: "What makes Codigix Infotech different?",
    a: "We combine technical SEO, structured data, accurate listings, and content architecture, with a pre-publication review for factual accuracy, credential disclosures, privacy, and AI labelling for healthcare engagements."
  },
  {
    q: "Do you provide monthly reports?",
    a: "Yes, you receive transparent monthly reports covering crawl and index status, site performance, listing accuracy, website visits, and next-month action items. We do not guarantee ranking positions."
  }
];

const allServices = [
  {
    id: "seo",
    name: "SEO & Local Profile Management",
    desc: "Technical site optimization, structured metadata, and accurate listing details.",
    icon: Search,
    badge: "Organic Search",
    href: "/best-seo-services-in-pcmc"
  },
  {
    id: "ppc",
    name: "Paid Digital Campaigns",
    desc: "Policy-compliant search and social campaigns with clear, truthful messaging.",
    icon: Zap,
    badge: "Policy-Compliant",
    href: "/paid-advertisements-ppc"
  },
  {
    id: "social",
    name: "Social Media & Educational Video",
    desc: "Public-health awareness, institutional updates, and clear educational explanations.",
    icon: Instagram,
    badge: "Educational",
    href: "/social-media-marketing"
  },
  {
    id: "ecommerce",
    name: "Commercial & E-Commerce Solutions",
    desc: "Catalog architecture and storefront performance for non-regulated retail businesses.",
    icon: ShoppingCart,
    badge: "Retail Commerce",
    href: "/ecommerce-marketing"
  },
  {
    id: "content",
    name: "Health & Institutional Content",
    desc: "Well-organized informational pages, department guides, and public-health articles.",
    icon: FileText,
    badge: "Content Architecture",
    href: "/medical-content-marketing"
  },
  {
    id: "web",
    name: "Web Design & Development",
    desc: "Responsive, accessible, and security-conscious websites with clear privacy controls.",
    icon: Code2,
    badge: "Web Engineering",
    href: "/web-design-development"
  }
];

const roadmapPhases = [
  {
    phase: "01",
    stepNum: 1,
    name: "Audit",
    time: "Wks 1–2",
    title: "Find & Fix Website Errors",
    stage: "Audit & Fixes",
    timeline: "Weeks 1–2",
    icon: Search,
    deliverable: "Website Health & Fix Report",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200",
    boxBg: "bg-blue-50/70 border-blue-200/90",
    points: [
      "Identify technical issues affecting crawling and indexing",
      "Review existing content and metadata for accuracy",
      "Prioritized action plan for site improvements"
    ]
  },
  {
    phase: "02",
    stepNum: 2,
    name: "Keywords",
    time: "Wks 2–3",
    title: "Research Informational Keywords",
    stage: "Keyword Research",
    timeline: "Weeks 2–3",
    icon: Target,
    deliverable: "Informational Keyword & Topic List",
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200",
    boxBg: "bg-purple-50/70 border-purple-200/90",
    points: [
      "Find the words people use to look for accurate information",
      "Map local areas (Baner, Wakad, Hinjewadi) to relevant pages",
      "Filter out irrelevant or misleading terms"
    ]
  },
  {
    phase: "03",
    stepNum: 3,
    name: "On-Page",
    time: "Wks 3–5",
    title: "Clarify Titles, Headings & Content",
    stage: "On-Page Structure",
    timeline: "Weeks 3–5",
    icon: Layers,
    deliverable: "Well-Structured Informational Web Pages",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    boxBg: "bg-emerald-50/70 border-emerald-200/90",
    points: [
      "Provide clear contact options with privacy notices",
      "Write accurate titles and headings",
      "Add factual FAQs with structured data"
    ]
  },
  {
    phase: "04",
    stepNum: 4,
    name: "Speed",
    time: "Wks 5–6",
    title: "Improve Page Speed & Core Web Vitals",
    stage: "Speed & Performance",
    timeline: "Weeks 5–6",
    icon: Zap,
    deliverable: "Core Web Vitals Focused Page Performance",
    badgeBg: "bg-amber-50 text-amber-600 border-amber-200",
    boxBg: "bg-amber-50/70 border-amber-200/90",
    points: [
      "Compress heavy images and code for faster loading",
      "Review mobile performance in PageSpeed Insights",
      "Reduce friction caused by a slow website"
    ]
  },
  {
    phase: "05",
    stepNum: 5,
    name: "Local Profile",
    time: "Wks 6–8",
    title: "Keep Local Profiles Accurate",
    stage: "Local Profile",
    timeline: "Weeks 6–8",
    icon: MapPin,
    deliverable: "Accurate Google Business Profile & Listings",
    badgeBg: "bg-rose-50 text-rose-600 border-rose-200",
    boxBg: "bg-rose-50/70 border-rose-200/90",
    points: [
      "Set up Google Business Profile with correct categories and details",
      "Keep listings in trusted local directories consistent",
      "No fake reviews, incentives, or ranking manipulation"
    ]
  },
  {
    phase: "06",
    stepNum: 6,
    name: "Content",
    time: "Ongoing",
    title: "Maintain Accurate Content & Structure",
    stage: "Ongoing Maintenance",
    timeline: "Ongoing",
    icon: Award,
    deliverable: "Monthly Technical & Content Review",
    isFinal: true,
    badgeBg: "bg-cyan-50 text-cyan-600 border-cyan-200",
    boxBg: "bg-cyan-50/70 border-cyan-200/90",
    points: [
      "Regular review of content accuracy and freshness",
      "Publish helpful, source-referenced informational guides",
      "Keep structured data and metadata up to date"
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
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Local Profile</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">Accurate Listings</p>
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
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Structure</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">Structured Data</p>
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
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Technical</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">Crawl & Index Health</p>
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
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Content</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">Clear Architecture</p>
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
              SEO & Local Profile Management in Pune
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#1a1053] tracking-tight leading-[1.1] mb-6 max-w-4xl">
            Technical SEO & Accurate <br className="hidden lg:block" /> Local Listings.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] mt-3">
              Clear Structure. No Ranking Promises.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Codigix Infotech provides technical site optimization, structured metadata, crawl and index health, and accurate management of business listing details (location, hours, departments, services, and factual information), without ranking manipulation or guaranteed position claims.
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
                SEO & Local Profile Services
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Built for Pune and PCMC hospitals, clinics, enterprises, and local businesses that want accurate, well-structured, and technically healthy search presence.
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
              <span>Four Areas of Search Visibility</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] leading-[1.15] tracking-tight mb-4">
              Making Information Findable Across <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                The 4 Areas of Search: SEO, GEO, GMB & AEO
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
              People search in more than one place. We help keep your information accurate and well-structured across traditional search results, AI-generated overviews, local map listings, and voice answers, without any guarantee of placement.
            </p>
          </div>

          {/* Agency Multi-Channel Matrix Chassis (Asymmetrical 2-Row Growth Pipeline) */}
          <div className="rounded-[36px] bg-white/90 backdrop-blur-xl border border-slate-200 shadow-[0_20px_60px_rgba(26,16,83,0.06)] p-6 sm:p-8 lg:p-10">

            {/* Top Agency Status Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2 font-semibold text-[#1a1053]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="tracking-wide uppercase text-[11px]">Search Visibility Framework</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-100 font-medium text-slate-600 text-[11px]">
                  Coverage: PCMC & Pune
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200">
                  Accuracy First
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
                          Area 01 • Organic Search
                        </span>
                        <span className="text-slate-400 text-xs font-mono">• Technical SEO</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1053] tracking-tight">
                        Technical & Organic SEO
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                      <Search size={22} strokeWidth={2.2} />
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    We optimize site architecture, metadata, internal linking, and content structure so that accurate information is easy for search engines to crawl and understand. We do not buy links or guarantee rankings.
                  </p>

                  {/* Interactive SERP Simulator & Live Traffic Chart Widget */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm mb-5">
                    {/* SERP Preview (7 Cols) */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100 text-[11px] text-slate-500 font-mono">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="truncate">google.com/search?q=services+in+pcmc</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                          <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">G</span>
                          <span className="font-mono text-[10px] text-slate-400">yourbrand.com › pcmc</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold text-[9px] border border-emerald-200">
                            Example
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-blue-700 leading-snug hover:underline cursor-pointer mb-1">
                          Your Organization | Services in PCMC
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          An illustrative search result showing an accurate title and description. Actual search results are determined by search engines.
                        </p>
                      </div>
                    </div>

                    {/* Animated SVG Traffic Growth Chart (5 Cols) */}
                    <div className="md:col-span-5 bg-gradient-to-br from-blue-50/70 to-indigo-50/40 rounded-xl p-3 border border-blue-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Search Snippet</span>
                        <span className="text-xs font-extrabold text-blue-600">Illustrative</span>
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
                        <span>Illustrative layout only</span>
                        <span className="font-bold text-[#1a1053]">No outcome data</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Marketing Deliverables */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[11px]">
                      Informational Keywords
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[11px]">
                      Internal Linking
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[11px]">
                      Core Web Vitals Focused
                    </span>
                  </div>
                  <span className="font-bold text-blue-700 text-xs">
                    Technical SEO Hygiene
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
                          Area 02 • Local Profile
                        </span>
                        <span className="text-slate-400 text-xs font-mono">• Google Maps</span>
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
                    Keep your Google Business Profile accurate across PCMC and Pune: location, hours, departments, services, and factual information. We do not manipulate rankings or generate reviews.
                  </p>

                  {/* Google Maps Business Profile Interactive Simulation */}
                  <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm mb-5">
                    <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                      <div>
                        <h4 className="text-sm font-bold text-[#1a1053] flex items-center gap-1.5">
                          Your Business Listing
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
                          <span>Category • Address • Hours</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                        Details Verified
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mb-3">
                      PCMC areas: Wakad, Hinjawadi, Chinchwad, Pimpri, Bhosari
                    </p>

                    {/* Listing Action Buttons */}
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
                  <span className="text-[11px] text-slate-500 font-medium">Accurate Details • Citations</span>
                  <span className="font-bold text-emerald-600 text-xs">Factual Listing Details</span>
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
                          Area 03 • AI Search
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
                    AI-generated search summaries draw on what is published online. We structure your website and information so that it is accurate, clear, and easy for these systems to read. We cannot control or guarantee what they say.
                  </p>

                  {/* Google AI Overview Style Card */}
                  <div className="rounded-2xl bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 border border-indigo-200/80 p-4 shadow-sm mb-5">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-indigo-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                        <Sparkles size={14} className="text-indigo-600" />
                        <span>Google AI Overview</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-semibold">
                        Source Links
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed mb-3">
                      "<strong className="text-indigo-900 font-bold underline decoration-indigo-400">[Your Organization]</strong> is located in PCMC and provides the following services, as described on its official website..."
                    </p>

                    {/* Official-Style Source Link Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="text-slate-400 font-mono">Sources:</span>
                      <span className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                        🔗 Official Brand Page
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                        🔗 Structured Data
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Marketing Deliverables */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium">Google SGE • Entity Citations</span>
                  <span className="font-bold text-indigo-700 text-xs">Accurate, Readable Information</span>
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
                          Area 04 • Direct Answers
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
                    Structure FAQ and informational content with valid Schema JSON-LD so that clear answers may be eligible for featured snippets and voice responses. Eligibility is decided by search platforms.
                  </p>

                  {/* Google Featured Snippet & Voice Waveform Widget */}
                  <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm mb-5">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs">
                      <span className="font-bold text-cyan-900 bg-cyan-50 px-2.5 py-0.5 rounded-lg border border-cyan-200">
                        Featured Snippet Example
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        Illustrative
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 mb-3 text-xs">
                      <p className="font-bold text-[#1a1053] mb-1">
                        Q: What information should an organization publish on its website?
                      </p>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        "Accurate contact details, a clear list of services and departments, and structured data so the information is easy to read."
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
                          Voice-Friendly Structure
                        </span>
                      </div>
                      <span className="text-cyan-700 font-bold text-[11px]">
                        Clear, Concise Answers
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
                      Rich Result Eligibility
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[11px]">
                      Voice Search Optimization
                    </span>
                  </div>
                  <span className="font-bold text-cyan-700 text-xs">
                    Structured Answer Content
                  </span>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. NOT JUST SEO — A COMPLETE INFORMATION SYSTEM */}
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
                <span>Our Approach • Accuracy-First SEO</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1053] leading-tight tracking-tight mb-3">
                Not Just Keywords — <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                  A Complete, Accurate Information System
                </span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed mb-6 max-w-2xl">
                Search visibility is not just about keywords. At Codigix, we focus on <strong className="text-[#1a1053] font-semibold">accurate information, clear structure, and technical health</strong>, without promising rankings or outcomes.
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
                        Informational Query Research
                      </h3>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200/80 w-fit">
                        Relevant Terms Only
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                      Research the queries people actually use to look for services and information in PCMC & Pune.
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
                        Clear Page Structure & Usability
                      </h3>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold border border-rose-200/80 w-fit">
                        Accessible Layouts
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                      Page layouts and clear contact options designed for readability, accessibility, and ease of use.
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
                        Transparent Technical Reporting
                      </h3>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/80 w-fit">
                        Clear Reporting
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                      Consent-aware analytics and clear reporting on site health, listing accuracy, and visits.
                    </p>
                  </div>
                </div>

              </div>

              {/* Compact Trust Endorsement */}
              <div className="px-4 py-3 mt-2 rounded-lg bg-slate-50 border-l-4 border-[#e20b27] text-sm font-light text-slate-600 leading-relaxed">
                "Built for organizations across PCMC & Pune that value accurate information and sound technical foundations."
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
                        <h3 className="font-extrabold text-[#1a1053] text-base leading-tight">Codigix Technical Checklist</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Items We Review</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Checklist
                    </span>
                  </div>

                  {/* Standard Agency vs Codigix Comparison */}
                  <div className="grid grid-cols-2 gap-3 mb-5 p-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <div className="p-2.5 rounded-lg bg-white text-slate-500 text-center border border-slate-200/50">
                      <span className="block font-bold text-rose-600 mb-0.5">What We Avoid</span>
                      <span className="text-[11px]">Ranking Promises</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-center border border-emerald-200 font-semibold">
                      <span className="block font-bold text-emerald-700 mb-0.5">What We Do</span>
                      <span className="text-[11px]">Technical Health ✓</span>
                    </div>
                  </div>

                  {/* 3 High-Impact KPI Performance Blocks */}
                  <div className="space-y-3 mb-5">

                    {/* Metric 01 */}
                    <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-semibold text-slate-700">Crawl & Index Health</span>
                        <span className="text-sm font-black text-emerald-600 font-mono">Reviewed</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Sitemaps, robots.txt, canonical tags</span>
                        <span className="text-slate-600 font-medium">Technical</span>
                      </div>
                    </div>

                    {/* Metric 02 */}
                    <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-semibold text-slate-700">Local Profile Accuracy</span>
                        <span className="text-sm font-black text-blue-600 font-mono">Reviewed</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Address, hours, departments, services</span>
                        <span className="text-slate-600 font-medium">Factual</span>
                      </div>
                    </div>

                    {/* Metric 03 */}
                    <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-semibold text-slate-700">Core Web Vitals & Accessibility</span>
                        <span className="text-sm font-black text-amber-600 font-mono">Reviewed</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Speed, WCAG 2.1 AA alignment</span>
                        <span className="text-slate-600 font-medium">Engineering</span>
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
                    <span>Schedule a Discovery Call</span>
                    <ArrowRight size={14} />
                  </Link>

                  {/* Micro Trust Proof */}
                  <div className="flex items-center justify-center gap-2 mt-2 text-[9px] text-slate-400">
                    <span>✓ Discovery Call</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>✓ Site Review</span>
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
              <span>Deliverables & Our Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] leading-[1.15] tracking-tight mb-4">
              What You Get & How We Execute : <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                The 6-Phase Roadmap
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Every deliverable is designed to create a technically healthy, accurate, and well-structured website, without promising rankings or outcomes.
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
              <span>Selected Work by Regulatory Scope</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] leading-[1.15] tracking-tight mb-4">
              Organizations Across PCMC & Pune <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Work With Codigix Infotech
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Website architecture, factual service pages, and technical hygiene for healthcare organizations (NMC and NDC frameworks) and non-medical businesses, which sit outside NMC scope.
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
                  How We Work
                </h3>
                <p className="text-xs text-slate-500 font-light mb-4">
                  Engineering, accuracy, and privacy-by-design across Pune & PCMC.
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
                  <span>Ethical Communication Commitment</span>
                </div>
                "Built for hospitals, clinics, enterprises, and local businesses in Pune & PCMC that need accurate, accessible, and privacy-aligned digital systems. Healthcare engagements follow NMC (allopathic), NDC (dental), and AYUSH (Ayurvedic) communication principles."
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
                    Selected Engagements by Framework
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
                      tag: "Healthcare & Dermatology (NMC scope)",
                      tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
                      avatarBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
                      logo: "/clients/sheetals-glow.webp",
                      coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
                      icon: Stethoscope,
                      duration: "Ongoing engagement",
                      result: "Website & Information Architecture",
                      rankKeyword: "Factual service & department pages",
                      area: "Pimpri-Chinchwad",
                      rating: "",
                      reviews: "",
                      trendPath: "M0 18 Q 20 16, 40 10 T 70 6 T 90 2"
                    },
                    {
                      name: "CorpLegal Solutions & Co",
                      tag: "Corporate Law & B2B (Non-medical)",
                      tagColor: "bg-blue-50 text-blue-700 border-blue-200/80",
                      avatarBg: "bg-blue-50 text-blue-600 border-blue-200",
                      logo: "/clients/corplegal.webp",
                      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
                      icon: Building2,
                      duration: "Ongoing engagement",
                      result: "Structured Web Content",
                      rankKeyword: "Technical SEO hygiene & site structure",
                      area: "Pune & PCMC",
                      rating: "",
                      reviews: "",
                      trendPath: "M0 20 Q 25 18, 45 11 T 72 5 T 90 2"
                    },
                    {
                      name: "Precision Tech Engineering",
                      tag: "Manufacturing & Industrial (Non-medical)",
                      tagColor: "bg-amber-50 text-amber-800 border-amber-200/80",
                      avatarBg: "bg-amber-50 text-amber-600 border-amber-200",
                      logo: "/clients/regain.webp",
                      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
                      icon: Factory,
                      duration: "Ongoing engagement",
                      result: "Catalog & Enquiry Workflows",
                      rankKeyword: "Product pages & technical SEO",
                      area: "Bhosari MIDC",
                      rating: "",
                      reviews: "",
                      trendPath: "M0 19 Q 22 17, 42 12 T 68 7 T 90 3"
                    },
                    {
                      name: "Bakul Hospitality & Catering",
                      tag: "Hospitality & Events (Non-medical)",
                      tagColor: "bg-purple-50 text-purple-700 border-purple-200/80",
                      avatarBg: "bg-purple-50 text-purple-600 border-purple-200",
                      logo: "/clients/bakul.webp",
                      coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
                      icon: UtensilsCrossed,
                      duration: "Ongoing engagement",
                      result: "Responsive Website Refresh",
                      rankKeyword: "Clear service pages & navigation",
                      area: "Pune Metro",
                      rating: "",
                      reviews: "",
                      trendPath: "M0 20 Q 20 19, 45 13 T 70 6 T 90 2"
                    },
                    {
                      name: "Canopy Healthcare & Aligners",
                      tag: "Dental & Specialized Care (NDC scope)",
                      tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200/80",
                      avatarBg: "bg-cyan-50 text-cyan-600 border-cyan-200",
                      logo: "/clients/canopy.webp",
                      coverImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
                      icon: Activity,
                      duration: "Ongoing engagement",
                      result: "Website & Accessibility Work",
                      rankKeyword: "Accurate listings & service pages",
                      area: "Wakad & Hinjawadi",
                      rating: "",
                      reviews: "",
                      trendPath: "M0 18 Q 24 15, 48 9 T 72 4 T 90 1"
                    },
                    {
                      name: "Sanskruti Agro Tourism",
                      tag: "Tourism & Leisure (Non-medical)",
                      tagColor: "bg-rose-50 text-rose-700 border-rose-200/80",
                      avatarBg: "bg-rose-50 text-rose-600 border-rose-200",
                      logo: "/clients/sanskruti-agro-farm.webp",
                      coverImage: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=800",
                      icon: Globe,
                      duration: "Ongoing engagement",
                      result: "Responsive Website & Listings",
                      rankKeyword: "Accurate listing details",
                      area: "Pune Outskirts",
                      rating: "",
                      reviews: "",
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

                          {/* Bottom on Image: Scope Pill */}
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
                                  {client.area}
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
                                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Work Delivered</div>
                                  <div className="text-[11px] font-bold text-slate-800 truncate">{client.rankKeyword}</div>
                                </div>
                              </div>
                              {/* Sparkline Indicator */}
                              <div className="shrink-0 flex flex-col items-end">
                              </div>
                            </div>
                          </div>

                          {/* Footer Bar */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                            <div className="flex items-center gap-1 text-slate-600 font-medium">
                              <MapPin size={11} className="text-[#e20b27] shrink-0" />
                              <span>{client.area}</span>
                            </div>
                            <div className="text-[10px] font-medium text-slate-500">Scope-based engagement</div>
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
                    <h3 className="text-sm font-bold text-[#1a1053]">Tools We Use</h3>
                    <p className="text-[11px] text-slate-500">Auditing and analytics tools</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                  {[
                    "Google Analytics 4",
                    "Search Console",
                    "Ahrefs & SEMrush",
                    "Screaming Frog",
                    "Google Tag Manager",
                    "Lighthouse Audits"
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
                    <h3 className="text-sm font-bold text-[#1a1053]">Deliverables You Can Expect</h3>
                    <p className="text-[11px] text-slate-500">What the work covers</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    "Technical audit with prioritized fixes",
                    "Accurate Google Business Profile and listing details",
                    "Structured data and metadata for key pages",
                    "Clear monthly reporting on site health"
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
              Clear answers to common questions about our SEO and local profile services.
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
