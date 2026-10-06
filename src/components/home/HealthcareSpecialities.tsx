"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import {
  Building2, Stethoscope, Ear, Smile, Sparkles, Brain,
  Activity, Eye, Pill, HeartPulse, Leaf, Syringe,
  ChevronRight, Users, Shield, Link2, Heart, Baby, Microscope
} from 'lucide-react';
import Link from 'next/link';

function AnimatedCounter({ to }: { to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;
    // Respect prefers-reduced-motion
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

export default function HealthcareSpecialities() {
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
    { name: "IVF", Icon: Baby, color: "text-indigo-500", bg: "bg-indigo-50" },
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
    <div className="pt-4 pb-24 relative z-10">
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      <motion.div
        initial={{ opacity: 0, transform: "translate(0px, 30px)" }}
        whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-4 lg:px-8 "
      >

        {/* Top Header Section */}
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
            <motion.div variants={{ hidden: { opacity: 0, transform: "translate(0px, 10px)" }, visible: { opacity: 1, transform: "translate(0px, 0px)" } }} className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold tracking-[0.15em] text-primary-accent uppercase">
                HEALTHCARE SPECIALITIES
              </span>
              <div className="w-12 h-[1px] bg-highlight/50" />
            </motion.div>

            <motion.h2 variants={{ hidden: { opacity: 0, transform: "translate(0px, 15px)" }, visible: { opacity: 1, transform: "translate(0px, 0px)" } }} className="text-4xl lg:text-5xl font-semibold text-[#1a1053] leading-[1.18] tracking-tight mb-6">
              Complete Digital Solutions <br />
              for Every <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Healthcare Need</span>
            </motion.h2>

            <motion.p variants={{ hidden: { opacity: 0, transform: "translate(0px, 15px)" }, visible: { opacity: 1, transform: "translate(0px, 0px)" } }} className="text-[15px] text-slate-500 max-w-lg font-light leading-relaxed">
              We understand the unique needs of the healthcare industry and deliver technology solutions tailored for every speciality.
            </motion.p>
          </motion.div>

          {/* Healthcare Digital Hub Showcase */}
          <motion.div
            initial={{ opacity: 0, transform: "translate(20px, 0px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-[480px] shrink-0 hidden md:block"
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
                    <span className="text-[10px] font-light text-slate-500 uppercase tracking-wider">Google Maps Pack</span>
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

        {/* Cards Continuous Marquee */}
        <div className="relative w-full overflow-hidden mb-8 group/marquee" style={{ maskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)' }}>
          <div className="flex w-max animate-marquee gap-4 py-2">
            {[...specialities, ...specialities].map((spec, idx) => (
              <div
                key={idx}
                className="w-[180px] lg:w-[200px] shrink-0 bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-primary-accent/30 transition-all duration-300 group/card cursor-pointer flex flex-col justify-between min-h-[140px]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 rounded-full ${spec.bg} ${spec.color} flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110`}>
                    <spec.Icon size={24} strokeWidth={1.5} className="transition-all duration-300 group-hover/card:fill-current" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover/card:bg-primary-accent group-hover/card:text-white transition-colors duration-300">
                    <ChevronRight size={14} className="transition-transform duration-300 group-hover/card:translate-x-0.5" />
                  </div>
                </div>
                <h4 className="font-medium text-[13px] text-[#1a1053] leading-tight pr-2 group-hover/card:text-primary-accent transition-colors duration-300">
                  {spec.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
          <div className="flex items-center gap-6 bg-white py-3 px-6 rounded-xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-[#f8f9ff] text-primary-accent flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-[#1a1053] text-lg leading-none mb-1">
                <AnimatedCounter to={500} />
              </h4>
              <p className="text-[11px] font-light text-slate-500 uppercase tracking-wider">Healthcare Clients Served</p>
            </div>
          </div>

          <div className="flex-1 hidden md:flex items-center justify-center px-8">
            <div className="h-[1px] w-full bg-slate-200 relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fafbfe] px-4 text-[10px] font-light text-slate-400 tracking-[0.2em] uppercase whitespace-nowrap">
                Empowering Healthcare With Innovative Digital Solutions
              </span>
            </div>
          </div>

          <Link href="/services" className="group flex items-center gap-2 text-sm font-semibold text-[#1a1053] hover:text-primary-accent transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent rounded-lg px-2 py-1 relative">
            <span>Explore All Healthcare Solutions</span>
            <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute -bottom-1 left-2 right-8 h-[2px] bg-primary-accent scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>

      </motion.div >
    </div >
  );
}
