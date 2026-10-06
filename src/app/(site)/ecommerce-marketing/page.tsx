"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ClientShowcaseSection from '@/components/services/ClientShowcaseSection';
import {
  ShoppingCart,
  ShoppingBag,
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
  DollarSign,
  Package,
  Store,
  RefreshCw,
  Percent,
  CreditCard,
  Truck,
  Repeat,
  Mail,
  Smartphone,
  MapPin
} from 'lucide-react';

const whatWeDoList = [
  {
    num: "01",
    title: "Product Listing Optimization on Amazon, Flipkart & Store",
    desc: "Complete optimization of product titles, bullet points, high-converting healthcare copywriting, rich A+ content, and search backend keywords.",
    icon: ShoppingCart,
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    num: "02",
    title: "Healthcare E-Commerce SEO Strategies",
    desc: "Technical SEO, category taxonomy restructuring, rich product schema markup, and long-tail transactional keyword rankings on Google.",
    icon: Search,
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    num: "03",
    title: "Paid Ad Campaigns for Product Visibility",
    desc: "Laser-targeted Google Shopping campaigns, Performance Max (PMax), Meta Catalog sales ads, and Amazon PPC to drive instant product purchases.",
    icon: Zap,
    color: "from-purple-600 to-pink-600",
    bg: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    num: "04",
    title: "Cart Abandonment & Remarketing Campaigns",
    desc: "Automated WhatsApp and email checkout recovery flows combined with dynamic social remarketing to recover up to 35%+ of dropped carts.",
    icon: Repeat,
    color: "from-amber-600 to-orange-600",
    bg: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    num: "05",
    title: "Review & Reputation Management for Products",
    desc: "Ethical customer feedback collection, verified review generation, and star rating optimization across Google, Amazon, and your online store.",
    icon: Star,
    color: "from-rose-600 to-red-600",
    bg: "bg-rose-50 text-rose-600 border-rose-200"
  },
  {
    num: "06",
    title: "Sales Funnel Optimization & Conversion Tracking",
    desc: "Deep conversion rate optimization (CRO) from product landing page to 1-click checkout, tracked via GA4 e-commerce telemetry.",
    icon: BarChart3,
    color: "from-cyan-600 to-blue-600",
    bg: "bg-cyan-50 text-cyan-600 border-cyan-200"
  }
];

const whatYouGetCards = [
  {
    icon: ShoppingBag,
    title: "Increased Sales & Revenue",
    desc: "We focus on real bottom-line conversion optimization, average order value (AOV), and profit margins, not just surface traffic.",
    stat: "3.8x+",
    statLabel: "Revenue Scaling",
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50/80 border-blue-200/70"
  },
  {
    icon: DollarSign,
    title: "Better ROI on Ad Spend",
    desc: "Maximize returns with hyper-targeted product ads, negative keyword pruning, and catalog scaling across Google & Meta.",
    stat: "5.2x",
    statLabel: "Average ROAS",
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50/80 border-emerald-200/70"
  },
  {
    icon: Target,
    title: "Higher Conversion Rates",
    desc: "Turn passive store browsers into verified buyers with friction-free checkout, trust badges, and sub-second page loads.",
    stat: "+45%",
    statLabel: "CVR Boost",
    color: "from-amber-600 to-orange-600",
    bg: "bg-amber-50/80 border-amber-200/70"
  },
  {
    icon: Repeat,
    title: "Customer Retention & Loyalty",
    desc: "Build repeat purchase subscription systems, automated re-order reminders, and high-LTV VIP customer retention funnels.",
    stat: "40%+",
    statLabel: "Repeat Orders",
    color: "from-purple-600 to-indigo-600",
    bg: "bg-purple-50/80 border-purple-200/70"
  }
];

