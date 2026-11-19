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
    title: "Public-health articles on established medical topics",
    desc: "Clear, accurate, and easy-to-understand articles on general health topics, prevention, and wellness, written from established consensus and referenced sources."
  },
  {
    num: "02",
    title: "Institutional website copy",
    desc: "Factual web copy for department pages, practitioner profiles, facility information, and general FAQs, with credentials and registration details disclosed."
  },
  {
    num: "03",
    title: "Public-health education guides & brochures",
    desc: "General information guides and brochures that explain what to expect in plain language, without promotional claims or outcome promises."
  },
  {
    num: "04",
    title: "Educational video scripts",
    desc: "Clear scripts for public-health explainers and institutional introductions, with practitioner credentials disclosed and AI-assisted media labelled."
  },
  {
    num: "05",
    title: "Search-structured informational content",
    desc: "Well-organized informational content with clear headings and structured data, so accurate information is easy for people and search engines to find."
  },
  {
    num: "06",
    title: "Practitioner profile writing",
    desc: "Accurate practitioner profiles listing qualifications, registration numbers, and experience, written factually and without superlatives."
  }
];

const whatYouGet = [
  {
    icon: ShieldCheck,
    title: "Accurate, Reviewed Content",
    desc: "Content written from established consensus and referenced sources, reviewed for factual accuracy before publication.",
    badge: "Accuracy",
    color: "from-blue-600 to-indigo-600"
  },
  {
    icon: Search,
    title: "Clear Information Structure",
    desc: "Logical headings, structured data, and internal linking that make accurate information easy to find, without any ranking guarantees.",
    badge: "Structure",
    color: "from-emerald-600 to-teal-600"
  },
  {
    icon: Eye,
    title: "Public-Health Education",
    desc: "Educational material that helps the public understand general health topics before speaking to a qualified practitioner.",
    badge: "Education",
    color: "from-purple-600 to-pink-600"
  },
  {
    icon: TrendingUp,
    title: "Compliance Review",
    desc: "Credential and registration disclosures, source notes, and AI-assistance labelling reviewed before each piece goes live.",
    badge: "Disclosures",
    color: "from-amber-600 to-orange-600"
  }
];

const contentTypes = [
  {
    icon: Layout,
    title: "Web Pages",
    subtitle: "Department & Service Pages",
    desc: "Factual department pages, service descriptions, and institutional overview content that explain what is offered and who provides it."
  },
  {
    icon: Globe,
    title: "Website Content",
    subtitle: "Complete Institutional Websites",
    desc: "Clear, professional web pages with accurate institutional details, credentials, and privacy notices."
  },
  {
    icon: FolderPlus,
    title: "Institutional Profiles",
    subtitle: "Accurate Organizational Information",
    desc: "Accurate profiles of departments, facilities, and practitioners, based on verified information. No patient stories or testimonials."
  },
  {
    icon: HelpCircle,
    title: "Public Health Guides & FAQs",
    subtitle: "Comprehensive Guides",
    desc: "Step-by-step general guides on common health topics, with a clear note that they do not replace advice from a qualified practitioner."
  },
  {
    icon: Award,
    title: "Practitioner Articles & Interviews",
    subtitle: "Educational Features",
    desc: "Educational articles and interviews by practitioners, with credentials and registration disclosed."
  }
];

