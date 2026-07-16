import { Reveal } from "@/components/blocks/reveal";

export type LegalSection = {
  heading: string;
  /** Paragraphs of body text. */
  body?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
};

/**
 * Shared layout for the Privacy Policy and Terms & Conditions pages:
 * a compact dark header band, then a narrow, readable prose column.
 */
export function LegalLayout({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary-dark">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-70"
          style={{ background: "radial-gradient(50% 80% at 85% 10%, rgba(0,255,252,0.10), transparent 60%)" }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-[13px] font-semibold capitalize tracking-normal text-cyan">Legal</p>
          <h1 className="mt-3 text-[36px] type-display text-white sm:text-[48px]">{title}</h1>
          <p className="mt-4 text-[14px] text-white/70">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-[17px] leading-[1.7] text-gray-700">{intro}</p>

          <div className="mt-10 flex flex-col gap-10">
            {sections.map((section) => (
              <Reveal key={section.heading}>
                <div className="flex flex-col gap-4">
                  <h2 className="text-[22px] type-h3 text-foreground sm:text-[24px]">
                    {section.heading}
                  </h2>
                  {section.body?.map((p, i) => (
                    <p key={i} className="text-[16px] leading-[1.7] text-gray-700">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="flex flex-col gap-2">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[16px] leading-[1.6] text-gray-700">
                          <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
