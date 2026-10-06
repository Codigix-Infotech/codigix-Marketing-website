import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, ChevronRight, Clock, ListOrdered, Plus, RefreshCw, ShieldCheck, Star, Tag } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import { ReadingProgress, ShareButtons, TableOfContents, ViewTracker } from '@/components/blog/ArticleWidgets';
import CtaSection from '@/components/home/CtaSection';
import { getBlog, getBlogSitemap, getSettings } from '@/lib/api';
import { absoluteUrl, mediaUrl, SITE_URL, INDEXABLE } from '@/lib/config';
import { formatDate, jsonLd, withTemplate } from '@/lib/seo';

type Props = { params: { slug: string } };

// Prerender published posts at build time (ISR); posts published later render on first visit and are then cached.
export async function generateStaticParams() {
  const { data } = await getBlogSitemap();
  return data.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [res, { seo }] = await Promise.all([getBlog(params.slug), getSettings()]);
  if (!res) return { title: 'Article not found', robots: { index: false } };
  const post = res.data;
  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || '';
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = absoluteUrl(post.og_image || post.cover_image);
  const postTags = Array.isArray(post.tags) ? post.tags : [];
  const keywords = [post.focus_keyword, ...(post.secondary_keywords || '').split(','), ...postTags]
    .map((k) => (k || '').trim())
    .filter(Boolean);

  return {
    // meta_title is written as the full <title>; otherwise apply the site template.
    title: post.meta_title || withTemplate(seo.title_template, post.title),
    description,
    keywords: keywords.length ? keywords : undefined,
    authors: post.author_name ? [{ name: post.author_name }] : undefined,
    alternates: { canonical: post.canonical_url || `/blog/${post.slug}` },
    robots: { index: INDEXABLE && post.robots_index, follow: INDEXABLE && post.robots_follow },
    openGraph: {
      type: 'article',
      url,
      title: post.og_title || title,
      description: post.og_description || description,
      images: image ? [{ url: image, alt: post.cover_image_alt || post.title }] : undefined,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: post.author_name ? [post.author_name] : undefined,
      section: post.category_name || undefined,
      tags: postTags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.og_title || title,
      description: post.og_description || description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const [res, { site }] = await Promise.all([getBlog(params.slug), getSettings()]);
  if (!res) notFound();
  const { data: post, related = [], prev = null, next = null } = res;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const updated = post.updated_at && new Date(post.updated_at).getTime() - new Date(post.published_at).getTime() > 86400000;

  // Medical review (E-E-A-T): schema.org puts reviewedBy/lastReviewed on the WebPage.
  const reviewer = post.reviewed_by?.trim()
    ? { '@type': 'Person', name: post.reviewed_by.trim(), jobTitle: post.reviewer_credentials || undefined }
    : undefined;
  const review = reviewer ? { reviewedBy: reviewer, lastReviewed: post.last_reviewed_at ? String(post.last_reviewed_at).slice(0, 10) : undefined } : {};

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: post.meta_title || post.title,
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      ...review,
    },
    {
      '@type': post.schema_type || 'BlogPosting',
      '@id': `${url}#article`,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      ...(post.schema_type === 'MedicalWebPage' ? review : {}),
      headline: post.title.slice(0, 110),
      description: post.meta_description || post.excerpt || undefined,
      image: post.cover_image ? [absoluteUrl(post.cover_image)] : undefined,
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      wordCount: post.word_count || undefined,
      timeRequired: `PT${post.reading_time}M`,
      keywords: [post.focus_keyword, ...(Array.isArray(post.tags) ? post.tags : [])].filter(Boolean).join(', ') || undefined,
      articleSection: post.category_name || undefined,
      inLanguage: 'en-IN',
      author: {
        '@type': post.author_name && post.author_name !== site.name ? 'Person' : 'Organization',
        name: post.author_name || site.name,
        jobTitle: post.author_role || undefined,
        image: post.author_avatar ? absoluteUrl(post.author_avatar) : undefined,
        url: post.author_url || undefined,
        sameAs: post.author_url ? [post.author_url] : undefined,
      },
      publisher: {
        '@type': 'Organization',
        name: site.name,
        logo: { '@type': 'ImageObject', url: absoluteUrl(site.logo || '/logo.png') },
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        ...(post.category_slug
          ? [{ '@type': 'ListItem', position: 3, name: post.category_name, item: `${SITE_URL}/blog/category/${post.category_slug}` }]
          : []),
        { '@type': 'ListItem', position: post.category_slug ? 4 : 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  // Editor-supplied JSON-LD: only publish it if it parses, and re-serialise it safely so a
  // stray "</script>" in the admin field can't break out of the tag.
  let customSchema: unknown;
  if (post.custom_schema?.trim()) {
    try {
      customSchema = JSON.parse(post.custom_schema);
    } catch {
      console.warn(`[blog] invalid custom_schema JSON on "${post.slug}", skipped`);
    }
  }

  const published = formatDate(post.published_at, { day: 'numeric', month: 'long', year: 'numeric' });
  const modified = updated ? formatDate(post.updated_at, { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const reviewedOn = post.last_reviewed_at ? formatDate(post.last_reviewed_at, { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const authorName = post.author_name || site.name || 'Codigix Infotech';
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const toc = post.toc || [];

  const Avatar = ({ size }: { size: 'sm' | 'lg' }) =>
    post.author_avatar ? (
      <img
        src={mediaUrl(post.author_avatar)}
        alt={authorName}
        className={`${size === 'sm' ? 'w-12 h-12' : 'w-16 h-16'} rounded-full object-cover ring-2 ring-white shadow-sm shrink-0`}
      />
    ) : (
      <span
        aria-hidden="true"
        className={`${size === 'sm' ? 'w-12 h-12 text-lg' : 'w-16 h-16 text-2xl'} rounded-full bg-gradient-to-br from-[#1a1053] to-[#3b2a9e] text-white flex items-center justify-center font-bold ring-2 ring-white shadow-sm shrink-0`}
      >
        {authorName.charAt(0)}
      </span>
    );

  const AuthorName = ({ className }: { className: string }) =>
    post.author_url ? (
      <a href={post.author_url} rel="author noopener" target="_blank" className={`${className} hover:text-[#e20b27] transition-colors`}>
        {authorName}
      </a>
    ) : (
      <span className={className}>{authorName}</span>
    );

  const details: { label: string; value: React.ReactNode }[] = [
    ...(post.category_name
      ? [{ label: 'Category', value: <Link href={`/blog/category/${post.category_slug}`} className="text-[#1a1053] hover:text-[#e20b27] font-semibold">{post.category_name}</Link> }]
      : []),
    { label: 'Published', value: <time dateTime={post.published_at}>{published}</time> },
    ...(modified ? [{ label: 'Updated', value: <time dateTime={post.updated_at}>{modified}</time> }] : []),
    { label: 'Reading time', value: `${post.reading_time} min` },
    ...(post.word_count ? [{ label: 'Length', value: `${post.word_count.toLocaleString('en-IN')} words` }] : []),
    ...(reviewer ? [{ label: 'Reviewed by', value: reviewer.name }] : []),
  ];

  return (
    <div className="bg-white">
      {/* eslint-disable-next-line @next/next/no-script-component */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({ '@context': 'https://schema.org', '@graph': graph })} />
      {customSchema !== undefined && (
        /* eslint-disable-next-line @next/next/no-script-component */
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(customSchema)} />
      )}
      <ReadingProgress />
      <ViewTracker slug={post.slug} />

      {/* ---------------- Hero ---------------- */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#f5f6fd] to-white pt-28 pb-10 lg:pt-36 lg:pb-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '44px 44px', maskImage: 'linear-gradient(to bottom, black, transparent)' }}
        />
        <div className="relative container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 mb-7">
            <Link href="/" className="hover:text-[#1a1053] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-slate-300" />
            <Link href="/blog" className="hover:text-[#1a1053] transition-colors">Blog</Link>
            {post.category_slug && (
              <>
                <ChevronRight size={14} className="text-slate-300" />
                <Link href={`/blog/category/${post.category_slug}`} className="hover:text-[#1a1053] transition-colors">{post.category_name}</Link>
              </>
            )}
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            {post.category_name && (
              <Link
                href={`/blog/category/${post.category_slug}`}
                className="inline-flex items-center rounded-full bg-[#1a1053] px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#e20b27] transition-colors"
              >
                {post.category_name}
              </Link>
            )}
            {post.is_featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-700">
                <Star size={11} className="fill-amber-500 text-amber-500" /> Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-[2.75rem] lg:text-5xl font-bold text-[#1a1053] leading-[1.15] tracking-tight mb-5 text-balance">
            {post.title}
          </h1>

          {post.excerpt && <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>}

          {/* Byline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-6 border-t border-slate-200/80">
            <div className="flex items-center gap-3.5">
              <Avatar size="sm" />
              <div className="min-w-0">
                <p className="text-[15px] leading-tight">
                  <span className="text-slate-500">By </span>
                  <AuthorName className="font-semibold text-slate-900" />
                  {post.author_role && <span className="text-slate-500"> · {post.author_role}</span>}
                </p>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} /><time dateTime={post.published_at}>{published}</time></span>
                  {modified && <span className="inline-flex items-center gap-1.5"><RefreshCw size={12} />Updated <time dateTime={post.updated_at}>{modified}</time></span>}
                  <span className="inline-flex items-center gap-1.5"><Clock size={13} />{post.reading_time} min read</span>
                </p>
              </div>
            </div>
            <ShareButtons url={url} title={post.title} />
          </div>

          {reviewer && (
            <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-900">
              <ShieldCheck size={18} className="shrink-0 text-emerald-600 mt-px" />
              <span>
                Medically reviewed by <strong className="font-semibold">{reviewer.name}</strong>
                {post.reviewer_credentials ? `, ${post.reviewer_credentials}` : ''}
                {reviewedOn && <span className="text-emerald-700"> · <time dateTime={String(post.last_reviewed_at)}>{reviewedOn}</time></span>}
              </span>
            </p>
          )}
        </div>
      </header>

      {/* ---------------- Cover ---------------- */}
      {post.cover_image && (
        <div className="container mx-auto px-4 max-w-6xl">
          <figure className="rounded-3xl overflow-hidden bg-slate-100 aspect-[16/8] shadow-[0_24px_60px_-24px_rgba(26,16,83,0.35)] ring-1 ring-slate-900/5">
            <img src={mediaUrl(post.cover_image)} alt={post.cover_image_alt || post.title} className="w-full h-full object-cover" fetchPriority="high" />
          </figure>
        </div>
      )}

      {/* ---------------- Body ---------------- */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_300px] gap-12 xl:gap-16">
          <article id="article-body" className="min-w-0 max-w-[46rem]">
            {/* Contents — mobile / tablet */}
            {toc.length > 1 && (
              <details className="lg:hidden mb-10 rounded-2xl border border-slate-200 bg-slate-50/60 [&_summary::-webkit-details-marker]:hidden group">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-[#1a1053]">
                  <span className="inline-flex items-center gap-2"><ListOrdered size={17} /> In this article</span>
                  <ChevronDown size={18} className="text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <ol className="px-5 pb-5 space-y-2 text-[15px]">
                  {toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
                      <a href={`#${item.id}`} className="text-slate-600 hover:text-[#e20b27]">{item.text}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <div
              className="article-content prose prose-lg prose-slate max-w-none
                prose-headings:text-[#1a1053] prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-[1.75rem] prose-h2:leading-snug
                prose-h3:mt-9 prose-h3:mb-3 prose-h3:text-[1.3rem]
                prose-p:text-slate-700 prose-p:leading-[1.85]
                prose-a:text-[#e20b27] prose-a:font-medium prose-a:underline prose-a:decoration-[#e20b27]/30 prose-a:underline-offset-4 hover:prose-a:decoration-[#e20b27]
                prose-img:rounded-2xl prose-img:shadow-sm prose-img:my-10
                prose-blockquote:border-l-4 prose-blockquote:border-[#e20b27] prose-blockquote:bg-[#f7f7fc] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-slate-700 prose-blockquote:not-italic prose-blockquote:font-medium
                prose-strong:text-slate-900
                prose-li:my-1.5 prose-li:text-slate-700 prose-li:marker:text-[#e20b27]
                prose-code:text-[#1a1053] prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-medium prose-code:before:content-none prose-code:after:content-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* FAQs */}
            {post.faqs?.length > 0 && (
              <section aria-labelledby="faq-heading" className="mt-16">
                <p className="text-xs font-bold uppercase tracking-widest text-[#e20b27] mb-2">Quick answers</p>
                <h2 id="faq-heading" className="text-2xl md:text-[1.75rem] font-bold text-[#1a1053] mb-6">Frequently asked questions</h2>
                <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 overflow-hidden">
                  {post.faqs.map((f, i) => (
                    <details key={i} className="group bg-white open:bg-[#fafbfe] [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
                      <summary className="flex items-start justify-between gap-4 cursor-pointer list-none px-6 py-5 font-semibold text-[17px] text-slate-900">
                        {f.question}
                        <span className="mt-0.5 w-7 h-7 shrink-0 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 group-open:rotate-45 group-open:border-[#e20b27] group-open:text-[#e20b27] transition-all">
                          <Plus size={15} />
                        </span>
                      </summary>
                      <p className="px-6 pb-6 -mt-1 text-slate-600 leading-relaxed">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Tags + share */}
            <div className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-slate-200">
              {tags.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Tag size={15} className="text-slate-400 mr-1" aria-hidden="true" />
                  {tags.map((t) => (
                    <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="px-3 py-1.5 rounded-full bg-slate-100 text-[13px] font-medium text-slate-600 hover:bg-[#1a1053] hover:text-white transition-colors">
                      #{t}
                    </Link>
                  ))}
                </div>
              ) : <span />}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-semibold text-slate-500">Share</span>
                <ShareButtons url={url} title={post.title} />
              </div>
            </div>

            {/* Author & reviewer */}
            <div className={`mt-10 grid gap-5 ${reviewer ? 'md:grid-cols-2' : ''}`}>
              <section aria-label="About the author" className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#fafbfe] to-white p-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">About the author</p>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar size="lg" />
                  <div className="min-w-0">
                    <AuthorName className="block text-lg font-bold text-slate-900" />
                    {post.author_role && <p className="text-sm text-slate-500">{post.author_role}</p>}
                  </div>
                </div>
                {post.author_bio && <p className="text-[15px] text-slate-600 leading-relaxed">{post.author_bio}</p>}
                {post.author_url && (
                  <a href={post.author_url} rel="author noopener" target="_blank" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a1053] hover:text-[#e20b27]">
                    View profile <ArrowUpRight size={15} />
                  </a>
                )}
              </section>

              {reviewer && (
                <section aria-label="Medical review" className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-white p-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 mb-4">Medically reviewed</p>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 ring-2 ring-white shadow-sm">
                      <ShieldCheck size={28} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-lg font-bold text-slate-900">{reviewer.name}</p>
                      {post.reviewer_credentials && <p className="text-sm text-slate-600">{post.reviewer_credentials}</p>}
                    </div>
                  </div>
                  <p className="text-[15px] text-slate-600 leading-relaxed">
                    The medical information in this article was checked for accuracy{reviewedOn ? <> on <time dateTime={String(post.last_reviewed_at)}>{reviewedOn}</time></> : ''}.
                  </p>
                </section>
              )}
            </div>

            {/* Prev / next */}
            {(prev || next) && (
              <nav aria-label="More articles" className="mt-10 grid sm:grid-cols-2 gap-4">
                {prev ? (
                  <Link href={`/blog/${prev.slug}`} className="group p-5 rounded-2xl border border-slate-200 hover:border-[#1a1053]/30 hover:shadow-md transition-all flex flex-col">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2"><ArrowLeft size={14} /> Previous article</span>
                    <span className="font-semibold text-slate-900 group-hover:text-[#e20b27] transition-colors line-clamp-2">{prev.title}</span>
                  </Link>
                ) : <span className="hidden sm:block" />}
                {next && (
                  <Link href={`/blog/${next.slug}`} className="group p-5 rounded-2xl border border-slate-200 hover:border-[#1a1053]/30 hover:shadow-md transition-all flex flex-col sm:items-end sm:text-right">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Next article <ArrowRight size={14} /></span>
                    <span className="font-semibold text-slate-900 group-hover:text-[#e20b27] transition-colors line-clamp-2">{next.title}</span>
                  </Link>
                )}
              </nav>
            )}
          </article>

          {/* ---------------- Sidebar ---------------- */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <TableOfContents items={toc} />

              <section aria-label="Article details" className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Article details</p>
                <dl className="text-sm divide-y divide-slate-100">
                  {details.map((d) => (
                    <div key={d.label} className="flex items-center justify-between gap-3 py-2.5">
                      <dt className="text-slate-500">{d.label}</dt>
                      <dd className="text-right text-slate-800 font-medium">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1053] to-[#2d1d8a] p-6 text-white">
                <div aria-hidden="true" className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-[#e20b27]/25 blur-2xl" />
                <p className="relative text-[11px] font-bold uppercase tracking-widest text-white/60 mb-3">Free audit</p>
                <p className="relative text-xl font-bold leading-snug text-white mb-2">Want this working for your clinic?</p>
                <p className="relative text-sm text-white/75 leading-relaxed mb-5">Get a free SEO &amp; Google Maps audit with a clear action plan for your practice.</p>
                <Link href="/contact" className="relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#1a1053] hover:bg-[#e20b27] hover:text-white transition-colors">
                  Request free audit <ArrowRight size={15} />
                </Link>
              </section>
            </div>
          </aside>
        </div>
      </div>

      {/* ---------------- Related ---------------- */}
      {Array.isArray(related) && related.length > 0 && (
        <section className="py-20 lg:py-24 bg-[#f7f8fd] border-t border-slate-200/70">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#e20b27] mb-2">Keep reading</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1053]">
                  {post.category_name ? `More on ${post.category_name}` : 'Related articles'}
                </h2>
              </div>
              <Link href={post.category_slug ? `/blog/category/${post.category_slug}` : '/blog'} className="inline-flex items-center gap-2 font-semibold text-[#1a1053] hover:text-[#e20b27] transition-colors">
                View all articles <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p) => <BlogCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </div>
  );
}
