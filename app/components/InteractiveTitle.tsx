"use client";

import type { PointerEvent } from "react";
import { useRef } from "react";

type InteractiveTitleProps = {
  text: string;
  className?: string;
};

export default function InteractiveTitle({
  text,
  className = "",
}: InteractiveTitleProps) {
  const glyphsRef = useRef<
    Array<{ element: HTMLElement; x: number; y: number }>
  >([]);

  const measure = (title: HTMLHeadingElement) => {
    const titleRect = title.getBoundingClientRect();

    glyphsRef.current = Array.from(
      title.querySelectorAll<HTMLElement>(".hero-title-glyph"),
    ).map((element) => {
      const rect = element.getBoundingClientRect();

      return {
        element,
        x: rect.left + rect.width / 2 - titleRect.left,
        y: rect.top + rect.height / 2 - titleRect.top,
      };
    });
  };

  const distort = (event: PointerEvent<HTMLHeadingElement>) => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const title = event.currentTarget;
    if (glyphsRef.current.length === 0) measure(title);

    const titleRect = title.getBoundingClientRect();
    const pointerX = event.clientX - titleRect.left;
    const pointerY = event.clientY - titleRect.top;
    const radius = 150;

    title.classList.add("is-distorting");

    glyphsRef.current.forEach(({ element, x, y }) => {
      const dx = x - pointerX;
      const dy = y - pointerY;
      const distance = Math.hypot(dx, dy);
      const linearInfluence = Math.max(0, 1 - distance / radius);
      const influence =
        linearInfluence * linearInfluence * (3 - 2 * linearInfluence);

      if (influence === 0) {
        element.style.transform = "";
        return;
      }

      const directionX = dx / Math.max(distance, 1);
      const directionY = dy / Math.max(distance, 1);
      const translateX = directionX * 7 * influence;
      const translateY = directionY * 5 * influence;
      const scaleX = 1 + 0.12 * influence;
      const scaleY = 1 - 0.045 * influence;
      const skew = -directionY * 5 * influence;
      const rotate = directionX * directionY * 2.4 * influence;

      element.style.transform =
        `translate3d(${translateX}px, ${translateY}px, 0) ` +
        `scale(${scaleX}, ${scaleY}) skewX(${skew}deg) ` +
        `rotate(${rotate}deg)`;
    });
  };

  const reset = (event: PointerEvent<HTMLHeadingElement>) => {
    event.currentTarget.classList.remove("is-distorting");
    glyphsRef.current.forEach(({ element }) => {
      element.style.transform = "";
    });
    glyphsRef.current = [];
  };

  return (
    <h1
      className={`${className} hero-title-glass`.trim()}
      aria-label={text}
      onPointerEnter={(event) => measure(event.currentTarget)}
      onPointerMove={distort}
      onPointerLeave={reset}
    >
      <span aria-hidden="true">
        {text.split(" ").map((word, wordIndex, words) => (
          <span key={`${word}-${wordIndex}`}>
            <span className="hero-title-word">
              {Array.from(word).map((character, characterIndex) => (
                <span
                  className="hero-title-glyph"
                  key={`${character}-${characterIndex}`}
                >
                  {character}
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </h1>
  );
}