const frameworkSteps = [
  {
    step: "01",
    phase: "Phase 01",
    title: "Topic Research & Source Mapping",
    tagline: "Established Consensus & Reliable Sources",
    desc: "We identify the public-health topics your audience asks about and map reliable, established sources and published literature for each.",
    deliverable: "Topic List & Source Map",
    points: [
      "Identify frequently asked general health questions",
      "Map established guidelines and published literature",
      "Review existing site content for accuracy gaps",
      "Confirm the applicable NMC, NDC, or AYUSH framework"
    ]
  },
  {
    step: "02",
    phase: "Phase 02",
    title: "Content Planning & Topic Structure",
    tagline: "Quarterly Editorial Roadmap",
    desc: "Structuring topic clusters, seasonal public-health awareness themes, and practitioner review schedules.",
    deliverable: "Quarterly Editorial Calendar",
    points: [
      "3-month content roadmap",
      "Seasonal public-health awareness integration",
      "Topic clustering for clear site structure",
      "Practitioner review & approval calendar"
    ]
  },
  {
    step: "03",
    phase: "Phase 03",
    title: "Content Creation",
    tagline: "Referenced & Practitioner-Reviewed",
    desc: "Drafted by healthcare writers with attention to clinical accuracy and plain language, and reviewed by your clinical team before publication.",
    deliverable: "Reviewed, Source-Referenced Copy",
    points: [
      "Written by experienced healthcare writers",
      "References to established sources and published literature",
      "Plain, easy-to-read language",
      "No cure promises, superlatives, or outcome claims"
    ]
  },
  {
    step: "04",
    phase: "Phase 04",
    title: "Practitioner Profiles & Educational Video",
    tagline: "Credentials Disclosed",
    desc: "Accurate practitioner profiles, educational articles, and video scripts, with credentials and registration disclosed and AI assistance labelled.",
    deliverable: "Practitioner Profiles & Video Scripts",
    points: [
      "Factual practitioner profile pages",
      "Qualification and registration disclosure",
      "Clear educational video scripts",
      "Informational graphics with source notes"
    ]
  },
  {
    step: "05",
    phase: "Phase 05",
    title: "Structured Data & Compliance Review",
    tagline: "Schema & Pre-Publication Review",
    desc: "Adding appropriate schema markup, accurate metadata, and internal linking, then completing a pre-publication review for accuracy, disclosures, privacy, and AI labelling.",
    deliverable: "Structured Data & Review Sign-Off",
    points: [
      "Structured data and metadata",
      "Internal linking architecture",
      "Pre-publication accuracy review",
      "AI-assistance labelling check"
    ]
  },
  {
    step: "06",
    phase: "Phase 06",
    title: "Publication & Ongoing Maintenance",
    tagline: "Publication Details & Updates",
    desc: "Publishing with date, author, reviewer, and reference notes, and keeping content up to date as guidance changes.",
    deliverable: "Published Content with Review Notes",
    points: [
      "Publication date, author, and reviewer notes",
      "Reference list on educational articles",
      "Scheduled content accuracy reviews",
      "Updates when guidance changes"
    ]
  }
];

const whoWeWorkWith = [
  { role: "Individual Doctors & Surgeons", icon: Stethoscope, focus: "Accurate practitioner profiles & educational articles" },
  { role: "Multi-Speciality Hospitals", icon: Activity, focus: "Department guides & public-health information" },
  { role: "Dental Clinics (NDC framework)", icon: Sparkles, focus: "Procedure explainers & oral-health education" },
  { role: "Diagnostic & Pathology Labs", icon: Cpu, focus: "General test information & preparation guides" },
  { role: "Organizations & Enterprises", icon: ShieldCheck, focus: "Clear informational content for non-clinical audiences" },
  { role: "Ayurveda Practices (AYUSH framework)", icon: HeartPulse, focus: "Informational wellness articles under AYUSH principles" }
];

const whyChooseUs = [
  {
    title: "Healthcare Communication Experience",
    desc: "Our writers understand medical terminology, plain-language communication, and healthcare communication ethics.",
    icon: Stethoscope
  },
  {
    title: "Accuracy & Source Notes",
    desc: "Every article is researched from established sources and published literature, then reviewed for clinical accuracy and compliance.",
    icon: ShieldCheck
  },
  {
    title: "Consistent Multi-Format Content",
    desc: "From long-form articles to video scripts and brochures, we keep information consistent across formats.",
    icon: Share2
  },
  {
    title: "Clear, Calm Communication",
    desc: "We write with clarity, turning complex medical terms into plain, easy-to-understand information.",
    icon: HeartPulse
  },
  {
    title: "Local Understanding",
    desc: "Familiarity with Pune & PCMC languages and community health topics, used to keep content clear and relevant.",
    icon: Globe
  }
];

const toolsList = [
  "Grammarly Premium",
  "Google Search Console",
  "Copyscape Plagiarism Checker",
  "PubMed & NCBI Medical Journals",
  "Google Analytics 4",
  "Schema Markup Validators",
  "Accessibility Checkers",
  "Editorial Review Workflow"
];

