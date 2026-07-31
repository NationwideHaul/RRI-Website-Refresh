"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Hero backdrop. On touch / small / reduced-motion devices we render ONLY the
 * lightweight poster image (via next/image) and never download or decode the
 * 1.6 MB autoplay video — the single biggest mobile-bandwidth item on the home
 * page. On larger pointer devices we swap in the autoplaying video after mount.
 * SSR always emits the poster, so the LCP paint never waits on client JS.
 */
const CLASS =
  "pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover";

export function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const heavyOk =
      window.matchMedia("(min-width: 769px)").matches &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (heavyOk) setShowVideo(true);
  }, []);

  if (!showVideo) {
    return (
      <Image
        aria-hidden="true"
        src="/videos/home-hero-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={CLASS}
      />
    );
  }

  return (
    <video
      aria-hidden="true"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/videos/home-hero-poster.jpg"
      className={CLASS}
    >
      <source src="/videos/home-hero.mp4" type="video/mp4" />
    </video>
  );
}
