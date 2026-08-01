import type { ReactNode } from "react";

type CaseSectionHeaderProps = {
  label: string;
  children: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  subtitleClassName?: string;
};

export default function CaseSectionHeader({
  label,
  children,
  subtitle,
  className = "",
  subtitleClassName = "type-caption",
}: CaseSectionHeaderProps) {
  return (
    <div className={`case-section-title shrimp-section-title reveal ${className}`.trim()}>
      <p className="type-section-label">{label}</p>

      <h2 className="type-h2">
        {children}
      </h2>

      {subtitle && (
        <p className={subtitleClassName}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
