"use client";

import { useEffect, useState } from "react";
import LogoMark from "./Logo";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="group flex items-center gap-3 text-accent transition-opacity hover:opacity-70"
          aria-label="Alzahra Al Jabri — home"
        >
          <LogoMark size={28} />
          <span className="font-display text-[11px] font-medium uppercase tracking-[0.18em]">
            Alzahra Al Jabri
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-text-muted hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-full border border-accent/40 px-4 py-2 text-sm text-accent hover:bg-accent hover:text-ink transition-colors"
        >
          Let&apos;s talk
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`block h-px w-6 bg-text transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-text transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line bg-ink">
          <ul className="flex flex-col px-6 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-text-muted hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full border border-accent/40 px-4 py-2.5 text-center text-sm text-accent"
              >
                Let&apos;s talk
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
