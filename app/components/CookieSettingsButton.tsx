"use client";

const CONSENT_KEY = "galina-portfolio-analytics-consent";

export default function CookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  };

  return (
    <button className={className} type="button" onClick={resetConsent}>
      Изменить выбор cookie
    </button>
  );
}
