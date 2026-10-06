import type { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import CtaSection from '@/components/home/CtaSection';
import BlogListing from '@/components/blog/BlogListing';
import { getBlogCategories, getBlogs, getBlogTags, getSettings } from '@/lib/api';
import { absoluteUrl, SITE_URL } from '@/lib/config';
import { jsonLd, withTemplate } from '@/lib/seo';

type SearchParams = { page?: string; tag?: string; q?: string };

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { seo } = await getSettings();
  const page = Number(searchParams.page) || 1;
  const title = page > 1 ? `${seo.blog_title} – Page ${page}` : seo.blog_title || 'Insights & Blog';
  const description = seo.blog_description;
  // Search and tag result pages are thin/duplicate content: keep them out of the index.
  const filtered = Boolean(searchParams.q || searchParams.tag);
  const image = absoluteUrl(seo.default_og_image || '/logo.png');
  return {
    title: withTemplate(seo.title_template, title),
    description,
    alternates: { canonical: page > 1 && !filtered ? `/blog?page=${page}` : '/blog' },
    robots: filtered ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: `${SITE_URL}/blog`, type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const [{ data: posts, meta }, categories, tags, { site, seo }] = await Promise.all([
    getBlogs({ page, limit: 10, tag: searchParams.tag, search: searchParams.q }),
    getBlogCategories(),
    getBlogTags(),
    getSettings(),
  ]);

  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: seo.blog_title,
        description: seo.blog_description,
        url: `${SITE_URL}/blog`,
        publisher: { '@type': 'Organization', name: site.name, logo: absoluteUrl(site.logo || '/logo.png') },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.published_at,
          image: p.cover_image ? absoluteUrl(p.cover_image) : undefined,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <BlogHero
        totalPosts={meta.total}
        categories={categories}
        activeTag={searchParams.tag}
        searchQuery={searchParams.q}
      />
      <BlogListing
        posts={posts}
        meta={meta}
        categories={categories}
        tags={tags}
        activeTag={searchParams.tag}
        search={searchParams.q}
        basePath="/blog"
      />
      <CtaSection />
    </div>
  );
}
