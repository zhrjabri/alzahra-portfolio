"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string; tracked?: boolean };

// A section counts as "being read" once its top passes this line.
const READING_LINE = 140;

/**
 * Case-study contents. Real anchor links; the section currently being read is
 * marked with aria-current so the rule beside it moves as you scroll.
 */
export default function OnThisPage({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const ids = items.filter((i) => i.tracked !== false).map((i) => i.id);
    let frame = 0;

    const update = () => {
      frame = 0;
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      if (!sections.length) return;

      let current = sections[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= READING_LINE) current = el.id;
      }
      // Short closing sections can't reach the line; at the foot of the page,
      // a section chosen from this list wins.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const target = window.location.hash.slice(1);
      if (atBottom && ids.includes(target)) current = target;
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, [items]);

  return (
    <nav aria-labelledby="on-this-page" className="lg:sticky lg:top-6">
      <h2 id="on-this-page" className="label mb-3">
        On this page
      </h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className="toc-link"
              aria-current={active === i.id ? "true" : undefined}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
