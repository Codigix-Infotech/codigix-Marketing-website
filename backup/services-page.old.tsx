"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Zap,
  Instagram,
  ShoppingCart,
  FileText,
  Code2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ShieldCheck,
  PhoneCall,
  Users,
  ChevronDown,
  BarChart3,
  Activity,
  Globe,
  Layers,
  Cpu,
  Star,
  Target,
  Clock,
  Award,
  Stethoscope,
  HeartPulse,
  Monitor,
  Check,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCw,
  Sliders,
  MessageSquare,
  Calendar,
  Phone,
  BadgeCheck,
  Building2,
  Lock,
  Plus,
  Minus
} from 'lucide-react';

type ServiceCategory = 'all' | 'organic' | 'paid' | 'branding' | 'ecommerce' | 'web';

interface ServiceItem {
  id: string;
  category: ServiceCategory;
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  icon: React.ElementType;
  gradient: string;
  badge: string;
  badgeBg: string;
  highlights: string[];
  metric: string;
  metricLabel: string;
  tagColor: string;
  readTime: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "seo",
    category: "organic",
    number: "01",
    title: "Healthcare SEO & GMB",
    subtitle: "Local Google Maps & Search Dominance",
    desc: "Rank #1 on Google Search and Maps 3-Pack across PCMC & Pune to capture high-intent patients searching for top specialists.",
    href: "/best-seo-services-in-pcmc",
    icon: Search,
    gradient: "from-emerald-500 to-teal-600",
    badge: "Organic Search",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tagColor: "text-emerald-600",
    readTime: "3 min read",
    highlights: ["Google Maps 3-Pack", "Medical Schema", "Zero Ad Spend Per Click"],
    metric: "#1 Rank",
    metricLabel: "Google Maps 3-Pack"
  },
  {
    id: "ppc",
    category: "paid",
    number: "02",
    title: "Paid Ads (Google & Meta PPC)",
    subtitle: "High-ROI Instant Patient Acquisition",
    desc: "Drive urgent, high-value patient appointments and surgical inquiries immediately with laser-targeted Google & Instagram ad funnels.",
    href: "/paid-advertisements-ppc",
    icon: Zap,
    gradient: "from-amber-500 to-orange-600",
    badge: "Instant Leads",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    tagColor: "text-amber-600",
    readTime: "2 min read",
    highlights: ["Google Search Ads", "Meta Video Lead Funnels", "Verified Low CPL"],
    metric: "4.8x ROAS",
    metricLabel: "Cost Per Acquisition"
  },
  {
    id: "social",
    category: "branding",
    number: "03",
    title: "Social Media & Doctor Reels",
    subtitle: "Viral Branding & Patient Trust",
    desc: "Build authority and patient trust with professionally scripted doctor reels, treatment explainers, and engaging clinical content.",
    href: "/social-media-marketing",
    icon: Instagram,
    gradient: "from-pink-500 to-rose-600",
    badge: "Viral Doctor Reach",
    badgeBg: "bg-pink-50 text-pink-700 border-pink-200",
    tagColor: "text-pink-600",
    readTime: "3 min read",
    highlights: ["Cinematic Doctor Reels", "Patient Case Studies", "Multi-Lingual Reach"],
    metric: "1.2M+ Views",
    metricLabel: "Average Monthly Reach"
  },
  {
    id: "ecommerce",
    category: "ecommerce",
    number: "04",
    title: "Medical E-Commerce Marketing",
    subtitle: "Online Pharma & Product Scaling",
    desc: "Scale sales for health supplements, medical equipment, and online pharmacies with Google Shopping and marketplace optimization.",
    href: "/ecommerce-marketing",
    icon: ShoppingCart,
    gradient: "from-blue-500 to-indigo-600",
    badge: "High-Volume Sales",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    tagColor: "text-blue-600",
    readTime: "4 min read",
    highlights: ["Google Shopping / PMax", "Amazon & Flipkart Ads", "Automated Retention"],
    metric: "+284% Orders",
    metricLabel: "Quarterly Revenue Scaling"
  },
  {
    id: "content",
    category: "branding",
    number: "05",
    title: "Medical Content Marketing",
    subtitle: "Doctor-Reviewed Authoritative Guides",
    desc: "Establish undisputed clinical leadership with medically reviewed blogs, treatment guides, and Google E-E-A-T verified content.",
    href: "/medical-content-marketing",
    icon: FileText,
    gradient: "from-purple-500 to-indigo-600",
    badge: "E-E-A-T Authority",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    tagColor: "text-purple-600",
    readTime: "3 min read",
    highlights: ["100% Medical Accuracy", "Patient Education Guides", "Doctor Thought Leadership"],
    metric: "4m 38s",
    metricLabel: "Avg. Patient Dwell Time"
  },
  {
    id: "web",
    category: "web",
    number: "06",
    title: "Clinic & Hospital Web Design",
    subtitle: "Fast, 1-Click WhatsApp Booking Portals",
    desc: "High-converting, sub-1.5s medical websites engineered to turn visitors into confirmed clinic appointments seamlessly.",
    href: "/web-design-development",
    icon: Code2,
    gradient: "from-indigo-500 to-violet-600",
    badge: "High Conversion",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    tagColor: "text-indigo-600",
    readTime: "3 min read",
    highlights: ["Sub-1.5s Fast Load Speed", "1-Click WhatsApp Flow", "HIPAA/NABH Ready"],
    metric: "98 / 100",
    metricLabel: "Google PageSpeed Score"
  }
];

