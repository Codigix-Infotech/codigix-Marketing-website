"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ClientShowcaseSection from '@/components/services/ClientShowcaseSection';
import {
  Instagram,
  Share2,
  Video,
  CheckCircle2,
  ArrowRight,
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
  Search,
  Layout,
  Youtube,
  RotateCw,
  Users,
  Eye,
  Check,
  MessageCircle,
  TrendingUp,
  FileText,
  BadgeCheck,
  Smartphone,
  Flame,
  ThumbsUp,
  Play,
  MapPin
} from 'lucide-react';

const whatWeDoList = [
  {
    num: "01",
    title: "Platform Strategy for Instagram, Facebook & LinkedIn",
    desc: "A structured content roadmap tailored to your organization, audience, and geographic area in Pune/PCMC, with clear editorial standards.",
    icon: Share2,
    color: "from-pink-600 to-rose-600",
    bg: "bg-pink-50 text-pink-600 border-pink-200"
  },
  {
    num: "02",
    title: "Institutional Content Creation & Graphic Design",
    desc: "Clear, on-brand carousels, educational infographics, and institutional update graphics that present factual information accurately.",
    icon: Sparkles,
    color: "from-purple-600 to-indigo-600",
    bg: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    num: "03",
    title: "Public-Health Awareness Posts, Reels & Stories",
    desc: "Short-form educational video scripts and posts on public-health awareness, prevention information, and general explanations, based on established consensus.",
    icon: Play,
    color: "from-rose-600 to-red-600",
    bg: "bg-rose-50 text-rose-600 border-rose-200"
  },
  {
    num: "04",
    title: "Community Management & Responsible Engagement",
    desc: "Professional responses to general comments and questions, directing personal medical queries to appropriate channels and never discussing individual patient information publicly.",
    icon: MessageCircle,
    color: "from-blue-600 to-cyan-600",
    bg: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    num: "05",
    title: "Educational Interview & Expert Series",
    desc: "Expert interview series and awareness collaborations with practitioner credentials and registration details clearly disclosed.",
    icon: Users,
    color: "from-amber-600 to-orange-600",
    bg: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    num: "06",
    title: "Monthly Content & Compliance Reporting",
    desc: "Transparent monthly reporting on content published, review status, disclosures applied, and platform insights.",
    icon: BarChart3,
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50 text-emerald-600 border-emerald-200"
  }
];

const whatYouGetCards = [
  {
    icon: Award,
    title: "Clear Institutional Presence",
    desc: "Accurate, consistent institutional and practitioner profiles across your social channels, with credentials and registration disclosed.",
    stat: "Accurate",
    statLabel: "Profile Information",
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50/80 border-blue-200/70"
  },
  {
    icon: Flame,
    title: "Educational Content",
    desc: "Valuable public-health education through clear explainers, awareness posts, and general Q&A stories.",
    stat: "Educational",
    statLabel: "Content Focus",
    color: "from-rose-600 to-pink-600",
    bg: "bg-rose-50/80 border-rose-200/70"
  },
  {
    icon: MessageCircle,
    title: "Responsible Engagement",
    desc: "Professional handling of general queries, with privacy-aware guidance and no discussion of individual medical cases.",
    stat: "Privacy-Aware",
    statLabel: "Community Handling",
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50/80 border-emerald-200/70"
  },
  {
    icon: Share2,
    title: "Multi-Platform Consistency",
    desc: "Consistent messaging across Instagram, Facebook, YouTube, and LinkedIn, with AI-assisted media labelled.",
    stat: "Consistent",
    statLabel: "Cross-Platform Messaging",
    color: "from-purple-600 to-indigo-600",
    bg: "bg-purple-50/80 border-purple-200/70"
  }
];

