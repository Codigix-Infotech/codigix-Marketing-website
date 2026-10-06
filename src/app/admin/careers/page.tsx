'use client';

import { Briefcase, ExternalLink } from 'lucide-react';
import ResourceManager from '@/components/admin/ResourceManager';
import { Badge, StatusBadge } from '@/components/admin/ui';

export default function JobsPage() {
  return (
    <ResourceManager
      config={{
        endpoint: '/admin/jobs',
        title: 'Job Openings',
        singular: 'Job',
        description: 'Open roles on /careers. Each job gets its own page with Google Jobs structured data.',
        emptyIcon: <Briefcase size={20} />,
        reorderable: true,
        drawerWidth: 'max-w-3xl',
        filters: [{ name: 'status', label: 'Status', options: [{ value: 'open', label: 'Open' }, { value: 'closed', label: 'Closed' }, { value: 'draft', label: 'Draft' }] }],
        columns: [
          { key: 'title', label: 'Role', render: (r) => <span><span className="block font-semibold text-slate-800">{r.title}</span><span className="block text-xs text-slate-500">{[r.department, r.location].filter(Boolean).join(' · ')}</span></span> },
          { key: 'employment_type', label: 'Type', render: (r) => <span className="text-slate-600">{[r.employment_type, r.work_mode].filter(Boolean).join(' · ') || '—'}</span> },
          { key: 'openings', label: 'Openings', render: (r) => <Badge tone="blue">{r.openings}</Badge> },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
        ],
        rowActions: (r) =>
          r.status !== 'draft' ? (
            <a href={`/careers/${r.slug}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" aria-label="View on website">
              <ExternalLink size={15} />
            </a>
          ) : null,
        defaults: {
          title: '', slug: '', department: '', location: 'Pune, Maharashtra', employment_type: 'Full-time', work_mode: 'On-site', experience: '',
          salary_range: '', openings: 1, summary: '', description: '', responsibilities: [], requirements: [], benefits: [], status: 'open',
          deadline: null, meta_title: '', meta_description: '',
        },
        fields: [
          { name: 'title', label: 'Job title', required: true },
          { name: 'department', label: 'Department', placeholder: 'e.g. Marketing' },
          { name: 'location', label: 'Location' },
          { name: 'employment_type', label: 'Employment type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map((v) => ({ value: v, label: v })) },
          { name: 'work_mode', label: 'Work mode', type: 'select', options: ['On-site', 'Hybrid', 'Remote'].map((v) => ({ value: v, label: v })) },
          { name: 'experience', label: 'Experience', placeholder: 'e.g. 1–3 years' },
          { name: 'salary_range', label: 'Salary range (optional)', placeholder: 'e.g. ₹3–5 LPA' },
          { name: 'openings', label: 'Openings', type: 'number' },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'open', label: 'Open — accepting applications' }, { value: 'closed', label: 'Closed' }, { value: 'draft', label: 'Draft — hidden' }] },
          { name: 'deadline', label: 'Application deadline', type: 'date' },
          { name: 'summary', label: 'Short summary', type: 'textarea', hint: 'Shown on the careers list.' },
          { name: 'description', label: 'About the role', type: 'richtext', folder: 'careers', section: 'Details' },
          { name: 'responsibilities', label: 'Responsibilities', type: 'list', section: 'Details', placeholder: 'What will they do?' },
          { name: 'requirements', label: 'Requirements', type: 'list', section: 'Details', placeholder: 'Skill or qualification' },
          { name: 'benefits', label: 'Benefits / perks', type: 'list', section: 'Details', placeholder: 'e.g. Health insurance' },
          { name: 'slug', label: 'URL slug', section: 'SEO', placeholder: 'auto from title' },
          { name: 'meta_title', label: 'SEO title', section: 'SEO', counter: { max: 60 } },
          { name: 'meta_description', label: 'Meta description', type: 'textarea', section: 'SEO', counter: { max: 160 } },
        ],
      }}
    />
  );
}
