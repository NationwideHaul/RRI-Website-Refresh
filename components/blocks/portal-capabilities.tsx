"use client";

import { useEffect, useRef, useState } from "react";
import {
  CreditCard,
  Download,
  FileCheck,
  FileText,
  UserCog,
  type LucideIcon,
} from "lucide-react";

type Capability = { icon: LucideIcon; title: string; body: string };

const CAPABILITIES: Capability[] = [
  { icon: FileText, title: "View your policies", body: "Every active policy, coverage, and limit in one dashboard." },
  { icon: FileCheck, title: "Issue a Certificate of Insurance", body: "Generate and send a COI instantly, no waiting on anyone." },
  { icon: UserCog, title: "Update your information", body: "Change contact details, addresses, and account info yourself." },
  { icon: Download, title: "Download documents", body: "Pull policy documents, ID cards, and records any time." },
  { icon: CreditCard, title: "Make a payment", body: "Handle your policy payments quickly and securely." },
];

const INTERVAL = 3600;

/**
 * Compact auto-rotating banner of what clients can do in the portal — a slim
 * alternative to a tall card grid. Cycles only while on screen and pauses on
 * hover; respects reduced motion.
 */
export function PortalCapabilities() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = CAPABILITIES.length;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % count), INTERVAL);
    return () => window.clearTimeout(id);
  }, [active, paused, inView, count]);

  const item = CAPABILITIES[active];
  const Icon = item.icon;

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative isolate overflow-hidden rounded-3xl border border-border bg-white shadow-sm"
    >
      {/* Subtle dotted texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(34,82,150,0.10) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-9 text-center sm:flex-row sm:justify-between sm:gap-8 sm:px-10 sm:text-left">
        <p className="max-w-[200px] text-[13px] font-semibold capitalize tracking-normal text-primary">
          Everything you can do from the portal
        </p>

        {/* Rotating item */}
        <div
          key={active}
          className="flex flex-1 animate-in items-center justify-center gap-4 fade-in slide-in-from-bottom-1 duration-500 sm:justify-start"
        >
          <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
            <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
          </span>
          <div className="flex flex-col">
            <span className="text-[17px] font-semibold text-foreground">{item.title}</span>
            <span className="text-[14px] leading-snug text-muted-foreground">{item.body}</span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-1.5" aria-hidden="true">
          {CAPABILITIES.map((c, i) => (
            <button
              key={c.title}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-primary" : "w-1.5 bg-primary/20 hover:bg-primary/40"
              }`}
              aria-label={`Show ${c.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
