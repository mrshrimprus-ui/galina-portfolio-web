"use client";

import { useEffect } from "react";
import { useNavMagnet } from "../hooks/useNavMagnet";
import { usePersistentTheme } from "../hooks/usePersistentTheme";
import styles from "./privacy.module.css";

export default function PrivacyClient() {
  useNavMagnet();

  const { theme, setTheme } = usePersistentTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }),
      {
        threshold: 0.01,
        rootMargin: "0px 0px 20% 0px",
      },
    );

    document
      .querySelectorAll(".privacy-page .reveal")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={`privacy-page ${styles.page}`}>
      <header className="site-header text-normal">
        <a
          className="brand text-logo"
          href="/"
          aria-label="Galina Chumak — главная"
          data-cursor="link"
        >
          Galina Chumak
        </a>

        <button
          className="theme-switch"
          type="button"
          aria-label={
            theme === "dark"
              ? "Включить светлую тему"
              : "Включить тёмную тему"
          }
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          data-cursor="link"
        >
          <span
            className={`theme-option ${
              theme === "light" ? "active" : ""
            }`}
          >
            <span
              className="theme-icon theme-icon--sun"
              aria-hidden="true"
            />
          </span>

          <span
            className={`theme-option ${
              theme === "dark" ? "active" : ""
            }`}
          >
            <span
              className="theme-icon theme-icon--moon"
              aria-hidden="true"
            />
          </span>
        </button>

        <nav className="header-contact-nav" aria-label="Связаться">
          <a
            className="header-contact"
            href="/about"
            data-cursor="nav"
          >
            Связаться
          </a>
        </nav>
      </header>

      <section className={styles.layout}>
        <div className={styles.heading}>
          <h1
            className={`${styles.title} type-h1 reveal`}
          >
            Политика конфиденциальности
          </h1>
        </div>

        <div className={styles.copy}>
          <div className={`${styles.intro} reveal`}>
            <p className={`${styles.lead} type-text-xl`}>
              Как на сайте используются аналитика,
              технические данные и файлы cookie.
            </p>

            <p className={`${styles.updated} text-normal`}>
              Обновлено 28 августа 2026 года
            </p>
          </div>

          <div className={styles.sections}>
            <section className="reveal">
              <h2>Общие положения</h2>

              <div className={styles.sectionBody}>
                <p>
                  Настоящая политика описывает, как
                  обрабатываются данные посетителей сайта
                  galinachumak.ru. Владелец сайта — Галина
                  Чумак.
                </p>

                <p>
                  Сайт используется для размещения
                  профессионального портфолио.
                </p>
              </div>
            </section>

            <section className="reveal">
              <h2>Какие данные обрабатываются</h2>

              <div className={styles.sectionBody}>
                <p>
                  На сайте нет регистрации, личного кабинета
                  и форм для отправки персональных данных.
                </p>

                <p>
                  Для анализа посещаемости используется
                  Яндекс Метрика. Сервис может получать
                  техническую информацию о посещении: адрес
                  страницы, источник перехода, действия на
                  сайте, тип устройства, браузер,
                  операционную систему, разрешение экрана,
                  приблизительную географию, IP-адрес и
                  файлы cookie.
                </p>
              </div>
            </section>

            <section className="reveal">
              <h2>Для чего используется аналитика</h2>

              <div className={styles.sectionBody}>
                <p>
                  Данные используются для анализа
                  посещаемости портфолио: чтобы понимать,
                  какие страницы и проекты открывают
                  посетители, откуда они приходят и как
                  взаимодействуют с сайтом.
                </p>
              </div>
            </section>

            <section className="reveal">
              <h2>Файлы cookie</h2>

              <div className={styles.sectionBody}>
                <p>
                  На сайте используются файлы cookie, в том
                  числе аналитические cookie Яндекс Метрики.
                </p>

                <p>
                  Они помогают собирать статистику посещений
                  и взаимодействия с сайтом. Cookie не
                  используются мной для установления личности
                  посетителя.
                </p>

                <p>
                  Пользователь может ограничить или отключить
                  использование cookie, а также удалить
                  сохранённые cookie в настройках своего
                  браузера.
                </p>

                <p>
                  Инструкции по управлению cookie доступны в
                  настройках и справочных материалах
                  используемого браузера.
                </p>
              </div>
            </section>

            <section className="reveal">
              <h2>Яндекс Метрика</h2>

              <div className={styles.sectionBody}>
                <p>
                  Сайт использует Яндекс Метрику, включая
                  функцию «Вебвизор», для анализа посещаемости
                  и взаимодействия с сайтом. Метрика может
                  собирать информацию об активности на сайте,
                  файлы cookie, данные об устройстве и
                  записывать сессии посещений. Запретить сбор
                  данных и запись сессий можно с помощью
                  расширения «Блокировщик Яндекс.Метрики».
                </p>

                <p>
                  Технические данные обрабатываются Яндексом в
                  соответствии с его правилами
                  {" и\u00A0"}
                  <a
                    href="https://yandex.ru/legal/confidential/"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                  >
                    политикой конфиденциальности
                  </a>
                  .
                </p>
              </div>
            </section>

            <section className="reveal">
              <h2>Контакты</h2>

              <div className={styles.sectionBody}>
                <p>
                  По вопросам, связанным с этой политикой и
                  обработкой данных, можно написать
                  {" на\u00A0"}
                  <a
                    href="mailto:galina.done@mail.ru"
                    data-cursor="link"
                  >
                    galina.done@mail.ru
                  </a>
                  .
                </p>
              </div>
            </section>

            <section className="reveal">
              <h2>Изменения политики</h2>

              <div className={styles.sectionBody}>
                <p>
                  Политика может обновляться при изменении
                  используемых сервисов или способов обработки
                  данных. Актуальная версия всегда
                  размещается на этой странице.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
