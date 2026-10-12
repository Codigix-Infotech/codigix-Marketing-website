// Fallback content used when the API is unreachable (e.g. during a build without the
// backend running), so the public site never renders empty. Real content is managed
// in the admin panel.
import type { Client, HeroDashboardData, PublicSettings, Video } from './types';

export const defaultSettings: PublicSettings = {
  site: {
    name: 'Codigix Infotech',
    tagline: 'Healthcare Digital Marketing Agency',
    description:
      "Pune's dedicated healthcare digital growth agency — driving organic SEO, Google Maps visibility, high-DA backlinks, and viral social reach for hospitals and clinics.",
    logo: '/logo.webp',
    newsletter_title: 'Join our Newsletter',
    newsletter_text:
      'Get the latest healthcare SEO insights, Google Maps strategies, and patient acquisition trends delivered straight to your inbox.',
  },
  seo: {
    default_title: 'Healthcare Digital Marketing Agency | Codigix Infotech',
    title_template: '%s | Codigix Infotech',
    default_description:
      'Pune’s healthcare digital marketing agency. Healthcare SEO, Google Maps 3-Pack, ads and social media that bring your clinic or hospital more patients.',
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
  social: {},
};

export const defaultDashboard: HeroDashboardData = {
  metrics: [
    { title: 'Website Visitors', value: 24532, trend: 28, icon: 'users', color: 'blue' },
    { title: 'Total Leads', value: 1248, trend: 36, icon: 'filter', color: 'purple' },
    { title: 'Conversions', value: 214, trend: 18, icon: 'target', color: 'emerald' },
    { title: 'Revenue (Attributed)', value: 28.4, decimals: 1, suffix: 'L', isCurrency: true, trend: 41, icon: 'coins', color: 'orange' },
    { title: 'Marketing ROI', value: 3.8, decimals: 1, suffix: 'x', trend: 26, icon: 'chart', color: 'indigo' },
  ],
  channels: [
    { name: 'Google Ads', value: '12,452', sub: 'Clicks', trend: 22, stat1: '1.8M Impressions', stat2: '₹ 320 CPC', progress: 68, icon: 'search', color: 'blue' },
    { name: 'Meta Ads', value: '18,324', sub: 'Clicks', trend: 34, stat1: '2.4M Impressions', stat2: '₹ 280 CPC', progress: 72, icon: 'users', color: 'blue' },
    { name: 'SEO (Organic)', value: '12.4K', sub: 'Organic Visits', trend: 42, stat1: '320 Keywords', stat2: '#1 Ranking', progress: 80, icon: 'search', color: 'emerald' },
    { name: 'Google Business Profile', value: '4,832', sub: 'Profile Views', trend: 38, stat1: '1,248 Calls', stat2: '986 Actions', progress: 76, icon: 'map-pin', color: 'blue' },
    { name: 'AEO (Answer Engine)', value: '2.8K', sub: 'Answer Clicks', trend: 45, stat1: '650 Brand Mentions', progress: 62, icon: 'target', color: 'indigo' },
    { name: 'Social Media', value: '210K', sub: 'Total Reach', trend: 28, stat1: '24K Engagements', progress: 70, icon: 'instagram', color: 'pink' },
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
    { keyword: 'hair transplant pune', position: 1, change: 2, volume: '6.4K' },
    { keyword: 'best dermatologist pcmc', position: 1, change: 3, volume: '4.8K' },
    { keyword: 'ivf center near me', position: 2, change: 1, volume: '5.2K' },
    { keyword: 'dental clinic baner', position: 1, change: 4, volume: '3.1K' },
    { keyword: 'knee replacement cost', position: 3, change: 2, volume: '2.9K' },
  ],
  content: [
    { title: 'FUE vs FUT Hair Transplant (Video)', views: '18.4K', engagement: '9.2%' },
    { title: 'Root Canal Myths & Recovery Facts', views: '12.6K', engagement: '7.8%' },
    { title: 'PRP Hair Regrowth Protocol', views: '9.4K', engagement: '6.5%' },
    { title: 'Knee Arthroscopy Recovery Guide', views: '8.1K', engagement: '5.9%' },
    { title: 'Clear Aligners Cost in Pune', views: '7.2K', engagement: '5.3%' },
  ],
  ads: [
    { label: 'Ad Spend', value: 48320, isCurrency: true, trend: 12 },
    { label: 'Patient Clicks', value: 12452, trend: 22 },
    { label: 'Appointments', value: 326, trend: 18 },
    { label: 'Cost / Inquiry', value: 148, isCurrency: true, trend: 14, down: true },
  ],
  funnel: [
    { label: 'Clinic Visitors', value: '24,532', pct: '100%', width: 100 },
    { label: 'Patient Inquiries', value: '1,248', pct: '5.1%', width: 30 },
    { label: 'Qualified Leads', value: '892', pct: '3.6%', width: 22 },
    { label: 'Consultations Booked', value: '426', pct: '1.7%', width: 12 },
    { label: 'Treatments Started', value: '214', pct: '0.9%', width: 6 },
  ],
  clients_by_field: [
    {
      field: 'Hospitals & Multispeciality',
      short_name: 'Hospitals',
      count: 18,
      share: 24,
      icon: 'building-2',
      color: 'blue',
      highlight: 'Surgical & Multispeciality Hubs',
      metric: '+4.2x Patient Footfall',
      clients: ['Shushrut Surgical Hospital', 'Moraya Multispeciality', 'Kimaya Brain & Spine'],
      logos: ['shushrut.webp', 'morya.webp', 'kimaya.webp']
    },
    {
      field: 'Dental Clinics & Implant Centers',
      short_name: 'Dental',
      count: 14,
      share: 19,
      icon: 'smile',
      color: 'emerald',
      highlight: 'Implants, Aligners & Laser Dentistry',
      metric: '320+ Implant Leads / Mo',
      clients: ['Dr. Shagun Rao', 'Smiles For All', 'Canopy Dental Care'],
      logos: ['dr-shagun-rao.webp', 'smiles-for-all.webp', 'canopy.webp']
    },
    {
      field: 'Dermatology & Skin Aesthetics',
      short_name: 'Skin Care',
      count: 12,
      share: 16,
      icon: 'sparkles',
      color: 'purple',
      highlight: 'Laser Aesthetics & Anti-Aging',
      metric: '18.4K Video Reach',
      clients: ["Dr. Sheetal's Glow", 'Shriraj Clinic'],
      logos: ['sheetals-glow.webp', 'shriraj-clinic.webp']
    },
    {
      field: 'Hair Transplant & Trichology',
      short_name: 'Hair Clinics',
      count: 10,
      share: 13,
      icon: 'activity',
      color: 'pink',
      highlight: 'FUE / FUT Restoration & PRP',
      metric: '₹88 Cost Per Consultation',
      clients: ['Regain Hair Clinic'],
      logos: ['regain.webp']
    },
    {
      field: 'Ayurveda, Wellness & Lifestyle',
      short_name: 'Ayurveda',
      count: 9,
      share: 12,
      icon: 'heart-pulse',
      color: 'orange',
      highlight: 'Chronic Healing & Panchakarma',
      metric: '150+ Monthly Inquiries',
      clients: ['Aayurlekha', 'Bakul'],
      logos: ['aayurlekha.webp', 'bakul.webp']
    },
    {
      field: 'Corporate, Legal & Agro Enterprises',
      short_name: 'Corporate/Agro',
      count: 12,
      share: 16,
      icon: 'briefcase',
      color: 'indigo',
      highlight: 'Agro Farms, Legal Advisory & Retail',
      metric: '5,000+ High-DA Backlinks',
      clients: ['CorpLegal', 'Sanskruti Agro Farm', 'Viranjany', 'Kitchen Canvas'],
      logos: ['corplegal.webp', 'sanskruti-agro-farm.webp', 'viranjany.webp', 'kitchen-canvas.webp']
    }
  ],
  gmb_rankings: [
    {
      client: 'Shushrut Surgical Hospital',
      location: 'Pimpri, PCMC',
      keyword: 'multispeciality hospital pcmc',
      rank: 1,
      previous_rank: 4,
      rating: 4.9,
      reviews: 428,
      monthly_calls: 1420,
      direction_requests: 2840,
      logo: 'shushrut.webp'
    },
    {
      client: 'Dr. Shagun Rao Dental',
      location: 'Aundh, Pune',
      keyword: 'best dental clinic pune',
      rank: 1,
      previous_rank: 3,
      rating: 5.0,
      reviews: 312,
      monthly_calls: 940,
      direction_requests: 1890,
      logo: 'dr-shagun-rao.webp'
    },
    {
      client: "Dr. Sheetal's Glow Clinic",
      location: 'Kothrud / Baner',
      keyword: 'skin laser clinic baner',
      rank: 1,
      previous_rank: 5,
      rating: 4.9,
      reviews: 195,
      monthly_calls: 780,
      direction_requests: 1620,
      logo: 'sheetals-glow.webp'
    },
    {
      client: 'Regain Hair Clinic',
      location: 'Wakad, PCMC',
      keyword: 'hair transplant clinic wakad',
      rank: 2,
      previous_rank: 6,
      rating: 4.8,
      reviews: 246,
      monthly_calls: 860,
      direction_requests: 1750,
      logo: 'regain.webp'
    },
    {
      client: 'Moraya Multispeciality Hospital',
      location: 'Chinchwad',
      keyword: 'emergency hospital chinchwad',
      rank: 1,
      previous_rank: 3,
      rating: 4.9,
      reviews: 380,
      monthly_calls: 1210,
      direction_requests: 2490,
      logo: 'morya.webp'
    },
    {
      client: 'Aayurlekha Clinic',
      location: 'Sangamwadi / Kothrud',
      keyword: 'ayurvedic clinic in pune',
      rank: 1,
      previous_rank: 4,
      rating: 4.9,
      reviews: 164,
      monthly_calls: 520,
      direction_requests: 1140,
      logo: 'aayurlekha.webp'
    }
  ],
  ads_statistics: {
    total_spend: 84720,
    total_leads: 738,
    avg_cpl: 114.8,
    impressions: '4.2M',
    clicks: 30776,
    avg_ctr: 4.1,
    conversion_rate: 24.6,
    consultations_booked: 182,
    attributed_revenue: '₹28.4L',
    roas: 4.8,
    google_ads: {
      spend: 48320,
      leads: 326,
      cpl: 148,
      clicks: 12452,
      ctr: 4.8,
      conversion_rate: 26.2
    },
    meta_ads: {
      spend: 36400,
      leads: 412,
      cpl: 88,
      clicks: 18324,
      ctr: 3.4,
      conversion_rate: 23.3
    },
    lead_types: [
      {
        type: 'Inbound Direct Calls',
        count: 342,
        pct: 46.3,
        cpl: 108,
        icon: 'phone',
        color: 'emerald'
      },
      {
        type: 'WhatsApp Direct Inquiries',
        count: 248,
        pct: 33.6,
        cpl: 92,
        icon: 'message-circle',
        color: 'blue'
      },
      {
        type: 'Appointment Booking Forms',
        count: 148,
        pct: 20.1,
        cpl: 162,
        icon: 'calendar',
        color: 'purple'
      }
    ],
    funnel_steps: [
      { step: 'Ad Impressions', count: '4,220,000', pct: '100%' },
      { step: 'High-Intent Clicks', count: '30,776', pct: '0.73%' },
      { step: 'Qualified Patient Leads', count: '738', pct: '2.40%' },
      { step: 'Booked Doctor Consults', count: '182', pct: '24.6%' },
      { step: 'Confirmed Treatments', count: '114', pct: '15.4%' }
    ]
  }
};

const c = (id: number, name: string, location: string, logo: string, is_healthcare: boolean, map_x: number, map_y: number): Client => ({
  id, name, location, logo: `/clients/${logo}`, is_healthcare, show_on_map: true, map_x, map_y,
});

export const defaultClients: Client[] = [
  c(1, "Dr. Sheetal's Glow", 'Kothrud', 'sheetals-glow.webp', true, 25, 25),
  c(2, 'Smiles For All', 'Pashan', 'smiles-for-all.webp', true, 50, 15),
  c(3, 'Ayurlekha', 'Sangamwadi', 'aayurlekha.webp', true, 35, 80),
  c(4, 'CorpLegal', 'Bavdhan', 'corplegal.webp', false, 85, 50),
  c(5, 'Dr. Shagun Rao', 'Aundh', 'dr-shagun-rao.webp', true, 75, 75),
  c(6, 'Shriraj Clinic', 'Bhosari', 'shriraj-clinic.webp', true, 15, 50),
  c(7, 'Sanskruti Agro Farm', 'Chakan', 'sanskruti-agro-farm.webp', false, 35, 10),
  c(8, 'Moraya Multispeciality', 'Chinchwad', 'morya.webp', true, 38, 35),
  c(9, 'Canopy Dental Care', 'Baner', 'canopy.webp', true, 65, 20),
  c(10, 'Kimaya Brain & Spine', 'Kalewadi', 'kimaya.webp', true, 15, 85),
  c(11, 'Bakul', 'Kharalwadi', 'bakul.webp', false, 55, 85),
  c(12, 'Kitchen Canvas', 'Aundh', 'kitchen-canvas.webp', false, 90, 80),
  c(13, 'Regain', 'Wakad', 'regain.webp', false, 85, 15),
  c(14, 'Shushrut Surgical Hospital', 'Pimpri', 'shushrut.webp', true, 65, 40),
  c(15, 'Shushrut Piles Clinic', 'Pimpri', 'shushrut.webp', true, 60, 60),
  c(16, 'Shushrut Clinic', 'Pimpri', 'shushrut.webp', true, 10, 30),
  c(17, 'Viranjany', 'Wakad', 'viranjany.webp', false, 20, 65),
];

export const defaultVideos: Video[] = [
  { id: 1, youtube_id: 'VkiY_0lhS04', category: 'Market Domination', title: 'Stop Competing. Start Dominating!', subtitle: 'Healthcare Market Leadership', description: 'Strategic playbook for clinics & hospitals to outrank local competition.', duration: '0:45' },
  { id: 2, youtube_id: 'RhsvzzoOftQ', category: 'AI & Search Strategy', title: 'AI Search & Patient Discovery', subtitle: 'Future-Proof Your Practice', description: 'How modern clinics capture high-intent patients in the AI search era.', duration: '0:50' },
  { id: 3, youtube_id: '2LCpb3gkv4w', category: 'Doctor Appreciation', title: "Dr. Sheetal's Glow Clinic", subtitle: 'Client Review & Feedback', description: 'Dr. Sheetal shares her growth experience & patient acquisition results.', duration: '0:42' },
  { id: 4, youtube_id: 'Brzz1X9F-VE', category: 'Doctor Testimonial', title: 'Dr. Dipti Vaidya Recommendation', subtitle: '5-Star Verified Doctor Review', description: 'Dr. Dipti Vaidya on brand credibility and dedicated marketing execution.', duration: '0:38' },
];
