import Link from 'next/link';
import { ArrowUpRight, Calendar, Clock, Eye, Sparkles } from 'lucide-react';
import type { BlogSummary } from '@/lib/types';
import { mediaUrl } from '@/lib/config';
import { formatDate } from '@/lib/seo';

function getInitials(name?: string | null): string {
  if (!name) return 'CX';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function BlogCard({ post, priority = false }: { post: BlogSummary; priority?: boolean }) {
  const readingTime = post.reading_time || Math.max(3, Math.ceil((post.excerpt?.length || 200) / 50));
  const initials = getInitials(post.author_name);

  return (
    <article className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(26,16,83,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
      {/* Top accent gradient bar on hover */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* Cover Image Container */}
      <Link
        href={`/blog/${post.slug}`}
        className="block relative aspect-[16/10] bg-slate-900 overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        {post.cover_image ? (
          <img
            src={mediaUrl(post.cover_image)}
            alt={post.cover_image_alt || post.title}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1053] via-indigo-950 to-slate-900 flex items-center justify-center">
            <Sparkles className="text-white/20" size={40} />
          </div>
        )}

        {/* Subtle dark vignette overlay for badge readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Category Badge - Glassmorphism pill */}
        {post.category_name && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 backdrop-blur-md bg-white/90 text-[#1a1053] font-bold text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm border border-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e20b27]" />
              {post.category_name}
            </span>
          </div>
        )}

        {/* Reading Time Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 backdrop-blur-md bg-slate-900/60 text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
            <Clock size={11} className="text-white/80" />
            {readingTime} min
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-6 md:p-7 flex flex-col flex-1">
        {/* Meta Bar: Date & Views */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-3">
          <div className="inline-flex items-center gap-1.5">
            <Calendar size={13} className="text-slate-400" />
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          </div>
          {post.views > 0 && (
            <div className="inline-flex items-center gap-1 text-slate-400 text-[11px]">
              <Eye size={12} />
              <span>{post.views}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#1a1053] leading-snug tracking-tight mb-3 group-hover:text-[#e20b27] transition-colors duration-200 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-slate-500 leading-relaxed text-sm mb-5 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Tags preview */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-[11px] font-medium text-slate-400 px-1 py-0.5">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Footer: Author Lockup & Interactive Action Button */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {post.author_avatar ? (
              <img
                src={mediaUrl(post.author_avatar)}
                alt={post.author_name || 'Author'}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a1053] to-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-100 shrink-0">
                {initials}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-800 truncate">
                {post.author_name || 'Codigix Team'}
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {post.author_role || 'Growth Strategist'}
              </span>
            </div>
          </div>

          {/* Action Arrow Icon Button */}
          <Link
            href={`/blog/${post.slug}`}
            className="w-9 h-9 rounded-full bg-slate-100 text-[#1a1053] group-hover:bg-[#1a1053] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm shrink-0"
            aria-label={`Read article: ${post.title}`}
          >
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
