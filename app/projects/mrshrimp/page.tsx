"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const processSteps = [
  "Контекст",
  "Исследование",
  "Гипотеза",
  "Прототип",
  "Тестирование",
  "Запуск",
];

function CaseCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canUseCursor =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cursor || !canUseCursor) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let frame = 0;
    let currentMode = "";

    document.documentElement.classList.add("custom-cursor-enabled");

    const updateMode = () => {
      const target = document
        .elementFromPoint(targetX, targetY)
        ?.closest<HTMLElement>("[data-cursor]");
      const nextMode = target?.dataset.cursor ?? "";

      if (nextMode !== currentMode) {
        currentMode = nextMode;
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
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", updateMode);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="custom-cursor-label">Подробнее</span>
    </div>
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
        entries.forEach(
          (entry) => entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".case-page .reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CaseCursor />
      <header className="case-header">
        <a className="case-back" href="/#projects" data-cursor="link">
          <span aria-hidden="true">←</span>
          Все проекты
        </a>
        <a className="case-brand" href="/" data-cursor="link">
          Galina Chumak
        </a>
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
    <main className="case-page">
      <CaseExperience />

      <section className="case-hero">
        <div className="case-hero-copy">
          <p className="case-kicker reveal">MrShrimp · 2025–2026</p>
          <h1 className="reveal reveal-heading" data-cursor="text">
            <span>Разминки,</span>
            <span>которые не хочется</span>
            <span>пропускать</span>
          </h1>
          <p className="case-lead reveal">
            Приложение с короткими персональными разминками. Полный цикл продукта —
            от исследования привычек до запуска и аналитики.
          </p>
        </div>

        <div className="case-hero-visual reveal" aria-hidden="true">
          <div className="case-orbit case-orbit--one" />
          <div className="case-orbit case-orbit--two" />
          <img src="/assets/mrshrimp-screen.png" alt="" />
        </div>

        <dl className="case-facts reveal">
          <div>
            <dt>Роль</dt>
            <dd>Founder &amp; Product Designer</dd>
          </div>
          <div>
            <dt>Платформы</dt>
            <dd>iOS · Android · Web</dd>
          </div>
          <div>
            <dt>Задача</dt>
            <dd>0→1 · Исследование · Запуск</dd>
          </div>
        </dl>
      </section>

      <section className="case-section case-intro">
        <p className="case-section-label reveal">01 · Контекст</p>
        <div className="case-section-copy">
          <h2 className="reveal" data-cursor="text">
            Большинство знает, что нужно двигаться. Но откладывает разминку до
            «подходящего момента».
          </h2>
          <div className="case-columns">
            <p className="reveal">
              Между созвонами, работой и делами сложно выделить отдельный час на
              спорт. Даже короткая тренировка ощущается как ещё одна задача, к
              которой нужно подготовиться.
            </p>
            <p className="reveal">
              Я искала формат, который встраивается в день без чувства вины:
              достаточно короткий, чтобы начать прямо сейчас, и достаточно живой,
              чтобы захотелось вернуться.
            </p>
          </div>
        </div>
      </section>

      <section className="case-statement reveal">
        <p>Задача</p>
        <h2 data-cursor="text">
          Превратить три минуты движения из полезной обязанности в маленький
          ежедневный ритуал.
        </h2>
      </section>

      <section className="case-section case-process">
        <p className="case-section-label reveal">02 · Процесс и контекст</p>
        <div className="process-shell reveal">
          <ol className="process-tabs" aria-label="Этапы процесса">
            {processSteps.map((step, index) => (
              <li className={index === 0 ? "active" : ""} key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>

          <div className="process-stage">
            <div className="process-stage-copy">
              <p>Контекст</p>
              <h3>Найти реальный момент для короткой разминки</h3>
              <span>
                Не строить ещё один фитнес-сервис, а понять, когда человеку проще
                всего сделать первый шаг — без формы, инвентаря и подготовки.
              </span>
            </div>
            <div className="process-map" aria-hidden="true">
              <span>Работа</span>
              <span>Усталость</span>
              <strong>3 минуты</strong>
              <span>Движение</span>
              <span>Ритм</span>
            </div>
          </div>
        </div>
        <p className="case-note reveal">
          Здесь позже появится переключение этапов по клику. Сейчас показываю первый
          экран, чтобы сначала согласовать саму логику и композицию блока.
        </p>
      </section>

      <section className="case-section case-principles">
        <p className="case-section-label reveal">03 · Продуктовая идея</p>
        <div className="principles-grid">
          <article className="principle-card reveal">
            <span>01</span>
            <h3>Начать сразу</h3>
            <p>Одна заметная кнопка и понятная длительность до старта.</p>
          </article>
          <article className="principle-card reveal">
            <span>02</span>
            <h3>Выбрать настроение</h3>
            <p>Персонажи и тон делают разминку эмоциональной, а не назидательной.</p>
          </article>
          <article className="principle-card reveal">
            <span>03</span>
            <h3>Видеть ритм</h3>
            <p>Серия и прогресс поддерживают привычку без давления и наказаний.</p>
          </article>
        </div>
      </section>

      <section className="case-showcase reveal">
        <div className="showcase-copy">
          <p>Главный экран</p>
          <h2 data-cursor="text">Один сценарий — выбрать героя и начать двигаться.</h2>
        </div>
        <div className="showcase-phone" aria-hidden="true">
          <img src="/assets/mrshrimp-screen.png" alt="" />
        </div>
        <div className="showcase-chip showcase-chip--time">3 мин</div>
        <div className="showcase-chip showcase-chip--streak">🔥 12</div>
      </section>

      <section className="case-section case-solution">
        <p className="case-section-label reveal">04 · Решение</p>
        <div className="solution-shell reveal">
          <div className="solution-copy">
            <p>Первый сценарий</p>
            <h2>Короткий путь от намерения до действия</h2>
            <span>
              Главный экран не просит изучать каталог. Человек выбирает персонажа,
              видит длительность и запускает разминку одним действием.
            </span>
          </div>
          <div className="solution-preview" aria-hidden="true">
            <div className="solution-phone solution-phone--back">
              <span>Пора<br />размяться!</span>
            </div>
            <div className="solution-phone solution-phone--front">
              <span>Начать</span>
              <small>3 мин</small>
            </div>
          </div>
        </div>
        <p className="case-note reveal">
          Остальные состояния решения добавим в кликаемый слайдер после того, как
          утвердим порядок и тексты всей страницы.
        </p>
      </section>

      <section className="case-section case-results">
        <p className="case-section-label reveal">05 · После запуска</p>
        <div className="results-heading">
          <h2 className="reveal" data-cursor="text">
            Не только запустила продукт, но и настроила цикл развития через данные.
          </h2>
          <p className="reveal">
            События и обратная связь помогают видеть, где человек начинает
            разминку, возвращается к ней и превращает действие в привычку.
          </p>
        </div>
        <div className="metrics-grid">
          <article className="metric-card metric-card--main reveal">
            <strong>73%</strong>
            <p>пользователей завершают первую короткую разминку</p>
          </article>
          <article className="metric-card reveal">
            <strong>31%</strong>
            <p>возвращаются к следующей разминке</p>
          </article>
          <article className="metric-card reveal">
            <strong>26%</strong>
            <p>формируют повторяющийся сценарий</p>
          </article>
          <article className="metric-card reveal">
            <strong>10%</strong>
            <p>делятся обратной связью о продукте</p>
          </article>
        </div>
      </section>

      <section className="case-conclusion">
        <div className="conclusion-visual reveal" aria-hidden="true">
          <div className="conclusion-sun" />
          <img src="/assets/mrshrimp-screen.png" alt="" />
        </div>
        <div className="conclusion-copy">
          <p className="case-section-label reveal">06 · Вывод</p>
          <h2 className="reveal" data-cursor="text">
            Хорошая привычка начинается не с силы воли, а с бережного первого шага.
          </h2>
          <p className="reveal">
            MrShrimp стал для меня способом соединить исследование, продуктовую
            логику, визуальный характер и рост после релиза в одном живом продукте.
          </p>
        </div>
      </section>

      <a className="next-project reveal" href="/#projects" data-cursor="project">
        <span>Следующий проект</span>
        <strong>Punto Pago</strong>
        <small>Вернуться к проектам ↗</small>
      </a>

      <footer className="case-footer">
        <p>© 2026</p>
        <a href="mailto:galina-done@yandex.com" data-cursor="link">
          Обсудить проект ↗
        </a>
      </footer>
    </main>
  );
}
