"use client";

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="py-16 bg-gradient-to-br from-primary-bg via-[#f8fafe] to-[#eef2f9] relative overflow-hidden">

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#1a1053 1px, transparent 1px), linear-gradient(90deg, #1a1053 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Animated Ambient Light Orbs */}
      <motion.div
        animate={{ transform: ["translate(-30px, -30px)", "translate(30px, 30px)", "translate(-30px, -30px)"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-accent/10 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ transform: ["translate(30px, 30px)", "translate(-30px, -30px)", "translate(30px, 30px)"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-highlight/10 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Floating Geometric Elements (Digital Marketing / Tech vibe) */}
      <motion.div
        animate={{ transform: ["rotate(0deg)", "rotate(360deg)"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] right-[15%] w-[400px] h-[400px] border-[1.5px] border-dashed border-primary-accent/20 rounded-full z-0 pointer-events-none hidden lg:block"
      />
      <motion.div
        animate={{ transform: ["rotate(0deg)", "rotate(-360deg)"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] border-[1px] border-highlight/20 rounded-full z-0 pointer-events-none hidden lg:block"
      />

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        <motion.div
          initial={{ opacity: 0, transform: "translate(-50px, 0px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-accent/10 border border-primary-accent/20 w-fit text-xs font-semibold text-primary-accent uppercase tracking-wider">
            Healthcare Authority
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-primary-text leading-tight tracking-tight">
            Specialized Healthcare Marketing <br />
            <span className="text-gradient">by Codigix Infotech</span>
          </h2>
          <p className="text-base md:text-lg text-secondary-text font-light leading-relaxed text-balance">
            We are Codigix Infotech Pvt Ltd — Pune's dedicated healthcare growth agency. From multi-speciality hospitals to private dental, hair transplant, IVF, and aesthetic clinics, we build organic authority, Google Maps supremacy, and engaging social content that patients trust.
          </p>
          <ul className="flex flex-col gap-3.5 mt-2">
            {[
              'Proven Healthcare SEO & Keyword Domination',
              'GMB Google Maps #1 Local 3-Pack Ranking',
              'High-DA Healthcare Backlinks & Doctor Citations',
              'Instagram, Meta & YouTube Patient Content'
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-primary-text text-sm md:text-base font-normal">
                <CheckCircle2 className="text-primary-accent shrink-0" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div style={{ y }} className="relative h-[500px] rounded-3xl overflow-hidden glass border border-slate-200 group shadow-lg">
          {/* Skeleton Layer */}
          <motion.div
            className="absolute inset-0 bg-white/90 p-8 flex flex-col gap-4 z-20 pointer-events-none"
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-1/3 h-8 bg-slate-200 rounded animate-pulse" />
            <div className="w-full h-32 bg-slate-100 rounded-xl animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full h-24 bg-slate-100 rounded-xl animate-pulse" />
              <div className="w-full h-24 bg-slate-100 rounded-xl animate-pulse" />
            </div>
            <div className="w-full h-2 bg-primary-accent/50 rounded animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
          </motion.div>

          {/* Real Image Layer */}
          <motion.img
            initial={{ filter: "grayscale(100%)", transform: "scale(1.2)" }}
            whileInView={{ filter: "grayscale(0%)", transform: "scale(1)" }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            src="/seo_growth_banner_light.jpg"
            alt="Healthcare SEO Growth & Rankings"
            className="w-full h-full object-cover relative z-10"
          />

          {/* Floating Glassmorphism Badges */}
          <motion.div
            initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-8 right-8 z-30 bg-white/85 backdrop-blur-md border border-white/50 shadow-xl rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="7.5 4.21 12 6.81 16.5 4.21" /><polyline points="7.5 19.79 7.5 14.6 3 12" /><polyline points="21 12 16.5 14.6 16.5 19.79" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
            </div>
            <div>
              <p className="text-xl font-semibold text-slate-800 leading-none">12.5k+</p>
              <p className="text-[11px] font-medium text-slate-500 mt-1">High-DA Backlinks</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, transform: "translate(-20px, 0px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-8 left-8 z-30 bg-white/85 backdrop-blur-md border border-white/50 shadow-xl rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
            <div>
              <p className="text-xl font-semibold text-slate-800 leading-none">#1 Rank</p>
              <p className="text-[11px] font-medium text-slate-500 mt-1">Organic SEO Growth</p>
            </div>
          </motion.div>

        </motion.div>
        
      </div >
    </section >
  );
}
