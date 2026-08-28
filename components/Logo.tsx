// "The Cipher" — A and Z interlocked as a single monoline, the way an engraved
// cipher or a bookplate sets a monogram. The A's right stem and the Z's diagonal
// cross near the baseline; the Z's arm springs from the A's apex. No serifs, no
// rule — the joint is the whole idea.
//
// Strokes use currentColor so the mark takes the parent's colour.
// The 200x120 viewBox makes the mark 5/3 as wide as it is tall.

const CIPHER = (
  <g strokeLinejoin="miter" strokeMiterlimit={8}>
    {/* A — apex, two stems, crossbar */}
    <path d="M25 102 L67 18 L109 102" />
    <path d="M43 70 H91" />
    {/* Z — arm springing from the apex, diagonal crossing the A's right stem, foot */}
    <path d="M77 18 H159 L95 102 H177" />
  </g>
);

export default function LogoMark({
  size = 28,
  strokeWidth = 4.2,
  className = "",
  title = "Alzahra Al Jabri",
}: {
  /** Height in px; the mark is 5/3 as wide. */
  size?: number;
  strokeWidth?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 120"
      width={(size * 5) / 3}
      height={size}
      role="img"
      aria-label={`${title} monogram`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      {CIPHER}
    </svg>
  );
}
