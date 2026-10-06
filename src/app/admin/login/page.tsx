'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/components/admin/AuthProvider';
import { Button, inputClass } from '@/components/admin/ui';

function LoginForm() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next');
  const target = next && next.startsWith('/admin') && !next.startsWith('/admin/login') ? next : '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace(target);
  }, [loading, user, router, target]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
      router.replace(target);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      <div className="hidden lg:flex relative overflow-hidden bg-[#130c3d] text-white p-12 flex-col justify-between">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/30 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-[#e20b27]/25 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-white p-1.5"><img src="/logo.png" alt="" className="w-full h-full object-contain" /></span>
          <span className="font-semibold text-lg">Codigix Infotech</span>
        </div>
        <div className="relative max-w-md">
          <h1 className="text-4xl font-semibold leading-tight mb-4">Manage your website content in one place.</h1>
          <p className="text-slate-300 leading-relaxed">
            Publish SEO-optimised blog posts, update clients, videos, hero dashboard numbers, careers and contact details —
            changes go live on the website instantly.
          </p>
        </div>
        <p className="relative text-xs text-slate-400">© {new Date().getFullYear()} Codigix Infotech</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <form onSubmit={onSubmit} className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <img src="/logo.png" alt="Codigix" className="h-9 w-auto" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
          <p className="text-sm text-slate-500 mb-8">Sign in to the admin panel.</p>

          <label htmlFor="email" className="block text-[13px] font-semibold text-slate-700 mb-1.5">Email</label>
          <div className="relative mb-4">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input id="email" type="email" required autoComplete="username" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} pl-9 h-11`} />
          </div>

          <label htmlFor="password" className="block text-[13px] font-semibold text-slate-700 mb-1.5">Password</label>
          <div className="relative mb-6">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              type={show ? 'text' : 'password'}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pl-9 pr-10 h-11`}
            />
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={show ? 'Hide password' : 'Show password'}>
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p role="alert" className="mb-4 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>}

          <Button type="submit" loading={submitting} className="w-full h-11">Sign in</Button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
