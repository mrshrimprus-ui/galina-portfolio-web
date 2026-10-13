import CaseTemplate from "../components/CaseTemplate";
import CaseProcessSlider from "../components/CaseProcessSlider";
import CaseVideoPreview from "../components/CaseVideoPreview";

const industryDecisionStages = [
  {
    label: "Аналитические дашборды",
    title: "Аналитические дашборды",
    description: "",
    card: "Спроектировала анализ данных за период, расчёты по формулам и состояния виджетов. Сохранила единую логику с существующими оперативными дашбордами.",
    tags: [],
  },
  {
    label: "Гибкая система прав",
    title: "Гибкая система прав",
    description: "",
    card: "Вместо фиксированных ролей спроектировала группы пользователей с настройкой прав и доступа к отдельным проектам.",
    tags: [],
  },
  {
    label: "Процесс проектирования",
    title: "Процесс проектирования",
    description: "",
    card: "Синхронизировала макеты с работающим продуктом и изменила процесс проработки функций: от обсуждения первых вариантов с командой до детализации состояний и нестандартных сценариев.",
    tags: [],
  },
] as const;

export default function IndustryCase() {
  return (
    <CaseTemplate
      className="shrimp-case industry-case"
      nextProject={{ href: "/projects/mrshrimp", title: "MrShrimp" }}
      hero={{
        title: <>EKF Connect<span className="industry-hero-title-break"> Industry</span></>,
        summary: "Облачная платформа для мониторинга и управления промышленным оборудованием: развивала аналитические дашборды и сложные пользовательские сценарии.",
        visual: (
          <img
            className="industry-hero-image"
            src="/assets/industry/hero/main.png"
            alt="Интерфейсы аналитических дашбордов EKF Connect Industry"
          />
        ),
        meta: ["", "B2B · Industrial IoT · Web Platform", ""],
      }}
      context={{
        label: "Контекст",
        title: <><span style={{ display: "block" }}>Промышленная</span><span className="industry-accent" style={{ display: "block" }}>IoT-платформа</span></>,
        content: (
          <>
            <div className="industry-copy type-description reveal">
              <p>EKF Connect Industry — платформа для мониторинга и управления промышленным оборудованием. Позволяет собирать данные с устройств, отслеживать показатели в реальном времени и анализировать производственные процессы.</p>
            </div>
            <div className="industry-context-video reveal">
              <iframe
                src="https://www.youtube.com/embed/zjaGFyd76FM"
                title="EKF Connect Industry"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </>
        ),
      }}
      task={{
        label: "Моя роль",
        title: <><span style={{ display: "block" }}>Проектирование новых функций</span><span style={{ display: "block" }}>и развитие <span className="industry-accent">MVP-платформы</span></span></>,
        content: (
          <div className="shrimp-result-conclusion industry-role-grid reveal">
            <article>
              <svg className="shrimp-result-conclusion__icon shrimp-result-icon--start" viewBox="0 0 40 40" aria-hidden="true"><path className="result-start__outer" d="M20 6.5L34 31H6L20 6.5Z" /><path className="result-start__inner" d="M20 14L27 27H13L20 14Z" /></svg>
              <h3>UX-проектирование</h3>
              <p>Отвечала за проектирование новых функций и пользовательских сценариев с учётом бизнес-задач и технических ограничений.</p>
            </article>
            <article>
              <svg className="shrimp-result-conclusion__icon shrimp-result-icon--finish" viewBox="0 0 40 40" aria-hidden="true"><circle className="result-finish__outer" cx="20" cy="20" r="12" /><circle className="result-finish__inner" cx="20" cy="20" r="5" /></svg>
              <h3>Работа с командой</h3>
              <p>Вместе с аналитиком и разработчиками разбиралась в логике системы, согласовывала решения и возможности реализации.</p>
            </article>
            <article>
              <svg className="shrimp-result-conclusion__icon shrimp-result-icon--diamonds" viewBox="0 0 40 40" aria-hidden="true"><rect className="result-diamonds__outer" x="9" y="9" width="22" height="22" rx="7" /><rect className="result-diamonds__inner" x="14" y="14" width="12" height="12" rx="4" /></svg>
              <h3>Подготовка к разработке</h3>
              <p>Детализировала сценарии, прорабатывала состояния интерфейсов и готовила макеты для передачи разработчикам.</p>
            </article>
          </div>
        ),
      }}
      process={{
        label: "Ключевые решения",
        className: "industry-key-decisions",
        title: <><span style={{ display: "block" }}>Новые функции платформы</span><span className="industry-accent" style={{ display: "block" }}>и процесс проектирования</span></>,
        content: (
          <CaseProcessSlider
            mobileCompact
            hideStageCopy
            ariaLabel="Ключевые решения EKF Connect Industry"
            persistentVisual={
              <CaseVideoPreview
                src="https://res.cloudinary.com/vhk6rclp/video/upload/v1791890566/industry.mov"
                title="EKF Connect Industry"
              />
            }
            stages={industryDecisionStages}
          />
        ),
      }}
      solution={{
        label: "Результаты",
        title: <><span>Дизайн и разработка стали более </span><span className="industry-accent">предсказуемыми</span></>,
        content: (
          <div className="industry-results reveal">
            <div className="shrimp-result-metrics industry-results__grid">
              <div className="shrimp-result-metric"><strong className="type-h2">≈ 20%</strong><p className="type-caption-regular">выросла скорость подготовки<br />дизайна</p></div>
              <div className="shrimp-result-metric"><strong className="type-h2">до 2×</strong><p className="type-caption-regular">сократилось время реализации<br />небольших функций</p></div>
              <div className="shrimp-result-metric"><strong className="type-h2">10–15%</strong><p className="type-caption-regular">сократилось время реализации<br />крупных функций</p></div>
            </div>
            <p className="shrimp-result-final-note industry-result-final-note reveal">
              По данным EKF, в отдельных внедрениях платформа помогла снизить энергозатраты на 10%, повысить коэффициент использования оборудования на 7% и сократить время реакции на нештатные ситуации с 30 до 5 минут.
            </p>
          </div>
        ),
      }}
    />
  );
}
