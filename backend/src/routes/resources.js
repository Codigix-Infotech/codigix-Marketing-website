import { createCrudRouter } from '../services/crud.js';
import { badRequest } from '../utils/httpError.js';

/** Accepts a bare YouTube id or any youtube.com / youtu.be / shorts URL. */
export function extractYoutubeId(input) {
  const s = String(input || '').trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export const clientsRouter = createCrudRouter({
  table: 'clients',
  fields: {
    name: { type: 'string', required: true, max: 160, label: 'Client name' },
    location: { type: 'string', max: 160 },
    logo: { type: 'string', max: 500 },
    website: { type: 'url', label: 'Website' },
    industry: { type: 'string', max: 120 },
    is_healthcare: { type: 'bool', default: 0 },
    show_on_map: { type: 'bool', default: 1 },
    map_x: { type: 'float' },
    map_y: { type: 'float' },
    sort_order: { type: 'int', default: 0 },
    is_active: { type: 'bool', default: 1 },
  },
  searchable: ['name', 'location', 'industry'],
  filterable: ['is_active', 'is_healthcare'],
  boolColumns: ['is_healthcare', 'show_on_map', 'is_active'],
  defaultOrder: 'sort_order ASC, id ASC',
  sortable: ['name', 'sort_order'],
  tags: ['clients'],
  beforeSave(record) {
    for (const k of ['map_x', 'map_y']) {
      if (record[k] != null) record[k] = Math.min(98, Math.max(2, record[k]));
    }
  },
});

export const videosRouter = createCrudRouter({
  table: 'videos',
  fields: {
    youtube_id: { type: 'string', required: true, max: 200, label: 'YouTube URL or ID' },
    category: { type: 'string', max: 120 },
    title: { type: 'string', required: true, max: 255 },
    subtitle: { type: 'string', max: 255 },
    description: { type: 'text', max: 2000 },
    duration: { type: 'string', max: 16 },
    thumbnail: { type: 'string', max: 500 },
    sort_order: { type: 'int', default: 0 },
    is_active: { type: 'bool', default: 1 },
  },
  searchable: ['title', 'category', 'subtitle'],
  filterable: ['is_active'],
  boolColumns: ['is_active'],
  defaultOrder: 'sort_order ASC, id ASC',
  sortable: ['title', 'sort_order'],
  tags: ['videos'],
  beforeSave(record) {
    if (record.youtube_id !== undefined) {
      const id = extractYoutubeId(record.youtube_id);
      if (!id) throw badRequest('Could not find a valid YouTube video id in that URL');
      record.youtube_id = id;
    }
  },
});

export const testimonialsRouter = createCrudRouter({
  table: 'testimonials',
  fields: {
    name: { type: 'string', required: true, max: 160 },
    role: { type: 'string', max: 160 },
    company: { type: 'string', max: 160 },
    content: { type: 'text', required: true, max: 3000, label: 'Testimonial' },
    avatar: { type: 'string', max: 500 },
    rating: { type: 'int', default: 5 },
    sort_order: { type: 'int', default: 0 },
    is_active: { type: 'bool', default: 1 },
  },
  searchable: ['name', 'company', 'content'],
  filterable: ['is_active'],
  boolColumns: ['is_active'],
  defaultOrder: 'sort_order ASC, id DESC',
  sortable: ['name', 'rating', 'sort_order'],
  tags: ['testimonials'],
  beforeSave(record) {
    if (record.rating != null) record.rating = Math.min(5, Math.max(1, record.rating));
  },
});

export const faqsRouter = createCrudRouter({
  table: 'faqs',
  fields: {
    question: { type: 'string', required: true, max: 500 },
    answer: { type: 'text', required: true, max: 5000 },
    page: { type: 'string', max: 80, default: 'home' },
    sort_order: { type: 'int', default: 0 },
    is_active: { type: 'bool', default: 1 },
  },
  searchable: ['question', 'answer'],
  filterable: ['page', 'is_active'],
  boolColumns: ['is_active'],
  defaultOrder: 'page ASC, sort_order ASC, id ASC',
  sortable: ['page', 'sort_order'],
  tags: ['faqs'],
});

export const categoriesRouter = createCrudRouter({
  table: 'blog_categories',
  fields: {
    name: { type: 'string', required: true, max: 120 },
    slug: { type: 'string', max: 160 },
    description: { type: 'text', max: 2000 },
    meta_title: { type: 'string', max: 255 },
    meta_description: { type: 'string', max: 500 },
    sort_order: { type: 'int', default: 0 },
  },
  slugFrom: 'name',
  searchable: ['name', 'slug'],
  defaultOrder: 'sort_order ASC, name ASC',
  sortable: ['name', 'sort_order'],
  tags: ['blogs'],
});

export const jobsRouter = createCrudRouter({
  table: 'jobs',
  fields: {
    title: { type: 'string', required: true, max: 200, label: 'Job title' },
    slug: { type: 'string', max: 220 },
    department: { type: 'string', max: 120 },
    location: { type: 'string', max: 160 },
    employment_type: { type: 'string', max: 60 },
    work_mode: { type: 'string', max: 60 },
    experience: { type: 'string', max: 80 },
    salary_range: { type: 'string', max: 120 },
    openings: { type: 'int', default: 1 },
    summary: { type: 'text', max: 2000 },
    description: { type: 'html' },
    responsibilities: { type: 'json', default: [] },
    requirements: { type: 'json', default: [] },
    benefits: { type: 'json', default: [] },
    status: { type: 'enum', values: ['open', 'closed', 'draft'], default: 'open' },
    deadline: { type: 'date' },
    meta_title: { type: 'string', max: 255 },
    meta_description: { type: 'string', max: 500 },
    sort_order: { type: 'int', default: 0 },
  },
  slugFrom: 'title',
  searchable: ['title', 'department', 'location'],
  filterable: ['status', 'department'],
  jsonColumns: ['responsibilities', 'requirements', 'benefits'],
  defaultOrder: 'sort_order ASC, created_at DESC',
  sortable: ['title', 'status', 'sort_order'],
  tags: ['jobs'],
});

export const messagesRouter = createCrudRouter({
  table: 'contact_messages',
  fields: {
    status: { type: 'enum', values: ['new', 'read', 'replied', 'archived'] },
    notes: { type: 'text', max: 5000 },
  },
  allow: { create: false },
  searchable: ['first_name', 'last_name', 'email', 'phone', 'company', 'message'],
  filterable: ['status', 'service'],
  defaultOrder: 'created_at DESC',
  sortable: ['status'],
  exportColumns: ['id', 'created_at', 'status', 'first_name', 'last_name', 'email', 'phone', 'company', 'service', 'message', 'source_page', 'notes'],
});

export const subscribersRouter = createCrudRouter({
  table: 'subscribers',
  fields: {
    status: { type: 'enum', values: ['subscribed', 'unsubscribed'] },
  },
  allow: { create: false },
  searchable: ['email'],
  filterable: ['status'],
  defaultOrder: 'created_at DESC',
  sortable: ['email', 'status'],
  exportColumns: ['id', 'email', 'status', 'source', 'created_at'],
});
