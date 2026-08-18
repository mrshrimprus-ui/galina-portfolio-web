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
import CaseVideoPreview from "../components/CaseVideoPreview";
import CaseArtifactLink from "../components/CaseArtifactLink";
import CaseStoreButtons from "../components/CaseStoreButtons";

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
    label: "Гипотезы",
    title: "Фокус первого релиза",
    description:
      "Снизить барьер к разминкам: помочь человеку легче начать, завершить разминку и захотеть вернуться снова.",
    card:
      "На основе глубинных интервью сформулировала гипотезы для первого релиза и определила, по каким метрикам буду их проверять.",
    tags: ["Гипотезы", "Метрики", "Критерии успеха"],
    visual: "hypotheses",
  },
  {
    label: "Проектирование",
    title: "Персонажи-тренеры",
    description:
      "Меньше фитнеса и давления, больше юмора, разнообразия и персонализации.",
    card:
      "На основе исследования сформировала концепцию персонажей-тренеров: они должны были сделать разминки менее «спортивными», добавить эмоциональности и разнообразия. Разработала UI-kit, ключевые сценарии и corner cases.",
    tags: ["Концепция", "UI-kit", "Сценарии"],
    visual: "design",
  },
  {
    label: "Юзабилити-тестирование",
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
      "Собрала приложение во FlutterFlow и проверяла решения сразу в работающем продукте, а не только в макетах.",
    card:
      "Собрала приложение во FlutterFlow: реализовала основные сценарии, состояния и бизнес-логику, подключила Firebase, аналитику, авторизацию и уведомления. Подготовила сборки для iOS и Android.",
    tags: ["FlutterFlow", "Firebase", "GA4", "iOS · Android"],
    visual: "development",
  },
  {
    label: "Количественное тестирование",
    title: "Улучшила активацию",
    description:
      "После доработки продукта больше пользователей доходили до первой завершённой разминки.",
    card:
      "Сравнила активацию раннего MVP и версии после доработки. Активация — завершение первой разминки.",
    tags: ["Количественное исследование", "Активация"],
    visual: "quantitative-testing",
  },
  {
    label: "Релиз",
    title: "Продукт стал доступен пользователям",
    description: "Релизная версия работает на iOS и Android.",
    card:
      "Подготовила релизные сборки и страницы в сторах, организовала внешнее тестирование и прошла модерацию. Выпустила приложение в App Store и Google Play.",
    tags: ["TestFlight", "Google Play", "App Store"],
    visual: "release",
  },
  {
    label: "Аналитика",
    title: "Собираю аналитику",
    description:
      "От событий в приложении и выгрузки из BigQuery до собственного дашборда с ключевыми метриками.",
    card:
      "Настроила продуктовые события в GA4, выгрузку данных через BigQuery и собрала аналитический дашборд. Отслеживаю активацию, использование, retention и поведение внутри разминок.",
    tags: ["GA4", "BigQuery", "Codex", "Firebase"],
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
        initial={false}
        animate={{ scale: 1 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          className="solution-visual__background"
          src={`/assets/mrshrimp/solution/mrshrimp-solution-${number}-bg.webp`}
          alt=""
          draggable={false}
          loading="lazy"
        />
      </motion.div>

      <motion.div
        className="solution-visual__picture-reveal"
        initial={false}
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
            src={`/assets/mrshrimp/solution/mrshrimp-solution-${number}-pic.webp`}
            alt=""
            draggable={false}
          loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
}


function MobileSolutionSlider() {
  return (
    <div
      className="shrimp-solution-mobile"
      aria-label="Ключевые решения приложения"
      aria-roledescription="carousel"
    >
      <div className="shrimp-solution-mobile-track">
        {solutionSlides.map((slide, index) => (
          <article
            className="shrimp-solution-mobile-slide"
            key={slide.visual}
          >
            <div className="shrimp-solution-mobile-card">
              <SolutionVisual visual={slide.visual} />
            </div>

            <div className="shrimp-solution-mobile-copy">
              <p className="shrimp-solution-mobile-index type-caption-small">
                {index + 1} / {solutionSlides.length}
              </p>

              <h3 className="type-text-l">
                {slide.title}
              </h3>

              <p className="type-caption-regular">
                {slide.description}
              </p>
            </div>
          </article>
        ))}
      </div>
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

          <p className="type-caption">Начать → Размяться → Увидеть результат → Вернуться</p>
        </div>
      </div>

      <div className="shrimp-solution-desktop-slider">
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
      </div>

      <MobileSolutionSlider />
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

const releaseHypotheses = [
  {
    title: "H1 · Легко начать",
    barrier: "Барьер из интервью: сложно прерваться во время работы и переключиться на разминку.",
    hypothesis: "Гипотеза: если сократить путь до разминки до одного основного действия, то не менее 30% новых пользователей начнут первую разминку.",
    check: "Проверка: доля первых стартов. Критерий — ≥30%.",
  },
  {
    title: "H2 · Короткий формат",
    barrier: "Барьер из интервью: на тренировку сложно выделить отдельное время в течение рабочего дня.",
    hypothesis: "Гипотеза: если разминка занимает несколько минут, то не менее 55% запущенных разминок будут завершаться.",
    check: "Проверка: completion rate. Критерий — ≥55%.",
  },
  {
    title: "H3 · Без ощущения фитнеса",
    barrier: "Барьер из интервью: спорт может восприниматься как дисциплина и ещё одна обязанность.",
    hypothesis: "Гипотеза: если упражнения ведут персонажи, а подача остаётся лёгкой и с юмором, продукт будет меньше ассоциироваться с фитнесом и обязательной тренировкой.",
    check: "Проверка: качественная обратная связь на пользовательских тестах.",
  },
  {
    title: "H4 · Персонализация",
    barrier: "Барьер из интервью: у пользователей разные предпочтения к формату разминки, и один сценарий подходит не всем.",
    hypothesis: "Гипотеза: если дать пользователю возможность настраивать разминку под себя, то не менее 50% пользователей с повторными запусками будут использовать разные варианты хотя бы одного параметра — тренера, формата, длительности или музыки.",
    check: "Проверка: доля пользователей с 2+ запусками, которые использовали больше одного варианта хотя бы одного параметра. Критерий — ≥50%.",
  },
  {
    title: "H5 · Видимый прогресс",
    barrier: "Барьер из интервью: эффект коротких разминок сложно заметить после одного занятия.",
    hypothesis: "Гипотеза: если показывать прогресс через дни в движении, серии и достижения, пользователи будут возвращаться к разминкам в разные дни.",
    check: "Проверка: длина серии активных дней. Критерий — медиана >4 дней.",
  },
] as const;

function HypothesesModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = closeRef.current;
    if (!button) return;

    const move = (event: PointerEvent) => {
      const rect = button.getBoundingClientRect();

      const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;

      button.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
    };

    const reset = () => {
      button.style.transform = "";
    };

    button.addEventListener("pointermove", move);
    button.addEventListener("pointerleave", reset);

    return () => {
      button.removeEventListener("pointermove", move);
      button.removeEventListener("pointerleave", reset);
    };
  }, []);
  useEffect(() => {
    const closeByEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeByEscape);
    return () => window.removeEventListener("keydown", closeByEscape);
  }, [onClose]);

  return (
    <div
      className="process-hypotheses-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Гипотезы первого релиза"
      data-lenis-prevent
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        ref={closeRef}
        className="process-hypotheses-modal__close"
        data-cursor="close"
        type="button"
        aria-label="Закрыть гипотезы"
        onClick={onClose}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <span aria-hidden="true" />
      </button>
      <div className="process-hypotheses-modal__scroll" data-lenis-prevent>
        <div className="process-hypotheses-modal__content">
          <h3>Гипотезы первого релиза</h3>
          <p className="process-hypotheses-modal__intro">
            На основе барьеров из глубинных интервью сформулировала гипотезы и определила критерии их проверки.
          </p>
          <div className="process-hypotheses-modal__list">
            {releaseHypotheses.map((item) => (
              <article key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.barrier}</p>
                <p>{item.hypothesis}</p>
                <p>{item.check}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = closeRef.current;
    if (!button) return;

    const move = (event: PointerEvent) => {
      const rect = button.getBoundingClientRect();

      const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;

      button.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
    };

    const reset = () => {
      button.style.transform = "";
    };

    button.addEventListener("pointermove", move);
    button.addEventListener("pointerleave", reset);

    return () => {
      button.removeEventListener("pointermove", move);
      button.removeEventListener("pointerleave", reset);
    };
  }, []);

  useEffect(() => {
    const closeByEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeByEscape);
    return () => window.removeEventListener("keydown", closeByEscape);
  }, [onClose]);

  return (
    <div
      className="process-hypotheses-modal process-analytics-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Аналитика по гипотезам"
      data-lenis-prevent
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        ref={closeRef}
        className="process-hypotheses-modal__close"
        data-cursor="close"
        type="button"
        aria-label="Закрыть аналитику"
        onClick={onClose}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <span aria-hidden="true" />
      </button>

      <div className="process-hypotheses-modal__scroll" data-lenis-prevent>
        <div className="process-hypotheses-modal__content">
          <h3>Аналитика по гипотезам</h3>
          <p className="process-hypotheses-modal__intro">
            После релиза я сравнила первые данные использования приложения с критериями, которые заложила в продуктовые гипотезы.
          </p>
          <p className="process-analytics-modal__note">
            <strong>Данные за 1 июня — 8 августа 2026.</strong> За этот период приложение увидел 81 новый пользователь. Выборка пока небольшая, поэтому результаты рассматриваю как первые сигналы для дальнейшего исследования, а не как подтверждение или опровержение гипотез.
          </p>

          <div className="process-hypotheses-modal__list process-analytics-modal__list">
            <article><h4>H1 · Легко начать</h4><p><strong>Критерий:</strong> ≥30% новых пользователей начнут первую разминку.</p><p><strong>Сейчас: 32% · 26 из 81</strong></p><p><strong>Вывод:</strong> значение немного выше заданного порога, но до первой разминки всё ещё не доходит большинство новых пользователей. Сам сценарий старта требует дополнительного исследования: проблема может быть как в качестве трафика, так и в барьерах до первой разминки.</p></article>
            <article><h4>H2 · Короткий формат</h4><p><strong>Критерий:</strong> ≥55% запущенных разминок будут завершены.</p><p><strong>Сейчас: 68% · 146 из 215</strong></p><p><strong>Вывод:</strong> после старта большинство пользователей доходят до конца. Короткий формат не выглядит выраженным барьером для завершения, хотя около трети запусков всё ещё прерываются.</p></article>
            <article><h4>H3 · Без ощущения фитнеса</h4><p><strong>Критерий:</strong> пользователи воспринимают продукт как лёгкий перерыв, а не как обязательную тренировку.</p><p><strong>Сейчас:</strong> после релиза отдельно не исследовала.</p><p><strong>Вывод:</strong> продуктовых событий недостаточно для проверки восприятия. Для этой гипотезы нужна качественная проверка — интервью или пользовательские тесты.</p></article>
            <article><h4>H4 · Персонализация</h4><p><strong>Критерий:</strong> ≥50% пользователей с повторными запусками используют больше одного варианта хотя бы одного параметра — тренера, формата, длительности или музыки.</p><p><strong>Сейчас: 80% · 16 из 20</strong></p><p className="process-analytics-modal__breakdown">Тренеры — <strong>75%</strong><br />Формат — <strong>25%</strong><br />Длительность — <strong>25%</strong><br />Музыка — <strong>10%</strong></p><p><strong>Вывод:</strong> персонализация используется неравномерно. Наиболее востребован выбор тренера; формат и длительность меняют значительно реже, музыку — почти не меняют. Это может быть сигналом, что разные настройки имеют для пользователей разную ценность.</p></article>
            <article><h4>H5 · Видимый прогресс</h4><p><strong>Критерий:</strong> медианная серия активных дней &gt;4.</p><p><strong>Сейчас:</strong> медианное количество активных дней — <strong>2</strong>, D7 retention — <strong>17% · 3 из 18</strong>.</p><p><strong>Вывод:</strong> текущие данные показывают слабую регулярность и возвращаемость. При этом пока нельзя связать это именно с механикой прогресса — для оценки её влияния нужна отдельная проверка.</p></article>
          </div>
        </div>
      </div>
    </div>
  );
}

