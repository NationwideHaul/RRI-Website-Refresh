"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLImageElement>(null);

  // If the image is already cached/complete before React attaches onLoad, the
  // load event never fires, check on mount so it doesn't stay invisible. A
  // short re-check catches the race where the image completes in the gap
  // between first paint and this effect without ever firing onLoad.
  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
      return;
    }
    const id = setTimeout(() => {
      if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
    }, 150);
    return () => clearTimeout(id);
  }, []);

  return (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-cover transition-opacity duration-500",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
