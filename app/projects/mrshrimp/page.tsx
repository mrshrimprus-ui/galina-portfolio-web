"use client";

import CaseProjectVisual from "../components/CaseProjectVisual";
import CaseContextGrid from "../components/CaseContextGrid";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CaseSectionHeader from "../components/CaseSectionHeader";
import CaseHero from "../components/CaseHero";
import CasePageShell from "../components/CasePageShell";
import CaseTaskVisual from "../components/CaseTaskVisual";
import CaseSolutionSlider from "../components/CaseSolutionSlider";

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
  const numberByVisual: Record<
    (typeof solutionSlides)[number]["visual"],
    string
  > = {
    start: "01",
    setup: "02",
    workout: "03",
    result: "04",
    progress: "05",
  };

  const number = numberByVisual[visual];

  return (
    <div className="solution-visual solution-visual--asset" aria-hidden="true">
      <motion.div
        className="solution-visual__background-reveal"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          className="solution-visual__background"
          src={`/assets/mrshrimp/solution/mrshrimp-solution-${number}-bg.png`}
          alt=""
          draggable={false}
        />
      </motion.div>

      <motion.div
        className="solution-visual__picture-reveal"
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.85,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="solution-visual__picture-wrap">
          <img
            className="solution-visual__picture"
            src={`/assets/mrshrimp/solution/mrshrimp-solution-${number}-pic.png`}
            alt=""
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  );
}

function SolutionSlider() {
  return (
    <section className="shrimp-story-section shrimp-solution">
      <div className="shrimp-section-title reveal">
        <p className="type-section-label">
          Решение
        </p>

        <h2 className="type-h2">
          Быстрая разминка
          <br />
          без лишних усилий
        </h2>

        <div className="shrimp-solution-intro type-text">
          <p className="type-caption">
            JTBD: Когда я долго работаю за компьютером
            и чувствую напряжение в теле, я хочу быстро
            сделать короткую разминку без подготовки
            и поиска упражнений, чтобы почувствовать
            себя лучше и постепенно сделать движение
            частью рабочего дня.
          </p>

          <p className="type-caption">
            Начать → Размяться → Увидеть результат
            → Вернуться
          </p>
        </div>
      </div>

      <CaseSolutionSlider
        slides={solutionSlides}
        ariaLabel="Ключевые решения приложения"
        renderVisual={(visual) => (
          <SolutionVisual
            visual={
              visual as
                (typeof solutionSlides)[number]["visual"]
            }
          />
        )}
      />
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
        <img src="/assets/mrshrimp/process/research-back.png" alt="" />
        <img src="/assets/mrshrimp/process/research-front.png" alt="" />
      </div>
    );
  }

  if (visual === "design") {
    return (
      <div className="process-visual process-visual--design">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
        >
          <source
            src="https://res.cloudinary.com/dk0kxiahf/video/upload/f_mp4,vc_h264,q_auto/v1775294269/manki_forearm_rotation_yixabe.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    );
  }

  if (visual === "testing") {
    return (
      <div className="process-visual process-visual--testing">
        <article className="process-insight process-insight--audio">
          <i
            className="process-insight-icon process-insight-icon--audio"
            aria-hidden="true"
          />
          <span>
            <strong>Ждали аудио во время разминки</strong>
            <small>Повысить приоритет аудио</small>
          </span>
        </article>

        <article className="process-insight process-insight--format">
          <i
            className="process-insight-icon process-insight-icon--format"
            aria-hidden="true"
          />
          <span>
            <strong>Формат казался слишком лёгким</strong>
            <small>Яснее объяснять пользу</small>
          </span>
        </article>

        <article className="process-insight process-insight--style">
          <i
            className="process-insight-icon process-insight-icon--style"
            aria-hidden="true"
          />
          <span>
            <strong>Стилистику воспринимали по-разному</strong>
            <small>Продолжить проверку</small>
          </span>
        </article>
      </div>
    );
  }

  if (visual === "development") {
    return (
      <div className="process-visual process-visual--development" aria-hidden="true">
        <img src="/assets/mrshrimp/process/development-a.png" alt="" />
        <img src="/assets/mrshrimp/process/development-b.png" alt="" />
      </div>
    );
  }

  if (visual === "release") {
    return (
      <div className="process-visual process-visual--release">
        <img
          src="/assets/mrshrimp/process/release-device.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="sync"
        />
      </div>
    );
  }

  return (
    <div className="process-visual process-visual--analytics" aria-hidden="true">
      {["analytics-a.png", "analytics-b.png", "analytics-c.png", "analytics-d.png"].map(
        (image) => (
          <img src={`/assets/mrshrimp/process/${image}`} alt="" key={image} />
        ),
      )}
    </div>
  );
}

