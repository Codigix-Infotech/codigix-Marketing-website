"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Users, Trophy, Smile, TrendingUp, BarChart2, Target, Search, Bell, Calendar, ChevronDown, Star, Heart, FileText, Rocket, Monitor, Megaphone, Edit, Lightbulb, Briefcase, Factory, Plus, ShoppingCart, GraduationCap, Utensils, Home, PlayCircle, Handshake, CheckCircle, Share2, Globe, ShieldCheck, MapPin, Youtube, Instagram, Link2, Play } from 'lucide-react';
import HeroDashboard from './HeroDashboard';
import type { HeroDashboardData } from '@/lib/types';

const healthcareCategories = [
   "Healthcare Brands",
   "Dental Clinics",
   "Hospitals",
   "IVF Centers",
   "Hair Clinics",
   "Cancer Centers",
   "Skin Clinics",
   "Doctors & Clinics"
];

// Custom hook for animated counter
function useLiveCount(baseValue: number, decimals: number = 0) {
   const [value, setValue] = useState(0);

   useEffect(() => {
      let animationFrame: number;
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
         const now = Date.now();
         const progress = Math.min((now - startTime) / duration, 1);
         const easeOut = 1 - Math.pow(1 - progress, 3);
         setValue(baseValue * easeOut);
         if (progress < 1) animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);

      const interval = setInterval(() => {
         const fluctuation = baseValue * (Math.random() * 0.04 - 0.02);
         setValue(prev => Math.max(0, prev + fluctuation));
      }, 2500);

      return () => {
         cancelAnimationFrame(animationFrame);
         clearInterval(interval);
      };
   }, [baseValue]);

   return value.toFixed(decimals);
}

// --- Background Dynamic Grid Component ---
const RandomGridBlocks = () => {
   const [blocks, setBlocks] = useState<{ id: number, x: number, y: number, color: string }[]>([]);
   const containerRef = useRef<HTMLDivElement>(null);
   // Only spawn blocks while the hero is on screen.
   const inView = useInView(containerRef);

   useEffect(() => {
      if (!inView) return;
      let active = true;
      const generateBlock = () => {
         if (!active) return;
         // +1 to ensure it covers edges
         const cols = Math.floor(window.innerWidth / 40) + 1;
         const rows = Math.floor(window.innerHeight / 40) + 1;

         const newBlock = {
            id: Math.random(),
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows),
            // Randomly choose between Codigix Red and Blue
            color: Math.random() > 0.5 ? 'bg-primary-accent' : 'bg-highlight'
         };

         // Keep only the last 20 blocks to prevent memory leaks and keep FPS pinned at 60/120fps
         setBlocks(prev => [...prev.slice(-20), newBlock]);
      };

      // Add a new random block every 350ms for smooth, stutter-free performance
      const interval = setInterval(generateBlock, 350);

      return () => {
         active = false;
         clearInterval(interval);
      };
   }, [inView]);

   return (
      <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {blocks.map(block => (
            <motion.div
               key={block.id}
               className={`absolute ${block.color}`}
               style={{
                  width: '39px',
                  height: '39px',
                  left: block.x * 40 + 1,
                  top: block.y * 40 + 1
               }}
               initial={{ opacity: 0 }}
               // Increased opacity to 0.15 so they are clearly visible but not overpowering
               animate={{ opacity: [0, 0.15, 0] }}
               transition={{ duration: 4, ease: "easeInOut" }}
            />
         ))}
      </div>
   );
};

// --- Main Hero Section ---

