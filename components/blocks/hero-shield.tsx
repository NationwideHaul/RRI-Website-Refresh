/**
 * HeroShield — protection pulse rings behind the homepage quote form.
 *
 * A subtle shield outline sits behind the form card, with three concentric
 * cyan rings expanding outward in sequence (staggered 1.5s apart). The
 * animation metaphor: the form IS the moment of requesting protection,
 * and the pulse visualizes that protection radiating outward.
 *
 * Honors prefers-reduced-motion via globals.css.
 */
export function HeroShield() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full pointer-events-none"
    >
      {/* Static shield silhouette */}
      <path
        d="M200 60
           L310 100
           L310 210
           Q310 300 200 350
           Q90 300 90 210
           L90 100
           Z"
        fill="none"
        stroke="#225296"
        strokeOpacity="0.08"
        strokeWidth={1.5}
      />
      <path
        d="M200 100
           L270 130
           L270 205
           Q270 265 200 305
           Q130 265 130 205
           L130 130
           Z"
        fill="none"
        stroke="#225296"
        strokeOpacity="0.06"
        strokeWidth={1.25}
      />

      {/* Three pulsing protection rings */}
      <circle
        cx="200"
        cy="205"
        r="110"
        fill="none"
        stroke="#00FFFC"
        strokeWidth={1.5}
        className="rri-shield-ring rri-shield-ring-delay-1"
      />
      <circle
        cx="200"
        cy="205"
        r="110"
        fill="none"
        stroke="#00FFFC"
        strokeWidth={1.5}
        className="rri-shield-ring rri-shield-ring-delay-2"
      />
      <circle
        cx="200"
        cy="205"
        r="110"
        fill="none"
        stroke="#00FFFC"
        strokeWidth={1.5}
        className="rri-shield-ring rri-shield-ring-delay-3"
      />
    </svg>
  );
}
