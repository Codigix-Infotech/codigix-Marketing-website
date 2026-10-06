"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

// Anchor targets get `scroll-margin-top` (globals.css) to clear the fixed navbar; Lenis honours it.
const ON_TARGET_TOP = 96;

/**
 * Keeps Lenis in step with Next.js page changes:
 *  - a new page must not inherit the previous page's leftover glide;
 *  - a page opened with a #hash (e.g. /services#case-studies) must land on its target.
 *    Lenis takes over the scroll position on start-up, and sections that render in above
 *    the target (content-visibility) shift it, so re-align until the layout is stable —
 *    but stop as soon as the visitor scrolls themselves.
 */
function RouteScrollSync() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    // Same-page "#section" links: glide there with Lenis instead of the browser's instant jump
    // (Lenis's own anchor option doesn't cancel the native jump, so the two fight).
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (!url.hash || url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      window.history.pushState(window.history.state, "", url.hash);
      lenis.scrollTo(target);
    };
    document.addEventListener("click", onAnchorClick, true);
    const removeAnchorHandler = () => document.removeEventListener("click", onAnchorClick, true);

    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) {
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      return removeAnchorHandler;
    }

    let userScrolled = false;
    const onUserScroll = () => (userScrolled = true);
    const inputs = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    inputs.forEach((e) => window.addEventListener(e, onUserScroll, { passive: true, once: true }));

    let attempts = 0;
    let timer = 0;
    const land = () => {
      const target = document.getElementById(id);
      if (!target || userScrolled) return;
      const off = target.getBoundingClientRect().top - ON_TARGET_TOP;
      if (Math.abs(off) > 2) lenis.scrollTo(target, { immediate: true, force: true });
      if (++attempts < 12) timer = window.setTimeout(land, 150);
    };
    const frame = requestAnimationFrame(land);

    return () => {
      removeAnchorHandler();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      inputs.forEach((e) => window.removeEventListener(e, onUserScroll));
    };
  }, [lenis, pathname]);

  return null;
}

/**
 * Inertial smooth scrolling for mouse wheels / trackpads on the public site.
 * Touch scrolling stays native. Lenis moves the real window scroll position, so
 * framer-motion scroll effects and sticky elements keep working; in-page "#" links glide.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // glide factor per frame: lower = floatier, higher = snappier
        smoothWheel: true,
        wheelMultiplier: 1,
        allowNestedScroll: true, // dropdowns, drawers and carousels keep their own scrolling
        autoRaf: true,
      }}
    >
      <RouteScrollSync />
      {children}
    </ReactLenis>
  );
}