const kpisList = [
  "Content Accuracy Review Status",
  "Credential & Registration Disclosure Status",
  "Source & Reference Coverage",
  "AI-Assistance Labelling Status",
  "Readability & Accessibility Checks",
  "Structured Data Validity",
  "Content Freshness & Update Schedule"
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

const faqs = [
  {
    q: "What is health and institutional content architecture?",
    a: "It is the planning, writing, and organization of accurate, plain-language health information, such as department guides, public-health articles, practitioner profiles, and video scripts, written for clarity and reviewed for compliance before publication."
  },
  {
    q: "Why is clear content important for healthcare organizations?",
    a: "Many people look up health information online. Accurate, well-organized content helps the public understand general health topics and helps organizations present their facilities, departments, and practitioners factually."
  },
  {
    q: "Is the content reviewed and accurate?",
    a: "Our writers use established consensus, published literature, and recognised health authorities as sources. We coordinate with your clinical team to review and approve descriptions before publication. We do not make cure promises or outcome claims."
  },
  {
    q: "Do you publish patient stories or testimonials?",
    a: "No. For medical engagements we do not publish patient testimonials, before-and-after content, or review ratings as marketing. Any case examples are anonymised, drawn from published literature, and used only for education."
  },
  {
    q: "What makes Codigix Infotech different from general writing agencies?",
    a: "We apply an internal pre-publication review covering factual accuracy, credential and registration disclosures, privacy safeguards, and AI labelling, and we follow NMC (allopathic/hospital), NDC (dental), and AYUSH (Ayurvedic) communication principles for healthcare engagements."
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
      {/* 1. HERO SECTION */}
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
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Information</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Source-Referenced</p>
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
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Education</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Plain-Language Guides</p>
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
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Review</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Practitioner-Reviewed</p>
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
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Ethics</p>
              <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">NMC, NDC & AYUSH Principles</p>
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
            Health & Institutional Content Architecture
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#1a1053] tracking-tight leading-[1.1] mb-6 max-w-4xl relative z-20">
          Accurate Public-Health Education <br className="hidden lg:block" /> and Institutional Content.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] mt-3">
            Clear, Referenced, Reviewed.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto mb-10 relative z-20">
          Codigix Infotech helps healthcare organizations create well-organized informational pages, department guides, and public-health articles, written for clarity and accuracy and reviewed for compliance prior to publication.
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
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight leading-[1.15]">
              Comprehensive <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Health & Institutional Content Solutions
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              End-to-end content creation crafted to educate the public, present institutions accurately, and keep information easy to find.
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
                    We work with healthcare communicators who understand anatomy, treatments, and pharmacology, and who write for clarity and accuracy.
                  </p>

                  <div className="space-y-3 pt-2">
                    {[
                      "Plagiarism-Checked & Fact-Checked",
                      "Evidence-Based Medical Research",
                      "Structured for Clear Search Discoverability",
                      "Plain-Language Reading Level"
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
                      <span>Request a Sample Content Outline</span>
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
      {/* 3. SECTION: Content That Informs */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-[#f4f7fc] to-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">
          <div className="relative rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider">
                  <HeartPulse className="w-3.5 h-3.5" />
                  Accuracy-First Philosophy
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
                  Content That Informs & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Stays Accurate</span>
                </h2>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p className="font-semibold text-slate-900">
                    Many people look up health information online, so our content standards matter:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#fafcff] p-4 rounded-xl border border-slate-200">
                      <div className="text-2xl font-black text-purple-700">Sourced</div>
                      <div className="text-xs text-slate-600 mt-1">every educational claim traced to an established source</div>
                    </div>
                    <div className="bg-[#fafcff] p-4 rounded-xl border border-slate-200">
                      <div className="text-2xl font-black text-rose-600">Reviewed</div>
                      <div className="text-xs text-slate-600 mt-1">by your clinical team before publication</div>
                    </div>
                    <div className="bg-[#fafcff] p-4 rounded-xl border border-slate-200">
                      <div className="text-2xl font-black text-emerald-600">Disclosed</div>
                      <div className="text-xs text-slate-600 mt-1">credentials, registration, and AI assistance</div>
                    </div>
                  </div>

                  <p className="pt-2">
                    At Codigix Infotech, we ensure your healthcare content is written with medical precision, verified by clinical reviewers, and crafted in plain, easy-to-understand language. We turn complex medical topics into clear general information, without promotional claims or cure promises.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-900 bg-purple-100/70 px-3 py-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-purple-700" />
                    Practitioner-Reviewed
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-100/70 px-3 py-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-emerald-700" />
                    Source-Referenced
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-900 bg-rose-100/70 px-3 py-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-rose-700" />
                    Plain Language
                  </div>
                </div>
              </div>

              {/* Right Interactive Diagram Card */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-br from-[#1a1053] to-[#2d1b69] rounded-2xl p-6 text-white shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                      Content Review Journey
                    </span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                      Review Steps
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs font-bold text-purple-300">1. Topic & Source Research</div>
                      <p className="text-[11px] text-slate-300 mt-0.5">We identify a general health topic and gather established sources and guidelines.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs font-bold text-pink-300">2. Plain-Language Draft</div>
                      <p className="text-[11px] text-slate-300 mt-0.5">A writer drafts a clear, balanced general explainer with source notes.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs font-bold text-amber-300">3. Practitioner Review</div>
                      <p className="text-[11px] text-slate-300 mt-0.5">Your clinical team reviews the draft and credentials and registration details are added.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                      <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        4. Compliance Review & Publication
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">Pre-publication check for accuracy, privacy, and AI labelling, then publication with date and reviewer notes.</p>
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
              What You Get
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What You Get With Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Health & Institutional Content</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Every content piece is a durable, accurate reference for your organization that is kept up to date.
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
                    <span>Learn more</span>
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
              From department web pages to public-health brochures and practitioner articles — we cover the main formats an institution needs.
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
      {/* 6. SECTION: Our Content Process (6 Phases) */}
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
              Our Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight">
              Our 6-Phase <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Content Process</span>
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
              A systematic process ensuring clinical accuracy, credential disclosure, privacy safeguards, and clear source notes.
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
                        Reviewed
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
        badgeText="Selected Work by Regulatory Scope"
        headingPrefix="Organizations Across Pune & PCMC"
        headingGradient="Work With Codigix Infotech"
        subtitle="Website architecture, factual service pages, and technical hygiene for healthcare organizations (NMC and NDC frameworks) and non-medical businesses, which sit outside NMC scope."
        strategicAdvantageTitle="How We Write"
        strategicAdvantageSubtitle="Written by healthcare communicators and reviewed for clinical accuracy before publication."
        guaranteeTitle="Ethical Communication Commitment"
        guaranteeQuote='"Every piece of healthcare content is reviewed for accuracy, credential disclosure, privacy safeguards, and AI labelling before it is published."'
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
              We bridge medical science and plain-language public communication.
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
              Tools & Review Indicators
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mt-4">
              We combine editorial and search tools with clinical research sources and report on review and accuracy indicators.
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
                  <p className="text-xs text-slate-300">Content, research & structured-data stack</p>
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
                  <p className="text-xs text-slate-300">Accuracy, disclosure, and review indicators</p>
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
              Everything you need to know about our content process and clinical accuracy protocols.
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
                <p className="text-xs sm:text-sm text-purple-200/80">We plan content across medical and surgical specialties under the relevant NMC, NDC, or AYUSH framework.</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#e20b27] to-[#ff2b47] hover:from-[#c20920] hover:to-[#e20b27] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all shrink-0"
            >
              <span>Talk to Our Team</span>
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
                Ready to Plan Accurate, Reviewed Content?
              </h2>
              <p className="text-sm sm:text-base text-purple-200/90 font-light">
                Connect with our team to discuss your content needs and review process.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#e20b27] to-[#b8061e] hover:from-[#c20920] hover:to-[#e20b27] text-white font-bold text-sm shadow-xl shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 transition-all"
              >
                <span>Schedule a Discovery Call</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
