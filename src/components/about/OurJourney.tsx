"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Rocket, Eye, Heart, Target, Award, HeartHandshake, Building2, TrendingUp } from 'lucide-react';

const journeySteps = [
  {
    id: 1,
    title: "The Vision",
    headline: "Beyond Just Clicks",
    description: "Codigix Infotech Pvt. Ltd. began with a mission that went beyond clicks and rankings; we wanted to connect the right patients with the right doctors.",
    color: "#3b82f6", // blue
    icon: Rocket,
    gradient: "from-blue-600/10 via-blue-400/5 to-transparent"
  },
  {
    id: 2,
    title: "The Discovery",
    headline: "The Visibility Gap",
    description: "As we worked closely with healthcare professionals across India, we saw firsthand how talented doctors, thriving clinics, and even well-established hospitals were losing patients not because of their quality of care, but because they were invisible online.",
    color: "#6366f1", // indigo
    icon: Eye,
    gradient: "from-indigo-600/10 via-indigo-400/5 to-transparent"
  },
  {
    id: 3,
    title: "The Pivot",
    headline: "Dedicated to Healthcare",
    description: "That insight became our purpose. We dedicated ourselves entirely to the healthcare world—partnering with dental clinics, multi-specialty hospitals, cancer care centers, hair transplant specialists, general practitioners, and independent clinics to build the kind of digital presence that earns patient trust before they even walk through the door.",
    color: "#8b5cf6", // purple
    icon: Heart,
    gradient: "from-purple-600/10 via-purple-400/5 to-transparent"
  },
  {
    id: 4,
    title: "The Strategy",
    headline: "Precision Execution",
    description: "From dominating local Google searches and optimizing Google Business Profiles to running targeted patient acquisition campaigns and managing online reputations for both small clinics and large hospital networks, we crafted strategies built specifically for the sensitivities and standards of healthcare.",
    color: "#d946ef", // fuchsia
    icon: Target,
    gradient: "from-fuchsia-600/10 via-fuchsia-400/5 to-transparent"
  },
  {
    id: 5,
    title: "Today",
    headline: "India's Growth Ally",
    description: "Today, Codigix Infotech Pvt. Ltd. stands as India’s dedicated healthcare marketing partner—not just an agency, but a growth ally for every doctor, clinic, and hospital ready to make a greater impact in their community.",
    color: "#ec4899", // pink
    icon: Award,
    gradient: "from-pink-600/10 via-pink-400/5 to-transparent"
  }
];

