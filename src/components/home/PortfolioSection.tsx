"use client";

import React, { useState, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp, MapPin, Link2, Instagram, Youtube, Star, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CaseStudy {
  id: number;
  title: string;
  clientLogo?: string;
  location: string;
  category: string;
  speciality: string;
  beforeStats: {
    rank: string;
    traffic: string;
    inquiries: string;
  };
  afterStats: {
    rank: string;
    traffic: string;
    inquiries: string;
  };
  highlightMetric: string;
  metricLabel: string;
  tags: { name: string; icon: React.ReactNode }[];
  imageBefore: string;
  imageAfter: string;
  desc: string;
}

const healthcareCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Dr. Sheetal's Glow Clinic",
    clientLogo: "/clients/sheetals-glow.webp",
    location: "Kothrud, Pune",
    category: "Dermatology & Skin",
    speciality: "Laser Skin & Aesthetics",
    beforeStats: {
      rank: "Rank #42 on Google",
      traffic: "420 Visits/mo",
      inquiries: "14 Calls/mo"
    },
    afterStats: {
      rank: "#1 Rank Google Maps & SEO",
      traffic: "19.4k Visits/mo",
      inquiries: "380+ Consultations/mo"
    },
    highlightMetric: "+420% Growth",
    metricLabel: "Aesthetic Patient Consultations",
    tags: [
      { name: "Healthcare SEO", icon: <TrendingUp size={11} className="text-emerald-500" /> },
      { name: "GMB Google Maps", icon: <MapPin size={11} className="text-blue-500" /> },
      { name: "Instagram Reels", icon: <Instagram size={11} className="text-pink-500" /> }
    ],
    imageBefore: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
    imageAfter: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    desc: "Achieved #1 organic search and Maps rankings in Kothrud & Pune West for skin rejuvenation, driving 380+ verified monthly consultations."
  },
  {
    id: 2,
    title: "Smiles For All Dental Care",
    clientLogo: "/clients/smiles-for-all.webp",
    location: "Pashan, Pune",
    category: "Clinic SEO & Maps",
    speciality: "Implant & Smile Design",
    beforeStats: {
      rank: "Not in Local 3-Pack",
      traffic: "380 Visits/mo",
      inquiries: "12 Inquiries/mo"
    },
    afterStats: {
      rank: "#1 GMB Maps 3-Pack",
      traffic: "14.2k Visits/mo",
      inquiries: "310+ Appointments/mo"
    },
    highlightMetric: "4.9★ Rating",
    metricLabel: "850+ Patient Reviews",
    tags: [
      { name: "GMB Google Maps", icon: <MapPin size={11} className="text-blue-500" /> },
      { name: "Local SEO", icon: <TrendingUp size={11} className="text-emerald-500" /> },
      { name: "High-DA Backlinks", icon: <Link2 size={11} className="text-purple-500" /> }
    ],
    imageBefore: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    imageAfter: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    desc: "Dominated local 3-pack rankings across Pashan & Baner for dental implants, root canals, and cosmetic smile makeovers."
  },
  {
    id: 3,
    title: "Moraya Multispeciality Hospital",
    clientLogo: "/clients/morya.webp",
    location: "Chinchwad, Pune",
    category: "Hospital Growth",
    speciality: "Multispeciality & Surgery",
    beforeStats: {
      rank: "Page 4 for Emergency Care",
      traffic: "1.8k Visits/mo",
      inquiries: "28 Inquiries/mo"
    },
    afterStats: {
      rank: "#1 Hospital in PCMC",
      traffic: "38.6k Visits/mo",
      inquiries: "640+ Patients/mo"
    },
    highlightMetric: "+350% Footfall",
    metricLabel: "Verified OPD Admissions",
    tags: [
      { name: "Healthcare SEO", icon: <TrendingUp size={11} className="text-emerald-500" /> },
      { name: "GMB 3-Pack", icon: <MapPin size={11} className="text-blue-500" /> },
      { name: "High-DA Backlinks", icon: <Link2 size={11} className="text-purple-500" /> }
    ],
    imageBefore: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    imageAfter: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800",
    desc: "Scaled PCMC's premier multispeciality hospital to #1 Google Maps positions and organic authority for critical & surgical care."
  },
  {
    id: 4,
    title: "Kimaya Brain & Spine Clinic",
    clientLogo: "/clients/kimaya.webp",
    location: "Kalewadi, Pune",
    category: "Super-Speciality",
    speciality: "Neuro & Spine Surgery",
    beforeStats: {
      rank: "Unranked on Google Maps",
      traffic: "210 Visits/mo",
      inquiries: "8 Consultations/mo"
    },
    afterStats: {
      rank: "Top 3 Spine Surgeon Pune",
      traffic: "12.8k Visits/mo",
      inquiries: "260+ Consultations/mo"
    },
    highlightMetric: "5.8x Growth",
    metricLabel: "Specialist Appointments",
    tags: [
      { name: "High-DA Backlinks", icon: <Link2 size={11} className="text-purple-500" /> },
      { name: "YouTube Video SEO", icon: <Youtube size={11} className="text-rose-500" /> },
      { name: "Healthcare SEO", icon: <TrendingUp size={11} className="text-emerald-500" /> }
    ],
    imageBefore: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    imageAfter: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    desc: "Established senior neurosurgeon as top organic authority for minimally invasive spine surgery and neuro consultations."
  },
  {
    id: 5,
    title: "Shushrut Surgical Hospital & Piles Clinic",
    clientLogo: "/clients/shushrut.webp",
    location: "Pimpri, Pune",
    category: "Surgical & Proctology",
    speciality: "Laser Surgery & Proctology",
    beforeStats: {
      rank: "Rank #35 for Proctology",
      traffic: "560 Visits/mo",
      inquiries: "15 Calls/mo"
    },
    afterStats: {
      rank: "#1 Laser Piles Clinic Pune",
      traffic: "22.1k Visits/mo",
      inquiries: "480+ Inquiries/mo"
    },
    highlightMetric: "+460% Inquiries",
    metricLabel: "Laser Surgery Consultations",
    tags: [
      { name: "Healthcare SEO", icon: <TrendingUp size={11} className="text-emerald-500" /> },
      { name: "GMB Google Maps", icon: <MapPin size={11} className="text-blue-500" /> },
      { name: "Local SEO", icon: <TrendingUp size={11} className="text-emerald-500" /> }
    ],
    imageBefore: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    imageAfter: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    desc: "Captured top organic rankings for high-intent laser proctology and laparoscopic surgery across Pimpri-Chinchwad & Pune."
  },
  {
    id: 6,
    title: "Canopy Dental Care",
    clientLogo: "/clients/canopy.webp",
    location: "Baner, Pune",
    category: "Advanced Dentistry",
    speciality: "Orthodontics & Aligners",
    beforeStats: {
      rank: "Low Map Visibility",
      traffic: "310 Visits/mo",
      inquiries: "9 Patients/mo"
    },
    afterStats: {
      rank: "#1 Clear Aligners Clinic",
      traffic: "11.5k Visits/mo",
      inquiries: "240+ Inquiries/mo"
    },
    highlightMetric: "4.9★ Rating",
    metricLabel: "High-Ticket Aligners Growth",
    tags: [
      { name: "Local SEO", icon: <TrendingUp size={11} className="text-emerald-500" /> },
      { name: "Instagram Reels", icon: <Instagram size={11} className="text-pink-500" /> },
      { name: "GMB 3-Pack", icon: <MapPin size={11} className="text-blue-500" /> }
    ],
    imageBefore: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    imageAfter: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    desc: "Generated steady high-ticket clear aligner and pediatric dentistry patients in Baner & Balewadi through targeted local SEO."
  }
];

