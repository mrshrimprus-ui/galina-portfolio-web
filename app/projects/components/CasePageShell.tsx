import type { ReactNode } from "react";

import CaseExperience from "./CaseExperience";
import CaseNextProject from "./CaseNextProject";
type CasePageShellProps = {
  children: ReactNode;
  className?: string;
  cursor?: ReactNode;
  nextProject?: {
    href: string;
    title: string;
  };
};

export default function CasePageShell({
  children,
  className = "",
  cursor,
  nextProject,
}: CasePageShellProps) {
  return (
    <main className={`case-page ${className}`.trim()}>
      {cursor}
      <CaseExperience />

      <div className="case-content shrimp-content">
        {children}
      </div>

      {nextProject && (
        <CaseNextProject
          href={nextProject.href}
          title={nextProject.title}
        />
      )}
    </main>
  );
}
