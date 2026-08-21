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
    <section id="contact" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-label mb-4">06 — Contact</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mt-4 max-w-lg text-text-muted">
            Open to opportunities in AI, Python development, software
            development, and IT. The quickest way to reach me is by email.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <ul className="space-y-6">
              {DETAILS.map((d) => (
                <li key={d.label} className="border-b border-line pb-6 last:border-0">
                  <p className="font-mono text-xs uppercase tracking-wider text-text-faint">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="mt-1.5 block text-base text-text hover:text-accent transition-colors"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-base text-text">{d.value}</p>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
              <p className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                Hiring, or have a project in mind?
              </p>
              <p className="mt-3 max-w-md text-text-muted">
                Send me a note about the role or the problem you&apos;re solving
                and I&apos;ll get back to you within a couple of days.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
                >
                  Email me
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-7 py-3 text-sm font-medium text-text transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
