"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FaqSection() {
  const faqs = [
    {
      question: "Do you specialize exclusively in healthcare digital marketing?",
      answer: "Yes, Codigix Infotech focuses heavily on healthcare. We understand medical compliance (HIPAA), patient journey mapping, doctor authority branding, and the local SEO keywords needed to drive highly qualified patient appointments."
    },
    {
      question: "How long does it take to see results from Healthcare SEO & GMB?",
      answer: "Google Business Profile (GMB) and local map optimizations typically show noticeable increases in patient calls within weeks. High-DA backlink building and organic keyword rankings steadily compound over 3 to 6 months for durable, long-term patient acquisition."
    },
    {
      question: "How do Instagram, Meta, and YouTube help our clinic?",
      answer: "We produce informative patient education videos, doctor FAQs, and high-quality reels on Instagram, Meta Business, and YouTube. This builds profound trust and positions your practitioners as leading healthcare authorities in your region."
    },
    {
      question: "Can you redesign our clinic or hospital website for better patient conversions?",
      answer: "Absolutely. We build lightning-fast, mobile-responsive, and HIPAA-compliant healthcare websites using Next.js and React, optimized specifically for fast load times and seamless patient booking."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-primary-bg relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-primary-text mb-4">Frequently Asked <span className="text-gradient">Questions</span></h2>
          <p className="text-secondary-text text-base sm:text-lg font-light">Everything you need to know about partnering with Codigix.</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isActive = activeIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
                whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`glass border rounded-2xl overflow-hidden transition-colors duration-300 ${isActive ? 'border-primary-accent shadow-md bg-white' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <button 
                  onClick={() => setActiveIndex(isActive ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base md:text-lg font-semibold text-primary-text pr-8">{faq.question}</span>
                  <div className={`p-2 rounded-full transition-colors ${isActive ? 'bg-primary-accent text-white' : 'bg-slate-100 text-secondary-text'}`}>
                    {isActive ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-secondary-text font-light text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
