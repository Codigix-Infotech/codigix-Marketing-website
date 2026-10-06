"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  Eye,
  Target,
  Compass,
  Quote,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const chapters = [
  {
    id: "01",
    label: "The Foundation",
    title: "Overview",
    subtitle: "Why Codigix Was Founded",
    domain: "Pan-India Growth",
    subdomain: "Deep Healthcare Focus",
    desc: "Codigix Infotech Pvt. Ltd. unlocks the power of digital marketing with a deep understanding of healthcare to help doctors, clinics, and hospitals attract more patients, build unshakeable trust, and grow their practice with confidence across India.",
    icon: Sparkles,
    color: "#2563eb",
    lightBg: "bg-blue-50 text-blue-600 border-blue-100",
    badgeBg: "bg-blue-50 text-blue-700",
    glowColor: "rgba(37, 99, 235, 0.12)",
    tags: ["Practice Scaling", "Patient Trust Architecture"]
  },
  {
    id: "02",
    label: "The Responsibility",
    title: "Core Values",
    subtitle: "Our Ethical Commitment",
    domain: "Honesty & Empathy",
    subdomain: "Moral Responsibility",
    desc: "At Codigix Infotech Pvt. Ltd. we believe that healthcare marketing carries a responsibility greater than any other industry. We are driven by honesty, empathy, and integrity, ensuring every campaign we run respects the sensibility of healthcare, upholds patient trust, and delivers ethical, results-driven growth for every doctor and hospital we serve.",
    icon: ShieldCheck,
    color: "#7c3aed",
    lightBg: "bg-purple-50 text-purple-600 border-purple-100",
    badgeBg: "bg-purple-50 text-purple-700",
    glowColor: "rgba(124, 58, 237, 0.12)",
    tags: ["Clinical Sensibility First", "Ethical Growth"]
  },
  {
    id: "03",
    label: "The Future Horizon",
    title: "Our Vision",
    subtitle: "Where We Are Heading",
    domain: "India's Growth Ally",
    subdomain: "Expanding Patient Care",
    desc: "To become India's most trusted healthcare marketing partner, empowering every doctor, clinic, and hospital with the digital tools, strategies, and patient connections they need to deliver better care to more people.",
    icon: Eye,
    color: "#059669",
    lightBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    badgeBg: "bg-emerald-50 text-emerald-700",
    glowColor: "rgba(5, 150, 105, 0.12)",
    tags: ["Better Care for More People", "Doctor Empowerment"]
  },
  {
    id: "04",
    label: "The Core Purpose",
    title: "Our Mission",
    subtitle: "Bridging Doctors with Patients",
    domain: "The Patient Bridge",
    subdomain: "Doctor Focus Protection",
    desc: "Our mission is to bridge the gap between exceptional healthcare professionals and the patients who need them through targeted digital strategies built exclusively for the healthcare industry. We help clinics, hospitals, and specialists grow their patient base, strengthen their online reputation, and focus on what they do best.",
    icon: Target,
    color: "#e20b27",
    lightBg: "bg-rose-50 text-[#e20b27] border-rose-100",
    badgeBg: "bg-rose-50 text-rose-700",
    glowColor: "rgba(226, 11, 39, 0.12)",
    tags: ["Targeted Digital Strategies", "Protecting Doctor Reputation"]
  }
];

export default function WhyChooseUs() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-14 lg:py-20 bg-[#fafbfe] relative overflow-hidden border-t border-slate-100">

      {/* Animated Subtle Ambient Background Lights */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(#1a1053 1.5px, transparent 1.5px)',
            backgroundSize: '40px 40px'
          }}
        />
        <motion.div
          animate={{ transform: ["scale(1)", "scale(1.15)", "scale(1)"], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ transform: ["scale(1)", "scale(1.2)", "scale(1)"], opacity: [0.04, 0.07, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[140px]"
        />
      </div>

      <div className="mx-auto px-4 lg:px-8 max-w-6xl relative z-10">

        {/* Section Manifesto Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, transform: "translate(0px, 10px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-3.5"
          >
            <Compass size={13} className="text-[#e20b27] animate-spin" style={{ animationDuration: '12s' }} />
            <span className="text-xs font-semibold text-[#1a1053] tracking-wide">
              The Codigix Manifesto · Purpose & Values
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, transform: "translate(0px, 15px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] tracking-tight leading-[1.15]"
          >
            Our Purpose, Values & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
              Vision for Indian Healthcare
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, transform: "translate(0px, 10px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-600 font-light text-base sm:text-lg leading-relaxed mt-3.5 max-w-xl mx-auto"
          >
            Why we started Codigix Infotech — and the foundational principles that guide every doctor partnership, clinic campaign, and hospital strategy.
          </motion.p>
        </div>

        {/* The 4 Manifesto Chapters with Smooth Kinetic Animation */}
        <div className="space-y-6 lg:space-y-8">
          {chapters.map((chapter, idx) => {
            const Icon = chapter.icon;
            const isReverse = idx % 2 !== 0;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, transform: "translate(0px, 15px)" }}
                whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } items-start lg:items-center justify-between gap-5 lg:gap-8 pb-6 lg:pb-8 border-b border-slate-200/80 group transition-all duration-300`}
              >
                {/* Left Side: Chapter Title & Animated Beacon */}
                <div className="lg:w-[32%] shrink-0">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: chapter.color }}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: chapter.color }}></span>
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: chapter.color }}></span>
                    </span>
                    <span>Chapter {chapter.id}</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-500">{chapter.label}</span>
                  </div>

                  <h3 className="text-3xl sm:text-[34px] font-bold text-[#1a1053] tracking-tight group-hover:translate-x-1 transition-transform duration-300 mt-1 mb-1.5">
                    {chapter.title}
                  </h3>

                  <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                    {chapter.subtitle}
                  </p>

                  {/* Floating Icon Orb with Micro-Bounce */}
                  <div className="mt-5 flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-[14px] ${chapter.lightBg} border flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                      <Icon size={20} />
                    </div>
                    <div className="text-[13px] font-medium text-slate-700 leading-tight">
                      <span className="block font-bold text-[#1a1053] text-[14px]">{chapter.domain}</span>
                      <span className="text-slate-500 font-normal">{chapter.subdomain}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Interactive Fluid Quote Container with Hover Elevation */}
                <div
                  className={`lg:w-[68%] bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl border transition-all duration-400 relative shadow-2xs ${isHovered
                    ? 'border-slate-300 shadow-[0_12px_30px_rgba(26,16,83,0.08)] bg-white'
                    : 'border-slate-200/70 hover:border-slate-300'
                    }`}
                >
                  {/* Floating Ambient Glow Flare on Hover */}
                  <div
                    className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    style={{ backgroundColor: chapter.glowColor }}
                  />

                  <Quote
                    className="absolute top-5 right-5 w-12 h-12 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 opacity-[0.07]"
                    style={{ color: chapter.color }}
                  />

                  {/* Verbatim Authentic Text */}
                  <p className="text-slate-600 font-light text-sm sm:text-[15px] sm:leading-relaxed relative z-10 pr-6">
                    {chapter.desc}
                  </p>

                  {/* Staggered Verification Tags */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-2 relative z-10">
                    {chapter.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 ${chapter.badgeBg} rounded-lg text-[11px] font-semibold transition-transform duration-200 hover:scale-105`}
                      >
                        <CheckCircle2 size={13} style={{ color: chapter.color }} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Bottom Laser Progress Accent on Hover */}
                  <div
                    className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full transition-all duration-400 ${isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    style={{ backgroundColor: chapter.color }}
                  />
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
