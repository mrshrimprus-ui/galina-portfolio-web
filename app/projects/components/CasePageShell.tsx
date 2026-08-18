import type { ReactNode } from "react";

import CaseExperience from "./CaseExperience";
import CaseNextProject from "./CaseNextProject";
import CaseBottomNextLink from "./CaseBottomNextLink";
type CasePageShellProps = {
  children: ReactNode;
  className?: string;
  cursor?: ReactNode;
  beforeNextProject?: ReactNode;
  nextProject?: {
    href: string;
    title: string;
  };
};

export default function CasePageShell({
  children,
  className = "",
  cursor,
  beforeNextProject,
  nextProject,
}: CasePageShellProps) {
  const nextProjectAccent = nextProject?.href.includes("mrshrimp")
    ? "#ff8d28"
    : nextProject?.href.includes("punto")
      ? "#2e2da6"
      : "#da2025";

  return (
    <>
      <main className={`case-page ${className}`.trim()}>
        {cursor}
        <CaseExperience />

        <div className="case-content shrimp-content">
          {children}
        </div>

        {beforeNextProject && (
          <div className="case-before-next-project">
            {beforeNextProject}
          </div>
        )}

        {nextProject && (
          <nav
            className="case-bottom-nav type-caption-regular"
            aria-label="Навигация по проектам"
          >
            <a href="/#projects" data-cursor="nav">
              Все проекты
            </a>

            <a href="/about" data-cursor="nav">
              Связаться
            </a>

            <CaseBottomNextLink
              href={nextProject.href}
              title={nextProject.title}
              accent={nextProjectAccent}
            />
          </nav>
        )}
      </main>

      {nextProject && (
        <CaseNextProject
          href={nextProject.href}
          title={nextProject.title}
        />
      )}
    </>
  );
}
