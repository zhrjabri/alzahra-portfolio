import Reveal from "./Reveal";

const CATEGORIES = [
  {
    title: "AI & Machine Learning",
    icon: "◈",
    items: ["AI concepts", "Machine Learning fundamentals", "AI-powered applications"],
  },
  {
    title: "Python & Programming",
    icon: "⌘",
    items: ["Python", "Software development", "Application building"],
  },
  {
    title: "APIs & Integration",
    icon: "⇄",
    items: ["OpenAI API", "Google Search API", "REST APIs", "JSON"],
  },
  {
    title: "Data & Databases",
    icon: "▤",
    items: ["Data collection", "Data processing", "Data analysis", "Data structuring", "Data management"],
  },
  {
    title: "Application Development",
    icon: "▣",
    items: ["Designing and delivering functional applications"],
  },
  {
    title: "Automation",
    icon: "↻",
    items: ["Python automation"],
  },
];


export default function Skills() {
  return (
    <section id="skills" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-label mb-4">02 — Skills</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            What I work with
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 70}>
              <div className="group h-full rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-line text-lg text-accent transition-colors group-hover:border-accent/50">
                  {cat.icon}
                </div>
                <h3 className="font-display text-lg font-medium text-text">
                  {cat.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-text-muted"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
