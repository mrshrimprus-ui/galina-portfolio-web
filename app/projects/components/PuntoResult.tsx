import CaseStoreButtons from "./CaseStoreButtons";

export default function PuntoResult() {
  return (
    <div className="punto-result reveal">
      <div
        className="punto-result__visual"
      >
        <img
          src="/assets/punto/result/result.webp"
          alt="Punto Pago в 2022 и 2026 году"
          loading="lazy"
          decoding="async"
        />

        <span className="punto-result__years">
          2022 · 2026
        </span>
      </div>

      <div className="punto-result__metrics">
        <div className="punto-result__metric">
          <strong>4,7</strong>
          <span>12,3 тыс. отзывов</span>
        </div>

        <div className="punto-result__metric">
          <strong>1M+</strong>
          <span>более 1 млн загрузок</span>
        </div>
      </div>

      <p className="punto-result__summary type-text">
        Спроектированные сценарии были реализованы и спустя четыре года
        сохранились в основе продукта. Punto Pago продолжил развиваться, а
        маркетплейс стал одним из его направлений.
      </p>

      <CaseStoreButtons
        appStoreUrl="https://apps.apple.com/app/punto-pago/id1415876448"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.puntopago.puntopagoapp"
      />
    </div>
  );
}