const socialServicesIncluded = [
  {
    title: "Social Media Management",
    subtitle: "Complete Platform Handling",
    desc: "End-to-end management of your organization's Instagram, Facebook & LinkedIn pages with planned, reviewed posting.",
    icon: Share2,
    color: "text-blue-600 bg-blue-50 border-blue-200/70",
    pill: "Full Management",
    points: ["Planned story updates & regular feed posts", "Profile consistency & bio accuracy", "Hashtag curation for accurate discoverability"]
  },
  {
    title: "Paid Social Awareness",
    subtitle: "Policy-Compliant Campaigns",
    desc: "Targeted, policy-compliant social campaigns with clear, truthful messaging and transparent audience disclosures.",
    icon: Target,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200/70",
    pill: "Transparent Targeting",
    points: ["Truthful, non-soliciting ad copy", "Transparent audience disclosures", "No inducements or cure promises"]
  },
  {
    title: "Educational Video Production",
    subtitle: "Public-Health Explainers",
    desc: "Educational videos on public-health topics, department introductions, and facility overviews, with practitioner credentials disclosed.",
    icon: Video,
    color: "text-pink-600 bg-pink-50 border-pink-200/70",
    pill: "Educational Video",
    points: ["Script writing with practitioner review", "Professional video editing & captions", "AI-assisted media clearly labelled"]
  },
  {
    title: "WhatsApp Business Communication",
    subtitle: "Structured Communication",
    desc: "Set up business communication flows for general information, with clear privacy notices and no collection of medical records.",
    icon: Smartphone,
    color: "text-teal-600 bg-teal-50 border-teal-200/70",
    pill: "Business Messaging",
    points: ["Clear greeting & information menu", "Privacy notice on first contact", "Guidance not to share medical records"]
  },
  {
    title: "Practitioner Profile Content",
    subtitle: "Credential Disclosure",
    desc: "Accurate practitioner profile content that discloses qualifications and registration details, built around medical ethics and patient education.",
    icon: Activity,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200/70",
    pill: "Credentials Disclosed",
    points: ["Verified qualifications & registration numbers", "Educate on general health topics", "Avoid comparative or superlative claims"]
  },
  {
    title: "Verification & Profile Accuracy",
    subtitle: "Official Profile Setup",
    desc: "Assistance with official platform verification and accurate business profile information, where applicable.",
    icon: BadgeCheck,
    color: "text-amber-600 bg-amber-50 border-amber-200/60",
    pill: "Verification",
    points: ["Meta verification submission support", "WhatsApp official business account setup", "Institutional brand protection"]
  }
];

