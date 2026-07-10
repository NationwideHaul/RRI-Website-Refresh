import { NAP } from "@/lib/constants";

/** Full-width utility bar above the nav: "Talk to an expert now" + phone. */
export function TopBar() {
  return (
    <div className="w-full bg-primary-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-2.5">
        <span className="text-[14px] text-white/85">Talk to an expert now:</span>
        <a
          href={`tel:${NAP.phone}`}
          className="rounded-lg bg-cyan px-4 py-1 text-[14px] font-bold text-primary-dark transition-colors hover:bg-white"
        >
          {NAP.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
