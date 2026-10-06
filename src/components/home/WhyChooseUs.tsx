"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Target, TrendingUp, Users, ShieldCheck, MousePointer2, LineChart, BarChart3 } from 'lucide-react';

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]));
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]));
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]));

  const features = [
    { title: "Specialized in Healthcare", icon: <Target className="text-blue-500" size={32} /> },
    { title: "Measurable ROI", icon: <TrendingUp className="text-green-500" size={32} /> },
    { title: "Patient-Centric Approach", icon: <Users className="text-purple-500" size={32} /> },
    { title: "HIPAA Compliant Strategies", icon: <ShieldCheck className="text-primary-accent" size={32} /> }
  ];

  return (
    <section ref={containerRef} className="py-20 bg-secondary-bg relative overflow-hidden border-y border-slate-200">
      {/* Floating Micro Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[10%] opacity-30 pointer-events-none">
        <MousePointer2 size={64} className="text-primary-accent transform -rotate-12" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[15%] opacity-30 pointer-events-none">
        <LineChart size={80} className="text-secondary-accent" />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-[20%] left-[20%] opacity-30 pointer-events-none">
        <BarChart3 size={72} className="text-pink-500" />
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, transform: "translate(0px, 30px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-primary-text mb-6"
          >
            Why Healthcare Brands <span className="text-gradient">Choose Us</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, transform: "translate(0px, 30px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-secondary-text"
          >
            We combine deep industry knowledge with cutting-edge digital marketing tactics to ensure your practice stays ahead.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 text-center flex flex-col items-center gap-4 hover:shadow-lg transition-all"
            >
              <div className="p-4 bg-slate-100 rounded-2xl mb-2">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary-text">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
