"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Footer newsletter signup, posts to /api/newsletter. */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean };
      setStatus(data.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p className="text-sm font-medium text-cyan">
        You are in. Watch your inbox for trucking news and partner offers.
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
      {status === "error" && (
        <p className="basis-full text-xs text-red-300" role="alert">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
