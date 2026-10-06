"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, type MotionValue } from 'framer-motion';
import {
  UserPlus,
  Search,
  Lightbulb,
  Layout,
  Globe,
  Share2,
  MapPin,
  Link2,
  Rocket,
  Activity,
  PieChart,
  ClipboardCheck,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Star
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

const steps = [
  { num: "01", title: "Client Onboarding", icon: UserPlus },
  { num: "02", title: "Audit & Research", icon: Search },
  { num: "03", title: "Strategy & Roadmap", icon: Lightbulb },
  { num: "04", title: "Web Design & Development", icon: Layout },
  { num: "05", title: "Healthcare SEO & Visibility", icon: Globe },
  { num: "06", title: "Social & Video Growth", icon: Share2 },
  { num: "07", title: "GMB & Google Maps 3-Pack", icon: MapPin },
  { num: "08", title: "High-DA Backlink Network", icon: Link2 },
  { num: "09", title: "Campaign Launch", icon: Rocket },
  { num: "10", title: "Conversion Optimization", icon: Activity },
  { num: "11", title: "Analytics & Reporting", icon: PieChart },
  { num: "12", title: "Quarterly Review", icon: ClipboardCheck },
  { num: "13", title: "Long-term Scaling", icon: TrendingUp }
];

/**
 * Like framer's useTime(), but the clock only advances while `running` — the orbit drives
 * ~150 per-frame colour/shadow updates, so it must not keep repainting while off-screen.
 */
function usePausableTime(running: boolean): MotionValue<number> {
  const time = useMotionValue(0);
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      time.set(time.get() + (now - last));
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, time]);
  return time;
}

