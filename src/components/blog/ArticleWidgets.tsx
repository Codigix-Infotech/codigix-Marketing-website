'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Facebook, Link2, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import { API_URL } from '@/lib/config';

/** Thin progress bar pinned to the top of the viewport. */
export function ReadingProgress() {
  // Updates a GPU transform directly (max once per frame) instead of re-rendering on every scroll event.
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = document.getElementById('article-body');
      if (!el || !bar.current) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent pointer-events-none" aria-hidden="true">
      <div ref={bar} className="h-full w-full origin-left bg-gradient-to-r from-[#1a1053] via-indigo-600 to-[#e20b27]" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}

/** Sticky table of contents that highlights the heading currently in view. */
export function TableOfContents({ items }: { items: { id: string; text: string; level: number }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-100px 0px -65% 0px' }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;
  return (
    <nav aria-label="Table of contents" className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">On this page</p>
      <ol className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${item.id}`}
              className={`block py-1 border-l-2 pl-3 transition-colors leading-snug ${active === item.id ? 'border-primary-accent text-primary-accent font-semibold' : 'border-transparent text-slate-500 hover:text-[#1a1053]'}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: Linkedin },
    { label: 'Share on X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, icon: Twitter },
    { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: Facebook },
    { label: 'Share on WhatsApp', href: `https://wa.me/?text=${t}%20${u}`, icon: MessageCircle },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <div className="flex items-center gap-2">
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:bg-[#1a1053] hover:text-white hover:border-[#1a1053] transition-colors"
        >
          <Icon size={15} />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:bg-[#1a1053] hover:text-white hover:border-[#1a1053] transition-colors"
      >
        {copied ? <Check size={15} /> : <Link2 size={15} />}
      </button>
    </div>
  );
}

/** Counts one view per browser session (page HTML itself is cached). */
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      /* storage unavailable: still count */
    }
    fetch(`${API_URL}/api/public/blogs/${encodeURIComponent(slug)}/view`, { method: 'POST', keepalive: true }).catch(() => {});
  }, [slug]);
  return null;
}