const strategySteps = [
  {
    phase: "01",
    stepNum: 1,
    name: "Research",
    time: "Days 1–3",
    title: "Scope & Regulatory Review",
    stage: "Scope Audit",
    timeline: "Days 1–3",
    icon: Search,
    deliverable: "Content Scope & Disclosure Checklist",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200",
    boxBg: "bg-blue-50/70 border-blue-200/90",
    points: [
      "Review of existing social content for accuracy and disclosures",
      "Identification of public-health topics suited to education",
      "Confirmation of applicable NMC, NDC, or AYUSH communication principles"
    ]
  },
  {
    phase: "02",
    stepNum: 2,
    name: "Calendar",
    time: "Days 4–7",
    title: "Monthly Content Architecture & Calendaring",
    stage: "Content Strategy",
    timeline: "Days 4–7",
    icon: Layout,
    deliverable: "30-Day Content Plan with Review Schedule",
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200",
    boxBg: "bg-purple-50/70 border-purple-200/90",
    points: [
      "Content pillars: Educational, Institutional Updates & Awareness",
      "Practitioner recording schedule with reviewed scripts",
      "Source references noted for each educational topic"
    ]
  },
  {
    phase: "03",
    stepNum: 3,
    name: "Production",
    time: "Weeks 2–3",
    title: "Educational Video Reels & Carousels",
    stage: "Creative Production",
    timeline: "Weeks 2–3",
    icon: Video,
    deliverable: "Edited Educational Videos & Carousels",
    badgeBg: "bg-pink-50 text-pink-600 border-pink-200",
    boxBg: "bg-pink-50/70 border-pink-200/90",
    points: [
      "Captions, visuals, and clear explanatory animations",
      "Educational carousels with accurate institutional branding",
      "General Q&A stories with privacy-safe questions"
    ]
  },
  {
    phase: "04",
    stepNum: 4,
    name: "Publishing",
    time: "Ongoing",
    title: "Multi-Platform Scheduling & Publishing",
    stage: "Platform Distribution",
    timeline: "Ongoing",
    icon: Share2,
    deliverable: "Scheduled Multi-Channel Distribution",
    badgeBg: "bg-amber-50 text-amber-600 border-amber-200",
    boxBg: "bg-amber-50/70 border-amber-200/90",
    points: [
      "Scheduled posting after pre-publication review",
      "Accurate Pune & PCMC location tagging",
      "Consistent publishing across Instagram, Facebook & LinkedIn"
    ]
  },
  {
    phase: "05",
    stepNum: 5,
    name: "Paid Boost",
    time: "Weeks 3–4",
    title: "Policy-Compliant Awareness Boosts",
    stage: "Paid Amplification",
    timeline: "Weeks 3–4",
    icon: Zap,
    deliverable: "Transparent Paid Awareness Campaigns",
    badgeBg: "bg-rose-50 text-rose-600 border-rose-200",
    boxBg: "bg-rose-50/70 border-rose-200/90",
    points: [
      "Location-based awareness campaigns with clear disclosures",
      "Boosting of educational content, not promotional offers",
      "Truthful ad copy with no inducements or cure promises"
    ]
  },
  {
    phase: "06",
    stepNum: 6,
    name: "Community",
    time: "Ongoing",
    title: "Community Management & Reporting",
    stage: "Engagement & Review",
    timeline: "Ongoing",
    icon: MessageCircle,
    deliverable: "Monthly Content & Compliance Report",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    boxBg: "bg-emerald-50/70 border-emerald-200/90",
    points: [
      "Professional responses to general comments and questions",
      "Redirection of personal medical queries to appropriate channels",
      "Monthly report on content published, disclosures, and platform insights"
    ]
  }
];

const whyChooseCodigix = [
  {
    title: "Ethics-First Approach",
    desc: "We understand medical terminology, patient sensitivities, and healthcare communication ethics, and apply a pre-publication review to every piece of content.",
    icon: ShieldCheck
  },
  {
    title: "Educational, Not Promotional",
    desc: "Every post and video is built to inform and educate on public-health topics, not to solicit or promote.",
    icon: Target
  },
  {
    title: "Transparent Reporting",
    desc: "We report on content published, disclosures applied, and platform insights so you always know what is live.",
    icon: BarChart3
  },
  {
    title: "Healthcare Experience",
    desc: "Experience working with doctors, dental clinics, specialty practices, and multi-specialty hospitals under the relevant NMC, NDC, and AYUSH principles.",
    icon: Award
  },
  {
    title: "Local Understanding",
    desc: "Familiarity with Pune & PCMC languages and neighborhoods, used to keep content clear and relevant.",
    icon: Globe
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
    services: "Social content, web pages, accurate local listings",
    result: "Responsive Website Refresh",
    highlight: "Clear service pages"
  }
];

const toolsList = [
  "Meta Business Suite & Creator Studio",
  "Canva Pro & Adobe Creative Cloud",
  "CapCut & Premiere Pro for Educational Video",
  "WhatsApp Business Platform",
  "Social Media Insights & Analytics Tools",
  "Content Review & Approval Workflow"
];

const kpiList = [
  "Content Published vs. Planned Calendar",
  "Disclosure Checklist Completion",
  "AI-Assisted Media Labelling Status",
  "Pre-Publication Review Status",
  "Platform Insights (Reach & Engagement)",
  "Profile Information Accuracy"
];

