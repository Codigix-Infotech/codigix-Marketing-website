"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ClientShowcaseSection from '@/components/services/ClientShowcaseSection';
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
    title: "SEO & Local Profile Management",
    subtitle: "Technical Site Optimization & Accurate Listings",
    desc: "Technical site optimization, structured metadata, crawl/index health, and accurate management of business listing details (location, hours, departments, services, and factual information) without ranking manipulation or guaranteed position claims.",
    href: "/best-seo-services-in-pcmc",
    icon: Search,
    gradient: "from-emerald-500 to-teal-600",
    badge: "Organic Search",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tagColor: "text-emerald-600",
    readTime: "3 min read",
    highlights: ["Structured Data & Schema", "Accurate Business Listings", "Crawl & Index Health"],
    metric: "Technical SEO",
    metricLabel: "No Guaranteed Positions"
  },
  {
    id: "ppc",
    category: "paid",
    number: "02",
    title: "Paid Digital Campaigns",
    subtitle: "Policy-Compliant Search & Social Campaigns",
    desc: "Targeted, policy-compliant search and social campaigns designed around clear, truthful messaging and transparent audience disclosures.",
    href: "/paid-advertisements-ppc",
    icon: Zap,
    gradient: "from-amber-500 to-orange-600",
    badge: "Policy-Compliant",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    tagColor: "text-amber-600",
    readTime: "2 min read",
    highlights: ["Factual Ad Copy", "Transparent Audience Disclosures", "No Inducements or Cure Promises"],
    metric: "Truthful Messaging",
    metricLabel: "Platform Policy Aligned"
  },
  {
    id: "social",
    category: "branding",
    number: "03",
    title: "Social Media & Educational Video Production",
    subtitle: "Public-Health Awareness & Institutional Updates",
    desc: "Structured video and social content focused on public-health awareness, institutional updates, and clear educational explanations, complete with appropriate practitioner credential disclosures and AI source labels where applicable.",
    href: "/social-media-marketing",
    icon: Instagram,
    gradient: "from-pink-500 to-rose-600",
    badge: "Educational Content",
    badgeBg: "bg-pink-50 text-pink-700 border-pink-200",
    tagColor: "text-pink-600",
    readTime: "3 min read",
    highlights: ["Public-Health Awareness Videos", "Credential Disclosures", "AI-Assisted Media Labelled"],
    metric: "Credential Disclosure",
    metricLabel: "AI Source Labels Where Applicable"
  },
  {
    id: "ecommerce",
    category: "ecommerce",
    number: "04",
    title: "Commercial & E-Commerce Solutions",
    subtitle: "Retail Commerce, Kept Separate from Clinical Communication",
    desc: "Catalog architecture, storefront performance, and digital workflows tailored for commercial and non-regulated retail businesses.",
    href: "/ecommerce-marketing",
    icon: ShoppingCart,
    gradient: "from-blue-500 to-indigo-600",
    badge: "Retail Commerce",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    tagColor: "text-blue-600",
    readTime: "4 min read",
    highlights: ["Catalog Architecture", "Storefront Performance", "Marketplace Listing Accuracy"],
    metric: "Non-Regulated Retail",
    metricLabel: "Outside NMC Scope"
  },
  {
    id: "content",
    category: "branding",
    number: "05",
    title: "Health & Institutional Content Architecture",
    subtitle: "Accurate, Review-Ready Informational Content",
    desc: "Well-organized informational pages, department guides, and public-health articles written for clarity, accuracy, and compliance review prior to publication.",
    href: "/medical-content-marketing",
    icon: FileText,
    gradient: "from-purple-500 to-indigo-600",
    badge: "Content Architecture",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    tagColor: "text-purple-600",
    readTime: "3 min read",
    highlights: ["Department Guides", "Public-Health Articles", "Pre-Publication Review"],
    metric: "Reviewed Before Publishing",
    metricLabel: "Factual Accuracy & Source Notes"
  },
  {
    id: "web",
    category: "web",
    number: "06",
    title: "Web Design & Development",
    subtitle: "Accessible, Fast, Privacy-Aware Websites",
    desc: "Responsive, accessible, and security-conscious web applications built with clear privacy controls aligned with Indian data-protection laws.",
    href: "/web-design-development",
    icon: Code2,
    gradient: "from-indigo-500 to-violet-600",
    badge: "Web Engineering",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    tagColor: "text-indigo-600",
    readTime: "3 min read",
    highlights: ["Core Web Vitals Focused", "WCAG 2.1 AA Aligned", "DPDP-Aligned Forms"],
    metric: "Privacy by Design",
    metricLabel: "IT Act, 2000 & DPDP Act, 2023"
  }
];

