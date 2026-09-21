import { ExternalLink } from "@/components/icons";
import { ABOUT, CONTACT_HEADING, JOURNEY, PROFILE, TECH_INDEX } from "@/content/profile";

/** A section with its label and heading in the margin column. */
function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title?: string;
  children: React.ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <header>
        {title ? (
          <>
            <p className="label">{label}</p>
            <h2 id={headingId} className="section-title">
              {title}
            </h2>
          </>
        ) : (
          <h2 id={headingId} className="label">
            {label}
          </h2>
        )}
      </header>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function TechIndex() {
  return (
    <Section id="index" label="Index" title="What I build with">
      <div className="overflow-x-auto">
        <table className="index-table">
          <caption className="sr-only">Technologies and the projects that use them</caption>
          <thead>
            <tr>
              <th scope="col">Technology</th>
              <th scope="col">Where it’s used</th>
            </tr>
          </thead>
          <tbody>
            {TECH_INDEX.map((row) => (
              <tr key={row.tech}>
                <td>{row.tech}</td>
                <td>{row.usedIn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

export function About() {
  return (
    <Section id="about" label="About" title={PROFILE.name}>
      <p className="max-w-measure text-[1.3rem] leading-relaxed">{ABOUT}</p>
    </Section>
  );
}

export function Journey() {
  return (
    <Section id="journey" label="Chronology" title="Journey">
      <ol className="chronology">
        {JOURNEY.map((e) => (
          <li key={e.title}>
            {e.datetime ? (
              <time className="when" dateTime={e.datetime}>
                {e.when}
              </time>
            ) : (
              <span className="when">{e.when}</span>
            )}
            <div>
              <h3 className="text-[1.3rem] leading-snug tracking-normal">{e.title}</h3>
              <p className="mt-1 text-[1.05rem] text-ink-2">{e.detail}</p>
              {e.recognition && (
                <p className="mt-1 text-[1.05rem] italic text-plum">{e.recognition}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact" label="Contact">
      <p className="max-w-[22ch] text-[length:var(--t-h2)] leading-[1.05] tracking-[-0.015em]">
        {CONTACT_HEADING}
      </p>
      <a
        href={`mailto:${PROFILE.email}`}
        className="my-8 inline-block break-words py-2 text-[clamp(1.6rem,1rem+3vw,3.4rem)] leading-tight text-plum"
      >
        {PROFILE.email}
      </a>
      <ul className="grid border-t border-ink font-ui text-[0.9375rem] sm:grid-cols-3">
        <li className="grid gap-0.5 border-b border-hairline py-4 sm:border-b-0">
          <span className="label">LinkedIn</span>
          <a href={PROFILE.linkedin.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center">
            {PROFILE.linkedin.display}
            <ExternalLink className="ml-2" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li className="grid gap-0.5 border-b border-hairline py-4 sm:border-b-0">
          <span className="label">GitHub</span>
          <a href={PROFILE.github.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center">
            {PROFILE.github.display}
            <ExternalLink className="ml-2" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li className="grid gap-0.5 py-4">
          <span className="label">Based in</span>
          <span className="inline-flex min-h-[44px] items-center">{PROFILE.location}</span>
        </li>
      </ul>
    </Section>
  );
}
