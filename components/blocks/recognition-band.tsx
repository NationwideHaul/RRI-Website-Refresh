import { Award } from "lucide-react";

/**
 * Recognition ticker — a slim off-white bar with an infinite, seamlessly looping
 * marquee of the BusinessRate recognition. Pure CSS animation (rri-marquee),
 * pauses on hover, and freezes under prefers-reduced-motion.
 */
const MESSAGE = "Recognized by BusinessRate as the top-ranked insurance agency of 2026.";

/** BusinessRate wordmark + recognition line, one marquee unit. */
function Unit() {
  return (
    <div className="flex items-center gap-3 px-8">
      <Award className="h-4 w-4 flex-shrink-0 text-primary" strokeWidth={2} />
      <span className="text-[14px] tracking-tight text-foreground">
        <span className="font-extrabold">Business</span>
        <span className="font-medium text-muted-foreground">Rate</span>
      </span>
      <span className="text-[14px] text-muted-foreground">{MESSAGE}</span>
      <span aria-hidden="true" className="ml-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary/40" />
    </div>
  );
}

export function RecognitionBand() {
  // A base set of units; the track renders it twice and translates -50% for a
  // seamless loop. Enough copies to fill wide viewports before repeating.
  const base = Array.from({ length: 4 });

  return (
    <section aria-label="Recognition" className="border-y border-border bg-[#f5f7fa]">
      <div
        className="rri-marquee overflow-hidden py-3.5"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div
          className="rri-marquee-track"
          style={{ ["--marquee-duration" as string]: "60s" }}
        >
          {[...base, ...base].map((_, i) => (
            <div key={i} aria-hidden={i >= base.length} className="flex shrink-0 items-center">
              <Unit />
            </div>
          ))}
        </div>
      </div>
      {/* Accessible, non-animated copy of the recognition */}
      <span className="sr-only">{MESSAGE}</span>
    </section>
  );
}
