export interface SeoInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  cover_image: string;
  cover_image_alt: string;
  author_name?: string;
  author_bio?: string;
  reviewed_by?: string;
  schema_type?: string;
  custom_schema?: string;
}

export interface SeoCheck {
  id: string;
  label: string;
  status: 'good' | 'warn' | 'bad';
  group: 'Keyword' | 'Meta' | 'Content' | 'Readability' | 'Trust';
}

export const stripHtml = (html: string) =>
  html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

export function countWords(html: string) {
  const text = stripHtml(html);
  return text ? text.split(' ').length : 0;
}

export function analyzeSeo(p: SeoInput): { score: number; checks: SeoCheck[]; words: number; density: number } {
  const checks: SeoCheck[] = [];
  const add = (id: string, group: SeoCheck['group'], status: SeoCheck['status'], label: string) => checks.push({ id, group, status, label });

  const text = stripHtml(p.content || '');
  const words = text ? text.split(' ').length : 0;
  const kw = norm(p.focus_keyword.trim());
  const seoTitle = p.meta_title || p.title;
  const metaDesc = p.meta_description || p.excerpt;
  const kwRe = kw ? new RegExp(`(^|[^a-z0-9])${escapeRe(kw)}([^a-z0-9]|$)`, 'gi') : null;
  const has = (s: string) => (kwRe ? new RegExp(kwRe.source, 'i').test(norm(s)) : false);
  const occurrences = kwRe ? (norm(text).match(kwRe) || []).length : 0;
  const kwWords = kw ? kw.split(/\s+/).length : 1;
  const density = words ? (occurrences * kwWords * 100) / words : 0;

  /* Keyword */
  if (!kw) {
    add('kw', 'Keyword', 'bad', 'Set a focus keyword — the main search phrase this post should rank for.');
  } else {
    add('kw-title', 'Keyword', has(seoTitle) ? 'good' : 'bad', has(seoTitle) ? 'Focus keyword appears in the SEO title.' : 'Add the focus keyword to the SEO title (ideally near the start).');
    add('kw-desc', 'Keyword', has(metaDesc) ? 'good' : 'bad', has(metaDesc) ? 'Focus keyword appears in the meta description.' : 'Use the focus keyword in the meta description.');
    const slugHas = norm(p.slug).includes(kw.replace(/\s+/g, '-'));
    add('kw-slug', 'Keyword', slugHas ? 'good' : 'warn', slugHas ? 'Focus keyword is in the URL.' : 'Include the focus keyword in the URL slug.');
    const intro = stripHtml((p.content.match(/<p[^>]*>[\s\S]*?<\/p>/i) || [''])[0]);
    add('kw-intro', 'Keyword', has(intro) ? 'good' : 'warn', has(intro) ? 'Focus keyword appears in the first paragraph.' : 'Mention the focus keyword in the introduction (first paragraph).');
    const headings = (p.content.match(/<h[23][^>]*>[\s\S]*?<\/h[23]>/gi) || []).map(stripHtml).join(' ');
    add('kw-heading', 'Keyword', has(headings) ? 'good' : 'warn', has(headings) ? 'Focus keyword is used in a subheading.' : 'Use the focus keyword in at least one H2/H3 subheading.');
    if (words >= 100) {
      const ok = density >= 0.5 && density <= 2.5;
      add(
        'kw-density',
        'Keyword',
        ok ? 'good' : density > 2.5 ? 'bad' : 'warn',
        ok
          ? `Keyword density is ${density.toFixed(1)}% — well balanced.`
          : density > 2.5
            ? `Keyword density is ${density.toFixed(1)}% — this looks like keyword stuffing. Aim for 0.5–2.5%.`
            : `Keyword density is ${density.toFixed(1)}% (${occurrences}×). Use it a bit more — aim for 0.5–2.5%.`
      );
    }
  }

  /* Meta */
  const tl = seoTitle.length;
  add('title-len', 'Meta', tl >= 30 && tl <= 60 ? 'good' : tl === 0 || tl > 70 ? 'bad' : 'warn',
    tl >= 30 && tl <= 60 ? `SEO title length is ${tl} characters — good.` : `SEO title is ${tl} characters. Aim for 30–60 so Google doesn't cut it off.`);
  const dl = metaDesc.length;
  add('desc-len', 'Meta', dl >= 120 && dl <= 160 ? 'good' : dl === 0 ? 'bad' : 'warn',
    dl === 0 ? 'Write a meta description (120–160 characters) to control your Google snippet.' : dl >= 120 && dl <= 160 ? `Meta description length is ${dl} characters — good.` : `Meta description is ${dl} characters. Aim for 120–160.`);
  add('slug-len', 'Meta', p.slug && p.slug.length <= 75 ? 'good' : 'warn', p.slug.length <= 75 ? 'URL slug is short and clean.' : 'Shorten the URL slug (under 75 characters).');
  add('cover', 'Meta', p.cover_image && p.cover_image_alt ? 'good' : p.cover_image ? 'warn' : 'bad',
    p.cover_image && p.cover_image_alt ? 'Cover image has alt text (used for social sharing & Google Images).' : p.cover_image ? 'Add alt text to the cover image.' : 'Add a cover image — it is used in listings, social shares and Google Discover.');

  /* Content */
  add('length', 'Content', words >= 600 ? 'good' : words >= 300 ? 'warn' : 'bad',
    words >= 600 ? `${words} words — good depth for ranking.` : `${words} words. In-depth posts (600+ words, ideally 1,000+) rank better.`);
  const h2 = (p.content.match(/<h2[\s>]/gi) || []).length;
  add('headings', 'Content', h2 >= 2 ? 'good' : 'warn', h2 >= 2 ? `${h2} H2 subheadings structure the article.` : 'Break the article into sections with at least 2 H2 subheadings.');
  const links = Array.from(p.content.matchAll(/<a\s[^>]*href="([^"]+)"/gi)).map((m) => m[1]);
  const internal = links.filter((h) => h.startsWith('/') || /codigix\./i.test(h)).length;
  const external = links.length - internal;
  add('internal', 'Content', internal > 0 ? 'good' : 'warn', internal > 0 ? `${internal} internal link${internal > 1 ? 's' : ''} to other pages.` : 'Add internal links to related services or posts (e.g. /contact, /blog/…).');
  add('external', 'Content', external > 0 ? 'good' : 'warn', external > 0 ? `${external} outbound link${external > 1 ? 's' : ''} to sources.` : 'Link to at least one authoritative external source.');
  const imgs = p.content.match(/<img[^>]*>/gi) || [];
  const missingAlt = imgs.filter((t) => !/alt="[^"]+"/i.test(t)).length;
  if (imgs.length) {
    add('img-alt', 'Content', missingAlt === 0 ? 'good' : 'bad', missingAlt === 0 ? 'All images in the content have alt text.' : `${missingAlt} image${missingAlt > 1 ? 's are' : ' is'} missing alt text.`);
  } else {
    add('img', 'Content', 'warn', 'Add at least one image or visual inside the article.');
  }

  /* Readability */
  if (words >= 50) {
    const sentences = text.split(/[.!?]+\s/).filter((s) => s.trim().split(' ').length > 2);
    const avg = sentences.length ? words / sentences.length : words;
    add('sentences', 'Readability', avg <= 20 ? 'good' : avg <= 25 ? 'warn' : 'bad',
      avg <= 20 ? `Average sentence length is ${Math.round(avg)} words — easy to read.` : `Average sentence length is ${Math.round(avg)} words. Shorter sentences (≤20 words) read better.`);
    const paras = (p.content.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || []).map((x) => countWords(x));
    const long = paras.filter((n) => n > 150).length;
    add('paragraphs', 'Readability', long === 0 ? 'good' : 'warn', long === 0 ? 'Paragraphs are a comfortable length.' : `${long} paragraph${long > 1 ? 's are' : ' is'} over 150 words — split them up.`);
  }
  add('excerpt', 'Readability', p.excerpt ? 'good' : 'warn', p.excerpt ? 'Excerpt written for listings.' : 'Write a short excerpt — it shows on blog cards and the article header.');

  /* Trust (E-E-A-T): Google weighs expertise heavily for health topics */
  const author = (p.author_name || '').trim();
  add('author', 'Trust', author && (p.author_bio || '').trim() ? 'good' : author ? 'warn' : 'bad',
    author && (p.author_bio || '').trim() ? 'Author name and bio are shown — builds expertise signals.' : author ? 'Add a short author bio with their expertise or qualifications.' : 'Add an author name — anonymous health content ranks poorly.');
  const medical = p.schema_type === 'MedicalWebPage';
  const reviewed = !!(p.reviewed_by || '').trim();
  add('review', 'Trust', reviewed ? 'good' : medical ? 'bad' : 'warn',
    reviewed ? 'Medically reviewed by a named expert.' : medical ? 'Health information page: add the medical reviewer (doctor) who checked it.' : 'For health advice, add a medical reviewer — a strong trust signal for Google.');
  if ((p.custom_schema || '').trim()) {
    let valid = false;
    try { const v = JSON.parse(p.custom_schema!); valid = !!v && typeof v === 'object'; } catch { /* invalid */ }
    add('custom-schema', 'Meta', valid ? 'good' : 'bad', valid ? 'Custom schema is valid JSON-LD.' : 'Custom schema is not valid JSON — fix it or it will not be published.');
  }

  const weight = { good: 1, warn: 0.5, bad: 0 };
  const score = checks.length ? Math.round((checks.reduce((s, c) => s + weight[c.status], 0) / checks.length) * 100) : 0;
  return { score, checks, words, density };
}
