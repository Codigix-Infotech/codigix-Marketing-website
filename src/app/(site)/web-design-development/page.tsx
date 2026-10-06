"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ClientShowcaseSection from '@/components/services/ClientShowcaseSection';
import {
  Code2,
  Layout,
  Smartphone,
  Globe,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  BarChart3,
  PhoneCall,
  Clock,
  Award,
  Activity,
  Cpu,
  Star,
  Search,
  RotateCw,
  Users,
  Eye,
  Check,
  Monitor,
  Tablet,
  Layers,
  Server,
  Database,
  Lock,
  Calendar,
  MessageSquare,
  Stethoscope,
  Hospital,
  ShoppingCart,
  HeartPulse,
  Smile,
  FlaskConical,
  Gauge,
  HelpCircle,
  FileCheck,
  Target,
  MapPin
} from 'lucide-react';

const whatWeDoList = [
  {
    num: "01",
    title: "Custom healthcare website design & development",
    desc: "Bespoke, high-converting websites designed specifically for doctors, clinics, hospitals, and diagnostic centers with patient-first UI/UX."
  },
  {
    num: "02",
    title: "Mobile-responsive & fast-loading websites",
    desc: "100% mobile-first architecture optimized to load in under 1.5 seconds on 4G/5G mobile networks, maximizing patient retention."
  },
  {
    num: "03",
    title: "Online appointment & booking integration",
    desc: "Seamless 1-click WhatsApp booking, calendar scheduling systems, and instant call triggers that convert visitors into consultations."
  },
  {
    num: "04",
    title: "Patient portal & telemedicine integration",
    desc: "Secure patient inquiry portals, digital lab report downloads, and integrated video consultation booking for modern clinics."
  },
  {
    num: "05",
    title: "SEO-ready architecture & local SEO structure",
    desc: "Built with clean schema markup, localized Pune/PCMC URL structures, meta tags, and Core Web Vitals excellence from day one."
  },
  {
    num: "06",
    title: "Ongoing maintenance & security support",
    desc: "24/7 uptime monitoring, daily cloud backups, SSL encryption, SSL certificates, speed optimization, and regular content updates."
  }
];

const whatYouGet = [
  {
    icon: Layout,
    title: "Conversion-Focused Design",
    desc: "Every page layout, color choice, and button is engineered to turn casual visitors into confirmed clinic appointments.",
    badge: "High CVR",
    color: "from-blue-600 to-indigo-600"
  },
  {
    icon: Zap,
    title: "Fast & Mobile-Optimized",
    desc: "Ultra-fast load times with Google PageSpeed 95+ scores, keeping impatient patients engaged on mobile devices.",
    badge: "< 1.5s Load",
    color: "from-amber-600 to-orange-600"
  },
  {
    icon: Search,
    title: "SEO-Ready Structure",
    desc: "Complete technical SEO built in — medical schema markup, fast sitemaps, OpenGraph tags, and clean semantic HTML5.",
    badge: "Google Rank #1",
    color: "from-emerald-600 to-teal-600"
  },
  {
    icon: ShieldCheck,
    title: "Scalable & Secure",
    desc: "Robust cloud architecture, SSL protection, spam protection, and patient data privacy complying with healthcare standards.",
    badge: "100% Secure",
    color: "from-purple-600 to-pink-600"
  }
];

const websiteTypes = [
  {
    icon: Stethoscope,
    title: "Doctor Websites",
    subtitle: "Solo Practitioners & Specialists",
    desc: "Personal authority websites highlighting doctor credentials, specialties, awards, patient reviews, and instant consultation booking."
  },
  {
    icon: Hospital,
    title: "Clinic & Hospital Websites",
    subtitle: "Multi-Page & Multi-Specialty",
    desc: "Comprehensive hospital portals featuring department directories, doctor rosters, OPD timings, emergency info, and admission guides."
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Websites",
    subtitle: "Pharma & Health Stores",
    desc: "High-speed online medicine and medical equipment stores with secure payment gateways, cart management, and inventory tracking."
  },
  {
    icon: Smile,
    title: "Dentist & Cosmetic Portals",
    subtitle: "Aesthetic & Dental Clinics",
    desc: "Visual-rich websites with before/after smile galleries, transparent procedure pricing, and virtual smile assessment forms."
  },
  {
    icon: FlaskConical,
    title: "Diagnostic & Pathology Labs",
    subtitle: "Lab & Test Booking Centers",
    desc: "Interactive health package catalogs, test search engines, home sample collection booking, and instant PDF report download portals."
  }
];

