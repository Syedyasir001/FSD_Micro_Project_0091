import './CardPreview.css';

function CardPreview({ formValues }) {
  const { cardholderName, cardNumber, expMonth, expYear, cvc } = formValues;

  // Pad card number with zeros for a full 16-digit display
  const rawDigits = cardNumber.replace(/\s/g, '');
  const padded = rawDigits.padEnd(16, '0');
  const displayNumber = padded.replace(/(\d{4})/g, '$1 ').trim();

  const displayName  = cardholderName.trim() ? cardholderName.toUpperCase() : 'JANE APPLESEED';
  const displayMM    = expMonth  || '00';
  const displayYY    = expYear   || '00';
  const displayCVC   = cvc       || '000';

  return (
    <div className="card-preview-panel">
      {/* Subtle decorative shapes behind the cards */}
      <div className="panel-shape panel-shape--1" />
      <div className="panel-shape panel-shape--2" />

      <div className="cards-wrapper">

        {/* ── BACK card (rendered first = sits behind) ── */}
        <div className="card card--back">
          <div className="card-stripe" />
          <div className="card-cvc-row">
            <div className="card-cvc-bar">
              <span className="card-cvc-value">{displayCVC}</span>
            </div>
          </div>
          <div className="card-decorative-lines">
            <div className="card-line" />
            <div className="card-line card-line--mid" />
            <div className="card-line card-line--short" />
          </div>
        </div>

        {/* ── FRONT card ── */}
        <div className="card card--front">
          <div className="card-top-row">
            <div className="card-circles">
              <div className="card-circle card-circle--filled" />
              <div className="card-circle card-circle--outline" />
            </div>
          </div>
          <div className="card-number">{displayNumber}</div>
          <div className="card-bottom-row">
            <span className="card-name">{displayName}</span>
            <span className="card-expiry">{displayMM}/{displayYY}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CardPreview;
