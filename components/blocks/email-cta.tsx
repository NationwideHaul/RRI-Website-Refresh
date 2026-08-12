"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

const MENU_WIDTH = 256; // w-64

/**
 * Email call to action that never dead-ends. A bare mailto silently does
 * nothing on devices with no default mail app registered (common on desktop),
 * so the button opens a small menu instead: the visitor picks their own mail
 * app, Gmail, or Outlook, or copies the address to paste anywhere.
 *
 * The menu renders in a portal with fixed positioning so it is never clipped by
 * an ancestor's `overflow-hidden` (the hero panel and CTA banner both clip).
 */
export function EmailCTA({ label, address, mailto, gmail, outlook, className }: EmailCTAProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const place = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const half = MENU_WIDTH / 2;
    const center = r.left + r.width / 2;
    const left = Math.min(
      Math.max(center, half + 8),
      window.innerWidth - half - 8,
    );
    setPos({ top: r.bottom + 8, left });
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        menuRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Reposition while open; close on scroll so it can't float away from the button.
    const onScroll = () => setOpen(false);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context): the mailto/webmail rows still work.
    }
  }

  const rows = [
    { key: "app", label: "My email app", href: mailto, external: false },
    { key: "gmail", label: "Gmail", href: gmail, external: true },
    { key: "outlook", label: "Outlook", href: outlook, external: true },
  ];

  return (
    <>
      <button
        ref={triggerRef}
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

      {mounted &&
        open &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{ position: "fixed", top: pos.top, left: pos.left, width: MENU_WIDTH, transform: "translateX(-50%)" }}
            className="z-[100] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 text-left shadow-[0_20px_50px_-16px_rgba(10,37,64,0.45)]"
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
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-gray-50"
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
          </div>,
          document.body,
        )}
    </>
  );
}
