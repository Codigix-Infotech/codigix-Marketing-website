"use client";

import React, { useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp, MapPin, Link2, Instagram, Youtube, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CaseStudy {
  id: number;
  title: string;
  clientLogo?: string;
  location: string;
  category: string;
  speciality: string;
  afterStats: {
    rank: string;
    traffic: string;
    inquiries: string;
  };
  highlightMetric: string;
  metricLabel: string;
  tags: { name: string; icon: React.ReactNode }[];
  imageAfter: string;
  desc: string;
}

const healthcareCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Dr. Sheetal's Glow Clinic — Dermatology Clinic (NMC Scope)",
    clientLogo: "/clients/sheetals-glow.webp",
    location: "Kothrud, Pune",
    category: "Dermatology & Skin",
    speciality: "Skin & Aesthetics Clinic",
    afterStats: {
      rank: "NMC scope (allopathic)",
      traffic: "Website architecture, responsive UI and navigation; factual service pages",
      inquiries: "Clearer hierarchy, faster load, privacy and consent disclosures"
    },
    highlightMetric: "Website & Information Design",
    metricLabel: "Clinic information architecture",
    tags: [
      { name: "Website Architecture", icon: <TrendingUp size={11} className="text-emerald-500" /> },
      { name: "Accurate Listings", icon: <MapPin size={11} className="text-blue-500" /> },
      { name: "Privacy & Consent Notices", icon: <ShieldCheck size={11} className="text-blue-500" /> }
    ],
    imageAfter: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    desc: "Context: a dermatology clinic needing clear, factual service information. Delivered a structured website with accurate service pages and educational content organisation."
  },
  {
    id: 2,
    title: "Smiles For All Dental Care — Dental Clinic (NDC Scope)",
    clientLogo: "/clients/smiles-for-all.webp",
    location: "Pashan, Pune",
    category: "Dental Clinic",
    speciality: "Dental Care",
    afterStats: {
      rank: "NDC scope (dental)",
      traffic: "Website architecture, responsive UI; factual treatment and facility pages",
      inquiries: "Clearer hierarchy, streamlined contact workflow, accessibility basics"
    },
    highlightMetric: "Website & Information Design",
    metricLabel: "Dental clinic information architecture",
    tags: [
      { name: "Website Architecture", icon: <TrendingUp size={11} className="text-emerald-500" /> },
      { name: "Technical SEO Hygiene", icon: <Link2 size={11} className="text-purple-500" /> },
      { name: "Accurate Listings", icon: <MapPin size={11} className="text-blue-500" /> }
    ],
    imageAfter: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    desc: "Context: a dental clinic requiring accurate, easy-to-navigate information. Delivered a responsive website with factual treatment pages and technical SEO hygiene."
  },
  {
    id: 3,
    title: "Moraya Multispeciality Hospital — Hospital (NMC Scope)",
    clientLogo: "/clients/morya.webp",
    location: "Chinchwad, Pune",
    category: "Hospital Information Systems",
    speciality: "Multispeciality & Surgery",
    afterStats: {
      rank: "NMC scope (hospital)",
      traffic: "Website architecture; department, facility and service pages; educational content organisation",
      inquiries: "Faster load, clearer navigation hierarchy, streamlined workflows"
    },
    highlightMetric: "Department & Facility Pages",
    metricLabel: "Institutional information design",
    tags: [
      { name: "Website Architecture", icon: <TrendingUp size={11} className="text-emerald-500" /> },
      { name: "Technical SEO Hygiene", icon: <Link2 size={11} className="text-purple-500" /> },
      { name: "Privacy & Consent Notices", icon: <ShieldCheck size={11} className="text-blue-500" /> }
    ],
    imageAfter: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800",
    desc: "Context: a multispeciality hospital needing accurate department and facility information. Delivered structured pages, navigation and technical SEO hygiene."
  },
  {
    id: 4,
    title: "Kimaya Brain & Spine Clinic — Super-Speciality Clinic (NMC Scope)",
    clientLogo: "/clients/kimaya.webp",
    location: "Kalewadi, Pune",
    category: "Super-Speciality",
    speciality: "Neuro & Spine",
    afterStats: {
      rank: "NMC scope (allopathic)",
      traffic: "Website architecture; practitioner profiles with credential and registration details; educational video organisation",
      inquiries: "Clearer information hierarchy, accessible layouts, privacy notices"
    },
    highlightMetric: "Practitioner & Service Information",
    metricLabel: "Verified credential disclosure",
    tags: [
      { name: "Website Architecture", icon: <TrendingUp size={11} className="text-emerald-500" /> },
      { name: "Educational Content", icon: <Youtube size={11} className="text-rose-500" /> },
      { name: "Technical SEO Hygiene", icon: <Link2 size={11} className="text-purple-500" /> }
    ],
    imageAfter: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    desc: "Context: a super-speciality clinic needing factual practitioner and service information. Delivered organised profiles, educational content structure and technical SEO hygiene."
  },
  {
    id: 5,
    title: "Shushrut Surgical Hospital & Piles Clinic — Surgical Hospital (NMC Scope)",
    clientLogo: "/clients/shushrut.webp",
    location: "Pimpri, Pune",
    category: "Surgical & Proctology",
    speciality: "Surgery & Proctology",
    afterStats: {
      rank: "NMC scope (hospital)",
      traffic: "Website architecture; factual service and facility pages; educational content organisation",
      inquiries: "Faster load, clearer navigation, streamlined enquiry workflow"
    },
    highlightMetric: "Service & Facility Pages",
    metricLabel: "Factual service information",
    tags: [
      { name: "Website Architecture", icon: <TrendingUp size={11} className="text-emerald-500" /> },
      { name: "Accurate Listings", icon: <MapPin size={11} className="text-blue-500" /> },
      { name: "Technical SEO Hygiene", icon: <Link2 size={11} className="text-purple-500" /> }
    ],
    imageAfter: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    desc: "Context: a surgical hospital and clinic requiring clear, accurate information. Delivered structured service pages, accurate listing details and technical SEO hygiene."
  },
  {
    id: 6,
    title: "Canopy Dental Care — Dental Clinic (NDC Scope)",
    clientLogo: "/clients/canopy.webp",
    location: "Baner, Pune",
    category: "Dental Clinic",
    speciality: "Orthodontics & Dentistry",
    afterStats: {
      rank: "NDC scope (dental)",
      traffic: "Website architecture, responsive UI and navigation; factual treatment information",
      inquiries: "Clearer hierarchy, faster load, accessibility and privacy notices"
    },
    highlightMetric: "Website & Information Design",
    metricLabel: "Dental clinic information architecture",
    tags: [
      { name: "Website Architecture", icon: <TrendingUp size={11} className="text-emerald-500" /> },
      { name: "Technical SEO Hygiene", icon: <Link2 size={11} className="text-purple-500" /> },
      { name: "Privacy & Consent Notices", icon: <ShieldCheck size={11} className="text-blue-500" /> }
    ],
    imageAfter: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    desc: "Context: a dental clinic needing clear, factual treatment information. Delivered a responsive website, educational content structure and technical SEO hygiene."
  }
];