const faqs = [
  {
    q: "Why does social media matter for healthcare organizations?",
    a: "Many people look for general health information on Instagram and Facebook. A clear, educational and accurate social presence helps organizations share public-health awareness content and institutional updates responsibly."
  },
  {
    q: "Do you write scripts and produce educational videos?",
    a: "Yes. We provide end-to-end video support: researching public-health topics, writing clear scripts based on established consensus, guiding camera delivery, and editing videos with captions and graphics. Practitioner credentials are disclosed and AI-assisted media is labelled."
  },
  {
    q: "How often will you post on our social media channels?",
    a: "We agree a publishing calendar with you based on your goals and review capacity. Typical plans combine educational reels and carousels with regular stories, always subject to pre-publication review."
  },
  {
    q: "Can you help with platform verification?",
    a: "Yes. We assist with the documentation and submission process for official Meta verification and a WhatsApp official business account, where eligible. We cannot guarantee that a platform will approve a request."
  },
  {
    q: "Do you use patient testimonials or before-and-after content?",
    a: "No. For medical engagements we do not publish promotional patient testimonials, before-and-after content, or reviews as marketing. Our content focuses on public-health education and factual institutional information."
  },
  {
    q: "Is social media content compliant with medical advertising ethics?",
    a: "Our medical-engagement content follows NMC (allopathic/hospital), NDC (dental), and AYUSH (Ayurvedic) communication principles, with credential disclosures and an internal pre-publication review. Data is handled in line with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (and 2025 Rules)."
  }
];

