"use client";

import { useEffect } from "react";

export function useNavMagnet() {
  useEffect(() => {
    const disabled =
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (disabled) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ['[data-cursor="nav"]', ".theme-switch", ".site-header .brand", ".case-header .shrimp-brand", ".shrimp-header .shrimp-brand", ".case-store-link"].join(", "),
      ),
    );

    const cleanups = elements.map((element) => {
      const isThemeSwitch = element.classList.contains("theme-switch");
      const isBrand = element.classList.contains("brand") || element.classList.contains("shrimp-brand");
      const strengthX = isThemeSwitch ? 9 : isBrand ? 8 : 11;
      const strengthY = isThemeSwitch ? 6 : isBrand ? 5 : 7;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let frame = 0;

      const render = () => {
        currentX += (targetX - currentX) * 0.13;
        currentY += (targetY - currentY) * 0.13;
        element.style.setProperty("transform", `translate3d(${currentX}px, ${currentY}px, 0)`, "important");

        const moving = Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02;
        if (moving) {
          frame = requestAnimationFrame(render);
        } else {
          currentX = targetX;
          currentY = targetY;
          frame = 0;
        }
      };

      const start = () => {
        if (!frame) frame = requestAnimationFrame(render);
      };

      const ease = (value: number) => {
        const normalized = Math.min(1, Math.abs(value));
        const eased = 1 - Math.pow(1 - normalized, 2.2);
        return Math.sign(value) * eased;
      };

      const move = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        targetX = ease(x) * strengthX;
        targetY = ease(y) * strengthY;
        start();
      };

      const reset = () => {
        targetX = 0;
        targetY = 0;
        start();
      };

      element.addEventListener("pointermove", move, { passive: true });
      element.addEventListener("pointerleave", reset);

      return () => {
        cancelAnimationFrame(frame);
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
        element.style.removeProperty("transform");
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}
