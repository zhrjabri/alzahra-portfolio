import Reveal from "./Reveal";

const EMAIL = "aljabrialzahra1@gmail.com";
const LINKEDIN = "https://linkedin.com/in/alzahra-al-jabri-0164ab416";

const DETAILS = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/alzahra-al-jabri-0164ab416",
    href: LINKEDIN,
  },
  { label: "Location", value: "Sultanate of Oman", href: undefined },
];

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-label mb-4">06 — Contact</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Available for website design and collaboration
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-12 max-w-2xl border-t border-line">
            {DETAILS.map((d) => (
              <li
                key={d.label}
                className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-text-faint sm:w-24 sm:shrink-0">
                  {d.label}
                </p>
                {d.href ? (
                  <a
                    href={d.href}
                    target={d.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="break-words text-base text-text transition-colors hover:text-accent"
                  >
                    {d.value}
                  </a>
                ) : (
                  <p className="text-base text-text">{d.value}</p>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
