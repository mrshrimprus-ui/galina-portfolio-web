"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CaseVideoPreviewProps = {
  src: string;
  title: string;
};

export default function CaseVideoPreview({
  src,
  title,
}: CaseVideoPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const previewRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    const preview = previewRef.current;

    if (
      !preview ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      return;
    }

    let frame = 0;

    const updateParallax = () => {
      const rect = preview.getBoundingClientRect();
      const previewCenter =
        rect.top + rect.height / 2;
      const viewportCenter =
        window.innerHeight / 2;

      const offset = Math.max(
        -26,
        Math.min(
          26,
          (viewportCenter - previewCenter) * 0.065,
        ),
      );

      preview.style.setProperty(
        "--video-scroll-y",
        `${offset.toFixed(2)}px`,
      );
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(
        updateParallax,
      );
    };

    updateParallax();

    window.addEventListener(
      "scroll",
      scheduleUpdate,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      scheduleUpdate,
    );

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "scroll",
        scheduleUpdate,
      );

      window.removeEventListener(
        "resize",
        scheduleUpdate,
      );
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      closeByEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        closeByEscape,
      );
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={previewRef}
        className="case-video-preview"
        type="button"
        aria-label={`Посмотреть видео: ${title}`}
        data-cursor="video"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(true);
        }}
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        <span
          className="case-video-preview__overlay"
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="case-video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            data-cursor="video-modal"
            onKeyDown={(event) => {
              event.stopPropagation();
            }}
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <motion.div
              className="case-video-modal__player"
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <video
                src={src}
                controls
                autoPlay
                playsInline
                preload="metadata"
                aria-label={title}
              />
            </motion.div>

            <button
              className="case-video-modal__close"
              type="button"
              aria-label="Закрыть видео"
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(false);
              }}
            >
              <span aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