const processSteps = [
  {
    step: "01",
    phase: "Phase 01",
    title: "Discovery & Strategy",
    tagline: "Architecture & Conversion Funnel",
    desc: "We analyze your clinical specialties, target patient demographics in PCMC & Pune, and map out frictionless appointment pathways.",
    deliverable: "Information Architecture & Booking Flow",
    points: [
      "Target patient persona & intent mapping",
      "Competitor UX/UI gap analysis",
      "Conversion hierarchy & sitemap planning",
      "Goal alignment: calls vs appointment forms"
    ]
  },
  {
    step: "02",
    phase: "Phase 02",
    title: "UI/UX Design & Wireframing",
    tagline: "Figma Prototyping & Medical Aesthetics",
    desc: "Crafting intuitive, trust-inducing interfaces with calming medical palettes, high-contrast readability, and frictionless mobile layouts.",
    deliverable: "Interactive High-Fidelity Prototype",
    points: [
      "Figma interactive prototype creation",
      "Medical color palette & modern typography",
      "Mobile-first responsive layouts",
      "Doctor approval on design mockups"
    ]
  },
  {
    step: "03",
    phase: "Phase 03",
    title: "Development & Coding",
    tagline: "Next.js Architecture & Sub-1.5s Speed",
    desc: "Clean, ultra-fast code built with modern frameworks, instant WhatsApp booking triggers, and seamless backend API integrations.",
    deliverable: "Production-Grade Codebase",
    points: [
      "Modern Next.js / React / WordPress tech stack",
      "Ultra-fast clean code architecture",
      "WhatsApp & appointment API integration",
      "Interactive doctor rosters & department tabs"
    ]
  },
  {
    step: "04",
    phase: "Phase 04",
    title: "Content & On-Page SEO",
    tagline: "Medical E-E-A-T & Schema Setup",
    desc: "Patient-friendly clinical copywriting aligned with medical ethics, structured schema markup, and local PCMC keyword integration.",
    deliverable: "SEO-Optimized Clinical Copy & Schema",
    points: [
      "Medically accurate clinical copywriting",
      "Google medical schema structured data",
      "Local PCMC & Pune keyword integration",
      "Image compression & WebP optimization"
    ]
  },
  {
    step: "05",
    phase: "Phase 05",
    title: "Testing & Launch",
    tagline: "Multi-Device QA & Zero-Downtime Live",
    desc: "Rigorous testing across 20+ device viewports, Core Web Vitals audit (PageSpeed 95+), SSL verification, and seamless domain migration.",
    deliverable: "Flawless Live Website Deployment",
    points: [
      "Cross-browser and multi-device QA testing",
      "Google PageSpeed Core Web Vitals check",
      "SSL certificate & security hardening",
      "Live DNS migration with zero downtime"
    ]
  },
  {
    step: "06",
    phase: "Phase 06",
    title: "Maintenance & Support",
    tagline: "24/7 Security & Performance Audits",
    desc: "Continuous cloud backups, proactive security patching, speed optimization, and prompt updates whenever your clinic services evolve.",
    deliverable: "Ongoing Peace-of-Mind Maintenance",
    points: [
      "Continuous server uptime monitoring",
      "Automated daily cloud backups",
      "Monthly speed & security health audits",
      "Ongoing content additions & doctor profile updates"
    ]
  }
];

const whyChooseUs = [
  {
    title: "Conversion-Focused Approach",
    desc: "We don't just build pretty pages; we engineer patient acquisition machines with clear booking funnels and frictionless calls-to-action.",
    icon: Target
  },
  {
    title: "Performance-Driven Development",
    desc: "Lightweight, blazing-fast code that scores 90+ on Google PageSpeed Insights, ensuring top mobile search rankings and zero drop-offs.",
    icon: Zap
  },
  {
    title: "Healthcare-Oriented Strategy",
    desc: "We understand patient anxiety, medical ethics, and clinical workflows, creating interfaces that instantly reassure and educate visitors.",
    icon: HeartPulse
  },
  {
    title: "HIPAA & Privacy Compliance",
    desc: "Enterprise-grade SSL encryption, secure contact form submissions, and strict patient privacy architecture.",
    icon: Lock
  },
  {
    title: "Local Market Understanding",
    desc: "Deep expertise in Pune and PCMC patient demographics, multi-lingual considerations (English/Marathi/Hindi), and local clinic hubs.",
    icon: Globe
  }
];

