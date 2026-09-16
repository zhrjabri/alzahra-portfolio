import type { MetadataRoute } from "next";

import { PROFILE } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: PROFILE.name,
    short_name: "Alzahra",
    description: "Portfolio of Alzahra Al Jabri, software developer.",
    start_url: "/",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
