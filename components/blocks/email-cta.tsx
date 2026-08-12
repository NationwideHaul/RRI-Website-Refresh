"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Copy, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export type EmailCTAProps = {
  /** Button label, e.g. "Email our Paychex rep". */
  label: string;
  /** Recipient address shown in the "copy" row. */
  address: string;
  /** mailto: link for the visitor's own mail app. */
  mailto: string;
  /** Gmail web compose link. */
  gmail: string;
  /** Outlook web compose link. */
  outlook: string;
  /** Classes for the trigger button (match the surrounding CTA style). */
  className?: string;
};

/**
 * Email call to action that never dead-ends. A bare mailto silently does
 * nothing on devices with no default mail app registered (common on desktop),
 * so the button opens a small menu instead: the visitor picks their own mail
 * app, Gmail, or Outlook, or copies the address to paste anywhere. Every path
 * works without any OS-level handler.
 */
export function EmailCTA({ label, address, mailto, gmail, outlook, className }: EmailCTAProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context): fall back to the mailto row.
    }
  }

  const rows = [
    { key: "app", label: "My email app", href: mailto, external: false },
    { key: "gmail", label: "Gmail", href: gmail, external: true },
    { key: "outlook", label: "Outlook", href: outlook, external: true },
  ];

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn("inline-flex items-center gap-2", className)}
      >
        <Mail className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        {label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-40 mt-2 w-64 max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 text-left shadow-[0_20px_50px_-16px_rgba(10,37,64,0.35)]"
        >
          <p className="px-3 pb-1.5 pt-1 text-[12px] font-semibold uppercase tracking-wide text-gray-400">
            Send with
          </p>
          {rows.map((r) => (
            <a
              key={r.key}
              role="menuitem"
              href={r.href}
              {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-gray-50"
            >
              {r.label}
            </a>
          ))}
          <button
            type="button"
            onClick={copyAddress}
            className="mt-1 flex w-full items-center justify-between gap-2 rounded-xl border-t border-gray-100 px-3 py-2.5 text-left text-[15px] font-medium text-ink transition-colors hover:bg-gray-50"
          >
            <span className="truncate">{copied ? "Copied!" : "Copy email address"}</span>
            {copied ? (
              <Check className="h-4 w-4 flex-shrink-0 text-primary" strokeWidth={2} />
            ) : (
              <Copy className="h-4 w-4 flex-shrink-0 text-gray-400" strokeWidth={2} />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
