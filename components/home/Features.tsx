import Link from "next/link";

import Facts from "@/components/editorial/Facts";
import LiveLink from "@/components/editorial/LiveLink";
import type { Project } from "@/content/projects";
import { PROJECTS } from "@/content/projects";

function FeatureHead({ project, paired = false }: { project: Project; paired?: boolean }) {
  // Paired features reserve two lines so their titles start level.
  return (
    <p className={`label label-plum mb-10 ${paired ? "md:min-h-[3em]" : ""}`}>
      Feature {project.numeral} · {project.kicker}
    </p>
  );
}

function CaseStudyLink({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="read-more mt-4">
      Read the case study<span className="sr-only">: {project.fullTitle}</span>
      <span aria-hidden="true">&nbsp;→</span>
    </Link>
  );
}

/** TIMORA: the full-width lead feature. */
function LeadFeature({ project }: { project: Project }) {
  return (
    <article id={project.slug} className="feature" aria-labelledby={`${project.slug}-title`}>
      <FeatureHead project={project} />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div>
          <h3 id={`${project.slug}-title`} className="feature-title">
            <Link href={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className="deck my-6">{project.standfirst}</p>
          <p className="prose-body">{project.body}</p>
          <Facts facts={project.homeFacts} className="mt-8" />
        </div>
        <div>
          {project.quote && (
            <figure className="pull">
              <blockquote>
                <p>“{project.quote.text}”</p>
              </blockquote>
              <figcaption>{project.quote.caption}</figcaption>
            </figure>
          )}
          {project.live && (
            <LiveLink {...project.live} product={project.title} className="mt-8" />
          )}
          <CaseStudyLink project={project} />
        </div>
      </div>
    </article>
  );
}

/** NASEK and Fake News Detection: the paired secondary features. */
function SecondaryFeature({ project, first }: { project: Project; first: boolean }) {
  return (
    <article
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      className={`feature ${first ? "md:border-r md:border-r-hairline md:pr-10" : "md:pl-10"}`}
    >
      <FeatureHead project={project} paired />
      <h3 id={`${project.slug}-title`} className="feature-title-sm">
        <Link href={`/work/${project.slug}`}>{project.title}</Link>
      </h3>
      <p className="deck my-6">{project.standfirst}</p>
      {/* Shorter on phones, where the page is already long. */}
      <p className="prose-body hidden sm:block">{project.body}</p>
      <p className="prose-body sm:hidden">{project.bodyShort}</p>
      {project.recognition && (
        <p className="recognition mt-6">
          <b className="font-semibold text-ink">{project.recognition[0]}</b>
          {project.recognition.slice(1).map((r) => (
            <span key={r}> · {r}</span>
          ))}
        </p>
      )}
      {project.noDemo && <p className="notice mt-6">No public live demo is currently available.</p>}
      <Facts facts={project.homeFacts} className="mt-8" />
      {project.live && <LiveLink {...project.live} product={project.title} className="mt-8" />}
      <CaseStudyLink project={project} />
    </article>
  );
}

export default function Features() {
  const [lead, ...rest] = PROJECTS;
  return (
    <div id="work">
      <h2 className="sr-only">Selected work</h2>
      <LeadFeature project={lead} />
      <div className="grid md:grid-cols-2">
        {rest.map((p, i) => (
          <SecondaryFeature key={p.slug} project={p} first={i === 0} />
        ))}
      </div>
    </div>
  );
}
