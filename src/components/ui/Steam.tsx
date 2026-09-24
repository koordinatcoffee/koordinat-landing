/** Three blurred wisps rising on staggered CSS loops. Purely decorative. */
export function Steam({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute flex justify-center ${className}`}>
      <span className="steam" />
      <span className="steam" />
      <span className="steam" />
    </div>
  );
}
