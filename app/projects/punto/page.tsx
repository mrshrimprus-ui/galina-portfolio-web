import CaseTemplate from "../components/CaseTemplate";
import CaseProcessSlider from "../components/CaseProcessSlider";
import PuntoResult from "../components/PuntoResult";
import CaseStoreButtons from "../components/CaseStoreButtons";
import CaseVideoPreview from "../components/CaseVideoPreview";

export default function PuntoCase() {
  return (
    <CaseTemplate
      className="shrimp-case punto-case"
      nextProject={{
        href: "/projects/industry",
        title: "EKF Connect Industry",
      }}
      hero={{
        title: "Punto Pago",
        summary:
          "В команде с нуля спроектировала административную панель маркетплейса.",
        visual: (
          <img
            className="punto-hero-image"
            src="/assets/punto/hero/main_hero.png"
            alt="Интерфейсы административной панели маркетплейса Punto Pago"
          />
        ),
        meta: [
          "",
          "B2B · Marketplace · Admin Panel",
          "",
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
            <span style={{ display: "block" }}>
              От электронного кошелька
            </span>
            <span style={{ display: "block" }} className="punto-accent">
              к финтех-супераппу
            </span>
          </>
        ),
        content: (
          <>
            <div className="industry-copy type-description reveal">
              <p>Punto Pago — латиноамериканский финтех-продукт, который развивался из электронного кошелька в экосистему цифровых сервисов. Маркетплейс стал одним из новых направлений развития продукта.</p>
            </div>
            <div className="industry-context-video reveal">
              <video
                src="/videos/punto-context-h264.mp4"
                controls
                playsInline
                preload="metadata"
                aria-label="Видео Punto Pago"
              />
            </div>
          </>
        ),
      }}
      task={{
        label: "Моя роль",
        title: (
          <>
            <span style={{ display: "inline" }}>Проектирование административной системы</span>
            {" "}
            <span style={{ display: "inline" }} className="punto-accent">с нуля</span>
          </>
        ),
        content: (
          <div className="shrimp-result-conclusion industry-role-grid punto-role-grid reveal">
            <article>
              <svg className="shrimp-result-conclusion__icon shrimp-result-icon--start" viewBox="0 0 40 40" aria-hidden="true"><path className="result-start__outer" d="M20 6.5L34 31H6L20 6.5Z" /><path className="result-start__inner" d="M20 14L27 27H13L20 14Z" /></svg>
              <h3>Структура админ-панели</h3>
              <p>Спроектировала разделы, навигацию и связи между функциями маркетплейса.</p>
            </article>
            <article>
              <svg className="shrimp-result-conclusion__icon shrimp-result-icon--finish" viewBox="0 0 40 40" aria-hidden="true"><circle className="result-finish__outer" cx="20" cy="20" r="12" /><circle className="result-finish__inner" cx="20" cy="20" r="5" /></svg>
              <h3>Операционные сценарии</h3>
              <p>Проработала модерацию товаров, управление статусами и обработку заказов.</p>
            </article>
            <article>
              <svg className="shrimp-result-conclusion__icon shrimp-result-icon--diamonds" viewBox="0 0 40 40" aria-hidden="true"><rect className="result-diamonds__outer" x="9" y="9" width="22" height="22" rx="7" /><rect className="result-diamonds__inner" x="14" y="14" width="12" height="12" rx="4" /></svg>
              <h3>Координация дизайна</h3>
              <p>Работала над мобильной и административной частями маркетплейса, координировала второго дизайнера.</p>
            </article>
          </div>
        ),
      }}
      process={{
        label: "Ключевые решения",
        className: "punto-key-decisions",
        title: (
          <>
            <span className="punto-accent">Управление</span> товарами,
            магазинами и заказами
          </>
        ),
        content: (
          <CaseProcessSlider
            mobileCompact
            hideStageCopy
            ariaLabel="Ключевые решения Punto Pago"
            persistentVisual={
              <CaseVideoPreview
                src="https://res.cloudinary.com/dk0kxiahf/video/upload/v1785692902/admin_punto_y1xl6l.mov"
                title="Система статусов Punto Pago"
              />
            }
            stages={[
              {
                label: "Каталог и модерация товаров",
                title: "Каталог и модерация товаров",
                description:
                  "Спроектировала таблицы с поиском, фильтрами и статусами модерации, а также интерфейсы просмотра и редактирования товаров.",
                card:
                  "Спроектировала таблицы с поиском, фильтрами и статусами модерации, а также интерфейсы просмотра и редактирования товаров.",
                tags: [],
              },
              {
                label: "Управление заказами",
                title: "Управление заказами",
                description:
                  "Разработала список заказов с фильтрацией по статусам и подробную карточку с составом заказа, доставкой и расчётом сумм.",
                card:
                  "Разработала список заказов с фильтрацией по статусам и подробную карточку с составом заказа, доставкой и расчётом сумм.",
                tags: [],
              },
              {
                label: "Управление магазинами",
                title: "Управление магазинами",
                description:
                  "Спроектировала интерфейсы для добавления магазинов, управления их данными и работы с сотрудниками.",
                card:
                  "Спроектировала интерфейсы для добавления магазинов, управления их данными и работы с сотрудниками.",
                tags: [],
              },
            ]}
          />
        ),
      }}
      result={{
        label: "Результат",
        title: (
          <>
            Админ-панель вышла в <span className="punto-accent">релиз</span>
            {" "}вместе с маркетплейсом
          </>
        ),
        content: <PuntoResult />,
      }}
    />
  );
}
