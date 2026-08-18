"use client";

import { useEffect, useRef } from "react";
import type { ReactNode, RefObject } from "react";

type CaseArtifactLinkProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  magnetic?: boolean;
};

export default function CaseArtifactLink({
  href,
  children,
  className = "",
  onClick,
  magnetic = true,
}: CaseArtifactLinkProps) {
  const linkRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const disabled =
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!link || disabled || !magnetic) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.13;
      currentY += (targetY - currentY) * 0.13;

      link.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0)`;

      const moving =
        Math.abs(targetX - currentX) > 0.02 ||
        Math.abs(targetY - currentY) > 0.02;

      if (moving) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      const rect = link.getBoundingClientRect();
      const x =
        (event.clientX - rect.left - rect.width / 2) /
        (rect.width / 2);
      const y =
        (event.clientY - rect.top - rect.height / 2) /
        (rect.height / 2);

      targetX = Math.max(-1, Math.min(1, x)) * 7;
      targetY = Math.max(-1, Math.min(1, y)) * 4;
      start();
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    link.addEventListener("pointermove", move, { passive: true });
    link.addEventListener("pointerleave", reset);

    return () => {
      cancelAnimationFrame(frame);
      link.removeEventListener("pointermove", move);
      link.removeEventListener("pointerleave", reset);
      link.style.removeProperty("transform");
    };
  }, []);

  const content = (
    <>
      <span>{children}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </>
  );

  if (!href) {
    return (
      <button
        ref={linkRef as RefObject<HTMLButtonElement>}
        className={`case-artifact-link ${className}`.trim()}
        type="button"
        data-cursor="link"
        onClick={(event) => {
          event.stopPropagation();
          onClick?.();
        }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      ref={linkRef as RefObject<HTMLAnchorElement>}
      className={`case-artifact-link ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor="link"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick?.();
        window.open(href, "_blank", "noopener,noreferrer");
      }}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {content}
    </a>
  );
}
