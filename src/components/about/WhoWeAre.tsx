"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function WhoWeAre() {
  const [activeCard, setActiveCard] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 px-2 sm:px-4 lg:px-6">

        <div className=" mx-auto flex items-center min-h-[600px] relative">

          <style>{`
            @keyframes orbit {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes counter-orbit {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            .anim-orbit { animation: orbit 45s linear infinite; }
            .anim-counter { animation: counter-orbit 45s linear infinite; }
            .anim-orbit-fast { animation: orbit 30s linear infinite; }
            .anim-counter-fast { animation: counter-orbit 30s linear infinite; }
          `}</style>

          {/* Background Typography Watermark */}
          <div className="absolute top-1/2 left-0 -translate-x-1/4 -translate-y-1/2 text-[12rem] font-black text-slate-50/50 pointer-events-none select-none tracking-tighter z-0 hidden lg:block">
            CODIGIX
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">

            {/* Left Side Content Node */}
            <motion.div
              initial={{ opacity: 0, transform: "translate(-30px, 0px)" }}
              whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 w-full bg-white/60 backdrop-blur-3xl p-8 lg:p-12 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.9)] overflow-hidden"
            >
              {/* Subtle ambient glow inside the card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-3.5">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-xs font-semibold text-[#1a1053] tracking-wide">
                  Who We Are · Healthcare Specialists
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] tracking-tight leading-[1.15] mb-4">
                Empowering Medical Brands with <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                  Organic Patient Growth
                </span>
              </h2>

              <div className="text-slate-600 text-sm sm:text-base font-light leading-relaxed mb-8 space-y-3.5">
                <p>
                  We are Codigix Infotech Pvt Ltd — a Pune-based digital marketing agency with an exclusive focus on the healthcare sector. From multi-speciality hospitals to private dental, hair transplant, IVF, and dermatology clinics, we build authoritative organic visibility that patients trust.
                </p>
                <p>
                  Our expertise centers on Healthcare SEO, GMB Google Maps ranking, High-DA Backlinks & Citations, and active patient education on Instagram, Meta, and YouTube.
                </p>
              </div>

              {/* Redesigned Stats Block */}
              <div className="flex flex-wrap items-center gap-6 p-5 bg-white/40 border border-white/60 rounded-3xl shadow-sm backdrop-blur-md">
                <div className="flex-1 min-w-[120px]">
                  <div className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#1a1053] to-[#3a2885] mb-1.5">100+</div>
                  <div className="text-[9px] font-medium tracking-widest text-slate-500 uppercase">Clinics Scaled</div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-300 to-transparent hidden sm:block"></div>
                <div className="flex-1 min-w-[120px]">
                  <div className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 mb-1.5">#1</div>
                  <div className="text-[9px] font-medium tracking-widest text-slate-500 uppercase">Google Maps & SEO</div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Premium Bento Grid */}
            <div className="hidden lg:grid grid-cols-3 grid-rows-3 gap-4 w-full h-[600px] relative z-10 perspective-1000">

              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent blur-3xl opacity-60 pointer-events-none -z-10"></div>

              {/* 1. Tall Card: Local SEO */}
              <div
                onMouseEnter={() => setActiveCard(1)}
                className="col-span-1 row-span-2 bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_30px_50px_-15px_rgba(59,130,246,0.15)] relative overflow-hidden cursor-default"
              >
                {/* Animated Border */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[2rem] z-20 opacity-100 transition-opacity duration-500" style={{ padding: '1px' }}>
                  <defs>
                    <linearGradient id="grad-bento-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <motion.rect x="0" y="0" width="100%" height="100%" rx="31" ry="31" fill="none" stroke="url(#grad-bento-1)" strokeWidth="2.5" strokeDasharray="2000" animate={{ strokeDashoffset: activeCard > 1 ? 0 : activeCard === 1 ? [2000, 0] : 2000 }} transition={{ duration: 2.5, ease: "linear" }} />
                </svg>

                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 flex items-center justify-center text-emerald-500 mb-4 shadow-inner border border-emerald-100">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-emerald-600 uppercase tracking-widest mb-1">Visibility</div>
                  <div className="text-lg font-semibold text-[#1a1053] leading-tight mb-2">Local GMB Maps</div>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">Dominate local 3-pack map rankings and attract nearby patients ready to book appointments.</p>
                </div>
              </div>

              {/* 2. Wide Card: High-DA Backlinks */}
              <div
                onMouseEnter={() => setActiveCard(2)}
                className="col-span-2 row-span-1 bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex items-center gap-6 group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_30px_50px_-15px_rgba(99,102,241,0.15)] relative overflow-hidden cursor-default"
              >
                {/* Animated Border */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[2rem] z-20 opacity-100 transition-opacity duration-500" style={{ padding: '1px' }}>
                  <defs>
                    <linearGradient id="grad-bento-2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <motion.rect x="0" y="0" width="100%" height="100%" rx="31" ry="31" fill="none" stroke="url(#grad-bento-2)" strokeWidth="2.5" strokeDasharray="2000" animate={{ strokeDashoffset: activeCard > 2 ? 0 : activeCard === 2 ? [2000, 0] : 2000 }} transition={{ duration: 2.5, ease: "linear" }} />
                </svg>

                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 flex items-center justify-center text-indigo-500 shadow-inner border border-indigo-100 shrink-0">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-indigo-600 uppercase tracking-widest mb-1">Domain Authority</div>
                  <div className="text-xl font-semibold text-[#1a1053] leading-tight mb-1">High-DA Backlinks</div>
                  <p className="text-xs text-slate-500 font-light">High-authority medical citations and digital PR that elevate your site to page 1 rankings.</p>
                </div>
              </div>

              {/* 3. Standard Card: Social Media */}
              <div
                onMouseEnter={() => setActiveCard(3)}
                className="col-span-1 row-span-1 bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-center items-center text-center group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_30px_50px_-15px_rgba(249,115,22,0.15)] relative overflow-hidden cursor-default"
              >
                {/* Animated Border */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[2rem] z-20 opacity-100 transition-opacity duration-500" style={{ padding: '1px' }}>
                  <defs>
                    <linearGradient id="grad-bento-3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <motion.rect x="0" y="0" width="100%" height="100%" rx="31" ry="31" fill="none" stroke="url(#grad-bento-3)" strokeWidth="2.5" strokeDasharray="1500" animate={{ strokeDashoffset: activeCard > 3 ? 0 : activeCard === 3 ? [1500, 0] : 1500 }} transition={{ duration: 2.5, ease: "linear" }} />
                </svg>

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 flex items-center justify-center text-orange-500 mb-3 shadow-inner border border-orange-100 relative z-10">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                </div>
                <div className="text-[9px] font-semibold text-orange-600 uppercase tracking-widest mb-0.5">Insta & Meta</div>
                <div className="text-sm font-semibold text-[#1a1053]">Social Branding</div>
              </div>

              {/* 4. Standard Card: YouTube Content */}
              <div
                onMouseEnter={() => setActiveCard(4)}
                className="col-span-1 row-span-1 bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-center items-center text-center group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_30px_50px_-15px_rgba(236,72,153,0.15)] relative overflow-hidden cursor-default"
              >
                {/* Animated Border */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[2rem] z-20 opacity-100 transition-opacity duration-500" style={{ padding: '1px' }}>
                  <defs>
                    <linearGradient id="grad-bento-4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <motion.rect x="0" y="0" width="100%" height="100%" rx="31" ry="31" fill="none" stroke="url(#grad-bento-4)" strokeWidth="2.5" strokeDasharray="1500" animate={{ strokeDashoffset: activeCard > 4 ? 0 : activeCard === 4 ? [1500, 0] : 1500 }} transition={{ duration: 2.5, ease: "linear" }} />
                </svg>

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100/50 flex items-center justify-center text-pink-500 mb-3 shadow-inner border border-pink-100 relative z-10">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <div className="text-[9px] font-semibold text-pink-600 uppercase tracking-widest mb-0.5">Education</div>
                <div className="text-sm font-semibold text-[#1a1053]">YouTube Growth</div>
              </div>

              {/* 5. Wide Card: Web Dev */}
              <div
                onMouseEnter={() => setActiveCard(5)}
                className="col-span-2 row-span-1 bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex items-center gap-6 group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_30px_50px_-15px_rgba(168,85,247,0.15)] relative overflow-hidden cursor-default"
              >
                {/* Animated Border */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[2rem] z-20 opacity-100 transition-opacity duration-500" style={{ padding: '1px' }}>
                  <defs>
                    <linearGradient id="grad-bento-5" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <motion.rect x="0" y="0" width="100%" height="100%" rx="31" ry="31" fill="none" stroke="url(#grad-bento-5)" strokeWidth="2.5" strokeDasharray="2000" animate={{ strokeDashoffset: activeCard > 5 ? 0 : activeCard === 5 ? [2000, 0] : 2000 }} transition={{ duration: 2.5, ease: "linear" }} />
                </svg>

                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 flex items-center justify-center text-purple-500 shadow-inner border border-purple-100 shrink-0">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-purple-600 uppercase tracking-widest mb-1">Platform</div>
                  <div className="text-xl font-semibold text-[#1a1053] leading-tight mb-1">Web Development</div>
                  <p className="text-xs text-slate-500 font-light">Lightning-fast, high-converting medical websites built for the modern patient.</p>
                </div>
              </div>

              {/* 6. Standard Card: Healthcare SEO */}
              <div
                onMouseEnter={() => setActiveCard(6)}
                className="col-span-1 row-span-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[2rem] p-5 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)] flex flex-col justify-center items-center text-center group hover:-translate-y-2 transition-all duration-500 cursor-default relative overflow-hidden"
              >
                {/* Animated Border */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[2rem] z-20 opacity-100 transition-opacity duration-500" style={{ padding: '1px' }}>
                  <defs>
                    <linearGradient id="grad-bento-6" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#93c5fd" />
                    </linearGradient>
                  </defs>
                  <motion.rect x="0" y="0" width="100%" height="100%" rx="31" ry="31" fill="none" stroke="url(#grad-bento-6)" strokeWidth="2.5" strokeDasharray="1500" animate={{ strokeDashoffset: activeCard > 6 ? 0 : activeCard === 6 ? [1500, 0] : 1500 }} transition={{ duration: 2.5, ease: "linear" }} />
                </svg>

                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white mb-3 backdrop-blur-md border border-white/30 relative z-10">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div className="text-[9px] font-semibold text-blue-200 uppercase tracking-widest mb-0.5">Top Rankings</div>
                <div className="text-sm font-semibold text-white">Healthcare SEO</div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
