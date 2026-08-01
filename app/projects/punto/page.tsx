import CaseContextGrid from "../components/CaseContextGrid";
import CaseProjectVisual from "../components/CaseProjectVisual";
import CaseTemplate from "../components/CaseTemplate";
import CaseTaskVisual from "../components/CaseTaskVisual";
import CaseProcessSlider from "../components/CaseProcessSlider";
import CaseSolutionSlider from "../components/CaseSolutionSlider";
import PuntoResult from "../components/PuntoResult";

const puntoSolutionSlides = [
  {
    title: "Кошелёк остался на главной",
    description:
      "Сохранили привычные финансовые сценарии, а маркетплейс встроили в навигацию.",
    visual: "punto-01",
    background:
      "/assets/punto/solution/punto-solution-01-bg.png",
    picture:
      "/assets/punto/solution/punto-solution-01-pic.png",
  },
  {
    title: "Полный сценарий покупки",
    description:
      "Проработала путь от выбора товара до оплаты, заказа и поддержки.",
    visual: "punto-02",
    background:
      "/assets/punto/solution/punto-solution-02-bg.png",
    video: {
      src: "https://res.cloudinary.com/dk0kxiahf/video/upload/v1775294415/capi_inhale_exhale_pbayao.mp4",
      title: "Полный сценарий покупки",
    },
  },
  {
    title: "Единая система статусов",
    description:
      "Связала статусы, действия и права всех ролей на каждом этапе заказа.",
    visual: "punto-03",
    background:
      "/assets/punto/solution/punto-solution-03-bg.png",
    video: {
      src: "https://res.cloudinary.com/dk0kxiahf/video/upload/v1772958595/manki_upper_back_round_arch_eg1dvr.mp4",
      title: "Единая система статусов",
    },
  },
  {
    title: "Банковские сценарии",
    description:
      "Спроектировала пополнение, переводы и верификацию внутри текущей логики продукта.",
    visual: "punto-04",
    background:
      "/assets/punto/solution/punto-solution-04-bg.png",
    video: {
      src: "https://res.cloudinary.com/dk0kxiahf/video/upload/v1772958595/manki_upper_back_round_arch_eg1dvr.mp4",
      title: "Банковские сценарии",
    },
  },
  {
    title: "Система компонентов",
    description:
      "Собрала компоненты и состояния для быстрого развития продукта.",
    visual: "punto-05",
    background:
      "/assets/punto/solution/punto-solution-05-bg.png",
    picture:
      "/assets/punto/solution/punto-solution-05-pic.png",
  },
] as const;

