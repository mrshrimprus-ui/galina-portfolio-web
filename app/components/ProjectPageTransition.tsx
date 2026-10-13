"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

const AUTO_NAVIGATION_DELAY = 3200;

export type ProjectTransitionData = {
  name: string;
  steps: [string, string, string];
  route: string;
};

export const PROJECT_TRANSITIONS: Record<string, ProjectTransitionData> = {
  "/projects/mrshrimp": {
    name: "MrShrimp",
    steps: [
      "Сама запускаю MVP с нуля",
      "Проверяю решения на пользователях",
      "С AI закрываю разработку, контент и аналитику",
    ],
    route: "/projects/mrshrimp",
  },
  "/projects/punto": {
    name: "Punto Pago",
    steps: [
      "Развиваю новые направления внутри работающего продукта",
      "Держу связанными множество сценариев и состояний",
      "Собираю бизнес-логику в mobile и web-админке",
    ],
    route: "/projects/punto",
  },
  "/projects/industry": {
    name: "EKF Connect Industry",
    steps: [
      "Встраиваю новые сценарии в существующий продукт",
      "Разбираюсь в документации и логике устройств",
      "Ищу удобное решение внутри технических ограничений",
    ],
    route: "/projects/industry",
  },
};

const PROJECT_TRANSITION_EVENT = "project-page-transition:open";

export function requestProjectPageTransition(project: ProjectTransitionData) {
  window.dispatchEvent(
    new CustomEvent<ProjectTransitionData>(PROJECT_TRANSITION_EVENT, {
      detail: project,
    }),
  );
}

export default function ProjectPageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const navigationTimer = useRef<number | null>(null);
  const removalTimer = useRef<number | null>(null);
  const sequenceTimers = useRef<number[]>([]);
  const [project, setProject] = useState<ProjectTransitionData | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [stage, setStage] = useState(0);

  const clearTimers = useCallback(() => {
    if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
    if (removalTimer.current) window.clearTimeout(removalTimer.current);
    sequenceTimers.current.forEach((timer) => window.clearTimeout(timer));
    sequenceTimers.current = [];
    navigationTimer.current = null;
    removalTimer.current = null;
  }, []);

  const openProject = useCallback((nextProject: ProjectTransitionData) => {
    router.push(nextProject.route, { scroll: false });
  }, [router]);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      openProject((event as CustomEvent<ProjectTransitionData>).detail);
    };

    window.addEventListener(PROJECT_TRANSITION_EVENT, handleOpen);
    return () => window.removeEventListener(PROJECT_TRANSITION_EVENT, handleOpen);
  }, [openProject]);

  useEffect(() => {
    if (!project || pathname !== project.route) return;

    if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
    navigationTimer.current = null;

    const revealTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("is-project-transitioning");
      setIsLeaving(true);
      removalTimer.current = window.setTimeout(() => {
        setProject(null);
        setIsLeaving(false);
      }, 210);
    }, 70);

    return () => window.clearTimeout(revealTimer);
  }, [pathname, project]);

  useEffect(() => {
    return () => {
      clearTimers();
      document.documentElement.classList.remove("is-project-transitioning");
    };
  }, [clearTimers]);

  return (
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            className="project-page-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLeaving ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isLeaving ? 0.18 : 0.17, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Переход к проекту ${project.name}`}
          >
            <div className="project-page-transition__content">
              <div className="project-page-transition__drum">
                {project.steps.map((step, index) => {
                  const distance = index - stage;
                  const absDistance = Math.abs(distance);

                  return (
                    <motion.p
                      className="project-page-transition__drum-line"
                      key={`${project.route}-${index}`}
                      initial={false}
                      animate={{
                        y: distance * 72,
                        scale: absDistance === 0 ? 1 : absDistance === 1 ? 0.84 : 0.74,
                        opacity: absDistance === 0 ? 1 : absDistance === 1 ? 0.34 : 0.18,
                      }}
                      transition={{
                        duration: 0.62,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {step}
                    </motion.p>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
