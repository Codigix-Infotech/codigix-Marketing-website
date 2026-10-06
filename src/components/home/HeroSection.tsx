"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Users, Trophy, Smile, TrendingUp, BarChart2, Target, Search, Bell, Calendar, ChevronDown, Star, Heart, FileText, Rocket, Monitor, Megaphone, Edit, Lightbulb, Briefcase, Factory, Plus, ShoppingCart, GraduationCap, Utensils, Home, PlayCircle, Handshake, CheckCircle, Share2, Globe, ShieldCheck, MapPin, Youtube, Instagram, Link2 } from 'lucide-react';
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
      <section className="relative w-full pt-24 pb-12 lg:pt-28 lg:pb-12 overflow-hidden bg-gradient-to-br from-white via-[#f8fafe] to-[#eef2f9] flex items-center font-sans px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">

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

         <div className="w-full  mx-auto px-2 sm:px-4 lg:px-6 relative z-20 flex flex-col lg:flex-row items-center justify-between">

            {/* LEFT COLUMN: 50% Hero Content */}
            <div className="flex flex-col items-start text-left w-full lg:w-[48%] xl:w-[46%] shrink-0 z-20 lg:pr-6">
               <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col w-full">

                  {/* Top Live Badge */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white shadow-[0_2px_12px_rgba(26,16,83,0.06)] border border-slate-200/80 mb-4 hover:border-[#e20b27]/40 transition-all cursor-default w-fit">
                     <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e20b27] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e20b27]"></span>
                     </span>
                     <span className="text-xs font-semibold text-[#1a1053] tracking-wider uppercase">
                        Healthcare Digital Marketing & Patient Acquisition Agency
                     </span>
                  </div>

                  {/* Marketing Channels Managed Strip */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-5">
                     <span className="px-2.5 py-1 rounded-lg bg-emerald-50/90 text-emerald-700 text-[10px] font-medium border border-emerald-200/60 flex items-center gap-1">
                        <TrendingUp size={11} className="text-emerald-600" /> SEO
                     </span>
                     <span className="px-2.5 py-1 rounded-lg bg-blue-50/90 text-blue-700 text-[10px] font-medium border border-blue-200/60 flex items-center gap-1">
                        <MapPin size={11} className="text-blue-600" /> GMB & Google Maps
                     </span>
                     <span className="px-2.5 py-1 rounded-lg bg-purple-50/90 text-purple-700 text-[10px] font-medium border border-purple-200/60 flex items-center gap-1">
                        <Link2 size={11} className="text-purple-600" /> High-DA Backlinks
                     </span>
                     <span className="px-2.5 py-1 rounded-lg bg-pink-50/90 text-pink-700 text-[10px] font-medium border border-pink-200/60 flex items-center gap-1">
                        <Instagram size={11} className="text-pink-600" /> Instagram & Meta
                     </span>
                     <span className="px-2.5 py-1 rounded-lg bg-rose-50/90 text-[#e20b27] text-[10px] font-medium border border-rose-200/60 flex items-center gap-1">
                        <Youtube size={11} className="text-[#e20b27]" /> YouTube
                     </span>
                  </div>

                  {/* Main Headline with Animated Categories - Stable Height & No Layout Jump */}
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.8rem] font-semibold leading-[1.14] text-[#1a1053] tracking-tight mb-4">
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
                     Codigix Infotech is Pune’s premier healthcare growth agency — empowering hospitals, clinics, and specialists with dominant SEO rankings, top GMB Google Maps visibility, high-authority backlinks, and engaging Instagram, Meta & YouTube content.
                  </p>

                  {/* Digital Marketing Strategic Highlights */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-8 w-full max-w-lg text-xs font-light text-[#1a1053]">
                     <div className="flex items-center gap-2 bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-200/60 font-medium">
                        <div className="w-4 h-4 rounded-full bg-rose-50 text-[#e20b27] flex items-center justify-center">
                           <CheckCircle size={13} className="text-[#e20b27]" />
                        </div>
                        <span>#1 Local GMB 3-Pack Maps</span>
                     </div>
                     <div className="flex items-center gap-2 bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-200/60 font-medium">
                        <div className="w-4 h-4 rounded-full bg-rose-50 text-[#e20b27] flex items-center justify-center">
                           <CheckCircle size={13} className="text-[#e20b27]" />
                        </div>
                        <span>Healthcare SEO & Top Ranks</span>
                     </div>
                     <div className="flex items-center gap-2 bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-200/60 font-medium">
                        <div className="w-4 h-4 rounded-full bg-rose-50 text-[#e20b27] flex items-center justify-center">
                           <CheckCircle size={13} className="text-[#e20b27]" />
                        </div>
                        <span>High-DA Backlinks & PR</span>
                     </div>
                     <div className="flex items-center gap-2 bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-200/60 font-medium">
                        <div className="w-4 h-4 rounded-full bg-rose-50 text-[#e20b27] flex items-center justify-center">
                           <CheckCircle size={13} className="text-[#e20b27]" />
                        </div>
                        <span>Insta, Meta & YouTube Reach</span>
                     </div>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                     <a
                        href="https://codigix.co/about-us/"
                        className="group inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto bg-[#1a1053] hover:bg-[#26186b] text-white rounded-full font-medium text-[15px] shadow-[0_10px_25px_rgba(26,16,83,0.25)] hover:shadow-[0_14px_35px_rgba(26,16,83,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                     >
                        <span>Discover More About Us</span>
                        <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-[#e20b27] group-hover:text-white transition-colors duration-300">
                           <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                     </a>

                     <button className="group inline-flex items-center justify-center gap-3 px-7 py-4 w-full sm:w-auto bg-white/95 hover:bg-white text-[#1a1053] border border-slate-200/90 rounded-full font-medium text-[15px] shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300">
                        <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center text-[#e20b27] group-hover:bg-[#e20b27] group-hover:text-white transition-colors duration-300">
                           <PlayCircle size={16} className="fill-current" />
                        </div>
                        <span>Watch Video</span>
                     </button>
                  </div>

               </motion.div>
            </div>

            {/* RIGHT COLUMN: 50% 3D Device & Dashboard Layout + Social Proof */}
            <div className="w-full lg:w-[52%] xl:w-[54%] relative z-10 flex flex-col items-center justify-center mt-6 lg:mt-0">

               <div className="relative w-full mx-auto perspective-[1800px] py-0.5 sm:py-1">

                  {/* Ambient Glow Aura */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-[#1a1053]/15 via-[#e20b27]/10 to-indigo-500/15 rounded-[2.5rem] blur-xl -z-10 pointer-events-none" />

                  {/* Top-Left Floating SEO Badge - Ultra-Compact Micro-Pill */}
                  <motion.div
                     animate={{ transform: ["translate(0px, -1.5px)", "translate(0px, 1.5px)", "translate(0px, -1.5px)"] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -top-2 left-3 sm:left-5 z-20 hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full border border-slate-200/90 shadow-xs pointer-events-none"
                  >
                     <Link2 size={10} className="text-purple-600 shrink-0" />
                     <span className="text-[8.5px] font-bold text-[#1a1053]">5,000+ Backlinks</span>
                     <span className="flex h-1 w-1 rounded-full bg-emerald-500" />
                  </motion.div>

                  {/* Top-Right Floating GMB Badge - Ultra-Compact Micro-Pill */}
                  <motion.div
                     animate={{ transform: ["translate(0px, 1.5px)", "translate(0px, -1.5px)", "translate(0px, 1.5px)"] }}
                     transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                     className="absolute -top-2 right-3 sm:right-5 z-20 hidden sm:flex items-center gap-1 bg-[#1a1053] text-white px-2 py-0.5 rounded-full shadow-xs border border-white/15 pointer-events-none"
                  >
                     <MapPin size={9} className="text-emerald-400 shrink-0" />
                     <span className="text-[8.5px] font-semibold tracking-wide">#1 GMB Maps</span>
                  </motion.div>

                  {/* Bottom-Right Floating Reach Badge - Ultra-Compact Micro-Pill */}
                  <motion.div
                     animate={{ transform: ["translate(0px, -1.5px)", "translate(0px, 1.5px)", "translate(0px, -1.5px)"] }}
                     transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     className="absolute -bottom-2 right-3 sm:right-5 z-20 hidden sm:flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full border border-slate-200/90 shadow-xs pointer-events-none"
                  >
                     <Youtube size={10} className="text-[#e20b27] shrink-0" />
                     <span className="text-[8.5px] font-bold text-[#1a1053]">2.4M+ Reach</span>
                  </motion.div>

                  {/* Server-rendered so its space is reserved from the first paint (no layout jump on hydration). */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.7, ease: "easeOut" }}
                     className="relative w-full bg-gradient-to-b from-white via-white to-slate-50/90 rounded-[2rem] p-1.5 sm:p-2 shadow-[0_25px_70px_-15px_rgba(26,16,83,0.16)] border border-slate-200/90 ring-1 ring-slate-900/5"
                  >
                     {/* Device Screen Frame */}
                     <div className="relative w-full rounded-[1.6rem] overflow-hidden border border-slate-200/80 bg-white">
                        <HeroDashboard data={dashboard} />
                     </div>
                  </motion.div>
               </div>

               {/* Dual High-Impact Trust & Verification Cards */}
               <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-[620px]"
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
