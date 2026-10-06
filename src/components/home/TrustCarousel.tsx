"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, HeartPulse, Microscope, Syringe, Activity, Pill } from 'lucide-react';

export default function TrustCarousel() {
  const logos = [
    { icon: <Stethoscope size={32} />, name: "MedCare" },
    { icon: <HeartPulse size={32} />, name: "CardioLife" },
    { icon: <Microscope size={32} />, name: "BioLabs" },
    { icon: <Syringe size={32} />, name: "VaxHealth" },
    { icon: <Activity size={32} />, name: "PulseClinic" },
    { icon: <Pill size={32} />, name: "PharmaDirect" },
  ];

  // Double the array to create a seamless infinite loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 overflow-hidden bg-primary-bg relative border-y border-white/5">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary-bg to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary-bg to-transparent z-10" />
      
      <div className="container mx-auto px-4 text-center mb-8">
        <p className="text-sm font-semibold text-secondary-text uppercase tracking-widest">Trusted by 500+ Healthcare Providers</p>
      </div>

      <div className="flex w-[200%] md:w-[150%] lg:w-full max-w-full">
        <motion.div 
          className="flex gap-16 md:gap-32 items-center"
          animate={{ transform: ["translate(0px, 0px)", "translate(-1035px, 0px)"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }}
        >
          {duplicatedLogos.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-3 text-secondary-text opacity-50 hover:opacity-100 hover:text-primary-accent transition-all duration-300 shrink-0">
              {logo.icon}
              <span className="text-2xl font-bold font-sans">{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
