"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const processStages = [
  {
    label: "Исследование",
    title: "Поведенческие персоны",
    description:
      "Осознанный здоровист — заботится о здоровье и профилактике. Поддерживающий активность — хочет сохранять физическую форму.",
    card:
      "Провела 6 глубинных интервью и выделила 2 поведенческие персоны с разными драйверами и барьерами. На основе выводов собрала CJM основного сценария и общий User Flow.",
    tags: ["Интерьвю", "Персоны", "CJM", "User Flow"],
    visual: "research",
  },
  {
    label: "Проектирование",
    title: "Персонажи-тренеры",
    description:
      "Дружелюбная подача, меньше давления и больше разнообразия.",
    card:
      "На основе исследования сформировала концепцию персонажей-тренеров: они снижают ощущение давления и добавляют разнообразие. Разработала UI-kit, ключевые сценарии и corner cases.",
    tags: ["Концепция", "UI-kit", "Сценарии"],
    visual: "design",
  },
  {
    label: "Тестирование",
    title: "Наблюдения после тестов",
    description:
      "Тестирование показало риски и направления для следующих итераций.",
    card:
      "Провела 10 модерируемых тестов раннего прототипа с участниками из 3 профилей. Проверяла драйверы и барьеры, восприятие персонажей и понятность первой разминки.",
    tags: ["Модерируемое UX-тестирование", "Профили"],
    visual: "testing",
  },
  {
    label: "Разработка",
    title: "От дизайна к работающему продукту",
    description:
      "Самостоятельно реализовала приложение и проверяла решения уже в работающем продукте.",
    card:
      "Собрала приложение во FlutterFlow: реализовала основные сценарии, состояния и бизнес-логику, подключила Firebase, аналитику, авторизацию и уведомления. Подготовила сборки для iOS и Android.",
    tags: ["FlutterFlow", "Firebase", "GA4", "iOS · Android"],
    visual: "development",
  },
  {
    label: "Релиз",
    title: "Довела продукт до пользователей",
    description:
      "Приложение опубликовано в App Store и Google Play",
    card:
      "Подготовила релизные сборки и страницы в сторах, организовала внешнее тестирование и прошла модерацию. Выпустила iOS-версию в App Store, Android-версию довела до открытого тестирования.",
    tags: ["TestFlight", "Google Play", "App Store"],
    visual: "release",
  },
  {
    label: "Аналитика",
    title: "От данных к следующим итерациям",
    description:
      "Анализирую воронку и поведение пользователей, чтобы находить точки роста и проверять продуктовые гипотезы.",
    card:
      "Настроила продуктовые события в GA4 и собрала дашборды в Tableau. Отслеживаю активацию, использование, завершение разминок, повторные запуски и возвраты.",
    tags: ["Firebase", "BigQuery", "Tableau", "GA4"],
    visual: "analytics",
  },
] as const;

