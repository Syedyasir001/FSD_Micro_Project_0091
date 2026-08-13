import { useState } from 'react';
import './CardForm.css';

/* ── helpers ── */
function formatCardNumber(raw) {
  // Keep only digits, cap at 16
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  // Insert a space every 4 digits
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function validate(values) {
  const errors = {};
  const digits = values.cardNumber.replace(/\s/g, '');

  if (!values.cardholderName.trim()) {
    errors.cardholderName = "Can't be blank";
  }

  if (!digits) {
    errors.cardNumber = "Can't be blank";
  } else if (!/^\d{16}$/.test(digits)) {
    errors.cardNumber = 'Wrong format, numbers only';
  }

  const mm = parseInt(values.expMonth, 10);
  if (!values.expMonth.trim()) {
    errors.expMonth = "Can't be blank";
  } else if (!/^\d{1,2}$/.test(values.expMonth) || mm < 1 || mm > 12) {
    errors.expMonth = 'Invalid month';
  }

  if (!values.expYear.trim()) {
    errors.expYear = "Can't be blank";
  } else if (!/^\d{2}$/.test(values.expYear)) {
    errors.expYear = 'Invalid year';
  }

  if (!values.cvc.trim()) {
    errors.cvc = "Can't be blank";
  } else if (!/^\d{3}$/.test(values.cvc)) {
    errors.cvc = 'Wrong format, numbers only';
  }

  return errors;
}

/* ── component ── */
function CardForm() {
  const [formValues, setFormValues] = useState({
    cardholderName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });

  // errors only visible after first submit attempt
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Auto-format card number as user types
    if (name === 'cardNumber') {
      value = formatCardNumber(value);
    }

    const updated = { ...formValues, [name]: value };
    setFormValues(updated);

    // Re-validate live only after first submit attempt
    if (submitted) {
      setErrors(validate(updated));
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(formValues);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      // All valid — hand off to parent / next step
      console.log('Valid submission:', formValues);
    }
  };

  return (
    <form className="card-form" onSubmit={handleConfirm} noValidate>

      {/* Cardholder Name */}
      <div className="form-group">
        <label className="form-label" htmlFor="cardholderName">
          CARDHOLDER NAME
        </label>
        <input
          id="cardholderName"
          className={`form-input${errors.cardholderName ? ' form-input--error' : ''}`}
          type="text"
          name="cardholderName"
          placeholder="e.g. Jane Appleseed"
          value={formValues.cardholderName}
          onChange={handleChange}
        />
        {errors.cardholderName && (
          <span className="error-text">{errors.cardholderName}</span>
        )}
      </div>

      {/* Card Number */}
      <div className="form-group">
        <label className="form-label" htmlFor="cardNumber">
          CARD NUMBER
        </label>
        <input
          id="cardNumber"
          className={`form-input${errors.cardNumber ? ' form-input--error' : ''}`}
          type="text"
          name="cardNumber"
          placeholder="e.g. 1234 5678 9123 0000"
          value={formValues.cardNumber}
          onChange={handleChange}
          inputMode="numeric"
        />
        {errors.cardNumber && (
          <span className="error-text">{errors.cardNumber}</span>
        )}
      </div>

      {/* Exp. Date + CVC row */}
      <div className="form-row">
        {/* Exp. Date */}
        <div className="form-group form-group--exp">
          <label className="form-label">EXP. DATE (MM/YY)</label>
          <div className="exp-inputs">
            <div className="exp-field">
              <input
                id="expMonth"
                className={`form-input form-input--small${errors.expMonth ? ' form-input--error' : ''}`}
                type="text"
                name="expMonth"
                placeholder="MM"
                maxLength={2}
                value={formValues.expMonth}
                onChange={handleChange}
                inputMode="numeric"
              />
              {errors.expMonth && (
                <span className="error-text">{errors.expMonth}</span>
              )}
            </div>

            <div className="exp-field">
              <input
                id="expYear"
                className={`form-input form-input--small${errors.expYear ? ' form-input--error' : ''}`}
                type="text"
                name="expYear"
                placeholder="YY"
                maxLength={2}
                value={formValues.expYear}
                onChange={handleChange}
                inputMode="numeric"
              />
              {errors.expYear && (
                <span className="error-text">{errors.expYear}</span>
              )}
            </div>
          </div>
        </div>

        {/* CVC */}
        <div className="form-group form-group--cvc">
          <label className="form-label" htmlFor="cvc">
            CVC
          </label>
          <input
            id="cvc"
            className={`form-input${errors.cvc ? ' form-input--error' : ''}`}
            type="text"
            name="cvc"
            placeholder="e.g. 123"
            maxLength={3}
            value={formValues.cvc}
            onChange={handleChange}
            inputMode="numeric"
          />
          {errors.cvc && (
            <span className="error-text">{errors.cvc}</span>
          )}
        </div>
      </div>

      <button className="confirm-btn" type="submit">
        Confirm
      </button>
    </form>
  );
}

export default CardForm;
