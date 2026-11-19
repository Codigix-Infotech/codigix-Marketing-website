"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      title: "No Patient Solicitation or Referral Incentives",
      text: "Our engagement models are strictly service-based and are never tied to acquiring individual patients or paying/receiving patient referral incentives.",
    },
    {
      title: "Factual & Non-Promotional Framing",
      text: "For medical and hospital engagements, we prioritize accurate institutional details, verified practitioner credentials and registration information, and public-health education without unsubstantiated claims or cure promises.",
    },
    {
      title: "Authenticity & AI Transparency",
      text: "We do not use fabricated reviews or deceptive synthetic personas, and we apply clear source disclosures whenever AI tools assist in content or media creation.",
    },
    {
      title: "Data Protection First",
      text: "We design digital touchpoints with data minimization and security in mind, aligned with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (and 2025 Rules).",
    }
  ];

  return (
    <section className="py-16 bg-[#fafbfe] overflow-hidden border-t border-slate-100 relative">

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#1a1053 1px, transparent 1px), linear-gradient(90deg, #1a1053 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Animated Ambient Light Orbs */}
      <motion.div
        animate={{ transform: ["translate(20px, -20px)", "translate(-20px, 20px)", "translate(20px, -20px)"] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[0%] right-[0%] w-[500px] h-[500px] bg-primary-accent/10 rounded-full blur-[120px] pointer-events-none z-0 translate-x-1/4 -translate-y-1/4"
      />
      <motion.div
        animate={{ transform: ["translate(-20px, 20px)", "translate(20px, -20px)", "translate(-20px, 20px)"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-highlight/10 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Background shape */}
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-secondary-bg rounded-tr-full -z-10 opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 ">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, transform: "translate(0px, 30px)" }}
          whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl relative">
            <span className="text-xs font-bold tracking-[0.2em] text-primary-accent uppercase mb-4 block">
              Our Commitments
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1a1053] leading-[1.1] tracking-tight">
              Our Ethical <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Communication Commitments
              </span>
            </h2>
          </div>

          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-secondary-text hover:border-primary-accent hover:text-primary-accent transition-colors">
              <ArrowLeft size={16} />
            </button>
            <button className="w-10 h-10 rounded-full bg-secondary-bg flex items-center justify-center text-primary-accent hover:bg-primary-accent hover:text-white transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative group"
            >
              {/* Big Quote Icon */}
              <div className="mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary-bg/80">
                  <path d="M10 11L8 17H5L7 11H5V7H10V11ZM19 11L17 17H14L16 11H14V7H19V11Z" fill="currentColor" />
                </svg>
              </div>

              <h4 className="text-sm font-bold text-primary-text mb-3">{review.title}</h4>
              <p className="text-sm text-secondary-text leading-relaxed font-medium flex-1">
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div >
    </section >
  );
}
