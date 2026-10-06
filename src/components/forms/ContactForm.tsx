'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { submitPublic } from '@/lib/public-client';

const input =
  'w-full bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 focus:bg-white transition-all';
const inputCompact =
  'w-full bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-lg px-3 py-1.5 sm:py-2 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 focus:bg-white transition-all';
const label = 'block text-xs font-semibold text-slate-700 mb-1';
const labelCompact = 'block text-[11px] font-semibold text-slate-700 mb-0.5';

export default function ContactForm({
  services = [],
  compact = false,
}: {
  services?: string[];
  compact?: boolean;
}) {
  const inputClass = compact ? inputCompact : input;
  const labelClass = compact ? labelCompact : label;
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState('loading');
    setError('');
    try {
      const res = await submitPublic('/contact', { ...body, source_page: window.location.pathname });
      setMessage(res.message || 'Thank you! We will be in touch shortly.');
      setState('done');
      form.reset();
    } catch (err) {
      setError((err as Error).message);
      setState('idle');
    }
  }

  if (state === 'done') {
    return (
      <div className="text-center py-10" role="status">
        <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4" />
        <h3 className="text-xl font-semibold text-[#1a1053] mb-2">Message sent!</h3>
        <p className="text-slate-500 mb-6">{message}</p>
        <button onClick={() => setState('idle')} className="text-sm font-semibold text-primary-accent hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? 'space-y-2' : 'space-y-4'} noValidate={false}>
      {/* Honeypot: hidden from people, filled by bots */}
      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? 'gap-2' : 'gap-4'}`}>
        <div>
          <label htmlFor="first_name" className={labelClass}>First Name *</label>
          <input id="first_name" name="first_name" required maxLength={120} autoComplete="given-name" className={inputClass} placeholder="e.g. Rahul" />
        </div>
        <div>
          <label htmlFor="last_name" className={labelClass}>Last Name</label>
          <input id="last_name" name="last_name" maxLength={120} autoComplete="family-name" className={inputClass} placeholder="e.g. Sharma" />
        </div>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? 'gap-2' : 'gap-4'}`}>
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="doctor@clinic.com" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={inputClass} placeholder="+91 98765..." />
        </div>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? 'gap-2' : 'gap-4'}`}>
        <div>
          <label htmlFor="company" className={labelClass}>Clinic / Company</label>
          <input id="company" name="company" maxLength={160} autoComplete="organization" className={inputClass} placeholder="Clinic or Hospital Name" />
        </div>
        <div>
          <label htmlFor="service" className={labelClass}>Interested In</label>
          <select id="service" name="service" className={inputClass} defaultValue="">
            <option value="">Select service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>Message *</label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 2 : 3}
          required
          minLength={5}
          maxLength={5000}
          className={inputClass}
          placeholder="Briefly describe your requirements or practice goals..."
        ></textarea>
      </div>
      {error && <p role="alert" className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-1.5">{error}</p>}
      <button
        type="submit"
        disabled={state === 'loading'}
        className={`w-full bg-[#1a1053] hover:bg-blue-600 text-white font-bold ${compact ? 'py-2.5 text-xs sm:text-sm' : 'py-3 text-sm'} rounded-xl transition-all shadow-md shadow-indigo-950/20 hover:shadow-lg hover:shadow-blue-600/25 disabled:opacity-70 inline-flex items-center justify-center gap-2 cursor-pointer`}
      >
        {state === 'loading' && <Loader2 size={16} className="animate-spin" />}
        {state === 'loading' ? 'Sending Message…' : 'Send Message'}
      </button>
    </form>
  );
}
