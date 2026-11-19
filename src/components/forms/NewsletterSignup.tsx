'use client';

import { useState } from 'react';
import { submitPublic } from '@/lib/public-client';

export default function NewsletterSignup({ source = 'newsletter-page' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<{ status: 'idle' | 'loading' | 'done' | 'error'; message?: string }>({ status: 'idle' });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ status: 'loading' });
    try {
      const res = await submitPublic('/newsletter', { email, source });
      setState({ status: 'done', message: res.message });
      setEmail('');
    } catch (err) {
      setState({ status: 'error', message: (err as Error).message });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex w-full rounded-full border border-slate-200 bg-white p-1.5 shadow-sm focus-within:border-indigo-400">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          placeholder="Enter your email address"
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={state.status === 'loading'}
          className="shrink-0 rounded-full bg-[#e20b27] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c90a22] disabled:opacity-70"
        >
          {state.status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {state.message && (
        <p role="status" className={`mt-3 px-4 text-sm ${state.status === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>
          {state.message}
        </p>
      )}
    </div>
  );
}
