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
    title: "Что мешает разминаться",
    description: (
      <span className="research-barriers-list">
        <span>Трудно вспомнить о себе</span>
        <span>Лень и усталость</span>
        <span>Сложно выбрать, что делать</span>
        <span>Однообразие упражнений</span>
      </span>
    ),
    card:
      "Провела 6 глубинных интервью, чтобы понять, при каких условиях разминки могут встроиться в повседневный день, а что этому мешает. По различиям в мотивации и поведении выделила 2 поведенческие персоны.",
    tags: ["Интервью", "Персоны", "CJM", "User Flow"],
    visual: "research",
  },
  {
    label: "Гипотезы",
    title: "Фокус первого релиза",
    description:
      "Снизить барьер к разминкам: помочь человеку легче начать, завершить разминку и захотеть вернуться снова.",
    card:
      "Сопоставила выводы интервью с анализом конкурентов и собрала основной сценарий продукта. Решения сформулировала как гипотезы и привязала к метрикам.",
    tags: ["Конкуренты", "CJM", "User Flow", "Метрики"],
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
    tags: ["FlutterFlow", "Firebase", "GA4", "Mobile App"],
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
    title: "Снизила барьер до первой разминки",
    description:
      "Убрала обязательную регистрацию и онбординг — пользователь может начать в один тап.",
    visual: "start",
    background:
      "/assets/mrshrimp/solution/mrshrimp-solution-01-bg.webp",
    picture:
      "/assets/mrshrimp/solution/mrshrimp-solution-01-pic.webp",
  },
  {
    title: "Подстроила разминку под ситуацию",
    description:
      "Можно начать сразу или выбрать длительность, формат и тренера под своё время и настроение.",
    visual: "setup",
    background:
      "/assets/mrshrimp/solution/mrshrimp-solution-02-bg.webp",
    picture:
      "/assets/mrshrimp/solution/mrshrimp-solution-02-pic.webp",
  },
  {
    title: "Разнообразила повторные запуски",
    description:
      "Каждый раз приложение собирает новый комплекс из библиотеки упражнений, чтобы разминки меньше повторялись.",
    visual: "workout",
    background:
      "/assets/mrshrimp/solution/mrshrimp-solution-03-bg.webp",
    picture:
      "/assets/mrshrimp/solution/mrshrimp-solution-03-pic.webp",
  },
  {
    title: "Закрепила ощущение результата",
    description:
      "После разминки пользователь получает похвалу, видит прогресс и открывает награды — завершённое действие становится заметным.",
    visual: "result",
    background:
      "/assets/mrshrimp/solution/mrshrimp-solution-04-bg.webp",
    picture:
      "/assets/mrshrimp/solution/mrshrimp-solution-04-pic.webp",
  },
  {
    title: "Перевела разминки в регулярность",
    description:
      "Дни в движении, календарь, уровни и челленджи показывают накопленный прогресс и создают повод возвращаться.",
    visual: "progress",
    background:
      "/assets/mrshrimp/solution/mrshrimp-solution-05-bg.webp",
    picture:
      "/assets/mrshrimp/solution/mrshrimp-solution-05-pic.webp",
  },
] as const;

