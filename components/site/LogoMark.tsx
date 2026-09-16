import { useId } from "react";

import {
  MARK_COMPACT,
  MARK_ITALIC,
  MARK_PRIMARY,
  PLATE_KNOCKOUT,
  type MarkDrawing,
} from "@/lib/brand";

type Variant = "primary" | "compact" | "italic" | "plate";

const DRAWINGS: Record<Exclude<Variant, "plate">, MarkDrawing> = {
  primary: MARK_PRIMARY,
  compact: MARK_COMPACT,
  italic: MARK_ITALIC,
};

function Drawing({ mark, color }: { mark: MarkDrawing; color: string }) {
  const { bowl } = mark;
  return (
    <g transform={mark.transform}>
      <ellipse
        cx={bowl.cx}
        cy={bowl.cy}
        rx={bowl.rx}
        ry={bowl.ry}
        fill="none"
        stroke={color}
        strokeWidth={bowl.stroke}
      />
      <path d={mark.stem.d} fill="none" stroke={color} strokeWidth={mark.stem.stroke} />
      <path d={mark.cut} fill={color} />
      <path d={mark.rule} fill={color} />
    </g>
  );
}

/**
 * The Byline mark. Paints in currentColor; decorative unless `title` is given.
 * Below 32px use "compact" (or "plate"), whose strokes survive small sizes.
 */
export default function LogoMark({
  variant = "primary",
  size = 32,
  title,
  className = "",
}: {
  variant?: Variant;
  size?: number;
  title?: string;
  className?: string;
}) {
  // useId returns ":r1:"-style ids; colons are awkward inside url(#…).
  const maskId = `plate${useId().replace(/:/g, "")}`;
  const a11y = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const, focusable: "false" as const };

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      {...a11y}
    >
      {variant === "plate" ? (
        <>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
            <rect width="48" height="48" fill="#fff" />
            <Drawing mark={PLATE_KNOCKOUT} color="#000" />
          </mask>
          <rect width="48" height="48" fill="currentColor" mask={`url(#${maskId})`} />
        </>
      ) : (
        <Drawing mark={DRAWINGS[variant]} color="currentColor" />
      )}
    </svg>
  );
}
