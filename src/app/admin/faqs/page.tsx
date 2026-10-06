'use client';

import { HelpCircle } from 'lucide-react';
import ResourceManager from '@/components/admin/ResourceManager';
import { Badge } from '@/components/admin/ui';

const PAGES = [
  { value: 'home', label: 'Home page' },
  { value: 'services', label: 'Services' },
  { value: 'seo', label: 'SEO service' },
  { value: 'ppc', label: 'PPC service' },
  { value: 'social', label: 'Social media service' },
  { value: 'web', label: 'Web design service' },
  { value: 'careers', label: 'Careers' },
];

export default function FaqsPage() {
  return (
    <ResourceManager
      config={{
        endpoint: '/admin/faqs',
        title: 'FAQs',
        singular: 'FAQ',
        description: 'Frequently asked questions, grouped by page.',
        emptyIcon: <HelpCircle size={20} />,
        filters: [{ name: 'page', label: 'Page', options: PAGES }],
        columns: [
          { key: 'question', label: 'Question', render: (r) => <span className="font-medium text-slate-800">{r.question}</span> },
          { key: 'page', label: 'Page', render: (r) => <Badge tone="purple">{PAGES.find((p) => p.value === r.page)?.label || r.page}</Badge> },
          { key: 'is_active', label: 'Status', render: (r) => (r.is_active ? <Badge tone="green">Visible</Badge> : <Badge>Hidden</Badge>) },
        ],
        defaults: { question: '', answer: '', page: 'home', sort_order: 0, is_active: true },
        fields: [
          { name: 'question', label: 'Question', required: true, full: true },
          { name: 'answer', label: 'Answer', type: 'textarea', required: true },
          { name: 'page', label: 'Show on', type: 'select', options: PAGES },
          { name: 'sort_order', label: 'Order', type: 'number', hint: 'Lower numbers appear first.' },
          { name: 'is_active', label: 'Visible on website', type: 'toggle' },
        ],
      }}
    />
  );
}
