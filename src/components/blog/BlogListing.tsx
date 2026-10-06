import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import BlogCard from './BlogCard';
import type { BlogCategory, BlogSummary, PageMeta } from '@/lib/types';
import { mediaUrl } from '@/lib/config';
import { formatDate } from '@/lib/seo';

interface Props {
  posts: BlogSummary[];
  meta: PageMeta;
  categories: BlogCategory[];
  tags: { name: string; count: number }[];
  activeCategory?: string;
  activeTag?: string;
  search?: string;
  basePath: string;
}

function pageHref(basePath: string, page: number, params: Record<string, string | undefined>) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) q.set(k, v);
  if (page > 1) q.set('page', String(page));
  const qs = q.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

function getInitials(name?: string | null): string {
  if (!name) return 'CX';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function BlogListing({
  posts,
  meta,
  categories,
  tags,
  activeCategory,
  activeTag,
  search,
  basePath,
}: Props) {
  const showFeatured = meta.page === 1 && !activeCategory && !activeTag && !search && posts.length > 0;
  const featured = showFeatured ? posts[0] : null;
  const grid = featured ? posts.slice(1) : posts;
  const filterParams = { tag: activeTag, q: search };
  const visibleCategories = categories.filter((c) => (c.post_count ?? 0) > 0);

  const featuredReadingTime = featured
    ? featured.reading_time || Math.max(3, Math.ceil((featured.excerpt?.length || 200) / 50))
    : 4;

  const featuredInitials = featured ? getInitials(featured.author_name) : 'CX';

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50">
      <div className="container mx-auto px-4 ">
        {/* Top Control Bar: Category Navigation & Modern Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          {/* Category Filter Pills */}
          <nav
            aria-label="Blog categories"
            className="flex items-center gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 py-1"
          >
            <Link
              href="/blog"
              className={`shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 border ${!activeCategory
                ? 'bg-[#1a1053] text-white border-[#1a1053] shadow-md shadow-[#1a1053]/15'
                : 'bg-white text-slate-600 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
              All Articles
            </Link>
            {visibleCategories.map((c) => {
              const isActive = activeCategory === c.slug;
              return (
                <Link
                  key={c.id}
                  href={`/blog/category/${c.slug}`}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 border ${isActive
                    ? 'bg-[#1a1053] text-white border-[#1a1053] shadow-md shadow-[#1a1053]/15'
                    : 'bg-white text-slate-600 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  <span>{c.name}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-medium ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                  >
                    {c.post_count}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Search Form */}
          <form action="/blog" method="get" role="search" className="relative w-full lg:w-80 shrink-0">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              id="blog-search"
              name="q"
              defaultValue={search}
              placeholder="Search insights, SEO, guides…"
              className="w-full bg-white border border-slate-200/90 rounded-full pl-11 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a1053]/15 focus:border-[#1a1053] transition-all"
            />
            {search && (
              <Link
                href={basePath}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X size={15} />
              </Link>
            )}
          </form>
        </div>

        {/* Filter / Search Active State Banner */}
        {(search || activeTag) && (
          <div className="mb-8 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="font-medium text-slate-400">Filtering results:</span>
              <span className="font-semibold text-[#1a1053]">
                {meta.total} article{meta.total === 1 ? '' : 's'}
              </span>
              {search && (
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                  Keyword: “{search}”
                </span>
              )}
              {activeTag && (
                <span className="bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-xs font-semibold text-indigo-700">
                  Tag: #{activeTag}
                </span>
              )}
            </div>
            <Link
              href={basePath}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e20b27] hover:underline"
            >
              <X size={14} /> Clear all filters
            </Link>
          </div>
        )}

        {/* Featured Editorial Magazine Centerpiece */}
        {featured && (
          <div className="relative mb-16 group">
            {/* Ambient Background Glow Effect */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-[#e20b27]/10 rounded-[2.5rem] blur-xl opacity-70 group-hover:opacity-100 transition duration-700 -z-10" />

            <article className="bg-white rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-[0_10px_40px_rgba(0,0,0,0.04)] grid lg:grid-cols-12 gap-0">
              {/* Cover Image Half */}
              <Link
                href={`/blog/${featured.slug}`}
                className="lg:col-span-7 relative min-h-[300px] lg:min-h-[460px] bg-slate-900 overflow-hidden block"
                tabIndex={-1}
                aria-hidden="true"
              >
                {featured.cover_image ? (
                  <img
                    src={mediaUrl(featured.cover_image)}
                    alt={featured.cover_image_alt || featured.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a1053] to-slate-900 flex items-center justify-center">
                    <Sparkles className="text-white/20" size={50} />
                  </div>
                )}
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Top Badges */}
                <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2 z-10">
                  <span className="inline-flex items-center gap-2 backdrop-blur-md bg-white/95 text-[#e20b27] font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm border border-white/60">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e20b27] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e20b27]" />
                    </span>
                    Editor&apos;s Choice
                  </span>
                  {featured.category_name && (
                    <span className="backdrop-blur-md bg-black/50 text-white font-semibold text-xs px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
                      {featured.category_name}
                    </span>
                  )}
                </div>

                {/* Bottom Left Read Time on Image */}
                <div className="absolute bottom-5 left-5 z-10 hidden sm:block">
                  <span className="inline-flex items-center gap-1.5 backdrop-blur-md bg-black/60 text-white/90 text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                    <Clock size={12} className="text-white/80" />
                    {featuredReadingTime} min read
                  </span>
                </div>
              </Link>

              {/* Text / Editorial Content Half */}
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/50">
                <div>
                  {/* Meta Bar */}
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-4">
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <Calendar size={13} />
                      <time dateTime={featured.published_at}>{formatDate(featured.published_at)}</time>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <Clock size={13} /> {featuredReadingTime} min read
                    </span>
                    {featured.views > 0 && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <Eye size={13} /> {featured.views}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1053] leading-tight tracking-tight mb-4 group-hover:text-[#e20b27] transition-colors duration-200">
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  {featured.excerpt && (
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {featured.tags && featured.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featured.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Author Profile Lockup + Primary Action Button */}
                <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {featured.author_avatar ? (
                      <img
                        src={mediaUrl(featured.author_avatar)}
                        alt={featured.author_name || 'Author'}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a1053] to-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-100 shrink-0">
                        {featuredInitials}
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {featured.author_name || 'Codigix Team'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {featured.author_role || 'Growth Strategist'}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featured.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1053] hover:bg-[#e20b27] text-white rounded-full font-bold text-xs sm:text-sm shadow-md shadow-[#1a1053]/15 transition-all duration-300 group/btn"
                  >
                    <span>Read Article</span>
                    <ArrowRight
                      size={15}
                      className="group-hover/btn:translate-x-1 transition-transform duration-200"
                    />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Section Header for Standard Articles */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <TrendingUp size={20} className="text-[#e20b27]" />
            <h2 className="text-lg md:text-xl font-extrabold text-[#1a1053] tracking-tight">
              {featured ? 'Latest Research & Guides' : 'All Insights'}
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Showing {meta.total} Article{meta.total === 1 ? '' : 's'}
          </span>
        </div>

        {/* Dynamic Card Grid */}
        {grid.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grid.map((post, i) => (
              <BlogCard key={post.id} post={post} priority={i < 3} />
            ))}

            {/* In-Grid Editorial Feature Callout Card (shows when browsing all posts on page 1) */}
            {!search && !activeTag && meta.page === 1 && grid.length >= 3 && (
              <div className="bg-gradient-to-br from-[#1a1053] via-[#21166b] to-[#12093d] rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 bg-[#e20b27]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-44 h-44 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#ff7582] text-xs font-bold uppercase tracking-wider mb-5 border border-white/10">
                    <Sparkles size={12} />
                    Free Clinic Audit
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3 text-white leading-snug">
                    Want More High-Intent Patients From Google?
                  </h3>
                  <p className="text-indigo-100/80 text-sm leading-relaxed mb-6">
                    Get an in-depth audit of your Google Maps 3-pack visibility, keyword rankings, and website conversion bottlenecks.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-between w-full px-5 py-3 rounded-full bg-white text-[#1a1053] hover:bg-[#e20b27] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg"
                  >
                    <span>Request Free Audit</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          !featured && (
            <div className="text-center bg-white rounded-3xl border border-slate-200/80 py-20 px-6 max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <Search size={28} />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1053] mb-2">No articles found</h2>
              <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                We couldn&apos;t find any articles matching your search criteria. Try a different query or explore our main categories.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1053] hover:bg-[#e20b27] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                View all articles
              </Link>
            </div>
          )
        )}

        {/* Enhanced Pagination */}
        {meta.pages > 1 && (
          <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-16">
            {meta.page > 1 ? (
              <Link
                href={pageHref(basePath, meta.page - 1, filterParams)}
                rel="prev"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-[#1a1053] hover:text-[#1a1053] transition-colors shadow-sm"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </Link>
            ) : null}
            {Array.from({ length: meta.pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={pageHref(basePath, p, filterParams)}
                aria-current={p === meta.page ? 'page' : undefined}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-all shadow-sm ${p === meta.page
                  ? 'bg-[#1a1053] text-white border-[#1a1053] shadow-md shadow-[#1a1053]/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-[#1a1053] hover:text-[#1a1053]'
                  }`}
              >
                {p}
              </Link>
            ))}
            {meta.page < meta.pages ? (
              <Link
                href={pageHref(basePath, meta.page + 1, filterParams)}
                rel="next"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-[#1a1053] hover:text-[#1a1053] transition-colors shadow-sm"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </Link>
            ) : null}
          </nav>
        )}

        {/* Redesigned Popular Topics Tag Cloud */}
        {tags.length > 0 && (
          <div className="mt-20 pt-10 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Explore Popular Topics
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {tags.length} Topics
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {tags.slice(0, 20).map((t) => {
                const isActive = activeTag === t.name;
                return (
                  <Link
                    key={t.name}
                    href={`/blog?tag=${encodeURIComponent(t.name)}`}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${isActive
                      ? 'bg-[#1a1053] border-[#1a1053] text-white shadow-sm'
                      : 'bg-white border-slate-200/90 text-slate-600 hover:border-[#1a1053] hover:text-[#1a1053] hover:bg-slate-50'
                      }`}
                  >
                    <span>#{t.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                        }`}
                    >
                      {t.count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
