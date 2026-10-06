"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ClientShowcaseSection from '@/components/services/ClientShowcaseSection';
import {
  FileText,
  BookOpen,
  TrendingUp,
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
  RotateCw,
  Users,
  Eye,
  Check,
  Stethoscope,
  GraduationCap,
  MessageSquare,
  Share2,
  Video,
  PenTool,
  BookmarkCheck,
  HeartPulse,
  Newspaper,
  CheckSquare,
  HelpCircle,
  FolderPlus,
  MapPin
} from 'lucide-react';

const whatWeDoList = [
  {
    num: "01",
    title: "Healthcare blog & article writing on medical topics",
    desc: "In-depth, medically accurate, and easy-to-understand articles addressing patient symptoms, treatments, procedures, and wellness advice."
  },
  {
    num: "02",
    title: "Website copy for doctors & clinics",
    desc: "Compelling, patient-focused web copy for specialty service pages, doctor biographies, clinic about sections, and treatment FAQs."
  },
  {
    num: "03",
    title: "Patient education guides & brochures",
    desc: "Comprehensive pre-op & post-op guides, disease management handbooks, and clinical brochures designed to reassure and inform patients."
  },
  {
    num: "04",
    title: "Social media & video scripts for healthcare professionals",
    desc: "Engaging, high-retention video scripts for Instagram Reels, YouTube health explainers, and doctor Q&A thought leadership videos."
  },
  {
    num: "05",
    title: "SEO-optimized medical content for search rankings",
    desc: "Keyword-targeted clinical content aligned with Google's E-E-A-T guidelines to rank your practice for high-intent health search queries."
  },
  {
    num: "06",
    title: "Doctor profile & bio writing for reputation building",
    desc: "Authoritative, credential-rich doctor bios and clinical achievements highlighting your medical qualifications, fellowships, and experience."
  }
];

const whatYouGet = [
  {
    icon: ShieldCheck,
    title: "Increased Patient Trust",
    desc: "Build unwavering credibility with scientifically accurate, empathetic medical content that addresses patient fears and queries.",
    badge: "Credibility",
    color: "from-blue-600 to-indigo-600"
  },
  {
    icon: Search,
    title: "Better Google Rankings",
    desc: "Dominate Google search results with authoritative medical content written to strictly satisfy Google E-E-A-T and medical algorithms.",
    badge: "Top 3 Rank",
    color: "from-emerald-600 to-teal-600"
  },
  {
    icon: Eye,
    title: "Higher Patient Engagement",
    desc: "Educate prospective patients before their visit, drastically reducing clinic enquiry time and building pre-consultation rapport.",
    badge: "5.2x Retention",
    color: "from-purple-600 to-pink-600"
  },
  {
    icon: TrendingUp,
    title: "More Appointment Bookings",
    desc: "Turn educated, informed readers into confident clinic patients through strategic call-to-actions and reassuring medical copy.",
    badge: "+180% Inquiries",
    color: "from-amber-600 to-orange-600"
  }
];

const contentTypes = [
  {
    icon: Layout,
    title: "Web Pages",
    subtitle: "Specialty & Service Pages",
    desc: "High-converting treatment pages, procedure descriptions, and clinic overview content optimized for conversions."
  },
  {
    icon: Globe,
    title: "Website Content",
    subtitle: "Complete Clinic Websites",
    desc: "Clear, engaging, and professional web pages that establish clinical authority and convert visitors into patients."
  },
  {
    icon: FolderPlus,
    title: "Clinical Case Studies",
    subtitle: "Real Patient Journeys",
    desc: "Documented treatment success stories, clinical breakthroughs, and patient transformation testimonials."
  },
  {
    icon: HelpCircle,
    title: "Patient Health Guides & FAQs",
    subtitle: "Comprehensive Guides",
    desc: "Step-by-step guides answering common patient health concerns, pre-procedure protocols, and recovery tips."
  },
  {
    icon: Award,
    title: "Doctor Thought Leadership & PR",
    subtitle: "Press & Reputation",
    desc: "Featured articles, guest medical columns, newspaper press releases, and doctor authority interviews."
  }
];

