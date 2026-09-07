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
  const [active, setActive] = useState<string>("");

  // One scroll pass drives both the header treatment and the active nav item.
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);

      // The active section is the last one whose top has passed under the header.
      const line = 112;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = `#${id}`;
      }
      // The final section is often too short to reach that line, so at the
      // bottom of the page it takes the highlight outright.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = `#${ids[ids.length - 1]}`;

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // While the mobile menu is open: lock the page behind it and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a
          href="#top"
          className="-my-2 flex items-center gap-3 py-2 text-accent transition-opacity hover:opacity-70"
          aria-label="Alzahra Al Jabri — home"
        >
          <LogoMark size={26} />
          <span className="whitespace-nowrap font-mono text-[0.7rem] font-medium uppercase tracking-[0.17em]">
            Alzahra Al Jabri
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? "text-accent" : "text-text-muted hover:text-accent"
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-1 left-3 right-3 h-px origin-left bg-accent transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className="hidden whitespace-nowrap items-center rounded-full border border-accent/40 px-5 py-2 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent hover:text-ink lg:inline-flex"
        >
          Let&apos;s talk
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
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

      <div
        id="mobile-menu"
        className={`grid overflow-hidden border-line bg-ink transition-[grid-template-rows,visibility] duration-300 ease-out lg:hidden ${
          open ? "visible grid-rows-[1fr] border-t" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <ul className="flex flex-col px-6 py-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.href ? "true" : undefined}
                  className={`block border-b border-line/70 py-3.5 text-base transition-colors last:border-b-0 ${
                    active === l.href ? "text-accent" : "text-text-muted"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mb-4 mt-5 block rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-ink"
              >
                Let&apos;s talk
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
