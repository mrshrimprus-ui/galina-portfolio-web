"use client";

import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
} from "react";

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

  return (
    <a
      className="case-bottom-nav-next"
      href={href}
      data-cursor="link"
      onPointerEnter={updateLiquidOrigin}
      onPointerMove={updateLiquidOrigin}
      onClick={(event) => {
        event.currentTarget.classList.add("is-navigating");
      }}
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
