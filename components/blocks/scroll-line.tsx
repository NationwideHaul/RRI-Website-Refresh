"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Decorative scroll-drawn line (Lusion.co style).
 *
 * Renders one lightweight SVG `<path>` that visually connects a set of anchor
 * elements down the page, then reveals itself as the user scrolls (via
 * stroke-dasharray / stroke-dashoffset tied to scroll progress).
 *
 * - Path geometry is recomputed from each anchor's getBoundingClientRect() on
 *   mount and on resize (rAF-throttled, ResizeObserver on <body>), never on
 *   every scroll frame — scroll only updates the dashoffset.
 * - Coordinates are relative to the wrapper (which is absolute inset-0 of a
 *   `position: relative` ancestor), so they stay correct at any scroll offset.
 * - Renders nothing if fewer than 2 anchors are found (e.g. other routes).
 *
 * Stroke color / width live in the `.rri-scroll-line` class in globals.css.
 */
type Pt = { x: number; y: number };

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

/** Smooth cubic path through points (Catmull-Rom → Bézier). */
function smoothPath(pts: Pt[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export function ScrollLine({ anchors }: { anchors: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [d, setD] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });
  // Path's vertical extent within the wrapper — drives scroll progress.
  const yRange = useRef({ start: 0, end: 0 });

  // ---- Build / rebuild the path from the anchors (mount + resize only) ----
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;

    const build = () => {
      const els = anchors
        .map((sel) => document.querySelector<HTMLElement>(sel))
        .filter((el): el is HTMLElement => !!el);
      if (els.length < 2) {
        setD("");
        return;
      }

      const wrapRect = wrap.getBoundingClientRect();
      const wrapTop = wrapRect.top + window.scrollY;
      const W = wrap.offsetWidth;
      const H = wrap.offsetHeight;
      const last = els.length - 1;
      const topOf = (el: HTMLElement) =>
        el.getBoundingClientRect().top + window.scrollY - wrapTop;
      const rectOf = (el: HTMLElement) => el.getBoundingClientRect();

      // Swing points reach close to the left / right edges so the line
      // visibly connects the sections side to side, with an extra turn
      // between each pair for a more looping, decorative feel.
      const leftX = W * 0.04;
      const rightX = W * 0.96;
      const pts: Pt[] = [];

      // Start: emerge from the far-left edge, at the top of the first box.
      const f0 = rectOf(els[0]);
      pts.push({ x: W * 0.03, y: topOf(els[0]) + f0.height * 0.02 });

      // Middle sections: oscillate to alternating edges, with a mid turn.
      for (let i = 1; i < last; i++) {
        const r = rectOf(els[i]);
        const yc = topOf(els[i]) + r.height / 2;
        const onRight = i % 2 === 1;
        const side = onRight ? rightX : leftX;
        const opp = onRight ? leftX : rightX;
        const prevY = pts[pts.length - 1].y;
        pts.push({ x: opp, y: (prevY + yc) / 2 }); // extra turn between sections
        pts.push({ x: side, y: yc });
      }

      // End: curve back to center then tuck down into the footer, off-left.
      const fr = rectOf(els[last]);
      const fTop = topOf(els[last]);
      pts.push({ x: rightX, y: fTop - fr.height * 0.15 });
      pts.push({ x: W * 0.5, y: fTop + fr.height * 0.25 });
      pts.push({ x: W * 0.12, y: fTop + fr.height * 0.72 });

      yRange.current = { start: pts[0].y, end: pts[pts.length - 1].y };
      setSize({ w: W, h: H });
      setD(smoothPath(pts));
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(build);
    };

    build();
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    window.addEventListener("resize", schedule);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [anchors]);

  // ---- Reveal on scroll (dashoffset only; rAF-throttled) ----
  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap || !d) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;

    let raf = 0;
    const update = () => {
      raf = 0;
      const wrapTopVp = wrap.getBoundingClientRect().top;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const { start, end } = yRange.current;
      const span = Math.max(1, end - start);
      // Reveal line sits ~55% down the viewport; progress = how much of the
      // path's y-range is above it.
      const progress = clamp(
        (vh * 0.55 - (wrapTopVp + start)) / span,
        0,
        1,
      );
      path.style.strokeDashoffset = `${len * (1 - progress)}`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [d]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {d && (
        <svg
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          fill="none"
          className="absolute left-0 top-0"
        >
          <path ref={pathRef} d={d} className="rri-scroll-line" />
        </svg>
      )}
    </div>
  );
}
