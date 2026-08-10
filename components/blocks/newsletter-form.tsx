"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ConsentNoticeText } from "@/components/blocks/consent-notice";
import { Honeypot } from "@/components/blocks/honeypot";
import { TurnstileWidget, TURNSTILE_ENABLED } from "@/components/blocks/turnstile-widget";
import { cn } from "@/lib/utils";

/** Footer newsletter signup, posts to /api/newsletter (double opt-in). */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot (_hp)
  const [token, setToken] = useState(""); // Turnstile token
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const renderedAt = useRef(0);

  useEffect(() => {
    // Timestamp the moment the form is interactive on the client (time-trap).
    renderedAt.current = Date.now();
  }, []);

  const onToken = useCallback((t: string) => setToken(t), []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    if (TURNSTILE_ENABLED && !token) {
      setStatus("error");
      setErrorMessage("Please complete the verification below.");
      return;
    }

    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/newsletter/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          _hp: hp,
          renderedAt: renderedAt.current,
          turnstileToken: token,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Try again.");
    }
  };

  if (status === "done") {
    return (
      <p className="text-sm font-medium text-cyan">
        Almost there! Check your inbox and click the link to confirm your subscription.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-wrap gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email Address"
        className="h-11 min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus:border-cyan focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "h-11 shrink-0 rounded-lg bg-cyan px-5 text-sm font-semibold text-primary-dark transition-colors hover:bg-white",
          status === "sending" && "opacity-70",
        )}
      >
        {status === "sending" ? "Subscribing..." : "Subscribe"}
      </button>

      <Honeypot value={hp} onChange={setHp} />

      {TURNSTILE_ENABLED && (
        <div className="basis-full">
          <TurnstileWidget onToken={onToken} />
        </div>
      )}

      {status === "error" && (
        <p className="basis-full text-xs text-red-300" role="alert">
          {errorMessage ?? "Something went wrong. Try again."}
        </p>
      )}
      <p className="basis-full text-[11.5px] leading-[1.5] text-white/50">
        <ConsentNoticeText variant="glass" kind="subscribe" />
      </p>
    </form>
  );
}
