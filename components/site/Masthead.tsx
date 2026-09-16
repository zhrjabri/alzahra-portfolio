"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { PROFILE } from "@/content/profile";
import LogoMark from "./LogoMark";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
];

export default function Masthead() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const onWork = pathname.startsWith("/work/");

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // While open: Escape closes and returns focus to the button, the page behind
  // doesn't scroll, and focus moves into the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("a")?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // The menu is a small-screen control; widening the window closes it.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="relative">
      <div className="masthead">
        <Link href="/" className="brand" aria-label={`${PROFILE.name}, home`}>
          <LogoMark variant="primary" size={34} className="shrink-0 text-plum" />
          <span className="brand-name">{PROFILE.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="nav-link"
                  aria-current={l.label === "Work" && onWork ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={PROFILE.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                GitHub <span aria-hidden="true">&nbsp;↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="menu-button md:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="site-menu"
        ref={panelRef}
        hidden={!open}
        className="menu-panel absolute inset-x-0 top-full z-40 border-b border-ink bg-paper pb-6 md:hidden"
      >
        <nav aria-label="Main">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={l.label === "Work" && onWork ? "page" : undefined}
                >
                  {l.label}
                  <span aria-hidden="true" className="font-ui text-base text-stone">
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <a href={PROFILE.github.href} target="_blank" rel="noopener noreferrer">
                GitHub
                <span className="font-ui text-base text-stone">
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
