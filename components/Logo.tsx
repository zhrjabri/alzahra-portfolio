// Serif "AZ" monogram (Alzahra) seated on a rule — no enclosing ring.
// Strokes use currentColor so the mark takes the parent's colour.
// The 150x100 viewBox makes the mark 1.5x as wide as it is tall.

const LETTERS = (
  <g
    transform="translate(75 41) scale(1.35) translate(-49.75 -50)"
    strokeLinejoin="miter"
  >
    {/* A — apex, two stems, crossbar, bracketed feet */}
    <path d="M26 67 L37 33 L48 67" />
    <path d="M29.9 55 H44.1" />
    <path d="M22.5 67 H29.5" />
    <path d="M44.5 67 H51.5" />
    {/* Z — arm, diagonal, foot, with spurs at the outer corners */}
    <path d="M57 33 H77 L57 67 H77" />
    <path d="M57 33 V37.5" />
    <path d="M77 67 V62.5" />
  </g>
);

export default function LogoMark({
  size = 28,
  strokeWidth = 3.4,
  className = "",
  title = "Alzahra Al Jabri",
}: {
  /** Height in px; the mark is 1.5x as wide. */
  size?: number;
  strokeWidth?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 150 100"
      width={size * 1.5}
      height={size}
      role="img"
      aria-label={`${title} monogram`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      {LETTERS}
      <path d="M33 81 H117" strokeWidth={strokeWidth * 0.85} />
    </svg>
  );
}
