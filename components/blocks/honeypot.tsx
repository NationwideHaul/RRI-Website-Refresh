/**
 * Invisible honeypot field posted as `_hp`. Bots fill it; the /api/lead route
 * silently drops any submission where it's non-empty.
 *
 * Hidden via off-screen absolute positioning (NOT display:none) — some bots
 * skip display:none fields, so this catches more of them while staying
 * invisible and out of the tab order for real users and screen readers.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden opacity-0"
    >
      <label>
        Company website
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
