"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-8 bg-[#f8fafc] overflow-hidden flex items-center">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-gradient-to-b from-blue-100/50 to-transparent rounded-full blur-[80px] -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gradient-to-t from-purple-100/50 to-transparent rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 px-2 sm:px-4 lg:px-6">

        {/* Top: Typography */}
        <div className=" mx-auto mb-6 lg:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
          >
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-3.5">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-xs font-semibold text-[#1a1053] tracking-wide">
                  Codigix Infotech · Healthcare Growth Agency
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] tracking-tight leading-[1.15]">
                Specialized Healthcare <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                  Digital Practice Growth
                </span>
              </h1>
            </div>

            <div className="max-w-[400px] lg:pb-2">
              <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed">
                We empower doctors, clinics, and hospitals to build patient trust through Medical SEO, Google Maps 3-Pack, Authority Backlinks, and targeted patient education.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom: Editorial / Bento Layout */}
        <div className="  mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

            {/* Animated Infographic Block (Spans 8 cols) */}
            <motion.div
              className="lg:col-span-8 relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white border border-slate-100 h-[380px] lg:h-[450px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-[#f8fafc] flex items-center justify-center overflow-hidden">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>

                {/* Central Core (Healthcare Brand) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative w-28 h-28 lg:w-36 lg:h-36">
                    <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-blue-300 rounded-full blur-2xl"></motion.div>
                    <div className="absolute inset-0 bg-white rounded-full shadow-[0_10px_30px_rgba(59,130,246,0.1)] border-2 border-blue-100 flex items-center justify-center flex-col z-10">
                      {/* Medical Cross / Brand Icon */}
                      <svg className="w-8 h-8 lg:w-10 lg:h-10 text-blue-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">Brand</span>
                    </div>
                  </div>
                </div>

                {/* Top Left: SEO */}
                <motion.div animate={{ transform: ["translate(0px, -4px)", "translate(0px, 4px)", "translate(0px, -4px)"] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[5%] lg:top-[20%] lg:left-[15%] z-20">
                  <div className="bg-white/80 backdrop-blur-md px-3 py-2.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100/50 flex items-center gap-2.5 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-blue-50/50 flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-[13px] sm:text-sm font-semibold text-[#1a1053] whitespace-nowrap">SEO</p>
                      <p className="hidden sm:block text-xs text-slate-400 font-light">Organic Ranks</p>
                    </div>
                  </div>
                </motion.div>

                {/* Top Right: GMB & Maps */}
                <motion.div animate={{ transform: ["translate(0px, 4px)", "translate(0px, -4px)", "translate(0px, 4px)"] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] right-[5%] lg:top-[20%] lg:right-[15%] z-20">
                  <div className="bg-white/80 backdrop-blur-md px-3 py-2.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100/50 flex items-center gap-2.5 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-purple-50/50 flex items-center justify-center text-purple-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-[13px] sm:text-sm font-semibold text-[#1a1053] whitespace-nowrap">GMB Maps</p>
                      <p className="hidden sm:block text-xs text-slate-400 font-light">#1 Local Pack</p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Left: Social (Insta/Meta) */}
                <motion.div animate={{ transform: ["translate(0px, -5px)", "translate(0px, 5px)", "translate(0px, -5px)"] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[15%] left-[5%] lg:bottom-[20%] lg:left-[15%] z-20">
                  <div className="bg-white/80 backdrop-blur-md px-3 py-2.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100/50 flex items-center gap-2.5 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-pink-50/50 flex items-center justify-center text-pink-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
                    </div>
                    <div>
                      <p className="text-[13px] sm:text-sm font-semibold text-[#1a1053] whitespace-nowrap">Social & Meta</p>
                      <p className="hidden sm:block text-xs text-slate-400 font-light">Community Reach</p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Right: High-DA Backlinks */}
                <motion.div animate={{ transform: ["translate(0px, 5px)", "translate(0px, -5px)", "translate(0px, 5px)"] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[15%] right-[5%] lg:bottom-[20%] lg:right-[15%] z-20">
                  <div className="bg-white/80 backdrop-blur-md px-3 py-2.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100/50 flex items-center gap-2.5 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-emerald-50/50 flex items-center justify-center text-emerald-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                    </div>
                    <div>
                      <p className="text-[13px] sm:text-sm font-semibold text-[#1a1053] whitespace-nowrap">Backlinks</p>
                      <p className="hidden sm:block text-xs text-slate-400 font-light">High Authority PR</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Card (Spans 4 cols, overlaps upwards) */}
            <motion.div
              className="lg:col-span-4 relative z-20 lg:-ml-16 lg:mb-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_20px_50px_rgba(26,16,83,0.08)] border border-slate-100 relative overflow-hidden group">
                {/* Top border accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                {/* Decorative accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100/50 transition-colors duration-500"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 shrink-0">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <h3 className="text-xl lg:text-[22px] font-semibold text-[#1a1053] leading-snug">Dedicated to <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] font-extrabold">Healthcare Growth</span></h3>
                  </div>

                  <div className="mb-8 flex-grow">
                    <p className="text-slate-600 text-sm lg:text-[15px] font-light leading-relaxed mb-5">
                      We are a Pune-based agency with a dedicated focus on the healthcare sector. We help medical brands build a powerful online presence that patients trust.
                    </p>
                    
                    <ul className="space-y-3">
                      {[
                        "Medical SEO & Google Maps",
                        "High-DA Healthcare Backlinks",
                        "Patient-Focused Social Media"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 text-sm lg:text-[15px] font-medium">
                          <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trust indicator badge */}
                  <div className="mt-auto bg-gradient-to-r from-slate-50 to-white rounded-2xl p-4 lg:p-5 flex items-center justify-between border border-slate-200/80 shadow-sm group-hover:border-blue-200 transition-colors duration-300">
                    <div className="flex -space-x-2.5">
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-[11px] font-bold text-blue-800 shadow-sm relative z-30">Dr</div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-[11px] font-bold text-purple-800 shadow-sm relative z-20">H</div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-800 shadow-sm relative z-10">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base lg:text-lg font-extrabold text-[#1a1053] tracking-tight">100+ Clinics</div>
                      <div className="text-[10px] lg:text-[11px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 uppercase tracking-widest mt-0.5">Trusted Us</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
