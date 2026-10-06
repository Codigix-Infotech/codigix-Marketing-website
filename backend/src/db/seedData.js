// Initial content: mirrors what was hard-coded in the website before the CMS existed.

export const settings = {
  site: {
    name: 'Codigix Infotech',
    tagline: 'Healthcare Digital Marketing Agency',
    description:
      "Pune's dedicated healthcare digital growth agency — driving organic SEO, Google Maps visibility, high-DA backlinks, and viral social reach for hospitals and clinics.",
    logo: '/logo.png',
    newsletter_title: 'Join our Newsletter',
    newsletter_text:
      'Get the latest healthcare SEO insights, Google Maps strategies, and patient acquisition trends delivered straight to your inbox.',
  },
  seo: {
    default_title: 'Healthcare Digital Marketing Agency | Codigix Infotech',
    title_template: '%s | Codigix Infotech',
    default_description:
      'Grow your clinic or hospital with Pune’s top healthcare digital marketing agency. Proven Healthcare SEO, GMB Google Maps 3-Pack, High-DA Backlinks & Social Media Growth to get more patient appointments.',
    default_og_image: '',
    twitter_handle: '',
    google_site_verification: '',
    blog_title: 'Insights & Blog',
    blog_description:
      'Read the latest insights, news, and trends in healthcare digital marketing, SEO, Google Maps and patient acquisition from the Codigix team.',
  },
  contact: {
    address_line1: 'Office No. 309, Bramha Sky Uzuri',
    address_line2: 'Old BP Road, Masulkar Colony, Pimpri-Chinchwad',
    city: 'Pune',
    state: 'Maharashtra',
    postal_code: '411018',
    country: 'India',
    phone: '+91 98765 43210',
    phone_secondary: '+91 84462 76449',
    whatsapp: '+919876543210',
    email: 'info@codigix.co',
    careers_email: 'careers@codigix.com',
    working_hours: 'Mon – Sat, 10:00 AM – 7:00 PM',
    map_embed_url: 'https://maps.google.com/maps?q=Bramha+Sky+Uzuri,+Masulkar+Colony,+Pimpri-Chinchwad,+Pune,+Maharashtra+411018&t=&z=16&ie=UTF8&iwloc=&output=embed',
    services: [
      'SEO Search Engine Optimization',
      'Paid Advertisements (PPC)',
      'Social Media Marketing',
      'E-Commerce Marketing',
      'Medical Content Marketing',
      'Web Design & Development',
      'Other',
    ],
  },
  social: {
    linkedin: '',
    instagram: '',
    facebook: '',
    youtube: '',
    twitter: '',
  },
  hero_dashboard: {
    metrics: [
      { title: 'Website Visitors', value: 24532, decimals: 0, suffix: '', isCurrency: false, trend: 28, icon: 'users', color: 'blue' },
      { title: 'Total Leads', value: 1248, decimals: 0, suffix: '', isCurrency: false, trend: 36, icon: 'filter', color: 'purple' },
      { title: 'Conversions', value: 214, decimals: 0, suffix: '', isCurrency: false, trend: 18, icon: 'target', color: 'emerald' },
      { title: 'Revenue (Attributed)', value: 28.4, decimals: 1, suffix: 'L', isCurrency: true, trend: 41, icon: 'coins', color: 'orange' },
      { title: 'Marketing ROI', value: 3.8, decimals: 1, suffix: 'x', isCurrency: false, trend: 26, icon: 'chart', color: 'indigo' },
    ],
    channels: [
      { name: 'Google Ads', value: '12,452', sub: 'Clicks', trend: 22, stat1: '1.8M Impressions', stat2: '₹ 320 CPC', progress: 68, icon: 'search', color: 'blue' },
      { name: 'Meta Ads', value: '18,324', sub: 'Clicks', trend: 34, stat1: '2.4M Impressions', stat2: '₹ 280 CPC', progress: 72, icon: 'users', color: 'blue' },
      { name: 'SEO (Organic)', value: '12.4K', sub: 'Organic Visits', trend: 42, stat1: '320 Keywords', stat2: '#1 Ranking', progress: 80, icon: 'search', color: 'emerald' },
      { name: 'Google Business Profile', value: '4,832', sub: 'Profile Views', trend: 38, stat1: '1,248 Calls', stat2: '986 Actions', progress: 76, icon: 'map-pin', color: 'blue' },
      { name: 'AEO (Answer Engine)', value: '2.8K', sub: 'Answer Clicks', trend: 45, stat1: '650 Brand Mentions', stat2: '', progress: 62, icon: 'target', color: 'indigo' },
      { name: 'Social Media', value: '210K', sub: 'Total Reach', trend: 28, stat1: '24K Engagements', stat2: '', progress: 70, icon: 'instagram', color: 'pink' },
    ],
    traffic_total: '24,532',
    traffic_axis: ['1 Sep', '10 Sep', '20 Sep', '30 Sep'],
    traffic_sources: [
      { label: 'Organic Search', pct: 42 },
      { label: 'Paid Ads', pct: 24 },
      { label: 'Direct', pct: 12 },
      { label: 'Social Media', pct: 10 },
      { label: 'Referral', pct: 8 },
    ],
    keywords: [
      { keyword: 'erp software', position: 1, change: 2, volume: '5.4K' },
      { keyword: 'crm software', position: 2, change: 1, volume: '3.2K' },
      { keyword: 'ai automation', position: 3, change: 3, volume: '2.8K' },
      { keyword: 'manufacturing erp', position: 4, change: 5, volume: '1.9K' },
      { keyword: 'healthcare software', position: 5, change: 1, volume: '1.6K' },
    ],
    content: [
      { title: 'What is ERP? (Video)', views: '12.4K', engagement: '8.4%' },
      { title: 'AI in Manufacturing', views: '8.2K', engagement: '6.1%' },
      { title: 'CRM for Business Growth', views: '6.9K', engagement: '5.8%' },
      { title: 'Digital Transformation', views: '5.1K', engagement: '4.9%' },
      { title: 'IoT in Industry 4.0', views: '4.8K', engagement: '4.2%' },
    ],
    ads: [
      { label: 'Spend', value: 48320, isCurrency: true, trend: 12, down: false },
      { label: 'Clicks', value: 12452, isCurrency: false, trend: 22, down: false },
      { label: 'Conversions', value: 326, isCurrency: false, trend: 18, down: false },
      { label: 'CPA', value: 148, isCurrency: true, trend: 14, down: true },
    ],
    funnel: [
      { label: 'Website Visitors', value: '24,532', pct: '100%', width: 100 },
      { label: 'Leads Captured', value: '1,248', pct: '5.1%', width: 25 },
      { label: 'Qualified Leads', value: '892', pct: '3.6%', width: 18 },
      { label: 'Proposals Sent', value: '426', pct: '1.7%', width: 8 },
      { label: 'Closed Customers', value: '214', pct: '0.9%', width: 4 },
    ],
  },
};

