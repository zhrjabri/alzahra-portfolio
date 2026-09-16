import type { Metadata } from "next";
import Link from "next/link";

// Rendered through the root title template: "Page Not Found | Alzahra Al Jabri Portfolio".
export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="py-[clamp(4rem,10vw,8rem)]" aria-labelledby="nf-title">
      <p className="label label-plum">Error 404</p>
      <h1 id="nf-title" className="case-title-long my-5">
        This page isn’t in the portfolio.
      </h1>
      <p className="deck">The link may be mistyped, or the page may have moved.</p>
      <Link href="/" className="read-more mt-6">
        Back to the homepage<span aria-hidden="true">&nbsp;→</span>
      </Link>
    </section>
  );
}
