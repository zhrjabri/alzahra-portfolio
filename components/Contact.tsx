"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const DETAILS = [
  { label: "Email", value: "aljabrialzahra1@gmail.com", href: "mailto:aljabrialzahra1@gmail.com" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/alzahra-al-jabri-0164ab416",
    href: "https://linkedin.com/in/alzahra-al-jabri-0164ab416",
  },
  { label: "Location", value: "Sultanate of Oman", href: undefined },
];

// Python backend (backend/app.py). Override with NEXT_PUBLIC_API_URL in .env.local
// once the backend is deployed somewhere other than localhost.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Client-side validation (the Python backend validates again).
    if (name.length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name (at least 2 characters).");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (message.length < 10) {
      setStatus("error");
      setErrorMessage("Please write a message of at least 10 characters.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok || !result.success) {
        setStatus("error");
        setErrorMessage(
          result.error || "Something went wrong while sending. Please try again."
        );
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Could not reach the server. Please try again, or email me directly."
      );
    }
  }

  return (
    <section id="contact" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-label mb-4">06 — Contact</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mt-4 max-w-lg text-text-muted">
            Open to opportunities in AI, Python development, software
            development, and IT. Reach out directly or use the form below.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <ul className="space-y-6">
              {DETAILS.map((d) => (
                <li key={d.label} className="border-b border-line pb-6 last:border-0">
                  <p className="font-mono text-xs uppercase tracking-wider text-text-faint">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="mt-1.5 block text-base text-text hover:text-gold transition-colors"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-base text-text">{d.value}</p>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-faint">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-text placeholder:text-text-faint focus:border-gold/50 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-faint">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-text placeholder:text-text-faint focus:border-gold/50 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-faint">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the role or project..."
                  className="w-full resize-none rounded-lg border border-line bg-surface px-4 py-3 text-sm text-text placeholder:text-text-faint focus:border-gold/50 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "sending" && (
                <p role="status" className="text-sm text-text-muted">
                  Sending your message...
                </p>
              )}

              {status === "sent" && (
                <p role="status" className="text-sm text-teal">
                  Message sent successfully!
                </p>
              )}

              {status === "error" && (
                <p role="alert" className="text-sm text-red-600">
                  {errorMessage}{" "}
                  <a href="mailto:aljabrialzahra1@gmail.com" className="underline">
                    aljabrialzahra1@gmail.com
                  </a>
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
