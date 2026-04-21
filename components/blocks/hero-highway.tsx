/**
 * HeroHighway — animated perspective grid for the homepage hero.
 *
 * Six lines radiate from a vanishing point just above center down through
 * the bottom edge, evoking a highway at speed. A cyan dashed center-lane
 * track scrolls toward the viewer on a 2.2s loop.
 *
 * Cyan is capped per the 5% rule (only in the animated lane dashes).
 * Honors prefers-reduced-motion via globals.css.
 */
export function HeroHighway() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="rri-highway-line" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#225296" stopOpacity="0" />
          <stop offset="40%" stopColor="#225296" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#225296" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="rri-highway-lane" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FFFC" stopOpacity="0" />
          <stop offset="50%" stopColor="#00FFFC" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00FFFC" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="rri-highway-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#225296" stopOpacity="0" />
          <stop offset="100%" stopColor="#225296" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Soft radial wash across the lower half: grounds the perspective */}
      <rect
        x="0"
        y="200"
        width="1200"
        height="500"
        fill="url(#rri-highway-floor)"
      />

      {/* Perspective lines converging at (600, 240) */}
      {[
        [-200, 720],
        [120, 720],
        [380, 720],
        [820, 720],
        [1080, 720],
        [1400, 720],
      ].map(([x, y], i) => (
        <line
          key={i}
          x1={x}
          y1={y}
          x2="600"
          y2="240"
          stroke="url(#rri-highway-line)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ))}

      {/* Static center lane divider for depth */}
      <line
        x1="600"
        y1="720"
        x2="600"
        y2="240"
        stroke="url(#rri-highway-line)"
        strokeWidth={1.75}
      />

      {/* Animated lane markers — cyan dashes scrolling toward viewer */}
      <line
        x1="600"
        y1="720"
        x2="600"
        y2="240"
        stroke="url(#rri-highway-lane)"
        strokeWidth={3}
        strokeDasharray="18 30"
        strokeLinecap="round"
        className="rri-lane-markers"
      />
    </svg>
  );
}
