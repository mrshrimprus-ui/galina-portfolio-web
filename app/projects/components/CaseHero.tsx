import type { ReactNode } from "react";

type CaseHeroProps = {
  title: ReactNode;
  summary: ReactNode;
  visual: ReactNode;
  meta: ReactNode[];
  className?: string;
};

export default function CaseHero({
  title,
  summary,
  visual,
  meta,
  className = "",
}: CaseHeroProps) {
  return (
    <section className={`case-hero shrimp-cover ${className}`.trim()}>
      <div className="shrimp-cover-copy">
        <h1 className="type-h1 reveal reveal-heading">
          <span>{title}</span>
        </h1>

        <p className="shrimp-summary text-normal reveal">
          {summary}
        </p>

        <p className="shrimp-meta reveal text-normal">
          {meta.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </p>
      </div>

      <div className="case-cover-frame">
        {visual}
      </div>
    </section>
  );
}
