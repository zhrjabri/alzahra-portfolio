import Reveal from "./Reveal";

const FACTS = [
  { label: "Degree", value: "B.Sc. Computer Science — AI, Gulf College, 2026" },
  { label: "Rating", value: "Excellent" },
  { label: "Based in", value: "Sultanate of Oman" },
  { label: "Languages", value: "Arabic (Native) · English (Very Good)" },
];

export default function About() {
  return (
    <section id="about" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-label mb-4">01 — About</p>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              An AI graduate who ships working software, not just models.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-text-muted">
              <p>
                I&apos;m an Artificial Intelligence graduate with hands-on
                experience building AI-powered applications, working with
                APIs, and analysing data. My work sits at the intersection of
                machine intelligence and practical software engineering —
                turning AI concepts into applications people can actually
                use.
              </p>
              <p>
                I&apos;ve built AI-based solutions using the{" "}
                <span className="text-text">OpenAI API</span> and{" "}
                <span className="text-text">Google Search API</span>, backed
                by a strong foundation in Python and application development.
                I&apos;m also an award-winning developer and co-author of an
                officially registered software work.
              </p>
              <p>
                I&apos;m currently looking for opportunities in{" "}
                <span className="text-text">
                  Artificial Intelligence, Python Development, Software
                  Development, and IT
                </span>{" "}
                — roles where I can keep building solutions that are both
                intelligent and genuinely useful.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-2">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="eyebrow mb-5">Quick facts</p>
              <dl className="space-y-5">
                {FACTS.map((f) => (
                  <div key={f.label} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <dt className="font-mono text-xs uppercase tracking-wider text-text-faint">
                      {f.label}
                    </dt>
                    <dd className="mt-1.5 text-sm text-text">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