const ecosystemSteps = [
  {
    step: "01",
    title: "Search & Listing Accuracy",
    service: "SEO & Local Profile Management",
    badge: "Discovery Layer",
    desc: "Accurate institutional details, structured metadata, and clean site architecture help people find correct information about your organization in Pune & PCMC.",
    deliverables: ["Accurate Listing Details", "Structured Data & Schema", "Crawl & Index Health"],
    metric: "Technical SEO Hygiene",
    kpiDetail: "No Ranking Guarantees",
    icon: Search
  },
  {
    step: "02",
    title: "Transparent Paid Campaigns",
    service: "Paid Digital Campaigns",
    badge: "Policy-Compliant",
    desc: "Search and social campaigns use clear, truthful messaging and transparent audience disclosures, with no inducements or cure promises.",
    deliverables: ["Factual Ad Copy", "Audience Disclosures", "Platform Policy Alignment"],
    metric: "Truthful Messaging",
    kpiDetail: "Non-Soliciting Copy",
    icon: Zap
  },
  {
    step: "03",
    title: "Educational Video & Social",
    service: "Educational Video & Social Media",
    badge: "Public-Health Awareness",
    desc: "Structured educational videos and institutional updates with practitioner credential disclosures and AI source labels where applicable.",
    deliverables: ["Public-Health Explainers", "Credential Disclosures", "AI Media Labelling"],
    metric: "Credential Disclosure",
    kpiDetail: "AI Source Labels",
    icon: Instagram
  },
  {
    step: "04",
    title: "Content Architecture & Review",
    service: "Health & Institutional Content",
    badge: "Public Education",
    desc: "Department guides and public-health articles are written from established consensus and reviewed for accuracy and compliance before publication.",
    deliverables: ["Department Guides", "Source-Referenced Articles", "Pre-Publication Compliance Review"],
    metric: "Reviewed Before Publishing",
    kpiDetail: "Source Notes Included",
    icon: FileText
  },
  {
    step: "05",
    title: "Accessible, Privacy-Aware Web",
    service: "Web Design & Development",
    badge: "Web Engineering",
    desc: "Responsive, accessible websites with transparent privacy notices and minimal data collection on forms.",
    deliverables: ["Core Web Vitals Focused", "WCAG 2.1 AA Aligned", "DPDP-Aligned Forms"],
    metric: "Privacy by Design",
    kpiDetail: "IT Act & DPDP Aligned",
    icon: Code2
  },
  {
    step: "06",
    title: "Commercial & Retail Workflows",
    service: "Commercial & E-Commerce Solutions",
    badge: "Non-Regulated Retail",
    desc: "Catalog architecture and storefront workflows for commercial and non-regulated retail businesses, kept separate from clinical communication.",
    deliverables: ["Catalog Architecture", "Storefront Performance", "Workflow Automation"],
    metric: "Retail Commerce",
    kpiDetail: "Outside NMC Scope",
    icon: ShoppingCart
  }
];

