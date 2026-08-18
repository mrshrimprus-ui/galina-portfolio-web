"use client";

import { useEffect } from "react";
import { useNavMagnet } from "../hooks/useNavMagnet";
import { usePersistentTheme } from "../hooks/usePersistentTheme";
import CaseArtifactLink from "../projects/components/CaseArtifactLink";
import InteractiveTitle from "../components/InteractiveTitle";
export default function AboutPage() {
  useNavMagnet();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.05 },
    );

    document
      .querySelectorAll(".about-page .reveal")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { theme, setTheme } = usePersistentTheme();

  return (
    <main className="about-page">
      <header className="site-header text-normal">
        <a
          className="brand text-logo"
          href="/"
          aria-label="Galina Chumak — главная"
          data-cursor="link"
        >
          Galina Chumak
        </a>

        <nav aria-label="Основная навигация">
          <a href="/#projects" data-cursor="nav">Проекты</a>
          <a href="/about" aria-current="page" data-cursor="nav">Обо мне</a>
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

      <section className="about-content">
        <InteractiveTitle
          text="Обо мне"
          className="about-title type-h1 reveal"
        />

        <div className="about-copy">
          <p className="about-lead type-text-xl reveal">
            Я — Галина, продуктовый дизайнер с 9+ годами опыта. Проектирую
            мобильные и веб-продукты для стартапов и небольших команд.
          </p>

          <div className="about-copy__columns reveal">
            <p className="text-normal">
              Мне нравятся задачи, где нужно разобраться в новой предметной
              области, требованиях и ограничениях. Предпочитаю работать
              напрямую с менеджером, аналитиком и разработчиками и делать
              решения, которые можно выпустить и развивать.
            </p>

            <p className="text-normal">
              Последний год развиваю MrShrimp: отвечаю за продуктовую логику,
              дизайн, сборку во FlutterFlow, аналитику и релизы. Нейросети
              использую для проработки решений, анализа данных, поиска
              вариантов реализации и создания контента.
            </p>
          </div>
        </div>

        <div className="about-contacts text-normal reveal">
          <a href="mailto:galina.done@mail.ru" data-cursor="nav">
            galina.done@mail.ru
          </a>
          <a href="https://t.me/galina_done" target="_blank" rel="noreferrer" data-cursor="nav">telegram</a>
          <a href="https://www.linkedin.com/in/галина-чумак-977951270" target="_blank" rel="noreferrer" data-cursor="nav">LinkedIn</a>

          <CaseArtifactLink
            href="https://drive.google.com/file/d/1ho40Lo-m_XTKQEZ73E2uDVyfBf6LDIcX/view?usp=sharing"
            className="about-cv-link"
          >
            Скачать CV
          </CaseArtifactLink>
        </div>
      </section>
    </main>
  );
}
