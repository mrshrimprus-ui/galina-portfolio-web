"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";

import InteractiveTitle from "../../components/InteractiveTitle";
import MagneticTags from "../../components/MagneticTags";

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
  const pathname = usePathname();
  const [visiblePath, setVisiblePath] = useState("");

  const visible = visiblePath === pathname;

  useLayoutEffect(() => {
    let secondFrame = 0;

    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        setVisiblePath(pathname);
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [pathname]);

  const [, domainRow, platformRow] = meta;

  const splitMeta = (value: ReactNode) =>
    typeof value === "string"
      ? value
          .split("·")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  const tags = [
    ...splitMeta(domainRow),
    ...splitMeta(platformRow),
  ];

  const reveal = visible ? "reveal is-visible" : "reveal";

  return (
    <section
      key={pathname}
      className={["case-intro", className].filter(Boolean).join(" ")}
    >
      <div className="case-intro__copy">
        <MagneticTags
          items={tags}
          separator="·"
          className={`case-intro__tags ${reveal}`}
        />

        {typeof title === "string" ? (
          <InteractiveTitle
            text={title}
            className={`case-intro__title type-h1 reveal reveal-heading${
              visible ? " is-visible" : ""
            }`}
          />
        ) : (
          <h1
            className={`case-intro__title type-h1 reveal reveal-heading${
              visible ? " is-visible" : ""
            }`}
          >
            <span>{title}</span>
          </h1>
        )}

        <p className={`case-intro__summary type-description ${reveal}`}>
          {summary}
        </p>

        {actions && (
          <div className={`case-intro__actions ${reveal}`}>
            {actions}
          </div>
        )}
      </div>

      <div className={`case-intro__visual ${reveal}`}>
        {visual}
      </div>
    </section>
  );
}