function SolutionVisual({
  visual,
  mobile = false,
}: {
  visual: (typeof solutionSlides)[number]["visual"];
  mobile?: boolean;
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
  const mobileSuffix = mobile ? "-mobile" : "";

  const pictureSrc =
    visual === "progress"
      ? `/assets/mrshrimp/solution/mrshrimp-solution-05-progress${mobileSuffix}.webp`
      : `/assets/mrshrimp/solution/mrshrimp-solution-${number}-pic${mobileSuffix}.webp`;
  return (
    <div
      className={`solution-visual solution-visual--asset solution-visual--${visual}`}
      aria-hidden="true"
    >
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
          src={`/assets/mrshrimp/solution/mrshrimp-solution-${number}-bg${mobileSuffix}.webp`}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
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
            src={pictureSrc}
            alt=""
            draggable={false}
            loading="lazy"
            decoding="async"
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
              <SolutionVisual
                visual={slide.visual}
                mobile
              />
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
  useEffect(() => {
    const mobileSuffix = window.matchMedia("(max-width: 820px)").matches
      ? "-mobile"
      : "";
    const preloaders: HTMLImageElement[] = [];

    solutionSlides.forEach((_, index) => {
      const number = String(index + 1).padStart(2, "0");

      ["bg", "pic"].forEach((layer) => {
        const image = new Image();
        image.decoding = "async";
        const versionSuffix = "";
        image.src =
          `/assets/mrshrimp/solution/mrshrimp-solution-${number}-${layer}${mobileSuffix}${versionSuffix}.webp`;
        image.decode().catch(() => undefined);
        preloaders.push(image);
      });
    });

    return () => {
      preloaders.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  return (
    <section className="shrimp-story-section shrimp-solution">
      <div className="shrimp-section-title reveal">
        <p className="type-section-label">
          Решение
        </p>

        <h2 className="type-h2">
          Быстрая разминка{" "}
          <span className="mrshrimp-accent">без лишних усилий</span>
        </h2>
      </div>

      <div className="shrimp-solution-desktop-slider">
        <CaseSolutionSlider
          slides={solutionSlides}
          ariaLabel="Ключевые решения приложения"
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
    barrier:
      "Барьеры из интервью: усталость и лень, перегрузка опциями.",
    hypothesis:
      "Гипотеза: если убрать лишние действия перед первой разминкой и оставить один понятный старт с готовым сетом, доля новых пользователей, которые начнут первую разминку, будет не ниже 30%.",
    check:
      "Проверка: доля новых пользователей, начавших первую разминку.",
    criterion: "Критерий: ≥30%.",
  },
  {
    title: "H2 · Короткий формат",
    barrier:
      "Барьеры из интервью: экономия времени, усталость и лень.",
    hypothesis:
      "Гипотеза: если разминка занимает 2–3 минуты, доля завершённых разминок среди начатых будет не ниже 55%.",
    check: "Проверка: completion rate.",
    criterion: "Критерий: ≥55%.",
  },
  {
    title: "H3 · Разнообразие",
    barrier:
      "Барьеры из интервью: однообразие, раздражение от подачи.",
    hypothesis:
      "Гипотеза: если дать несколько тренеров и вариантов разминок, пользователи с повторными запусками будут использовать разные варианты, а не оставаться в одном сценарии.",
    check:
      "Проверка: доля пользователей с 2+ запусками, использовавших больше одного тренера или варианта разминки.",
    criterion: "Критерий: ≥50%.",
  },
  {
    title: "H4 · Видимый прогресс",
    barrier:
      "Мотиваторы из интервью: чувство контроля, маленькие победы, ритуал.",
    hypothesis:
      "Гипотеза: если после разминки показывать накопленный прогресс и серии дней в движении, пользователи будут возвращаться к разминкам в разные дни.",
    check:
      "Проверка: длина серии активных дней / повторные дни с разминкой.",
    criterion: "Критерий: медианная серия >4 дней.",
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
          
          <div className="process-hypotheses-modal__list">
            {releaseHypotheses.map((item) => (
              <article key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.barrier}</p>
                <p>{item.hypothesis}</p>
                <p>{item.check}</p>
                <p>{item.criterion}</p>
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

          <div className="process-analytics-modal__lead">
            <p>
              После релиза сравнила первые данные использования приложения
              с критериями, которые заложила в гипотезы. Данные за 1 июня —
              8 августа 2026, 81 новый пользователь. Выборка пока небольшая,
              поэтому рассматриваю результаты как первые сигналы
              для дальнейших итераций.
            </p>
          </div>

          <div className="process-hypotheses-modal__list process-analytics-modal__list">

            <article>
              <h4>H1 · Легко начать</h4>

              <p>
                Критерий: ≥30% новых пользователей начнут первую разминку.
              </p>

              <p className="process-analytics-card__result">
                Результат: <strong>32% · 26 из 81</strong>
              </p>

              <p>
                Критерий достигнут, но до первой разминки всё ещё не доходит
                большинство новых пользователей. Старт остаётся зоной
                для дальнейшего исследования.
              </p>
            </article>

            <article>
              <h4>H2 · Короткий формат</h4>

              <p>
                Критерий: ≥55% начатых разминок будут завершены.
              </p>

              <p className="process-analytics-card__result">
                Результат: <strong>68% · 146 из 215</strong>
              </p>

              <p>
                Критерий достигнут. После старта большинство пользователей
                доходят до конца, поэтому формат 2–3 минуты не выглядит
                выраженным барьером для завершения.
              </p>
            </article>

            <article>
              <h4>H3 · Разнообразие</h4>

              <p>
                Критерий: ≥50% пользователей с повторными запусками используют
                больше одного варианта хотя бы одного параметра.
              </p>

              <p className="process-analytics-card__result">
                Результат: <strong>80% · 16 из 20</strong>
              </p>

              <p>
                Критерий достигнут. Чаще всего пользователи меняют тренера;
                формат и длительность — реже, музыку почти не меняют.
                Значит, ценность разных настроек неодинакова.
              </p>
            </article>

            <article>
              <h4>H4 · Видимый прогресс</h4>

              <p>
                Критерий: медианная серия активных дней &gt;4.
              </p>

              <p className="process-analytics-card__result">
                Результат: <strong>2 активных дня · D7 — 17%</strong>
              </p>

              <p>
                Критерий не достигнут. Пользователи редко возвращаются
                в разные дни. Пока нет оснований считать прогресс и стрики
                достаточным поводом для регулярных разминок.
              </p>
            </article>

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

function ResearchPersonaPoints() {
  return (
    <div className="persona-accordion-layer">
      <button
        type="button"
        className="persona-accordion persona-accordion--one"
        aria-label="Персона 1"
      >
        <span className="persona-accordion__head">
          <span
            className="persona-accordion__emoji persona-accordion__emoji--green"
            aria-hidden="true"
          >
            🌿
          </span>
          <span>Персона 1</span>
        </span>

        <span className="persona-accordion__reveal">
          <span className="persona-accordion__inner">
            <span className="persona-accordion__title">
              Осознанный здоровист
            </span>

            <span className="persona-accordion__description">
              Контроль здоровья. «Сделать, чтобы потом не было больно»
            </span>

            <span className="persona-accordion__section">Мотиваторы</span>

            <span className="persona-accordion__list">
              <span className="persona-accordion__item persona-accordion__item--good">
                Здоровье и профилактика
              </span>
              <span className="persona-accordion__item persona-accordion__item--good">
                Чувство контроля
              </span>
              <span className="persona-accordion__item persona-accordion__item--good">
                Быстрый эффект
              </span>
              <span className="persona-accordion__item persona-accordion__item--good">
                Ритуал
              </span>
            </span>

            <span className="persona-accordion__section">Барьеры</span>

            <span className="persona-accordion__list">
              <span className="persona-accordion__item persona-accordion__item--bad">
                Экономия времени
              </span>
              <span className="persona-accordion__item persona-accordion__item--bad">
                Раздражение от давления
              </span>
              <span className="persona-accordion__item persona-accordion__item--bad">
                Однообразие
              </span>
            </span>
          </span>
        </span>
      </button>

      <button
        type="button"
        className="persona-accordion persona-accordion--two"
        aria-label="Персона 2"
      >
        <span className="persona-accordion__head">
          <span
            className="persona-accordion__emoji persona-accordion__emoji--orange"
            aria-hidden="true"
          >
            🏋️‍♂️
          </span>
          <span>Персона 2</span>
        </span>

        <span className="persona-accordion__reveal">
          <span className="persona-accordion__inner">
            <span className="persona-accordion__title">
              Поддерживающий активность
            </span>

            <span className="persona-accordion__description">
              Скорее про физическую форму, чем про здоровье. «Надо подвигаться, чтобы не расползаться»
            </span>

            <span className="persona-accordion__section">Мотиваторы</span>

            <span className="persona-accordion__list">
              <span className="persona-accordion__item persona-accordion__item--good">
                Самочувствие и энергия
              </span>
              <span className="persona-accordion__item persona-accordion__item--good">
                Не надо думать
              </span>
              <span className="persona-accordion__item persona-accordion__item--good">
                Маленькие победы
              </span>
              <span className="persona-accordion__item persona-accordion__item--good">
                Легко начать
              </span>
            </span>

            <span className="persona-accordion__section">Барьеры</span>

            <span className="persona-accordion__list">
              <span className="persona-accordion__item persona-accordion__item--bad">
                Усталость и лень
              </span>
              <span className="persona-accordion__item persona-accordion__item--bad">
                Перегрузка опциями
              </span>
              <span className="persona-accordion__item persona-accordion__item--bad">
                Раздражение от подачи
              </span>
              <span className="persona-accordion__item persona-accordion__item--bad">
                Нет быстрого эффекта
              </span>
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}

function ProcessVisual({ visual, onOpenHypotheses }: { visual: (typeof processStages)[number]["visual"]; onOpenHypotheses: () => void }) {
  if (visual === "research") {
    return (
      <div
        className="process-visual process-visual--research"
        aria-hidden="true"
      />
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
            src="/videos/trainers-shoulders-v3.mp4"
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
      <CaseArtifactLink href="https://docs.craft.do/editor/d/311076ed-1cae-cb94-285f-c1e5545e8f4f/9FA26FD7-AA16-49E7-B852-8C6A596C4AEE/b/C4BE5A4A-7CE3-43B2-B4FF-890A95D7E4B3/%F0%9F%8E%99%EF%B8%8F-%D0%93%D0%BB%D1%83%D0%B1%D0%B8%D0%BD%D0%BD%D0%BE%D0%B5-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D1%8C%D1%8E?s=KFgNNSP9mw6bYCgXBCjwrofLefhA1QC9GrvXRQpX1skJ">
        Анализ интервью
      </CaseArtifactLink>
    );
  }

  if (visual === "hypotheses") {
    return (
      <span style={{ display: "flex", gap: "8px", flexWrap: "nowrap", alignItems: "center" }}>
        <CaseArtifactLink onClick={onOpenHypotheses}>
          Гипотезы
        </CaseArtifactLink>

        <CaseArtifactLink href="https://www.figma.com/design/K1j2v48cZIXz1S4hHzCNRt/%F0%9F%A6%90--%D0%97%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D1%8B%D0%B5-%D1%81%D0%BF%D0%B8%D0%BD%D1%8B-%D0%B8-%D1%88%D0%B5%D0%B8-c-%D0%B2%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%82%D0%B0%D0%BC%D0%B8?node-id=43-228">
          Сценарии
        </CaseArtifactLink>
      </span>
    );
  }

  if (visual === "design") {
    return (
      <CaseArtifactLink href="https://www.figma.com/design/K1j2v48cZIXz1S4hHzCNRt/%F0%9F%A6%90--%D0%97%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D1%8C%D0%B5-%D1%81%D0%BF%D0%B8%D0%BD%D1%8B-%D0%B8-%D1%88%D0%B5%D0%B8-c-%D0%B2%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%82%D0%B0%D0%BC%D0%B8?node-id=71-1659">
        Макеты
      </CaseArtifactLink>
    );
  }

  if (visual === "testing") {
    return (
      <CaseArtifactLink href="https://www.figma.com/design/K1j2v48cZIXz1S4hHzCNRt/%F0%9F%A6%90--%D0%97%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D1%8C%D0%B5-%D1%81%D0%BF%D0%B8%D0%BD%D1%8B-%D0%B8-%D1%88%D0%B5%D0%B8-c-%D0%B2%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%82%D0%B0%D0%BC%D0%B8?node-id=71-1660">
        Выводы по тестированию
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
        Выводы по гипотезам
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
      "После интервью сделала быстрый старт основным сценарием. На UX-тестах стало понятно, что настройка важна, а выбор тренера считывается неочевидно — добавила настройку в MVP и пересобрала экран.",
  },
  {
    label: "Политика",
    image: "/assets/mrshrimp/highlights/policy.webp",
    alt: "Итерации экрана согласия перед первой разминкой",
    description:
      "Добавила видео, чтобы сделать обязательный экран менее формальным. На тестах оно создавало лишнюю неопределённость — убрала его и оставила один понятный сценарий.",
  },
  {
    label: "Дни в движении",
    image: "/assets/mrshrimp/highlights/stats.webp",
    alt: "Итерации механики Дни в движении",
    description:
      "Сначала допустила перерыв до недели. На тестах такой прогресс не воспринимался как достижение — сократила перерыв до 2 дней и добавила цели 21/40/60.",
  },
  {
    label: "Статистика",
    image: "/assets/mrshrimp/highlights/streak.webp",
    alt: "Итерации статистики и уровней",
    description:
      "Убрала лишний переход между статистикой и наградами — на больших телефонах до переключателя было неудобно тянуться. Объединила весь прогресс на одном экране.",
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

  const alignHighlightsVisual = () => {
    const visual = highlightsVisualRef.current;
    if (!visual) return;

    const isTablet = window.matchMedia(
      "(min-width: 821px) and (max-width: 900px)",
    ).matches;

    visual.scrollTo({
      left: isTablet
        ? Math.max(0, (visual.scrollWidth - visual.clientWidth) / 2)
        : 0,
      behavior: "auto",
    });
  };

  useEffect(() => {
    const frame = requestAnimationFrame(alignHighlightsVisual);

    return () => cancelAnimationFrame(frame);
  }, [activeSlide]);

  const slide = highlightSlides[activeSlide];
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const preloaders = highlightSlides.map((item) => {
      const image = new Image();
      image.decoding = "async";
      image.src = item.image;
      image.decode().catch(() => undefined);
      return image;
    });

    return () => {
      preloaders.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

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
        <>
          <span style={{ display: "block" }}>Что меняла после</span>
          <span style={{ display: "block" }}>
            <span className="mrshrimp-accent">интервью и тестов</span>
          </span>
        </>
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
        style={{ touchAction: "pan-y pinch-zoom" }}
        onPointerDown={(event) => {
          if (!window.matchMedia("(max-width: 900px)").matches) return;
          if (event.pointerType === "mouse") return;

          if (
            (event.target as HTMLElement).closest(
              ".shrimp-highlights-tabs, button, a",
            )
          ) {
            swipeStartRef.current = null;
            return;
          }

          swipeStartRef.current = {
            x: event.clientX,
            y: event.clientY,
          };

          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (!window.matchMedia("(max-width: 900px)").matches) return;

          const start = swipeStartRef.current;
          swipeStartRef.current = null;

          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }

          if (!start) return;

          const deltaX = event.clientX - start.x;
          const deltaY = event.clientY - start.y;

          if (
            Math.abs(deltaX) >= 40 &&
            Math.abs(deltaX) > Math.abs(deltaY) * 1.15
          ) {
            move(deltaX < 0 ? 1 : -1);
          }
        }}
        onPointerCancel={(event) => {
          swipeStartRef.current = null;

          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
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
              onClick={() => setActiveSlide(index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          ref={highlightsVisualRef}
          className="shrimp-highlights-visual"

        >
          <div className="shrimp-highlights-visual__track">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                draggable={false}
                onLoad={() => {
                  alignHighlightsVisual();
                  requestAnimationFrame(alignHighlightsVisual);
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

  const processTabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 1200px)").matches) return;

    const tabs = processTabsRef.current;
    if (!tabs) return;

    const frame = requestAnimationFrame(() => {
      const buttons = tabs.querySelectorAll<HTMLElement>('button[role="tab"]');
      const activeButton = buttons[activeStage];

      if (!activeButton) return;

      const targetLeft =
        activeButton.offsetLeft -
        (tabs.clientWidth - activeButton.offsetWidth) / 2;

      tabs.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [activeStage]);

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
          <span style={{ display: "block" }}>От исследования</span>
          <span
            style={{ display: "block" }}
            className="mrshrimp-accent"
          >
            до первых пользователей
          </span>
        </h2>

      </div>

      <div
        ref={sliderRef}
        className="shrimp-process-slider reveal"
        data-cursor=""
        role="region"
        aria-roledescription="карусель"
        aria-label="Этапы процесса"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        onPointerDown={(event) => {
          if (!window.matchMedia("(max-width: 1200px)").matches) return;
          if (event.pointerType === "mouse") return;

          if (
            (event.target as HTMLElement).closest(
              ".shrimp-process-tabs, button, a, .process-hypotheses-modal, .case-video-modal",
            )
          ) {
            processSwipeStartRef.current = null;
            return;
          }

          processSwipeStartRef.current = {
            x: event.clientX,
            y: event.clientY,
          };

          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (!window.matchMedia("(max-width: 1200px)").matches) return;

          const start = processSwipeStartRef.current;
          processSwipeStartRef.current = null;

          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }

          if (!start) return;

          const deltaX = event.clientX - start.x;
          const deltaY = event.clientY - start.y;

          if (
            Math.abs(deltaX) >= 40 &&
            Math.abs(deltaX) > Math.abs(deltaY) * 1.15
          ) {
            move(deltaX < 0 ? 1 : -1);
          }
        }}
        onPointerCancel={(event) => {
          processSwipeStartRef.current = null;

          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
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

        {stage.visual === "research" && <ResearchPersonaPoints />}

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

          <div className="shrimp-process-action shrimp-process-action--mobile">
            <ProcessStageAction
              visual={stage.visual}
              onOpenHypotheses={() => setHypothesesOpen(true)}
              onOpenAnalytics={openAnalytics}
            />
          </div>

        </motion.div>

        <motion.div
          ref={processTabsRef}
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
                onPointerEnter={(event) => {
                  if (
                    event.pointerType === "mouse" &&
                    window.matchMedia("(min-width: 1201px)").matches
                  ) {
                    selectStage(index);
                  }
                }}
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
      <>26 из 81 новых пользователей<br />начали первую разминку</>,
    ],
    [
      "70%",
      <>14 из 20 пользователей вернулись<br />к разминкам в другой день</>,
    ],
    [
      "17%",
      <>3 из 18 пользователей вернулись<br />на 7-й день после первой разминки</>,
    ],
  ];

  return (
    <section className="shrimp-story-section shrimp-result">
      <div className="shrimp-section-title reveal">
        <p className="type-caption type-section-label">Результат</p>
        <h2 className="type-h2">
      <span style={{ display: "block" }}>Выпустила MVP:</span>
      <span style={{ display: "block" }}>
        первые <span className="mrshrimp-accent">метрики</span>
      </span>
    </h2>
      </div>

      <div className="shrimp-result-stage reveal">
        <div className="shrimp-result-primary">
          <strong className="type-title">68%</strong>
          <span className="type-caption-regular text-secondary">
            146 из 215 запущенных<br />разминок завершены
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
            <span className="shrimp-result-metric-label--wide">
              146 из 215 запущенных<br />разминок завершены
            </span>
            <span className="shrimp-result-metric-label--mobile">
              146 из 215 разминок<br />завершены
            </span>
          </div>

          <div className="shrimp-result-mobile-metric">
            <strong>32%</strong>
            <span className="shrimp-result-metric-label--wide">
              26 из 81 новых пользователей<br />начали первую разминку
            </span>
            <span className="shrimp-result-metric-label--mobile">
              26 из 81 начали<br />первую разминку
            </span>
          </div>

          <div className="shrimp-result-mobile-metric">
            <strong>70%</strong>
            <span className="shrimp-result-metric-label--wide">
              14 из 20 пользователей вернулись<br />к разминкам в другой день
            </span>
            <span className="shrimp-result-metric-label--mobile">
              14 из 20 вернулись<br />на 2-й день
            </span>
          </div>

          <div className="shrimp-result-mobile-metric">
            <strong>17%</strong>
            <span className="shrimp-result-metric-label--wide">
              3 из 18 пользователей вернулись<br />на 7-й день после первой разминки
            </span>
            <span className="shrimp-result-metric-label--mobile">
              3 из 18 вернулись<br />на 7-й день
            </span>
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

      <div
        className={`shrimp-result-conclusion reveal${analyticsOpen ? " is-expanded" : ""}`}
      >
        <article>
          <svg className="shrimp-result-conclusion__icon shrimp-result-icon--start" viewBox="0 0 40 40" aria-hidden="true">
            <path className="result-start__outer" d="M20 6.5L34 31H6L20 6.5Z" />
            <path className="result-start__inner" d="M20 14L27 27H13L20 14Z" />
          </svg>
          <h3>Главный барьер —<br />первый старт</h3>
          <p>До первой разминки доходят 32% новых пользователей — нужно понять, где возникает барьер до старта.</p>
        </article>
        <article>
          <svg className="shrimp-result-conclusion__icon shrimp-result-icon--finish" viewBox="0 0 40 40" aria-hidden="true">
            <circle className="result-finish__outer" cx="20" cy="20" r="12" />
            <circle className="result-finish__inner" cx="20" cy="20" r="5" />
          </svg>
          <h3>Если начали —<br />чаще заканчивают</h3>
          <p>68% запущенных разминок завершают — после старта сценарий работает заметно лучше.</p>
        </article>
        <article>
          <svg className="shrimp-result-conclusion__icon shrimp-result-icon--diamonds" viewBox="0 0 40 40" aria-hidden="true">
            <rect className="result-diamonds__outer" x="9" y="9" width="22" height="22" rx="7" />
            <rect className="result-diamonds__inner" x="14" y="14" width="12" height="12" rx="4" />
          </svg>
          <h3>Повторный интерес<br />есть</h3>
          <p>70% возвращаются в другой день, но D7 — 17%: о регулярном использовании говорить пока рано.</p>
        </article>

        <div className="shrimp-result-conclusion__toggle-wrap">
          <CaseArtifactLink
            className="shrimp-result-conclusion__toggle-button"
            icon={analyticsOpen ? "chevron-up" : "chevron-down"}
            onClick={() => setAnalyticsOpen((value) => !value)}
          >
            {analyticsOpen ? "Свернуть" : "Выводы по гипотезам"}
          </CaseArtifactLink>
        </div>

        <div className="shrimp-result-hypotheses">
          <div className="shrimp-result-hypotheses__inner">
            <div className="shrimp-result-hypotheses__grid">

              <article>
                <h4>H1 · Легко начать</h4>

                <p>
                  Критерий: ≥30% новых пользователей начнут первую разминку.
                </p>

                <p className="shrimp-result-hypothesis__result">
                  Результат: <strong>32% · 26 из 81</strong>
                </p>

                <p>
                  Критерий достигнут, но до первой разминки всё ещё не доходит
                  большинство новых пользователей. Старт остаётся зоной
                  для дальнейшего исследования.
                </p>
              </article>

              <article>
                <h4>H2 · Короткий формат</h4>

                <p>
                  Критерий: ≥55% начатых разминок будут завершены.
                </p>

                <p className="shrimp-result-hypothesis__result">
                  Результат: <strong>68% · 146 из 215</strong>
                </p>

                <p>
                  Критерий достигнут. Большинство начатых разминок завершаются,
                  поэтому длительность 2–3 минуты подходит для основного сценария.
                </p>
              </article>

              <article>
                <h4>H3 · Разнообразие</h4>

                <p>
                  Критерий: ≥50% пользователей с повторными запусками используют
                  больше одного варианта хотя бы одного параметра.
                </p>

                <p className="shrimp-result-hypothesis__result">
                  Результат: <strong>80% · 16 из 20</strong>
                </p>

                <p>
                  Критерий достигнут. Чаще всего пользователи меняют тренера;
                  формат и длительность — реже, музыку почти не меняют.
                  Ценность разных настроек неодинакова.
                </p>
              </article>

              <article>
                <h4>H4 · Видимый прогресс</h4>

                <p>
                  Критерий: медианная серия активных дней &gt;4.
                </p>

                <p className="shrimp-result-hypothesis__result">
                  Результат: <strong>2 активных дня · D7 — 17%</strong>
                </p>

                <p>
                  Критерий не достигнут. Пользователи редко возвращаются
                  в разные дни. Пока нет оснований считать прогресс и стрики
                  достаточным поводом для регулярных разминок.
                </p>
              </article>

            </div>
          </div>
        </div>
      </div>

      <p className="shrimp-result-final-note reveal">
        В итоге собрала и выпустила продукт самостоятельно. AI использовала на всём пути: от исследований и продуктовых решений до разработки и аналитики. Он помог закрыть задачи, которые раньше были за пределами моей основной экспертизы.
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
              С нуля создала и выпустила приложение с короткими разминками для тех,
              кто много сидит
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
              tabletImage="/assets/mrshrimp/hero/main-clean.webp"
              mobileImage="/assets/mrshrimp/hero/main-clean.webp"
            />
          }
          meta={[
            "2025–2026 · Founder & Product Designer",
            "B2C · 0→1 · Wellness",
            "Mobile App",
          ]}
        />

      <section className="shrimp-story-section shrimp-context">
        <CaseSectionHeader label="Контекст">
        <>
          
          <span style={{ display: "block" }}>Решила сделать</span>
          <span className="mrshrimp-accent" style={{ display: "block" }}>
            собственный продукт
          </span>
        
        </>
      </CaseSectionHeader>
        <CaseContextGrid
          priority
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
              src: "/videos/trainers-shoulders-v3.mp4",
              alt: "Обезьянка выполняет упражнение",
            },
          ]}
        />
      
      <p className="mrshrimp-context-description">
        Определила требования к нише: конкретная задача, ограниченный объём первой версии, минимум инфраструктуры — чтобы самостоятельно запустить MVP. Хотела выбрать полезную и близкую мне тему. Так пришла к идее коротких разминок во время работы.
      </p>
    </section>

      <section className="shrimp-story-section shrimp-task">
        <CaseSectionHeader label="Задача">
        <>
          <span className="mrshrimp-task-title-desktop">
            Спроектировать и <span className="mrshrimp-accent">выпустить</span>
          </span>
          <span className="mrshrimp-task-title-desktop">приложение с разминками</span>
          <span className="mrshrimp-task-title-adaptive">Спроектировать</span>
          <span className="mrshrimp-task-title-adaptive">
            и <span className="mrshrimp-accent">выпустить</span> приложение
          </span>
          <span className="mrshrimp-task-title-adaptive">с разминками</span>
        </>
      </CaseSectionHeader>
        <CaseTaskVisual
          priority
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