export default function OurJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the 250vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out raw scroll with spring physics for butter-smooth animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001
  });

  const [[activeStep, direction], setStepTuple] = useState([0, 0]);

  // Update active step smoothly based on smooth progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      let newStep = 0;
      if (latest >= 0.95) newStep = 4;
      else if (latest >= 0.75) newStep = 3;
      else if (latest >= 0.50) newStep = 2;
      else if (latest >= 0.25) newStep = 1;

      setStepTuple((prev) => {
        if (prev[0] !== newStep) {
          return [newStep, newStep > prev[0] ? 1 : -1];
        }
        return prev;
      });
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const activeData = journeySteps[activeStep];
  const ActiveIcon = activeData.icon;

  // Staggered animation variants with fluid easing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    },
    exit: { opacity: 0, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] } }
  };

  const itemVariants = {
    hidden: (dir: number) => ({ opacity: 0, y: dir > 0 ? 12 : -12 }),
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Convert smooth scroll progress to width percentage (0-100%)

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-slate-50">
      {/* Subtle Global Background Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '48px 48px', opacity: 0.3 }}></div>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-20 pb-4 sm:py-8">

        <div className="container mx-auto px-4 relative z-10 px-2 sm:px-4 lg:px-6  flex flex-col h-full justify-center gap-4 sm:gap-6 lg:gap-8 py-2 sm:py-6">

          {/* Top Header */}
          <div className="text-center shrink-0">
            <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-3.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs font-semibold text-[#1a1053] tracking-wide">
                Our Journey · Healthcare Evolution
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] tracking-tight leading-[1.15]">
              Empowering Doctors With <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Predictable Practice Growth
              </span>
            </h2>

            <p className="hidden sm:block text-slate-600 font-light text-base sm:text-lg leading-relaxed mt-3 max-w-2xl mx-auto">
              Scroll through our roadmap to see how we transformed healthcare visibility across India.
            </p>
          </div>

          {/* Interactive Content Display Area */}
          <div className="w-full relative flex-1 flex items-center justify-center min-h-0 sm:min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeStep}
                custom={direction}
                initial={{ opacity: 0, y: direction > 0 ? 15 : -15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: direction > 0 ? -15 : 15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl border border-slate-100 p-5 sm:p-7 md:p-9 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(26,16,83,0.07)] overflow-hidden group"
              >
                {/* Subtle Colored Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 transition-colors duration-500" style={{ backgroundColor: activeData.color, opacity: 0.7 }}></div>

                {/* Huge Typography Watermark */}
                <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 text-[220px] font-black italic select-none pointer-events-none tracking-tighter leading-none z-0">
                  <span className="text-transparent transition-all duration-500" style={{ WebkitTextStroke: '2px #e2e8f0' }}>
                    0{activeData.id}
                  </span>
                </div>

                {/* Internal Staggered Content */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={direction}
                  className="relative z-10 w-full flex flex-col md:flex-row items-center gap-6 md:gap-10"
                >
                  {/* Icon Block */}
                  <motion.div variants={itemVariants} custom={direction} className="flex-shrink-0">
                    <div className="relative w-18 h-18 md:w-22 md:h-22 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                      <div className="w-18 h-18 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden shadow-sm transition-all duration-500" style={{ backgroundColor: `${activeData.color}0a`, border: `1px solid ${activeData.color}25` }}>
                        <ActiveIcon className="w-8 h-8 md:w-9 md:h-9 relative z-10 transition-colors duration-500" style={{ color: activeData.color }} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <div className="text-left flex-1 max-w-2xl">
                    <motion.div variants={itemVariants} custom={direction} className="flex items-center gap-4 mb-2.5">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500" style={{ color: activeData.color }}>
                        Phase 0{activeData.id}
                      </span>
                      <div className="h-px w-16 transition-colors duration-500" style={{ backgroundColor: `${activeData.color}30` }}></div>
                    </motion.div>

                    <motion.h3 variants={itemVariants} custom={direction} className="text-xl md:text-2xl font-bold text-[#1a1053] mb-3 leading-tight tracking-tight">
                      {activeData.headline}
                    </motion.h3>

                    <motion.p variants={itemVariants} custom={direction} className="text-slate-600 text-sm md:text-base leading-relaxed font-light">
                      {activeData.description}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>


          {/* Bottom Section: Left Stats + Center Roadmap + Right Stats */}
          <div className="w-full  mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 px-2 shrink-0">

            {/* Left Side Stats (2 Cards) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0 order-2 lg:order-1">
              {/* Stat 1: 96% Client Retention */}
              <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(26,16,83,0.04)] flex items-center gap-2.5 group hover:border-emerald-200 hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <HeartHandshake size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#1a1053] leading-none">96%</span>
                  <span className="text-[10px] font-medium text-slate-500 mt-0.5 whitespace-nowrap">Client Retention</span>
                </div>
              </div>

              {/* Stat 2: 50+ Healthcare Clients */}
              <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(26,16,83,0.04)] flex items-center gap-2.5 group hover:border-blue-200 hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <Building2 size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#1a1053] leading-none">50+</span>
                  <span className="text-[10px] font-medium text-slate-500 mt-0.5 whitespace-nowrap">Healthcare Clients</span>
                </div>
              </div>
            </div>

            {/* Center Scroll-Linked Roadmap Track */}
            <div className="relative flex-1 w-full max-w-2xl flex items-center px-6 md:px-10 h-16 shrink-0 order-1 lg:order-2">
              {/* Base Roadmap Track */}
              <div className="absolute left-6 right-6 md:left-10 md:right-10 h-1 bg-slate-200 rounded-full overflow-hidden" />

              {/* Animated Scroll-Linked Active Track */}
              <div className="absolute left-6 right-6 md:left-10 md:right-10 h-1 rounded-full z-0 overflow-hidden">
                {/* scaleX instead of width: follows the scroll without re-running layout every frame */}
                <motion.div
                  className="h-full w-full relative bg-blue-600 origin-left"
                  style={{ scaleX: smoothProgress }}
                />
              </div>

              {/* Interactive Roadmap Nodes */}
              <div className="absolute left-6 right-6 md:left-10 md:right-10 flex justify-between items-center z-10">
                {journeySteps.map((step, index) => {
                  const isActive = index <= activeStep;
                  const isCurrent = index === activeStep;

                  return (
                    <div key={step.id} className="relative flex flex-col items-center group">
                      {/* Floating Title (Above node) */}
                      <div
                        className="absolute -top-7 whitespace-nowrap text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                        style={{
                          color: isCurrent ? '#2563eb' : (isActive ? '#64748b' : '#cbd5e1'),
                          opacity: isActive ? 1 : 0.6
                        }}
                      >
                        {step.title}
                      </div>

                      {/* Node Circle */}
                      <div className="relative flex items-center justify-center">
                        <motion.div
                          className="w-4 h-4 md:w-5 md:h-5 rounded-full z-10 transition-colors duration-300 relative flex items-center justify-center bg-white shadow-xs"
                          style={{
                            border: isActive ? '2px solid #2563eb' : '2px solid #cbd5e1',
                          }}
                          animate={{ scale: isCurrent ? 1.25 : 1 }}
                        >
                          <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-blue-600' : 'bg-transparent'}`} />
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side Stats (2 Cards) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0 order-3">
              {/* Stat 3: 250+ Projects Completed */}
              <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(26,16,83,0.04)] flex items-center gap-2.5 group hover:border-purple-200 hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                  <TrendingUp size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#1a1053] leading-none">250+</span>
                  <span className="text-[10px] font-medium text-slate-500 mt-0.5 whitespace-nowrap">Projects Completed</span>
                </div>
              </div>

              {/* Stat 4: 5+ Years Experience */}
              <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(26,16,83,0.04)] flex items-center gap-2.5 group hover:border-rose-200 hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#e20b27] flex items-center justify-center shrink-0 border border-rose-100">
                  <Award size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#1a1053] leading-none">5+</span>
                  <span className="text-[10px] font-medium text-slate-500 mt-0.5 whitespace-nowrap">Years Healthcare</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
