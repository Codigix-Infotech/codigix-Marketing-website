"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Thin top progress bar that appears the moment an internal link is clicked, so visitors
 * get instant feedback while the next page loads instead of clicking again.
 * Completes when the route (path or query) actually changes.
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const trickle = useRef<number>();
  const safety = useRef<number>();

  const stopTimers = () => {
    window.clearInterval(trickle.current);
    window.clearTimeout(safety.current);
  };

  // Start on internal link clicks that lead to a different page.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return; // files (PDFs, images) don't change the route
      if (url.pathname === window.location.pathname && url.search === window.location.search) return; // same page / #hash

      stopTimers();
      setVisible(true);
      setProgress(12);
      // ease towards 90% while waiting; the route change finishes it
      trickle.current = window.setInterval(() => setProgress((p) => (p < 90 ? p + (90 - p) * 0.12 : p)), 200);
      // never leave a stuck bar (e.g. navigation cancelled)
      safety.current = window.setTimeout(() => {
        stopTimers();
        setVisible(false);
        setProgress(0);
      }, 12000);
    };
    // Capture phase: next/link calls preventDefault() on every click it handles, so a bubble
    // listener could not tell a client-side navigation from a cancelled click.
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      stopTimers();
    };
  }, []);

  // Finish when the new route has rendered.
  useEffect(() => {
    if (!visible) return;
    stopTimers();
    setProgress(100);
    const hide = window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
    return () => window.clearTimeout(hide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms ease" }}
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-[#e20b27] via-[#ff4d6a] to-[#1a1053] shadow-[0_0_8px_rgba(226,11,39,0.5)]"
        style={{ transform: `scaleX(${progress / 100})`, transition: progress === 0 ? "none" : "transform 200ms ease-out" }}
      />
    </div>
  );
}
