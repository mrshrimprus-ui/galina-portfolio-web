import CaseProjectVisual from "../components/CaseProjectVisual";
import CaseTemplate from "../components/CaseTemplate";
import CaseContextGrid from "../components/CaseContextGrid";
import CaseTaskVisual from "../components/CaseTaskVisual";
import SmartHomeResult from "../components/SmartHomeResult";
import CaseProcessSlider from "../components/CaseProcessSlider";
import CaseVideoPreview from "../components/CaseVideoPreview";
import CaseSolutionSlider from "../components/CaseSolutionSlider";
import CaseHighlightsSlider from "../components/CaseHighlightsSlider";


const smartHomeHighlightSlides = [
  {
    label: "Приоритет режимов",
    image: "/assets/smarthome/highlights/priority.webp",
    alt: "Уровни представления режимов термоголовки",
    description:
      "Определила, какие режимы должны быть доступны сразу, какие состояния показывать в превью устройства, а какие настройки можно оставить глубже.",
  },
  {
    label: "Совместимость режимов",
    image: "/assets/smarthome/highlights/compatibility.webp",
    alt: "Состояния и совместимость режимов термоголовки",
    description:
      "С командой разобрали, какие режимы могут работать вместе, какие блокируют друг друга и какие действия доступны в каждом состоянии.",
  },
  {
    label: "Максимальный обогрев",
    image: "/assets/smarthome/highlights/max-heat.webp",
    alt: "Сценарий максимального обогрева",
    description:
      "Максимальный обогрев работает ограниченное время и временно блокирует часть управления. В интерфейсе показала запуск, активное состояние и возврат к предыдущему режиму.",
  },
  {
    label: "Открытое окно",
    image: "/assets/smarthome/highlights/open-window.webp",
    alt: "Сценарий режима Открытое окно",
    description:
      "Функция находится в настройках, но её активное состояние влияет на всё управление устройством — поэтому отдельно продумала, как сообщать об этом и возвращать пользователя к доступным действиям.",
  },
] as const;

/* SMART HOME PROCESS STAGES START */
const smartHomeProcessStages = [
  {
    label: "Разбор документации",
    title: "Перевела функции в сценарии",
    description:
      "Определила, что пользователь видит, настраивает и запускает.",
    card:
      "Изучила документацию производителя и перевела функции и ограничения устройства в пользовательские сценарии.",
    tags: ["Требования", "Ограничения"],
    visual: (
      <img
        className="smarthome-process-image"
        src="/assets/smarthome/process/01.webp"
        alt="Терморегулятор EKF на радиаторе"
      />
    ),
  },
  {
    label: "Единая логика управления",
    title: "Сохранила знакомую логику управления",
    description:
      "Новое устройство работает по привычным принципам, а отличия появляются только там, где они необходимы.",
    card:
      "Взяла существующий терморегулятор за основу: сохранила структуру и принципы управления, адаптировав их под особенности термоголовки.",
    tags: ["Консистентность", "Масштабирование"],
    visual: (
      <img
        className="smarthome-process-image smarthome-process-image--second"
        src="/assets/smarthome/process/02-screens.webp"
        alt="Экраны управления терморегулятором"
      />
    ),
  },
  {
    label: "Сценарии и состояния",
    title: "Собрала модель поведения устройства",
    description:
      "Для каждого состояния определила доступные действия и реакции интерфейса.",
    card:
      "Описала ручное управление, расписание, отпуск, настройки, потерю связи и недоступные действия.",
    tags: ["Сценарии", "Состояния", "Corner Cases"],
    visual: (
      <div className="smarthome-process-video-center">
        <CaseVideoPreview
          src="https://res.cloudinary.com/dk0kxiahf/video/upload/v1785692907/smart_home_cnklur.mov"
          title="Сценарии и состояния терморегулятора"
        />
      </div>
    ),
  },
  {
    label: "Проверка с командой",
    title: "Согласовала реализуемую логику",
    description:
      "Зафиксировала правила и состояния, которые команда могла реализовать.",
    card:
      "Сверила сценарии с аналитиком и разработчиками и уточнила технические ограничения устройства.",
    tags: ["Работа с командой", "Технические ограничения"],
    visual: (
      <img
        className="smarthome-process-image"
        src="/assets/smarthome/process/03-screens.webp"
        alt="Проверенные состояния терморегулятора"
      />
    ),
  },
] as const;
/* SMART HOME PROCESS STAGES END */

