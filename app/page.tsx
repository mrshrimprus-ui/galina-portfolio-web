"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    slug: "mrshrimp",
    title: "MrShrimp",
    description:
      "Приложение с короткими разминками: полный цикл от исследования и проектирования до релиза и аналитики.",
    meta: ["2025–2026 · Wellness · HealthTech", "Founder & Product Designer", "iOS · Android · Web · 0→1"],
    hand: "/assets/mrshrimp-hand.png",
    screen: "/assets/mrshrimp-screen.png",
  },
  {
    slug: "punto",
    title: "Punto Pago",
    description:
      "Развитие коммерческого финтех-продукта: кошелёк, маркетплейс, банковские сервисы и web-админка.",
    meta: ["2021–2022 · Team project", "B2C · B2B · FinTech · Marketplace", "iOS · Android · Web-admin"],
    hand: "/assets/punto-hand.png",
    screen: "/assets/punto-screen.png",
  },
  {
    slug: "smarthome",
    title: "Smart Home",
    description:
      "Интеграция нового IoT-устройства в систему умного дома: от документации до реализации.",
    meta: ["2024–2025 · Team project", "B2C · IoT · Smart Home", "iOS · Android"],
    hand: "/assets/smarthome-hand.png",
    screen: "/assets/smarthome-screen.png",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const cardRef = useRef<HTMLElement>(null);

  const moveImage = (event: React.PointerEvent<HTMLElement>) => {
    if (!cardRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.setProperty("--pointer-x", `${x * 18}px`);
    cardRef.current.style.setProperty("--pointer-y", `${y * 14}px`);
  };

  const resetImage = () => {
    cardRef.current?.style.setProperty("--pointer-x", "0px");
    cardRef.current?.style.setProperty("--pointer-y", "0px");
  };

  return (
    <article
      className={`project-card project-card--${project.slug} reveal`}
      ref={cardRef}
      style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
      onPointerMove={moveImage}
      onPointerLeave={resetImage}
      aria-labelledby={`${project.slug}-title`}
    >
      <div className="project-copy">
        <h2 id={`${project.slug}-title`}>{project.title}</h2>
        <p>{project.description}</p>
      </div>

      <div className="project-visual" aria-hidden="true">
        <img className="project-hand" src={project.hand} alt="" />
        <div className="screen-mask">
          <img className="project-screen" src={project.screen} alt="" />
        </div>
      </div>

      <p className="project-meta">
        {project.meta.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
      <span className="project-arrow" aria-hidden="true">↗</span>
    </article>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Galina Chumak — наверх">
          Galina Chumak
        </a>
        <nav aria-label="Основная навигация">
          <a href="#projects">Проекты</a>
          <a href="#about">Обо мне</a>
        </nav>
        <button
          className="theme-switch"
          type="button"
          aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className={`theme-option ${theme === "light" ? "active" : ""}`}>
            <span className="theme-icon theme-icon--sun" aria-hidden="true" />
          </span>
          <span className={`theme-option ${theme === "dark" ? "active" : ""}`}>
            <span className="theme-icon theme-icon--moon" aria-hidden="true" />
          </span>
        </button>
      </header>

      <section className="hero" id="top">
        <h1 className="reveal">
          <span>Senior Product</span>
          <span>Designer</span>
        </h1>
        <p className="hero-description reveal" style={{ "--delay": "120ms" } as React.CSSProperties}>
          9+ лет создаю продукты с нуля и развиваю мобильные / веб-сервисы для B2C и B2B.
        </p>
      </section>

      <section className="projects" id="projects" aria-label="Избранные проекты">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>

      <footer id="about">
        <p>2026</p>
        <a href="mailto:galina-done@yandex.com">Связаться ↗</a>
      </footer>
    </main>
  );
}
