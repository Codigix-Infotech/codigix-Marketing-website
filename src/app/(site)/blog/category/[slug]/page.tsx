import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogHero from '@/components/blog/BlogHero';
import CtaSection from '@/components/home/CtaSection';
import BlogListing from '@/components/blog/BlogListing';
import { getBlogCategories, getBlogs, getBlogTags, getSettings } from '@/lib/api';
import { absoluteUrl, SITE_URL } from '@/lib/config';
import { jsonLd, withTemplate } from '@/lib/seo';

type Props = { params: { slug: string }; searchParams: { page?: string } };

async function findCategory(slug: string) {
  const categories = await getBlogCategories();
  return { category: categories.find((c) => c.slug === slug), categories };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const [{ category }, { seo }] = await Promise.all([findCategory(params.slug), getSettings()]);
  if (!category) return { title: 'Category not found', robots: { index: false } };
  const page = Number(searchParams.page) || 1;
  const title = (category.meta_title || `${category.name} Articles`) + (page > 1 ? ` – Page ${page}` : '');
  const description = category.meta_description || category.description || `Latest ${category.name} insights from Codigix.`;
  const path = `/blog/category/${category.slug}`;
  const image = absoluteUrl(seo.default_og_image || '/logo.png');
  return {
    title: withTemplate(seo.title_template, title),
    description,
    alternates: { canonical: page > 1 ? `${path}?page=${page}` : path },
    openGraph: { title, description, url: `${SITE_URL}${path}`, type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function BlogCategoryPage({ params, searchParams }: Props) {
  const { category, categories } = await findCategory(params.slug);
  if (!category) notFound();
  const page = Math.max(1, Number(searchParams.page) || 1);
  const [{ data: posts, meta }, tags] = await Promise.all([
    getBlogs({ page, limit: 9, category: category.slug }),
    getBlogTags(),
  ]);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: category.name, item: `${SITE_URL}/blog/category/${category.slug}` },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* eslint-disable-next-line @next/next/no-script-component */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <BlogHero
        categoryName={category.name}
        categorySlug={category.slug}
        subtitle={category.description || `Everything we've written about ${category.name.toLowerCase()}.`}
        totalPosts={meta.total}
        categories={categories}
      />
      <BlogListing
        posts={posts}
        meta={meta}
        categories={categories}
        tags={tags}
        activeCategory={category.slug}
        basePath={`/blog/category/${category.slug}`}
      />
      <CtaSection />
    </div>
  );
}