const roiSpecialties = [
  {
    name: "NMC Framework",
    tagline: "Hospitals & Allopathic Practices",
    avgConsultations: "Factual Institutional Info",
    estRev: "Credential & Registration Disclosure",
    cac: "No Solicitation",
    opdRate: "Reviewed Before Publishing",
    roiMultiple: "NMC Aligned",
    timeline: "Scope defined during discovery",
    icon: Building2,
    funnelMix: [
      { channel: "Website & Department Pages", pct: 40, color: "bg-blue-600" },
      { channel: "Technical SEO & Accurate Listings", pct: 35, color: "bg-indigo-600" },
      { channel: "Public-Health Education", pct: 25, color: "bg-purple-600" }
    ],
    recommended: ["Department Guides", "Accurate Practitioner Profiles", "DPDP-Aligned Forms"]
  },
  {
    name: "NDC Framework",
    tagline: "Dental Clinics & Specialized Dental Care",
    avgConsultations: "Factual Clinic Information",
    estRev: "Credential & Registration Disclosure",
    cac: "No Inducements",
    opdRate: "Reviewed Before Publishing",
    roiMultiple: "NDC Aligned",
    timeline: "Scope defined during discovery",
    icon: Sparkles,
    funnelMix: [
      { channel: "Clinic Website & Service Pages", pct: 45, color: "bg-blue-600" },
      { channel: "Accurate Local Listings", pct: 30, color: "bg-indigo-600" },
      { channel: "Oral-Health Education", pct: 25, color: "bg-purple-600" }
    ],
    recommended: ["Service Page Architecture", "Accurate Listing Details", "Privacy Notices"]
  },
  {
    name: "AYUSH Framework",
    tagline: "Ayurvedic & Traditional Medicine Practices",
    avgConsultations: "Factual Practice Information",
    estRev: "Registration Disclosure",
    cac: "No Cure Promises",
    opdRate: "Reviewed Before Publishing",
    roiMultiple: "AYUSH Aligned",
    timeline: "Scope defined during discovery",
    icon: HeartPulse,
    funnelMix: [
      { channel: "Practice Website & Information Pages", pct: 45, color: "bg-emerald-600" },
      { channel: "Accurate Local Listings", pct: 30, color: "bg-indigo-600" },
      { channel: "Wellness Education", pct: 25, color: "bg-purple-600" }
    ],
    recommended: ["Informational Pages", "Registration Disclosures", "Responsible Content Review"]
  },
  {
    name: "Enterprises & Commercial",
    tagline: "Non-Medical Sectors, Outside NMC Scope",
    avgConsultations: "Catalog & Site Architecture",
    estRev: "Storefront Performance",
    cac: "Transparent Campaigns",
    opdRate: "Policy-Compliant Messaging",
    roiMultiple: "Non-Medical",
    timeline: "Scope defined during discovery",
    icon: Target,
    funnelMix: [
      { channel: "Website & Catalog Engineering", pct: 40, color: "bg-blue-600" },
      { channel: "Technical SEO", pct: 35, color: "bg-indigo-600" },
      { channel: "Policy-Compliant Campaigns", pct: 25, color: "bg-purple-600" }
    ],
    recommended: ["Catalog Architecture", "Technical SEO Hygiene", "Workflow Automation"]
  },
  {
    name: "Multi-Speciality Hospital",
    tagline: "Multi-Department Institutional Information Systems",
    avgConsultations: "Department-Wise Information",
    estRev: "Accessible Site Architecture",
    cac: "No Referral Incentives",
    opdRate: "Reviewed Before Publishing",
    roiMultiple: "NMC Aligned",
    timeline: "Scope defined during discovery",
    icon: Activity,
    funnelMix: [
      { channel: "Institutional Website System", pct: 40, color: "bg-blue-600" },
      { channel: "Technical SEO & Accurate Listings", pct: 35, color: "bg-indigo-600" },
      { channel: "Public-Health Education", pct: 25, color: "bg-purple-600" }
    ],
    recommended: ["Department Guides", "Accessible Web System", "Privacy-by-Design Forms"]
  }
];

