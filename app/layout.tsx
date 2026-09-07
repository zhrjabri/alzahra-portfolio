import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteUrl } from "./site";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  fallback: ["serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Portfolio of Alzahra Ali Nasser Al Jabri — Artificial Intelligence graduate and AI & Software Developer from Oman, building AI-powered applications with Python, Next.js and API-driven software. Featured work includes an AI fake news detection platform and the Nasek booking platform.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Alzahra Al Jabri Portfolio",
  description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Alzahra Al Jabri",
    "AI Developer",
    "Artificial Intelligence",
    "Python Developer",
    "Software Developer Oman",
    "OpenAI API",
    "Fake News Detection",
  ],
  authors: [{ name: "Alzahra Ali Nasser Al Jabri" }],
  creator: "Alzahra Ali Nasser Al Jabri",
  openGraph: {
    title: "Alzahra Al Jabri Portfolio",
    description,
    url: siteUrl,
    siteName: "Alzahra Al Jabri Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Alzahra Ali Nasser Al Jabri — AI Graduate & AI/Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alzahra Al Jabri Portfolio",
    description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Scroll-reveal starts at opacity 0; without JS it would never come back. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="bg-ink text-text antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