const InteractiveSplitCard = ({ study }: { study: CaseStudy }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-[360px] sm:w-[380px] shrink-0 bg-white rounded-[2rem] overflow-hidden border border-slate-200/90 shadow-[0_10px_35px_rgba(26,16,83,0.06)] hover:shadow-[0_25px_60px_-15px_rgba(26,16,83,0.12)] hover:border-slate-300 transition-all duration-500 flex flex-col group select-none relative hover:-translate-y-2"
    >
      {/* Result visual: shows only the achieved outcome, never a client's starting point */}
      <div className="relative w-full h-[230px] overflow-hidden bg-slate-900">
        <img
          src={study.imageAfter}
          alt={study.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1053]/90 via-transparent to-transparent pointer-events-none" />

        {/* With Codigix Pill & Achieved Result */}
        <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex flex-col items-start gap-1.5 pointer-events-none">
          <span className="px-2.5 py-1 bg-[#e20b27] text-white text-[10px] font-semibold tracking-wider uppercase rounded-lg shadow-md flex items-center gap-1">
            <Sparkles size={10} /> Case Study
          </span>
          <div className="bg-[#1a1053]/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-emerald-400/40 text-[11px] text-white shadow-lg">
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              ✓ {study.afterStats.rank}
            </span>
          </div>
        </div>

        {/* Bottom Floating Highlight Badge */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-100 shadow-md">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-[#1a1053]">{study.highlightMetric}</span>
            <span className="text-[10px] font-light text-slate-500">({study.metricLabel})</span>
          </div>
        </div>
      </div>

      {/* Card Body & Strategic Details (Clean neutral styling, real client branding) */}
      <div className="p-6 flex flex-col flex-1 bg-white">

        {/* Client Header: Logo + Category & Location */}
        <div className="flex items-center justify-between gap-2.5 mb-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {study.clientLogo && (
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/90 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                <img
                  src={study.clientLogo}
                  alt={study.title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 truncate">
                {study.category}
              </span>
              <span className="text-[10px] font-light text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                <MapPin size={10} className="text-slate-400 shrink-0" /> {study.location}
              </span>
            </div>
          </div>

          <span className="text-[10px] font-medium text-slate-600 bg-slate-100/80 px-2 py-1 rounded-lg border border-slate-200/60 shrink-0">
            {study.speciality}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-[#1a1053] group-hover:text-blue-600 transition-colors duration-300 leading-snug mb-2">
          {study.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 font-light leading-relaxed mb-4 line-clamp-2">
          {study.desc}
        </p>

        {/* Clean Neutral Metrics Comparison Grid */}
        <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 mb-5">
          <div className="flex flex-col">
            <span className="text-[10px] font-light text-slate-400 uppercase tracking-wider">Work Delivered</span>
            <span className="text-[11px] font-medium text-slate-800 mt-0.5 leading-snug">{study.afterStats.traffic}</span>
          </div>
          <div className="flex flex-col border-l border-slate-200 pl-2.5">
            <span className="text-[10px] font-light text-slate-400 uppercase tracking-wider">Operational Notes</span>
            <span className="text-[11px] font-medium text-slate-800 mt-0.5 leading-snug">
              {study.afterStats.inquiries}
            </span>
          </div>
        </div>

        {/* Bottom Tags & Action Icon */}
        <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {study.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-light rounded-lg border border-slate-200/80 shadow-2xs"
              >
                {tag.icon}
                <span>{tag.name}</span>
              </span>
            ))}
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#1a1053] group-hover:text-white text-slate-600 flex items-center justify-center transition-all duration-300 shrink-0 ml-2 shadow-xs">
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default function PortfolioSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = 400;
    const target = direction === 'left'
      ? Math.max(0, container.scrollLeft - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount);

    animate(container.scrollLeft, target, {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (val) => {
        container.scrollLeft = val;
      }
    });
  };

  return (
    <section id="portfolio" className="py-20 lg:py-24 bg-[#fafbfe] overflow-hidden relative border-t border-slate-100 scroll-mt-24">

      {/* Animated Subtle Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#1a1053 1px, transparent 1px), linear-gradient(90deg, #1a1053 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto relative z-10">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 items-start">

          {/* Left Column: Strategic Positioning & Trust */}
          <div className="lg:w-[35%] shrink-0 flex flex-col relative z-20">

            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-[#1a1053] tracking-wide mb-3.5 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Case Studies</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] leading-[1.15] tracking-tight mb-3.5">
              Healthcare Organizations. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Clear Digital Foundations.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Explore how we structure websites and factual information for hospitals, clinics, and doctors, grouped by regulatory framework: NMC (allopathic/hospital), NDC (dental), and AYUSH (Ayurvedic).
            </p>

            {/* Primary Action Button & Slider Controls */}
            <div className="flex items-center gap-4 mb-10">
              <Link
                href="/services#case-studies"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1a1053] hover:bg-[#25186f] text-white rounded-full font-medium text-sm transition-all shadow-[0_8px_20px_rgba(26,16,83,0.18)] hover:-translate-y-0.5"
              >
                <span>View All Case Studies</span>
                <ArrowRight size={15} />
              </Link>

              {/* Slider Navigation Buttons with Silky Animation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll('left')}
                  aria-label="Previous case study"
                  className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#1a1053] hover:bg-blue-50 hover:border-blue-300 transition-all shadow-xs active:scale-95"
                >
                  <ChevronLeft size={19} />
                </button>
                <button
                  onClick={() => scroll('right')}
                  aria-label="Next case study"
                  className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#1a1053] hover:bg-blue-50 hover:border-blue-300 transition-all shadow-xs active:scale-95"
                >
                  <ChevronRight size={19} />
                </button>
              </div>
            </div>

            {/* Ethical communication note */}
            <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm max-w-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800">Factual &amp; Non-Promotional</span>
                  <span className="text-[11px] font-light text-slate-500 mt-0.5">No clinical or patient-acquisition claims, ratings or rankings are shown in our case studies.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Drag-to-Compare Carousel */}
          <div className="lg:w-[65%] w-full relative z-10">

            {/* Interactive Notice Badge */}
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-[11px] font-light text-slate-400 flex items-center gap-1.5">
                <Sparkles size={12} className="text-blue-500" /> Work delivered for our healthcare partners
              </span>
            </div>

            {/* Horizontal Scroll Carousel */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-6 pt-2 hide-scrollbar"
            >
              {healthcareCaseStudies.map((study) => (
                <div key={study.id}>
                  <InteractiveSplitCard study={study} />
                </div>
              ))}
            </div>

            {/* Bottom Carousel Footer */}
            <div className="flex justify-between items-center mt-4 px-1">
              <div className="flex items-center gap-1.5">
                {healthcareCaseStudies.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === 0 ? 'w-8 bg-[#1a1053]' : 'w-2 bg-slate-300'}`}
                  />
                ))}
              </div>

              <Link
                href="/services#case-studies"
                className="text-xs sm:text-sm font-medium text-[#1a1053] hover:text-[#e20b27] flex items-center gap-1.5 transition-colors group"
              >
                <span>Explore More Case Studies</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