// `file` is copied from the project root into /uploads/clients on first seed.
export const clients = [
  { name: "Dr. Sheetal's Glow", location: 'Kothrud', file: "sheetal's_glow.png", is_healthcare: 1, map_x: 25, map_y: 25 },
  { name: 'Smiles For All', location: 'Pashan', file: 'simles_for_all.webp', is_healthcare: 1, map_x: 50, map_y: 15 },
  { name: 'Ayurlekha', location: 'Sangamwadi', file: 'aayurlekha.png', is_healthcare: 1, map_x: 35, map_y: 80 },
  { name: 'CorpLegal', location: 'Bavdhan', file: 'corplegal.png', is_healthcare: 0, map_x: 85, map_y: 50 },
  { name: 'Dr. Shagun Rao', location: 'Aundh', file: 'Dr_shagun_rao.webp', is_healthcare: 1, map_x: 75, map_y: 75 },
  { name: 'Shriraj Clinic', location: 'Bhosari', file: 'Shriraj Clinic Logo PNG.png', is_healthcare: 1, map_x: 15, map_y: 50 },
  { name: 'Sanskruti Agro Farm', location: 'Chakan', file: 'Sanskruti agro farm logo.jpg.jpeg', is_healthcare: 0, map_x: 35, map_y: 10 },
  { name: 'Moraya Multispeciality', location: 'Chinchwad', file: 'morya.png', is_healthcare: 1, map_x: 38, map_y: 35 },
  { name: 'Canopy Dental Care', location: 'Baner', file: 'canopy.png', is_healthcare: 1, map_x: 65, map_y: 20 },
  { name: 'Kimaya Brain & Spine', location: 'Kalewadi', file: 'kimya.webp', is_healthcare: 1, map_x: 15, map_y: 85 },
  { name: 'Bakul', location: 'Kharalwadi', file: 'bakul.png', is_healthcare: 0, map_x: 55, map_y: 85 },
  { name: 'Kitchen Canvas', location: 'Aundh', file: 'kitchen_canvas.jpg.jpeg', is_healthcare: 0, map_x: 90, map_y: 80 },
  { name: 'Regain', location: 'Wakad', file: 'regain.png', is_healthcare: 0, map_x: 85, map_y: 15 },
  { name: 'Shushrut Surgical Hospital', location: 'Pimpri', file: 'shushrut.png', is_healthcare: 1, map_x: 65, map_y: 40 },
  { name: 'Shushrut Piles Clinic', location: 'Pimpri', file: 'shushrut.png', is_healthcare: 1, map_x: 60, map_y: 60 },
  { name: 'Shushrut Clinic', location: 'Pimpri', file: 'shushrut.png', is_healthcare: 1, map_x: 10, map_y: 30 },
  { name: 'Viranjany', location: 'Wakad', file: 'viranjany.webp', is_healthcare: 0, map_x: 20, map_y: 65 },
];