/* SMART HOME SOLUTION SLIDES START */
const smartHomeSolutionSlides = [
  {
    title: "Управление и режимы",
    description:
      "Температура и основные режимы — на главном экране.",
    visual: "smarthome-01",
    background:
      "/assets/smarthome/solution/smarthome-solution-01-bg.png",
    picture:
      "/assets/smarthome/solution/smarthome-solution-01-pic.webp",
  },
  {
    title: "Расписание и автоматизация",
    description:
      "Управление по времени и в составе сценариев умного дома.",
    visual: "smarthome-02",
    background:
      "/assets/smarthome/solution/smarthome-solution-02-bg.png",
    picture:
      "/assets/smarthome/solution/smarthome-solution-02-pic.webp",
  },
  {
    title: "Подключение устройства",
    description:
      "Использовала общий сценарий подключения устройств.",
    visual: "smarthome-03",
    background:
      "/assets/smarthome/solution/smarthome-solution-03-bg.png",
    picture:
      "/assets/smarthome/solution/smarthome-solution-03-pic.webp",
  },
  {
    title: "Настройки устройства",
    description:
      "Технические параметры вынесены в отдельный раздел.",
    visual: "smarthome-04",
    background:
      "/assets/smarthome/solution/smarthome-solution-04-bg.png",
    picture:
      "/assets/smarthome/solution/smarthome-solution-04-pic.webp",
  },
  {
    title: "Состояния и ограничения",
    description:
      "Статусы показывают, что происходит и какие действия доступны.",
    visual: "smarthome-05",
    background:
      "/assets/smarthome/solution/smarthome-solution-05-bg.png",
    picture:
      "/assets/smarthome/solution/smarthome-solution-05-pic.webp",
  },
] as const;
/* SMART HOME SOLUTION SLIDES END */

export default function SmartHomeCase() {
  return (
    <CaseTemplate
      className="shrimp-case smarthome-case"
      nextProject={{
        href: "/projects/mrshrimp",
        title: "MrShrimp",
      }}
      hero={{
        title: "Smart Home",
        summary:
          "Приложение для управления устройствами умного дома. Интеграция нового устройства в существующую систему: от документации до реализации.",
        visual: (
          <CaseProjectVisual
            variant="smarthome"
            image="/assets/smarthome/hero/main-clean.webp"
          />
        ),
        meta: [
          "2024–2025 · Team project",
          "B2C · IoT · Smart Home",
          "iOS · Android",
        ],
      }}
      context={{
        label: "Контекст",
        title: (
          <>
            Приложение для управления
            <br />{" "}
            устройствами умного дома
          </>
        ),
        content: (
              <>
          <CaseContextGrid
            items={[
              {
                src: "/assets/smarthome/context/01-normalized.webp",
                alt: "Приложение EKF Smart Home",
              },
              {
                src: "/assets/smarthome/context/02-normalized.webp",
                alt: "Устройства EKF Smart Home",
              },
              {
                src: "/assets/smarthome/context/03.webp",
                alt: "Интерфейс EKF Smart Home",
              },
            ]}
          />

          <p className="smarthome-context-description type-text">
            До моего подключения продукт уже был перенесён на собственную разработку и частично реализован.
            <br />
            Я присоединилась на этапе обновления дизайна: перерабатывала существующие экраны, дорабатывала отдельные сценарии и проектировала взаимодействие с новыми устройствами.
          </p>
              </>
        ),
      }}
      task={{
        label: "Задача",
        title: "Добавить новое устройство в приложение: терморегулятор для радиатора",
        content: (
          <CaseTaskVisual
            src="/assets/smarthome/task/visual.webp"
            alt="Сценарии терморегулятора EKF Smart Home"
          />
        ),
      }}
      process={{
        label: "Процесс",
        title: (
          <>
            От документации к реализуемым сценариям
          </>
        ),
        content: (
          <CaseProcessSlider
            mobileCompact
            stages={smartHomeProcessStages}
            ariaLabel="Этапы работы над терморегулятором"
          />
        ),
      }}
      highlights={{
        label: "Хайлайты",
        title:
          "Режимы, состояния и ограничения: как сложилась логика управления",
        content: (
          <CaseHighlightsSlider
            slides={smartHomeHighlightSlides}
            ariaLabel="Хайлайты EKF Smart Home"
          />
        ),
      }}
      solution={{
        label: "Решение",
        title: (
          <>
            Новое устройство стало частью единой системы{" "}
            <span className="keep-together">Smart Home</span>
          </>
        ),
        content: (
          <CaseSolutionSlider
            mobileCards
            slides={smartHomeSolutionSlides}
            ariaLabel="Ключевые решения EKF Smart Home"
          />
        ),
      }}
      result={{
        label: "Результат",
        title: (
          <span data-no-typography>
            Спроектированные сценарии согласовали с{"\u00A0"}командой и{"\u00A0"}реализовали в{"\u00A0"}приложении
          </span>
        ),
        content: <SmartHomeResult />,
      }}
    />
  );
}
