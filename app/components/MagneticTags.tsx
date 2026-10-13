"use client";

import { Fragment, type ReactNode } from "react";

type MagneticTagsProps = {
  items: string[];
  className?: string;
  separator?: ReactNode;
};

export default function MagneticTags({
  items,
  className = "",
  separator,
}: MagneticTagsProps) {
  return (
    <div className={`magnetic-tags ${className}`.trim()}>
      {items.map((item, index) => (
        <Fragment key={`${item}-${index}`}>
          {index > 0 && separator != null && (
            <span
              className="magnetic-tags__separator"
              aria-hidden="true"
            >
              {separator}
            </span>
          )}

          <span
            className="magnetic-tag"
          >
            {item}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
