"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      text: "Codigix transformed our online presence. Their team is professional, creative and truly understands business growth.",
      name: "Rohan Deshpande",
      role: "Retail Business Owner",
    },
    {
      text: "Highly recommended for their strategic approach and timely execution. They deliver exactly what they promise.",
      name: "Neha Kulkarni",
      role: "E-commerce Entrepreneur",
    },
    {
      text: "A reliable and result-oriented team. They bring great ideas to the table and have excellent communication.",
      name: "Sandeep Patil",
      role: "Manufacturing Business",
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
            {/* Floating Glassmorphism Badge */}
            <motion.div
              initial={{ opacity: 0, transform: "scale(0.8)" }}
              whileInView={{ opacity: 1, transform: "scale(1)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-12 -right-4 lg:-right-32 z-30 bg-white/70 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl p-4 flex items-center gap-4 hidden lg:flex"
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                <Star size={18} className="fill-current" />
              </div>
              <div>
                <p className="text-xl text-slate-800 leading-none">4.9/5</p>
                <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Average Rating</p>
              </div>
            </motion.div>
            <span className="text-xs font-bold tracking-[0.2em] text-primary-accent uppercase mb-4 block">
              Client Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1a1053] leading-[1.1] tracking-tight">
              What Our <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Clients Say
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
              className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative group"
            >
              {/* Big Quote Icon */}
              <div className="mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary-bg/80">
                  <path d="M10 11L8 17H5L7 11H5V7H10V11ZM19 11L17 17H14L16 11H14V7H19V11Z" fill="currentColor" />
                </svg>
              </div>

              <p className="text-sm text-primary-text leading-relaxed font-medium mb-8 flex-1">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0">
                  <img src={`https://i.pravatar.cc/150?u=${idx}`} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary-text">{review.name}</h4>
                  <p className="text-[10px] font-bold text-secondary-text mt-0.5">{review.role}</p>
                  <div className="flex gap-1 mt-1 text-highlight">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div >
    </section >
  );
}
