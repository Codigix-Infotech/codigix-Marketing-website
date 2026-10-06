'use client';

import { MessageSquareQuote, Star } from 'lucide-react';
import ResourceManager from '@/components/admin/ResourceManager';
import { Badge } from '@/components/admin/ui';

export default function TestimonialsPage() {
  return (
    <ResourceManager
      config={{
        endpoint: '/admin/testimonials',
        title: 'Testimonials',
        singular: 'Testimonial',
        description: 'Client reviews available to the website.',
        emptyIcon: <MessageSquareQuote size={20} />,
        reorderable: true,
        columns: [
          { key: 'name', label: 'Client', render: (r) => <span><span className="block font-semibold text-slate-800">{r.name}</span><span className="block text-xs text-slate-500">{[r.role, r.company].filter(Boolean).join(', ')}</span></span> },
          { key: 'content', label: 'Review', render: (r) => <span className="line-clamp-2 text-slate-600 max-w-md">“{r.content}”</span> },
          { key: 'rating', label: 'Rating', render: (r) => <span className="inline-flex text-amber-400">{Array.from({ length: r.rating }, (_, i) => <Star key={i} size={13} className="fill-current" />)}</span> },
          { key: 'is_active', label: 'Status', render: (r) => (r.is_active ? <Badge tone="green">Visible</Badge> : <Badge>Hidden</Badge>) },
        ],
        defaults: { name: '', role: '', company: '', content: '', avatar: '', rating: 5, is_active: true },
        fields: [
          { name: 'name', label: 'Name', required: true },
          { name: 'role', label: 'Role / title', placeholder: 'e.g. Dermatologist' },
          { name: 'company', label: 'Clinic / company' },
          { name: 'rating', label: 'Rating', type: 'select', options: [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: '★'.repeat(n) + ` (${n})` })) },
          { name: 'content', label: 'Testimonial', type: 'textarea', required: true },
          { name: 'avatar', label: 'Photo', type: 'image', folder: 'avatars' },
          { name: 'is_active', label: 'Visible on website', type: 'toggle' },
        ],
      }}
    />
  );
}
