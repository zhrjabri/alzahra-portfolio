/**
 * The site's icon set: hairline monochrome line drawings that paint in
 * currentColor and are sized in em, so each one tracks the type it sits beside.
 *
 * Every icon here is decorative — the label next to it carries the meaning —
 * so they are all aria-hidden. External links pair ExternalLink with
 * screen-reader text saying the link opens in a new tab.
 */

export type IconProps = {
  /** Defaults to 1em so the icon scales with its label. */
  size?: string | number;
  className?: string;
};

function Icon({
  size = "1em",
  className = "",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={`inline-block shrink-0 align-[-0.2em] ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Forward: the next feature, the rest of a story. */
export function ArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 8h11" />
      <path d="m9 4 4 4-4 4" />
    </Icon>
  );
}

/** Back: up and out of a case study. */
export function ArrowLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 8H3" />
      <path d="m7 12-4-4 4-4" />
    </Icon>
  );
}

/** Leaves the site. The single mark used for every external link. */
export function ExternalLink(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M11.5 9v3.5h-8v-8H7" />
      <path d="M9 3.5h3.5V7" />
      <path d="M7.25 8.75 12.5 3.5" />
    </Icon>
  );
}
