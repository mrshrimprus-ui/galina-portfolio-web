type CaseNextProjectProps = {
  href: string;
  title: string;
};

export default function CaseNextProject({
  href,
  title,
}: CaseNextProjectProps) {
  const openNextProject = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    const transition = PROJECT_TRANSITIONS[href];
    if (!transition) return;

    event.preventDefault();
    requestProjectPageTransition(transition);
  };

  return (
    <a
      className="case-next-project shrimp-next-project"
      href={href}
      aria-label={`Перейти к следующему проекту ${title}`}
      data-cursor="link"
      onClick={openNextProject}
    >
      <span className="shrimp-next-track" aria-hidden="true">
        <span>Следующий проект</span>
        <span>Следующий проект</span>
        <span>Следующий проект</span>
        <span>Следующий проект</span>
      </span>

      <span className="sr-only">
        Следующий проект — {title}
      </span>
    </a>
  );
}
"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import {
  PROJECT_TRANSITIONS,
  requestProjectPageTransition,
} from "../../components/ProjectPageTransition";
