/**
 * HeroHighway — SVG perspective grid for the homepage hero background.
 *
 * Five lines radiating from a vanishing point near the top-center down
 * through the bottom edge, plus a center lane with dashed markers that
 * animate toward the viewer (giving a "driving forward" feel).
 *
 * All strokes use Deep Blue with low opacity so the hero text sits on
 * a clean canvas. The cyan accent is reserved for the lane markers only,
 * per the 5% cyan rule in the Design doc.
 */
export function HeroHighway() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full pointer-events-none"
    >
      <defs>
        <linearGradient id="rri-highway-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#225296" stopOpacity="0" />
          <stop offset="40%" stopColor="#225296" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#225296" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="rri-lane-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FFFC" stopOpacity="0" />
          <stop offset="50%" stopColor="#00FFFC" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00FFFC" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="rri-highway-fade" cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* Perspective lines: all converge at (600, 280) */}
      {[
        [-200, 820],
        [100, 820],
        [350, 820],
        [850, 820],
        [1100, 820],
        [1400, 820],
      ].map(([x, y], i) => (
        <line
          key={i}
          x1={x}
          y1={y}
          x2="600"
          y2="280"
          stroke="url(#rri-highway-grad)"
          strokeWidth={1.25}
        />
      ))}

      {/* Center lane divider */}
      <line
        x1="600"
        y1="820"
        x2="600"
        y2="280"
        stroke="url(#rri-highway-grad)"
        strokeWidth={1.5}
      />

      {/* Animated lane markers (cyan dashes moving toward viewer) */}
      <line
        x1="600"
        y1="820"
        x2="600"
        y2="280"
        stroke="url(#rri-lane-grad)"
        strokeWidth={2.5}
        strokeDasharray="16 32"
        strokeLinecap="round"
        className="rri-lane-markers"
      />

      {/* Soft vignette so the edges don't compete with the content */}
      <rect width="1200" height="800" fill="url(#rri-highway-fade)" />
    </svg>
  );
}
