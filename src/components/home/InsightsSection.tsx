"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { BlogSummary } from '@/lib/types';
import { mediaUrl } from '@/lib/config';
import { formatDate } from '@/lib/seo';

export default function InsightsSection({ posts = [] }: { posts?: BlogSummary[] }) {
  if (!posts.length) return null;
  const [featured, ...rest] = posts;

  return (
    <section className="py-12 md:py-16 bg-[#fafbfe] overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-4 lg:px-8 ">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-[#1a1053] tracking-wide mb-3.5 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Healthcare Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] leading-[1.15] tracking-tight">
              Ideas, Insights & <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Inspiration.
              </span>
            </h2>
          </div>

          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#1a1053] border border-slate-200 rounded-full font-medium text-sm hover:border-[#1a1053] hover:bg-slate-50 transition-all whitespace-nowrap shadow-2xs">
            Explore All Insights
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
            whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className={`${rest.length ? 'md:col-span-7' : 'md:col-span-12'}`}
          >
            <Link href={`/blog/${featured.slug}`} className="group flex flex-col gap-4">
              <div className="relative w-full h-[280px] md:h-[400px] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                {featured.cover_image && (
                  <img
                    src={mediaUrl(featured.cover_image)}
                    alt={featured.cover_image_alt || featured.title}
                    className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 text-[11px] font-bold text-secondary-text tracking-wider uppercase mb-2">
                  {featured.category_name && <span className="text-primary-accent">{featured.category_name}</span>}
                  {featured.category_name && <span>•</span>}
                  <time dateTime={featured.published_at}>{formatDate(featured.published_at, { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-primary-text mb-2 group-hover:text-primary-accent transition-colors leading-snug">
                  {featured.title}
                </h3>
                <p className="text-sm font-light text-secondary-text mb-3 line-clamp-2 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="inline-flex items-center gap-1.5 text-primary-text font-semibold text-xs group-hover:text-primary-accent transition-colors">
                  Read Article <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Secondary Articles */}
          {rest.length > 0 && (
            <div className="md:col-span-5 flex flex-col gap-5">
              {rest.slice(0, 2).map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, transform: "translate(20px, 0px)" }}
                  whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + (idx * 0.15), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={`/blog/${article.slug}`} className="group flex flex-col gap-3">
                    <div className="relative w-full h-[200px] md:h-[220px] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                      {article.cover_image && (
                        <img
                          src={mediaUrl(article.cover_image)}
                          alt={article.cover_image_alt || article.title}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-secondary-text tracking-wider uppercase mb-1">
                        {article.category_name && <span className="text-primary-accent">{article.category_name}</span>}
                        {article.category_name && <span>•</span>}
                        <time dateTime={article.published_at}>{formatDate(article.published_at, { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                      </div>
                      <h3 className="text-base font-semibold text-primary-text group-hover:text-primary-accent transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 text-primary-text font-semibold text-xs group-hover:text-primary-accent transition-colors mt-1.5">
                        Read Article <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
