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
    desc: "Comprehensive multi-channel roadmap tailored to your clinical specialty, patient demographics, and geographic market in Pune/PCMC.",
    icon: Share2,
    color: "from-pink-600 to-rose-600",
    bg: "bg-pink-50 text-pink-600 border-pink-200"
  },
  {
    num: "02",
    title: "Healthcare Content Creation & Graphic Design",
    desc: "Stunning, on-brand medical carousels, educational infographics, and treatment before/after layouts that build immediate authority.",
    icon: Sparkles,
    color: "from-purple-600 to-indigo-600",
    bg: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    num: "03",
    title: "Patient Education Posts, Reels & Stories",
    desc: "Short-form video scripts and reels addressing common patient doubts, symptoms, prevention tips, and modern treatment technologies.",
    icon: Play,
    color: "from-rose-600 to-red-600",
    bg: "bg-rose-50 text-rose-600 border-rose-200"
  },
  {
    num: "04",
    title: "Community Management & Patient Engagement",
    desc: "Active response to comments, direct messages, and patient inquiries with professional lead nurturing and appointment routing.",
    icon: MessageCircle,
    color: "from-blue-600 to-cyan-600",
    bg: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    num: "05",
    title: "Influencer & Doctor Collaboration Campaigns",
    desc: "Cross-promotions, expert doctor interview series, and healthcare awareness collabs that multiply your organic community reach.",
    icon: Users,
    color: "from-amber-600 to-orange-600",
    bg: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    num: "06",
    title: "Monthly Analytics & Performance Reporting",
    desc: "Transparent monthly reporting tracking follower growth, profile visits, video watch time, DM inquiries, and booked appointments.",
    icon: BarChart3,
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50 text-emerald-600 border-emerald-200"
  }
];

const whatYouGetCards = [
  {
    icon: Award,
    title: "Strong Brand Authority",
    desc: "Position your clinic and doctors as the go-to medical authority in your specialty across Pune and PCMC.",
    stat: "#1 Authority",
    statLabel: "Specialty Positioning",
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50/80 border-blue-200/70"
  },
  {
    icon: Flame,
    title: "Consistent Engagement",
    desc: "Build lasting patient trust through valuable clinical education, relatable doctor reels, and engaging Q&A stories.",
    stat: "10x+",
    statLabel: "Audience Engagement",
    color: "from-rose-600 to-pink-600",
    bg: "bg-rose-50/80 border-rose-200/70"
  },
  {
    icon: MessageCircle,
    title: "Lead Generation",
    desc: "Convert passive social media followers into active clinic inquiries, WhatsApp consultations, and scheduled appointments.",
    stat: "350+ Leads",
    statLabel: "Monthly Inquiries",
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50/80 border-emerald-200/70"
  },
  {
    icon: Share2,
    title: "Multi-Platform Growth",
    desc: "Scale your presence simultaneously across Instagram Reels, Facebook Community, YouTube Shorts & LinkedIn.",
    stat: "4 Platforms",
    statLabel: "Omni-Channel Reach",
    color: "from-purple-600 to-indigo-600",
    bg: "bg-purple-50/80 border-purple-200/70"
  }
];

const socialServicesIncluded = [
  {
    title: "Social Media Management",
    subtitle: "Complete Platform Handling",
    desc: "End-to-end management of your clinic's Instagram, Facebook & LinkedIn pages with daily posting and optimization.",
    icon: Share2,
    color: "text-blue-600 bg-blue-50 border-blue-200/70",
    pill: "Full Management",
    points: ["Daily story updates & regular feed posts", "Profile grid aesthetics & bio optimization", "Hashtag & audio trend curation"]
  },
  {
    title: "Lead Generation Campaigns",
    subtitle: "High-Intent Inquiries",
    desc: "Targeted social ad campaigns engineered to capture patients actively seeking consultations and treatments.",
    icon: Target,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200/70",
    pill: "Direct Leads",
    points: ["Instagram & FB instant lead forms", "Click-to-WhatsApp direct message ads", "Micro-location radius targeting"]
  },
  {
    title: "Reels & Video Marketing",
    subtitle: "Viral Short-Form Content",
    desc: "High-retention doctor reels, patient testimonials, and treatment explainer videos crafted for algorithmic reach.",
    icon: Video,
    color: "text-pink-600 bg-pink-50 border-pink-200/70",
    pill: "Viral Reach",
    points: ["Doctor script writing & direction", "Professional video editing & motion graphics", "Trending medical sound integration"]
  },
  {
    title: "WhatsApp & Automation Marketing",
    subtitle: "Automated Communication",
    desc: "Seamlessly connect social media inquiries with automated WhatsApp appointment booking flows.",
    icon: Smartphone,
    color: "text-teal-600 bg-teal-50 border-teal-200/70",
    pill: "Fast Booking",
    points: ["Instant WhatsApp greeting & menu", "Automated consultation reminders", "Patient lead nurturing funnels"]
  },
  {
    title: "Doctors’ Social Media Marketing",
    subtitle: "Our Specialty USP",
    desc: "Tailored branding strategies built around doctor authority, medical ethics, patient education, and clinic footfall.",
    icon: Activity,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200/70",
    pill: "Medical USP",
    points: ["Build deep patient connection & trust", "Educate on symptoms & modern procedures", "Increase clinic consultation volume"]
  },
  {
    title: "Verification & Branding",
    subtitle: "Credibility Badges",
    desc: "Establish verified trust with official Meta blue badges and WhatsApp green business ticks.",
    icon: BadgeCheck,
    color: "text-amber-600 bg-amber-50 border-amber-200/60",
    pill: "Verification",
    points: ["Meta Blue Tick (FB & Instagram)", "WhatsApp Official Green Tick", "Hospital & doctor brand protection"]
  }
];

