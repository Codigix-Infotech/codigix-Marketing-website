"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Trophy,
  Users,
  Compass,
  Zap,
  Award,
} from 'lucide-react';

export default function CareersHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#0c0728] via-[#1a1053] to-[#110834] text-white">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[#e20b27]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-indigo-500/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-1/4 w-[450px] h-[450px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Geometric Rings */}
      <div className="absolute top-24 right-[10%] w-80 h-80 border border-white/5 rounded-full pointer-events-none hidden lg:block" />
      <div className="absolute top-12 right-[8%] w-[420px] h-[420px] border border-dashed border-white/5 rounded-full pointer-events-none hidden lg:block" />

      <div className="container mx-auto px-4  relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Top Hiring Beacon */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-inner mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5266] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e20b27]" />
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-200">
              We&apos;re Hiring Across Performance, SEO & Creative
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 text-white"
          >
            Build Real Impact. Scale Top Brands.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-[#ff7582]">
              Grow Your Career in Digital Marketing.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-indigo-100/80 leading-relaxed max-w-2xl mb-10"
          >
            Join Pune&apos;s leading performance, SEO, and healthcare growth agency. Work on campaigns that rank #1 on Google, manage multi-lakh ad spends, craft viral reels, and learn recession-proof growth frameworks.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <a
              href="#open-roles"
              className="px-7 py-3.5 rounded-full bg-[#e20b27] hover:bg-[#c20921] text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#e20b27]/25 flex items-center gap-2 group"
            >
              <span>Explore Open Roles</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#culture"
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all duration-300"
            >
              Why Marketers Choose Us
            </a>
          </motion.div>
        </div>

        {/* 4 Bottom Key Trust & Growth Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
              <TrendingUp size={22} />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-white leading-tight">120+</div>
              <div className="text-xs text-indigo-200/70">Campaigns Scaled</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <Trophy size={22} />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-white leading-tight">4.9 / 5</div>
              <div className="text-xs text-indigo-200/70">Team Glassdoor Rating</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
              <Award size={22} />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-white leading-tight">₹50K+</div>
              <div className="text-xs text-indigo-200/70">Learning Budget / Yr</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
              <Zap size={22} />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-white leading-tight">Fast-Track</div>
              <div className="text-xs text-indigo-200/70">Merit Growth Reviews</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