const ecosystemSteps = [
  {
    step: "01",
    title: "Search & Maps Discovery",
    service: "Healthcare SEO & GMB",
    badge: "Discovery Layer",
    desc: "Patients in Pune & PCMC searching specific symptoms and treatments find your clinic at the top of Google Search & Maps.",
    deliverables: ["Google Maps 3-Pack Dominance", "Pune Local Intent Keywords", "Zero Patient Leakage"],
    metric: "Top 3 Google Rank",
    kpiDetail: "+340% Local Traffic",
    icon: Search
  },
  {
    step: "02",
    title: "Immediate Patient Inquiries",
    service: "Paid Ads (PPC)",
    badge: "Urgent Demand",
    desc: "Targeted Google & Meta clinical campaigns capture high-urgency patients actively seeking treatment consultations today.",
    deliverables: ["High-Intent Search Ads", "Location Radius Geo-Fencing", "Strict Cost Per Consultation"],
    metric: "< 48h Lead Generation",
    kpiDetail: "3.8x ROAS Target",
    icon: Zap
  },
  {
    step: "03",
    title: "Doctor Authority & Proof",
    service: "Doctor Reels & Social Media",
    badge: "Trust & Proof",
    desc: "Engaging video reels and patient testimonials establish doctor credibility and eliminate clinical visit anxiety.",
    deliverables: ["Doctor Authority Scripts", "High-Resolution Production", "Patient Video Reviews"],
    metric: "10x Social Trust",
    kpiDetail: "> 120k Reel Reach",
    icon: Instagram
  },
  {
    step: "04",
    title: "Clinical Education & Authority",
    service: "Medical Content & Guides",
    badge: "Patient Education",
    desc: "Doctor-approved treatment articles and clinical FAQs answer patient queries thoroughly, converting readers into appointments.",
    deliverables: ["Doctor-Vetted Medical Copy", "MCI/NABH Compliant", "Pre-Op & Post-Op Guides"],
    metric: "100% Medical Accuracy",
    kpiDetail: "Zero Compliance Risks",
    icon: FileText
  },
  {
    step: "05",
    title: "Frictionless Booking & Web",
    service: "High-Speed Website",
    badge: "Conversion Engine",
    desc: "A sub-1.5s responsive website turns traffic into confirmed clinic appointments via 1-click WhatsApp and smart forms.",
    deliverables: ["Sub-1.2s Fast Mobile Speed", "1-Click WhatsApp Booking", "HIPAA/NABH Ready Security"],
    metric: "+310% Conversion Lift",
    kpiDetail: "98/100 PageSpeed",
    icon: Code2
  },
  {
    step: "06",
    title: "Recurring Retention & Loyalty",
    service: "E-Commerce & Retention",
    badge: "Lifetime Loyalty",
    desc: "Automated follow-up sequences and online prescription re-ordering turn one-time patients into loyal lifelong advocates.",
    deliverables: ["Automated OPD Reminders", "E-Prescription Refills", "5-Star Review Automation"],
    metric: "4.8x Lifetime Value",
    kpiDetail: "+65% Repeat OPD",
    icon: ShoppingCart
  }
];

const roiSpecialties = [
  {
    name: "Dental & Orthodontics",
    tagline: "Implants, Aligners, Braces & Root Canals",
    avgConsultations: "85 - 140",
    estRev: "₹4.5L - ₹8.5L",
    cac: "₹210 - ₹340",
    opdRate: "76% Walk-In Rate",
    roiMultiple: "5.2x ROI",
    timeline: "First 25+ leads in 10 days",
    icon: Sparkles,
    funnelMix: [
      { channel: "Google Local Maps (3-Pack)", pct: 45, color: "bg-blue-600" },
      { channel: "Targeted PPC Search Ads", pct: 35, color: "bg-indigo-600" },
      { channel: "Doctor Trust Video Reels", pct: 20, color: "bg-purple-600" }
    ],
    recommended: ["Local Maps Dominance", "Doctor Authority Reels", "1-Click WhatsApp Booking"]
  },
  {
    name: "Dermatology & Cosmetology",
    tagline: "Acne, Laser, Hair PRP & Aesthetics",
    avgConsultations: "120 - 220",
    estRev: "₹6.0L - ₹12.0L",
    cac: "₹180 - ₹290",
    opdRate: "68% Procedure Conversion",
    roiMultiple: "6.4x ROI",
    timeline: "First 40+ leads in 7 days",
    icon: HeartPulse,
    funnelMix: [
      { channel: "Instagram Before/After Reels", pct: 50, color: "bg-pink-600" },
      { channel: "Google Search Ads", pct: 30, color: "bg-indigo-600" },
      { channel: "Clinical Landing Pages", pct: 20, color: "bg-emerald-600" }
    ],
    recommended: ["Aesthetic Video Campaigns", "Laser Treatment PPC", "Sub-1.2s Fast Landing Page"]
  },
  {
    name: "Orthopedics & Joint Care",
    tagline: "Knee Replacement, Spine & Sports Injury",
    avgConsultations: "60 - 95",
    estRev: "₹8.0L - ₹18.0L",
    cac: "₹380 - ₹560",
    opdRate: "82% Surgery Referral Rate",
    roiMultiple: "5.8x ROI",
    timeline: "First 15+ high-intent calls in 14 days",
    icon: Activity,
    funnelMix: [
      { channel: "High-Intent Google Ads", pct: 55, color: "bg-blue-600" },
      { channel: "Hospital SEO & GMB", pct: 30, color: "bg-indigo-600" },
      { channel: "Patient Recovery Stories", pct: 15, color: "bg-purple-600" }
    ],
    recommended: ["Joint Replacement PPC", "Doctor Authority Content", "Verified Maps Optimization"]
  },
  {
    name: "IVF & Fertility Centers",
    tagline: "IVF Cycles, IUI & Fertility Consultations",
    avgConsultations: "45 - 75",
    estRev: "₹15.0L - ₹35.0L",
    cac: "₹650 - ₹1,100",
    opdRate: "64% Cycle Enrollment",
    roiMultiple: "7.1x ROI",
    timeline: "Consistent inquiries in 14 days",
    icon: Target,
    funnelMix: [
      { channel: "High-Empathy Search PPC", pct: 45, color: "bg-indigo-600" },
      { channel: "Doctor Video Explanations", pct: 35, color: "bg-purple-600" },
      { channel: "Confidential WhatsApp Funnel", pct: 20, color: "bg-emerald-600" }
    ],
    recommended: ["Full-Funnel IVF Campaigns", "Clinical Trust Video Series", "Confidential Lead Engine"]
  },
  {
    name: "Multi-Speciality Hospital",
    tagline: "24/7 Emergency, Multi-Ward & Speciality OPD",
    avgConsultations: "350 - 650",
    estRev: "₹25.0L - ₹60.0L",
    cac: "₹160 - ₹240",
    opdRate: "88% Department Footfall",
    roiMultiple: "8.5x ROI",
    timeline: "Immediate 360° patient scaling",
    icon: Building2,
    funnelMix: [
      { channel: "360° Google & Maps Domination", pct: 40, color: "bg-blue-600" },
      { channel: "Department-Wise Paid Ads", pct: 35, color: "bg-indigo-600" },
      { channel: "Brand & Doctor Authority", pct: 25, color: "bg-purple-600" }
    ],
    recommended: ["360° Omnichannel Engine", "Emergency Keyword Geo-Fencing", "Hospital Website System"]
  }
];

