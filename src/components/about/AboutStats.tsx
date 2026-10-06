"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Building2,
  TrendingUp,
  Award,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  HeartHandshake
} from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  sublabel: string;
  badge: string;
  icon: React.ElementType;
  accentColor: string;
  gradient: string;
  bgGlow: string;
}

const stats: StatItem[] = [
  {
    value: "96%",
    label: "Client Retention Rate",
    sublabel: "Long-term doctor & hospital partnerships",
    badge: "Industry High",
    icon: HeartHandshake,
    accentColor: "text-emerald-500",
    gradient: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-500/10"
  },
  {
    value: "50+",
    label: "Healthcare Clients Served",
    sublabel: "Hospitals, clinics & super-specialists",
    badge: "Pune & Pan-India",
    icon: Building2,
    accentColor: "text-blue-500",
    gradient: "from-blue-600 to-indigo-600",
    bgGlow: "bg-blue-500/10"
  },
  {
    value: "250+",
    label: "Campaigns & Projects Completed",
    sublabel: "Medical SEO, GMB & patient growth cycles",
    badge: "100% Verified",
    icon: TrendingUp,
    accentColor: "text-purple-500",
    gradient: "from-purple-600 to-violet-600",
    bgGlow: "bg-purple-500/10"
  },
  {
    value: "5+",
    label: "Years Healthcare Focus",
    sublabel: "Dedicated medical marketing domain expertise",
    badge: "Specialized",
    icon: Award,
    accentColor: "text-[#e20b27]",
    gradient: "from-[#e20b27] to-rose-600",
    bgGlow: "bg-rose-500/10"
  }
];

export default function AboutStats() {
  return (
    <section className="py-20 lg:py-24 bg-[#fafbfe] relative overflow-hidden border-y border-slate-100">
      {/* Ambient background glow dots */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#1a1053 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className=" mx-auto px-4 lg:px-8  relative z-10 max-w-7xl">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs mb-3.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[11px] font-semibold text-[#1a1053] uppercase tracking-wider">
              Proven Track Record
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1053] tracking-tight">
            Impact Measured by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Real Patient Growth</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-light mt-3">
            Every metric reflects real healthcare practices empowered with predictable patient inquiries.
          </p>
        </div>

        {/* 4-Column High-Tech Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-[0_8px_30px_rgba(26,16,83,0.04)] hover:shadow-[0_20px_45px_rgba(26,16,83,0.10)] hover:border-blue-200 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${stat.bgGlow} flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${stat.accentColor}`} />
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200/80 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
                    {stat.badge}
                  </span>
                </div>

                {/* Main Stat Number */}
                <div className="mb-3">
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1a1053] group-hover:text-blue-600 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mt-2 leading-snug">
                    {stat.label}
                  </div>
                </div>

                {/* Subtitle / Description */}
                <div className="pt-3 border-t border-slate-100 mt-auto flex items-center justify-between">
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    {stat.sublabel}
                  </p>
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                </div>

                {/* Bottom subtle colored active bar on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