const frameworkSteps = [
  {
    step: "01",
    phase: "Phase 01",
    title: "Audience Research & Intent Mapping",
    tagline: "Search Trends & Patient Pain Points",
    desc: "We analyze high-intent patient queries, local search patterns in Pune & PCMC, and competitor content gaps to discover prime opportunities.",
    deliverable: "Patient Persona & Search Gap Blueprint",
    points: [
      "Identify high-intent patient search questions",
      "Competitor medical content gap analysis",
      "Specialty-specific health search trend analysis",
      "Patient persona & fear/pain point mapping"
    ]
  },
  {
    step: "02",
    phase: "Phase 02",
    title: "Content Planning & Topic Strategy",
    tagline: "3-Month Clinical Editorial Roadmap",
    desc: "Structuring high-converting topic clusters, seasonal healthcare campaigns, and doctor review schedules for maximum E-E-A-T impact.",
    deliverable: "Quarterly Clinical Editorial Calendar",
    points: [
      "3-month clinical content roadmap",
      "Seasonal health campaign integration",
      "Search-intent topic clustering",
      "Doctor approval & review calendar"
    ]
  },
  {
    step: "03",
    phase: "Phase 03",
    title: "Medical Content Creation",
    tagline: "Evidence-Based & Medically Reviewed",
    desc: "Drafted by experienced healthcare copywriters with clinical accuracy, empathetic patient guidance, and zero confusing medical jargon.",
    deliverable: "100% Peer-Reviewed Medical Copy",
    points: [
      "Written by expert healthcare copywriters",
      "Strict compliance with medical accuracy",
      "Patient-friendly, easy-to-read language",
      "Clear, actionable patient care takeaways"
    ]
  },
  {
    step: "04",
    phase: "Phase 04",
    title: "Doctor Personal Branding & Reels",
    tagline: "Authority Articles & Video Scripts",
    desc: "Establishing practitioner thought leadership with doctor op-eds, fellowship storytelling, and high-retention video Reel scripts.",
    deliverable: "Doctor Brand Assets & Video Scripts",
    points: [
      "Clinical thought leadership articles",
      "Doctor profile & fellowship storytelling",
      "Engaging 30-60 sec Reel & Short scripts",
      "Interactive medical infographics"
    ]
  },
  {
    step: "05",
    phase: "Phase 05",
    title: "SEO Optimization & Compliance",
    tagline: "Google E-E-A-T & Medical Schema",
    desc: "Embedding medical schema markup, localized keyword targeting, internal linking hubs, and voice search optimization for Google #1 rankings.",
    deliverable: "Full Technical SEO & Schema Deployment",
    points: [
      "Google E-E-A-T strict alignment",
      "Medical schema structured data",
      "Internal linking architecture",
      "Voice search & conversational SEO"
    ]
  },
  {
    step: "06",
    phase: "Phase 06",
    title: "Distribution & Authority Backlinks",
    tagline: "PR Syndication & Multi-Channel Reach",
    desc: "Syndicating articles to authoritative health directories, securing high-DA medical citations, and multi-channel social distribution.",
    deliverable: "High-Authority Citations & Inflow",
    points: [
      "High-DA medical directory syndication",
      "Health publication PR & outreach",
      "Multi-channel social syndication",
      "Authority healthcare backlinks"
    ]
  }
];

const whoWeWorkWith = [
  { role: "Individual Doctors & Surgeons", icon: Stethoscope, focus: "Specialist blogs & doctor personal branding" },
  { role: "Multi-Speciality Hospitals", icon: Activity, focus: "Comprehensive clinical content & patient guides" },
  { role: "Dental & Cosmetic Clinics", icon: Sparkles, focus: "Procedure explainers, before/after case studies" },
  { role: "Diagnostic & Pathology Labs", icon: Cpu, focus: "Test education, health checkup package content" },
  { role: "Pharma & Nutraceutical Brands", icon: ShieldCheck, focus: "Scientific articles, compliant product write-ups" },
  { role: "Ayurveda & Wellness Centers", icon: HeartPulse, focus: "Holistic health blogs & lifestyle care guides" }
];

const whyChooseUs = [
  {
    title: "Healthcare-Focused Expertise",
    desc: "100% dedicated to medical marketing — our copywriters understand medical terminology, patient empathy, and healthcare regulations.",
    icon: Stethoscope
  },
  {
    title: "Medically-Accurate Content",
    desc: "Every article is researched thoroughly from verified medical journals and double-checked for clinical precision and compliance.",
    icon: ShieldCheck
  },
  {
    title: "Multi-Channel Intelligence",
    desc: "From long-form clinical blog posts to viral Instagram Reel scripts and clinic brochures — we create cohesive multi-format content.",
    icon: Share2
  },
  {
    title: "Trust-Based Communication",
    desc: "We write with empathy and clarity, transforming complex medical jargon into reassuring, easily digestible patient guides.",
    icon: HeartPulse
  },
  {
    title: "Local Market Expertise",
    desc: "Deep knowledge of Pune & PCMC patient demographics, local languages, search habits, and community health concerns.",
    icon: Globe
  }
];

