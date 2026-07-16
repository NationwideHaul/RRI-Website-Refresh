"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Lightweight YouTube embed: shows the poster thumbnail with a play button and
 * only loads the (privacy-enhanced) iframe once clicked, no heavy player
 * scripts on initial load, and multiple videos can sit on one page cheaply.
 */
export function YouTubeLite({
  videoId,
  title,
  label,
}: {
  videoId: string;
  title: string;
  /** Small badge, e.g. a language tag. */
  label?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-200 bg-primary-dark shadow-sm">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerated-camera; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-primary-dark/25 transition-colors group-hover:bg-primary-dark/10" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-7 w-7 fill-primary text-primary" strokeWidth={0} />
            </span>
            {label && (
              <span className="absolute left-3 top-3 rounded-full bg-primary-dark/80 px-3 py-1 text-[12px] font-semibold text-white">
                {label}
              </span>
            )}
          </button>
        )}
      </div>
      <p className="text-[15px] font-semibold text-foreground">{title}</p>
    </div>
  );
}
