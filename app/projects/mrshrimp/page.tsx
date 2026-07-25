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

const solutionSlides = [
  {
    title: "Старт в один тап",
    description:
      "Без регистрации и обязательного онбординга — можно сразу начать.",
    visual: "start",
  },
  {
    title: "Подстроить под себя",
    description:
      "Перед стартом можно выбрать длительность, формат и тренера — под ситуацию и настроение.",
    visual: "setup",
  },
  {
    title: "Каждый запуск — новый комплекс",
    description:
      "При каждом запуске приложение собирает новый комплекс из библиотеки упражнений.",
    visual: "workout",
  },
  {
    title: "Ощущение результата",
    description:
      "После разминки пользователь получает похвалу, видит прогресс и может открыть награду.",
    visual: "result",
  },
  {
    title: "Видеть регулярность",
    description:
      "Дни в движении, календарь, уровни и челленджи превращают отдельные разминки в заметный прогресс.",
    visual: "progress",
  },
] as const;

function SolutionVisual({
  visual,
}: {
  visual: (typeof solutionSlides)[number]["visual"];
}) {
  if (visual === "start") {
    return (
      <div className="solution-visual solution-visual--start" aria-hidden="true">
        <img src="/assets/mrshrimp-solution/hand-phone.png" alt="" />
      </div>
    );
  }

  if (visual === "setup") {
    return (
      <div className="solution-visual solution-visual--setup" aria-hidden="true">
        <div className="solution-phone solution-phone--setup-a">
          <img src="/assets/mrshrimp-solution/screen-setup-a.png" alt="" />
        </div>
        <div className="solution-phone solution-phone--setup-b">
          <img src="/assets/mrshrimp-solution/screen-setup-b.png" alt="" />
        </div>
      </div>
    );
  }

  if (visual === "workout") {
    return (
      <div className="solution-visual solution-visual--workout" aria-hidden="true">
        <div className="solution-phone solution-phone--landscape">
          <img src="/assets/mrshrimp-solution/screen-workout.png" alt="" />
        </div>
      </div>
    );
  }

  if (visual === "result") {
    return (
      <div className="solution-visual solution-visual--result" aria-hidden="true">
        <div className="solution-phone solution-phone--result-a">
          <img src="/assets/mrshrimp-solution/screen-result-a.png" alt="" />
        </div>
        <div className="solution-phone solution-phone--result-b">
          <img src="/assets/mrshrimp-solution/screen-result-b.png" alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className="solution-visual solution-visual--progress" aria-hidden="true">
      <div className="solution-phone solution-phone--progress-a">
        <img src="/assets/mrshrimp-solution/screen-progress-a.png" alt="" />
      </div>
      <div className="solution-phone solution-phone--progress-b">
        <img src="/assets/mrshrimp-solution/screen-progress-b.png" alt="" />
      </div>
      <div className="solution-phone solution-phone--progress-c">
        <img src="/assets/mrshrimp-solution/screen-progress-c.png" alt="" />
      </div>
    </div>
  );
}

function SolutionSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [isSnapping, setIsSnapping] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  const dragStart = useRef<number | null>(null);
  const dragDistance = useRef(0);
  const suppressClick = useRef(false);
  const wheelLock = useRef(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const measure = () => {
      const slide = slider.querySelector<HTMLElement>(".solution-slide");
      // offsetWidth is the real layout width. getBoundingClientRect() includes
      // the 0.94 scale used for side slides and caused cumulative centering drift.
      if (slide) setSlideWidth(slide.offsetWidth);
      const processSlider = document.querySelector<HTMLElement>(".shrimp-process-slider");
      if (processSlider) setSlideHeight(processSlider.offsetHeight);
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(slider);
    const processSlider = document.querySelector<HTMLElement>(".shrimp-process-slider");
    if (processSlider) resizeObserver.observe(processSlider);
    measure();
    return () => resizeObserver.disconnect();
  }, []);

  const move = (direction: number) => {
    setActiveSlide((current) => (current + direction + solutionSlides.length) % solutionSlides.length);
    setTrackIndex((current) => current + direction);
  };

  const finishDrag = () => {
    if (dragStart.current === null) return;
    if (Math.abs(dragDistance.current) > 70) {
      move(dragDistance.current > 0 ? -1 : 1);
      suppressClick.current = true;
    }
    dragStart.current = null;
    dragDistance.current = 0;
    setDragOffset(0);
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  const loopSlides = [
    solutionSlides[solutionSlides.length - 1],
    ...solutionSlides,
    solutionSlides[0],
  ];

  return (
    <section className="shrimp-story-section shrimp-solution">
      <div className="shrimp-section-title reveal">
        <p>Решение</p>
        <h2 data-cursor="text">
          Быстрая разминка
          <br />
          без лишних усилий
        </h2>
        <div className="shrimp-solution-intro">
          <p>
            JTBD: Когда я несколько часов работаю за компьютером и перестаю замечать
            напряжение в теле, я хочу получить короткое напоминание подвигаться, чтобы
            не доводить себя до сильной усталости.
          </p>
          <p>Начать → Размяться → Увидеть результат → Вернуться</p>
        </div>
      </div>

      <div
        className="shrimp-solution-slider reveal"
        ref={sliderRef}
        data-cursor="carousel-right"
        role="region"
        aria-roledescription="карусель"
        aria-label="Ключевые решения приложения"
        tabIndex={0}
        onWheel={(event) => {
          if (Math.abs(event.deltaX) < Math.abs(event.deltaY) || Math.abs(event.deltaX) < 12) return;
          event.preventDefault();
          if (wheelLock.current) return;
          wheelLock.current = true;
          move(event.deltaX > 0 ? 1 : -1);
          window.setTimeout(() => {
            wheelLock.current = false;
          }, 520);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest("button")) return;
          dragStart.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.dataset.cursor =
            event.clientX < rect.left + rect.width / 2 ? "carousel-left" : "carousel-right";
          if (dragStart.current === null) return;
          const distance = event.clientX - dragStart.current;
          dragDistance.current = distance;
          if (Math.abs(distance) > 8) suppressClick.current = true;
          setDragOffset(distance);
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onClick={(event) => {
          if (suppressClick.current || (event.target as HTMLElement).closest("button")) return;
          const rect = event.currentTarget.getBoundingClientRect();
          move(event.clientX < rect.left + rect.width / 2 ? -1 : 1);
        }}
      >
        <div
          className={`shrimp-solution-track ${dragStart.current !== null ? "is-dragging" : ""} ${isSnapping ? "is-snapping" : ""}`}
          style={{
            transform: `translate3d(calc(50vw - ${slideWidth / 2}px - ${trackIndex * (slideWidth + 24)}px + ${dragOffset}px), 0, 0)`,
            height: slideHeight ? `${slideHeight}px` : undefined,
          }}
          onTransitionEnd={(event) => {
            if (event.propertyName !== "transform") return;
            if (trackIndex === 0) {
              setIsSnapping(true);
              setTrackIndex(solutionSlides.length);
              requestAnimationFrame(() => requestAnimationFrame(() => setIsSnapping(false)));
            } else if (trackIndex === solutionSlides.length + 1) {
              setIsSnapping(true);
              setTrackIndex(1);
              requestAnimationFrame(() => requestAnimationFrame(() => setIsSnapping(false)));
            }
          }}
        >
          {loopSlides.map((slide, index) => {
            const realIndex = (index - 1 + solutionSlides.length) % solutionSlides.length;
            const isActive = index === trackIndex;
            return (
            <article
              className={`solution-slide solution-slide--${slide.visual} ${isActive ? "is-active" : ""}`}
              aria-label={`${realIndex + 1} из ${solutionSlides.length}: ${slide.title}`}
              aria-hidden={!isActive}
              key={`${slide.title}-${index}`}
            >
              <div className="solution-slide__copy">
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
              <SolutionVisual visual={slide.visual} />
            </article>
          )})}
        </div>

        <p className="sr-only" aria-live="polite">
          Слайд {activeSlide + 1} из {solutionSlides.length}
        </p>
      </div>
    </section>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className={`case-arrow-icon case-arrow-icon--${direction}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

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

      <div
        className="shrimp-process-slider reveal"
        data-cursor="carousel-right"
        role="region"
        aria-roledescription="карусель"
        aria-label="Этапы процесса"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        onPointerMove={(event) => {
          if ((event.target as HTMLElement).closest("button")) return;
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.dataset.cursor =
            event.clientX < rect.left + rect.width / 2 ? "carousel-left" : "carousel-right";
        }}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("button")) return;
          const rect = event.currentTarget.getBoundingClientRect();
          move(event.clientX < rect.left + rect.width / 2 ? -1 : 1);
        }}
      >
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
              <span className="shrimp-process-tab-copy">
                <span className="shrimp-process-tab-copy-inner">
                  <span className="shrimp-process-tab-description">{item.card}</span>
                  <span className="shrimp-process-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                </span>
              </span>
            </button>
          ))}
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
      const interactive = document
        .elementFromPoint(targetX, targetY)
        ?.closest<HTMLElement>("[data-cursor]");
      let nextMode = interactive?.dataset.cursor ?? "";

      if (interactive && nextMode.startsWith("carousel")) {
        const rect = interactive.getBoundingClientRect();
        nextMode =
          targetX < rect.left + rect.width / 2
            ? "carousel-left"
            : "carousel-right";
      }

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

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <ArrowIcon direction="left" />
      <ArrowIcon direction="right" />
      <span className="case-next-cursor">
        <img src="/assets/punto-screen.png" alt="" />
      </span>
    </div>
  );
}

function ResultSection() {
  const metrics = [
    ["31%", "33 из 106", "запустили разминку"],
    ["26%", "28 из 106", "вернулись в другой день"],
    ["10%", "10 из 101", "вернулись через неделю (D7)"],
  ];

  return (
    <section className="shrimp-story-section shrimp-result">
      <div className="shrimp-section-title reveal">
        <p>Результат</p>
        <h2 data-cursor="text">
          Большинство запущенных разминок
          <br />
          доходят до завершения
        </h2>
        <p className="shrimp-result-subtitle">
          Зона роста — активация и регулярный возврат
        </p>
      </div>

      <div className="shrimp-result-stage reveal">
        <div className="shrimp-result-primary">
          <strong>73%</strong>
          <span>201 запуск → 146 завершений</span>
        </div>

        <div className="shrimp-result-phone" aria-hidden="true">
          <div className="shrimp-result-screen">
            <img src="/assets/mrshrimp-result/completion.png" alt="" />
            <div className="shrimp-result-complete">
              <strong>Молодец!<br />Разминка закончена</strong>
              <span>Готово</span>
            </div>
          </div>
        </div>

        <div className="shrimp-result-details">
          <div className="shrimp-result-metrics">
            {metrics.map(([value, sample, label]) => (
              <div className="shrimp-result-metric" key={value}>
                <div>
                  <strong>{value}</strong>
                  <span>{sample}</span>
                </div>
                <p>{label}</p>
              </div>
            ))}
          </div>
          <p className="shrimp-result-note">
            D1 — 11% · DAU/MAU: 8% → 9%
            <br />
            1 мая — 8 июля · 106 реальных пользователей
          </p>
        </div>
      </div>
    </section>
  );
}

function NextProject() {
  return (
    <a
      className="shrimp-next-project"
      href="/#projects"
      aria-label="Перейти к следующему проекту Punto Pago"
      data-cursor="next-project"
    >
      <span className="shrimp-next-track" aria-hidden="true">
        <span>Следующий проект →</span>
        <span>Следующий проект →</span>
        <span>Следующий проект →</span>
        <span>Следующий проект →</span>
      </span>
      <span className="sr-only">Следующий проект — Punto Pago</span>
    </a>
  );
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

      <SolutionSlider />

      <ResultSection />

      <NextProject />

      <footer className="shrimp-footer">
        <p>2026</p>
        <a href="/#projects" data-cursor="link">
          Все проекты ↗
        </a>
      </footer>
    </main>
  );
}