export default function HeroSection({ dashboard }: { dashboard?: HeroDashboardData }) {
   const [categoryIndex, setCategoryIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCategoryIndex((prev) => (prev + 1) % healthcareCategories.length);
      }, 2600);
      return () => clearInterval(interval);
   }, []);

   return (
      <section className="relative w-full pt-24 pb-12 lg:pt-28 lg:pb-12 overflow-hidden bg-gradient-to-br from-white via-[#f8fafe] to-[#eef2f9] flex items-center font-sans px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-12">

         {/* Animated Grid Pattern */}
         <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#1a1053 1px, transparent 1px), linear-gradient(90deg, #1a1053 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

         <RandomGridBlocks />

         {/* Animated Ambient Light Orbs */}
         <motion.div
            animate={{ transform: ["translate(-30px, -30px)", "translate(30px, 30px)", "translate(-30px, -30px)"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-0"
         />
         <motion.div
            animate={{ transform: ["translate(30px, 30px)", "translate(-30px, -30px)", "translate(30px, 30px)"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"
         />
         <motion.div
            animate={{ transform: ["translate(-20px, 20px)", "translate(20px, -20px)", "translate(-20px, 20px)"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0"
         />

         {/* Floating Geometric Elements */}
         <motion.div
            animate={{ transform: ["rotate(0deg)", "rotate(360deg)"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-[5%] right-[5%] w-[600px] h-[600px] border-[1px] border-dashed border-primary-accent/10 rounded-full z-0 pointer-events-none hidden lg:block"
         />
         <motion.div
            animate={{ transform: ["rotate(0deg)", "rotate(-360deg)"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[5%] w-[800px] h-[700px] border-[1px] border-solid border-purple-600/5 rounded-full z-0 pointer-events-none hidden lg:block"
         />

         <div className="w-full  mx-auto  relative z-20 flex flex-col lg:flex-row items-center justify-between">

            {/* LEFT COLUMN: 50% Hero Content */}
            <div className="flex flex-col items-start text-left w-full lg:w-[48%] xl:w-[46%] shrink-0 z-20 lg:pr-6">
               <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col w-full">

                  {/* Top Live Badge */}
                  <div className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white shadow-[0_2px_12px_rgba(26,16,83,0.06)] border border-slate-200/80 mb-5 hover:border-[#e20b27]/40 transition-all cursor-default w-fit">
                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e20b27] text-white text-[10px] font-bold uppercase tracking-wider">
                        <span className="flex h-1.5 w-1.5 relative">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </span>
                        Pune
                     </span>
                     <span className="text-[11px] sm:text-xs font-semibold text-[#1a1053] tracking-wider uppercase">
                        Healthcare Marketing & Patient Acquisition
                     </span>
                  </div>

                  {/* Main Headline with Animated Categories - Stable Height & No Layout Jump */}
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.8rem] font-semibold leading-[1.12] text-[#1a1053] tracking-tight mb-5">
                     Strategy That Grows <br />
                     <span className="relative inline-flex items-center h-[1.24em] overflow-hidden align-middle">
                        <AnimatePresence mode="popLayout">
                           <motion.span
                              key={categoryIndex}
                              initial={{ y: "85%", opacity: 0 }}
                              animate={{ y: "0%", opacity: 1 }}
                              exit={{ y: "-85%", opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                              className="inline-block font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] bg-clip-text text-transparent whitespace-nowrap leading-tight"
                           >
                              {healthcareCategories[categoryIndex]}
                           </motion.span>
                        </AnimatePresence>
                        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] rounded-full opacity-80" />
                     </span>
                  </h1>

                  {/* Subtitle Paragraph */}
                  <p className="text-base sm:text-lg text-slate-600 mb-7 max-w-xl font-light leading-relaxed">
                     Codigix Infotech is Pune’s premier healthcare growth agency — helping hospitals, clinics & specialists win more patients with{' '}
                     <span className="font-medium text-[#1a1053]">#1 Google Maps rankings</span>,{' '}
                     <span className="font-medium text-[#1a1053]">healthcare SEO</span> and{' '}
                     <span className="font-medium text-[#1a1053]">content that converts</span>.
                  </p>

                  {/* Proof Strip */}
                  <div className="grid grid-cols-3 w-full max-w-xl mb-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-[0_4px_20px_-8px_rgba(26,16,83,0.12)] divide-x divide-slate-200/80">
                     {[
                        { icon: Users, value: '75+', label: 'Healthcare clients', tint: 'text-blue-600 bg-blue-50' },
                        { icon: MapPin, value: '94%', label: '#1 on Google Maps', tint: 'text-emerald-600 bg-emerald-50' },
                        { icon: TrendingUp, value: '4.8x', label: 'Average ad ROAS', tint: 'text-[#e20b27] bg-rose-50' },
                     ].map(({ icon: Icon, value, label, tint }) => (
                        <div key={label} className="flex items-center gap-2.5 px-3 sm:px-4 py-3">
                           <div className={`hidden 2xl:flex w-9 h-9 rounded-xl items-center justify-center shrink-0 ${tint}`}>
                              <Icon size={17} />
                           </div>
                           <div className="leading-tight min-w-0">
                              <div className="text-xl sm:text-2xl font-bold text-[#1a1053] tracking-tight">{value}</div>
                              <div className="text-[10.5px] sm:text-xs text-slate-500 truncate">{label}</div>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full mb-8">
                     <a
                        href="https://codigix.co/about-us/"
                        className="group inline-flex items-center justify-center gap-3 pl-7 pr-2 py-2 w-full sm:w-auto bg-[#1a1053] hover:bg-[#26186b] text-white rounded-full font-medium text-[15px] shadow-[0_10px_25px_rgba(26,16,83,0.25)] hover:shadow-[0_14px_35px_rgba(26,16,83,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                     >
                        <span>Discover More About Us</span>
                        <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-[#e20b27] group-hover:text-white transition-colors duration-300">
                           <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                     </a>

                     <button className="group inline-flex items-center justify-center gap-3 px-2 py-2 w-full sm:w-auto text-[#1a1053] font-medium text-[15px] transition-all duration-300">
                        <span className="relative w-11 h-11 rounded-full bg-white border border-slate-200 shadow-[0_6px_16px_-6px_rgba(226,11,39,0.4)] flex items-center justify-center text-[#e20b27] group-hover:bg-[#e20b27] group-hover:text-white group-hover:border-[#e20b27] transition-colors duration-300">
                           <span className="absolute inset-0 rounded-full border border-[#e20b27]/40 animate-ping opacity-40" />
                           <Play size={16} className="fill-current ml-0.5" />
                        </span>
                        <span className="flex flex-col items-start leading-tight">
                           <span>Watch Video</span>
                           <span className="text-[11px] font-normal text-slate-500">See how we grow clinics</span>
                        </span>
                     </button>
                  </div>

                  {/* Channels we manage */}
                  <div className="flex flex-wrap items-center gap-2">
                     <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 mr-1">Channels we manage</span>
                     {[
                        { icon: TrendingUp, label: 'SEO', color: 'text-emerald-600' },
                        { icon: MapPin, label: 'Google Maps', color: 'text-blue-600' },
                        { icon: Link2, label: 'Backlinks', color: 'text-purple-600' },
                        { icon: Instagram, label: 'Instagram & Meta', color: 'text-pink-600' },
                        { icon: Youtube, label: 'YouTube', color: 'text-[#e20b27]' },
                     ].map(({ icon: Icon, label, color }) => (
                        <span key={label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200/80 text-[11px] font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                           <Icon size={12} className={color} /> {label}
                        </span>
                     ))}
                  </div>

               </motion.div>
            </div>

            {/* RIGHT COLUMN: 50% 3D Device & Dashboard Layout + Social Proof */}
            <div className="w-full lg:w-[52%] xl:w-[54%] relative z-10 flex flex-col items-center justify-center mt-6 lg:mt-0">

               <div className="relative w-full mx-auto py-0.5 sm:py-1">

                  {/* Ambient colour glow behind the device */}
                  <div className="absolute -inset-8 -z-10 pointer-events-none">
                     <div className="absolute top-[5%] left-[8%] w-[55%] h-[65%] rounded-full bg-indigo-500/20 blur-3xl" />
                     <div className="absolute bottom-[5%] right-[4%] w-[50%] h-[60%] rounded-full bg-[#e20b27]/15 blur-3xl" />
                  </div>

                  {/* Stacked depth layers + ground shadow */}
                  <div className="absolute inset-x-6 sm:inset-x-10 -bottom-2.5 sm:-bottom-3 h-24 rounded-b-[2rem] bg-white/60 border border-white shadow-[0_8px_24px_-12px_rgba(26,16,83,0.25)] -z-10 pointer-events-none" />
                  <div className="absolute inset-x-14 sm:inset-x-20 -bottom-5 sm:-bottom-6 h-24 rounded-b-[2rem] bg-white/35 border border-white/70 -z-20 pointer-events-none" />
                  <div className="absolute left-[14%] right-[14%] -bottom-10 h-12 rounded-[100%] bg-[#1a1053]/25 blur-2xl -z-30 pointer-events-none" />

                  {/* Floating stat card: Backlinks (bottom-left edge) */}
                  <motion.div
                     animate={{ y: [0, -5, 0] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute left-[10%] -bottom-6 z-20 hidden md:flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white ring-1 ring-slate-900/5 shadow-[0_14px_30px_-10px_rgba(26,16,83,0.35)] pointer-events-none"
                  >
                     <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
                        <Link2 size={14} />
                     </div>
                     <div className="leading-tight">
                        <div className="text-[13px] font-extrabold text-[#1a1053]">5,000+</div>
                        <div className="text-[9.5px] font-medium text-slate-500">High-DA Backlinks</div>
                     </div>
                  </motion.div>

                  {/* Floating stat card: GMB (right edge) */}
                  <motion.div
                     animate={{ y: [0, 5, 0] }}
                     transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                     className="absolute -right-4 xl:-right-6 top-[30%] z-20 hidden md:flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-2xl bg-gradient-to-br from-[#1a1053] to-[#2b1f6f] text-white border border-white/10 shadow-[0_14px_30px_-10px_rgba(26,16,83,0.6)] pointer-events-none"
                  >
                     <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0">
                        <MapPin size={14} />
                     </div>
                     <div className="leading-tight">
                        <div className="text-[13px] font-extrabold flex items-center gap-1">
                           #1 Rank
                           <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <div className="text-[9.5px] font-medium text-slate-300">Google Maps 3-Pack</div>
                     </div>
                  </motion.div>

                  {/* Floating stat card: Reach (bottom edge) */}
                  <motion.div
                     animate={{ y: [0, -4, 0] }}
                     transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     className="absolute right-[16%] -bottom-6 z-20 hidden md:flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white ring-1 ring-slate-900/5 shadow-[0_14px_30px_-10px_rgba(26,16,83,0.35)] pointer-events-none"
                  >
                     <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff4d64] to-[#e20b27] text-white flex items-center justify-center shadow-sm shrink-0">
                        <Youtube size={14} />
                     </div>
                     <div className="leading-tight">
                        <div className="text-[13px] font-extrabold text-[#1a1053] flex items-center gap-1">
                           2.4M+
                           <span className="text-[9px] font-bold text-emerald-600 flex items-center"><TrendingUp size={9} />38%</span>
                        </div>
                        <div className="text-[9.5px] font-medium text-slate-500">Video Reach</div>
                     </div>
                  </motion.div>

                  {/* Device: gradient hairline edge → glass bezel → screen */}
                  <motion.div
                     initial={{ opacity: 0, y: 24, rotateX: 6 }}
                     animate={{ opacity: 1, y: 0, rotateX: 0 }}
                     transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                     style={{ transformPerspective: 1800 }}
                     className="relative w-full rounded-[2rem] p-px bg-gradient-to-br from-indigo-300/90 via-white to-rose-300/80 shadow-[0_40px_90px_-30px_rgba(26,16,83,0.45),0_12px_30px_-12px_rgba(26,16,83,0.18)]"
                  >
                     <div className="relative rounded-[calc(2rem-1px)] bg-gradient-to-b from-white/95 to-slate-50/90 backdrop-blur-xl p-1.5 sm:p-2">
                        {/* Glass highlight along the top edge */}
                        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
                        {/* Server-rendered so its space is reserved from the first paint (no layout jump on hydration). */}
                        <div className="relative w-full rounded-[1.6rem] overflow-hidden shadow-[0_2px_10px_-2px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.06]">
                           <HeroDashboard data={dashboard} />
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* Dual High-Impact Trust & Verification Cards */}
               <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-[620px]"
               >
                  {/* Card 1: Doctor Trust & Star Rating */}
                  <div className="flex items-center gap-2.5 p-2.5 px-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_4px_14px_rgba(26,16,83,0.04)] hover:shadow-md transition-all">
                     <div className="flex -space-x-2 shrink-0">
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[9px] font-medium shadow-sm">Dr</div>
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white text-[9px] font-medium shadow-sm">MD</div>
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-[#1a1053] text-[#e20b27] flex items-center justify-center text-[8px] font-medium shadow-sm">+97</div>
                     </div>
                     <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-amber-400">
                           {[...Array(5)].map((_, i) => (
                              <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                           ))}
                           <span className="text-[10px] font-semibold text-slate-800 ml-1">4.9/5 Rating</span>
                        </div>
                        <span className="text-[10px] font-light text-slate-500">Trusted by 100+ Brands</span>
                     </div>
                  </div>

                  {/* Card 2: Verified Healthcare Growth Guarantee */}
                  <div className="flex items-center gap-2.5 p-2.5 px-3.5 rounded-2xl bg-gradient-to-br from-[#1a1053] to-[#2b1f6f] text-white shadow-[0_4px_14px_rgba(26,16,83,0.1)] border border-[#382f7c]">
                     <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-[#e20b27] shrink-0 border border-white/10">
                        <ShieldCheck size={16} className="text-[#e20b27]" />
                     </div>
                     <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                           <span className="text-[11px] font-semibold tracking-wide text-white">Verified ROI Results</span>
                           <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <span className="text-[9px] text-slate-300 font-light">Data-Driven Patient Inquiries</span>
                     </div>
                  </div>
               </motion.div>

            </div>

         </div>
      </section>
   );
}