const toolsList = [
  "SurferSEO",
  "Grammarly Premium",
  "Ahrefs Content Explorer",
  "SEMrush Topic Research",
  "Google Search Console",
  "Copyscape Plagiarism Checker",
  "PubMed & NCBI Medical Journals",
  "Google Analytics 4"
];

const kpisList = [
  "Organic Patient Traffic Growth",
  "Time on Page / Average Dwell Time",
  "Top 3 Google Keyword Rankings",
  "Patient Inquiries & Form Fills",
  "Bounce Rate Reduction",
  "Content Social Shares & Saves",
  "Doctor Authority & Brand Search Lift"
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
    q: "What is medical content marketing?",
    a: "Medical content marketing is the strategic creation and distribution of accurate, patient-friendly health information — such as blogs, treatment guides, doctor bios, and video scripts. It helps healthcare providers educate prospective patients, build trust, rank higher on Google, and convert online visitors into booked appointments."
  },
  {
    q: "Why is content important for doctors and clinics?",
    a: "Over 77% of patients research their symptoms, conditions, and treatment options online before choosing a healthcare provider. Having authoritative, medically sound content on your website positions you as the go-to specialist, answers patient concerns before their visit, and builds immediate trust."
  },
  {
    q: "Is the medical content clinically reviewed and accurate?",
    a: "Yes. Our healthcare copywriters follow strict clinical reference standards (using peer-reviewed medical journals and health authorities). We also coordinate directly with your clinical team to review and approve all treatment descriptions, ensuring 100% medical accuracy and regulatory compliance."
  },
  {
    q: "How does content marketing generate patient appointments?",
    a: "When patients search for specific symptoms (e.g. 'best treatment for slip disc in Pune'), your high-ranking, well-written guide answers their questions. Reassured by your clinical expertise and empathetic tone, they are guided by clear call-to-actions to book an instant consultation with your clinic."
  },
  {
    q: "What makes Codigix Infotech different from general writing agencies?",
    a: "General agencies write generic, robotic copy with factual inaccuracies. At Codigix Infotech, we specialize exclusively in healthcare. We understand medical ethics, NABH/MCI guidelines, patient psychology, and search algorithms — delivering content that doctors are proud to put their names on."
  }
];

