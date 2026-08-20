import type { MetadataRoute } from "next";

import { siteUrl } from "./site";

// Single-page portfolio: one entry. Section anchors (#about, #projects, …) are
// not separate URLs, so listing them here would only create duplicates.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