const strategySteps = [
  {
    phase: "01",
    stepNum: 1,
    name: "Research",
    time: "Days 1–3",
    title: "Clinical Specialty & Competitor Breakdown",
    stage: "Specialty Audit",
    timeline: "Days 1–3",
    icon: Search,
    deliverable: "Competitive Analysis & Patient Persona Blueprint",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200",
    boxBg: "bg-blue-50/70 border-blue-200/90",
    points: [
      "In-depth clinical competitor social content audit",
      "Patient engagement study and high-swipe topics",
      "Target demographic mapping for Pune & PCMC micro-localities"
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
    deliverable: "30-Day Content Matrix with Doctor Shooting Plan",
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200",
    boxBg: "bg-purple-50/70 border-purple-200/90",
    points: [
      "3 Core Pillars: Educational, Promotional & Trust-Building",
      "Doctor shooting schedule with structured clinical scripts",
      "Trending audio integration and viral reel hooks"
    ]
  },
  {
    phase: "03",
    stepNum: 3,
    name: "Production",
    time: "Weeks 2–3",
    title: "High-Retention Video Reels & Carousels",
    stage: "Creative Production",
    timeline: "Weeks 2–3",
    icon: Video,
    deliverable: "High-Impact Edited Reels & Medical Carousels",
    badgeBg: "bg-pink-50 text-pink-600 border-pink-200",
    boxBg: "bg-pink-50/70 border-pink-200/90",
    points: [
      "Dynamic captions, visual B-rolls and treatment animations",
      "High-swipe educational carousels with clinic branding",
      "Interactive story Q&A polls to drive active patient queries"
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
      "Optimized posting times for peak patient engagement",
      "Hyper-local Pune & PCMC hashtag architecture",
      "Cross-platform syndication across Instagram, Facebook & LinkedIn"
    ]
  },
  {
    phase: "05",
    stepNum: 5,
    name: "Paid Boost",
    time: "Weeks 3–4",
    title: "Targeted Lead Generation & Reel Boosts",
    stage: "Paid Amplification",
    timeline: "Weeks 3–4",
    icon: Zap,
    deliverable: "Targeted Paid Patient Acquisition Funnel",
    badgeBg: "bg-rose-50 text-rose-600 border-rose-200",
    boxBg: "bg-rose-50/70 border-rose-200/90",
    points: [
      "Laser-targeted radius ads around your clinic or hospital",
      "Amplification of top-performing organic educational reels",
      "Direct Click-to-WhatsApp and Instagram DM lead campaigns"
    ]
  },
  {
    phase: "06",
    stepNum: 6,
    name: "Community",
    time: "Ongoing",
    title: "DM Consultation Filtering & Appointment Booking",
    stage: "Lead Conversion",
    timeline: "Ongoing Growth",
    icon: MessageCircle,
    deliverable: "Verified Patient Consultations & Monthly Analytics",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    boxBg: "bg-emerald-50/70 border-emerald-200/90",
    points: [
      "Rapid response to patient comments and direct inquiries",
      "Seamless patient routing to front desk & WhatsApp CRM",
      "Monthly growth report tracking reach, inquiries & ROI"
    ]
  }
];

const whyChooseCodigix = [
  {
    title: "Healthcare-First Approach",
    desc: "We understand medical terminologies, patient sensitivities, doctor schedules, and healthcare advertising ethics.",
    icon: ShieldCheck
  },
  {
    title: "Conversion-Focused Content",
    desc: "Every post and reel is engineered not just for vanity likes, but to educate patients and drive appointment bookings.",
    icon: Target
  },
  {
    title: "Data-Driven Execution",
    desc: "We monitor audience retention, swipe rates, and DM conversion ratios to constantly refine your social presence.",
    icon: BarChart3
  },
  {
    title: "Healthcare Expertise",
    desc: "Over 8+ years scaling specialized doctors, dental clinics, IVF centers, dermatologists, and multi-specialty hospitals.",
    icon: Award
  },
  {
    title: "Local Market Understanding",
    desc: "Deep knowledge of Pune & PCMC patient demographics, languages, and neighborhood healthcare preferences.",
    icon: Globe
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
  "Meta Business Suite & Creator Studio",
  "Canva Pro & Adobe Creative Cloud",
  "CapCut & Premiere Pro for Healthcare Reels",
  "WhatsApp Business API & Automation Bots",
  "Social Media Telemetry & Analytics Tools",
  "Lead Tracking & Appointment CRM"
];

const kpiList = [
  "Follower Growth Rate & Community Size",
  "Reel Views, Watch Time & Viral Shares",
  "Engagement Rate (Comments, Saves & Shares)",
  "Direct Message (DM) Consultation Requests",
  "Cost Per Social Lead (CPL)",
  "Verified Patient Footfall & Clinic Appointments"
];

const faqs = [
  {
    q: "Why is social media marketing essential for doctors and clinics?",
    a: "Today's patients research doctors on Instagram and Facebook before scheduling a visit. A vibrant, educational social media presence builds immense personal trust, showcases your expertise, demystifies complex treatments, and turns casual social media users into loyal patients."
  },
  {
    q: "Do you write scripts and shoot video reels for doctors?",
    a: "Yes! We provide complete end-to-end video support: researching high-demand patient questions, writing engaging 30–60 second doctor scripts, guiding camera delivery, and professionally editing reels with dynamic captions, sound design, and medical graphics."
  },
  {
    q: "How often will you post on our clinic’s social media channels?",
    a: "We maintain a consistent, high-impact schedule: typically 12 to 20 high-quality reels and carousels per month, combined with daily interactive Instagram Stories (polls, patient FAQs, clinic behind-the-scenes) to keep your practice top-of-mind."
  },
  {
    q: "How do you help us get verified with a Blue Tick or WhatsApp Green Tick?",
    a: "We assist with the complete official documentation, PR citations, clinic registration verification, and submission process to secure the official Meta Verified badge (Instagram/Facebook) and the WhatsApp Official Business Account (Green Tick)."
  },
  {
    q: "How does social media generate actual clinic appointments?",
    a: "We integrate clear call-to-actions, link-in-bio appointment funnels, click-to-WhatsApp message buttons, and targeted paid lead generation ads that guide interested viewers directly into booking a consultation with your front desk."
  },
  {
    q: "Is social media marketing suitable for medical compliance and ethics?",
    a: "Absolutely. All our content adheres strictly to medical advertising regulations, ethical healthcare communication standards, and patient privacy (HIPAA / medical guidelines), ensuring your clinical reputation is always protected."
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
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Viral Growth</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">10x+ Reel Engagement</p>
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
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">High Patient Trust</p>
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
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Conversions</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">350+ Monthly Leads</p>
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
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">100% Medical Ethics Safe</p>
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
              Social Media Marketing
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#1a1053] tracking-tight leading-[1.1] mb-6 max-w-4xl relative z-20">
            Drive Instant Patient Inquiries with <br className="hidden lg:block" /> Targeted Ads & Reels.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] mt-3">
              More Followers. More Engagement.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto mb-10 relative z-20">
            Today’s patients choose doctors they feel connected to. Our Social Media Marketing services help your clinic build a credible, engaging, and trustworthy presence on platforms where your patients spend their time every day.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-20">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1053] hover:bg-[#281878] text-white rounded-full font-semibold text-base transition-all shadow-[0_10px_25px_-5px_rgba(26,16,83,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(26,16,83,0.35)] transform hover:-translate-y-0.5"
            >
              <span>Book Free Social Media Call</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href="#strategy"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-[#1a1053] rounded-full font-semibold text-base shadow-xs transition-all"
            >
              <span>Explore 7-Step Strategy</span>
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
                Healthcare Social Growth Engine
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              A comprehensive social media growth engine designed specifically for doctors, clinics, and medical institutions to turn casual scrollers into verified patient appointments.
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
                    <span className="text-xs font-bold text-slate-600 uppercase">Social Growth Engine</span>
                    <span className="text-xs font-bold text-pink-600">Patient Psychology</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-pink-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                        <span className="text-xs font-bold text-slate-800">Strategic Content (Not Random Posts)</span>
                      </div>
                      <span className="text-[11px] text-pink-600 font-semibold">Authority</span>
                    </div>

                    <div className="flex justify-center text-slate-300">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                        <span className="text-xs font-bold text-slate-800">Audience Psychology &amp; Reels</span>
                      </div>
                      <span className="text-[11px] text-rose-600 font-semibold">High Reach</span>
                    </div>

                    <div className="flex justify-center text-slate-300">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                        <span className="text-xs font-bold text-emerald-900">Conversion-Driven Engagement</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-bold">Booked Visits</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Copy & Bullet Points */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-800 text-xs font-bold uppercase tracking-wider">
                  Strategic Positioning
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
                  Social Media is Not About Posting — It’s About Positioning
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Most agencies treat social media as occasional content posting. <br className="hidden sm:inline" />
                  <strong className="text-[#1a1053] font-bold">We treat it as a high-converting patient growth engine.</strong>
                </p>

                <div className="p-4 rounded-xl bg-pink-50 border-l-4 border-pink-500 text-pink-950 text-sm font-semibold">
                  🚀 Your social media becomes a consistent, dependable patient lead generation channel.
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-sm font-bold text-[#1a1053]">At Codigix Infotech, we focus on:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Strategic medical content (not random posts)</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Audience psychology &amp; treatment curiosity</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Conversion-driven DM &amp; story engagement</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Verified doctor brand authority building</span>
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
              Proven Outcomes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What You Get With Our Strong Social Media
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Tangible clinical branding and continuous patient inquiries that elevate your healthcare practice above local competition.
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
              What Is Included In Our Healthcare Social Media Services?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Structured, compliant, and results-driven offerings designed to build authority and fill your appointment calendar.
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
              Our 6-Step Social Media Strategy & Growth Roadmap
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              A synchronized medical branding framework that turns your clinic into an active, patient-generating digital authority across Pune & PCMC.
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
              We understand doctor schedules, clinical nuances, and the exact content formats that inspire prospective patients to take action.
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
                  <Sparkles className="w-3.5 h-3.5" /> Doctor Reel Strategy Call
                </span>
                <h3 className="text-lg font-bold text-white">Want custom reel scripts?</h3>
                <p className="text-xs text-slate-300">We analyze your clinical specialty and create 5 ready-to-record viral reel scripts for free.</p>
              </div>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg bg-[#e20b27] hover:bg-red-700 text-white transition-colors"
                >
                  <span>Claim 5 Free Scripts</span>
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
          badgeText="Verified Social Reach & Client Growth"
          headingPrefix="Why Healthcare & Premium Brands"
          headingGradient="Trust Codigix Social Media"
          subtitle="Building authentic doctor brand authority, viral video content, and converting social followers into booked clinic appointments."
          strategicAdvantageTitle="The Codigix Creative Advantage"
          strategicAdvantageSubtitle="Clinical accuracy, thumb-stopping reel scripts, and dedicated patient psychology hooks."
          guaranteeTitle="100% Brand Credibility & Compliance"
          guaranteeQuote='"Every reel, script, and visual campaign complies strictly with medical ethics while generating verified engagement and clinic bookings."'
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
                  <p className="text-xs text-slate-300">Metrics that translate engagement into clinic revenue</p>
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
              Everything you need to know about our healthcare social media strategy, video reel production, and verification process.
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
                <h4 className="text-sm font-bold text-[#1a1053]">Need a custom healthcare social audit?</h4>
                <p className="text-xs text-slate-600">Our medical social strategists will review your current Instagram grid and outline a viral roadmap.</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-[#e20b27] hover:bg-red-700 text-white font-bold text-xs shrink-0 shadow-sm transition-colors"
            >
              <PhoneCall size={14} />
              <span>Talk to Social Strategist</span>
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
                <span>Transform Your Social Presence</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Generate High-Quality Leads with Social Media?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Let’s create medical content that builds lasting patient authority, drives viral reach, and fills your consultation schedule.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-base shadow-lg shadow-pink-500/20 hover:shadow-xl transition-all"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>Book Free Social Consultation</span>
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