const techStack = [
  "Next.js 14 / React",
  "TailwindCSS & Vanilla CSS",
  "WordPress & Elementor Pro",
  "Node.js & PHP Engines",
  "Vercel & AWS Cloud Hosting",
  "Google PageSpeed Optimizer",
  "Yoast / RankMath SEO Suites",
  "Cloudflare CDN & SSL"
];

const kpisList = [
  "Google PageSpeed Score (95+)",
  "Mobile Load Time (< 1.5s)",
  "Appointment Form Conversion Rate",
  "Direct Call & WhatsApp Click Rate",
  "Core Web Vitals Pass Rate",
  "Bounce Rate Reduction (< 35%)",
  "Search Engine Indexation Speed"
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

const faqs = [
  {
    q: "What makes a good healthcare website?",
    a: "A great healthcare website must load in under 2 seconds, be 100% mobile-responsive, clearly display doctor credentials and treatments, provide transparent contact info, and offer an effortless 1-click appointment booking or WhatsApp inquiry button."
  },
  {
    q: "How long does it take to build a healthcare website?",
    a: "A custom doctor clinic website typically takes 7 to 14 business days. Larger multi-specialty hospital websites or custom pathology portals with report downloads generally take 3 to 4 weeks, including complete UI/UX design, content writing, SEO, and testing."
  },
  {
    q: "Will my website be mobile-friendly?",
    a: "Absolutely. Over 80% of healthcare searches happen on smartphones. Every website we build is designed mobile-first, ensuring smooth navigation, clear font readability, and instant click-to-call buttons across all iOS and Android devices."
  },
  {
    q: "Do you provide SEO with website development?",
    a: "Yes! All our websites come pre-configured with advanced on-page SEO, including Google Medical schema markup, XML sitemaps, robots.txt, fast caching, localized keyword tagging, and optimized OpenGraph social previews."
  },
  {
    q: "Can we manage or update content ourselves after launch?",
    a: "Yes. We provide an intuitive, user-friendly Content Management System (CMS) and complete video walkthroughs so your clinic staff can easily add new blog posts, update doctor profiles, or modify clinic timings with zero coding knowledge."
  }
];

export default function WebDesignDevelopmentPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [openFaqs, setOpenFaqs] = useState<number[]>([0, 1]);
  const [activePhase, setActivePhase] = useState<number>(0);
  const [isPhasePaused, setIsPhasePaused] = useState<boolean>(false);
  const phaseCardsContainerRef = useRef<HTMLDivElement | null>(null);
  // Auto-advancing re-renders this whole page, so only do it while the phase cards are visible.
  const phaseInView = useInView(phaseCardsContainerRef, { amount: 0.2 });

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  // Auto-scroll the phase cards to center the active card smoothly
  useEffect(() => {
    if (!phaseCardsContainerRef.current) return;
    const container = phaseCardsContainerRef.current;
    const cardEl = container.querySelector(`[data-phase-index="${activePhase}"]`) as HTMLElement;
    if (cardEl) {
      const containerWidth = container.offsetWidth;
      const cardLeft = cardEl.offsetLeft;
      const cardWidth = cardEl.offsetWidth;
      const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }, [activePhase]);

  // Smooth continuous auto-cycle through all phases without needing clicks
  useEffect(() => {
    if (isPhasePaused || !phaseInView) return;
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % processSteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPhasePaused, phaseInView]);

  return (
    <div className="min-h-screen bg-[#fafcff] text-slate-800 selection:bg-[#e20b27] selection:text-white">

      {/* ============================================================ */}
      {/* 1. HERO SECTION: A Website Your Patients Can Trust */}
      {/* ============================================================ */}
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
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden container mx-auto">
          {/* Top Left */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, -15px) rotate(-1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[2%] xl:left-[8%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Layout size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">UI/UX Design</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">Pixel Perfect Layouts</p>
            </div>
          </motion.div>

          {/* Bottom Left */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, 15px) rotate(1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[35%] left-[5%] xl:left-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <Smartphone size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Responsive</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">Mobile-First Engine</p>
            </div>
          </motion.div>

          {/* Top Right */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, 15px) rotate(1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[22%] right-[2%] xl:right-[8%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Zap size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Performance</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">&lt; 1.5s Load Time</p>
            </div>
          </motion.div>

          {/* Bottom Right */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, -15px) rotate(-1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[38%] right-[5%] xl:right-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-rose-50 text-[#e20b27] flex items-center justify-center shrink-0 border border-rose-100">
              <Search size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Architecture</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none">SEO Optimized</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 lg:px-8 relative z-10 text-center flex flex-col items-center"
        >

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm mb-7">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e20b27] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e20b27]"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#1a1053] tracking-wide">
              Pune's #1 Web Design & Development Agency
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#1a1053] tracking-tight leading-[1.1] mb-6 max-w-4xl">
            A Website Your Patients <br className="hidden lg:block" /> Can Trust at First Glance.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] mt-3">
              More Trust. More Bookings.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Your website is often the first impression a patient has of your practice. Codigix Infotech designs clean, modern, lightning-fast, and mobile-responsive websites that make it effortless for patients to learn, trust, and book appointments with you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-20">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1053] hover:bg-[#281878] text-white rounded-full font-semibold text-base transition-all shadow-[0_10px_25px_-5px_rgba(26,16,83,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(26,16,83,0.35)] transform hover:-translate-y-0.5"
            >
              <span>Get Free Website Consultation</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href="#what-we-do"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-[#1a1053] rounded-full font-semibold text-base shadow-xs transition-all"
            >
              <span>Explore Features</span>
              <ChevronDown size={18} />
            </a>
          </div>

        </motion.div>
      </section>


      {/* ============================================================ */}
      {/* 2. SECTION: What We Do (01 - 06) */}
      {/* ============================================================ */}
      <section id="what-we-do" className="py-20 lg:py-28 relative bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Full-Stack Web Engineering
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight leading-[1.15]">
              Comprehensive <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Web Solutions & Development
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Comprehensive web design and development crafted to elevate your clinic's credibility and drive appointment bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left 6 Accordion-Style Numbered Rows */}
            <div className="lg:col-span-7 space-y-4">
              {whatWeDoList.map((item, idx) => (
                <div
                  key={idx}
                  className="group p-5 sm:p-6 rounded-2xl bg-[#fafcff] hover:bg-white border border-slate-200/80 hover:border-indigo-300 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(99,102,241,0.06)] flex items-start gap-4 sm:gap-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-200/60 flex items-center justify-center font-bold font-mono text-indigo-700 text-lg shrink-0 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1053] group-hover:text-indigo-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-br from-[#0e0a30] via-[#1a1053] to-[#201060] p-8 text-white shadow-2xl border border-indigo-500/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                    <Gauge className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight text-white">
                    Engineered for Instant Patient Trust & Speed
                  </h3>

                  <p className="text-sm text-indigo-200/80 leading-relaxed">
                    Patients will leave a slow, confusing website within 3 seconds. We build sleek, intuitive digital front doors that convert visitors into booked appointments.
                  </p>

                  <div className="space-y-3 pt-2">
                    {[
                      "1-Click WhatsApp & Call Widget Integration",
                      "Interactive Doctor Roster & OPD Schedules",
                      "Location Maps & Google Directions Embed",
                      "Automated Email & SMS Booking Alerts"
                    ].map((bullet, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white text-[#1a1053] hover:bg-indigo-50 font-bold text-sm shadow-md transition-all"
                    >
                      <span>Request a Live Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 3. SECTION: Not Just Website Design — A Complete Growth Asset */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-[#f4f7fc] to-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">
          <div className="relative rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5" />
                  Growth Architecture
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
                  Not Just Website Design — <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                    A Complete Growth Asset
                  </span>
                </h2>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p className="font-semibold text-slate-900">
                    A website should not simply look good — it must convert:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#fafcff] p-4 rounded-xl border border-slate-200">
                      <div className="text-2xl font-black text-indigo-700">94%</div>
                      <div className="text-xs text-slate-600 mt-1">of first impressions are design & speed related</div>
                    </div>
                    <div className="bg-[#fafcff] p-4 rounded-xl border border-slate-200">
                      <div className="text-2xl font-black text-rose-600">80%+</div>
                      <div className="text-xs text-slate-600 mt-1">of patients visit through mobile phones</div>
                    </div>
                    <div className="bg-[#fafcff] p-4 rounded-xl border border-slate-200">
                      <div className="text-2xl font-black text-emerald-600">3.8x</div>
                      <div className="text-xs text-slate-600 mt-1">higher booking rate with instant WhatsApp CTAs</div>
                    </div>
                  </div>

                  <p className="pt-2">
                    At Codigix Infotech, we engineer healthcare websites that do more than showcase brochures. We build fast, responsive digital assets that rank on Google, establish doctor authority, and make patient consultation booking effortless.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 bg-indigo-100/70 px-3 py-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-indigo-700" />
                    Doctor Credibility Highlighting
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-100/70 px-3 py-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-emerald-700" />
                    Sub-1.5s Fast Loading
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-900 bg-rose-100/70 px-3 py-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-rose-700" />
                    Zero Friction Patient Booking
                  </div>
                </div>
              </div>

              {/* Right Diagnostic Visual Card */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-br from-[#1a1053] to-[#251060] rounded-2xl p-6 text-white shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                      Technical Audit Benchmark
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      Grade A+
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span>Performance & Speed</span>
                      <span className="font-mono font-bold text-emerald-400">99 / 100</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span>Accessibility (WCAG)</span>
                      <span className="font-mono font-bold text-indigo-300">100 / 100</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span>Best Practices</span>
                      <span className="font-mono font-bold text-blue-300">100 / 100</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span>SEO Structured Data</span>
                      <span className="font-mono font-bold text-emerald-400">100 / 100</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 4. SECTION: What You Get With Our Website Services */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              Patient-Centric Value
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What You Get With Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Website Services</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              A modern digital clinic experience designed to attract, engage, and retain patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatYouGet.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-3xl bg-[#fafcff] hover:bg-white border border-slate-200/80 hover:border-indigo-300 p-8 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(99,102,241,0.08)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <IconComp className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1a1053] group-hover:text-indigo-700 transition-colors">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-700 group-hover:text-indigo-900 transition-colors">
                    <span>Explore details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 5. SECTION: Types of Websites We Build */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-[#fafcff] relative border-y border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <Layout className="w-3.5 h-3.5" />
              Specialized Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              Types of Websites <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">We Build</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Custom medical digital solutions tailored for every healthcare business model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {websiteTypes.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-400 hover:shadow-lg transition-all group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3 className="text-base font-bold text-[#1a1053] group-hover:text-indigo-700 transition-colors">
                      {item.title}
                    </h3>

                    <div className="text-xs font-medium text-indigo-600 mb-2">
                      {item.subtitle}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 6. SECTION: Our Website Development Process (6 Phases) */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-[#fafcff] relative overflow-hidden">
        {/* Animated travelling progress bar keyframes */}
        <style>{`
          @keyframes phaseProgress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" />
              Agile Web Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight">
              Our 6-Phase <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Web Development Process</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
              A transparent, agile workflow delivering sub-1.5s mobile speed, E-E-A-T medical compliance, and high appointment conversions.
            </p>
          </div>

          {/* Minimalist Animated Stepper Timeline (01 - 06) */}
          <div
            className="mb-14   mx-auto px-2 sm:px-4"
            onMouseEnter={() => setIsPhasePaused(true)}
            onMouseLeave={() => setIsPhasePaused(false)}
          >
            <div className="flex items-start justify-between w-full">
              {processSteps.map((step, idx) => {
                const isActive = activePhase === idx;
                const isPassed = activePhase > idx;

                return (
                  <React.Fragment key={idx}>
                    {/* Step Node */}
                    <div className="flex flex-col items-center flex-shrink-0" style={{ width: 'clamp(44px, 12vw, 80px)' }}>
                      <button
                        onClick={() => setActivePhase(idx)}
                        onMouseEnter={() => setActivePhase(idx)}
                        className="group flex flex-col items-center focus:outline-none transition-transform active:scale-95"
                      >
                        {/* Circle Badge */}
                        <div
                          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${isActive
                            ? 'bg-gradient-to-r from-[#e20b27] to-[#ff2b47] text-white shadow-[0_0_18px_rgba(226,11,39,0.45)] ring-4 ring-rose-100 scale-110'
                            : isPassed
                              ? 'bg-[#1a1053] text-white'
                              : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-300 hover:text-slate-600'
                            }`}
                        >
                          {isPassed ? (
                            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                          ) : (
                            step.step
                          )}
                        </div>

                        {/* Text Label */}
                        <span
                          className={`mt-2 text-[10px] sm:text-xs font-semibold tracking-tight transition-colors duration-200 text-center leading-tight truncate max-w-[76px] sm:max-w-[88px] ${isActive
                            ? 'text-[#e20b27] font-bold'
                            : isPassed
                              ? 'text-[#1a1053]'
                              : 'text-slate-400'
                            }`}
                        >
                          {step.title.split(' ')[0]}
                        </span>
                      </button>
                    </div>

                    {/* Connecting Line between steps */}
                    {idx < processSteps.length - 1 && (
                      <div className="flex-1 mt-4 sm:mt-5 mx-1 sm:mx-2 relative h-[2px] bg-slate-200 self-start">
                        {isPassed && (
                          <div className="absolute inset-0 bg-[#1a1053] transition-all duration-500" />
                        )}
                        {isActive && (
                          <div
                            key={`active-line-${activePhase}-${isPhasePaused}`}
                            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#1a1053] via-[#e20b27] to-[#ff2b47]"
                            style={{
                              animation: `phaseProgress 5.5s linear forwards`,
                              animationPlayState: isPhasePaused ? 'paused' : 'running',
                            }}
                            onAnimationEnd={() => {
                              setActivePhase((prev) => (prev + 1) % processSteps.length);
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

          {/* Smooth Auto-Scrolled Cards Track (No Slider - Pure Smooth Dynamic Scroll) */}
          <div className="relative">
            {/* Soft Edge Gradient Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-r from-[#fafcff] via-[#fafcff]/80 to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-l from-[#fafcff] via-[#fafcff]/80 to-transparent z-20" />

            {/* Scrollable Container */}
            <div
              ref={phaseCardsContainerRef}
              className="flex gap-5 sm:gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                paddingLeft: 'max(1.5rem, calc(50% - 215px))',
                paddingRight: 'max(1.5rem, calc(50% - 215px))'
              }}
              onMouseEnter={() => setIsPhasePaused(true)}
              onMouseLeave={() => setIsPhasePaused(false)}
            >
              {processSteps.map((step, idx) => {
                const isActive = activePhase === idx;

                return (
                  <div
                    key={idx}
                    data-phase-index={idx}
                    onClick={() => setActivePhase(idx)}
                    onMouseEnter={() => setActivePhase(idx)}
                    className={`relative w-[300px] sm:w-[380px] lg:w-[430px] flex-shrink-0 rounded-3xl p-6 sm:p-7 transition-all duration-500 cursor-pointer flex flex-col justify-between ${isActive
                      ? 'bg-white border-2 border-indigo-500 shadow-[0_20px_45px_rgba(99,102,241,0.12)] scale-[1.02] z-10'
                      : 'bg-white/80 border border-slate-200/90 hover:border-indigo-300 hover:shadow-lg opacity-75 hover:opacity-100'
                      }`}
                  >
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-colors ${isActive
                              ? 'bg-[#1a1053] text-white shadow-md'
                              : 'bg-slate-100 text-slate-600'
                              }`}
                          >
                            {step.step}
                          </span>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                              {step.phase}
                            </span>
                            <div className="text-xs text-slate-500">{step.tagline}</div>
                          </div>
                        </div>

                        {isActive && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h3
                        className={`text-lg sm:text-xl font-extrabold tracking-tight transition-colors mb-2 ${isActive ? 'text-[#1a1053]' : 'text-slate-800'
                          }`}
                      >
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                        {step.desc}
                      </p>

                      {/* Action Points */}
                      <div className="space-y-2.5 pt-2 border-t border-slate-100">
                        {step.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400'
                                }`}
                            />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverable Footer */}
                    <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/70 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-4 sm:p-5 rounded-b-3xl">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="font-semibold text-slate-800 text-[11px] sm:text-xs truncate max-w-[210px] sm:max-w-[280px]">
                          {step.deliverable}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider shrink-0">
                        Verified
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 7. SECTION: Technologies We Use & KPIs We Track (SIDE-BY-SIDE BENTO - NO CLICKS NEEDED) */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-[#0a0724] via-[#1a1053] to-[#120a3d] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px] relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
              Modern Stack & Measurable Outcomes
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Enterprise Technologies & Key Performance Indicators
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mt-4">
              We build with modern, future-proof tech stacks that guarantee sub-second speed, military-grade security, and high patient conversion rates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Card: Technologies We Use */}
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Technologies We Use</h3>
                  <p className="text-xs text-slate-300">Sub-second framework & secure web stack</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {techStack.map((tech, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400/50 hover:bg-white/10 transition-all flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: KPIs We Track */}
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">KPIs We Track</h3>
                  <p className="text-xs text-slate-300">Speed, conversion & user experience benchmarks</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {kpisList.map((kpi, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-rose-400/50 hover:bg-white/10 transition-all flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{kpi}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 8. SECTION: Why Choose Codigix Infotech */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              The Codigix Distinction
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Codigix Infotech</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Specialized healthcare web developers with a track record of driving genuine patient footfall.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, idx) => {
              const IconC = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#fafcff] border border-slate-200/90 p-7 hover:border-indigo-300 hover:bg-white transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-200/60 flex items-center justify-center text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-5">
                    <IconC className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1053] group-hover:text-indigo-700 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 9. SECTION: CLIENT SUCCESS SHOWCASE (SAME AS SEO PAGE) */}
      {/* ============================================================ */}
      <ClientShowcaseSection
        badgeText="Verified Web Engineering & Client Growth"
        headingPrefix="Why Healthcare Clinics & Enterprises"
        headingGradient="Partner With Codigix Web Team"
        subtitle="Custom Next.js & React development, sub-second load times, mobile-first patient conversion architecture, and 99+ Google Lighthouse scores."
        strategicAdvantageTitle="The Codigix Engineering Advantage"
        strategicAdvantageSubtitle="Enterprise Next.js architecture, high security, frictionless WhatsApp booking, and responsive UI."
        guaranteeTitle="100% Speed & Conversion Guarantee"
        guaranteeQuote='"Every website is built with clean Next.js code, sub-second page speed, and seamless patient booking funnels that convert visitors into appointments."'
      />


      {/* ============================================================ */}
      {/* 10. SECTION: FAQ (Frequently Asked Questions - Responsive 2-Column Grid) */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              Got Questions?
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Questions</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
              Everything you need to know about our healthcare website design, mobile speed optimization, and patient conversion architecture.
            </p>
          </div>

          {/* 2-Column FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-start   mx-auto mb-16">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqs.includes(idx);
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? 'bg-white border-indigo-300 shadow-[0_8px_25px_rgba(99,102,241,0.08)]'
                    : 'bg-[#fafcff] border-slate-200/80 hover:border-slate-300'
                    }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 font-bold text-slate-900 hover:text-indigo-700 transition-colors"
                  >
                    <span className="text-sm sm:text-base leading-snug">{faq.q}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Clean Bottom Contact Strip */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#1a1053] to-[#201060] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Have specific questions about your clinic website?</h3>
                <p className="text-xs sm:text-sm text-indigo-200/80">Speak directly with our healthcare web architecture team.</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#e20b27] to-[#ff2b47] hover:from-[#c20920] hover:to-[#e20b27] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all shrink-0"
            >
              <span>Schedule Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 11. SECTION: Bottom Banner CTA */}
      {/* ============================================================ */}
      <section className="py-16 bg-[#fafcff] relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0a0724] via-[#1a1053] to-[#201060] text-white p-8 sm:p-12 lg:p-14 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">

            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-3 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Ready to Build a Website That Actually Generates Business?
              </h2>
              <p className="text-sm sm:text-base text-indigo-200/90 font-light">
                Get a free UI/UX audit of your existing website or a customized quote for your new clinic portal.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] hover:from-[#d97706] hover:to-[#f59e0b] text-slate-950 font-bold text-sm shadow-xl hover:scale-105 transition-all"
              >
                <span>Book Free Web Consultation</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
