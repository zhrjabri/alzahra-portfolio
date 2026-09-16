import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseStudy from "@/components/case/CaseStudy";
import { PROJECTS, getProject } from "@/content/projects";

// Only the three case studies exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const path = `/work/${project.slug}`;
  const image = `/og/${project.slug}.png`;
  return {
    // Short title in the tab ("Fake News Detection"); the page heading keeps the full name.
    title: project.title,
    description: project.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: project.fullTitle,
      description: project.metaDescription,
      images: [{ url: image, width: 1200, height: 630, alt: `${project.fullTitle} — case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.fullTitle,
      description: project.metaDescription,
      images: [image],
    },
  };
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