const faqs = [
  {
    q: "Which digital service should my organization start with?",
    a: "Most engagements begin with a Web Design & Development or technical SEO review, since accurate, accessible, fast-loading pages and clean site structure are the foundation for everything else. Educational content and policy-compliant campaigns can follow once that foundation is in place."
  },
  {
    q: "Do you work only with healthcare organizations?",
    a: "No. We work across hospitals, clinics, enterprises, and commercial businesses. For healthcare engagements we follow applicable NMC (allopathic/hospital), NDC (dental), and AYUSH (Ayurvedic) communication principles, and non-medical sectors sit outside NMC scope."
  },
  {
    q: "Can I combine multiple services into a single plan?",
    a: "Yes. Many organizations combine web development, technical SEO, content architecture, and educational video into one coordinated scope. Fees are service-based and are never tied to acquiring individual patients or to referral incentives."
  },
  {
    q: "How do you report on the work?",
    a: "We provide transparent reporting on technical health: site performance, accessibility checks, crawl and index status, listing accuracy, and content review status. We do not promise or guarantee specific rankings or business outcomes."
  },
  {
    q: "What makes Codigix Infotech different from general agencies?",
    a: "Every deliverable passes an internal pre-publication review covering factual accuracy, credential and registration disclosures, privacy safeguards, and AI labeling, with data handled in line with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (and 2025 Rules)."
  }
];

