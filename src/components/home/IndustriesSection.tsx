"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import {
  Building2, Stethoscope, Ear, Smile, Sparkles, Brain,
  Activity, Eye, Pill, HeartPulse, Leaf, Syringe,
  ChevronRight, Users, Shield, Link2, Heart, Baby, Microscope,
  Scale, Tractor, Utensils, Star, PhoneCall, Plus
} from 'lucide-react';
import Link from 'next/link';

function AnimatedCounter({ to }: { to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      nodeRef.current.textContent = `${to}+`;
      return;
    }

    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.round(value).toString() + "+";
        }
      }
    });
    return () => controls.stop();
  }, [isInView, to]);

  return <span ref={nodeRef}>0+</span>;
}

export default function IndustriesSection() {
  const specialities = [
    { name: "Hospital", Icon: Building2, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Clinic", Icon: Stethoscope, color: "text-pink-500", bg: "bg-pink-50" },
    { name: "ENT Specialists", Icon: Ear, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Dentist", Icon: Smile, color: "text-purple-500", bg: "bg-purple-50" },
    { name: "Dermatologists", Icon: Sparkles, color: "text-orange-500", bg: "bg-orange-50" },
    { name: "Neurologist", Icon: Brain, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Oncologist", Icon: Activity, color: "text-pink-500", bg: "bg-pink-50" },
    { name: "Ophthalmologist", Icon: Eye, color: "text-primary-accent", bg: "bg-slate-50" },
    { name: "Gastroenterologist", Icon: Pill, color: "text-orange-500", bg: "bg-orange-50" },
    { name: "Cardiologist", Icon: HeartPulse, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Ayurveda", Icon: Leaf, color: "text-purple-500", bg: "bg-purple-50" },
    { name: "Surgeons", Icon: Syringe, color: "text-pink-500", bg: "bg-pink-50" },
    { name: "Gynecologist", Icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
    { name: "IVF & Fertility", Icon: Baby, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  const otherIndustries = [
    { name: "Advocate / Legal", Icon: Scale, color: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200" },
    { name: "Agrotourism", Icon: Tractor, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { name: "Catering & Events", Icon: Utensils, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
    { name: "More Industries", Icon: Plus, color: "text-primary-accent", bg: "bg-slate-50", border: "border-slate-200" },
  ];

  const cssStyles = `
    .stroke-draw path, .stroke-draw circle, .stroke-draw rect, .stroke-draw polyline, .stroke-draw line {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: draw 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    @media (prefers-reduced-motion) {
      .stroke-draw path, .stroke-draw circle, .stroke-draw rect, .stroke-draw polyline, .stroke-draw line {
        animation: none;
        stroke-dashoffset: 0;
      }
    }
    @keyframes draw {
      100% { stroke-dashoffset: 0; }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 35s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }
  `;

  return (
    <div className="py-24 relative z-10">
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      <div className="container mx-auto px-4 lg:px-8 ">

        {/* Unified Header Section focusing on Healthcare Specialities */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-3.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs font-semibold text-[#1a1053] tracking-wide">
                Healthcare Specialities · Tailored Marketing
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] tracking-tight leading-[1.15] mb-4">
              Healthcare Specialities. <br className="hidden md:block" />
              A Dedicated Goal — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Patient Growth.</span>
            </h2>

            <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed max-w-lg">
              We deliver tailored digital marketing, SEO, Google Maps 3-Pack rankings, and doctor branding across medical specialities — empowering hospitals, clinics, and specialists to scale patient appointments.
            </p>
          </motion.div>

          {/* Healthcare Digital Hub Showcase */}
          <motion.div
            initial={{ opacity: 0, transform: "translate(20px, 0px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-[480px] shrink-0"
          >
            <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl p-6 border border-slate-200/80 shadow-[0_20px_45px_rgba(26,16,83,0.05)] overflow-hidden">
              {/* Radiant Ambient Glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#e20b27]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-[#1a1053]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Row: Building Icon + Status Tag */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1a1053] to-[#382f7c] flex items-center justify-center text-white shadow-sm">
                    <Building2 size={22} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-[#1a1053] leading-tight">Healthcare Digital Hub</h4>
                    <p className="text-xs text-slate-400 font-light">Smarter Healthcare Growth</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/60 text-emerald-700 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>100+ Practices Scaled</span>
                </div>
              </div>

              {/* Central Key Highlight / Impact Bar */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#f8fafe] to-[#eef2f9] border border-slate-200/50 mb-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold text-[#1a1053] tracking-tight">3.8x</span>
                    <span className="text-[10px] font-light text-slate-500 uppercase tracking-wider">Patient Inflow</span>
                  </div>
                  <div className="h-7 w-[1px] bg-slate-200" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold text-[#e20b27] tracking-tight">#1 Rank</span>
                    <span className="text-[10px] font-light text-slate-500 uppercase tracking-wider">Google Maps</span>
                  </div>
                  <div className="h-7 w-[1px] bg-slate-200" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold text-emerald-600 tracking-tight">98.4%</span>
                    <span className="text-[10px] font-light text-slate-500 uppercase tracking-wider">Retention</span>
                  </div>
                </div>
              </div>

              {/* Managed Specialties Floating Tag Cloud */}
              <div className="flex flex-wrap items-center gap-2 relative z-10">
                <span className="px-3 py-1 rounded-xl bg-blue-50/80 text-blue-700 border border-blue-100/80 text-xs font-light flex items-center gap-1.5">
                  <Building2 size={13} className="text-blue-500" /> Hospitals
                </span>
                <span className="px-3 py-1 rounded-xl bg-purple-50/80 text-purple-700 border border-purple-100/80 text-xs font-light flex items-center gap-1.5">
                  <Smile size={13} className="text-purple-500" /> Dental Clinics
                </span>
                <span className="px-3 py-1 rounded-xl bg-rose-50/80 text-[#e20b27] border border-rose-100/80 text-xs font-light flex items-center gap-1.5">
                  <Baby size={13} className="text-[#e20b27]" /> IVF & Fertility
                </span>
                <span className="px-3 py-1 rounded-xl bg-emerald-50/80 text-emerald-700 border border-emerald-100/80 text-xs font-light flex items-center gap-1.5">
                  <HeartPulse size={13} className="text-emerald-500" /> Specialist OPDs
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Primary Healthcare Specialities Strip */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-[#1a1053] to-[#382f7c] text-white text-[11px] font-medium uppercase tracking-wider py-1 px-3.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <Star size={11} className="text-amber-400 fill-amber-400" /> Primary Specialities
            </div>
            <h3 className="text-xl font-semibold text-[#1a1053]">Medical Disciplines We Scale</h3>
          </div>
          <span className="text-xs font-light text-slate-400 hidden sm:inline-block">
            Continuous medical category coverage
          </span>
        </div>

        {/* Continuous Marquee for Healthcare Specialities */}
        <div className="relative w-full overflow-hidden mb-16 group/marquee" style={{ maskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)' }}>
          <div className="flex w-max animate-marquee gap-4 py-2">
            {[...specialities, ...specialities].map((spec, idx) => (
              <div
                key={idx}
                className="w-[180px] lg:w-[200px] shrink-0 bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 group/card cursor-pointer flex flex-col justify-between min-h-[140px]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 rounded-full ${spec.bg} ${spec.color} flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110`}>
                    <spec.Icon size={24} strokeWidth={1.25} className="transition-all duration-300 group-hover/card:fill-current" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover/card:bg-[#1a1053] group-hover/card:text-white transition-colors duration-300">
                    <ChevronRight size={14} className="transition-transform duration-300 group-hover/card:translate-x-0.5" />
                  </div>
                </div>
                <h4 className="font-medium text-[13px] text-[#1a1053] leading-tight pr-2 group-hover/card:text-blue-600 transition-colors duration-300">
                  {spec.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Other Industries Catered */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 text-slate-600 text-[11px] font-medium uppercase tracking-wider py-1 px-3 rounded-full shadow-xs border border-slate-200/60">
              Cross-Industry Reach
            </div>
            <h3 className="text-xl font-semibold text-[#1a1053]">Other Industries We Cater To</h3>
          </div>
          <p className="text-xs font-light text-slate-400 hidden sm:inline-block">
            Proven growth frameworks applied to diverse business sectors
          </p>
        </div>

        {/* Grid layout for Other Industries */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {otherIndustries.map((industry, idx) => {
            const solidColorClass = industry.bg.replace('bg-', 'bg-').replace('-50', '-500');
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5, type: "spring", stiffness: 100 }}
                className={`bg-white rounded-2xl p-5 border ${industry.border} shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[140px] relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent`}
                tabIndex={0}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 rounded-full ${industry.bg} ${industry.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <industry.Icon size={24} strokeWidth={1.25} className="transition-all duration-300 group-hover:fill-current" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover/card:bg-[#1a1053] group-hover/card:text-white transition-colors duration-300">
                    <ChevronRight size={14} className="transition-transform duration-300 group-hover/card:translate-x-0.5" />
                  </div>
                </div>

                <h4 className="font-medium text-[13px] text-[#1a1053] leading-tight pr-2 group-hover:text-blue-600 transition-colors duration-300 z-10 relative">
                  {industry.name}
                </h4>

                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-100 overflow-hidden">
                  <div className={`h-full w-full ${solidColorClass} -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out`} />
                </div>
              </motion.div>
            );
          })}

          {/* Ready to Explore CTA Card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 100 }}
            className="col-span-2 lg:col-span-2 bg-gradient-to-br from-[#1a1053] via-[#26186b] to-[#382f7c] rounded-2xl p-5 shadow-[0_8px_30px_rgba(26,16,83,0.25)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[140px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 backdrop-blur-sm">
                <PhoneCall size={20} className="text-[#e20b27]" />
              </div>
              <Link href="/contact" className="text-white text-[10px] font-medium uppercase tracking-widest border border-white/20 rounded-full py-1.5 px-3 hover:bg-white hover:text-[#1a1053] transition-colors">
                Let's Talk
              </Link>
            </div>
            <div>
              <h4 className="font-semibold text-white text-[14px] leading-tight mb-1">
                Have a specialized practice?
              </h4>
              <p className="text-slate-300 text-[11px] font-light leading-snug">Let's discuss customized patient growth strategies for your domain.</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
          <div className="flex items-center gap-6 bg-white py-3 px-6 rounded-xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-[#f8f9ff] text-blue-600 flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-[#1a1053] text-lg leading-none mb-1">
                <AnimatedCounter to={500} />
              </h4>
              <p className="text-[11px] font-light text-slate-500 uppercase tracking-wider">Clients Served Across Sectors</p>
            </div>
          </div>

          <div className="flex-1 hidden md:flex items-center justify-center px-8">
            <div className="h-[1px] w-full bg-slate-200 relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fafbfe] px-4 text-[10px] font-light text-slate-400 tracking-[0.2em] uppercase whitespace-nowrap">
                Empowering Practices With Proven Digital Healthcare Solutions
              </span>
            </div>
          </div>

          <Link href="/services" className="group flex items-center gap-2 text-sm font-semibold text-[#1a1053] hover:text-[#e20b27] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent rounded-lg px-2 py-1 relative">
            <span>Explore All Specialities</span>
            <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute -bottom-1 left-2 right-8 h-[2px] bg-[#e20b27] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>
      </div >
    </div >
  );
}
