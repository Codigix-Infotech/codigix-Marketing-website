'use client';

import Link from 'next/link';
import { RefreshCw } from 'lucide-react';

/** Shown when the article could not be loaded (e.g. the API or database is briefly down). */
export default function BlogPostError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="bg-white pt-40 pb-28">
      <div className="container mx-auto px-4 max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#e20b27] mb-3">Temporarily unavailable</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a1053] mb-4">This article couldn&apos;t be loaded right now</h1>
        <p className="text-slate-600 leading-relaxed mb-8">
          Our blog is having a brief hiccup. Please try again in a moment — or browse our other articles in the meantime.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1a1053] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e20b27] transition-colors"
          >
            <RefreshCw size={15} /> Try again
          </button>
          <Link href="/blog" className="inline-flex items-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-[#1a1053] hover:border-[#1a1053]/40 transition-colors">
            All articles
          </Link>
        </div>
      </div>
    </div>
  );
}
