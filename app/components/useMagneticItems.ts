"use client";

import { useRef, type PointerEvent } from "react";

export default function useMagneticItems<T extends HTMLElement>() {
  const refs = useRef<Array<T | null>>([]);

  const reset = () => {
    refs.current.forEach((item) => {
      if (!item) return;
      item.style.setProperty("--magnetic-x", "0px");
      item.style.setProperty("--magnetic-y", "0px");
      item.style.setProperty("--magnetic-r", "0deg");
    });
  };

  const move = (event: PointerEvent<HTMLElement>) => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const radius = 135;

    refs.current.forEach((item) => {
      if (!item) return;

      const rect = item.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const dx = x - event.clientX;
      const dy = y - event.clientY;
      const distance = Math.hypot(dx, dy);

      if (!distance || distance >= radius) {
        item.style.setProperty("--magnetic-x", "0px");
        item.style.setProperty("--magnetic-y", "0px");
        item.style.setProperty("--magnetic-r", "0deg");
        return;
      }

      const influence = 1 - distance / radius;
      const force = influence * 8;

      item.style.setProperty(
        "--magnetic-x",
        `${(dx / distance) * force}px`
      );

      item.style.setProperty(
        "--magnetic-y",
        `${(dy / distance) * force}px`
      );

      item.style.setProperty(
        "--magnetic-r",
        `${(dx / distance) * influence * 2}deg`
      );
    });
  };

  const setRef = (index: number) => (element: T | null) => {
    refs.current[index] = element;
  };

  return {
    setRef,
    magneticProps: {
      onPointerMove: move,
      onPointerLeave: reset,
    },
  };
}