const ecommerceServicesIncluded = [
  {
    title: "E-Commerce SEO",
    subtitle: "Google Product Rankings",
    desc: "Rank your healthcare products and treatment categories on the 1st page of Google for high-intent transactional buyer searches.",
    icon: Search,
    color: "text-blue-600 bg-blue-50 border-blue-200/70",
    pill: "Organic Search",
    points: ["Category & product page SEO", "E-commerce schema structured data", "High-DA shopping authority backlinks"]
  },
  {
    title: "Performance Marketing Ads",
    subtitle: "Paid Acquisition",
    desc: "Drive immediate online orders through data-driven Google Shopping, Performance Max, and Meta catalog ads.",
    icon: Zap,
    color: "text-amber-600 bg-amber-50 border-amber-200/70",
    pill: "Instant Sales",
    points: ["Google Shopping & PMax campaigns", "Meta dynamic catalog ads", "Direct ROAS bidding optimization"]
  },
  {
    title: "Marketplace Management",
    subtitle: "Amazon & Flipkart",
    desc: "Complete management of your listings, A+ brand stories, and sponsored product ads across Amazon, Flipkart & 1mg.",
    icon: Store,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200/70",
    pill: "Marketplaces",
    points: ["Amazon Seller Central management", "A+ content & brand store design", "Buy Box & pricing optimization"]
  },
  {
    title: "Conversion Rate Optimization (CRO)",
    subtitle: "Store UX Optimization",
    desc: "Transform your Shopify or WooCommerce store layout to eliminate checkout drop-offs and maximize average order value.",
    icon: Layout,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200/70",
    pill: "Frictionless UX",
    points: ["Mobile checkout speed tuning", "1-click UPI & COD trust integration", "Upsell & cross-sell bundling"]
  },
  {
    title: "Retention Marketing",
    subtitle: "Repeat Purchases",
    desc: "Automate email flows, SMS updates, and WhatsApp replenishment reminders to boost customer lifetime value (LTV).",
    icon: RefreshCw,
    color: "text-purple-600 bg-purple-50 border-purple-200/70",
    pill: "High LTV",
    points: ["Abandoned cart WhatsApp recovery", "Automated refill reminders", "Loyalty discounts & VIP campaigns"]
  },
  {
    title: "Product Listing Optimization",
    subtitle: "High-Converting Content",
    desc: "Craft persuasive product copy, medical compliance disclaimers, clear dosage guides, and crisp lifestyle product imagery.",
    icon: Package,
    color: "text-rose-600 bg-rose-50 border-rose-200/70",
    pill: "Product Pages",
    points: ["Empathetic clinical benefit copy", "High-res infographic galleries", "Trust seals & compliance badges"]
  }
];

const growthFrameworkSteps = [
  {
    phase: "01",
    stepNum: 1,
    name: "Audit",
    time: "Days 1–3",
    title: "Store UX, Speed & Competitor Audit",
    stage: "Store Diagnostic",
    timeline: "Days 1–3",
    icon: Search,
    deliverable: "UX, Speed & Competitor Pricing Diagnostic",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200",
    boxBg: "bg-blue-50/70 border-blue-200/90",
    points: [
      "In-depth checkout funnel drop-off analysis",
      "Core Web Vitals & mobile page load optimization audit",
      "Competitor pricing and marketplace catalog benchmarking"
    ]
  },
  {
    phase: "02",
    stepNum: 2,
    name: "SEO & Pages",
    time: "Days 4–7",
    title: "Product Listing & Category SEO Tuning",
    stage: "Catalog Optimization",
    timeline: "Days 4–7",
    icon: Package,
    deliverable: "High-Converting Product Pages & Schema Markup",
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200",
    boxBg: "bg-purple-50/70 border-purple-200/90",
    points: [
      "Transactional long-tail keywords for product titles and tags",
      "High-converting clinical benefit copy and usage guides",
      "Rich product structured data schema (Price, Stock, Reviews)"
    ]
  },
  {
    phase: "03",
    stepNum: 3,
    name: "Shopping Ads",
    time: "Weeks 2–3",
    title: "Google Shopping & Meta Catalog Ads",
    stage: "Paid Acquisition",
    timeline: "Weeks 2–3",
    icon: Zap,
    deliverable: "Google Shopping Feed & Meta Dynamic Catalog Ads",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    boxBg: "bg-emerald-50/70 border-emerald-200/90",
    points: [
      "Targeted Google Shopping and Performance Max campaigns",
      "Meta Dynamic Product Ads (DPA) targeting verified buyers",
      "Strict negative keyword lists to preserve ad spend profitability"
    ]
  },
  {
    phase: "04",
    stepNum: 4,
    name: "CRO Checkout",
    time: "Weeks 3–4",
    title: "Conversion Rate Optimization (CRO)",
    stage: "Frictionless Checkout",
    timeline: "Weeks 3–4",
    icon: Layout,
    deliverable: "Sub-Second 1-Page Checkout with Instant UPI",
    badgeBg: "bg-amber-50 text-amber-600 border-amber-200",
    boxBg: "bg-amber-50/70 border-amber-200/90",
    points: [
      "Streamlined single-page checkout with express UPI & Cards",
      "Strategic trust badges, secure payment seals & urgency triggers",
      "Mobile-first micro-copy to eliminate purchase hesitation"
    ]
  },
  {
    phase: "05",
    stepNum: 5,
    name: "Recovery",
    time: "Ongoing",
    title: "Cart Abandonment & Refill Automation",
    stage: "Customer Retention",
    timeline: "Ongoing",
    icon: RefreshCw,
    deliverable: "Automated WhatsApp & Email Cart Recovery System",
    badgeBg: "bg-rose-50 text-rose-600 border-rose-200",
    boxBg: "bg-rose-50/70 border-rose-200/90",
    points: [
      "Instant WhatsApp checkout recovery within 15 minutes of drop-off",
      "Automated replenishment reminders for consumable healthcare products",
      "VIP customer loyalty discounts and cross-sell recommendations"
    ]
  },
  {
    phase: "06",
    stepNum: 6,
    name: "Scaling",
    time: "Ongoing",
    title: "Revenue Scaling & Profit Margin Telemetry",
    stage: "Scaling & ROAS",
    timeline: "Ongoing Growth",
    icon: TrendingUp,
    deliverable: "Full GA4 E-Commerce Telemetry & Scaled ROAS",
    badgeBg: "bg-cyan-50 text-cyan-600 border-cyan-200",
    boxBg: "bg-cyan-50/70 border-cyan-200/90",
    points: [
      "End-to-end GA4 e-commerce revenue and AOV telemetry",
      "Dynamic ad budget scaling on top-performing product SKU sets",
      "Continuous blended customer acquisition cost (CAC) reduction"
    ]
  }
];

