'use client';

import { Mail } from 'lucide-react';
import ResourceManager from '@/components/admin/ResourceManager';
import { formatDateTime, StatusBadge } from '@/components/admin/ui';

export default function SubscribersPage() {
  return (
    <ResourceManager
      config={{
        endpoint: '/admin/subscribers',
        title: 'Newsletter Subscribers',
        singular: 'Subscriber',
        description: 'Emails collected from the footer newsletter form. Export to CSV for Mailchimp, Brevo, etc.',
        emptyIcon: <Mail size={20} />,
        canCreate: false,
        exportable: true,
        filters: [{ name: 'status', label: 'Status', options: [{ value: 'subscribed', label: 'Subscribed' }, { value: 'unsubscribed', label: 'Unsubscribed' }] }],
        columns: [
          { key: 'email', label: 'Email', render: (r) => <span className="font-medium text-slate-800">{r.email}</span> },
          { key: 'source', label: 'Source' },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
          { key: 'created_at', label: 'Subscribed on', render: (r) => <span className="text-xs text-slate-500">{formatDateTime(r.created_at)}</span> },
        ],
        fields: [{ name: 'status', label: 'Status', type: 'select', options: [{ value: 'subscribed', label: 'Subscribed' }, { value: 'unsubscribed', label: 'Unsubscribed' }] }],
      }}
    />
  );
}
