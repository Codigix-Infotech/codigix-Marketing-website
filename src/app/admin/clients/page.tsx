'use client';

import { Building2, MapPin } from 'lucide-react';
import ResourceManager from '@/components/admin/ResourceManager';
import { Badge } from '@/components/admin/ui';
import { mediaUrl } from '@/lib/config';

export default function ClientsPage() {
  return (
    <ResourceManager
      config={{
        endpoint: '/admin/clients',
        title: 'Clients',
        singular: 'Client',
        description: 'Clients shown on the “Trusted Partners” map on the home page.',
        emptyIcon: <Building2 size={20} />,
        reorderable: true,
        searchPlaceholder: 'Search clients or locations…',
        filters: [
          { name: 'is_active', label: 'Visibility', options: [{ value: '1', label: 'Visible' }, { value: '0', label: 'Hidden' }] },
          { name: 'is_healthcare', label: 'Type', options: [{ value: '1', label: 'Healthcare' }, { value: '0', label: 'Other' }] },
        ],
        columns: [
          {
            key: 'name',
            label: 'Client',
            render: (r) => (
              <span className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-lg border border-slate-200 bg-white flex items-center justify-center p-1 shrink-0">
                  {r.logo ? <img src={mediaUrl(r.logo)} alt="" className="max-w-full max-h-full object-contain" /> : <Building2 size={16} className="text-slate-300" />}
                </span>
                <span className="font-semibold text-slate-800">{r.name}</span>
              </span>
            ),
          },
          { key: 'location', label: 'Location', render: (r) => r.location ? <span className="inline-flex items-center gap-1 text-slate-600"><MapPin size={13} />{r.location}</span> : '—' },
          { key: 'is_healthcare', label: 'Type', render: (r) => (r.is_healthcare ? <Badge tone="blue">Healthcare</Badge> : <Badge>Other</Badge>) },
          { key: 'is_active', label: 'Status', render: (r) => (r.is_active ? <Badge tone="green">Visible</Badge> : <Badge>Hidden</Badge>) },
        ],
        defaults: { name: '', location: '', logo: '', website: '', industry: '', is_healthcare: true, show_on_map: true, map_x: null, map_y: null, is_active: true },
        fields: [
          { name: 'name', label: 'Client name', required: true },
          { name: 'location', label: 'Location / area', placeholder: 'e.g. Kothrud' },
          { name: 'logo', label: 'Logo', type: 'image', folder: 'clients', hint: 'Transparent PNG/WebP works best.' },
          { name: 'website', label: 'Website', type: 'url', placeholder: 'https://' },
          { name: 'industry', label: 'Industry', placeholder: 'e.g. Dermatology' },
          { name: 'is_healthcare', label: 'Healthcare client', type: 'toggle', description: 'Shown with a larger, highlighted card.' },
          { name: 'is_active', label: 'Visible on website', type: 'toggle' },
          { name: 'show_on_map', label: 'Show on the network map', type: 'toggle', section: 'Map position' },
          { name: 'map_x', label: 'Horizontal position (%)', type: 'number', section: 'Map position', hint: '0 = left edge, 100 = right edge. Pune HQ is at 50.', showIf: (v) => !!v.show_on_map },
          { name: 'map_y', label: 'Vertical position (%)', type: 'number', section: 'Map position', hint: '0 = top, 100 = bottom. Leave both empty for automatic placement.', showIf: (v) => !!v.show_on_map },
        ],
      }}
    />
  );
}
