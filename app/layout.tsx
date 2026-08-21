import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteUrl } from "./site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Alzahra Al Jabri | AI Graduate & AI/Software Developer",
  description:
    "Portfolio of Alzahra Ali Nasser Al Jabri — Artificial Intelligence graduate and AI & Software Developer from Oman, specialising in AI-powered applications, Python, and API-driven software.",
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
  openGraph: {
    title: "Alzahra Al Jabri | AI Graduate & AI/Software Developer",
    description:
      "AI-powered application development, Python, and API-driven software — portfolio and featured projects.",
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
    title: "Alzahra Al Jabri | AI Graduate & AI/Software Developer",
    description:
      "AI-powered application development, Python, and API-driven software — portfolio and featured projects.",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-ink text-text antialiased">{children}</body>
    </html>
  );
}
