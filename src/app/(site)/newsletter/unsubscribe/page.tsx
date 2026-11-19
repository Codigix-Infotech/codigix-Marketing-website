'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { submitPublic } from '@/lib/public-client';

function UnsubscribeForm() {
  const token = useSearchParams().get('token') || '';
  const [state, setState] = useState<{ status: 'idle' | 'loading' | 'done' | 'error'; message?: string }>({ status: 'idle' });

  const confirmUnsubscribe = async () => {
    setState({ status: 'loading' });
    try {
      const res = await submitPublic('/newsletter/unsubscribe', { token });
      setState({ status: 'done', message: res.message });
    } catch (err) {
      setState({ status: 'error', message: (err as Error).message });
    }
  };

  return (
    <div className="max-w-xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm text-center">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#1a1053] mb-3">Unsubscribe from our newsletter</h1>
      {state.status === 'done' ? (
        <p role="status" className="text-slate-600 leading-relaxed">{state.message}</p>
      ) : !token ? (
        <p className="text-slate-600 leading-relaxed">This unsubscribe link is incomplete. Please use the link from the bottom of one of our emails.</p>
      ) : (
        <>
          <p className="text-slate-600 leading-relaxed mb-6">
            Confirm below and we will stop sending you updates from Codigix Infotech. You can subscribe again at any time from our website footer.
          </p>
          <button
            type="button"
            onClick={confirmUnsubscribe}
            disabled={state.status === 'loading'}
            className="inline-flex items-center justify-center rounded-full bg-[#1a1053] px-7 py-3 text-sm font-medium text-white hover:bg-[#25186f] disabled:opacity-60"
          >
            {state.status === 'loading' ? 'Unsubscribing…' : 'Confirm unsubscribe'}
          </button>
          {state.status === 'error' && (
            <p role="alert" className="mt-4 text-sm text-red-600">{state.message}</p>
          )}
        </>
      )}
      <div className="mt-8">
        <Link href="/" className="text-sm font-medium text-[#1a1053] hover:text-[#e20b27]">Back to home</Link>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <section className="py-28 px-4">
      <Suspense fallback={null}>
        <UnsubscribeForm />
      </Suspense>
    </section>
  );
}
