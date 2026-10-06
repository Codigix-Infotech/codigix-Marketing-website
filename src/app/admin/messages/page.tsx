'use client';

import { Inbox, Mail, Phone, Reply } from 'lucide-react';
import ResourceManager from '@/components/admin/ResourceManager';
import { formatDateTime, StatusBadge, timeAgo } from '@/components/admin/ui';

const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'replied', label: 'Replied' },
  { value: 'archived', label: 'Archived' },
];

export default function MessagesPage() {
  return (
    <ResourceManager
      config={{
        endpoint: '/admin/messages',
        title: 'Contact Messages',
        singular: 'Message',
        description: 'Enquiries from the website contact form.',
        emptyIcon: <Inbox size={20} />,
        canCreate: false,
        exportable: true,
        searchPlaceholder: 'Search name, email, message…',
        filters: [{ name: 'status', label: 'Status', options: STATUSES }],
        highlightRow: (r) => r.status === 'new',
        onOpen: (r) => (r.status === 'new' ? { status: 'read' } : null),
        columns: [
          {
            key: 'first_name',
            label: 'From',
            render: (r) => (
              <span>
                <span className={`block text-slate-800 ${r.status === 'new' ? 'font-bold' : 'font-medium'}`}>{r.first_name} {r.last_name}</span>
                <span className="block text-xs text-slate-500">{r.email}</span>
              </span>
            ),
          },
          { key: 'service', label: 'Interested in', render: (r) => <span className="text-slate-600">{r.service || '—'}</span> },
          { key: 'message', label: 'Message', render: (r) => <span className="line-clamp-1 max-w-sm text-slate-500">{r.message}</span> },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
          { key: 'created_at', label: 'Received', render: (r) => <span className="text-xs text-slate-500 whitespace-nowrap">{timeAgo(r.created_at)}</span> },
        ],
        renderDetail: (r) => (
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-900">{r.first_name} {r.last_name}</p>
                <p className="text-sm text-slate-500">{[r.company, r.service].filter(Boolean).join(' · ') || 'Website enquiry'}</p>
                <p className="text-xs text-slate-400 mt-1">{formatDateTime(r.created_at)}{r.source_page ? ` · from ${r.source_page}` : ''}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <p className="text-sm text-slate-700 whitespace-pre-line bg-white rounded-lg border border-slate-200 p-4 leading-relaxed">{r.message}</p>
            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${r.email}?subject=${encodeURIComponent('Re: Your enquiry with Codigix')}`} className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg bg-[#1a1053] text-white text-sm font-semibold hover:bg-[#2b1f7a]">
                <Reply size={15} /> Reply by email
              </a>
              <a href={`mailto:${r.email}`} className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700"><Mail size={14} />{r.email}</a>
              {r.phone && <a href={`tel:${r.phone}`} className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700"><Phone size={14} />{r.phone}</a>}
            </div>
          </div>
        ),
        fields: [
          { name: 'status', label: 'Status', type: 'select', options: STATUSES },
          { name: 'notes', label: 'Internal notes', type: 'textarea', hint: 'Follow-up notes for your team.' },
        ],
      }}
    />
  );
}