const InteractiveSplitCard = ({ study }: { study: CaseStudy }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Smooth initial hover reveal sliding to 28% to show 72% of the With Codigix transformation
    setSliderPos(28);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth reset back to 50% split
    setSliderPos(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-[360px] sm:w-[380px] shrink-0 bg-white rounded-[2rem] overflow-hidden border border-slate-200/90 shadow-[0_10px_35px_rgba(26,16,83,0.06)] hover:shadow-[0_25px_60px_-15px_rgba(26,16,83,0.12)] hover:border-slate-300 transition-all duration-500 flex flex-col group select-none relative hover:-translate-y-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Visual Transformation Slider */}
      <div
        ref={cardRef}
        className="relative w-full h-[230px] cursor-ew-resize overflow-hidden bg-slate-900"
        onMouseMove={handleMouseMove}
      >
        {/* BEFORE LAYER: Baseline Grayscale Clinic Reality */}
        <div className="absolute inset-0 z-10 w-full h-full bg-slate-950">
          <img
            src={study.imageBefore}
            alt={`${study.title} Before`}
            className="w-full h-full object-cover grayscale opacity-45 contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent pointer-events-none" />

          {/* Before Pill & Metric Overlay */}
          <div className="absolute top-3.5 left-3.5 z-20 flex flex-col gap-1.5 pointer-events-none">
            <span className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md text-slate-300 text-[10px] font-semibold tracking-wider uppercase rounded-lg border border-slate-700/80 shadow-sm">
              Before Codigix
            </span>
            <div className="bg-slate-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 text-[11px] text-slate-300">
              <span className="text-red-400 font-medium">✕ {study.beforeStats.rank}</span>
            </div>
          </div>
        </div>

        {/* WITH CODIGIX LAYER: High-Energy Vibrant Success State */}
        <div
          className="absolute inset-0 z-20 w-full h-full transition-all duration-300 ease-out overflow-hidden"
          style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
        >
          <img
            src={study.imageAfter}
            alt={`${study.title} With Codigix`}
            className="w-full h-full object-cover transform scale-105 transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1053]/90 via-transparent to-transparent pointer-events-none" />

          {/* With Codigix Pill & Verified Metric Overlay */}
          <div className="absolute top-3.5 right-3.5 z-20 flex flex-col items-end gap-1.5 pointer-events-none">
            <span className="px-2.5 py-1 bg-[#e20b27] text-white text-[10px] font-semibold tracking-wider uppercase rounded-lg shadow-md flex items-center gap-1">
              <Sparkles size={10} /> With Codigix
            </span>
            <div className="bg-[#1a1053]/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-emerald-400/40 text-[11px] text-white shadow-lg">
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                ✓ {study.afterStats.rank}
              </span>
            </div>
          </div>
        </div>

        {/* Laser Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2.5px] bg-white z-30 flex items-center justify-center pointer-events-none shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300 ease-out"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-80" />

          {/* Central Handle Disc */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${isHovered ? 'bg-[#1a1053] text-white scale-110 ring-2 ring-cyan-400' : 'bg-white text-slate-700 border border-slate-200'
            }`}>
            <ChevronLeft size={13} className="-mr-1" />
            <ChevronRight size={13} className="-ml-1" />
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
            <span className="text-[10px] font-light text-slate-400 uppercase tracking-wider">Organic Traffic</span>
            <span className="text-xs font-semibold text-slate-800 mt-0.5">{study.afterStats.traffic}</span>
          </div>
          <div className="flex flex-col border-l border-slate-200 pl-2.5">
            <span className="text-[10px] font-light text-slate-400 uppercase tracking-wider">Patient Inquiries</span>
            <span className="text-xs font-semibold text-slate-800 mt-0.5">
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
              <span>Proven Case Studies</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] leading-[1.15] tracking-tight mb-3.5">
              Real Healthcare Brands. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Real Patient Results.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Explore how we help hospitals, clinics, and doctors achieve #1 Google Maps positions, top organic SEO keywords, and hundreds of verified patient appointments.
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

            {/* Doctor Trust & Verification Badge */}
            <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm max-w-sm">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 shrink-0">
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[11px] font-semibold text-blue-700 shadow-sm">Dr</div>
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-[11px] font-semibold text-purple-700 shadow-sm">MD</div>
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-[11px] font-semibold text-emerald-700 shadow-sm">IVF</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-semibold text-slate-800 ml-1">4.9/5 Rating</span>
                  </div>
                  <span className="text-[11px] font-light text-slate-500 mt-0.5">100+ Healthcare Brands Scaled</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Drag-to-Compare Carousel */}
          <div className="lg:w-[65%] w-full relative z-10">

            {/* Interactive Notice Badge */}
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-[11px] font-light text-slate-400 flex items-center gap-1.5">
                <Sparkles size={12} className="text-blue-500" /> Hover or drag slider to reveal verified patient growth
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
                <span>Explore More Doctor Success Stories</span>
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
