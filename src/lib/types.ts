export interface SiteSettings {
  name?: string;
  tagline?: string;
  description?: string;
  logo?: string;
  newsletter_title?: string;
  newsletter_text?: string;
}

export interface SeoSettings {
  default_title?: string;
  title_template?: string;
  default_description?: string;
  default_og_image?: string;
  twitter_handle?: string;
  google_site_verification?: string;
  blog_title?: string;
  blog_description?: string;
}

export interface ContactSettings {
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  phone_secondary?: string;
  whatsapp?: string;
  email?: string;
  careers_email?: string;
  working_hours?: string;
  map_embed_url?: string;
  services?: string[];
}

export interface SocialSettings {
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
}

export interface DashboardMetric {
  title: string;
  value: number;
  decimals?: number;
  suffix?: string;
  isCurrency?: boolean;
  trend: number;
  icon?: string;
  color?: string;
}

export interface DashboardChannel {
  name: string;
  value: string;
  sub: string;
  trend: number;
  stat1?: string;
  stat2?: string;
  progress: number;
  icon?: string;
  color?: string;
}

export interface HeroDashboardData {
  metrics: DashboardMetric[];
  channels: DashboardChannel[];
  traffic_total: string;
  traffic_axis: string[];
  traffic_sources: { label: string; pct: number }[];
  keywords: { keyword: string; position: number; change: number; volume: string }[];
  content: { title: string; views: string; engagement: string }[];
  ads: { label: string; value: number; isCurrency?: boolean; trend: number; down?: boolean }[];
  funnel: { label: string; value: string; pct: string; width: number }[];
}

export interface PublicSettings {
  site: SiteSettings;
  seo: SeoSettings;
  contact: ContactSettings;
  social: SocialSettings;
}

export interface Client {
  id: number;
  name: string;
  location?: string | null;
  logo?: string | null;
  website?: string | null;
  industry?: string | null;
  is_healthcare: boolean;
  show_on_map: boolean;
  map_x: number | null;
  map_y: number | null;
}

export interface Video {
  id: number;
  youtube_id: string;
  category?: string | null;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  duration?: string | null;
  thumbnail?: string | null;
}

export interface Testimonial {
  id: number;
  name: string;
  role?: string | null;
  company?: string | null;
  content: string;
  avatar?: string | null;
  rating: number;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  post_count?: number;
}

export interface BlogSummary {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover_image?: string | null;
  cover_image_alt?: string | null;
  category_id?: number | null;
  category_name?: string | null;
  category_slug?: string | null;
  tags: string[];
  author_name?: string | null;
  author_role?: string | null;
  author_avatar?: string | null;
  author_url?: string | null;
  /** Medical reviewer (E-E-A-T for health content). */
  reviewed_by?: string | null;
  reviewer_credentials?: string | null;
  last_reviewed_at?: string | null;
  is_featured: boolean;
  published_at: string;
  updated_at: string;
  reading_time: number;
  views: number;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost extends BlogSummary {
  content: string;
  toc: { id: string; text: string; level: number }[];
  author_bio?: string | null;
  word_count: number;
  meta_title?: string | null;
  meta_description?: string | null;
  focus_keyword?: string | null;
  secondary_keywords?: string | null;
  canonical_url?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  robots_index: boolean;
  robots_follow: boolean;
  schema_type: 'BlogPosting' | 'Article' | 'NewsArticle' | 'MedicalWebPage';
  /** Extra JSON-LD written by the editor in the admin (raw JSON text). */
  custom_schema?: string | null;
  faqs: BlogFaq[];
  created_at: string;
}

export interface BlogDetailResponse {
  data: BlogPost;
  related: BlogSummary[];
  prev: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
}

export interface PageMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface JobSummary {
  id: number;
  title: string;
  slug: string;
  department?: string | null;
  location?: string | null;
  employment_type?: string | null;
  work_mode?: string | null;
  experience?: string | null;
  salary_range?: string | null;
  openings: number;
  summary?: string | null;
  deadline?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Job extends JobSummary {
  description?: string | null;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: 'open' | 'closed' | 'draft';
  meta_title?: string | null;
  meta_description?: string | null;
}
