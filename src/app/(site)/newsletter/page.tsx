import Link from 'next/link';
import { BookOpen, ShieldCheck, Mail } from 'lucide-react';
import NewsletterSignup from '@/components/forms/NewsletterSignup';
import { pageMetadata } from '@/lib/page-seo';

export const generateMetadata = () =>
  pageMetadata({
    title: 'Newsletter | Codigix Infotech',
    description: 'Practical updates on web engineering, accurate digital information and responsible health communication from Codigix Infotech.',
    path: '/newsletter',
  });

const points = [
  {
    icon: BookOpen,
    title: 'Practical, factual updates',
    text: 'Short articles on web engineering, structured information, accessibility and clear public-health communication.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy first',
    text: 'We collect only your email address, handle it under the IT Act, 2000 and the DPDP Act, 2023, and never sell it.',
  },
  {
    icon: Mail,
    title: 'Easy to leave',
    text: 'Every email has a one-click unsubscribe link. No patient information is ever needed to subscribe.',
  },
];

export default function NewsletterPage() {
  return (
    <section className="bg-[#f8fafc] px-4 pb-20 pt-32 lg:pt-40">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#1a1053] shadow-sm">
          <Mail size={13} className="text-blue-600" /> Newsletter
        </span>
        <h1 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-[#1a1053] sm:text-4xl lg:text-5xl">
          Updates from{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] bg-clip-text text-transparent">Codigix Infotech</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base font-light leading-relaxed text-slate-600 sm:text-lg">
          Practical updates on web engineering, accurate digital information and responsible health communication, delivered to your inbox.
        </p>

        <div className="mx-auto mt-8 max-w-lg">
          <NewsletterSignup source="newsletter-page" />
          <p className="mt-3 text-xs font-light text-slate-500">
            By subscribing you agree to receive our emails. Read our{' '}
            <Link href="/privacy" className="underline hover:text-[#1a1053]">Privacy Policy</Link>. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3">
        {points.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(26,16,83,0.05)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Icon size={20} />
            </span>
            <h2 className="mt-4 text-base font-semibold text-[#1a1053]">{title}</h2>
            <p className="mt-1.5 text-sm font-light leading-relaxed text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
