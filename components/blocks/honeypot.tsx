/**
 * Invisible honeypot field posted as `_hp`. Bots fill it; the /api/lead route
 * silently drops any submission where it's non-empty.
 *
 * Hidden via off-screen absolute positioning (NOT display:none) — some bots
 * skip display:none fields, so this catches more of them while staying
 * invisible and out of the tab order for real users and screen readers.
 *
 * CRITICAL: password managers (1Password/LastPass/Bitwarden) and browser
 * autofill will happily fill a hidden text field — and a field labeled
 * "Company website" gets swept up when they autofill the company/org fields.
 * When that happens the server drops the submission as a bot and the real
 * lead is lost silently. So we must keep every autofiller OUT of this field:
 *   - the data-*-ignore attributes opt the major password managers out
 *   - a neutral, non-org name/label avoids matching Chrome's autofill classes
 * Do NOT revert these — losing them silently drops leads for anyone with a
 * password manager enabled.
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
        Leave this field empty
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore="true"
          data-lpignore="true"
          data-bwignore="true"
          data-form-type="other"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
