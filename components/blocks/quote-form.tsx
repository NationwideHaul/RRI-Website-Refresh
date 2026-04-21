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

const FIELD_CLASS =
  "h-12 w-full rounded-lg border-[1.5px] border-gray-300 bg-white px-4 text-[16px] text-foreground placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 disabled:cursor-not-allowed disabled:opacity-60";

const LABEL_CLASS =
  "mb-2 block text-[14px] font-medium leading-tight text-foreground";

const ERROR_CLASS = "mt-1 text-[13px] text-destructive";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

export function QuoteForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        className="flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-white p-8 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-success" strokeWidth={1.5} />
        <h3 className="text-[20px] font-semibold text-foreground">
          Got it. An agent will reach out within 2 business hours.
        </h3>
        <p className="text-[15px] leading-[1.55] text-gray-700">
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
      className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-7"
    >
      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-[14px] text-destructive"
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
            Full name <span className="text-destructive">*</span>
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
            Company name <span className="text-destructive">*</span>
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
            Email <span className="text-destructive">*</span>
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
            Phone number <span className="text-destructive">*</span>
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
            USDOT number
          </Label>
          <Input
            id="qf-dot"
            type="text"
            inputMode="numeric"
            placeholder="1234567"
            className={FIELD_CLASS}
            value={form.dot}
            onChange={(e) => update("dot", e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="qf-authority" className={LABEL_CLASS}>
            Authority <span className="text-destructive">*</span>
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
              <SelectValue placeholder="Select authority status" />
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
          className="mt-1 shrink-0"
        />
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="qf-consent"
            className="cursor-pointer text-[13px] leading-[1.5] font-normal text-gray-700"
          >
            I agree to the{" "}
            <Link
              href="/privacy-policy/"
              className="text-primary underline underline-offset-2 hover:text-primary-dark"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms-conditions/"
              className="text-primary underline underline-offset-2 hover:text-primary-dark"
            >
              Terms of Service
            </Link>
            , and consent to receive marketing emails from Road Ready Insurance.
            Unsubscribe any time.
          </Label>
          {errors.consent && (
            <p className="text-[12px] text-destructive">{errors.consent}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 text-[17px] font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-primary/80"
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