const faqs = [
  {
    q: "Which digital marketing service should my practice start with?",
    a: "If you need immediate patient appointments within 48 to 72 hours, Paid Advertisements (PPC) and Google Local 3-Pack optimization deliver immediate results. For long-term sustainable growth with zero per-click ad costs, SEO, Medical Content, and a high-converting Website form the foundation."
  },
  {
    q: "Do you specialize only in healthcare and medical practices?",
    a: "Yes! Codigix Infotech is 100% dedicated to healthcare growth. We understand medical ethics, NABH/MCI guidelines, patient psychology, clinical treatment terminologies, and localized search habits across Pune and PCMC."
  },
  {
    q: "Can I combine multiple services into a single custom growth plan?",
    a: "Yes. Most of our successful hospital and clinic partners use our integrated 360° Healthcare Growth package, combining SEO, Google Ads, Doctor Reels, and Website Optimization for maximum local patient footfall."
  },
  {
    q: "How do you track and report patient acquisition results?",
    a: "We provide 100% transparent live analytics dashboards. You can track verified phone calls, appointment form fills, Google Maps directions requests, keyword rankings, and return on ad spend (ROAS) in real time."
  },
  {
    q: "What makes Codigix Infotech different from general marketing agencies?",
    a: "General agencies create generic, compliant-blind ads with factual inaccuracies. At Codigix Infotech, our healthcare copywriters, medical ad strategists, and web engineers understand healthcare compliance, doctor authority, and patient psychology."
  }
];

