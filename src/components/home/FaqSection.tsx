"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FaqSection() {
  const faqs = [
    {
      question: "Do you work only with healthcare organizations?",
      answer: "No. Codigix Infotech works across healthcare institutions, enterprises, and commercial businesses. For healthcare engagements we follow NMC ethical communication principles (and NDC or AYUSH guidelines where relevant), prioritize accurate institutional information, and align data handling with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (and 2025 Rules)."
    },
    {
      question: "How long does technical SEO and local profile work take?",
      answer: "Search visibility is influenced by many factors outside our control, so we do not guarantee rankings, positions, or timelines. We focus on technical site health, structured metadata, and accurate listing details (location, hours, departments, services), which support clear discoverability over time."
    },
    {
      question: "What does educational video and social content involve?",
      answer: "We produce public-health awareness videos, factual department and facility introductions, and educational Q&A content. Practitioner credential and registration details are disclosed, AI-assisted media is labelled, and we do not produce promotional patient testimonials."
    },
    {
      question: "Can you redesign our clinic or hospital website?",
      answer: "Yes. We build fast, mobile-responsive, accessible, and security-conscious websites using Next.js and React, with transparent privacy notices, minimal data collection on forms, and clear information hierarchy, aligned with Indian data-protection laws."
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