export const videos = [
  { youtube_id: 'VkiY_0lhS04', category: 'Market Domination', title: 'Stop Competing. Start Dominating!', subtitle: 'Healthcare Market Leadership', description: 'Strategic playbook for clinics & hospitals to outrank local competition.', duration: '0:45' },
  { youtube_id: 'RhsvzzoOftQ', category: 'AI & Search Strategy', title: 'AI Search & Patient Discovery', subtitle: 'Future-Proof Your Practice', description: 'How modern clinics capture high-intent patients in the AI search era.', duration: '0:50' },
  { youtube_id: '2LCpb3gkv4w', category: 'Doctor Appreciation', title: "Dr. Sheetal's Glow Clinic", subtitle: 'Client Review & Feedback', description: 'Dr. Sheetal shares her growth experience & patient acquisition results.', duration: '0:42' },
  { youtube_id: 'Brzz1X9F-VE', category: 'Doctor Testimonial', title: 'Dr. Dipti Vaidya Recommendation', subtitle: '5-Star Verified Doctor Review', description: 'Dr. Dipti Vaidya on brand credibility and dedicated marketing execution.', duration: '0:38' },
];

export const testimonials = [
  { name: 'Rohan Deshpande', role: 'Retail Business Owner', content: 'Codigix transformed our online presence. Their team is professional, creative and truly understands business growth.', rating: 5 },
  { name: 'Neha Kulkarni', role: 'E-commerce Entrepreneur', content: 'Highly recommended for their strategic approach and timely execution. They deliver exactly what they promise.', rating: 5 },
  { name: 'Sandeep Patil', role: 'Manufacturing Business', content: 'A reliable and result-oriented team. They bring great ideas to the table and have excellent communication.', rating: 5 },
];

export const faqs = [
  { question: 'Do you specialize exclusively in healthcare digital marketing?', answer: 'Yes, Codigix Infotech focuses heavily on healthcare. We understand medical compliance (HIPAA), patient journey mapping, doctor authority branding, and the local SEO keywords needed to drive highly qualified patient appointments.' },
  { question: 'How long does it take to see results from Healthcare SEO & GMB?', answer: 'Google Business Profile (GMB) and local map optimizations typically show noticeable increases in patient calls within weeks. High-DA backlink building and organic keyword rankings steadily compound over 3 to 6 months for durable, long-term patient acquisition.' },
  { question: 'How do Instagram, Meta, and YouTube help our clinic?', answer: 'We produce informative patient education videos, doctor FAQs, and high-quality reels on Instagram, Meta Business, and YouTube. This builds profound trust and positions your practitioners as leading healthcare authorities in your region.' },
  { question: 'Can you redesign our clinic or hospital website for better patient conversions?', answer: 'Absolutely. We build lightning-fast, mobile-responsive, and HIPAA-compliant healthcare websites using Next.js and React, optimized specifically for fast load times and seamless patient booking.' },
];

export const categories = [
  { name: 'SEO Strategy', description: 'Search engine optimisation playbooks for clinics, hospitals and growing brands.' },
  { name: 'Local SEO & GMB', description: 'Google Business Profile, Maps 3-Pack and hyper-local visibility.' },
  { name: 'Social Media', description: 'Reels, YouTube and Meta strategies that build patient trust.' },
  { name: 'E-commerce', description: 'Conversion and growth tactics for online stores.' },
  { name: 'Healthcare Marketing', description: 'Compliant, patient-first digital marketing for healthcare providers.' },
];

