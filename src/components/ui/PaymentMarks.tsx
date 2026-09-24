/**
 * Card acceptance band (Visa, Mastercard, Troy, 3D Secure, PayTR).
 * Simple vector marks on white chips; PayTR's official logo band from the
 * merchant panel can replace this after approval.
 */
const chip = "flex h-9 w-[64px] items-center justify-center rounded-md bg-white px-2 shadow-[0_1px_0_rgba(0,0,0,0.06)]";

export function PaymentMarks({ className = "", label }: { className?: string; label: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label={label}>
      <li className={chip} title="Visa">
        <svg viewBox="0 0 64 22" className="h-4 w-auto" role="img" aria-label="Visa">
          <text x="32" y="18" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="20" fill="#1A1F71">
            VISA
          </text>
        </svg>
      </li>
      <li className={chip} title="Mastercard">
        <svg viewBox="0 0 40 24" className="h-6 w-auto" role="img" aria-label="Mastercard">
          <circle cx="15" cy="12" r="9" fill="#EB001B" />
          <circle cx="25" cy="12" r="9" fill="#F79E1B" />
          <path d="M20 4.5a9 9 0 0 1 0 15 9 9 0 0 1 0-15z" fill="#FF5F00" />
        </svg>
      </li>
      <li className={chip} title="Troy">
        <svg viewBox="0 0 60 22" className="h-4 w-auto" role="img" aria-label="Troy">
          <text x="30" y="17" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="19" fill="#00A0AF">
            troy
          </text>
        </svg>
      </li>
      <li className={`${chip} w-[76px]`} title="3D Secure">
        <svg viewBox="0 0 76 22" className="h-4 w-auto" role="img" aria-label="3D Secure">
          <text x="38" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#1F2A28">
            3D Secure
          </text>
        </svg>
      </li>
      <li className={`${chip} w-[72px]`} title="PayTR">
        <svg viewBox="0 0 64 22" className="h-4 w-auto" role="img" aria-label="PayTR">
          <text x="32" y="17" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="17" fill="#1F2A28">
            Pay<tspan fill="#E30A17">TR</tspan>
          </text>
        </svg>
      </li>
    </ul>
  );
}
