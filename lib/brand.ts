// Brand geometry for the "Byline" mark: a lowercase single-storey a whose stem
// curves into the baseline and tapers from pen weight into a hairline rule.
// Every drawing sits on a 48-unit grid and paints in currentColor, so one
// component serves light, dark and single-colour use. The static exports in
// public/brand/ are drawn from these same paths.

export const BRAND_COLORS = {
  ink: "#121212",
  paper: "#FFFFFF",
  vellum: "#F3F1EE",
  plum: "#6B2740",
  // Plum falls to 1.8:1 on ink, so the mark switches to rose on dark grounds.
  rose: "#D9B8C3",
} as const;

export type MarkPart = { d: string; stroke?: number };

export type MarkDrawing = {
  /** Optional transform for the italic cut. */
  transform?: string;
  bowl: { cx: number; cy: number; rx: number; ry: number; stroke: number };
  /** Stroked stem that turns into the baseline. */
  stem: MarkPart;
  /** Filled pen-cut at the top of the stem, flush with the bowl's top. */
  cut: string;
  /** Filled taper from pen weight to hairline. */
  rule: string;
};

/** A · Byline — primary mark, for 32px and up. */
export const MARK_PRIMARY: MarkDrawing = {
  bowl: { cx: 17, cy: 25, rx: 8.3, ry: 9.5, stroke: 4 },
  stem: { d: "M25.3 16V27.5A7 7 0 0 0 32.3 34.5", stroke: 4.6 },
  cut: "M23 16H27.6V13.6Z",
  rule: "M31.7 32.2L46 33.8V35.2L31.7 36.8Z",
};

/** A · Byline, heavier drawing for 32px and below. */
export const MARK_COMPACT: MarkDrawing = {
  bowl: { cx: 16.5, cy: 25, rx: 8.3, ry: 9.6, stroke: 5 },
  stem: { d: "M24.8 16.5V27A7.5 7.5 0 0 0 32.3 34.6", stroke: 5.6 },
  cut: "M22 16.5H27.6V13.4Z",
  rule: "M31.7 31.8L47 33.3V35.9L31.7 37.4Z",
};

/** B · Italic Byline — slanted 9°, pairs with the italic short wordmark. */
export const MARK_ITALIC: MarkDrawing = {
  transform: "translate(5.5 0) skewX(-9)",
  bowl: { cx: 17, cy: 25, rx: 8, ry: 9.5, stroke: 3.8 },
  stem: { d: "M25 16V27.5A7 7 0 0 0 32 34.5", stroke: 4.8 },
  cut: "M22.6 16H27.4V13.4Z",
  rule: "M31.4 32.1L45 33.8V35.2L31.4 36.9Z",
};

/**
 * C · Plate — the mark knocked out of a square, with the rule running off the
 * plate's right edge. Used for the favicon, app icons and the social card.
 */
export const PLATE_KNOCKOUT: MarkDrawing = {
  bowl: { cx: 17, cy: 24.5, rx: 8, ry: 9.4, stroke: 4.8 },
  stem: { d: "M25 16V26.8A7.4 7.4 0 0 0 32.4 34.2", stroke: 5.4 },
  cut: "M22.3 16H27.7V13.2Z",
  rule: "M31.8 31.5L48 33V35.4L31.8 36.9Z",
};
