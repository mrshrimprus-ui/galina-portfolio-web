"use client";

import Lenis from "lenis";
import { useEffect, useState } from "react";
import { useNavMagnet } from "../../hooks/useNavMagnet";

export default function CaseExperience() {
  useNavMagnet();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      anchors: true,
    });

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }),
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".case-page .reveal")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="shrimp-header case-header text-normal">
      <a className="shrimp-brand text-logo" href="/" data-cursor="link">
        Galina Chumak
      </a>

      <nav aria-label="Навигация по портфолио">
        <a href="/#projects" data-cursor="nav">Проекты</a>
        <a href="/about" data-cursor="nav">Обо мне</a>
      </nav>

      <button
        className="theme-switch"
        type="button"
        aria-label={
          theme === "dark"
            ? "Включить светлую тему"
            : "Включить тёмную тему"
        }
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        data-cursor="link"
      >
        <span className={`theme-option ${theme === "light" ? "active" : ""}`}>
          <span className="theme-icon theme-icon--sun" aria-hidden="true" />
        </span>

        <span className={`theme-option ${theme === "dark" ? "active" : ""}`}>
          <span className="theme-icon theme-icon--moon" aria-hidden="true" />
        </span>
      </button>
    </header>
  );
}
