import Link from "next/link";

import { HOME } from "@/content/profile";
import { PROJECTS } from "@/content/projects";

// Short contents-list descriptions; the features below carry the detail.
const CONTENTS: Record<string, string> = {
  timora: "A web app for tasks that repeat",
  nasek: "Hajj & Umrah campaigns in one place",
  "fake-news-detection": "Credibility scored from 0 to 100",
};

export default function Opening() {
  const { before, emphasis, after } = HOME.headline;
  return (
    <section className="opening" aria-labelledby="headline">
      <div>
        <p className="label label-plum">{HOME.kicker}</p>
        <h1 id="headline">
          {before}
          <em>{emphasis}</em>
          {after}
        </h1>
        <div className="grid max-w-[46ch] gap-4">
          <p className="deck max-w-none text-ink">{HOME.standfirst[0]}</p>
          <p className="deck max-w-none">{HOME.standfirst[1]}</p>
        </div>
      </div>

      <nav className="issue-contents" aria-labelledby="in-this-issue">
        <h2 id="in-this-issue" className="label py-3">
          In this issue
        </h2>
        <ol>
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <Link href={`#${p.slug}`} className="contents-link">
                <span className="numeral" aria-hidden="true">
                  {p.numeral}.
                </span>
                <span>
                  <span className="block text-[1.35rem] leading-tight">{p.title}</span>
                  <span className="mt-0.5 block font-ui text-[0.9375rem] leading-snug text-stone">
                    {CONTENTS[p.slug]}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