export default function PuntoCase() {
  return (
    <CaseTemplate
      className="shrimp-case punto-case"
      nextProject={{
        href: "/projects/smarthome",
        title: "EKF Smart Home",
      }}
      hero={{
        title: "Punto Pago",
        summary:
          "Финтех-продукт для Латинской Америки: электронный кошелёк, маркетплейс и банковские сервисы. Развитие коммерческого продукта в составе команды: от прототипа маркетплейса до банковских функций и web-админки.",
        visual: (
          <CaseProjectVisual
            variant="punto"
            image="/assets/punto/hero/main.png"
          />
        ),
        meta: [
          "2021–2022 · Team project",
          "B2C · B2B · FinTech · Marketplace",
          "iOS · Android · Web-admin",
        ],
      }}
      context={{
        label: "Контекст",
        title:
          "Из сервиса оплаты счетов в финтех-суперапп",
        content: (
          <CaseContextGrid
            items={[
              {
                src: "/assets/punto/context/01.png",
                alt: "Мобильное приложение Punto Pago",
              },
              {
                src: "/assets/punto/context/02.png",
                alt: "Сценарии Punto Pago",
              },
              {
                src: "/assets/punto/context/03.png",
                alt: "Интерфейс Punto Pago",
              },
            ]}
          />
        ),
      }}
      task={{
        label: "Задача",
        title:
          "Спроектировать маркетплейс, админку и банковские функции, сохранив привычные финансовые сценарии",
        content: (
          <>
            <CaseTaskVisual
            src="/assets/punto/task/visual.png"
            alt="Ключевые экраны продукта Punto Pago"
          />

            <div className="case-task-caption-block">


              <p className="case-task-caption type-text reveal">
              Работали в студии с командой аналитики и разработки;
              заказчик формулировал бизнес‑требования, дальше — наша
              зона ответственности. Я отвечала за продукт от логики
              сценариев до финальных экранов: прототипы, UI‑кит,
              макеты, админ‑панель.
            </p>


            </div>
          </>
        ),
      }}
      process={{
        label: "Процесс",
        className: "shrimp-process",
        title:
          "От прототипов маркетплейса до банковских функций",
        content: (
          <CaseProcessSlider
            ariaLabel="Этапы развития Punto Pago"
            stages={[
              {
                label: "Границы MVP",
                title:
                  "Прототипы помогли определить границы MVP",
                description:
                  "Заказчик и команда разработки использовали прототипы, чтобы согласовать состав первой версии с учётом сроков и приоритетов.",
                card:
                  "Собрала low-fi прототипы, опираясь на паттерны зрелых e-commerce-продуктов: прямых аналогов на рынке Панамы не было.",
                tags: [
                  "MVP",
                  "Low-fi prototyping",
                  "Приоритизация",
                ],
                visual: (
                  <div className="case-process-visual">
                    <img
                      src="/assets/punto/process/01-mvp.png"
                      alt=""
                      draggable={false}
                    />
                  </div>
                ),
              },
              {
                label: "Связка B2C и B2B",
                title:
                  "Один заказ — несколько продавцов и ролей",
                description:
                  "Для покупателя это один заказ, но внутри он делится на отправления разных продавцов. Администратор видит заказ целиком, а продавец — только свою часть. Статусы синхронизированы между ролями.",
                card:
                  "Спроектировала мультивендорный маркетплейс: от добавления и модерации товаров до разделения одного заказа на отправления разных продавцов.",
                tags: [
                  "B2C · B2B",
                  "User flows",
                  "Web admin",
                ],
                visual: (
                  <div className="case-process-visual">
                    <img
                      src="/assets/punto/process/02-marketplace.png"
                      alt=""
                      draggable={false}
                    />
                  </div>
                ),
              },
              {
                label: "Расширение продукта",
                title:
                  "От кошелька и маркетплейса — к SuperApp",
                description:
                  "Продукт вырос из платёжного кошелька в экосистему с маркетплейсом и банковскими функциями. Новые сервисы встраивались в существующую архитектуру и дизайн-систему, сохраняя привычную логику продукта.",
                card:
                  "После маркетплейса спроектировала банковские функции: физическую карту, верификацию пользователя и операции по счёту — и встроила их в существующую структуру приложения.",
                tags: [
                  "Banking",
                  "Product expansion",
                  "SuperApp",
                ],
                visual: (
                  <div className="case-process-visual">
                    <img
                      src="/assets/punto/process/03-superapp.png"
                      alt=""
                      draggable={false}
                    />
                  </div>
                ),
              },
            ]}
          />
        ),
      }}
      solution={{
        label: "Решение",
        title:
          "Кошелёк стал основой для маркетплейса и банковских сервисов",
        content: (
          <>
            <p className="shrimp-solution-intro reveal">
              Сохранила привычные финансовые сценарии, но пересобрала
              структуру продукта вокруг покупок: добавила полный путь
              от каталога до заказа, связала его с административной
              системой и заложила основу для дальнейшего развития
              банковских функций.
            </p>

            <CaseSolutionSlider
              slides={puntoSolutionSlides}
              ariaLabel="Ключевые решения Punto Pago"
            />
          </>
        ),
      }}
      result={{
        label: "Результат",
        title:
          "Логика решения сохранилась спустя 4 года",
        content: <PuntoResult />,
      }}
    />
  );
}
