"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Search, Zap, Instagram, ShoppingCart, FileText, Code2, Layout, ArrowRight, ChevronLeft, ChevronRight, Sparkles, MapPin } from 'lucide-react';

const CYCLE_DURATION_MS = 4600; // 4.6s comfortable reading time per capability

export default function ServicesOverview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0); // Starts cleanly from first card (index 0)
  const [isPaused, setIsPaused] = useState(false);
  // Only auto-advance while the carousel is actually visible.
  const inView = useInView(scrollRef, { amount: 0.2 });

  const services = [
    {
      title: "SEO Search Engine Optimization",
      description: "Be the First Clinic Patients Find on Google. More visibility. More appointments.",
      icon: <Search strokeWidth={1.8} />,
      accentColor: "from-emerald-600 to-teal-600",
      badge: "Organic Search",
      gradient: "from-emerald-500 via-teal-500 to-cyan-400",
      href: "/best-seo-services-in-pcmc"
    },
    {
      title: "Paid Advertisements (PPC)",
      description: "Immediate patient leads with high-ROI Google, Meta & Instagram ad funnels.",
      icon: <Zap strokeWidth={1.8} />,
      accentColor: "from-amber-600 to-orange-600",
      badge: "Instant Leads",
      gradient: "from-amber-500 via-orange-500 to-red-400",
      href: "/paid-advertisements-ppc"
    },
    {
      title: "Social Media Marketing",
      description: "Build community trust with viral doctor reels, visuals & social branding.",
      icon: <Instagram strokeWidth={1.8} />,
      accentColor: "from-pink-600 to-rose-600",
      badge: "Viral Growth",
      gradient: "from-pink-500 via-rose-500 to-purple-500",
      href: "/social-media-marketing"
    },
    {
      title: "E-Commerce Marketing",
      description: "Scale online healthcare & store sales, product rankings & conversion funnels.",
      icon: <ShoppingCart strokeWidth={1.8} />,
      accentColor: "from-blue-600 to-cyan-600",
      badge: "High ROAS",
      gradient: "from-blue-500 via-indigo-500 to-cyan-400",
      href: "/ecommerce-marketing"
    },
    {
      title: "Medical Content Marketing",
      description: "Doctor authority blogs, patient education guides & high-trust clinical copywriting.",
      icon: <FileText strokeWidth={1.8} />,
      accentColor: "from-purple-600 to-indigo-600",
      badge: "Authority Copy",
      gradient: "from-purple-500 via-indigo-500 to-pink-500",
      href: "/medical-content-marketing"
    },
    {
      title: "Web Design & Development",
      description: "High-converting, mobile-first and HIPAA-compliant healthcare & enterprise websites.",
      icon: <Code2 strokeWidth={1.8} />,
      accentColor: "from-indigo-600 to-violet-600",
      badge: "Conversion Rate",
      gradient: "from-indigo-500 via-purple-500 to-blue-400",
      href: "/web-design-development"
    }
  ];

  // Auto-cycle active card state step-by-step with comfortable readable timing
  useEffect(() => {
    if (isPaused || !inView) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, CYCLE_DURATION_MS);

    return () => clearInterval(interval);
  }, [services.length, isPaused, inView]);

  // Slide the active card into view
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const cardNodes = container.querySelectorAll('.service-card-item');
    
    if (cardNodes && cardNodes[activeIndex]) {
      const activeCard = cardNodes[activeIndex] as HTMLElement;
      const cardOffsetLeft = activeCard.offsetLeft;
      
      // For first card (index 0), smoothly slide back to 0
      // For subsequent cards, smoothly slide to position card at comfortable left offset
      const targetScroll = activeIndex === 0 
        ? 0 
        : Math.max(0, cardOffsetLeft - 16);
      
      // Native smooth scrolling runs off the main thread, unlike a JS-driven scrollLeft tween.
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  return (
    <section 
      className="py-20 lg:py-24 bg-white overflow-hidden relative border-t border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Clean Technical Blueprint Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]" 
        style={{ 
          backgroundImage: 'linear-gradient(#1a1053 1px, transparent 1px), linear-gradient(90deg, #1a1053 1px, transparent 1px)', 
          backgroundSize: '48px 48px' 
        }} 
      />

      {/* Subtle Top & Bottom Gradient Vignettes (Pure, clean, crisp) */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-50/50 to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50/50 to-transparent pointer-events-none z-0" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 items-center lg:items-stretch relative">

          {/* Left Title Column */}
          <motion.div
            initial={{ opacity: 0, transform: "translate(0px, 30px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-[32%] xl:w-[30%] shrink-0 flex flex-col justify-center relative pr-2"
          >
            {/* Floating Glassmorphism Badge */}
            <motion.div
              initial={{ opacity: 0, transform: "scale(0.8)" }}
              whileInView={{ opacity: 1, transform: "scale(1)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(26,16,83,0.06)] rounded-2xl p-3.5 px-4 mb-6 w-fit"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shadow-xs">
                <MapPin size={18} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-semibold text-[#1a1053] leading-none">#1 Rank</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-wider">Local GMB & Google Maps</p>
              </div>
            </motion.div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-3.5 w-fit">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs font-semibold text-[#1a1053] tracking-wide">
                Core Capabilities · Patient Acquisition
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] tracking-tight leading-[1.15] mb-4">
              Organic Growth & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Healthcare Authority
              </span>
            </h2>

            <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              We specialize in healthcare SEO, Google Maps (GMB) 3-pack rankings, high-authority medical backlinks, and patient-first social media growth across Instagram, Meta, and YouTube.
            </p>

            <div className="flex items-center gap-4">
              <Link 
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a1053] hover:bg-[#25186f] text-white rounded-full font-medium text-sm transition-all shadow-[0_8px_20px_rgba(26,16,83,0.18)] hover:-translate-y-0.5"
              >
                <span>View All Services</span> <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>

          {/* Right Scrolling Cards */}
          <div className="lg:w-[68%] xl:w-[70%] w-full relative">
            
            {/* Top Step Controls & Live Status */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-light text-slate-500">
                  Step {activeIndex + 1} of {services.length}: <strong className="font-semibold text-[#1a1053]">{services[activeIndex].title}</strong>
                </span>
              </div>

              {/* Step Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous capability"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#1a1053] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs active:scale-95"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next capability"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#1a1053] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs active:scale-95"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Carousel Container (Crisp, pure white cards with vibrant glowing animated border) */}
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-8 pt-3 hide-scrollbar px-2"
            >
              {services.map((service, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    initial="initial"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    // Fade only: an inline transform from a slide-in would override the card's
                    // Tailwind lift/scale classes (active + hover states).
                    variants={{
                      initial: { opacity: 0 },
                      visible: { opacity: 1, transition: { delay: idx * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    className={`service-card-item relative shrink-0 w-[220px] sm:w-[230px] rounded-[2rem] p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-500 ease-out select-none bg-white ${
                      isActive
                        ? '-translate-y-3 shadow-[0_20px_45px_-12px_rgba(26,16,83,0.12)] border-transparent scale-[1.02]'
                        : 'hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-200/90 hover:shadow-md opacity-85'
                    }`}
                  >
                    {/* Animated Drawing SVG Border with Crisp Neon Glow */}
                    <svg 
                      className="absolute inset-0 w-full h-full pointer-events-none rounded-[2rem] z-20 opacity-100 transition-opacity duration-500" 
                      style={{ 
                        padding: '1px',
                        filter: isActive ? 'drop-shadow(0 2px 6px rgba(59, 130, 246, 0.25))' : 'none'
                      }}
                    >
                      <defs>
                        <linearGradient id={`grad-service-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#f43f5e" />
                        </linearGradient>
                      </defs>
                      <motion.rect
                        x="0" y="0" width="100%" height="100%" rx="31" ry="31"
                        fill="none" 
                        stroke={`url(#grad-service-${idx})`} 
                        strokeWidth="2.5"
                        strokeDasharray="1400 1400"
                        animate={{ strokeDashoffset: isActive ? [1400, 0] : idx < activeIndex ? 0 : 1400 }}
                        transition={{ duration: isActive ? 4.6 : 0, ease: "linear" }}
                      />
                    </svg>

                    {/* Top Micro-Tag */}
                    <div className="relative z-10 mb-4">
                      <span className={`text-[9px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full transition-colors duration-300 ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {service.badge}
                      </span>
                    </div>

                    {/* Icon Container with Crisp Elevated Lighting */}
                    <Link
                      href={service.href}
                      className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 shadow-sm ${
                        isActive
                          ? `bg-gradient-to-br ${service.accentColor} text-white scale-110 shadow-lg shadow-blue-500/20`
                          : 'bg-slate-100/90 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-105'
                      }`}
                      aria-label={service.title}
                    >
                      {React.cloneElement(service.icon as React.ReactElement, { size: 26 })}
                    </Link>

                    {/* Service Title */}
                    <h3 className={`relative z-10 text-[15px] font-semibold mb-2.5 leading-snug transition-colors duration-300 ${
                      isActive ? 'text-[#1a1053]' : 'text-slate-800 group-hover:text-blue-600'
                    }`}>
                      <Link href={service.href} className="hover:text-blue-600 transition-colors">
                        {service.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 text-xs text-slate-500 font-light leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Bottom Action Icon */}
                    <Link
                      href={service.href}
                      onClick={(e) => e.stopPropagation()}
                      className={`relative z-10 mt-auto w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#1a1053] text-white shadow-md scale-105 hover:bg-[#e20b27]'
                          : 'border border-slate-200 text-slate-400 group-hover:border-blue-500 group-hover:text-blue-600 group-hover:bg-blue-50'
                      }`}
                      aria-label={`View ${service.title}`}
                    >
                      <ArrowRight size={14} className={isActive ? 'translate-x-0.5' : ''} />
                    </Link>

                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Progress Bar & Interactive Navigation */}
            <div className="flex items-center justify-between mt-3 px-3">
              <div className="flex items-center gap-2">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Jump to service ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeIndex === i ? 'w-8 bg-[#1a1053]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <span className="text-xs font-light text-slate-400 flex items-center gap-1.5">
                <Sparkles size={12} className="text-blue-500" />
                Slow reading pace (4.6s per capability) • Hover to pause
              </span>
            </div>

          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
