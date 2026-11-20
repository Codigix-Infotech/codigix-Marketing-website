"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * Keeps a dense, desktop-style widget readable on very small screens: when the available width is below
 * `minWidth`, the content is laid out at `minWidth` and scaled down to fit, instead of being squeezed
 * until its labels and charts overlap. At or above `minWidth` it renders normally.
 */
export default function FitWidth({ minWidth = 520, children }: { minWidth?: number; children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = outer.current;
    const content = inner.current;
    if (!el || !content) return;
    const update = () => {
      const w = el.clientWidth;
      const s = w > 0 && w < minWidth ? w / minWidth : 1;
      setScale(s);
      setHeight(s < 1 ? content.offsetHeight * s : undefined);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(content);
    return () => ro.disconnect();
  }, [minWidth]);

  const scaled = scale < 1;
  return (
    <div ref={outer} style={scaled ? { height, overflow: 'hidden' } : undefined}>
      <div
        ref={inner}
        style={scaled ? { width: minWidth, transform: `scale(${scale})`, transformOrigin: 'top left' } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