function ProcessVisual({ visual }: { visual: (typeof processStages)[number]["visual"] }) {
  if (visual === "research") {
    return (
      <div className="process-visual process-visual--research" aria-hidden="true">
        <img src="/assets/mrshrimp-process/research-back.png" alt="" />
        <img src="/assets/mrshrimp-process/research-front.png" alt="" />
      </div>
    );
  }

  if (visual === "design") {
    return (
      <div className="process-visual process-visual--design" aria-hidden="true">
        <img src="/assets/mrshrimp-process/design.png" alt="" />
      </div>
    );
  }

  if (visual === "testing") {
    const insights = [
      ["test-a.png", "Ждали аудио во время разминки", "Повысить приоритет аудио"],
      ["test-b.png", "Формат казался слишком лёгким", "Яснее объяснять пользу"],
      ["test-c.png", "Стилистику воспринимали по-разному", "Продолжить проверку"],
    ];
    return (
      <div className="process-visual process-visual--testing" aria-hidden="true">
        {insights.map(([icon, title, caption]) => (
          <div className="process-insight" key={title}>
            <img src={`/assets/mrshrimp-process/${icon}`} alt="" />
            <span>
              <strong>{title}</strong>
              <small>{caption}</small>
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (visual === "development") {
    return (
      <div className="process-visual process-visual--development" aria-hidden="true">
        <img src="/assets/mrshrimp-process/development-a.png" alt="" />
        <img src="/assets/mrshrimp-process/development-b.png" alt="" />
      </div>
    );
  }

  if (visual === "release") {
    return (
      <div className="process-visual process-visual--release" aria-hidden="true">
        <img src="/assets/mrshrimp-process/release-device.png" alt="" />
        <img src="/assets/mrshrimp-process/release-screen.png" alt="" />
        <img src="/assets/mrshrimp-process/release-frame.png" alt="" />
      </div>
    );
  }

  return (
    <div className="process-visual process-visual--analytics" aria-hidden="true">
      {["analytics-a.png", "analytics-b.png", "analytics-c.png", "analytics-d.png"].map(
        (image) => (
          <img src={`/assets/mrshrimp-process/${image}`} alt="" key={image} />
        ),
      )}
    </div>
  );
}

function ProcessSlider() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = processStages[activeStage];

  const move = (direction: number) => {
    setActiveStage(
      (current) => (current + direction + processStages.length) % processStages.length,
    );
  };

  return (
    <section className="shrimp-story-section shrimp-process">
      <div className="shrimp-section-title reveal">
        <p>Процесс</p>
        <h2 data-cursor="text">
          Исследования, дизайн, разработка
          <br />и аналитика — полный цикл продукта
        </h2>
      </div>

      <div className="shrimp-process-slider reveal">
        <div
          className={`shrimp-process-scene shrimp-process-scene--${stage.visual}`}
          key={stage.label}
        >
          <ProcessVisual visual={stage.visual} />
          <div className="shrimp-process-result">
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
          </div>
        </div>

        <div className="shrimp-process-tabs" role="tablist" aria-label="Этапы процесса">
          {processStages.map((item, index) => (
            <button
              className={index === activeStage ? "is-active" : ""}
              type="button"
              role="tab"
              aria-selected={index === activeStage}
              key={item.label}
              onClick={() => setActiveStage(index)}
              data-cursor="link"
            >
              <span>{String(index + 1).padStart(2, "0")}</span> {item.label}
              {index === activeStage && (
                <span className="shrimp-process-tab-copy">
                  {item.card}
                  <span className="shrimp-process-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="shrimp-process-arrows">
          <button
            type="button"
            aria-label="Предыдущий этап"
            onClick={() => move(-1)}
            data-cursor="link"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Следующий этап"
            onClick={() => move(1)}
            data-cursor="link"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

function CaseCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const enabled =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cursor || !enabled) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let frame = 0;
    let mode = "";

    document.documentElement.classList.add("custom-cursor-enabled");

    const updateMode = () => {
      const nextMode =
        document
          .elementFromPoint(targetX, targetY)
          ?.closest<HTMLElement>("[data-cursor]")
          ?.dataset.cursor ?? "";

      if (nextMode !== mode) {
        mode = nextMode;
        cursor.dataset.mode = nextMode;
      }
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add("is-visible");
      updateMode();
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.17;
      currentY += (targetY - currentY) * 0.17;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const leave = () => cursor.classList.remove("is-visible");
    const press = () => cursor.classList.add("is-pressed");
    const release = () => cursor.classList.remove("is-pressed");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", updateMode, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", updateMode);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />;
}

function CaseExperience() {
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
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }),
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".shrimp-case .reveal")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CaseCursor />
      <header className="shrimp-header">
        <a className="shrimp-brand" href="/" data-cursor="link">
          Galina Chumak
        </a>
        <nav aria-label="Навигация по портфолио">
          <a href="/#projects" data-cursor="link">
            Проекты
          </a>
          <a href="/#about" data-cursor="link">
            Обо мне
          </a>
        </nav>
        <button
          className="theme-switch"
          type="button"
          aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
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
    </>
  );
}

export default function MrShrimpCase() {
  return (
    <main className="shrimp-case">
      <CaseExperience />

      <section className="shrimp-cover">
        <div className="shrimp-cover-copy">
          <h1 className="reveal reveal-heading" data-cursor="text">
            <span>MrShrimp</span>
          </h1>
          <p className="shrimp-summary reveal">
            Приложение с короткими разминками для людей, которые много работают за
            компьютером. Полный цикл создания продукта: от исследования до релиза и
            аналитики.
          </p>
        </div>

        <div className="shrimp-cover-visual reveal" aria-hidden="true">
          <img src="/assets/mrshrimp-screen.png" alt="" />
        </div>

        <p className="shrimp-meta reveal">
          <span>2025–2026 · Wellness · HealthTech</span>
          <span>Founder &amp; Product Designer</span>
          <span>iOS · Android · Web · 0→1</span>
        </p>
      </section>

      <section className="shrimp-story-section shrimp-context">
        <div className="shrimp-section-title reveal">
          <p>Контекст</p>
          <h2 data-cursor="text">
            Самостоятельно создала продукт
            <br />
            от гипотезы до релиза
          </h2>
        </div>
        <figure className="shrimp-media reveal">
          <img
            src="/assets/mrshrimp-context-grid.png"
            alt="Экраны приложения MrShrimp, интеграция с iPhone и персонаж разминки"
          />
        </figure>
      </section>

      <section className="shrimp-story-section shrimp-task">
        <div className="shrimp-section-title reveal">
          <p>Задача</p>
          <h2 data-cursor="text">
            Запустить MVP и проверить, впишутся
            <br />
            ли короткие разминки в рабочий день
          </h2>
        </div>
        <figure className="shrimp-media reveal">
          <img
            src="/assets/mrshrimp-mvp-collage.png"
            alt="Ключевые экраны MVP приложения MrShrimp"
          />
        </figure>
      </section>

      <ProcessSlider />

      <footer className="shrimp-footer">
        <p>2026</p>
        <a href="/#projects" data-cursor="link">
          Все проекты ↗
        </a>
      </footer>
    </main>
  );
}
