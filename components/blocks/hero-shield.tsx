/**
 * HeroShield — protection pulse rings behind the homepage quote form.
 *
 * Sized to sit on the right side of the hero section so the pulsing
 * rings extend BEYOND the form card edges (the form card's white fill
 * sits on top of the rings, clipping the center but leaving the halo
 * visible on all four sides).
 *
 * Three concentric cyan rings expand outward on a 4.5s loop, staggered
 * 1.5s apart. Honors prefers-reduced-motion via globals.css.
 */
export function HeroShield() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
    >
      {/* Soft shield silhouette anchor */}
      <path
        d="M200 80
           L310 120
           L310 220
           Q310 310 200 360
           Q90 310 90 220
           L90 120
           Z"
        fill="none"
        stroke="#225296"
        strokeOpacity="0.12"
        strokeWidth={1.5}
      />

      {/* Three pulsing protection rings */}
      <circle
        cx="200"
        cy="220"
        r="110"
        fill="none"
        stroke="#00FFFC"
        strokeWidth={2}
        className="rri-shield-ring rri-shield-ring-delay-1"
      />
      <circle
        cx="200"
        cy="220"
        r="110"
        fill="none"
        stroke="#00FFFC"
        strokeWidth={2}
        className="rri-shield-ring rri-shield-ring-delay-2"
      />
      <circle
        cx="200"
        cy="220"
        r="110"
        fill="none"
        stroke="#00FFFC"
        strokeWidth={2}
        className="rri-shield-ring rri-shield-ring-delay-3"
      />
    </svg>
  );
}
