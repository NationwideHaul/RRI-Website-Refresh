"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fill photo with a fade-in on load.
 *
 * Besides looking nicer, the onLoad style mutation works around a Chrome
 * paint bug: a fill image inside a rounded overflow-hidden container can
 * finish loading without ever being painted until something invalidates
 * the frame (scroll, style change). Toggling opacity on load guarantees
 * that invalidation.
 */
export function FillPhoto({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-cover object-center transition-opacity duration-500",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