function OrbitingStep({ step, index, totalSteps, time, duration }: any) {
  const offset = (index / totalSteps) * 360;

  // Calculate how close this step is to the top (0 degrees)
  const progress = useTransform(time, (t: number) => {
    // Negative r for anti-clockwise rotation
    const r = -(t % duration) / duration * 360;

    // Normalize globalAngle to [-180, 180]
    let globalAngle = (r + offset) % 360;
    if (globalAngle < 0) globalAngle += 360;
    if (globalAngle > 180) globalAngle -= 360;

    const distance = Math.abs(globalAngle);
    // Active window: within 20 degrees of the top
    if (distance < 20) {
      return 1 - (distance / 20); // 1 at exactly top, 0 at 20 degrees
    }
    return 0;
  });

  // Keep the step perfectly upright by counter-rotating
  const itemCounterRotate = useTransform(time, (t: number) => {
    const r = -(t % duration) / duration * 360;
    return -(r + offset);
  });

  // Dynamic visual properties based on progress
  const scale = useTransform(progress, [0, 1], [0.88, 1.22]);
  const opacity = useTransform(progress, [0, 1], [0.65, 1]);
  const circleBorder = useTransform(progress, [0, 1], ['#cbd5e1', '#1a1053']);
  const iconColor = useTransform(progress, [0, 1], ['#64748b', '#e20b27']);
  const titleColor = useTransform(progress, [0, 1], ['#475569', '#1a1053']);
  const numColor = useTransform(progress, [0, 1], ['#94a3b8', '#e20b27']);
  const cardBorder = useTransform(progress, [0, 1], ['#f1f5f9', '#e2e8f0']);
  const cardShadow = useTransform(progress, [0, 1], ['0px 4px 6px rgba(0,0,0,0.02)', '0px 20px 30px -10px rgba(26,16,83,0.18)']);
  const pulseOpacity = useTransform(progress, [0, 0.8, 1], [0, 0, 0.9]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none" style={{ transform: `rotate(${offset}deg)` }}>
      <motion.div
        className="absolute top-0 left-1/2 flex flex-col items-center w-60 pointer-events-auto"
        style={{ x: "-50%", y: "-32px", transformOrigin: "50% 32px", rotate: itemCounterRotate, scale, opacity }}
      >
        <motion.div
          className="w-16 h-16 bg-white border-[3px] rounded-full flex items-center justify-center mb-3 relative z-20 shadow-sm"
          style={{ borderColor: circleBorder, color: iconColor, boxShadow: cardShadow }}
        >
          <step.icon size={24} strokeWidth={2.2} />

          {/* Glowing pulse ring when near active apex */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary-accent"
            animate={{ transform: ["scale(1)", "scale(1.5)"], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            style={{ opacity: pulseOpacity }}
          />
        </motion.div>

        <motion.div
          className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border text-center flex flex-col items-center z-10 shadow-sm"
          style={{ borderColor: cardBorder, boxShadow: cardShadow }}
        >
          <motion.span className="text-[10px] font-bold tracking-widest mb-0.5" style={{ color: numColor }}>
            STEP {step.num}
          </motion.span>
          <motion.h4 className="text-xs md:text-sm font-semibold whitespace-nowrap" style={{ color: titleColor }}>
            {step.title}
          </motion.h4>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: '200px 0px' });
  // The wheel is only shown from md up; phones get a static timeline, so don't run the clock there.
  const [wheelShown, setWheelShown] = React.useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setWheelShown(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const time = usePausableTime(inView && wheelShown);
  const duration = 45000;

  const containerRotate = useTransform(time, (t) => -(t % duration) / duration * 360);
  const outerRingRotate = useTransform(time, (t) => (t % (duration * 1.5)) / (duration * 1.5) * 360);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-[#fafbfe] overflow-hidden border-t border-slate-100 flex flex-col items-center md:min-h-[920px] justify-center relative">
      {/* RICH HIGH-TECH BACKGROUND ELEMENTS */}
      {/* 1. Subtle Engineering Grid Matrix */}
      <div
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 232, 240, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 45%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 40%, transparent 80%)'
        }}
      />

      {/* 2. Soft Atmospheric Ambient Glowing Orbs */}
      <div className="absolute top-[10%] left-[15%] w-[450px] h-[450px] bg-gradient-to-br from-indigo-400/10 via-purple-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[15%] right-[15%] w-[450px] h-[450px] bg-gradient-to-bl from-rose-400/10 via-pink-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-primary-accent/5 via-highlight/5 to-primary-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* 3. Subtle Concentric High-Tech Radar / Orbit Guide Rings */}
      <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[1150px] h-[1150px] rounded-full border border-slate-200/50 pointer-events-none opacity-60" />
      <div className="absolute top-[135px] left-1/2 -translate-x-1/2 w-[850px] h-[850px] rounded-full border border-dashed border-indigo-200/40 pointer-events-none" />
      <div className="absolute top-[210px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-slate-200/40 pointer-events-none opacity-50" />

      {/* 4. Slow Rotating Decorative Radial Accent Nodes */}
      <motion.div
        style={{ rotate: outerRingRotate }}
        className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[1150px] h-[1150px] rounded-full pointer-events-none"
      >
        <div className="absolute top-1/4 left-0 w-2 h-2 rounded-full bg-primary-accent/40 shadow-[0_0_12px_rgba(226,11,39,0.5)]" />
        <div className="absolute bottom-1/3 right-0 w-2.5 h-2.5 rounded-full bg-highlight/40 shadow-[0_0_12px_rgba(26,16,83,0.4)]" />
        <div className="absolute top-0 right-1/4 w-1.5 h-1.5 rounded-full bg-indigo-400/50" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8  flex flex-col items-center relative z-10">

        {/* 1. TOP-LEFT METRIC: Social & Video Reach (Floating in Upper Sky) */}
        <motion.div
          initial={{ opacity: 0, transform: "translate(-20px, -20px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex absolute top-12 left-4 xl:left-10 z-30 pointer-events-none"
        >
          <motion.div
            animate={{ transform: ["translate(0px, 0px)", "translate(0px, -8px)", "translate(0px, 0px)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_32px_-6px_rgba(226,11,39,0.08)] rounded-2xl p-3.5 flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100/90 border border-pink-200/60 flex items-center justify-center text-pink-600 shadow-sm shrink-0">
              <Share2 size={20} strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-lg font-bold text-slate-800 leading-none">2.4M+</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-lg border border-emerald-200/60">+340%</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Social Video Reach</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 2. BOTTOM-LEFT METRIC: Verified Patient Trust (Flanking Lower Area) */}
        <motion.div
          initial={{ opacity: 0, transform: "translate(-20px, 20px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex absolute bottom-24 xl:bottom-28 left-4 xl:left-10 z-30 pointer-events-none"
        >
          <motion.div
            animate={{ transform: ["translate(0px, 0px)", "translate(0px, 8px)", "translate(0px, 0px)"] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_32px_-6px_rgba(245,158,11,0.08)] rounded-2xl p-3.5 flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/90 border border-amber-200/60 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
              <Star size={18} className="fill-amber-500 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base font-bold text-slate-800 leading-none">4.9 / 5.0</span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-lg border border-amber-200/60">500+ Rev</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Patient Trust Score</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. TOP-RIGHT METRIC: Healthcare SEO & Maps (Floating in Upper Sky) */}
        <motion.div
          initial={{ opacity: 0, transform: "translate(20px, -20px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex absolute top-12 right-4 xl:right-10 z-30 pointer-events-none"
        >
          <motion.div
            animate={{ transform: ["translate(0px, 0px)", "translate(0px, -8px)", "translate(0px, 0px)"] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_32px_-6px_rgba(99,102,241,0.08)] rounded-2xl p-3.5 flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/90 border border-indigo-200/60 flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
              <Globe size={20} strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-lg font-bold text-slate-800 leading-none">Top 1%</span>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-lg border border-indigo-200/60">Rank #1</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">SEO & Local Maps</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 4. BOTTOM-RIGHT METRIC: 100% Safe High-DA Backlinks (Flanking Lower Area) */}
        <motion.div
          initial={{ opacity: 0, transform: "translate(20px, 20px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex absolute bottom-24 xl:bottom-28 right-4 xl:right-10 z-30 pointer-events-none"
        >
          <motion.div
            animate={{ transform: ["translate(0px, 0px)", "translate(0px, 8px)", "translate(0px, 0px)"] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_32px_-6px_rgba(16,185,129,0.08)] rounded-2xl p-3.5 flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/90 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
              <ShieldCheck size={20} strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base font-bold text-slate-800 leading-none">100% Safe</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-lg border border-emerald-200/60">High DA</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Authority Backlinks</p>
            </div>
          </motion.div>
        </motion.div>

        {/* The Massive Globe / Arc Animation (Top) */}
        <div className="relative w-full max-w-[1200px] h-[550px] hidden md:flex justify-center overflow-hidden">

          {/* The Large Arc Circle Container */}
          <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px]">

            {/* Glowing Accent Under the Track */}
            <div className="absolute inset-0 rounded-full border-[6px] border-primary-accent/5 blur-[2px] pointer-events-none" />

            {/* Rotating Dashed Line Container */}
            <motion.div
              style={{ rotate: containerRotate }}
              className="absolute inset-0 rounded-full border-[2px] border-dashed border-slate-300/80 z-0"
            >
              {/* Steps rotating with the container */}
              {steps.map((step, idx) => (
                <OrbitingStep
                  key={idx}
                  step={step}
                  index={idx}
                  totalSteps={steps.length}
                  time={time}
                  duration={duration}
                />
              ))}
            </motion.div>
          </div>

          {/* Fade out bottom to blend with background perfectly */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#fafbfe] via-[#fafbfe]/80 to-transparent z-30 pointer-events-none" />
        </div>

        {/* Central Codigix Core Node (Clean and Centered, No Overlapping Badges) */}
        <motion.div
          initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative z-40 hidden md:flex items-center justify-center -mt-[16rem] mb-6 w-full"
        >
          {/* Central Pulsing Halo behind Logo */}
          <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-primary-accent/10 to-highlight/10 blur-xl animate-pulse pointer-events-none" />

          <div className="relative z-10 bg-white/85 backdrop-blur-xl px-7 py-3.5 rounded-2xl border border-slate-200/80 shadow-lg shadow-indigo-950/5">
            <Logo size="md" />
          </div>
        </motion.div>

        {/* The Heading (Below Logo - Completely Unobstructed) */}
        <motion.div
          initial={{ opacity: 0, transform: "translate(0px, 30px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl flex flex-col items-center relative z-40 md:mt-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-[#1a1053] tracking-wide mb-3.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>Continuous Growth Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] leading-[1.15] tracking-tight mb-3.5">
            A Simple Process for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
              Measurable Healthcare Growth.
            </span>
          </h2>
          <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed max-w-2xl px-4">
            We follow a transparent, continuous, and data-driven lifecycle engineered to maximize doctor authority, patient inquiries, and organic search dominance.
          </p>
        </motion.div>

        {/* Phones: the same 13 steps as a vertical timeline (the wheel needs ~1000px of width) */}
        <ol className="md:hidden relative z-40 mt-10 w-full max-w-md space-y-3">
          <span aria-hidden="true" className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-[#1a1053]/25 via-[#e20b27]/25 to-[#1a1053]/10" />
          {steps.map((step) => (
            <li key={step.num} className="relative flex items-center gap-4 rounded-2xl bg-white/90 border border-slate-200/80 px-3 py-3 shadow-[0_4px_14px_rgba(26,16,83,0.04)]">
              <span className="relative z-10 w-10 h-10 shrink-0 rounded-full bg-white border-2 border-[#1a1053]/15 flex items-center justify-center text-[#e20b27]">
                <step.icon size={18} strokeWidth={2.2} />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold tracking-widest text-[#e20b27]">STEP {step.num}</span>
                <span className="block text-[15px] font-semibold text-[#1a1053] leading-snug">{step.title}</span>
              </span>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
