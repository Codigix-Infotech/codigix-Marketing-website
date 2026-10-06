"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  TrendingUp,
  Search,
  BookOpen,
  CheckCircle2,
  Flame,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Stethoscope,
  MapPin,
  Tag,
} from 'lucide-react';
import type { BlogCategory } from '@/lib/types';

interface BlogHeroProps {
  title?: string;
  gradientText?: string;
  subtitle?: string;
  badgeLabel?: string;
  categoryName?: string;
  categorySlug?: string;
  totalPosts?: number;
  categories?: BlogCategory[];
  activeTag?: string;
  searchQuery?: string;
}

const focusTopics = [
  { name: 'Google Maps 3-Pack', tag: 'Local SEO', icon: MapPin },
  { name: 'Medical E-E-A-T', tag: 'Healthcare Marketing', icon: Stethoscope },
  { name: 'AI Search & AEO', tag: 'AI Search', icon: Sparkles },
  { name: 'High-ROI PPC', tag: 'PPC', icon: TrendingUp },
  { name: 'E-commerce CRO', tag: 'CRO', icon: Flame },
];

export default function BlogHero({
  title,
  gradientText,
  subtitle,
  badgeLabel,
  categoryName,
  categorySlug,
  totalPosts = 12,
  categories = [],
  activeTag,
  searchQuery,
}: BlogHeroProps) {
  const isCategory = Boolean(categoryName);

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#0e082b] via-[#1a1053] to-[#120938] text-white">
      {/* Background Subtle Grid Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="absolute -top-32 -right-32 w-[550px] h-[550px] bg-[#e20b27]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-indigo-500/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Floating Circles */}
      <div className="absolute top-20 right-[15%] w-72 h-72 border border-white/5 rounded-full pointer-events-none hidden md:block" />
      <div className="absolute top-10 right-[12%] w-96 h-96 border border-dashed border-white/5 rounded-full pointer-events-none hidden lg:block" />

      <div className="container mx-auto px-4  relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Breadcrumb / Category Back Link */}
          {isCategory && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-200/80 hover:text-white transition-colors bg-white/5 px-3 py-1 rounded-full border border-white/10"
              >
                <ArrowLeft size={13} />
                <span>Back to all articles</span>
              </Link>
            </motion.div>
          )}

          {/* Top Pill Beacon */}
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
              {badgeLabel || (isCategory ? `Category • ${categoryName}` : 'Codigix Growth & Healthcare Intelligence')}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 text-white"
          >
            {title ? (
              <>
                {title}{' '}
                {gradientText && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-[#ff7585]">
                    {gradientText}
                  </span>
                )}
              </>
            ) : isCategory ? (
              <>
                {categoryName}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-[#ff7585]">
                  Insights.
                </span>
              </>
            ) : (
              <>
                Data-Backed Strategies &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-[#ff7585]">
                  Growth Intelligence.
                </span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-indigo-100/80 leading-relaxed max-w-2xl mb-8"
          >
            {subtitle ||
              (isCategory
                ? `Explore research, tactics, and case studies specifically dedicated to ${categoryName?.toLowerCase()}.`
                : 'Actionable playbooks, Google Maps ranking blueprints, medical E-E-A-T content systems, and conversion frameworks tested across leading clinics and brands.')}
          </motion.p>

          {/* Direct Search Bar */}
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            action="/blog"
            method="get"
            role="search"
            className="relative w-full max-w-xl mb-8 shadow-2xl"
          >
            <div className="relative flex items-center">
              <Search
                size={18}
                className="absolute left-5 text-indigo-200/60 pointer-events-none"
              />
              <input
                id="hero-blog-search"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search SEO guides, PPC tactics, healthcare playbooks…"
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full pl-12 pr-28 sm:pr-32 py-3.5 sm:py-4 text-sm sm:text-base text-white placeholder-indigo-200/50 focus:outline-none focus:ring-2 focus:ring-[#e20b27] focus:bg-white/15 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#e20b27] hover:bg-[#c20921] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight size={13} className="hidden sm:inline" />
              </button>
            </div>
          </motion.form>

          {/* Quick Filter Topic Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            <span className="text-xs text-indigo-200/60 font-semibold mr-1">
              Popular Topics:
            </span>
            {focusTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.name}
                  href={`/blog?tag=${encodeURIComponent(topic.tag)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-indigo-100 hover:text-white border border-white/15 backdrop-blur-sm transition-all duration-200"
                >
                  <Icon size={12} className="text-[#ff7582]" />
                  <span>{topic.name}</span>
                </Link>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Trust & Editorial Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
              <BookOpen size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-white leading-tight">50+</div>
              <div className="text-[11px] text-indigo-200/70">Growth Playbooks</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-white leading-tight">100%</div>
              <div className="text-[11px] text-indigo-200/70">Verified Strategies</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
              <TrendingUp size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-white leading-tight">Weekly</div>
              <div className="text-[11px] text-indigo-200/70">Market Research</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-white leading-tight">Free</div>
              <div className="text-[11px] text-indigo-200/70">Practice Audits</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
