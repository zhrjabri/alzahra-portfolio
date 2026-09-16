import { Fragment } from "react";

import type { Fact } from "@/content/projects";

/** Label/value pairs set as data: sans, tabular, hairline-ruled. */
export default function Facts({ facts, className = "" }: { facts: Fact[]; className?: string }) {
  return (
    <dl className={`facts ${className}`}>
      {facts.map((f) => (
        <Fragment key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
