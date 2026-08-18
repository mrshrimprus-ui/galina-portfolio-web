import type { ReactNode } from "react";
import InteractiveTitle from "../../components/InteractiveTitle";

type CaseHeroProps = {
  title: ReactNode;
  summary: ReactNode;
  visual: ReactNode;
  meta: ReactNode[];
  actions?: ReactNode;
  className?: string;
};

export default function CaseHero({
  title,
  summary,
  visual,
  meta,
  actions,
  className = "",
}: CaseHeroProps) {
  return (
    <section className={`case-hero shrimp-cover ${className}`.trim()}>
      <div className="shrimp-cover-copy">
        {typeof title === "string" ? (
          <InteractiveTitle
            text={title}
            className="type-h1 reveal reveal-heading"
          />
        ) : (
          <h1 className="type-h1 reveal reveal-heading">
            <span>{title}</span>
          </h1>
        )}

        <p className="shrimp-summary text-normal reveal">
          {summary}
        </p>

        <p className="shrimp-meta reveal text-normal">
          {meta.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </p>

        <div className="case-hero-actions">
          {actions}
        </div>
      </div>

      <div className="case-cover-frame">
        {visual}
      </div>
    </section>
  );
}
