import Image from "next/image";
import { SITE } from "@/lib/constants";

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-start gap-8 px-6 py-24 lg:px-8 lg:py-32">
      <Image
        src="/images/rr-primary-logo.png"
        alt="Road Ready Insurance"
        width={220}
        height={64}
        priority
      />

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Coming soon
      </p>

      <h1 className="max-w-3xl text-5xl font-semibold leading-[1.1] text-primary sm:text-6xl">
        Commercial trucking insurance, placed with the carriers that matter.
      </h1>

      <p className="max-w-2xl text-lg leading-[1.6] text-gray-700">
        {SITE.name} is rebuilding. Licensed in 48 states plus DC, access to
        100+ carriers including premium A-rated markets, and in-house licensed
        claims. The full site ships in the coming weeks.
      </p>

      <div className="flex items-center gap-3 pt-2 text-sm text-gray-500">
        <span className="h-2 w-2 rounded-full bg-cyan" />
        Boca Raton, FL &middot; Built for fleets that are built to last.
      </div>
    </section>
  );
}
