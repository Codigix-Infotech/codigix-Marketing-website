'use client';

import { Download, ExternalLink, UserCheck, Linkedin, Mail, Phone } from 'lucide-react';
import ResourceManager from '@/components/admin/ResourceManager';
import { Button, formatDateTime, StatusBadge, timeAgo, useToast } from '@/components/admin/ui';
import { download } from '@/lib/admin/api';

const STATUSES = ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'].map((s) => ({ value: s, label: s[0].toUpperCase() + s.slice(1) }));

function ResumeButton({ id, name }: { id: number; name: string }) {
  const toast = useToast();
  return (
    <Button size="sm" variant="secondary" icon={<Download size={14} />} onClick={() => download(`/admin/applications/${id}/resume`, `${name}-resume`).catch((e) => toast(e.message, 'error'))}>
      Resume
    </Button>
  );
}

export default function ApplicationsPage() {
  return (
    <ResourceManager
      config={{
        endpoint: '/admin/applications',
        title: 'Job Applications',
        singular: 'Application',
        description: 'Candidates who applied through the careers page. Resumes are stored privately.',
        emptyIcon: <UserCheck size={20} />,
        canCreate: false,
        exportable: true,
        canDelete: true,
        searchPlaceholder: 'Search name, email, role…',
        filters: [{ name: 'status', label: 'Status', options: STATUSES }],
        highlightRow: (r) => r.status === 'new',
        onOpen: (r) => (r.status === 'new' ? { status: 'reviewing' } : null),
        columns: [
          { key: 'name', label: 'Candidate', render: (r) => <span><span className="block font-semibold text-slate-800">{r.name}</span><span className="block text-xs text-slate-500">{r.email}</span></span> },
          { key: 'job_title', label: 'Position' },
          { key: 'experience', label: 'Experience' },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
          { key: 'created_at', label: 'Applied', render: (r) => <span className="text-xs text-slate-500 whitespace-nowrap">{timeAgo(r.created_at)}</span> },
        ],
        rowActions: (r) => (r.resume_path ? <ResumeButton id={r.id} name={r.name} /> : null),
        renderDetail: (r) => (
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-900">{r.name}</p>
                <p className="text-sm text-slate-500">Applied for <strong className="text-slate-700">{r.job_title}</strong> · {formatDateTime(r.created_at)}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              <a href={`mailto:${r.email}`} className="inline-flex items-center gap-2 text-indigo-600 hover:underline"><Mail size={14} />{r.email}</a>
              {r.phone && <a href={`tel:${r.phone}`} className="inline-flex items-center gap-2 text-indigo-600 hover:underline"><Phone size={14} />{r.phone}</a>}
              {r.linkedin_url && <a href={r.linkedin_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-600 hover:underline"><Linkedin size={14} />LinkedIn</a>}
              {r.portfolio_url && <a href={r.portfolio_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-600 hover:underline"><ExternalLink size={14} />Portfolio</a>}
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-xs text-slate-500">Experience</dt><dd className="font-medium text-slate-800">{r.experience || '—'}</dd></div>
              <div><dt className="text-xs text-slate-500">Current company</dt><dd className="font-medium text-slate-800">{r.current_company || '—'}</dd></div>
            </dl>
            {r.cover_letter && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Cover note</p>
                <p className="text-sm text-slate-700 whitespace-pre-line bg-white rounded-lg border border-slate-200 p-3">{r.cover_letter}</p>
              </div>
            )}
            {r.resume_path && <ResumeButton id={r.id} name={r.name} />}
          </div>
        ),
        fields: [
          { name: 'status', label: 'Pipeline status', type: 'select', options: STATUSES },
          { name: 'notes', label: 'Internal notes', type: 'textarea', hint: 'Only visible to your team.' },
        ],
      }}
    />
  );
}
