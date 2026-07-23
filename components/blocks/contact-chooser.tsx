"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, FileText, UserRound } from "lucide-react";
import { QuoteForm } from "@/components/blocks/quote-form";
import { RequestForm } from "@/components/blocks/request-form";

type Choice = null | "quote" | "existing";

/**
 * Contact-page entry point. Before any form shows, the visitor picks whether
 * they want a NEW quote or they're an EXISTING client. The two paths submit
 * to different endpoints / inboxes (quote leads vs. customer service), which
 * is the whole reason for the split. A "Choose again" link swaps back.
 */
export function ContactChooser() {
  const [choice, setChoice] = useState<Choice>(null);

  if (choice === null) {
    return (
      <div className="flex flex-col gap-4">
        <ChoiceCard
          icon={FileText}
          title="I want to get a quote"
          body="New to Road Ready? Tell us about your operation and a licensed agent builds your quote."
          onClick={() => setChoice("quote")}
        />
        <ChoiceCard
          icon={UserRound}
          title="I'm an existing client"
          body="Already insured with us? Send your customer service team a message and we'll take it from there."
          onClick={() => setChoice("existing")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={() => setChoice(null)}
        className="inline-flex w-fit items-center gap-1.5 text-[14px] font-semibold text-primary transition-colors hover:text-primary-dark"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Choose again
      </button>
      {choice === "quote" ? <QuoteForm /> : <RequestForm kind="customer-service" />}
    </div>
  );
}

function ChoiceCard({
  icon: Icon,
  title,
  body,
  onClick,
}: {
  icon: typeof FileText;
  title: string;
  body: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm outline-none transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2"
    >
      <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-soft">
        <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
      </span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="text-[18px] font-semibold text-foreground">{title}</span>
        <span className="text-[14px] leading-[1.55] text-gray-600">{body}</span>
      </span>
      <ArrowRight
        className="h-5 w-5 flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
        strokeWidth={2}
      />
    </button>
  );
}
