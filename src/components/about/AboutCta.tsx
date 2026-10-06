"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Calendar,
  MessageCircle,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

export default function AboutCta() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8  ">
        <div className="relative rounded-[36px] bg-[#1a1053] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-white/10">

          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">

            {/* Left Content */}
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-semibold mb-4 backdrop-blur-md">
                <Sparkles size={13} className="animate-pulse" />
                <span>Ready For Unstoppable Practice Growth?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15]">
                Don't Reach Out Unless You're Ready For <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300">
                  More Confirmed Patient Consultations.
                </span>
              </h2>

              <p className="text-slate-300 font-light text-base sm:text-lg mt-4 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Partner with Pune’s leading dedicated healthcare growth squad. Transparent reporting, zero fluff, and proven patient acquisition frameworks.
              </p>

              {/* Doctor Trust Checklist */}
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-medium text-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Free 30-Min Growth Diagnostic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>No Lock-In Contracts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>100% In-House Pune Team</span>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <Link
                href="/contact"
                className="px-8 py-4 text-sm font-semibold text-white bg-[#e20b27] hover:bg-rose-700 rounded-full shadow-lg shadow-rose-900/40 transition-all flex items-center justify-center gap-2.5 text-center group"
              >
                <span>Book Doctor Strategy Call</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/15 backdrop-blur-md transition-all flex items-center justify-center gap-2.5 text-center"
              >
                <MessageCircle size={16} className="text-emerald-400" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