function HypothesesVisual({ onOpen }: { onOpen: () => void }) {

  return (
    <div className="process-visual process-visual--hypotheses">
      <button
        className="process-hypotheses-sheet"
        type="button"
        data-cursor="video"
        aria-label="Посмотреть гипотезы первого релиза"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          onOpen();
        }}
      >
        <span className="process-hypotheses-sheet__content">
          <strong>Гипотезы первого релиза</strong>
          <span>H1 — Старт</span>
          <span>H2 — Короткий формат</span>
          <span>H3 — Повторное использование</span>
          <span>H4 — Прогресс</span>
        </span>
      </button>

    </div>
  );
}

function ProcessVisual({ visual, onOpenHypotheses }: { visual: (typeof processStages)[number]["visual"]; onOpenHypotheses: () => void }) {
  if (visual === "research") {
    return (
      <div className="process-visual process-visual--research" aria-hidden="true">
        <img src="/assets/mrshrimp/process/research-back.png" alt="" />
        <img src="/assets/mrshrimp/process/research-front.png" alt="" />
      </div>
    );
  }

  if (visual === "hypotheses") {
    return <HypothesesVisual onOpen={onOpenHypotheses} />;
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
            src="https://res.cloudinary.com/dk0kxiahf/video/upload/f_mp4,vc_h264,q_auto/v1786387052/exercose_1_aosgeu.mp4"
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

  if (visual === "quantitative-testing") {
    return (
      <div className="process-visual process-visual--quantitative-testing">
        <div className="quantitative-timeline">
          <div className="quantitative-timeline__line" aria-hidden="true" />

          <section className="quantitative-timeline__stage quantitative-timeline__stage--first">
            <i className="quantitative-timeline__dot" aria-hidden="true" />
            <span className="quantitative-timeline__icon" aria-hidden="true">▶</span>
            <div className="quantitative-timeline__body">
              <span className="quantitative-timeline__label">Первая волна: ранний MVP</span>
              <span className="quantitative-timeline__sample">100+ пользователей</span>
              <strong>26,6%</strong>
              <span className="quantitative-timeline__result">завершили первую разминку</span>
            </div>
          </section>

          <section className="quantitative-timeline__change">
            <i className="quantitative-timeline__dot" aria-hidden="true" />
            <span className="quantitative-timeline__icon" aria-hidden="true">↻</span>
            <div className="quantitative-timeline__body">
              <span className="quantitative-timeline__label">Доработка продукта после юзабилити-тестирования</span>
              <p>
                Добавила озвучку с инструкцией и короткой пользой от упражнения,
                фоновую музыку и доработала персонализацию разминки.
              </p>
            </div>
          </section>

          <section className="quantitative-timeline__stage quantitative-timeline__stage--second">
            <i className="quantitative-timeline__dot" aria-hidden="true" />
            <span className="quantitative-timeline__icon" aria-hidden="true">✓</span>
            <div className="quantitative-timeline__body">
              <span className="quantitative-timeline__label">Вторая волна: версия после разработки</span>
              <span className="quantitative-timeline__sample">100+ пользователей</span>
              <div className="quantitative-timeline__metric-row">
                <strong>43,1%</strong>
                <span className="quantitative-test-card__delta">+16,5 п.п.</span>
              </div>
              <span className="quantitative-timeline__result">завершили первую разминку</span>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (visual === "development") {
    return (
      <div className="process-visual process-visual--development" aria-hidden="true">
        <img src="/assets/mrshrimp/process/development-a.png" alt="" />
        <img src="/assets/mrshrimp/process/development-b.webp" alt="" loading="lazy" />
      </div>
    );
  }

  if (visual === "release") {
    return (
      <div className="process-visual process-visual--release">
        <img
          src="/assets/mrshrimp/process/release-device.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className="mrshrimp-process-video-center">
      <CaseVideoPreview
        src="https://res.cloudinary.com/dk0kxiahf/video/upload/v1786381021/mrshrimp-analitics_sahiem.mov"
        title="Аналитика MrShrimp"
      />
    </div>
  );
}

function ProcessStageAction({
  visual,
  onOpenHypotheses,
  onOpenAnalytics,
}: {
  visual: (typeof processStages)[number]["visual"];
  onOpenHypotheses: () => void;
  onOpenAnalytics: () => void;
}) {
  if (visual === "research") {
    return (
      <CaseArtifactLink href="https://s.craft.me/cNWvHkIlDkF2UD">
        Подробнее об исследовании
      </CaseArtifactLink>
    );
  }

  if (visual === "hypotheses") {
    return (
      <CaseArtifactLink onClick={onOpenHypotheses}>
        Ознакомиться с гипотезами
      </CaseArtifactLink>
    );
  }

  if (visual === "design") {
    return (
      <CaseArtifactLink href="https://www.figma.com/design/K1j2v48cZIXz1S4hHzCNRt/%F0%9F%A6%90--%D0%97%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D1%8C%D0%B5-%D1%81%D0%BF%D0%B8%D0%BD%D1%8B-%D0%B8-%D1%88%D0%B5%D0%B8-c-%D0%B2%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%82%D0%B0%D0%BC%D0%B8?node-id=71-1659">
        Посмотреть макеты
      </CaseArtifactLink>
    );
  }

  if (visual === "testing") {
    return (
      <CaseArtifactLink href="https://www.figma.com/design/K1j2v48cZIXz1S4hHzCNRt/%F0%9F%A6%90--%D0%97%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D1%8C%D0%B5-%D1%81%D0%BF%D0%B8%D0%BD%D1%8B-%D0%B8-%D1%88%D0%B5%D0%B8-c-%D0%B2%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%82%D0%B0%D0%BC%D0%B8?node-id=71-1660">
        Подробнее о тестировании
      </CaseArtifactLink>
    );
  }

  if (visual === "release") {
    return (
      <div className="shrimp-process-store-actions">
        <CaseArtifactLink href="https://apps.apple.com/app/id6765711973">
          App Store
        </CaseArtifactLink>
        <CaseArtifactLink href="https://play.google.com/store/apps/details?id=com.mycompany.mrshrimp">
          Google Play
        </CaseArtifactLink>
      </div>
    );
  }

  if (visual === "analytics") {
    return (
      <CaseArtifactLink onClick={onOpenAnalytics}>
        Посмотреть выводы по гипотезам
      </CaseArtifactLink>
    );
  }

  return null;
}


const highlightSlides = [
  {
    label: "Главный экран",
    image: "/assets/mrshrimp/highlights/main.webp",
    alt: "Три итерации главного экрана MrShrimp",
    description:
      "После интервью собрала экран вокруг быстрого старта. На UX-тестах стало понятно, что настройка важна, а выбор тренера считывается неочевидно — поэтому вынесла настройку в MVP и пересобрала главный экран.",
  },
  {
    label: "Политика",
    image: "/assets/mrshrimp/highlights/policy.webp",
    alt: "Итерации экрана согласия перед первой разминкой",
    description:
      "Хотела сделать обязательный экран менее формальным и добавила видео. На тестах оно создавало лишнюю неопределённость, поэтому убрала его и оставила один понятный сценарий.",
  },
  {
    label: "Дни в движении",
    image: "/assets/mrshrimp/highlights/streak.webp",
    alt: "Итерации механики Дни в движении",
    description:
      "Сначала сделала мягкий стрик с допустимым перерывом в неделю. На тестах такой прогресс не воспринимался как достижение — сократила перерыв до 2 дней и добавила цели на 21/40/60 дней.",
  },
  {
    label: "Статистика",
    image: "/assets/mrshrimp/highlights/stats.webp",
    alt: "Итерации статистики и уровней",
    description:
      "Статистика и награды сначала были разделены по нескольким экранам. Объединила прогресс в одном месте, чтобы текущий и следующий уровень были видны сразу.",
  },
] as const;

function HighlightsSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const highlightsVisualRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updatePill = () => {
      const tabs = tabsRef.current;
      const button = tabs?.children[activeSlide + 1] as HTMLElement | undefined;

      if (!tabs || !button) return;

      setPillStyle({
        left: button.offsetLeft,
        width: button.offsetWidth,
      });

      if (window.matchMedia("(max-width: 900px)").matches) {
        const safeEdge = 16;
        const tabLeft = button.offsetLeft;
        const tabRight = tabLeft + button.offsetWidth;
        const visibleLeft = tabs.scrollLeft + safeEdge;
        const visibleRight =
          tabs.scrollLeft + tabs.clientWidth - safeEdge;

        if (tabLeft < visibleLeft) {
          tabs.scrollTo({
            left: Math.max(0, tabLeft - safeEdge),
            behavior: "smooth",
          });
        } else if (tabRight > visibleRight) {
          tabs.scrollTo({
            left: tabRight - tabs.clientWidth + safeEdge,
            behavior: "smooth",
          });
        }
      }
    };

    const frame = requestAnimationFrame(updatePill);

    window.addEventListener("resize", updatePill);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePill);
    };
  }, [activeSlide]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      highlightsVisualRef.current?.scrollTo({
        left: 0,
        behavior: "auto",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [activeSlide]);

  const slide = highlightSlides[activeSlide];
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  const move = (direction: number) => {
    setActiveSlide(
      (current) =>
        (current + direction + highlightSlides.length) %
        highlightSlides.length,
    );
  };

  return (
    <section className="shrimp-story-section shrimp-highlights">
      <CaseSectionHeader label="Хайлайты">
        От первых гипотез к MVP — через интервью, UX-тесты и пересмотр приоритетов
      </CaseSectionHeader>

      <div
        className="shrimp-highlights-slider"
        role="region"
        aria-roledescription="карусель"
        aria-label="Хайлайты проекта"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
      >
        <div className="shrimp-highlights-tabs" ref={tabsRef}>
          <div
            className="shrimp-highlights-tabs__pill"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
            }}
          />

          {highlightSlides.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={index === activeSlide ? "is-active" : ""}
              data-cursor="link"
              onPointerEnter={() => setActiveSlide(index)}
              onFocus={() => setActiveSlide(index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          ref={highlightsVisualRef}
          className="shrimp-highlights-visual"
          data-cursor="carousel-right"
          onPointerMove={(event) => {
            if (window.matchMedia("(max-width: 900px)").matches) return;

            const rect = event.currentTarget.getBoundingClientRect();

            event.currentTarget.dataset.cursor =
              event.clientX < rect.left + rect.width / 2
                ? "carousel-left"
                : "carousel-right";
          }}
          onClick={(event) => {
            if (window.matchMedia("(max-width: 900px)").matches) return;

            const rect = event.currentTarget.getBoundingClientRect();

            move(
              event.clientX < rect.left + rect.width / 2
                ? -1
                : 1
            );
          }}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            swipeStartRef.current = {
              x: touch.clientX,
              y: touch.clientY,
            };
          }}
          onTouchEnd={(event) => {
            const start = swipeStartRef.current;
            swipeStartRef.current = null;
            if (!start) return;

            if (
              event.currentTarget.scrollWidth >
              event.currentTarget.clientWidth + 1
            ) {
              return;
            }

            const touch = event.changedTouches[0];
            const deltaX = touch.clientX - start.x;
            const deltaY = touch.clientY - start.y;

            if (
              Math.abs(deltaX) > Math.abs(deltaY) * 1.2 &&
              Math.abs(deltaX) >= 48
            ) {
              move(deltaX < 0 ? 1 : -1);
            }
          }}
          onTouchCancel={() => {
            swipeStartRef.current = null;
          }}
        >
          <div className="shrimp-highlights-visual__track">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                onLoad={() => {
                  const visual = highlightsVisualRef.current;
                  if (!visual) return;

                  visual.scrollLeft = 0;
                  requestAnimationFrame(() => {
                    visual.scrollLeft = 0;
                  });
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="shrimp-highlights-bottom">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={slide.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {slide.description}
            </motion.p>
          </AnimatePresence>

        </div>



      </div>
    </section>
  );
}


function ProcessSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [hypothesesOpen, setHypothesesOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const stage = processStages[activeStage];
  const processSwipeStartRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let frame = 0;
    let current = 0;

    const renderParallax = () => {
      const rect = slider.getBoundingClientRect();
      const target = Math.max(
        -38,
        Math.min(38, (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.085),
      );
      current += (target - current) * 0.11;

      const activeLayer = slider.querySelector<HTMLElement>(
        '.shrimp-process-visual-layer[aria-hidden="false"]',
      );
      activeLayer
        ?.querySelector<HTMLElement>(".process-visual")
        ?.style.setProperty(
          "translate",
          `0 ${current.toFixed(2)}px`,
          "important",
        );

      slider
        .querySelector<HTMLElement>(".shrimp-process-result")
        ?.style.setProperty(
          "translate",
          `0 ${(-current * 0.35).toFixed(2)}px`,
          "important",
        );

      frame = requestAnimationFrame(renderParallax);
    };

    frame = requestAnimationFrame(renderParallax);
    return () => cancelAnimationFrame(frame);
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

  const openAnalytics = () => {
    setAnalyticsOpen(true);
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
        ref={sliderRef}
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
          if (
            event.currentTarget.querySelector(
              ".process-hypotheses-modal",
            )
          ) return;
          if (window.matchMedia("(max-width: 1200px)").matches) return;
          if (
            (event.target as HTMLElement).closest(
              "button, a, .shrimp-process-result, .shrimp-process-mobile-detail",
            )
          ) return;
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.dataset.cursor =
            event.clientX < rect.left + rect.width / 2 ? "carousel-left" : "carousel-right";
        }}
        onClick={(event) => {
          if (
            event.currentTarget.querySelector(
              ".process-hypotheses-modal",
            )
          ) return;
          if (window.matchMedia("(max-width: 1200px)").matches) return;
          if (
            (event.target as HTMLElement).closest(
              "button, a, .shrimp-process-result, .shrimp-process-mobile-detail",
            )
          ) return;
          const rect = event.currentTarget.getBoundingClientRect();
          move(event.clientX < rect.left + rect.width / 2 ? -1 : 1);
        }}
      >
        <div
          className={`shrimp-process-scene shrimp-process-scene--${stage.visual}`}
        >
          <div
            className="shrimp-process-visual-stack"
            onTouchStart={(event) => {
              if (
                !window.matchMedia(
                  "(max-width: 1200px)",
                ).matches
              ) {
                return;
              }

              const touch = event.touches[0];

              processSwipeStartRef.current = {
                x: touch.clientX,
                y: touch.clientY,
              };
            }}
            onTouchEnd={(event) => {
              const start =
                processSwipeStartRef.current;

              processSwipeStartRef.current = null;

              if (!start) return;

              const touch =
                event.changedTouches[0];

              const deltaX =
                touch.clientX - start.x;
              const deltaY =
                touch.clientY - start.y;

              const isHorizontal =
                Math.abs(deltaX) >
                Math.abs(deltaY) * 1.2;

              const passedThreshold =
                Math.abs(deltaX) >= 48;

              if (
                isHorizontal &&
                passedThreshold
              ) {
                move(deltaX < 0 ? 1 : -1);
              }
            }}
            onTouchCancel={() => {
              processSwipeStartRef.current = null;
            }}
          >
            {processStages.map((item, index) => {
              const isActive = index === activeStage;

              return (
                <motion.div
                  className="shrimp-process-visual-layer"
                  key={item.visual}
                  aria-hidden={!isActive}
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
                    pointerEvents:
                      isActive &&
                      (item.visual === "analytics" ||
                        item.visual === "hypotheses" ||
                        item.visual === "quantitative-testing")
                        ? "auto"
                        : "none",
                  }}
                >
                  <ProcessVisual
                    visual={item.visual}
                    onOpenHypotheses={() => setHypothesesOpen(true)}
                  />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="shrimp-process-result"
            data-cursor=""
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

            <p className="type-caption-regular">{stage.description}</p>

            <div className="shrimp-process-action shrimp-process-action--desktop">
              <ProcessStageAction
                visual={stage.visual}
                onOpenHypotheses={() => setHypothesesOpen(true)}
                onOpenAnalytics={openAnalytics}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="shrimp-process-mobile-detail"
          data-cursor=""
          key={`mobile-detail-${stage.label}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        >
          <p className="type-caption-small">
            {stage.card}
          </p>

          <div className="shrimp-process-action shrimp-process-action--mobile">
            <ProcessStageAction
              visual={stage.visual}
              onOpenHypotheses={() => setHypothesesOpen(true)}
              onOpenAnalytics={openAnalytics}
            />
          </div>

          <div className="shrimp-process-tags shrimp-process-title-tags">
            {stage.tags.map((tag) => (
              <span
                key={tag}
                className="type-caption-regular text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

        </motion.div>

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
                onPointerEnter={() => selectStage(index)}
                onFocus={() => selectStage(index)}
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

        {hypothesesOpen && (
          <HypothesesModal onClose={() => setHypothesesOpen(false)} />
        )}

        {analyticsOpen && (
          <AnalyticsModal onClose={() => setAnalyticsOpen(false)} />
        )}

      </div>
    </section>
  );
}

function ResultSection() {
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const metrics = [
    [
      "32%",
      "26 из 81 новых пользователей начали первую разминку",
    ],
    [
      "70%",
      "14 из 20 пользователей вернулись к разминкам в другой день",
    ],
    [
      "17%",
      "3 из 18 пользователей вернулись на 7-й день после первой разминки",
    ],
  ];

  return (
    <section className="shrimp-story-section shrimp-result">
      <div className="shrimp-section-title reveal">
        <p className="type-caption type-section-label">Результат</p>
        <h2 className="type-h2">
          Проверила, как пользователи проходят разминки и возвращаются
        </h2>
      </div>

      <div className="shrimp-result-stage reveal">
        <div className="shrimp-result-primary">
          <strong className="type-title">68%</strong>
          <span className="type-caption-regular text-secondary">
            146 из 215 запущенных разминок завершены
          </span>
        </div>

        <div className="shrimp-result-phone" aria-hidden="true">
          <img
            src="/assets/mrshrimp/result/result-m.webp"
            alt=""
            className="shrimp-result-full shrimp-result-image shrimp-result-image--mobile"
          />

          <img
            src="/assets/mrshrimp/result/result-light-m.webp"
            alt=""
            className="shrimp-result-full shrimp-result-image shrimp-result-image--desktop shrimp-result-image--desktop-light"
          />

          <img
            src="/assets/mrshrimp/result/result-dark-m.webp"
            alt=""
            className="shrimp-result-full shrimp-result-image shrimp-result-image--desktop shrimp-result-image--desktop-dark"
          />
        </div>

        <div className="shrimp-result-mobile-grid">
          <div className="shrimp-result-mobile-metric">
            <strong>68%</strong>
            <span>146 из 215 запущенных<br />разминок завершены</span>
          </div>

          <div className="shrimp-result-mobile-metric">
            <strong>32%</strong>
            <span>26 из 81 новых пользователей<br />начали первую разминку</span>
          </div>

          <div className="shrimp-result-mobile-metric">
            <strong>70%</strong>
            <span>14 из 20 пользователей вернулись<br />к разминкам в другой день</span>
          </div>

          <div className="shrimp-result-mobile-metric">
            <strong>17%</strong>
            <span>3 из 18 пользователей вернулись<br />на 7-й день после первой разминки</span>
          </div>
        </div>

        <div className="shrimp-result-details">
          <div className="shrimp-result-metrics">
            {metrics.map(([value, description]) => (
              <div className="shrimp-result-metric" key={value}>
                <strong className="type-h2">{value}</strong>
                <p className="type-caption-regular">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="shrimp-result-note type-caption-regular">
          Данные за 1 июня — 8 августа 2026: 81 новый пользователь, 215 запусков
          разминок.<br />Выборка небольшая — воспринимаю результаты как первые сигналы.
        </p>
      </div>

      <div className="shrimp-result-conclusion reveal">
        <article>
          <svg className="shrimp-result-conclusion__icon" viewBox="0 0 32 32" aria-hidden="true"><circle cx="11" cy="10" r="4" /><path d="M4.5 24c.8-4.4 3-6.5 6.5-6.5s5.7 2.1 6.5 6.5M19 12h8m-3-3 3 3-3 3" /></svg>
          <h3>Привлечение и первый старт — основная проблема</h3>
          <p>За два месяца пришёл 81 новый пользователь, но только 32% дошли до первой разминки. Пока непонятно, проблема в качестве трафика или сценарии старта.</p>
        </article>
        <article>
          <svg className="shrimp-result-conclusion__icon" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11" /><path d="m10.5 16 3.7 3.7 7.7-8" /></svg>
          <h3>Начатую разминку чаще заканчивают</h3>
          <p>68% запусков доходят до завершения. Значит, сам формат разминки выглядит менее проблемным, чем переход от первого знакомства с продуктом к началу занятия.</p>
        </article>
        <article>
          <svg className="shrimp-result-conclusion__icon" viewBox="0 0 32 32" aria-hidden="true"><path d="M25 12a10 10 0 1 0 .2 7M25 6v6h-6" /><path d="M16 10v6l4 2.5" /></svg>
          <h3>Устойчивой регулярности пока нет</h3>
          <p>Пользователи возвращаются к разминкам, но медианное количество активных дней — 2. На текущей выборке пока нельзя говорить об устойчивом регулярном использовании.</p>
        </article>

        <div className="shrimp-result-conclusion__action">
          <CaseArtifactLink
            onClick={() => setAnalyticsOpen(true)}
          >
            Посмотреть выводы по гипотезам
          </CaseArtifactLink>
        </div>

        {analyticsOpen && (
          <AnalyticsModal onClose={() => setAnalyticsOpen(false)} />
        )}
      </div>

      <p className="shrimp-result-final-note reveal">
        Прошла полный цикл от исследования и дизайна до разработки, релиза и
        аналитики. AI использовала и как рабочий инструмент, и как партнёра для обсуждения продуктовых
        решений, гипотез и анализа данных. С его помощью смогла закрыть задачи за пределами основной экспертизы:
        разработку, контент, вёрстку сайта и дашборда.
      </p>
    </section>
  );
}

export default function MrShrimpCase() {
  return (
    <CasePageShell
      className="shrimp-case mrshrimp-case"
      beforeNextProject={
        <CaseStoreButtons
          appStoreUrl="https://apps.apple.com/app/id6765711973"
          googlePlayUrl="https://play.google.com/store/apps/details?id=com.mycompany.mrshrimp"
          reveal={false}
        />
      }
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
          actions={
            <CaseStoreButtons
              appStoreUrl="https://apps.apple.com/app/id6765711973"
              googlePlayUrl="https://play.google.com/store/apps/details?id=com.mycompany.mrshrimp"
            />
          }
          visual={
            <CaseProjectVisual
              variant="mrshrimp"
              image="/assets/mrshrimp/hero/main-clean.webp"
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
              src: "/assets/mrshrimp/context/01-normalized.webp",
              alt: "Приложение MrShrimp на телефоне",
            },
            {
              src: "/assets/mrshrimp/context/02-normalized.webp",
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
          src="/assets/mrshrimp/task/visual.webp"
          alt="Ключевые экраны MVP приложения MrShrimp"
        />
      </section>

      <ProcessSlider />

      <HighlightsSlider />

      <SolutionSlider />

      <ResultSection />
    </CasePageShell>
  );
}
