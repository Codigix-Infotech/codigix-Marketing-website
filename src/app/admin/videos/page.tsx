'use client';

import { PlaySquare } from 'lucide-react';
import ResourceManager from '@/components/admin/ResourceManager';
import { Badge } from '@/components/admin/ui';
import { mediaUrl } from '@/lib/config';

export default function VideosPage() {
  return (
    <ResourceManager
      config={{
        endpoint: '/admin/videos',
        title: 'Videos',
        singular: 'Video',
        description: 'YouTube videos & shorts in the “Healthcare Stories in Motion” carousel.',
        emptyIcon: <PlaySquare size={20} />,
        reorderable: true,
        columns: [
          {
            key: 'title',
            label: 'Video',
            render: (r) => (
              <span className="flex items-center gap-3">
                <img src={mediaUrl(r.thumbnail) || `https://img.youtube.com/vi/${r.youtube_id}/mqdefault.jpg`} alt="" className="w-24 h-14 rounded-lg object-cover bg-slate-100 shrink-0" />
                <span>
                  <span className="block font-semibold text-slate-800">{r.title}</span>
                  <span className="block text-xs text-slate-500">{r.subtitle}</span>
                </span>
              </span>
            ),
          },
          { key: 'category', label: 'Category' },
          { key: 'duration', label: 'Length' },
          { key: 'is_active', label: 'Status', render: (r) => (r.is_active ? <Badge tone="green">Visible</Badge> : <Badge>Hidden</Badge>) },
        ],
        defaults: { youtube_id: '', category: '', title: '', subtitle: '', description: '', duration: '', thumbnail: '', is_active: true },
        fields: [
          { name: 'youtube_id', label: 'YouTube URL or video ID', required: true, full: true, placeholder: 'https://youtube.com/shorts/…', hint: 'Paste any YouTube, Shorts or youtu.be link.' },
          { name: 'title', label: 'Title', required: true },
          { name: 'category', label: 'Category label', placeholder: 'e.g. Doctor Testimonial' },
          { name: 'subtitle', label: 'Subtitle' },
          { name: 'duration', label: 'Duration', placeholder: '0:45' },
          { name: 'description', label: 'Short description', type: 'textarea' },
          { name: 'thumbnail', label: 'Custom thumbnail (optional)', type: 'image', folder: 'videos', hint: 'Leave empty to use the YouTube thumbnail.' },
          { name: 'is_active', label: 'Visible on website', type: 'toggle' },
        ],
      }}
    />
  );
}
