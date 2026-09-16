import type { MetadataRoute } from "next";

import { PROJECTS } from "@/content/projects";
import { siteUrl } from "./site";

// The homepage plus one entry per case study. Section anchors (#work, #about,
// …) are not separate URLs, so they are not listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...PROJECTS.map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
