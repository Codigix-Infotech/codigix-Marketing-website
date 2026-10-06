'use client';

import { useRef, useState } from 'react';
import { CheckCircle2, FileText, Loader2, UploadCloud } from 'lucide-react';
import { submitPublic } from '@/lib/public-client';

const input =
  'w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all';
const label = 'block text-xs font-bold text-slate-500 mb-1';
const MAX_MB = 5;

export default function ApplicationForm({ jobId, jobTitle }: { jobId?: number; jobTitle?: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setError('');
    if (!file) return setFileName('');
    if (!/\.(pdf|docx?)$/i.test(file.name)) {
      setError('Resume must be a PDF, DOC or DOCX file');
      e.target.value = '';
      return setFileName('');
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`Resume must be smaller than ${MAX_MB} MB`);
      e.target.value = '';
      return setFileName('');
    }
    setFileName(file.name);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (jobId) data.set('job_id', String(jobId));
    setState('loading');
    setError('');
    try {
      await submitPublic('/jobs/apply', data);
      setState('done');
      form.reset();
      setFileName('');
    } catch (err) {
      setError((err as Error).message);
      setState('idle');
    }
  }

  if (state === 'done') {
    return (
      <div className="text-center py-10" role="status">
        <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4" />
        <h3 className="text-xl font-semibold text-[#1a1053] mb-2">Application received!</h3>
        <p className="text-slate-500">
          Thanks for applying{jobTitle ? ` for ${jobTitle}` : ''}. Our team reviews every application and will contact you if there's a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="app-name" className={label}>Full Name *</label>
          <input id="app-name" name="name" required maxLength={160} autoComplete="name" className={input} />
        </div>
        <div>
          <label htmlFor="app-email" className={label}>Email *</label>
          <input id="app-email" name="email" type="email" required autoComplete="email" className={input} />
        </div>
        <div>
          <label htmlFor="app-phone" className={label}>Phone</label>
          <input id="app-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={input} />
        </div>
        <div>
          <label htmlFor="app-exp" className={label}>Total Experience</label>
          <input id="app-exp" name="experience" maxLength={80} placeholder="e.g. 2 years" className={input} />
        </div>
        <div>
          <label htmlFor="app-company" className={label}>Current Company</label>
          <input id="app-company" name="current_company" maxLength={160} className={input} />
        </div>
        <div>
          <label htmlFor="app-linkedin" className={label}>LinkedIn URL</label>
          <input id="app-linkedin" name="linkedin_url" type="url" placeholder="https://linkedin.com/in/…" className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="app-portfolio" className={label}>Portfolio / Work Samples URL</label>
        <input id="app-portfolio" name="portfolio_url" type="url" placeholder="https://…" className={input} />
      </div>
      <div>
        <label htmlFor="app-cover" className={label}>Why do you want to join Codigix?</label>
        <textarea id="app-cover" name="cover_letter" rows={4} maxLength={5000} className={input} />
      </div>
      <div>
        <span className={label}>Resume * (PDF, DOC, DOCX · max {MAX_MB} MB)</span>
        <label
          htmlFor="app-resume"
          className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl px-4 py-5 bg-slate-50/60 transition-colors"
        >
          {fileName ? <FileText className="text-indigo-600 shrink-0" /> : <UploadCloud className="text-slate-400 shrink-0" />}
          <span className="text-sm text-slate-600 truncate">{fileName || 'Click to upload your resume'}</span>
        </label>
        <input
          ref={fileRef}
          id="app-resume"
          name="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={onFile}
          className="sr-only"
        />
      </div>
      {error && <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</p>}
      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-primary-text hover:bg-primary-accent text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-70 inline-flex items-center justify-center gap-2"
      >
        {state === 'loading' && <Loader2 size={18} className="animate-spin" />}
        {state === 'loading' ? 'Submitting…' : 'Submit Application'}
      </button>
    </form>
  );
}