export default function MedicalContentMarketingPage() {
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
      setActivePhase((prev) => (prev + 1) % frameworkSteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPhasePaused, phaseInView]);

  return (
    <div className="min-h-screen bg-[#fafcff] text-slate-800 selection:bg-[#e20b27] selection:text-white">

      {/* ============================================================ */}
      {/* 1. HERO SECTION: Educate Patients. Build Authority. Earn Trust */}
      {/* ============================================================ */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-[#f8fafe] via-white to-[#f4f7fc] overflow-hidden border-b border-slate-200/80 text-center flex flex-col items-center">

        {/* Subtle Decorative Geometry & Background Elements */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#1a1053 1px, transparent 1px), linear-gradient(90deg, #1a1053 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[#e20b27]/8 rounded-full blur-[140px] pointer-events-none" />

        {/* Floating Animated Result Badges */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-visible">
          {/* Top Left */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, -15px) rotate(-1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[2%] xl:left-[8%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Google Search</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">100% E-E-A-T Compliant</p>
            </div>
          </motion.div>

          {/* Bottom Left */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, 15px) rotate(1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] left-[5%] xl:left-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Retention</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">5.2x Patient Engagement</p>
            </div>
          </motion.div>

          {/* Top Right */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, 15px) rotate(1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[15%] right-[2%] xl:right-[8%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <BookOpen size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Authority</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Peer-Reviewed</p>
            </div>
          </motion.div>

          {/* Bottom Right */}
          <motion.div
            animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, -15px) rotate(-1deg)", "translate(0px, 0px) rotate(0deg)"] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[25%] right-[5%] xl:right-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
          >
            <div className="w-8 h-8 rounded-full bg-rose-50 text-[#e20b27] flex items-center justify-center shrink-0 border border-rose-100">
              <Award size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Clinical Trust</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">NABH & MCI Ethics</p>
            </div>
          </motion.div>
        </div>

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm mb-7 relative z-20 mt-8 lg:mt-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold text-[#1a1053] tracking-wide">
            Medical & Healthcare Content Marketing
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#1a1053] tracking-tight leading-[1.1] mb-6 max-w-4xl relative z-20">
          Educate Patients. Build Authority. <br className="hidden lg:block" /> Earn Lasting Trust.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] mt-3">
            More Leads. More Practice Growth.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto mb-10 relative z-20">
          Great healthcare communication is key to patient trust. Codigix Infotech specializes in creating authoritative, compliant, and patient-centric healthcare content that positions you as a trusted leader and authority in your medical specialty.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative z-20">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1053] hover:bg-[#281878] text-white rounded-full font-semibold text-base transition-all shadow-[0_10px_25px_-5px_rgba(26,16,83,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(26,16,83,0.35)] transform hover:-translate-y-0.5"
          >
            <span>Get Free Content Consultation</span>
            <ArrowRight size={18} />
          </Link>
          <a
            href="#what-we-do"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-[#1a1053] rounded-full font-semibold text-base shadow-xs transition-all"
          >
            <span>Explore What We Write</span>
            <ChevronDown size={18} />
          </a>
        </div>

      </section>


      {/* ============================================================ */}
      {/* 2. SECTION: What We Do (01 - 06) */}
      {/* ============================================================ */}
      <section id="what-we-do" className="py-20 lg:py-28 relative bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Specialized Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight leading-[1.15]">
              Comprehensive <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Medical Content & Authority Solutions
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              End-to-end medical content creation crafted to educate patients, satisfy search engines, and establish your clinical authority.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left 6 Accordion-Style Numbered Rows */}
            <div className="lg:col-span-7 space-y-4">
              {whatWeDoList.map((item, idx) => (
                <div
                  key={idx}
                  className="group p-5 sm:p-6 rounded-2xl bg-[#fafcff] hover:bg-white border border-slate-200/80 hover:border-purple-300 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(147,51,234,0.06)] flex items-start gap-4 sm:gap-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/60 flex items-center justify-center font-bold font-mono text-purple-700 text-lg shrink-0 group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1053] group-hover:text-purple-700 transition-colors">
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
              <div className="relative rounded-3xl bg-gradient-to-br from-[#120a3d] via-[#1a1053] to-[#251066] p-8 text-white shadow-2xl border border-purple-500/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                    <PenTool className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight text-white">
                    Specialized Medical Writers & Clinical Reviewers
                  </h3>

                  <p className="text-sm text-purple-200/80 leading-relaxed">
                    Unlike standard marketing agencies, we employ healthcare communicators who understand anatomy, treatments, pharmacology, and patient psychology.
                  </p>

                  <div className="space-y-3 pt-2">
                    {[
                      "100% Plagiarism-Free & Fact-Checked",
                      "Evidence-Based Medical Research",
                      "Optimized for Voice Search & AI Overviews",
                      "Patient-Centered Reading Grade Level"
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
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white text-[#1a1053] hover:bg-purple-50 font-bold text-sm shadow-md transition-all"
                    >
                      <span>Request Sample Content Pack</span>
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
      {/* 3. SECTION: Content That Builds Trust & Converts Patients */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-[#f4f7fc] to-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">
          <div className="relative rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider">
                  <HeartPulse className="w-3.5 h-3.5" />
                  Patient-First Philosophy
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
                  Content That Builds Trust & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Converts Patients</span>
                </h2>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p className="font-semibold text-slate-900">
                    Patients research extensively before booking a consultation:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#fafcff] p-4 rounded-xl border border-slate-200">
                      <div className="text-2xl font-black text-purple-700">77%</div>
                      <div className="text-xs text-slate-600 mt-1">of patients search Google before booking</div>
                    </div>
                    <div className="bg-[#fafcff] p-4 rounded-xl border border-slate-200">
                      <div className="text-2xl font-black text-rose-600">84%</div>
                      <div className="text-xs text-slate-600 mt-1">trust doctor articles as much as in-clinic advice</div>
                    </div>
                    <div className="bg-[#fafcff] p-4 rounded-xl border border-slate-200">
                      <div className="text-2xl font-black text-emerald-600">100%</div>
                      <div className="text-xs text-slate-600 mt-1">medical accuracy required to protect reputation</div>
                    </div>
                  </div>

                  <p className="pt-2">
                    At Codigix Infotech, we ensure your healthcare content is written with medical precision, verified by clinical reviewers, and crafted in empathetic, easy-to-understand language. We transform complex diagnostic procedures into reassuring guidance that converts anxious readers into confident clinic patients.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-900 bg-purple-100/70 px-3 py-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-purple-700" />
                    Doctor-Approved Tone
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-100/70 px-3 py-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-emerald-700" />
                    Google E-E-A-T Optimized
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-900 bg-rose-100/70 px-3 py-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-rose-700" />
                    Zero Jargon Confusion
                  </div>
                </div>
              </div>

              {/* Right Interactive Diagram Card */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-br from-[#1a1053] to-[#2d1b69] rounded-2xl p-6 text-white shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                      Clinical Conversion Journey
                    </span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                      Funnel Matrix
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs font-bold text-purple-300">1. Search & Symptom Awareness</div>
                      <p className="text-[11px] text-slate-300 mt-0.5">Patient searches "causes of persistent knee pain after 40" on Google.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs font-bold text-pink-300">2. Reassuring Doctor Article</div>
                      <p className="text-[11px] text-slate-300 mt-0.5">Discovers your comprehensive, comforting blog post explaining non-surgical and surgical remedies.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs font-bold text-amber-300">3. Authority & Doctor Credentials</div>
                      <p className="text-[11px] text-slate-300 mt-0.5">Reads your specialist bio, hospital affiliations, and real patient case outcomes.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                      <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        4. Appointment Booked
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">Patient clicks WhatsApp / Book Consultation widget with high trust.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 4. SECTION: What You Get With Our Medical Content Marketing */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              Tangible Clinical Value
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What You Get With Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Medical Content Marketing</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Every content piece is an appreciating digital asset that builds long-term authority and patient flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatYouGet.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-3xl bg-[#fafcff] hover:bg-white border border-slate-200/80 hover:border-purple-300 p-8 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(147,51,234,0.08)] flex flex-col justify-between"
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

                    <h3 className="text-lg font-bold text-[#1a1053] group-hover:text-purple-700 transition-colors">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-purple-700 group-hover:text-purple-900 transition-colors">
                    <span>Learn clinical impact</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 5. SECTION: Types of Content We Work On */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-[#fafcff] relative border-y border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <FolderPlus className="w-3.5 h-3.5" />
              Content Formats
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              Types of Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">We Specialize In</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              From long-form clinical web pages to patient brochures and doctor op-eds — we cover every healthcare medium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {contentTypes.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-purple-400 hover:shadow-lg transition-all group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-all mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3 className="text-base font-bold text-[#1a1053] group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </h3>

                    <div className="text-xs font-medium text-purple-600 mb-2">
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
      {/* 6. SECTION: Our Healthcare Content Growth Framework (6 Phases) */}
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" />
              Proven Execution Blueprint
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight">
              Our 6-Phase <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Content Growth Framework</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
              A systematic process ensuring clinical accuracy, Google E-E-A-T dominance, doctor personal branding, and high patient inquiries.
            </p>
          </div>

          {/* Minimalist Animated Stepper Timeline (01 - 06) */}
          <div
            className="mb-14   mx-auto px-2 sm:px-4"
            onMouseEnter={() => setIsPhasePaused(true)}
            onMouseLeave={() => setIsPhasePaused(false)}
          >
            <div className="flex items-start justify-between w-full">
              {frameworkSteps.map((step, idx) => {
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
                    {idx < frameworkSteps.length - 1 && (
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
                              setActivePhase((prev) => (prev + 1) % frameworkSteps.length);
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
              {frameworkSteps.map((step, idx) => {
                const isActive = activePhase === idx;

                return (
                  <div
                    key={idx}
                    data-phase-index={idx}
                    onClick={() => setActivePhase(idx)}
                    onMouseEnter={() => setActivePhase(idx)}
                    className={`relative w-[300px] sm:w-[380px] lg:w-[430px] flex-shrink-0 rounded-3xl p-6 sm:p-7 transition-all duration-500 cursor-pointer flex flex-col justify-between ${isActive
                      ? 'bg-white border-2 border-purple-500 shadow-[0_20px_45px_rgba(147,51,234,0.12)] scale-[1.02] z-10'
                      : 'bg-white/80 border border-slate-200/90 hover:border-purple-300 hover:shadow-lg opacity-75 hover:opacity-100'
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
                            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">
                              {step.phase}
                            </span>
                            <div className="text-xs text-slate-500">{step.tagline}</div>
                          </div>
                        </div>

                        {isActive && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold uppercase tracking-wider animate-pulse">
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
                              className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${isActive ? 'text-purple-600' : 'text-slate-400'
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
                        <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span className="font-semibold text-slate-800 text-[11px] sm:text-xs truncate max-w-[210px] sm:max-w-[280px]">
                          {step.deliverable}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider shrink-0">
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
      {/* 7. SECTION: CLIENT SUCCESS SHOWCASE (SAME AS SEO PAGE) */}
      {/* ============================================================ */}
      <ClientShowcaseSection
        badgeText="Verified Clinical Authority & Patient Growth"
        headingPrefix="Why Healthcare Clinics & Practitioners"
        headingGradient="Trust Codigix Medical Content"
        subtitle="Medically reviewed, Google E-E-A-T compliant articles, doctor personal branding, and high-converting patient guides across Pune & PCMC."
        strategicAdvantageTitle="The Codigix Clinical Advantage"
        strategicAdvantageSubtitle="Written by healthcare communicators, strictly verified for clinical accuracy and MCI compliance."
        guaranteeTitle="100% Medical Accuracy & E-E-A-T Compliance"
        guaranteeQuote='"Every piece of healthcare content is verified against clinical standards, ensuring your practice builds genuine trust and ranks #1 on Google."'
      />


      {/* ============================================================ */}
      {/* 8. SECTION: Why Choose Codigix Infotech */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              The Codigix Edge
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Codigix Infotech</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              We bridge medical science and patient communication like no other agency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, idx) => {
              const IconC = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#fafcff] border border-slate-200/90 p-7 hover:border-purple-300 hover:bg-white transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/60 flex items-center justify-center text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-all mb-5">
                    <IconC className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1053] group-hover:text-purple-700 transition-colors mb-2">
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
      {/* ============================================================ */}
      {/* 9. SECTION: Tools & Technologies We Use & KPIs We Track (SIDE-BY-SIDE BENTO - NO CLICKS NEEDED) */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-[#0f0728] via-[#1a1053] to-[#120a3d] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px] relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
              Data & Technology Stack
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Enterprise Tools & Transparent KPIs
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mt-4">
              We combine industry-leading SEO suites with clinical research tools and track transparent growth KPIs on live monthly client dashboards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Card: Tools & Technologies */}
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Tools & Technologies</h3>
                  <p className="text-xs text-slate-300">Enterprise content intelligence & SEO stack</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {toolsList.map((tool, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: KPIs We Track */}
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">KPIs We Track</h3>
                  <p className="text-xs text-slate-300">Authority metrics and patient inquiry telemetry</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {kpisList.map((kpi, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-rose-400/50 hover:bg-white/10 transition-all flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4" />
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
      {/* 10. SECTION: FAQ (Frequently Asked Questions - Responsive 2-Column Grid) */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-[#fafcff] relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              Have Questions?
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Questions</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
              Everything you need to know about our healthcare content marketing, clinical accuracy protocols, and patient conversion frameworks.
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
                    ? 'bg-white border-purple-300 shadow-[0_8px_25px_rgba(147,51,234,0.08)]'
                    : 'bg-white/70 border-slate-200/80 hover:border-slate-300'
                    }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 font-bold text-slate-900 hover:text-purple-700 transition-colors"
                  >
                    <span className="text-sm sm:text-base leading-snug">{faq.q}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'
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
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#1a1053] to-[#251066] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Have a specific medical specialty in mind?</h3>
                <p className="text-xs sm:text-sm text-purple-200/80">We craft custom content strategies across all medical & surgical specialties.</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#e20b27] to-[#ff2b47] hover:from-[#c20920] hover:to-[#e20b27] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all shrink-0"
            >
              <span>Ask a Specialist</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 11. SECTION: Bottom Banner CTA */}
      {/* ============================================================ */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#120a3d] via-[#1a1053] to-[#251066] text-white p-8 sm:p-12 lg:p-14 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">

            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-3 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Ready to Build Trust & Attract More Patients?
              </h2>
              <p className="text-sm sm:text-base text-purple-200/90 font-light">
                Get a free healthcare content audit and custom topic strategy for your practice.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#e20b27] to-[#b8061e] hover:from-[#c20920] hover:to-[#e20b27] text-white font-bold text-sm shadow-xl shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 transition-all"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
