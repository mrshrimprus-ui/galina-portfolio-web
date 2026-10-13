"use client";

import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
} from "react";

type CaseStoreButtonsProps = {
  appStoreUrl: string;
  googlePlayUrl: string;
  reveal?: boolean;
};

export default function CaseStoreButtons({
  appStoreUrl,
  googlePlayUrl,
  reveal = true,
}: CaseStoreButtonsProps) {
  const updateLiquidOrigin = (
    event: ReactPointerEvent<HTMLAnchorElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--store-liquid-x",
      `${event.clientX - rect.left}px`
    );

    event.currentTarget.style.setProperty(
      "--store-liquid-y",
      `${event.clientY - rect.top}px`
    );
  };

  const buttonStyle = {
    "--store-liquid-x": "50%",
    "--store-liquid-y": "50%",
  } as CSSProperties;

  return (
    <div
      className={`case-store-links${reveal ? " reveal" : ""}`}
      aria-label="Магазины приложений"
    >
      <a
        className="case-store-link"
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="store"
        style={buttonStyle}
        onPointerEnter={updateLiquidOrigin}
        onPointerMove={updateLiquidOrigin}
      >
        <svg
          className="case-store-link__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M16.7 12.8c0-2.1 1.7-3.1 1.8-3.2a3.9 3.9 0 0 0-3.1-1.7c-1.3-.1-2.6.8-3.3.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1 1.7 2.2 2.9 2.1 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.7-2.1.9-1.2 1.2-2.4 1.2-2.5-.1 0-2.7-1-2.7-3.8ZM14.5 6.5c.6-.8 1-1.9.9-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3Z"
          />
        </svg>

        <span>App Store</span>
      </a>

      <a
        className="case-store-link"
        href={googlePlayUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="store"
        style={buttonStyle}
        onPointerEnter={updateLiquidOrigin}
        onPointerMove={updateLiquidOrigin}
      >
        <span
          className="case-store-link__google"
          aria-hidden="true"
        >
          G
        </span>

        <span>Google Play</span>
      </a>
    </div>
  );
}