const daysAgo = (n) => new Date(Date.now() - n * 86400000);

export const blogs = [
  {
    category: 'SEO Strategy',
    title: 'The Future of SEO in an AI-Driven World',
    slug: 'future-of-seo-in-an-ai-driven-world',
    excerpt: 'How search engines are evolving with AI Overviews and answer engines — and what clinics and businesses need to do to stay visible.',
    cover_image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=1600',
    cover_image_alt: 'Laptop showing search analytics on a desk',
    tags: ['SEO', 'AI Search', 'AEO', 'Google'],
    is_featured: 1,
    published_at: daysAgo(12),
    focus_keyword: 'future of SEO',
    meta_title: 'The Future of SEO in an AI-Driven World (2026 Guide)',
    meta_description: 'AI Overviews and answer engines are changing search. Learn how the future of SEO works and the exact steps clinics and businesses should take to stay visible.',
    content: `<p>The <strong>future of SEO</strong> is being rewritten by AI. Google's AI Overviews, ChatGPT search and Perplexity now answer many questions directly — so ranking is no longer just about ten blue links. It's about becoming the source those AI systems trust and cite.</p>
<h2>What is changing in search?</h2>
<p>Search engines increasingly summarise answers instead of sending every visitor to a website. For high-intent queries such as <em>"best dermatologist near me"</em> or <em>"piles treatment cost in Pune"</em>, users still click — but only on brands that appear credible, local and consistent across the web.</p>
<ul><li><strong>Answer Engine Optimisation (AEO):</strong> structuring content so AI can quote it accurately.</li><li><strong>Entity SEO:</strong> helping Google understand who your doctors are, what you treat and where you operate.</li><li><strong>Experience signals (E-E-A-T):</strong> real expertise, author credentials and reviews matter more than ever.</li></ul>
<h2>How to future-proof your SEO strategy</h2>
<h3>1. Answer real patient questions</h3>
<p>Build pages and blog posts around the exact questions patients ask before booking. Use clear H2/H3 headings, short paragraphs and FAQ sections so both people and AI can scan them.</p>
<h3>2. Strengthen your local entity</h3>
<p>Keep your Google Business Profile complete, consistent NAP (name, address, phone) data everywhere, and a steady stream of genuine reviews.</p>
<h3>3. Add structured data</h3>
<p>Schema markup such as <code>MedicalClinic</code>, <code>Physician</code>, <code>FAQPage</code> and <code>BlogPosting</code> tells search engines exactly what your content means.</p>
<h3>4. Publish with authority</h3>
<p>Show author names, qualifications and review dates on medical content. Link to trusted sources and keep older articles updated.</p>
<h2>Key takeaway</h2>
<p>SEO isn't dying — it's maturing. Brands that combine technical excellence, genuine expertise and helpful content will be the ones AI search recommends. Need help? <a href="/contact">Talk to the Codigix team</a> about an AI-ready SEO audit.</p>`,
    faqs: [
      { question: 'Is SEO still worth it with AI search?', answer: 'Yes. AI Overviews and answer engines still rely on well-optimised, authoritative websites as their sources, and high-intent searches continue to drive clicks and bookings.' },
      { question: 'What is AEO?', answer: 'Answer Engine Optimisation is the practice of structuring content so AI assistants and search features can understand, quote and cite it accurately.' },
    ],
  },
  {
    category: 'E-commerce',
    title: 'Maximizing E-commerce Conversions: 5 Proven Layout Changes',
    slug: 'maximizing-ecommerce-conversions',
    excerpt: 'Five proven layout changes that significantly improve cart and checkout conversion rates for online stores.',
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600',
    cover_image_alt: 'E-commerce analytics dashboard on a laptop',
    tags: ['E-commerce', 'CRO', 'UX'],
    is_featured: 0,
    published_at: daysAgo(28),
    focus_keyword: 'ecommerce conversions',
    meta_title: 'Maximizing E-commerce Conversions: 5 Proven Layout Changes',
    meta_description: 'Boost ecommerce conversions with five tested layout changes for product pages, carts and checkout — simple UX fixes that increase revenue.',
    content: `<p>Traffic is expensive. Improving <strong>ecommerce conversions</strong> is usually the fastest way to grow revenue without increasing ad spend. These five layout changes consistently move the needle.</p>
<h2>1. Put trust signals above the fold</h2>
<p>Ratings, delivery timelines and return policies should be visible next to the price — not hidden in the footer.</p>
<h2>2. Simplify the product page</h2>
<p>Lead with a sharp product image gallery, a benefit-driven title, price and a single high-contrast "Add to cart" button.</p>
<h2>3. Use a persistent mini-cart</h2>
<p>A slide-out cart keeps shoppers on the page and makes it easy to keep browsing.</p>
<h2>4. Offer guest checkout</h2>
<p>Forced account creation is one of the biggest causes of cart abandonment. Let customers create an account after purchase.</p>
<h2>5. Reduce checkout fields</h2>
<p>Every unnecessary field costs conversions. Use address autocomplete, UPI and wallet payments, and show progress clearly.</p>
<p>Want a conversion audit for your store? <a href="/contact">Get in touch</a>.</p>`,
    faqs: [],
  },
  {
    category: 'Social Media',
    title: 'Building a Brand on Social Media Beyond Vanity Metrics',
    slug: 'building-a-brand-on-social-media',
    excerpt: 'Moving beyond likes and followers to create genuine engagement that turns followers into patients and customers.',
    cover_image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1600',
    cover_image_alt: 'Smartphone showing social media apps',
    tags: ['Social Media', 'Instagram', 'YouTube', 'Branding'],
    is_featured: 0,
    published_at: daysAgo(41),
    focus_keyword: 'social media branding',
    meta_title: 'Social Media Branding Beyond Vanity Metrics | Codigix',
    meta_description: 'Social media branding that drives real business: how clinics and brands turn reels, YouTube and Instagram into trust, enquiries and bookings.',
    content: `<p>Likes feel good, but they don't pay the bills. Effective <strong>social media branding</strong> focuses on trust, recall and enquiries.</p>
<h2>Measure what matters</h2>
<p>Track saves, shares, profile visits, DMs and link clicks. These signals show intent far better than follower counts.</p>
<h2>Educate before you sell</h2>
<p>For healthcare brands, short doctor-led videos that answer common questions build authority and reassure patients before their first visit.</p>
<h2>Show real people</h2>
<p>Patient stories (with consent), behind-the-scenes clips and team introductions humanise your brand.</p>
<h2>Be consistent</h2>
<p>A predictable posting rhythm and a recognisable visual style matter more than occasional viral hits.</p>
<p>Ready to grow beyond vanity metrics? <a href="/social-media-marketing">Explore our social media services</a>.</p>`,
    faqs: [],
  },
  {
    category: 'Local SEO & GMB',
    title: 'Dominating Local Search: How PCMC Clinics Rank #1 on Google Maps 3-Pack',
    slug: 'dominating-local-search-pcmc-google-maps',
    excerpt: 'Step-by-step blueprint for multi-speciality clinics and hospitals to achieve consistent top 3 visibility in Google local map results.',
    cover_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600',
    cover_image_alt: 'Doctor reviewing medical results on tablet with modern clinic background',
    tags: ['Local SEO', 'GMB', 'Google Maps', 'Healthcare'],
    is_featured: 0,
    published_at: daysAgo(5),
    focus_keyword: 'local SEO Google Maps PCMC',
    meta_title: 'Dominating Local Search: PCMC Clinics on Google Maps | Codigix',
    meta_description: 'Discover how clinics in PCMC and Pune dominate the Google Maps 3-Pack with local SEO strategies, patient review funnels, and geo-targeted optimization.',
    content: `<p>When patients search for care in their vicinity, 78% choose one of the top three clinics in the Google Maps pack. Local SEO is the single highest-converting acquisition channel for medical practices.</p>
<h2>1. Perfecting Your Primary & Secondary GMB Categories</h2>
<p>Choosing the exact medical speciality category (e.g. <em>Orthopedic Clinic</em> vs general <em>Medical Clinic</em>) directly unlocks the highest relevance score.</p>
<h2>2. Review Velocity and Keyword-Rich Testimonials</h2>
<p>Google rewards clinics whose patients naturally mention treatment terms like "knee replacement" or "root canal treatment" in 5-star reviews.</p>
<h2>3. Geo-Tagged Local Citations & Photos</h2>
<p>Authentic clinic interior, staff, and medical equipment photos uploaded weekly build algorithmic confidence and patient reassurance.</p>`,
    faqs: [],
  },
  {
    category: 'Healthcare Marketing',
    title: 'Medical Content Marketing: Crafting High-E-E-A-T Patient Guides That Convert',
    slug: 'medical-content-marketing-high-eeat-guides',
    excerpt: 'How healthcare practices can write medically accurate, search-optimized condition guides that build profound patient trust.',
    cover_image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1600',
    cover_image_alt: 'Stethoscope and medical records on a doctor consultation desk',
    tags: ['Healthcare Marketing', 'Medical Content', 'E-E-A-T', 'Patient Care'],
    is_featured: 0,
    published_at: daysAgo(18),
    focus_keyword: 'medical content marketing EEAT',
    meta_title: 'Medical Content Marketing & High-EEAT Strategy | Codigix',
    meta_description: 'How clinics and healthcare brands publish authoritative, compliant content that satisfies Google medical guidelines and earns patient appointments.',
    content: `<p>Healthcare queries are held to the strict "Your Money or Your Life" (YMYL) standards. Generic AI-written articles fail quickly without physician oversight.</p>
<h2>The E-E-A-T Healthcare Formula</h2>
<p>Every article must display clear doctor attribution, clinical peer review dates, and reference recognized medical literature (PubMed, WHO, ICMR).</p>
<h2>Empathy-Driven Formatting</h2>
<p>Patients read medical content in states of high anxiety. Clear bulleted symptoms, recovery timelines, and transparent consultation steps ease friction and increase booking rates.</p>`,
    faqs: [],
  },
  {
    category: 'SEO Strategy',
    title: 'High-ROI Google Ads for Hospitals: Slashing Cost-Per-Lead by 42%',
    slug: 'high-roi-google-ads-for-hospitals',
    excerpt: 'A data-backed framework for structuring medical search campaigns, negative keyword sculpting, and high-converting landing pages.',
    cover_image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1600',
    cover_image_alt: 'Data analytics charts showing performance growth and patient appointments',
    tags: ['PPC', 'Google Ads', 'ROI', 'Healthcare Marketing'],
    is_featured: 0,
    published_at: daysAgo(34),
    focus_keyword: 'hospital Google ads ROI',
    meta_title: 'High-ROI Google Ads for Hospitals & Clinics | Codigix',
    meta_description: 'Reduce wasted ad spend and acquire high-intent surgical and consultation leads with targeted Google Search & Call-Only ads.',
    content: `<p>Medical PPC is fiercely competitive. Without tight negative keyword lists and high-intent bidding, clinics waste thousands on informational searches.</p>
<h2>Call-Only Campaigns During Clinic Hours</h2>
<p>Direct phone calls convert at 3x the rate of web contact forms for urgent consultations.</p>
<h2>Targeting Emergency vs Elective Search Journeys</h2>
<p>Segment search intent between immediate emergency care and researched elective procedures for maximum return on ad spend.</p>`,
    faqs: [],
  },
];

