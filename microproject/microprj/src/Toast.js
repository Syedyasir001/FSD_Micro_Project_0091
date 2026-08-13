import './Toast.css';

function Toast({ show }) {
  return (
    <div className={`toast${show ? ' toast--visible' : ''}`} role="alert" aria-live="polite">
      <span className="toast-icon">
        {/* Checkmark SVG */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
          <path
            d="M7 12.5l3.5 3.5L17 9"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="toast-message">Card details confirmed!</span>
    </div>
  );
}

export default Toast;