export default function SocialMediaMarketingPage() {
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
      setActivePhase((prev) => (prev + 1) % strategySteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPhasePaused, phaseInView]);

  // Smooth calm scroll phase cards one by one when activePhase changes (NO SLIDER, NO SNAP CONFLICT)
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
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-pink-400/10 via-rose-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/10 via-purple-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-amber-400/10 to-transparent rounded-full blur-3xl" />
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
              <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-100">
                <Instagram size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Educational Reach</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Awareness Videos</p>
              </div>
            </motion.div>

            {/* Bottom Left */}
            <motion.div
              animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, 15px) rotate(1deg)", "translate(0px, 0px) rotate(0deg)"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] left-[5%] xl:left-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Users size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Community</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Responsible Engagement</p>
              </div>
            </motion.div>

            {/* Top Right */}
            <motion.div
              animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, 15px) rotate(1deg)", "translate(0px, 0px) rotate(0deg)"] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-[15%] right-[2%] xl:right-[8%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <TrendingUp size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Disclosures</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Credentials Disclosed</p>
              </div>
            </motion.div>

            {/* Bottom Right */}
            <motion.div
              animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, -15px) rotate(-1deg)", "translate(0px, 0px) rotate(0deg)"] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-[25%] right-[5%] xl:right-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
            >
              <div className="w-8 h-8 rounded-full bg-rose-50 text-[#e20b27] flex items-center justify-center shrink-0 border border-rose-100">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Compliance</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Ethics-Aligned Content</p>
              </div>
            </motion.div>
          </div>

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm mb-7 relative z-20">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#1a1053] tracking-wide">
              Social Media & Educational Video
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#1a1053] tracking-tight leading-[1.1] mb-6 max-w-4xl relative z-20">
            Public-Health Awareness & <br className="hidden lg:block" /> Institutional Updates.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] mt-3">
              Clear, Credentialed, Responsible.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto mb-10 relative z-20">
            Our social media services help hospitals, clinics, and enterprises share structured educational video and social content focused on public-health awareness, institutional updates, and clear explanations, with practitioner credential disclosures and AI source labels where applicable.
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/80 shadow-xs text-xs font-bold text-pink-700 tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-600"></span>
              </span>
              <span>Our Execution Deliverables</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight leading-[1.15]">
              Comprehensive <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Educational Social Content Services
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              A structured social media content service for doctors, clinics, hospitals, and enterprises, built around accuracy, disclosure, and educational communication.
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
                  className="group flex flex-col justify-between p-7 lg:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_2px_12px_rgba(26,16,83,0.03)] hover:shadow-[0_20px_40px_rgba(236,72,153,0.08)] hover:border-pink-300 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle Hover Gradient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="w-13 h-13 rounded-2xl bg-slate-50 text-[#1a1053] flex items-center justify-center border border-slate-200 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600 transition-all duration-300 shadow-xs group-hover:scale-105">
                        <IconComp size={24} strokeWidth={1.75} />
                      </div>
                      <span className="font-mono text-sm font-extrabold text-pink-600 bg-pink-50/80 px-3 py-1 rounded-full border border-pink-100">
                        {item.num}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-lg lg:text-xl font-bold text-[#1a1053] mb-3 group-hover:text-pink-700 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 font-light text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-pink-600 group-hover:text-pink-700">
                    <span>Explore Deliverable</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 3: SOCIAL MEDIA IS NOT ABOUT POSTING — IT'S ABOUT POSITIONING */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 max-w-7xl m-auto">
          <div className="rounded-3xl bg-gradient-to-br from-white via-pink-50/30 to-rose-50/20 border border-pink-200/60 shadow-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

              {/* Left Column: Growth Engine Infographic */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl bg-white border border-slate-200/90 shadow-lg p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-600 uppercase">Content Process</span>
                    <span className="text-xs font-bold text-pink-600">Reviewed Content</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-pink-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                        <span className="text-xs font-bold text-slate-800">Planned, Reviewed Content</span>
                      </div>
                      <span className="text-[11px] text-pink-600 font-semibold">Accuracy</span>
                    </div>

                    <div className="flex justify-center text-slate-300">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                        <span className="text-xs font-bold text-slate-800">Educational Reels &amp; Posts</span>
                      </div>
                      <span className="text-[11px] text-rose-600 font-semibold">Credentials Disclosed</span>
                    </div>

                    <div className="flex justify-center text-slate-300">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                        <span className="text-xs font-bold text-emerald-900">Responsible Community Management</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-bold">Privacy-Aware</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Copy & Bullet Points */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-800 text-xs font-bold uppercase tracking-wider">
                  Our Approach
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
                  Social Media is Not About Posting — It’s About Accuracy and Clarity
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Social content about health needs care. <br className="hidden sm:inline" />
                  <strong className="text-[#1a1053] font-bold">We treat it as a channel for accurate, educational, responsibly reviewed communication.</strong>
                </p>

                <div className="p-4 rounded-xl bg-pink-50 border-l-4 border-pink-500 text-pink-950 text-sm font-semibold">
                  Your social media becomes a consistent, dependable channel for accurate institutional and public-health information.
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-sm font-bold text-[#1a1053]">At Codigix Infotech, we focus on:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Planned, reviewed educational content</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Public-health awareness topics</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Responsible DM &amp; story engagement</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Practitioner credential disclosure</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 4: WHAT YOU GET WITH OUR STRONG SOCIAL MEDIA */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
              What You Get
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What You Get With Our Social Media Services
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Clear institutional presence and educational content that is accurate, consistent, and responsibly reviewed.
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

                    <h3 className="text-lg font-bold text-[#1a1053] group-hover:text-pink-600 transition-colors">
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
                    <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-pink-50 group-hover:text-pink-600 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 5: WHAT IS INCLUDED IN OUR HEALTHCARE SOCIAL MEDIA SERVICES? */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto border-t border-slate-200/80 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider">
              Comprehensive Service Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What Is Included In Our Social Media Services?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Structured, compliance-aware offerings designed around accuracy, disclosure, and clear educational communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialServicesIncluded.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} shadow-sm`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                        {item.pill}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#1a1053]">{item.title}</h3>
                      <p className="text-xs text-pink-600 font-semibold">{item.subtitle}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      {item.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
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
        {/* SECTION 6: OUR 6-STEP SOCIAL MEDIA STRATEGY & GROWTH ROADMAP */}
        {/* ========================================================================= */}
        <section id="strategy" className="py-16 sm:py-24 max-w-7xl m-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-wider">
              Step-by-Step Blueprint
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              Our 6-Step Social Media Process
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              A structured framework for planning, producing, reviewing, and publishing accurate educational content across Pune & PCMC.
            </p>
          </div>

          {/* Ultra-Minimalist Process Stepper Timeline */}
          <div
            onMouseEnter={() => setIsPhasePaused(true)}
            onMouseLeave={() => setIsPhasePaused(false)}
            className="mb-8 w-full px-1"
          >
            <style>{`
              @keyframes segmentProgressSMM {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}</style>

            <div className="flex items-start justify-between w-full">
              {strategySteps.map((stage, sIdx, arr) => {
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
                              animation: 'segmentProgressSMM 5.5s linear forwards',
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
              {strategySteps.map((step, idx) => {
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
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600" />
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
              The Codigix Distinction
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              Why Choose Codigix Infotech
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We understand practitioner schedules, clinical nuances, and the content formats that explain health topics clearly.
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-pink-500/20">
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

            {/* Strategy Audit Call Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1a1053] to-slate-900 text-white p-6 sm:p-7 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Educational Video Discovery Call
                </span>
                <h3 className="text-lg font-bold text-white">Want an educational video plan?</h3>
                <p className="text-xs text-slate-300">We review your specialty and outline educational video topics suited to public-health awareness.</p>
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
          strategicAdvantageTitle="How We Create Content"
          strategicAdvantageSubtitle="Clinical accuracy, clear scripts, and practitioner credential disclosure."
          guaranteeTitle="Ethical Communication Commitment"
          guaranteeQuote='"Every video, script, and visual follows medical communication ethics, with credential disclosures and AI-assisted media labelled."'
        />


        {/* ========================================================================= */}
        {/* SECTION 9: TOOLS & TECHNOLOGIES & KPIS WE TRACK */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto border-t border-slate-200/80 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left: Tools & Technologies */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-[#1a1053] text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Tools &amp; Technologies</h3>
                  <p className="text-xs text-slate-300">Modern content editing and social automation stack</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {toolsList.map((tool, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs font-semibold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: KPIs We Track */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1a1053] to-slate-900 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">KPIs We Track</h3>
                  <p className="text-xs text-slate-300">Indicators we review each month</p>
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
            <span className="inline-block px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              FAQ : <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Frequently Asked Questions</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Everything you need to know about our social media process, educational video production, and verification support.
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
                    ? 'border-pink-300 bg-white shadow-xs ring-2 ring-pink-500/10'
                    : 'border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-[#1a1053] text-sm sm:text-base hover:text-pink-600 transition-colors gap-3 cursor-pointer"
                  >
                    <span className="leading-snug">{faq.q}</span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-pink-600 text-white rotate-180' : 'bg-white border border-slate-200 text-slate-500'
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
          <div className="mt-10 max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border border-pink-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Instagram size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1053]">Need a content and disclosure review?</h4>
                <p className="text-xs text-slate-600">Our team will review your current social profiles and outline accurate, educational content improvements.</p>
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
        {/* SECTION 11: BOTTOM HIGH-CONVERTING CTA BANNER */}
        {/* ========================================================================= */}
        <section className="py-12">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#1a1053] to-slate-900 text-white p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-pink-300">
                <Sparkles className="w-4 h-4" />
                <span>Clear Social Communication</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Plan Educational Social Content?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Let’s plan accurate, educational content with clear credential disclosures and responsible review.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-base shadow-lg shadow-pink-500/20 hover:shadow-xl transition-all"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>Schedule a Discovery Call</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-base transition-colors"
                >
                  <span>View All Services</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
