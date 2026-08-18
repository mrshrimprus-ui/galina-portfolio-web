import CaseContextGrid from "../components/CaseContextGrid";
import CaseProjectVisual from "../components/CaseProjectVisual";
import CaseTemplate from "../components/CaseTemplate";
import CaseTaskVisual from "../components/CaseTaskVisual";
import CaseProcessSlider from "../components/CaseProcessSlider";
import CaseSolutionSlider from "../components/CaseSolutionSlider";
import PuntoResult from "../components/PuntoResult";
import CaseStoreButtons from "../components/CaseStoreButtons";
import CaseHighlightsSlider from "../components/CaseHighlightsSlider";

const puntoHighlightSlides = [
  {
    label: "Консистентность админки",
    image: "/assets/punto/highlights/admin.webp",
    scrollX: true,
    visualClassName: "case-highlights-visual--punto-admin",
    alt: "Примеры экранов админки Punto Pago",
    description:
      "Админка собиралась разработчиками из готовых Material-компонентов. Я проектировала в рамках этой системы и унифицировала структуру страниц и основные паттерны, чтобы быстрее развивать большую админку и сосредоточиться на сценариях и бизнес-логике.",
  },
  {
    label: "Разделение отправлений",
    image: "/assets/punto/highlights/shipments.webp",
    scrollX: true,
    alt: "Сценарий разделения заказа на несколько отправлений",
    description:
      "Вместе с аналитиком предусмотрела кейс с товарами из разных точек и спроектировала разделение заказа на несколько посылок. После запуска сценарий оказался востребованным.",
  },
  {
    label: "Выбор вариантов товара",
    image: "/assets/punto/highlights/variants.webp",
    alt: "Сценарий объединения вариантов товара через Group ID",
    description:
      "Я проработала интерфейс объединения отдельных товаров через Group ID: мерчант мог выбрать существующую группу или создать новую. В мобильном приложении связанные товары отображались как варианты одной карточки с переключением по цвету и размеру.",
  },
] as const;

const puntoSolutionSlides = [
  {
    title: "Кошелёк остался на главной",
    description:
      "Сохранили привычные финансовые сценарии, а маркетплейс встроили в навигацию.",
    visual: "punto-01",
    background:
      "/assets/punto/solution/punto-solution-01-bg.webp",
    picture:
      "/assets/punto/solution/punto-solution-01-pic.webp",
  },
  {
    title: "Полный сценарий покупки",
    description:
      "Проработала путь от выбора товара до оплаты, заказа и поддержки.",
    visual: "punto-02",
    background:
      "/assets/punto/solution/punto-solution-02-bg.webp",
    video: {
      src: "https://res.cloudinary.com/dk0kxiahf/video/upload/v1785692917/shop_punto_bctriz.mov",
      title: "Полный сценарий покупки Punto Pago",
    },
  },
  {
    title: "Единая система статусов",
    description:
      "Связала статусы, действия и права всех ролей на каждом этапе заказа.",
    visual: "punto-03",
    background:
      "/assets/punto/solution/punto-solution-03-bg.webp",
    video: {
      src: "https://res.cloudinary.com/dk0kxiahf/video/upload/v1785692902/admin_punto_y1xl6l.mov",
      title: "Система статусов Punto Pago",
    },
  },
  {
    title: "Банковские сценарии",
    description:
      "Спроектировала пополнение, переводы и верификацию внутри текущей логики продукта.",
    visual: "punto-04",
    background:
      "/assets/punto/solution/punto-solution-04-bg.webp",
    video: {
      src: "https://res.cloudinary.com/dk0kxiahf/video/upload/v1785692914/bank_punto_h8bqgu.mov",
      title: "Банковские сценарии",
    },
  },
  {
    title: "Система компонентов",
    description:
      "Собрала компоненты и состояния для быстрого развития продукта.",
    visual: "punto-05",
    background:
      "/assets/punto/solution/punto-solution-05-bg.webp",
    picture:
      "/assets/punto/solution/punto-solution-05-pic.webp",
  },
] as const;

export default function PuntoCase() {
  return (
    <CaseTemplate
      className="shrimp-case punto-case"
      beforeNextProject={
        <CaseStoreButtons
          appStoreUrl="https://apps.apple.com/app/punto-pago/id1415876448"
          googlePlayUrl="https://play.google.com/store/apps/details?id=com.puntopago.puntopagoapp"
          reveal={false}
        />
      }
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
            image="/assets/punto/hero/main-clean.webp"
          />
        ),
        meta: [
          "2021–2022 · Team project",
          "B2C · B2B · FinTech · Marketplace",
          "iOS · Android · Web-admin",
        ],
        actions: (
          <CaseStoreButtons
            appStoreUrl="https://apps.apple.com/app/punto-pago/id1415876448"
            googlePlayUrl="https://play.google.com/store/apps/details?id=com.puntopago.puntopagoapp"
          />
        ),
      }}
      context={{
        label: "Контекст",
        title: (
          <>
            Из электронного <br />
            кошелька в суперапп
          </>
        ),
        content: (
          <>
            <p className="shrimp-solution-intro reveal">
              На момент моего подключения Punto Pago расширялся: к привычным финансовым сценариям добавлялись маркетплейс и банковские сервисы.
            </p>

            <CaseContextGrid
              items={[
                {
                  src: "/assets/punto/context/01-normalized.webp",
                  alt: "Мобильное приложение Punto Pago",
                },
                {
                  src: "/assets/punto/context/02-normalized.webp",
                  alt: "Сценарии Punto Pago",
                },
                {
                  src: "/assets/punto/context/03.webp",
                  alt: "Интерфейс Punto Pago",
                },
              ]}
            />
          </>
        ),
      }}
      task={{
        label: "Задача",
        title: "Встроить новые направления в логику существующего кошелька",
        content: (
          <>
            <p className="shrimp-solution-intro reveal">
              Спроектировать пользовательские сценарии маркетплейса и банковских сервисов, сохранив привычные финансовые сценарии, и предусмотреть web-админку для управления маркетплейсом.
            </p>

            <CaseTaskVisual
            src="/assets/punto/task/visual.webp"
            alt="Ключевые экраны продукта Punto Pago"
          />

            <div className="case-task-caption-block">


              <p className="case-task-caption punto-secondary-copy type-text reveal">
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
            mobileCompact
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
                      className="punto-process-image--mvp"
                      src="/assets/punto/process/01-mvp.webp"
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
                  "Администратор видит заказ целиком, продавец — только свою часть. Статусы синхронизированы между ролями.",
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
                      className="punto-process-image--marketplace"
                      src="/assets/punto/process/02-marketplace.webp"
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
                  "Продукт вырос из платёжного кошелька в полноценную экосистему за три этапа — каждый новый слой сохранял привычную логику для существующих пользователей.",
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
                      className="punto-process-image--superapp"
                      src="/assets/punto/process/03-superapp.webp"
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
      highlights={{
        label: "Хайлайты",
        title:
          "Как продуктовая логика складывалась внутри ограничений бизнеса и разработки",
        content: (
          <CaseHighlightsSlider
            slides={puntoHighlightSlides}
            ariaLabel="Хайлайты Punto Pago"
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
              Сохранила привычные финансовые сценарии, встроила в продукт полный путь покупки — от каталога до заказа — и связала маркетплейс с web-админкой. Банковские функции развивались в той же логике существующего кошелька.
            </p>

            <CaseSolutionSlider
            mobileCards
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
