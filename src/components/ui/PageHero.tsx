"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle: string;
  gradientText?: string;
}

export default function PageHero({ title, subtitle, gradientText }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background with glassmorphism grid and blur */}
      <div className="absolute inset-0 z-0 bg-[#fafbfe]">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Glow Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-400/20 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 px-2 sm:px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-sans text-[#1a1053] leading-tight mb-6 tracking-tight">
              {title}{" "}
              {gradientText && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                  {gradientText}
                </span>
              )}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </div>
    </section >
  );
}