export default function ServicesPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(0);
  const [isSpecialtyPaused, setIsSpecialtyPaused] = useState(false);
  const [activeEcosystemStep, setActiveEcosystemStep] = useState(0);
  const [isEcosystemPaused, setIsEcosystemPaused] = useState(false);
  // Auto-advancing re-renders this whole page, so only do it while each widget is visible.
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const specialtyRef = useRef<HTMLElement>(null);
  const ecosystemInView = useInView(ecosystemRef, { amount: 0.2 });
  const specialtyInView = useInView(specialtyRef, { amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Auto-animate 360° Healthcare Growth Ecosystem steps
  useEffect(() => {
    if (isEcosystemPaused || !ecosystemInView) return;

    const interval = setInterval(() => {
      setActiveEcosystemStep((prev) => (prev + 1) % ecosystemSteps.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isEcosystemPaused, ecosystemInView]);

  // Auto-cycle Practice Growth Estimator Specialties (Hands-free simulation)
  useEffect(() => {
    if (isSpecialtyPaused || !specialtyInView) return;

    const interval = setInterval(() => {
      setSelectedSpecialty((prev) => (prev + 1) % roiSpecialties.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isSpecialtyPaused, specialtyInView]);

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#e20b27] selection:text-white pt-20 lg:pt-24">

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
                  Pune | Digital Infrastructure & Ethical Healthcare Communication
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-6xl font-extrabold text-[#1a1053] tracking-tight leading-[1.12]">
                Digital Strategy, Web Systems & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                  Compliance-Aligned Communication
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-2xl">
                Codigix Infotech builds reliable websites, accurate institutional profiles, and structured public-health content for hospitals, clinics, and enterprises, designed around transparency, accessibility, and regulatory alignment.
              </p>

              {/* Value Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  "Accurate Institutional & Listing Information",
                  "NMC, NDC & AYUSH Communication Principles",
                  "Accessible, DPDP-Aligned Web Systems",
                  "Pre-Publication Factual & Compliance Review"
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
                  <span>Schedule a Discovery Call</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#services-grid"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-slate-50 text-[#1a1053] border border-slate-200 font-semibold text-sm shadow-xs transition-all"
                >
                  <span>Explore Our Services</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              {/* Review & Trust Proof */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200/80">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-[#1a1053] shadow-xs">
                      <ShieldCheck size={14} />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-slate-800">
                    <span className="text-xs font-bold">Service-based engagements only</span>
                  </div>
                  <p className="text-xs text-slate-500 font-light">Serving hospitals, clinics, and enterprises across Pune & PCMC</p>
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
                          <h4 className="font-bold text-[#1a1053] text-base">Digital Systems Hub</h4>
                          <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-50" />
                        </div>
                        <p className="text-xs text-slate-500 font-light">Institutional Information Systems</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Capabilities
                    </span>
                  </div>

                  {/* 3 Metric Summary Blocks */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3.5 rounded-2xl bg-[#f8fafe] border border-slate-200/80">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Search</div>
                      <div className="text-lg sm:text-xl font-black text-emerald-600 mt-0.5">Schema</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Structured Data</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#f8fafe] border border-slate-200/80">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Accessibility</div>
                      <div className="text-lg sm:text-xl font-black text-blue-600 mt-0.5">WCAG</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">2.1 AA Aligned</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#f8fafe] border border-slate-200/80">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Privacy</div>
                      <div className="text-lg sm:text-xl font-black text-[#e20b27] mt-0.5">DPDP</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Aligned Forms</div>
                    </div>
                  </div>

                  {/* Engagement Scope Preview List */}
                  <div className="space-y-2.5 bg-[#f8fafe] rounded-2xl p-4 border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1a1053] uppercase tracking-wider">
                      <span>Typical Engagement Scope</span>
                      <span className="text-emerald-600 font-medium">● Reviewed</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="font-medium text-slate-800">Department & Service Pages</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">Content</span>
                      </div>

                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="font-medium text-slate-800">Technical SEO Hygiene</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">Search</span>
                      </div>

                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                          <span className="font-medium text-slate-800">Privacy & Consent Notices</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">Compliance</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Action */}
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Ethical Communication Principles
                    </span>
                    <Link href="/contact" className="font-bold text-[#e20b27] hover:underline">
                      Discuss Your Project →
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
          animate={{ transform: ["translate(0px, 0px) scale(1)", "translate(0px, -25px) scale(1.08)", "translate(0px, 0px) scale(1)"] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-400/8 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div
          animate={{ transform: ["translate(0px, 0px) scale(1)", "translate(0px, 25px) scale(1.08)", "translate(0px, 0px) scale(1)"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-[#e20b27]/6 rounded-full blur-[140px] pointer-events-none"
        />

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

          {/* Section Header with Scroll-Triggered Animation */}
          <motion.div
            initial={{ opacity: 0, transform: "translate(0px, 25px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <motion.div
              initial={{ opacity: 0, transform: "scale(0.9)" }}
              whileInView={{ opacity: 1, transform: "scale(1)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-[#1a1053] text-[11px] font-bold uppercase tracking-wider mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#e20b27] animate-pulse" />
              <span>Core Service Areas</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
              Explore Our Digital Services
            </h2>

            <p className="mt-2.5 text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Web engineering, structured information design, search discoverability, and clear educational communication for hospitals, clinics, enterprises, and commercial businesses.
            </p>

            {/* Quick Practice Trust Highlights with Smooth Stagger */}
            <motion.div
              initial={{ opacity: 0, transform: "translate(0px, 15px)" }}
              whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold text-slate-700"
            >
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>NMC, NDC & AYUSH Principles</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-colors">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span>IT Act & DPDP Aligned</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs hover:border-rose-300 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-[#e20b27]" />
                <span>Pune & PCMC Based</span>
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
            initial={{ opacity: 0, transform: "translate(0px, 25px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-10 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(26,16,83,0.04)] flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-1.5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Custom Service Scope</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1053]">
                Not sure which service mix fits your organization?
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-light">
                Schedule a discovery call. We will review your current website and information structure and recommend a suitable scope of work.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-[#e20b27] hover:bg-[#c00920] text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-950/20 hover:scale-105 transition-all"
              >
                Schedule a Discovery Call →
              </Link>
              <a
                href="tel:+918208468757"
                className="w-full sm:w-auto text-center px-5 py-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#1a1053] font-bold text-xs sm:text-sm transition-all"
              >
                Talk to Our Team
              </a>
            </div>
          </motion.div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 3. SERVICE FRAMEWORK (Orbital Wheel) */}
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
              <span>Connected Service Framework</span>
              <span className="text-slate-300">|</span>
              <span className={`text-[11px] font-bold ${isEcosystemPaused ? 'text-amber-600' : 'text-emerald-600'}`}>
                {isEcosystemPaused ? '❚❚ Paused' : '▶ Auto-Cycling'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
              How Our Services Fit Together
            </h2>

            <p className="mt-3 text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Each service area builds on accurate information, accessible engineering, and privacy-aware design, with every deliverable reviewed before publication.
            </p>
          </div>

          {/* 360° Circular Orbital Interactive Arena */}
          <div
            ref={ecosystemRef}
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
                    onMouseEnter={() => setActiveEcosystemStep(idx)}
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
                    initial={{ transform: "scaleX(0)" }}
                    animate={{ transform: "scaleX(1)" }}
                    transition={{
                      duration: isEcosystemPaused ? 0.3 : 3.8,
                      ease: "linear"
                    }}
                    className="h-full w-full origin-left bg-gradient-to-r from-[#1a1053] via-indigo-600 to-[#e20b27]"
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
                          Focus Area
                        </div>
                        <div className="text-lg sm:text-xl font-black text-[#1a1053] mt-0.5">
                          {ecosystemSteps[activeEcosystemStep].metric}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                          Principle
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
                            onMouseEnter={() => setActiveEcosystemStep(dotIdx)}
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
                        <span>Explore Service Details</span>
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
      {/* 4. REGULATORY SCOPE EXPLORER */}
      {/* ============================================================ */}
      <section
        ref={specialtyRef}
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
                <span>Regulatory Scope Explorer</span>
                <span className="text-slate-300">|</span>
                <span className={`text-[11px] font-bold ${isSpecialtyPaused ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {isSpecialtyPaused ? '❚❚ Paused' : '▶ Auto-Cycling'}
                </span>
              </div>

              <div className="space-y-3 mt-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
                  Select Your Sector to See the Applicable Framework
                </h2>

                <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                  Healthcare engagements follow NMC (allopathic/hospital), NDC (dental), and AYUSH (Ayurvedic) communication principles; non-medical sectors sit outside NMC scope.
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
                            Focus
                          </span>
                        </div>
                      </div>

                      {/* Active Auto-Timer Progress Line */}
                      {isSelected && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-50">
                          <motion.div
                            key={`timer-${selectedSpecialty}`}
                            initial={{ transform: "scaleX(0)" }}
                            animate={{ transform: "scaleX(1)" }}
                            transition={{
                              duration: isSpecialtyPaused ? 0.2 : 4.2,
                              ease: "linear"
                            }}
                            className="h-full w-full origin-left bg-gradient-to-r from-[#1a1053] to-[#e20b27]"
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
                    initial={{ transform: "scaleX(0)" }}
                    animate={{ transform: "scaleX(1)" }}
                    transition={{
                      duration: isSpecialtyPaused ? 0.2 : 4.2,
                      ease: "linear"
                    }}
                    className="h-full w-full origin-left bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]"
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
                        Framework
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
                            Information Focus
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
                            Disclosure / Scope
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
                            Engagement Principle
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
                            Review Standard
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
                        <span>Work Focus Areas</span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Typical Mix</span>
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
                            
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Deliverables */}
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
                        <span>Discuss Scope for {roiSpecialties[selectedSpecialty].name}</span>
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
      {/* 4.5. CLIENT SUCCESS SHOWCASE (SAME AS SEO PAGE) */}
      {/* ============================================================ */}
      <ClientShowcaseSection />

      {/* ============================================================ */}
      {/* 5. WHY CHOOSE CODIGIX INFOTECH (Grid Cards) */}
      {/* ============================================================ */}
      <section className="py-12 lg:py-16 bg-white relative">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight leading-tight">
              Why Organizations Choose Us
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              The Codigix Edge
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              {
                title: "Healthcare & Enterprise Experience",
                desc: "We work across hospitals, clinics, enterprises, and commercial businesses, with scope-specific processes rather than generic templates.",
                icon: Stethoscope
              },
              {
                title: "Clinical Accuracy & Compliance",
                desc: "Factual, non-promotional framing for medical engagements, with credential and registration disclosures and pre-publication review.",
                icon: ShieldCheck
              },
              {
                title: "Local Pune & PCMC Presence",
                desc: "A Pune-based team familiar with the local areas (Baner, Wakad, Kothrud, Pimpri, Chinchwad, Nigdi, Hinjewadi).",
                icon: MapPin
              },
              {
                title: "Data Protection First",
                desc: "We design touchpoints with data minimization and security in mind, aligned with the IT Act, 2000 and the DPDP Act, 2023 (and 2025 Rules).",
                icon: Target
              },
              {
                title: "Multi-Channel Cohesion",
                desc: "Your website, search structure, content, and campaigns are planned together so information stays consistent.",
                icon: Layers
              },
              {
                title: "Transparent Reporting",
                desc: "Clear reporting on site performance, accessibility, listing accuracy, and content review status.",
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


    </div>
  );
}
