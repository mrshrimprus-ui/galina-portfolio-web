type CaseNextProjectProps = {
  href: string;
  title: string;
};

export default function CaseNextProject({
  href,
  title,
}: CaseNextProjectProps) {
  return (
    <a
      className="case-next-project shrimp-next-project"
      href={href}
      aria-label={`Перейти к следующему проекту ${title}`}
      data-cursor="next-project"
    >
      <span className="shrimp-next-track" aria-hidden="true">
        <span>Следующий проект →</span>
        <span>Следующий проект →</span>
        <span>Следующий проект →</span>
        <span>Следующий проект →</span>
      </span>

      <span className="sr-only">
        Следующий проект — {title}
      </span>
    </a>
  );
}
