import Link from "next/link";

import LiveLink from "@/components/editorial/LiveLink";
import TextFigure from "@/components/editorial/TextFigure";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import type { Project } from "@/content/projects";
import { PROJECTS } from "@/content/projects";
import OnThisPage, { type TocItem } from "./OnThisPage";

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      {children}
    </section>
  );
}

function Closing({ project }: { project: Project }) {
  return project.live ? (
    <LiveLink {...project.live} product={project.title} />
  ) : (
    <p className="notice">No public live demo is currently available.</p>
  );
}

export default function CaseStudy({ project }: { project: Project }) {
  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const hasDecisions = project.decisions.length > 0;
  const long = project.fullTitle.length > 12;

  const toc: TocItem[] = [
    ...(project.origin ? [{ id: "origin", label: "Origin" }] : []),
    { id: "question", label: "The question" },
    { id: "built", label: "What I built" },
    { id: "how-built", label: "How it’s built" },
    ...(project.howChecked ? [{ id: "how-checked", label: "How it’s checked" }] : []),
    { id: "outcome", label: "Outcome" },
    // The decisions sit in the margin column beside the whole article, so they
    // are linked but not tracked as the section being read.
    ...(hasDecisions ? [{ id: "decisions", label: "Decisions", tracked: false }] : []),
  ];

  // The narrative opens with a drop cap: the first block on the page.
  const opener = project.origin ? "origin" : "question";

  return (
    <article aria-labelledby="case-title">
      <div className="running-head">
        <Link href="/#work">
          <ArrowLeft className="mr-2" />
          All work
        </Link>
        <span className="hidden min-h-[44px] items-center sm:inline-flex">
          Feature {project.numeral} of iii
        </span>
        <Link href={`/work/${next.slug}`}>
          Next: {next.title}
          <ArrowRight className="ml-2" />
        </Link>
      </div>

      <header className="pb-12 pt-[clamp(3rem,7vw,6rem)]">
        <p className="label label-plum">Case study · {project.kicker}</p>
        <h1 id="case-title" className={`${long ? "case-title-long" : "case-title"} my-5`}>
          {project.fullTitle}
        </h1>
        <p className="deck max-w-[34ch] text-[clamp(1.45rem,1.1rem+1.5vw,2.25rem)] leading-[1.3]">
          {project.standfirst}
        </p>
      </header>

      <dl className="facts-row">
        {project.caseFacts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
      <Closing project={project} />

      <div className="article">
        <aside>
          <OnThisPage items={toc} />
        </aside>

        <div
          className={`article-body min-w-0 ${hasDecisions ? "" : "lg:col-span-2 lg:max-w-[46rem]"}`}
        >
          {project.origin && (
            <Block id="origin" title="Origin">
              <p className={opener === "origin" ? "dropcap" : undefined}>{project.origin}</p>
            </Block>
          )}

          <Block id="question" title="The question">
            <p className={opener === "question" ? "dropcap" : undefined}>{project.question}</p>
          </Block>

          {project.quote && (
            <figure className="pull">
              <blockquote>
                <p>“{project.quote.text}”</p>
              </blockquote>
              <figcaption>{project.quote.caption}</figcaption>
            </figure>
          )}

          <Block id="built" title="What I built">
            <ul className="grid list-disc gap-2 pl-5 marker:text-plum">
              {project.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Block>

          {project.figures[0] && <TextFigure figure={project.figures[0]} number={1} />}

          <Block id="how-built" title="How it’s built">
            <p>{project.howBuilt}</p>
          </Block>

          {project.figures.slice(1).map((f, i) => (
            <TextFigure key={f.caption} figure={f} number={i + 2} />
          ))}

          {project.howChecked && (
            <Block id="how-checked" title="How it’s checked">
              <p>{project.howChecked}</p>
            </Block>
          )}

          <Block id="outcome" title="Outcome">
            <p>{project.outcome}</p>
          </Block>
        </div>

        {hasDecisions ? (
          <section id="decisions" aria-labelledby="decisions-h">
            <h2 id="decisions-h" className="label mb-4">
              Decisions
            </h2>
            <ol className="grid gap-6">
              {project.decisions.map((d, i) => (
                <li key={d.title} className="decision">
                  <h3>
                    {i + 1} · {d.title}
                  </h3>
                  <p>{d.body}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </div>

      {project.live && <Closing project={project} />}
      <Link href={`/work/${next.slug}`} className="next-link mt-12">
        <span>
          <span className="label block">Next · Feature {next.numeral}</span>
          <span className="feature-title-sm mt-2 block">{next.title}</span>
        </span>
        <span className="font-ui text-3xl">
          <ArrowRight />
        </span>
      </Link>
    </article>
  );
}
