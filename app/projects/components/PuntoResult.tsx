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
        Все ключевые направления были реализованы:
        маркетплейс, административная система и банковские
        функции. Спустя 4&nbsp;года основная логика сценариев
        сохранилась, а продукт продолжил развиваться на её
        основе.
      </p>
    </div>
  );
}
