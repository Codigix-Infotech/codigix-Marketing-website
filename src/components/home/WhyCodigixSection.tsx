"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Compass,
  BrainCircuit,
  Layers,
  ShieldCheck,
  Trophy,
  Infinity as InfinityIcon
} from 'lucide-react';

export default function WhyCodigixSection() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const points = [
    "Strategy aligned with business goals.",
    "Creative thinking supported by data.",
    "Cross-industry understanding.",
    "Transparent communication.",
    "Focus on meaningful business outcomes.",
    "Continuous improvement."
  ];

  const features = [
    {
      id: 0,
      icon: Compass,
      label: "Strategic",
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      glow: "rgba(59,130,246,0.3)",
      radius: 140,
      angle: 0
    },
    {
      id: 1,
      icon: BrainCircuit,
      label: "Data-Driven",
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-200",
      glow: "rgba(168,85,247,0.3)",
      radius: 205,
      angle: 60
    },
    {
      id: 2,
      icon: Layers,
      label: "Versatile",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      glow: "rgba(16,185,129,0.3)",
      radius: 140,
      angle: 120
    },
    {
      id: 3,
      icon: ShieldCheck,
      label: "Transparent",
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
      glow: "rgba(245,158,11,0.3)",
      radius: 205,
      angle: 180
    },
    {
      id: 4,
      icon: Trophy,
      label: "Outcomes",
      color: "text-rose-500",
      bg: "bg-rose-50",
      border: "border-rose-200",
      glow: "rgba(226,11,39,0.3)",
      radius: 140,
      angle: 240
    },
    {
      id: 5,
      icon: InfinityIcon,
      label: "Continuous",
      color: "text-cyan-500",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      glow: "rgba(6,182,212,0.3)",
      radius: 205,
      angle: 300
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden border-t border-slate-100 relative">
      {/* Subtle Background Grid & Glows */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 232, 240, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 70% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 40%, transparent 80%)'
        }}
      />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-primary-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className=" mx-auto px-4 lg:px-8  relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Content */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-[#1a1053] tracking-wide mb-3.5 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Why Partner With Us</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
              whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] leading-[1.15] tracking-tight mb-8"
            >
              Good Ideas Need <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Great Execution.
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              {points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, transform: "translate(-20px, 0px)" }}
                  whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/60 shadow-2xs">
                    <CheckCircle2 size={13} className="text-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base font-light text-slate-700 leading-relaxed">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Content - Enhanced Orbital Growth Visualizer */}
          <div className="w-full h-[360px] min-[420px]:h-[400px] sm:h-[520px] flex items-center justify-center relative select-none">
            {/* The orbit is laid out in a fixed 520px box; on phones the whole box is scaled down so nothing is cut off. */}
            <div className="relative w-[520px] h-[520px] shrink-0 flex items-center justify-center scale-[0.66] min-[420px]:scale-[0.75] sm:scale-100">
            {/* Ambient Core Glow */}
            <div className="absolute inset-0 m-auto w-72 h-72 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-primary-accent/10 rounded-full blur-3xl pointer-events-none" />

            {/* Orbit Rings with Subtle Shimmer */}
            <div className="absolute inset-0 m-auto w-[280px] h-[280px] rounded-full border border-slate-200/80 border-dashed animate-[spin_45s_linear_infinite]" />
            <div className="absolute inset-0 m-auto w-[410px] h-[410px] rounded-full border border-slate-200/60 border-dashed animate-[spin_65s_linear_infinite_reverse]" />
            <div className="absolute inset-0 m-auto w-[480px] h-[480px] rounded-full border border-slate-100 pointer-events-none" />

            {/* Pulsing Radar Wave */}
            <motion.div
              className="absolute inset-0 m-auto w-32 h-32 rounded-full border-2 border-primary-accent/30 pointer-events-none"
              animate={{ transform: ["scale(1)", "scale(2.4)"], opacity: [0.6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            />

            {/* Central Hub Node */}
            <motion.div
              initial={{ transform: "scale(0)" }}
              whileInView={{ transform: "scale(1)" }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
              className="relative z-20 w-32 h-32 rounded-full bg-white shadow-[0_20px_50px_-10px_rgba(26,16,83,0.2)] flex items-center justify-center border-[8px] border-slate-50 group cursor-pointer"
            >
              <div className="w-18 h-18 bg-white rounded-full flex flex-col items-center justify-center shadow-inner overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/apple-touch-icon.png" alt="Codigix" className="w-12 h-12 object-contain" />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-2 bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wider">Active</span>
              </div>
            </motion.div>

            {/* Orbiting Feature Nodes */}
            {features.map((feat, i) => {
              const rad = (feat.angle - 90) * (Math.PI / 180);
              const x = Math.cos(rad) * feat.radius;
              const y = Math.sin(rad) * feat.radius;
              const isHovered = activeNode === feat.id;

              return (
                <motion.div
                  key={feat.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.08), type: "spring", duration: 0.5 }}
                  className="absolute z-20"
                  style={{ x, y }}
                  onMouseEnter={() => setActiveNode(feat.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  <div className="flex flex-col items-center group cursor-pointer relative">

                    {/* Node Container with Glassmorphism & Elevation */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`w-14 h-14 rounded-2xl ${feat.bg} ${feat.border} border backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)] bg-white/95 relative overflow-hidden`}
                      style={{
                        boxShadow: isHovered ? `0 12px 28px -4px ${feat.glow}` : undefined
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-transparent pointer-events-none" />
                      <feat.icon className={`${feat.color} relative z-10 drop-shadow-sm`} size={22} strokeWidth={2.2} />
                    </motion.div>

                    {/* Floating Label Pill */}
                    <span className="mt-2 text-[11px] font-bold text-slate-700 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md border border-slate-200/80 transition-all duration-200 group-hover:scale-105 group-hover:border-slate-300 whitespace-nowrap pointer-events-none">
                      {feat.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

