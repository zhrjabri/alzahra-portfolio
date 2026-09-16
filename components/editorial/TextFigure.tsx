import type { Figure } from "@/content/projects";

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi"];

/**
 * A figure drawn only with type and rules — no images. Sequences are numbered
 * with roman numerals (order matters); columns are not.
 */
export default function TextFigure({ figure, number }: { figure: Figure; number: number }) {
  const List = figure.kind === "sequence" ? "ol" : "ul";
  return (
    <figure className={`figure ${figure.items.length > 3 ? "figure-grid" : ""}`}>
      <List>
        {figure.items.map((item, i) => (
          <li key={item}>
            {figure.kind === "sequence" && (
              <span className="step" aria-hidden="true">
                {ROMAN[i]}.
              </span>
            )}
            {item}
          </li>
        ))}
      </List>
      <figcaption>
        <b>Fig. {number}</b> — {figure.caption}
      </figcaption>
    </figure>
  );
}
