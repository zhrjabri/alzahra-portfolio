import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";

import Footer from "@/components/site/Footer";
import Masthead from "@/components/site/Masthead";
import { PROFILE } from "@/content/profile";
import "./globals.css";
import { siteUrl } from "./site";

// Newsreader is loaded as its variable font: one file covers the 400 and 500
// weights in use, and the optical-size axis lets display sizes tighten.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
  // Metric-matched fallback is declared in globals.css (Next has none for Newsreader).
  adjustFontFallback: false,
  fallback: ["Newsreader Fallback", "Georgia", "Times New Roman", "serif"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

// Browser-tab titles: "Alzahra Al Jabri Portfolio" on the homepage and
// "<Project> | Alzahra Al Jabri Portfolio" on case studies.
const title = `${PROFILE.name} Portfolio`;
const description =
  "Portfolio of Alzahra Al Jabri, an AI graduate and software developer from Oman. Featured work: TIMORA, NASEK and an AI fake-news detection platform.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${title}` },
  description,
  alternates: { canonical: "/" },
  applicationName: PROFILE.name,
  authors: [{ name: PROFILE.name, url: siteUrl }],
  creator: PROFILE.name,
  keywords: [
    "Alzahra Al Jabri",
    "Software developer Oman",
    "AI graduate",
    "Next.js developer",
    "TIMORA",
    "NASEK",
    "Fake news detection",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: PROFILE.name,
    title,
    description,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${PROFILE.name} — ${PROFILE.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${hanken.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="page">
          <Masthead />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