const whyChooseCodigix = [
  {
    title: "Revenue-Focused Approach",
    desc: "We prioritize actual store sales, order volume, and net revenue growth over vanity pageviews.",
    icon: DollarSign
  },
  {
    title: "Conversion-First Strategy",
    desc: "We optimize every touchpoint of the shopping experience — from the first ad impression to 1-click checkout.",
    icon: Target
  },
  {
    title: "Data-Driven Execution",
    desc: "Every rupee is tracked against exact Customer Acquisition Cost (CAC) and Return On Ad Spend (ROAS).",
    icon: BarChart3
  },
  {
    title: "Local & National Expertise",
    desc: "Scale healthcare and wellness product sales locally in Pune/PCMC and expand seamlessly across pan-India.",
    icon: Globe
  },
  {
    title: "Full-Funnel Management",
    desc: "Complete ownership: Store SEO, Shopping Ads, Marketplace channels, Cart recovery, and Customer loyalty.",
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
  "Shopify Plus & WooCommerce",
  "Google Merchant Center & PMax",
  "Meta Catalog Manager & DPA",
  "Amazon Seller Central & Flipkart Ads",
  "Klaviyo, Brevo & WhatsApp API",
  "Google Analytics 4 E-Commerce Tracking"
];

const kpiList = [
  "Conversion Rate (CVR) — Store visitors to buyers",
  "Return On Ad Spend (ROAS) — Multiple on ad budget",
  "Customer Acquisition Cost (CAC) — Cost per paying customer",
  "Average Order Value (AOV) — Revenue per transaction",
  "Cart Abandonment Recovery Rate — Recovered checkout revenue",
  "Customer Lifetime Value (CLV) — Long-term repeat purchases"
];

const faqs = [
  {
    q: "What is E-Commerce marketing?",
    a: "E-Commerce marketing is the practice of driving targeted awareness, high-intent traffic, and online sales to an e-commerce website or marketplace store (Amazon, Flipkart). It combines SEO, Google Shopping ads, social catalog ads, conversion optimization, and customer retention."
  },
  {
    q: "How do you increase product sales on Shopify & WooCommerce?",
    a: "We deploy a comprehensive 3-pillar strategy: (1) Drive high-intent buyers via Google Shopping and Meta Ads, (2) Optimize product pages with high-converting copy, fast loading speed, and trust seals, and (3) Recover abandoned carts with automated WhatsApp and email reminders."
  },
  {
    q: "Why do I need E-Commerce SEO alongside paid ads?",
    a: "While paid ads generate immediate sales, E-Commerce SEO builds a permanent, compounding stream of organic buyer traffic with zero cost-per-click. Combining both ensures immediate revenue while steadily lowering your blended customer acquisition cost (CAC)."
  },
  {
    q: "How long does it take to see results in E-Commerce marketing?",
    a: "Paid advertising campaigns (Google Shopping & Meta Ads) start generating sales within 24 to 48 hours of launch. E-Commerce SEO and organic product category rankings typically show substantial compounding traffic within 2 to 4 months."
  },
  {
    q: "What makes Codigix different from other E-Commerce agencies?",
    a: "Unlike generic agencies that stop at driving traffic, we build end-to-end e-commerce growth systems — specializing in healthcare and wellness products, compliance policies, marketplace optimization, checkout CRO, and repeat-purchase retention."
  },
  {
    q: "Do you handle marketplace management on Amazon and Flipkart?",
    a: "Yes! We manage complete marketplace operations: listing creation, A+ content design, brand store setup, Amazon Sponsored Products PPC, inventory health monitoring, and review management."
  }
];

export default function EcommerceMarketingPage() {
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
      setActivePhase((prev) => (prev + 1) % growthFrameworkSteps.length);
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
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-gradient-to-tr from-amber-400/10 via-indigo-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-emerald-400/10 to-transparent rounded-full blur-3xl" />
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
                <ShoppingCart size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Marketplace</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">E-Com Strategy</p>
              </div>
            </motion.div>

            {/* Bottom Left */}
            <motion.div
              animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, 15px) rotate(1deg)", "translate(0px, 0px) rotate(0deg)"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] left-[5%] xl:left-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Store size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Visibility</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Max Product Reach</p>
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
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Returns</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">5.2x Average ROAS</p>
              </div>
            </motion.div>

            {/* Bottom Right */}
            <motion.div
              animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, -15px) rotate(-1deg)", "translate(0px, 0px) rotate(0deg)"] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-[25%] right-[5%] xl:right-[10%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_15px_30px_rgba(26,16,83,0.08)]"
            >
              <div className="w-8 h-8 rounded-full bg-rose-50 text-[#e20b27] flex items-center justify-center shrink-0 border border-rose-100">
                <RefreshCw size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1 text-left">Retention</p>
                <p className="text-sm text-[#1a1053] font-extrabold leading-none text-left">Loyal Customers</p>
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
              E-Commerce Marketing
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#1a1053] tracking-tight leading-[1.1] mb-6 max-w-4xl relative z-20">
            Sell Healthcare Products Online <br className="hidden lg:block" /> with Confidence.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] mt-3">
              More Sales. Loyal Customers.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto mb-10 relative z-20">
            Whether you’re selling medicines, supplements, medical equipment, or wellness products — Codigix Infotech’s E-Commerce Marketing services help you reach the right buyers online, drive more sales, and build lasting customer loyalty.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-20">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1053] hover:bg-[#281878] text-white rounded-full font-semibold text-base transition-all shadow-[0_10px_25px_-5px_rgba(26,16,83,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(26,16,83,0.35)] transform hover:-translate-y-0.5"
            >
              <span>Book Free E-Com Strategy Call</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href="#framework"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-[#1a1053] rounded-full font-semibold text-base shadow-xs transition-all"
            >
              <span>Explore 7-Step Framework</span>
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
                E-Commerce Scaling Services
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              End-to-end e-commerce growth strategies engineered to scale product visibility, sales volume, and customer retention across web and marketplaces.
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
        {/* SECTION 3: NOT JUST MARKETING — A COMPLETE E-COMMERCE GROWTH SYSTEM */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 max-w-7xl m-auto">
          <div className="rounded-3xl bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 border border-blue-200/60 shadow-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

              {/* Left Column: Growth Engine Diagram */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl bg-white border border-slate-200/90 shadow-lg p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-600 uppercase">E-Com Growth System</span>
                    <span className="text-xs font-bold text-[#e20b27]">High ROAS</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                        <span className="text-xs font-bold text-slate-800">High-Converting Product Funnels</span>
                      </div>
                      <span className="text-[11px] text-blue-600 font-semibold">Intent Ads</span>
                    </div>

                    <div className="flex justify-center text-slate-300">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                        <span className="text-xs font-bold text-slate-800">Optimized Shopping Experience</span>
                      </div>
                      <span className="text-[11px] text-indigo-600 font-semibold">1-Click Buy</span>
                    </div>

                    <div className="flex justify-center text-slate-300">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                        <span className="text-xs font-bold text-emerald-900">Repeat Orders &amp; High LTV</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-bold">5.4x ROAS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Copy */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-3.5 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  Complete Growth System
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
                  Not Just Marketing — A Complete E-Commerce Growth System
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Most agencies focus only on traffic. <br className="hidden sm:inline" />
                  <strong className="text-[#1a1053] font-bold">We focus on what matters most: sales, revenue, and customer retention.</strong>
                </p>

                <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-amber-950 text-sm font-semibold">
                  📦 More orders, higher revenue, and repeat customer lifetime value.
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-sm font-bold text-[#1a1053]">At Codigix Infotech, we build:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>High-converting product funnels</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Performance-driven ad campaigns</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Optimized shopping checkout UX</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Multi-channel marketplace scaling</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 4: WHAT YOU GET WITH OUR E-COMMERCE MARKETING */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Guaranteed Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What You Get With Our E-Commerce Marketing
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Predictable, scalable, and fully transparent e-commerce marketing systems engineered to maximize your online product sales.
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
        {/* SECTION 5: WHAT IS INCLUDED IN OUR HEALTHCARE E-COMMERCE SERVICES */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto border-t border-slate-200/80 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              Comprehensive Service Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              What Is Included In Our Healthcare E-Commerce Services
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Structured, compliant, and results-driven offerings designed to dominate search rankings and scale sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecommerceServicesIncluded.map((item, idx) => {
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
                      <p className="text-xs text-blue-600 font-semibold">{item.subtitle}</p>
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
        {/* SECTION 6: OUR 6-STEP E-COMMERCE GROWTH ROADMAP */}
        {/* ========================================================================= */}
        <section id="framework" className="py-16 sm:py-24 max-w-7xl m-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              Proven Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
              Our 6-Step E-Commerce Growth Roadmap
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              A synchronized roadmap that systematically scales product visibility, streamlines checkout, and maximizes ROAS.
            </p>
          </div>

          {/* Ultra-Minimalist Process Stepper Timeline */}
          <div
            onMouseEnter={() => setIsPhasePaused(true)}
            onMouseLeave={() => setIsPhasePaused(false)}
            className="mb-8 w-full px-1"
          >
            <style>{`
              @keyframes segmentProgressECOM {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}</style>

            <div className="flex items-start justify-between w-full">
              {growthFrameworkSteps.map((stage, sIdx, arr) => {
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
                              animation: 'segmentProgressECOM 5.5s linear forwards',
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
              {growthFrameworkSteps.map((step, idx) => {
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
              We combine deep healthcare product category understanding with cutting-edge advertising algorithms and checkout optimization.
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

            {/* Strategy Audit Call Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1a1053] to-slate-900 text-white p-6 sm:p-7 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Free E-Com Audit Call
                </span>
                <h3 className="text-lg font-bold text-white">Need a Store ROAS Review?</h3>
                <p className="text-xs text-slate-300">We analyze your product listings, checkout UX, and projected ROAS within 24 hours.</p>
              </div>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg bg-[#e20b27] hover:bg-red-700 text-white transition-colors"
                >
                  <span>Claim Free Audit</span>
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
          badgeText="Verified E-Commerce & Retail Growth"
          headingPrefix="Why D2C Brands & Retailers"
          headingGradient="Partner With Codigix Infotech"
          subtitle="Scaling online store revenue, reducing customer acquisition costs, and optimizing checkout funnels for high-converting sales."
          strategicAdvantageTitle="The Codigix E-Commerce Advantage"
          strategicAdvantageSubtitle="Performance ROAS optimization, Shopify & WooCommerce technical scaling, and retention funnels."
          guaranteeTitle="100% Measurable Store ROI"
          guaranteeQuote='"Engineered to reduce cart abandonment, scale high-ticket orders, and generate predictable sales revenue across online stores."'
        />


        {/* ========================================================================= */}
        {/* SECTION 9: TOOLS & PLATFORMS WE USE & KPIS WE TRACK */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl m-auto border-t border-slate-200/80 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left: Tools & Platforms We Use */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-[#1a1053] text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Tools &amp; Platforms We Use</h3>
                  <p className="text-xs text-slate-300">Enterprise e-commerce and performance marketing stack</p>
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

            {/* Right: KPIs We Track */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1a1053] to-slate-900 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">KPIs We Track</h3>
                  <p className="text-xs text-slate-300">Metrics that directly govern your store profitability</p>
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
              Everything you need to know about our healthcare e-commerce SEO, Google Shopping, Amazon PPC, and checkout optimization.
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
                <ShoppingCart size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1053]">Need a custom healthcare store audit?</h4>
                <p className="text-xs text-slate-600">Our e-commerce growth strategists will review your checkout funnel and outline a scaling plan.</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-[#e20b27] hover:bg-red-700 text-white font-bold text-xs shrink-0 shadow-sm transition-colors"
            >
              <PhoneCall size={14} />
              <span>Talk to E-Com Strategist</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
