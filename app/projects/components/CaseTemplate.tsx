import type { ReactNode } from "react";
import CaseHero from "./CaseHero";
import CasePageShell from "./CasePageShell";
import CaseSectionHeader from "./CaseSectionHeader";

type CaseSectionData = {
  label: string;
  title: ReactNode;
  content?: ReactNode;
  className?: string;
};

type CaseTemplateProps = {
  className: string;
  nextProject: {
    href: string;
    title: string;
  };
  hero: {
    title: ReactNode;
    summary: ReactNode;
    visual: ReactNode;
    meta: ReactNode[];
  };
  context: CaseSectionData;
  task: CaseSectionData;
  process: CaseSectionData;
  solution: CaseSectionData;
  result: CaseSectionData;
};

type SectionKind =
  | "context"
  | "task"
  | "process"
  | "solution"
  | "result";

function CasePlaceholder({ kind }: { kind: SectionKind }) {
  if (kind === "context") {
    return (
      <div className="case-template-context-grid reveal">
        <div className="case-template-placeholder case-template-placeholder--tall" />
        <div className="case-template-placeholder" />
        <div className="case-template-placeholder" />
      </div>
    );
  }

  return (
    <div
      className={`case-template-placeholder case-template-placeholder--${kind} reveal`}
    />
  );
}

function CaseTemplateSection({
  kind,
  section,
}: {
  kind: SectionKind;
  section: CaseSectionData;
}) {
  return (
    <section
      className={[
        "shrimp-story-section",
        "case-template-section",
        `shrimp-${kind}`,
        section.className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <CaseSectionHeader label={section.label}>
        {section.title}
      </CaseSectionHeader>

      {section.content ?? (
        <div
          className={`case-template-section__content case-template-section__content--${kind}`}
        >
          <CasePlaceholder kind={kind} />
        </div>
      )}
    </section>
  );
}

export default function CaseTemplate({
  className,
  nextProject,
  hero,
  context,
  task,
  process,
  solution,
  result,
}: CaseTemplateProps) {
  return (
    <CasePageShell
      className={className}
      nextProject={nextProject}
    >
      <CaseHero
        title={hero.title}
        summary={hero.summary}
        visual={hero.visual}
        meta={hero.meta}
      />

      <CaseTemplateSection kind="context" section={context} />
      <CaseTemplateSection kind="task" section={task} />
      <CaseTemplateSection kind="process" section={process} />
      <CaseTemplateSection kind="solution" section={solution} />
      <CaseTemplateSection kind="result" section={result} />
    </CasePageShell>
  );
}
