"use client";

import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import {
  PROJECT_TRANSITIONS,
  requestProjectPageTransition,
} from "../../components/ProjectPageTransition";

type CaseBottomNextLinkProps = {
  href: string;
  title: string;
  accent: string;
};

export default function CaseBottomNextLink({
  href,
  title,
  accent,
}: CaseBottomNextLinkProps) {
  const updateLiquidOrigin = (
    event: ReactPointerEvent<HTMLAnchorElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--liquid-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--liquid-y",
      `${event.clientY - rect.top}px`,
    );
  };

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
      className="case-bottom-nav-next"
      href={href}
      data-cursor="link"
      onPointerEnter={updateLiquidOrigin}
      onPointerMove={updateLiquidOrigin}
      onClick={openNextProject}
      style={
        {
          "--next-project-accent": accent,
          "--liquid-x": "50%",
          "--liquid-y": "50%",
        } as CSSProperties
      }
    >
      <span className="case-bottom-nav-next__label">
        <span className="case-bottom-nav-next__label-default">
          <span className="case-bottom-nav-next__desktop-text">
            Следующий проект
          </span>

          <span
            className="case-bottom-nav-next__marquee"
            aria-hidden="true"
          >
            <span>Следующий проект</span>
            <span>Следующий проект</span>
          </span>
        </span>

        <span className="case-bottom-nav-next__label-title">
          {title}
        </span>
      </span>

      <img
        src="/assets/next.svg"
        alt=""
        aria-hidden="true"
      />
    </a>
  );
}