export default function ServicesPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(0);
  const [isSpecialtyPaused, setIsSpecialtyPaused] = useState(false);
  const [activeEcosystemStep, setActiveEcosystemStep] = useState(0);
  const [isEcosystemPaused, setIsEcosystemPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Auto-animate 360° Healthcare Growth Ecosystem steps
  useEffect(() => {
    if (isEcosystemPaused) return;

    const interval = setInterval(() => {
      setActiveEcosystemStep((prev) => (prev + 1) % ecosystemSteps.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isEcosystemPaused]);

  // Auto-cycle Practice Growth Estimator Specialties (Hands-free simulation)
  useEffect(() => {
    if (isSpecialtyPaused) return;

    const interval = setInterval(() => {
      setSelectedSpecialty((prev) => (prev + 1) % roiSpecialties.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isSpecialtyPaused]);

  return (
    <main className="min-h-screen bg-white text-slate-800 selection:bg-[#e20b27] selection:text-white pt-20 lg:pt-24">

      {/* ============================================================ */}
      {/* 1. HERO BANNER: Premium High-Conversion Light Luxury Layout */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-[#f8fafe] via-white to-[#f4f7fc] border-b border-slate-200/80">

        {/* Subtle Decorative Geometry & Background Elements */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#1a1053 1px, transparent 1px), linear-gradient(90deg, #1a1053 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-400/8 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#e20b27]/5 rounded-full blur-[130px] pointer-events-none z-0" />

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">

              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e20b27] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e20b27]"></span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#1a1053] tracking-wide">
                  Pune's Dedicated Healthcare Growth Agency
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-6xl font-extrabold text-[#1a1053] tracking-tight leading-[1.12]">
                Transforming Clinics Into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                  High-Growth Market Leaders
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-2xl">
                We empower doctors, clinics, and hospitals to dominate local Google search, generate high-intent patient inquiries, and build lasting medical authority with predictable ROI.
              </p>

              {/* Value Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  "Google Maps 3-Pack & Local PCMC Domination",
                  "100% MCI & NABH Ethical Advertising Standards",
                  "Verified Patient Bookings & Phone Inquiries",
                  "90-Day Proven Clinical Growth Blueprint"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1a1053] hover:bg-[#281878] text-white font-semibold text-sm shadow-[0_10px_25px_-5px_rgba(26,16,83,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(26,16,83,0.35)] transition-all transform hover:-translate-y-0.5"
                >
                  <span>Claim Free Practice Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#services-grid"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-slate-50 text-[#1a1053] border border-slate-200 font-semibold text-sm shadow-xs transition-all"
                >
                  <span>Explore All 6 Channels</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              {/* Review & Trust Proof */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200/80">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-[#1a1053] shadow-xs">
                      Dr
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-800 ml-1.5">4.9 / 5.0</span>
                  </div>
                  <p className="text-xs text-slate-500 font-light">Trusted by 100+ doctors and clinics across Pune & PCMC</p>
                </div>
              </div>

            </div>

            {/* Right Column: Clean Light Luxury Visual Card Stack */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">

                {/* Background Shadow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-100/60 via-purple-50/40 to-rose-100/60 rounded-[32px] blur-xl opacity-70 pointer-events-none" />

                {/* Primary Feature Card */}
                <div className="relative rounded-[28px] bg-white border border-slate-200 p-7 sm:p-8 shadow-[0_20px_50px_rgba(26,16,83,0.06)] space-y-6">

                  {/* Clinic Authority Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-[#1a1053] text-base">Clinical Growth Hub</h4>
                          <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-50" />
                        </div>
                        <p className="text-xs text-slate-500 font-light">Multi-Specialty Patient Acquisition</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Live Feed
                    </span>
                  </div>

                  {/* 3 Metric Summary Blocks */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3.5 rounded-2xl bg-[#f8fafe] border border-slate-200/80">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Local Rank</div>
                      <div className="text-lg sm:text-xl font-black text-emerald-600 mt-0.5">#1 GMB</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">5km Radius</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#f8fafe] border border-slate-200/80">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Ad Return</div>
                      <div className="text-lg sm:text-xl font-black text-blue-600 mt-0.5">4.8x</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Average ROAS</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#f8fafe] border border-slate-200/80">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Inquiries</div>
                      <div className="text-lg sm:text-xl font-black text-[#e20b27] mt-0.5">+380%</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Patient Lift</div>
                    </div>
                  </div>

                  {/* Verified Patient Inquiries Preview List */}
                  <div className="space-y-2.5 bg-[#f8fafe] rounded-2xl p-4 border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1a1053] uppercase tracking-wider">
                      <span>Recent Patient Inquiries</span>
                      <span className="text-emerald-600 font-medium">● Verified Leads</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="font-medium text-slate-800">Knee Replacement Consult</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">Wakad • 4m ago</span>
                      </div>

                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="font-medium text-slate-800">Clear Aligners Assessment</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">Baner • 12m ago</span>
                      </div>

                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                          <span className="font-medium text-slate-800">Laser Skin Treatment Booking</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">Kothrud • 28m ago</span>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Hotline Action */}
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      100% Dedicated Healthcare Growth
                    </span>
                    <Link href="/contact" className="font-bold text-[#e20b27] hover:underline">
                      Get Free Audit →
                    </Link>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 2. EXPLORE HEALTHCARE SERVICES: Animated Bento Grid Layout */}
      {/* ============================================================ */}
      <section id="services-grid" className="py-14 lg:py-18 bg-gradient-to-b from-[#f8fafe] via-white to-[#f4f7fc] relative overflow-hidden border-b border-slate-200/80">

        {/* Subtle Decorative Grid Pattern & Floating Lighting Glows */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#1a1053 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        <motion.div
          animate={{ y: [0, -25, 0], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-400/8 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 25, 0], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-[#e20b27]/6 rounded-full blur-[140px] pointer-events-none"
        />

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

          {/* Section Header with Scroll-Triggered Animation */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-[#1a1053] text-[11px] font-bold uppercase tracking-wider mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#e20b27] animate-pulse" />
              <span>Specialized Practice Growth Channels</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
              Explore Our Healthcare Marketing Services
            </h2>

            <p className="mt-2.5 text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Every channel is engineered exclusively for doctors, clinics, and multi-specialty hospitals to maximize OPD bookings, build clinical authority, and dominate local search.
            </p>

            {/* Quick Practice Trust Highlights with Smooth Stagger */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold text-slate-700"
            >
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Medical & NABH Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-colors">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span>Average 4.8x Verified ROAS</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs hover:border-rose-300 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-[#e20b27]" />
                <span>Pune & PCMC Local Dominance</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 6 Animated Bento Service Cards Grid with Stagger & Smooth Physics */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.09
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {servicesData.map((svc) => {
              const IconComponent = svc.icon;
              return (
                <motion.div
                  key={svc.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.96 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                    }
                  }}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.25, ease: "easeOut" }
                  }}
                  className="h-full"
                >
                  <Link
                    href={svc.href}
                    className="group relative h-full rounded-2xl bg-white border border-slate-200/80 hover:border-[#1a1053]/40 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_rgba(26,16,83,0.09)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                  >
                    <div>
                      {/* Top Row: Icon + Number Tag */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-center text-[#1a1053] group-hover:bg-[#1a1053] group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-105 group-hover:rotate-2">
                          <IconComponent className="w-4 h-4" />
                        </div>

                        <span className="font-mono text-[11px] font-bold text-slate-400 group-hover:text-[#e20b27] transition-colors">
                          #{svc.number}
                        </span>
                      </div>

                      {/* Service Title */}
                      <h3 className="text-lg font-bold text-[#1a1053] group-hover:text-[#e20b27] transition-colors mb-0.5 leading-snug">
                        {svc.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                        {svc.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed font-light mb-3.5">
                        {svc.desc}
                      </p>

                      {/* Clean Deliverables Checklist */}
                      <ul className="space-y-1.5 mb-4 text-[11px] font-medium text-slate-700">
                        {svc.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-[#e20b27] shrink-0" />
                            <span className="truncate">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1a1053] group-hover:text-[#e20b27] transition-colors">
                      <span>Explore Service</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                    </div>

                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom Consultation Banner with Scroll Animation */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-10 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(26,16,83,0.04)] flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-1.5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Custom Multi-Channel Growth Strategy</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1053]">
                Not sure which service mix fits your clinic?
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-light">
                Schedule a complimentary 15-minute healthcare growth audit. We'll analyze your local competition across Pune/PCMC and recommend the highest-ROI channels.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-[#e20b27] hover:bg-[#c00920] text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-950/20 hover:scale-105 transition-all"
              >
                Request Free Practice Audit →
              </Link>
              <a
                href="tel:+918208468757"
                className="w-full sm:w-auto text-center px-5 py-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#1a1053] font-bold text-xs sm:text-sm transition-all"
              >
                Talk to Strategist
              </a>
            </div>
          </motion.div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 3. 360° HEALTHCARE GROWTH ECOSYSTEM (True 360° Orbital Wheel) */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 bg-white relative border-y border-slate-200/80 overflow-hidden">

        {/* Subtle Background Radial Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#1a1053 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

          {/* Section Header */}
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-bold uppercase tracking-wider mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#e20b27] animate-ping" />
              <span>360° Connected Clinical Funnel</span>
              <span className="text-slate-300">|</span>
              <span className={`text-[11px] font-bold ${isEcosystemPaused ? 'text-amber-600' : 'text-emerald-600'}`}>
                {isEcosystemPaused ? '❚❚ Paused' : '▶ Auto-Cycling'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
              Our 360° Healthcare Growth Engine
            </h2>

            <p className="mt-3 text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Every channel connects into an automated, synchronized 360-degree patient acquisition loop driving continuous OPD bookings.
            </p>
          </div>

          {/* 360° Circular Orbital Interactive Arena */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
            onMouseEnter={() => setIsEcosystemPaused(true)}
            onMouseLeave={() => setIsEcosystemPaused(false)}
          >

            {/* Left/Center: True 360° Orbital Wheel (Desktop / Tablet) */}
            <div className="lg:col-span-7 flex items-center justify-center relative min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] select-none">

              {/* SVG 360° Orbital Ring with Traveling Energy Pulse */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* SVG Circuit Rings & Continuous Orbit Glow */}
                <svg className="w-[360px] sm:w-[460px] lg:w-[500px] h-[360px] sm:h-[460px] lg:h-[500px] absolute overflow-visible" viewBox="0 0 500 500">
                  <defs>
                    <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1a1053" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#e20b27" stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Base Track */}
                  <circle cx="250" cy="250" r="210" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="6 6" />

                  {/* Inner Track */}
                  <circle cx="250" cy="250" r="140" fill="none" stroke="#ede9fe" strokeWidth="1.2" />

                  {/* Traveling Orbital Laser Pulse */}
                  <circle cx="250" cy="250" r="210" fill="none" stroke="url(#orbitGlow)" strokeWidth="3" strokeDasharray="40 380" filter="url(#glow)">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 250 250"
                      to="360 250 250"
                      dur="14s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Active Laser Line from Center to Selected Phase */}
                  {(() => {
                    const total = ecosystemSteps.length;
                    const angleDeg = (activeEcosystemStep * (360 / total)) - 90;
                    const angleRad = (angleDeg * Math.PI) / 180;
                    const targetX = 250 + 210 * Math.cos(angleRad);
                    const targetY = 250 + 210 * Math.sin(angleRad);
                    return (
                      <line
                        x1="250"
                        y1="250"
                        x2={targetX}
                        y2={targetY}
                        stroke="#e20b27"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="transition-all duration-500 ease-out opacity-75"
                      />
                    );
                  })()}
                </svg>

                {/* Radar Ambient Waves */}
                <div className="absolute w-[200px] sm:w-[240px] lg:w-[270px] h-[200px] sm:h-[240px] lg:h-[270px] rounded-full border border-indigo-200/50 animate-ping opacity-20 pointer-events-none" />
              </div>

              {/* Center Core Hub */}
              <motion.div
                key={activeEcosystemStep}
                initial={{ scale: 0.92, opacity: 0.85 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-20 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white border-2 border-indigo-200 shadow-[0_12px_40px_rgba(26,16,83,0.14)] flex flex-col items-center justify-center text-center p-3 sm:p-4 group cursor-pointer transition-all duration-300 hover:shadow-indigo-900/20"
                onClick={() => setActiveEcosystemStep((prev) => (prev + 1) % ecosystemSteps.length)}
                title="Click to advance to next phase"
              >
                {/* Glowing Outer Ring */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-indigo-500/25 via-purple-500/15 to-[#e20b27]/25 blur-xs -z-10 animate-pulse" />

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1a1053] text-white flex items-center justify-center mb-1.5 shadow-md group-hover:scale-105 transition-transform">
                  {React.createElement(ecosystemSteps[activeEcosystemStep].icon, { className: "w-5 h-5 sm:w-6 sm:h-6 text-indigo-200" })}
                </div>

                <span className="text-[10px] font-mono font-bold text-[#e20b27] uppercase tracking-wider">
                  Phase {ecosystemSteps[activeEcosystemStep].step}
                </span>

                <h4 className="text-xs sm:text-sm font-extrabold text-[#1a1053] leading-tight mt-0.5 line-clamp-1">
                  {ecosystemSteps[activeEcosystemStep].service}
                </h4>

                <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  360° Active
                </span>
              </motion.div>

              {/* 6 Circular Orbital Satellite Nodes (Positioned along 360° circle) */}
              {ecosystemSteps.map((step, idx) => {
                const total = ecosystemSteps.length;
                // Angle starting from top (-90 deg) going clockwise
                const angleDeg = (idx * (360 / total)) - 90;
                const angleRad = (angleDeg * Math.PI) / 180;

                // Responsive radius based on screen
                const radiusPercent = 42; // percent from center
                const left = 50 + radiusPercent * Math.cos(angleRad);
                const top = 50 + radiusPercent * Math.sin(angleRad);

                const isSelected = activeEcosystemStep === idx;
                const StepIcon = step.icon;

                return (
                  <div
                    key={idx}
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setActiveEcosystemStep(idx)}
                    className="absolute z-30 cursor-pointer group"
                  >
                    {/* Satellite Node Button */}
                    <div className={`relative flex items-center gap-2 p-2 sm:p-2.5 rounded-full transition-all duration-300 shadow-md ${isSelected
                      ? 'bg-[#1a1053] text-white scale-110 ring-4 ring-indigo-300/70 shadow-indigo-950/25 ring-offset-2'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:scale-105'
                      }`}>
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-white/15 text-white' : 'bg-slate-100 text-[#1a1053]'
                        }`}>
                        <StepIcon className="w-4 h-4" />
                      </div>

                      <div className="hidden sm:flex flex-col text-left pr-2">
                        <span className={`text-[9px] font-mono font-bold leading-none ${isSelected ? 'text-indigo-200' : 'text-slate-400'
                          }`}>
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-bold whitespace-nowrap leading-tight mt-0.5">
                          {step.title.split(' ')[0]}
                        </span>
                      </div>

                      {/* Active Indicator Pulse Dot */}
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#e20b27] border-2 border-white animate-ping" />
                      )}
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#e20b27] border-2 border-white" />
                      )}
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Right: Active Channel Inspector & Deep Dive Card with Controls */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_20px_50px_rgba(26,16,83,0.08)] relative overflow-hidden">

                {/* Subtle Interior Decorative Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -z-0" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-50/40 rounded-full blur-2xl pointer-events-none -z-0" />

                {/* Top Glowing Accent Line with Auto Progress Animation */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100/80 z-20">
                  <motion.div
                    key={activeEcosystemStep}
                    initial={{ width: "0%" }}
                    animate={{ width: isEcosystemPaused ? "100%" : "100%" }}
                    transition={{
                      duration: isEcosystemPaused ? 0.3 : 3.8,
                      ease: "linear"
                    }}
                    className="h-full bg-gradient-to-r from-[#1a1053] via-indigo-600 to-[#e20b27]"
                  />
                </div>

                {/* Step Indicator Top Control Bar */}
                <div className="flex items-center justify-between gap-3 mb-6 pt-1 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-900 text-xs font-bold shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-[#e20b27] animate-pulse" />
                      Phase {ecosystemSteps[activeEcosystemStep].step} of 06
                    </span>
                    <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">
                      {ecosystemSteps[activeEcosystemStep].badge}
                    </span>
                  </div>

                  {/* Play/Pause & Step Navigation Controls */}
                  <div className="inline-flex items-center gap-1 p-1 rounded-full bg-slate-100/90 border border-slate-200 shadow-2xs">
                    <button
                      onClick={() => setActiveEcosystemStep((prev) => (prev === 0 ? ecosystemSteps.length - 1 : prev - 1))}
                      aria-label="Previous Phase"
                      className="w-7 h-7 rounded-full bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all shadow-xs active:scale-95"
                      title="Previous phase"
                    >
                      <ChevronLeft size={14} />
                    </button>

                    <button
                      onClick={() => setIsEcosystemPaused(!isEcosystemPaused)}
                      aria-label={isEcosystemPaused ? "Resume Auto-Cycle" : "Pause Auto-Cycle"}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-xs active:scale-95 ${isEcosystemPaused
                        ? 'bg-[#e20b27] text-white'
                        : 'bg-white hover:bg-slate-50 text-[#1a1053]'
                        }`}
                      title={isEcosystemPaused ? "Resume auto rotation" : "Pause auto rotation"}
                    >
                      {isEcosystemPaused ? <Play size={12} className="ml-0.5" /> : <Pause size={12} />}
                    </button>

                    <button
                      onClick={() => setActiveEcosystemStep((prev) => (prev + 1) % ecosystemSteps.length)}
                      aria-label="Next Phase"
                      className="w-7 h-7 rounded-full bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all shadow-xs active:scale-95"
                      title="Next phase"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Active Channel Content Inspector */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEcosystemStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="space-y-5 relative z-10"
                  >

                    {/* Header Row with Icon & Title */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1a1053] to-indigo-950 text-white flex items-center justify-center shrink-0 shadow-md ring-4 ring-indigo-50">
                        {React.createElement(ecosystemSteps[activeEcosystemStep].icon, { className: "w-6 h-6 text-indigo-200" })}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-mono font-bold text-[#e20b27] uppercase tracking-wider block">
                          {ecosystemSteps[activeEcosystemStep].service}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1053] tracking-tight leading-snug">
                          {ecosystemSteps[activeEcosystemStep].title}
                        </h3>
                      </div>
                    </div>

                    {/* Channel Description */}
                    <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                      {ecosystemSteps[activeEcosystemStep].desc}
                    </p>

                    {/* Included Deliverables Pills */}
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Core System Deliverables
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {ecosystemSteps[activeEcosystemStep].deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-1.5 text-xs font-semibold text-slate-700"
                          >
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clinical ROI Impact Benchmark Box */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 border border-slate-200/90 shadow-2xs flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                          Verified Growth Impact
                        </div>
                        <div className="text-lg sm:text-xl font-black text-[#1a1053] mt-0.5">
                          {ecosystemSteps[activeEcosystemStep].metric}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                          Clinical Benchmark
                        </div>
                        <div className="text-sm font-bold text-emerald-600 flex items-center justify-end gap-1 mt-0.5">
                          <Check size={14} className="stroke-[3]" />
                          <span>{ecosystemSteps[activeEcosystemStep].kpiDetail}</span>
                        </div>
                      </div>
                    </div>

                    {/* Step Navigation Dots & Link */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        {ecosystemSteps.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setActiveEcosystemStep(dotIdx)}
                            aria-label={`Go to phase ${dotIdx + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${activeEcosystemStep === dotIdx
                              ? 'w-7 bg-[#1a1053]'
                              : 'w-2 bg-slate-200 hover:bg-slate-300'
                              }`}
                          />
                        ))}
                      </div>

                      <Link
                        href="#services-grid"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a1053] hover:text-[#e20b27] transition-colors group"
                      >
                        <span>Explore Channel Details</span>
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform text-[#e20b27]" />
                      </Link>
                    </div>

                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 4. INTERACTIVE PRACTICE GROWTH ESTIMATOR (Automated Simulator) */}
      {/* ============================================================ */}
      <section
        className="py-20 lg:py-28 bg-[#f8fafe] relative overflow-hidden border-b border-slate-200/80"
        onMouseEnter={() => setIsSpecialtyPaused(true)}
        onMouseLeave={() => setIsSpecialtyPaused(false)}
      >

        {/* Background Subtle Geometric Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#1a1053 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left Specialty Picker: Interactive Visual Cards with Auto-Cycle */}
            <div className="lg:col-span-6 space-y-6">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                <span>Live Practice Growth Simulator</span>
                <span className="text-slate-300">|</span>
                <span className={`text-[11px] font-bold ${isSpecialtyPaused ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {isSpecialtyPaused ? '❚❚ Paused' : '▶ Auto-Simulating'}
                </span>
              </div>

              <div className="space-y-3 mt-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
                  Select Your Clinical Specialty to Predict Patient Impact
                </h2>

                <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                  Real growth models derived from scaling 100+ private clinics, diagnostic centers, and hospital practices across Pune & PCMC.
                </p>
              </div>

              {/* Specialty Selector Cards with Auto-Countdown Bar */}
              <div className="space-y-3 pt-2">
                {roiSpecialties.map((spec, i) => {
                  const isSelected = selectedSpecialty === i;
                  const SpecIcon = spec.icon;

                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedSpecialty(i)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden ${isSelected
                        ? 'bg-white border-indigo-400/90 shadow-[0_10px_30px_rgba(26,16,83,0.08)] ring-2 ring-indigo-500/20 translate-x-1'
                        : 'bg-white/70 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs'
                        }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${isSelected
                            ? 'bg-[#1a1053] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/80 group-hover:text-[#1a1053]'
                            }`}>
                            <SpecIcon className="w-5 h-5" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold leading-tight ${isSelected ? 'text-[#1a1053]' : 'text-slate-800'
                                }`}>
                                {spec.name}
                              </span>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-[#e20b27] animate-pulse" />
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 font-normal line-clamp-1 mt-0.5">
                              {spec.tagline}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0 pl-2">
                          <span className={`text-xs font-mono font-bold block ${isSelected ? 'text-[#e20b27]' : 'text-slate-500'
                            }`}>
                            {spec.avgConsultations}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            Inquiries/mo
                          </span>
                        </div>
                      </div>

                      {/* Active Auto-Timer Progress Line */}
                      {isSelected && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-50">
                          <motion.div
                            key={`timer-${selectedSpecialty}`}
                            initial={{ width: "0%" }}
                            animate={{ width: isSpecialtyPaused ? "100%" : "100%" }}
                            transition={{
                              duration: isSpecialtyPaused ? 0.2 : 4.2,
                              ease: "linear"
                            }}
                            className="h-full bg-gradient-to-r from-[#1a1053] to-[#e20b27]"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right: Simulated Clinical Growth Dashboard Card (Compact & Streamlined) */}
            <div className="lg:col-span-6 lg:h-full">
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_12px_35px_rgba(26,16,83,0.06)] relative overflow-hidden h-full flex flex-col">

                {/* Top Glowing Header Accent with Auto-Progress Animation */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
                  <motion.div
                    key={`dash-timer-${selectedSpecialty}`}
                    initial={{ width: "0%" }}
                    animate={{ width: isSpecialtyPaused ? "100%" : "100%" }}
                    transition={{
                      duration: isSpecialtyPaused ? 0.2 : 4.2,
                      ease: "linear"
                    }}
                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]"
                  />
                </div>

                {/* Dashboard Card Header (Compact) */}
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 pt-1 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1a1053] text-white flex items-center justify-center shadow-xs shrink-0">
                      {React.createElement(roiSpecialties[selectedSpecialty].icon, { className: "w-5 h-5 text-indigo-200" })}
                    </div>
                    <div>
                      <div className="text-[9px] uppercase font-mono font-bold text-slate-400 tracking-wider mb-0.5">
                        Forecast
                      </div>
                      <h3 className="text-base font-extrabold text-[#1a1053] leading-none">
                        {roiSpecialties[selectedSpecialty].name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                      <CheckCircle2 size={12} />
                      {roiSpecialties[selectedSpecialty].roiMultiple}
                    </span>

                    {/* Mini Controls */}
                    <div className="inline-flex items-center gap-0.5 p-1 rounded-lg bg-slate-100 border border-slate-200">
                      <button
                        onClick={() => setSelectedSpecialty((prev) => (prev === 0 ? roiSpecialties.length - 1 : prev - 1))}
                        aria-label="Previous Specialty"
                        className="w-6 h-6 rounded hover:bg-white text-slate-700 flex items-center justify-center transition-all shadow-2xs"
                        title="Previous specialty"
                      >
                        <ChevronLeft size={12} />
                      </button>

                      <button
                        onClick={() => setIsSpecialtyPaused(!isSpecialtyPaused)}
                        aria-label={isSpecialtyPaused ? "Resume Simulator" : "Pause Simulator"}
                        className={`w-6 h-6 rounded flex items-center justify-center transition-all shadow-2xs ${isSpecialtyPaused
                          ? 'bg-[#e20b27] text-white'
                          : 'hover:bg-white text-[#1a1053]'
                          }`}
                        title={isSpecialtyPaused ? "Resume auto cycle" : "Pause auto cycle"}
                      >
                        {isSpecialtyPaused ? <Play size={10} className="ml-0.5" /> : <Pause size={10} />}
                      </button>

                      <button
                        onClick={() => setSelectedSpecialty((prev) => (prev + 1) % roiSpecialties.length)}
                        aria-label="Next Specialty"
                        className="w-6 h-6 rounded hover:bg-white text-slate-700 flex items-center justify-center transition-all shadow-2xs"
                        title="Next specialty"
                      >
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4-Metric Financial & Inflow Bento Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedSpecialty}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex-1 flex flex-col justify-between space-y-6"
                  >

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Metric 1 */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200/60 shadow-2xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Monthly Inquiries
                          </span>
                          <Users size={14} className="text-blue-600" />
                        </div>
                        <div className="text-xl sm:text-2xl font-extrabold text-[#1a1053] tracking-tight leading-none">
                          {roiSpecialties[selectedSpecialty].avgConsultations}
                        </div>
                      </div>

                      {/* Metric 2 */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-rose-50/30 border border-slate-200/60 shadow-2xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Revenue Impact
                          </span>
                          <TrendingUp size={14} className="text-[#e20b27]" />
                        </div>
                        <div className="text-xl sm:text-2xl font-extrabold text-[#e20b27] tracking-tight leading-none">
                          {roiSpecialties[selectedSpecialty].estRev}
                        </div>
                      </div>

                      {/* Metric 3 */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Target CAC
                          </span>
                          <span className="text-sm font-extrabold text-[#1a1053] block">
                            {roiSpecialties[selectedSpecialty].cac}
                          </span>
                        </div>
                      </div>

                      {/* Metric 4 */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            OPD Conversion
                          </span>
                          <span className="text-sm font-extrabold text-emerald-600 block">
                            {roiSpecialties[selectedSpecialty].opdRate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Patient Channel Acquisition Breakdown */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                        <span>Patient Channel Mix</span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Multi-Touch</span>
                      </div>

                      {/* Stacked Progress Bar */}
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex gap-0.5">
                        {roiSpecialties[selectedSpecialty].funnelMix.map((f, fIdx) => (
                          <div
                            key={fIdx}
                            style={{ width: `${f.pct}%` }}
                            className={`h-full ${f.color} transition-all duration-500`}
                          />
                        ))}
                      </div>

                      {/* Channel Legend */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] sm:text-xs text-slate-600 font-medium">
                        {roiSpecialties[selectedSpecialty].funnelMix.map((f, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${f.color}`} />
                            <span className="text-slate-700">{f.channel}</span>
                            <span className="text-slate-400">({f.pct}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Growth Mix Deliverables */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Recommended Engine:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {roiSpecialties[selectedSpecialty].recommended.map((rec, rIdx) => (
                          <span
                            key={rIdx}
                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[#1a1053] text-[10px] sm:text-xs font-bold shadow-2xs flex items-center gap-1.5"
                          >
                            <CheckCircle2 size={12} className="text-emerald-600" />
                            <span>{rec}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button Block */}
                    <div className="pt-2">
                      <Link
                        href="/contact"
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#1a1053] hover:bg-[#e20b27] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-300 group"
                      >
                        <span>Custom Strategy for {roiSpecialties[selectedSpecialty].name}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 5. WHY CHOOSE CODIGIX INFOTECH (Grid Cards) */}
      {/* ============================================================ */}
      <section className="py-12 lg:py-16 bg-white relative">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
              Why Healthcare Leaders Choose Us
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              The Codigix Edge
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              {
                title: "100% Healthcare Specialized",
                desc: "We only serve medical doctors, multi-specialty clinics, diagnostic labs, and hospitals. No generic templates.",
                icon: Stethoscope
              },
              {
                title: "Clinical Accuracy & Compliance",
                desc: "Strict adherence to MCI ethics, NABH standards, and medical facts verified by medical writers.",
                icon: ShieldCheck
              },
              {
                title: "Local Pune & PCMC Mastery",
                desc: "Unmatched expertise in micro-catchments (Baner, Wakad, Kothrud, Pimpri, Chinchwad, Nigdi, Hinjewadi).",
                icon: MapPin
              },
              {
                title: "Data-Driven Patient Inquiries",
                desc: "We focus strictly on verified patient phone calls and clinic footfall rather than superficial vanity impressions.",
                icon: Target
              },
              {
                title: "Multi-Channel Cohesion",
                desc: "Your SEO, Google Ads, Doctor Reels, and Website work together as a synchronized patient conversion engine.",
                icon: Layers
              },
              {
                title: "Transparent Live Reporting",
                desc: "Access real-time dashboards showing every phone inquiry, booked consultation, and search ranking 24/7.",
                icon: BarChart3
              }
            ].map((item, idx) => {
              const IconC = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_10px_rgba(26,16,83,0.03)] hover:shadow-[0_8px_20px_rgba(26,16,83,0.08)] hover:border-indigo-300 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                    <IconC className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#1a1053] group-hover:text-indigo-700 transition-colors">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 6. FAQ (Frequently Asked Questions) */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-[#fafcff] relative border-t border-slate-200/80">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          <div className="max-w-4xl mx-auto">

            {/* FAQ Accordion */}
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold uppercase tracking-wider mb-4">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Clear Answers
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                        ? 'bg-white border-indigo-200 shadow-[0_10px_30px_rgba(26,16,83,0.06)]'
                        : 'bg-white/60 border-slate-200/60 hover:border-slate-300 hover:bg-white hover:shadow-sm'
                        }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4"
                      >
                        <h4 className={`text-base sm:text-lg font-bold transition-colors leading-snug mt-0.5 ${isOpen ? 'text-[#1a1053]' : 'text-slate-800 group-hover:text-[#1a1053]'}`}>
                          {faq.q}
                        </h4>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#1a1053] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'}`}>
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed font-light border-t border-slate-100 pt-4">
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

          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 7. BOTTOM BANNER CTA (Redesigned Light Luxury Card Layout) */}
      {/* ============================================================ */}


    </main>
  );
}