export const jobs = [
  {
    title: 'SEO Executive',
    department: 'Marketing',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'On-site',
    experience: '1–3 years',
    salary_range: '',
    openings: 2,
    summary: 'Drive on-page, off-page and local SEO for healthcare and business clients.',
    description: '<p>We are looking for a hands-on SEO Executive who loves rankings, data and results. You will work across healthcare, e-commerce and B2B clients.</p>',
    responsibilities: ['Keyword research and on-page optimisation', 'Google Business Profile optimisation', 'Link building and outreach', 'Monthly reporting with GA4 & Search Console'],
    requirements: ['1+ year of SEO experience', 'Working knowledge of GA4, Search Console and Ahrefs/Semrush', 'Good written English'],
    benefits: ['Fast learning environment', 'Performance bonuses', 'Healthcare industry exposure'],
  },
  {
    title: 'Social Media & Video Content Creator',
    department: 'Creative',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'On-site',
    experience: '0–2 years',
    salary_range: '',
    openings: 1,
    summary: 'Script, shoot and edit reels and YouTube shorts for clinics and brands.',
    description: '<p>Create scroll-stopping reels, shorts and posts for our healthcare and lifestyle clients.</p>',
    responsibilities: ['Plan monthly content calendars', 'Shoot and edit reels/shorts', 'Write captions and hooks', 'Track engagement and iterate'],
    requirements: ['Portfolio of reels or short-form videos', 'Premiere Pro / CapCut / Canva skills', 'Comfortable on camera is a plus'],
    benefits: ['Creative freedom', 'Work with doctors & brands', 'Growth path to Creative Lead'],
  },
  {
    title: 'Performance Marketing & Google Ads Specialist',
    department: 'Performance & Paid Ads',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'Hybrid',
    experience: '2–4 years',
    salary_range: '₹5.5L – ₹9.5L + Performance Bonus',
    openings: 2,
    summary: 'Manage multi-lakh Google Ads & Meta campaign budgets with high-ROAS patient lead acquisition funnels.',
    description: '<p>Lead search, display, and call-only campaigns for our healthcare institutions and e-commerce clients. You will optimize bidding, analyze attribution, and sculpt conversion-rate improvements.</p>',
    responsibilities: ['Architect Google Search & Performance Max campaigns', 'Manage Meta Ads Manager & lookalike retargeting funnels', 'A/B test landing page copy and conversion forms', 'Conduct deep ROAS and cost-per-acquisition analysis in GA4'],
    requirements: ['2+ years managing paid media budgets', 'Google Ads and Meta Blueprint certified', 'Strong analytical mindset and conversion focus'],
    benefits: ['Generous quarterly campaign performance bonuses', '₹50,000 annual learning & certification stipend', 'Hybrid work flexibility'],
  },
  {
    title: 'Medical Content Strategist & Copywriter',
    department: 'Content & Strategy',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'Hybrid',
    experience: '1–4 years',
    salary_range: '₹4.5L – ₹7.5L',
    openings: 2,
    summary: 'Craft high-E-E-A-T patient condition guides, doctor authority scripts, and search-ranking content.',
    description: '<p>Translate complex medical treatments into empathetic, accessible patient guides that rank #1 on Google and inspire patient appointments.</p>',
    responsibilities: ['Write in-depth, medically referenced condition guides', 'Script viral doctor Q&A reels and YouTube explainers', 'Collaborate with physician advisors for clinical validation', 'Optimize articles for Answer Engine Optimization (AEO) and AI Overviews'],
    requirements: ['Experience writing healthcare, wellness, or B2B content', 'Solid understanding of SEO keyword intent and E-E-A-T guidelines', 'Flawless written English and storytelling ability'],
    benefits: ['Work directly with reputed doctors and surgeons', 'Flexible working hours and research support', 'Medical insurance coverage'],
  },
  {
    title: 'UI/UX & Web Conversion Designer',
    department: 'Design & Tech',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'Hybrid',
    experience: '2–4 years',
    salary_range: '₹5L – ₹8.5L',
    openings: 1,
    summary: 'Design high-converting medical websites, appointment funnels, and modern brand design systems.',
    description: '<p>Transform clinical websites into lightning-fast, high-converting digital experiences with Figma, Tailwind, and modern UX patterns.</p>',
    responsibilities: ['Design intuitive web & mobile UX flows in Figma', 'Craft interactive design systems and micro-interactions', 'Partner with frontend engineers to ensure pixel-perfect delivery', 'Conduct heatmap and user testing conversion optimization'],
    requirements: ['Strong Figma portfolio showcasing conversion-focused web design', 'Understanding of responsive design, accessibility, and typography', 'Knowledge of frontend basics (HTML/Tailwind) is a big plus'],
    benefits: ['Creative leadership opportunities', 'High-end ergonomic workstation setup', 'Generous paid time off'],
  },
  {
    title: 'Healthcare Client Growth & Account Manager',
    department: 'Client Strategy',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'On-site',
    experience: '2–5 years',
    salary_range: '₹6L – ₹10L + Retention Incentives',
    openings: 1,
    summary: 'Serve as the strategic growth partner for hospitals, IVF centers, and medical practitioners.',
    description: '<p>Own executive client relationships, translate marketing metrics into revenue and patient growth stories, and orchestrate campaign execution.</p>',
    responsibilities: ['Lead strategic monthly business reviews with clinic directors', 'Coordinate with SEO, Paid Media, and Creative teams', 'Identify expansion opportunities and strategic campaign initiatives', 'Ensure high client retention and delight'],
    requirements: ['2+ years in account management or client servicing at a digital agency', 'Excellent presentation and communication skills', 'Ability to interpret GA4 and digital growth dashboards'],
    benefits: ['Direct executive exposure', 'Client retention and growth bonuses', 'Fast track to Director of Client Accounts'],
  },
];