function ProcessSlider() {
  const processSliderRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const stage = processStages[activeStage];


  // PROCESS SCROLL PARALLAX
  useEffect(() => {
    const processSlider = processSliderRef.current;

    if (
      !processSlider ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;

    const updateParallax = () => {
      const rect = processSlider.getBoundingClientRect();
      const sliderCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      const offset = Math.max(
        -22,
        Math.min(
          22,
          (viewportCenter - sliderCenter) * 0.06,
        ),
      );

      processSlider.style.setProperty(
        "--process-scroll-y",
        `${offset.toFixed(2)}px`,
      );
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const move = (moveDirection: number) => {
    setActiveStage(
      (current) =>
        (current + moveDirection + processStages.length) %
        processStages.length,
    );
  };

  const selectStage = (index: number) => {
    if (index === activeStage) return;
    setActiveStage(index);
  };

  return (
    <section className="shrimp-story-section shrimp-process">
      <div className="shrimp-section-title reveal">
        <p className="type-section-label">Процесс</p>
        <h2 className="type-h2">
          Исследования, дизайн, разработка и аналитика: полный цикл продукта
        </h2>
      </div>

      <div
        className="shrimp-process-slider reveal"
        ref={processSliderRef}
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
        >
          <div
            className="shrimp-process-visual-stack"
            aria-hidden="true"
          >
            {processStages.map((item, index) => {
              const isActive = index === activeStage;

              return (
                <motion.div
                  className="shrimp-process-visual-layer"
                  key={item.visual}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 10,
                    scale: isActive ? 1 : 0.992,
                  }}
                  transition={{
                    duration: isActive ? 0.8 : 0.22,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  style={{
                    zIndex: isActive ? 2 : 1,
                  }}
                >
                  <ProcessVisual visual={item.visual} />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="shrimp-process-result"
            key={stage.label}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            style={{
              willChange: "opacity, transform",
            }}
          >
            <h3 className="type-text-l">{stage.title}</h3>
            <p className="type-caption-small">{stage.description}</p>
          </motion.div>
        </div>

        <motion.div
          className="shrimp-process-tabs"
          role="tablist"
          aria-label="Этапы процесса"
          layout
        >
          {processStages.map((item, index) => {
            const isActive = index === activeStage;

            return (
              <motion.button
                layout
                style={{ borderRadius: 24 }}
                className={isActive ? "is-active" : ""}
                type="button"
                role="tab"
                aria-selected={isActive}
                key={item.label}
                onClick={() => selectStage(index)}
                data-cursor="link"
                transition={{
                  layout: {
                    duration: 0.48,
                    ease: [0.22, 1, 0.36, 1] as const,
                  },
                }}
              >
                <motion.span
                  className="shrimp-process-tab-head"
                  layout="position"
                  transition={{
                    layout: {
                      duration: 0.48,
                      ease: [0.22, 1, 0.36, 1] as const,
                    },
                  }}
                >
                  <span className="shrimp-process-tab-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="shrimp-process-tab-label">
                    {item.label}
                  </span>
                </motion.span>

                <AnimatePresence initial={false} mode="popLayout">
                  {isActive && (
                    <motion.span
                      className="shrimp-process-tab-copy"
                      key={`copy-${item.label}`}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: {
                          duration: 0.3,
                          delay: 0.2,
                          ease: [0.22, 1, 0.36, 1] as const,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.12,
                          ease: "easeOut",
                        },
                      }}
                    >
                      <span className="shrimp-process-tab-copy-inner">
                        <span className="shrimp-process-tab-description type-caption-small">
                          {item.card}
                        </span>

                        <span className="shrimp-process-tags">
                          {item.tags.map((tag) => (
                            <span key={tag} className="type-caption-regular text-secondary">{tag}</span>
                          ))}
                        </span>
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

function ResultSection() {
  const resultStageRef = useRef<HTMLDivElement>(null);

  // RESULT PHONE SCROLL PARALLAX
  useEffect(() => {
    const stage = resultStageRef.current;

    if (
      !stage ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;

    const updateParallax = () => {
      const rect = stage.getBoundingClientRect();
      const stageCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      const offset = Math.max(
        -34,
        Math.min(34, (viewportCenter - stageCenter) * 0.07),
      );

      stage.style.setProperty(
        "--result-phone-y",
        `${offset.toFixed(2)}px`,
      );
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const metrics = [
    ["31%", "33 из 106", "запустили разминку"],
    ["26%", "28 из 106", "вернулись в другой день"],
    ["10%", "10 из 101", "вернулись через неделю (D7)"],
  ];

  return (
    <section className="shrimp-story-section shrimp-result">
      <div className="shrimp-section-title reveal">
        <p className="type-caption type-section-label">Результат</p>
        <h2 className="type-h2">
          Пользователи завершают большинство начатых разминок
        </h2>
      </div>

      <div className="shrimp-result-stage reveal" ref={resultStageRef}>
        <div className="shrimp-result-primary">
          <strong className="type-title">73%</strong>
          <span className="type-caption-regular text-secondary">201 запуск → 146 завершений</span>
        </div>

        <div className="shrimp-result-phone" aria-hidden="true">
          <img src="/assets/mrshrimp/result/results.png" alt="Результат MrShrimp" className="shrimp-result-full" />
        </div>

        <div className="shrimp-result-details">
          <div className="shrimp-result-metrics">
            {metrics.map(([value, sample, label]) => (
              <div className="shrimp-result-metric" key={value}>
                <div>
                  <strong className="type-h2">{value}</strong>
                  <span className="type-caption-regular">{sample}</span>
                </div>
                <p className="type-caption-regular">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MrShrimpCase() {
  return (
    <CasePageShell
      className="shrimp-case"
      nextProject={{
        href: "/projects/punto",
        title: "Punto Pago",
      }}
    >
        <CaseHero
          title="MrShrimp"
          summary={
            <>
              Приложение с короткими разминками для людей, которые много работают за
              компьютером. Полный цикл создания продукта: от исследования до релиза и
              аналитики.
            </>
          }
          visual={
            <CaseProjectVisual
              variant="mrshrimp"
              image="/assets/mrshrimp/home/screen.webp"
            />
          }
          meta={[
            "2025–2026 · Wellness · HealthTech",
            "Founder & Product Designer",
            "iOS · Android · 0→1",
          ]}
        />

      <section className="shrimp-story-section shrimp-context">
        <CaseSectionHeader label="Контекст">
          Самостоятельно создала продукт от гипотезы до релиза
        </CaseSectionHeader>
        <CaseContextGrid
          items={[
            {
              src: "/assets/mrshrimp/context/01.png",
              alt: "Приложение MrShrimp на телефоне",
            },
            {
              src: "/assets/mrshrimp/context/02.png",
              alt: "Телефон с приложением MrShrimp",
            },
            {
              type: "video",
              src: "https://res.cloudinary.com/dk0kxiahf/video/upload/v1769074258/manki_shoulder_lift_cyjlrl.mp4",
              alt: "Персонаж выполняет упражнение",
            },
          ]}
        />
      </section>

      <section className="shrimp-story-section shrimp-task">
        <CaseSectionHeader label="Задача">
          Запустить MVP и проверить, впишутся ли короткие разминки в рабочий день
        </CaseSectionHeader>
        <CaseTaskVisual
          src="/assets/mrshrimp/task/visual.png"
          alt="Ключевые экраны MVP приложения MrShrimp"
        />
      </section>

      <ProcessSlider />

      <SolutionSlider />

      <ResultSection />
    </CasePageShell>
  );
}
