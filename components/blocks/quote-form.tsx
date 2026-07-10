"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NAP } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  dot: string;
  authority: string;
  consent: boolean;
  companyWebsite: string; // honeypot
};

const INITIAL: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  dot: "",
  authority: "",
  consent: false,
  companyWebsite: "",
};

export type QuoteFormVariant = "light" | "glass";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

export function QuoteForm({
  variant = "light",
}: {
  /** "glass" = WhatsApp-style dark frosted card for photo backgrounds. */
  variant?: QuoteFormVariant;
} = {}) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const glass = variant === "glass";

  const FIELD_CLASS = cn(
    "h-12 w-full bg-white px-4 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 disabled:cursor-not-allowed disabled:opacity-60",
    glass
      ? "rounded-lg border border-white/30 focus-visible:border-cyan"
      : "rounded-lg border-[1.5px] border-gray-300 focus-visible:border-primary",
  );

  const LABEL_CLASS = cn(
    "mb-2 block text-[14px] font-medium leading-tight",
    glass ? "text-white" : "text-foreground",
  );

  const ERROR_CLASS = cn(
    "mt-1 text-[13px]",
    glass ? "text-red-300" : "text-destructive",
  );

  const REQUIRED_CLASS = glass ? "text-red-300" : "text-destructive";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Required.";
    if (!form.company.trim()) next.company = "Required.";
    if (!form.email.trim()) next.email = "Required.";
    else if (!isValidEmail(form.email)) next.email = "Double-check the email.";
    if (!form.phone.trim()) next.phone = "Required.";
    else if (!isValidPhone(form.phone)) next.phone = "Phone looks incomplete.";
    if (!form.dot.trim()) next.dot = "Required.";
    if (!form.authority) next.authority = "Pick one.";
    if (!form.consent) next.consent = "Please confirm to submit.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ??
            "Something went wrong sending that. Please try again in a moment.",
        );
        return;
      }

      if (typeof window !== "undefined") {
        const gtag = (
          window as unknown as {
            gtag?: (command: string, name: string, params: Record<string, unknown>) => void;
          }
        ).gtag;
        gtag?.("event", "quote_form_submit", {
          event_category: "lead",
          event_label: form.authority,
        });
      }

      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending that. Please try again in a moment.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-center gap-4 p-8 text-center",
          glass
            ? "rounded-[28px] border border-white/15 bg-primary-dark/45 shadow-2xl backdrop-blur-2xl"
            : "rounded-2xl border border-gray-100 bg-white",
        )}
      >
        <CheckCircle2 className="h-10 w-10 text-success" strokeWidth={1.5} />
        <h3 className={cn("text-[20px] font-semibold", glass ? "text-white" : "text-foreground")}>
          Got it. An agent will reach out within 2 business hours.
        </h3>
        <p className={cn("text-[15px] leading-[1.55]", glass ? "text-white/80" : "text-gray-700")}>
          If you need something sooner, call us at {NAP.phoneDisplay}.
        </p>
      </div>
    );
  }

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "flex flex-col gap-5 p-6 lg:p-7",
        glass
          ? "rounded-[28px] border border-white/15 bg-primary-dark/45 shadow-2xl backdrop-blur-2xl"
          : "rounded-2xl border border-gray-100 bg-white shadow-sm",
      )}
    >
      <div className={cn("flex flex-col gap-1", glass && "items-center text-center")}>
        <h2
          className={cn(
            "text-[22px] font-semibold leading-tight sm:text-[24px]",
            glass ? "text-white" : "text-foreground",
          )}
        >
          Speak with an Expert Today
        </h2>
        <p className={cn("text-[13px]", glass ? "text-white/70" : "text-gray-500")}>
          A licensed agent will reach out.
        </p>
      </div>

      {status === "error" && errorMessage && (
        <div
          role="alert"
          className={cn(
            "rounded-lg px-4 py-3 text-[14px]",
            glass
              ? "border border-red-300/40 bg-red-500/15 text-red-100"
              : "border border-destructive/30 bg-destructive/5 text-destructive",
          )}
        >
          {errorMessage}{" "}
          {!NAP.phone.startsWith("PLACEHOLDER_") &&
            `Or call us directly at ${NAP.phoneDisplay}.`}
        </div>
      )}

      {/* Honeypot — not visible to humans, bots will fill it. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.companyWebsite}
            onChange={(e) => update("companyWebsite", e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="qf-fullname" className={LABEL_CLASS}>
            Full Name <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="qf-fullname"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            className={cn(
              FIELD_CLASS,
              errors.fullName && "border-destructive focus-visible:border-destructive",
            )}
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.fullName && <p className={ERROR_CLASS}>{errors.fullName}</p>}
        </div>

        <div>
          <Label htmlFor="qf-company" className={LABEL_CLASS}>
            Company Name <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="qf-company"
            type="text"
            autoComplete="organization"
            placeholder="Fleet LLC"
            className={cn(
              FIELD_CLASS,
              errors.company && "border-destructive focus-visible:border-destructive",
            )}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.company && <p className={ERROR_CLASS}>{errors.company}</p>}
        </div>

        <div>
          <Label htmlFor="qf-email" className={LABEL_CLASS}>
            Email <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="qf-email"
            type="email"
            autoComplete="email"
            placeholder="jane@fleet.com"
            className={cn(
              FIELD_CLASS,
              errors.email && "border-destructive focus-visible:border-destructive",
            )}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.email && <p className={ERROR_CLASS}>{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="qf-phone" className={LABEL_CLASS}>
            Phone Number <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="qf-phone"
            type="tel"
            autoComplete="tel"
            placeholder="(305) 555-0100"
            className={cn(
              FIELD_CLASS,
              errors.phone && "border-destructive focus-visible:border-destructive",
            )}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.phone && <p className={ERROR_CLASS}>{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="qf-dot" className={LABEL_CLASS}>
            USDOT Number <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="qf-dot"
            type="text"
            inputMode="numeric"
            placeholder="1234567"
            className={cn(
              FIELD_CLASS,
              errors.dot && "border-destructive focus-visible:border-destructive",
            )}
            value={form.dot}
            onChange={(e) => update("dot", e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.dot && <p className={ERROR_CLASS}>{errors.dot}</p>}
        </div>

        <div>
          <Label htmlFor="qf-authority" className={LABEL_CLASS}>
            Authority <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Select
            value={form.authority || undefined}
            onValueChange={(v) => update("authority", v as string)}
            disabled={isLoading}
          >
            <SelectTrigger
              id="qf-authority"
              className={cn(
                FIELD_CLASS,
                "!h-12 justify-between text-left data-[placeholder]:text-gray-500",
                errors.authority &&
                  "border-destructive focus-visible:border-destructive",
              )}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new-authority">New Authority</SelectItem>
              <SelectItem value="existing-authority">Existing Authority</SelectItem>
              <SelectItem value="pending-cancellation">Pending Cancellation</SelectItem>
            </SelectContent>
          </Select>
          {errors.authority && (
            <p className={ERROR_CLASS}>{errors.authority}</p>
          )}
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="qf-consent"
          checked={form.consent}
          onCheckedChange={(v) => update("consent", v === true)}
          disabled={isLoading}
          aria-invalid={!!errors.consent}
          className={cn(
            "mt-0.5 shrink-0",
            glass && "border-white/50 bg-white/10 data-[state=checked]:border-cyan data-[state=checked]:bg-cyan data-[state=checked]:text-primary-dark",
          )}
        />
        <div className="flex flex-col gap-1">
          <label
            htmlFor="qf-consent"
            className={cn(
              "cursor-pointer text-[12.5px] leading-[1.5]",
              glass ? "text-white/70" : "text-gray-500",
            )}
          >
            I agree to the{" "}
            <Link
              href="/privacy-policy/"
              className={cn(
                "underline underline-offset-2",
                glass ? "text-cyan hover:text-white" : "text-primary hover:text-primary-dark",
              )}
            >
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link
              href="/terms-conditions/"
              className={cn(
                "underline underline-offset-2",
                glass ? "text-cyan hover:text-white" : "text-primary hover:text-primary-dark",
              )}
            >
              Terms of Service
            </Link>
            , and consent to receive communications from Road Ready Insurance.
          </label>
          {errors.consent && (
            <p className={cn("text-[12px]", glass ? "text-red-300" : "text-destructive")}>
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 text-[17px] font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-primary/80",
          glass && "hover:bg-cyan hover:text-primary-dark",
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            Sending...
          </>
        ) : (
          "Submit Request"
        )}
      </button>
    </form>
  );
}
