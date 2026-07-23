import { Award } from "lucide-react";

/**
 * Recognition ticker — a slim off-white bar with an infinite, seamlessly looping
 * marquee of the BusinessRate recognition. Pure CSS animation (rri-marquee),
 * pauses on hover, and freezes under prefers-reduced-motion.
 */
// Primary recognition line (kept for the accessible, non-animated copy).
const MESSAGE = "Recognized by BusinessRate as the top-ranked insurance agency of 2026.";

// A rotating set of short recognition/trust lines so the ticker reads as a
// band of proof points rather than the same sentence looping over and over.
const MESSAGES = [
  "Recognized by BusinessRate as the top-ranked insurance agency of 2026.",
  "Rated 5.0 stars by the fleet operators we serve.",
  "Access to 100+ commercial trucking carriers, including premium A-rated markets.",
  "Licensed in 48 states plus DC, with named agents who answer the phone.",
  "A GEICO commercial trucking partner.",
];

/** One recognition / trust line, one marquee unit. */
function Unit({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 px-8">
      <Award className="h-4 w-4 flex-shrink-0 text-primary" strokeWidth={2} />
      <span className="text-[14px] text-muted-foreground">{message}</span>
      <span aria-hidden="true" className="ml-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary/40" />
    </div>
  );
}

export function RecognitionBand() {
  // The track renders the message set twice and translates -50% for a seamless
  // loop. Each message appears once per set, so the ticker rotates through the
  // proof points instead of repeating a single line.
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
          {[...MESSAGES, ...MESSAGES].map((message, i) => (
            <div key={i} aria-hidden={i >= MESSAGES.length} className="flex shrink-0 items-center">
              <Unit message={message} />
            </div>
          ))}
        </div>
      </div>
      {/* Accessible, non-animated copy of the recognition */}
      <span className="sr-only">{MESSAGE}</span>
    </section>
  );
}
