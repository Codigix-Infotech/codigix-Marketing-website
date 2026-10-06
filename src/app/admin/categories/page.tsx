'use client';

import { FolderTree } from 'lucide-react';
import ResourceManager from '@/components/admin/ResourceManager';

export default function CategoriesPage() {
  return (
    <ResourceManager
      config={{
        endpoint: '/admin/blog-categories',
        title: 'Blog Categories',
        singular: 'Category',
        description: 'Each category gets its own SEO landing page at /blog/category/<slug>.',
        emptyIcon: <FolderTree size={20} />,
        reorderable: true,
        columns: [
          { key: 'name', label: 'Name', render: (r) => <span className="font-semibold text-slate-800">{r.name}</span> },
          { key: 'slug', label: 'URL', render: (r) => <span className="font-mono text-xs text-slate-500">/blog/category/{r.slug}</span> },
          { key: 'meta_title', label: 'SEO', render: (r) => (r.meta_title && r.meta_description ? <span className="text-xs text-emerald-600 font-semibold">✓ Set</span> : <span className="text-xs text-amber-600">Using defaults</span>) },
        ],
        defaults: { name: '', slug: '', description: '', meta_title: '', meta_description: '' },
        fields: [
          { name: 'name', label: 'Name', required: true, placeholder: 'e.g. Local SEO & GMB' },
          { name: 'slug', label: 'URL slug', placeholder: 'auto-generated from name', hint: 'Leave empty to generate from the name.' },
          { name: 'description', label: 'Description', type: 'textarea', hint: 'Shown at the top of the category page.' },
          { name: 'meta_title', label: 'SEO title', section: 'SEO', full: true, counter: { min: 30, max: 60 } },
          { name: 'meta_description', label: 'Meta description', type: 'textarea', section: 'SEO', counter: { min: 120, max: 160 } },
        ],
      }}
    />
  );
}
