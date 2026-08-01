import CaseProjectVisual from "../components/CaseProjectVisual";
import CaseTemplate from "../components/CaseTemplate";
import CaseContextGrid from "../components/CaseContextGrid";
import CaseTaskVisual from "../components/CaseTaskVisual";
import SmartHomeResult from "../components/SmartHomeResult";
import CaseProcessSlider from "../components/CaseProcessSlider";
import CaseVideoPreview from "../components/CaseVideoPreview";
import CaseSolutionSlider from "../components/CaseSolutionSlider";


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
        src="/assets/smarthome/process/01.png"
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
        src="/assets/smarthome/process/02-screens.png"
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
          src="https://res.cloudinary.com/dk0kxiahf/video/upload/v1772540608/manki_tilts_vlyozz.mp4"
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
        src="/assets/smarthome/process/03-screens.png"
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
      "/assets/smarthome/solution/smarthome-solution-01-pic.png",
  },
  {
    title: "Расписание и автоматизация",
    description:
      "Управление по времени и в составе сценариев умного дома.",
    visual: "smarthome-02",
    background:
      "/assets/smarthome/solution/smarthome-solution-02-bg.png",
    picture:
      "/assets/smarthome/solution/smarthome-solution-02-pic.png",
  },
  {
    title: "Подключение устройства",
    description:
      "Использовала общий сценарий подключения устройств.",
    visual: "smarthome-03",
    background:
      "/assets/smarthome/solution/smarthome-solution-03-bg.png",
    picture:
      "/assets/smarthome/solution/smarthome-solution-03-pic.png",
  },
  {
    title: "Настройки устройства",
    description:
      "Технические параметры вынесены в отдельный раздел.",
    visual: "smarthome-04",
    background:
      "/assets/smarthome/solution/smarthome-solution-04-bg.png",
    picture:
      "/assets/smarthome/solution/smarthome-solution-04-pic.png",
  },
  {
    title: "Состояния и ограничения",
    description:
      "Статусы показывают, что происходит и какие действия доступны.",
    visual: "smarthome-05",
    background:
      "/assets/smarthome/solution/smarthome-solution-05-bg.png",
    picture:
      "/assets/smarthome/solution/smarthome-solution-05-pic.png",
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
        title: "EKF Smart Home",
        summary:
          "Приложение для управления устройствами умного дома. Интеграция нового устройства в существующую систему: от документации до реализации.",
        visual: (
          <CaseProjectVisual
            variant="smarthome"
            image="/assets/smarthome/hero/main.png"
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
            <br />
            устройствами умного дома
          </>
        ),
        content: (
              <>
          <CaseContextGrid
            items={[
              {
                src: "/assets/smarthome/context/01.png",
                alt: "Приложение EKF Smart Home",
              },
              {
                src: "/assets/smarthome/context/02.png",
                alt: "Устройства EKF Smart Home",
              },
              {
                src: "/assets/smarthome/context/03.png",
                alt: "Интерфейс EKF Smart Home",
              },
            ]}
          />

          <p className="smarthome-context-description type-text">
            До моего подключения продукт уже был перенесён на собственную разработку и частично реализован. Я присоединилась на этапе обновления дизайна: перерабатывала существующие экраны, дорабатывала отдельные сценарии и проектировала взаимодействие с новыми устройствами.
          </p>
              </>
        ),
      }}
      task={{
        label: "Задача",
        title: (
          <>
            Добавить новое устройство в существующую систему Smart Home —
            терморегулятор для радиатора
          </>
        ),
        content: (
          <CaseTaskVisual
            src="/assets/smarthome/task/visual.png"
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
            stages={smartHomeProcessStages}
            ariaLabel="Этапы работы над терморегулятором"
          />
        ),
      }}
      solution={{
        label: "Решение",
        title:
          "Новое устройство стало частью единой системы Smart Home",
        content: (
          <CaseSolutionSlider
            slides={smartHomeSolutionSlides}
            ariaLabel="Ключевые решения EKF Smart Home"
          />
        ),
      }}
      result={{
        label: "Результат",
        title: (
          <>
            Устройство реализовали
            <br />
            в EKF Smart Home
          </>
        ),
        content: <SmartHomeResult />,
      }}
    />
  );
}
