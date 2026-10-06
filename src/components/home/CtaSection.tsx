"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CtaSection() {

  // Clean Line-Art Rocket Illustration matching reference image
  const CleanRocket = () => (
    <div className="w-full h-[400px] flex items-center justify-center relative">
      <motion.div
        animate={{ transform: ["translate(0px, 0px)", "translate(0px, -10px)", "translate(0px, 0px)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-40 h-40 bg-white rounded-t-full rounded-bl-full rounded-br-sm rotate-45 flex items-center justify-center border-[6px] border-[#1e1b4b]"
      >
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-[6px] border-[#1e1b4b]">
          <div className="w-6 h-6 bg-[#1e1b4b] rounded-full" />
        </div>

        {/* Fins */}
        <div className="absolute bottom-0 right-full w-12 h-16 bg-white rounded-tl-full rounded-bl-sm border-[6px] border-r-0 border-[#1e1b4b]" />
        <div className="absolute top-full left-0 w-16 h-12 bg-white rounded-br-full rounded-tr-sm border-[6px] border-t-0 border-[#1e1b4b]" />

        {/* Flame Line Art */}
        <div className="absolute top-full right-full w-12 h-12 flex -mt-2 -mr-2 rotate-45">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
      </motion.div>

      {/* Cloud/Speed lines */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-10 left-10"
      >
        <svg width="100" height="40" viewBox="0 0 100 40" fill="none" stroke="#1e1b4b" strokeWidth="4" strokeLinecap="round">
          <path d="M10 20h20M40 20h40M30 30h30M20 10h50" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-1/4 -rotate-12"
      >
        <div className="text-2xl font-serif italic text-primary-text mb-1">Higher</div>
        <div className="text-2xl font-serif italic text-primary-text mb-1">Goals</div>
        <div className="text-2xl font-serif italic text-primary-text mb-1">Brighter</div>
        <div className="text-2xl font-serif italic text-primary-text relative">
          Tomorrow
          <svg className="absolute -bottom-4 left-0 w-full text-highlight" viewBox="0 0 100 20">
            <path d="M0 10 Q 50 20 100 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M90 0 L100 0 L100 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 overflow-hidden bg-white border-t border-slate-100">

      {/* Background Animated Grid for the Section */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#1a1053 1px, transparent 1px), linear-gradient(90deg, #1a1053 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* "Banner-like" Floating Geometric Elements */}
      <motion.div
        animate={{ transform: ["rotate(0deg)", "rotate(360deg)"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-[5%] right-[-5%] w-[700px] h-[700px] border border-dashed border-blue-600/20 rounded-full z-0 pointer-events-none hidden lg:block"
      />
      <motion.div
        animate={{ transform: ["rotate(0deg)", "rotate(-360deg)"] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] left-[-10%] w-[900px] h-[900px] border border-solid border-purple-600/10 rounded-full z-0 pointer-events-none hidden lg:block"
      />

      {/* Floating Ambient Light Orbs */}
      <motion.div
        animate={{ transform: ["translate(-30px, -30px)", "translate(30px, 30px)", "translate(-30px, -30px)"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-highlight/10 rounded-full blur-[150px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ transform: ["translate(30px, 30px)", "translate(-30px, -30px)", "translate(30px, 30px)"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"
      />

      <div className=" mx-auto px-4 lg:px-8  relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center bg-white rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 lg:p-16 shadow-[0_20px_60px_rgba(26,16,83,0.05)] border border-slate-100 relative overflow-hidden">

          {/* Card Inner Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#1a1053 1px, transparent 1px), linear-gradient(90deg, #1a1053 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-100/40 via-transparent to-transparent rounded-full opacity-60 pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-rose-100/40 via-transparent to-transparent rounded-full opacity-60 pointer-events-none transform -translate-x-1/4 translate-y-1/4" />

          {/* Abstract circles */}
          <div className="absolute top-[10%] left-[45%] w-[100px] h-[100px] rounded-full border border-slate-200 opacity-50" />
          <div className="absolute bottom-[20%] right-[40%] w-[150px] h-[150px] rounded-full border border-slate-200 opacity-30" />

          {/* Left Content */}
          <div className="flex flex-col relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-[#1a1053] tracking-wide mb-3.5 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Let's Build What's Next</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] leading-[1.15] tracking-tight mb-4">
              Ready to Grow <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Your Healthcare Practice?
              </span>
            </h2>
            <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed max-w-md mb-8">
              Schedule a strategic consultation to see how our SEO, Google Maps, and patient acquisition systems can scale your clinic.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1053] hover:bg-[#25186f] text-white rounded-full font-medium text-sm transition-all shadow-[0_8px_20px_rgba(26,16,83,0.18)] hover:-translate-y-0.5">
                <span>Get a Free Consultation</span>
                <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="text-sm font-medium text-[#1a1053] hover:text-[#e20b27] transition-colors">
                Talk to Our Strategist →
              </Link>
            </div>
          </div>

          {/* Right Content - Illustration */}
          {/* Decorative illustration: tablet and up only (it needs ~400px of width) */}
          <div className="relative hidden sm:block">
            <CleanRocket />
          </div>

        </div>
      </div>
    </section>
  );
}
