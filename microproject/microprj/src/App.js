import { useState, useCallback } from 'react';
import './App.css';
import CardForm from './CardForm';
import CardPreview from './CardPreview';
import Toast from './Toast';

const TOAST_DURATION_MS = 3000;

function App() {
  // Shared form state — drives both the form and the live card preview
  const [formValues, setFormValues] = useState({
    cardholderName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });

  const [showToast, setShowToast] = useState(false);

  // Called by CardForm only when all validations pass
  const handleSuccess = useCallback(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), TOAST_DURATION_MS);
  }, []);

  return (
    <div className="App">
      {/* Global toast notification */}
      <Toast show={showToast} />

      {/* Left column — live card preview */}
      <aside className="app-left">
        <CardPreview formValues={formValues} />
      </aside>

      {/* Right column — card details form */}
      <main className="app-right">
        <CardForm
          formValues={formValues}
          setFormValues={setFormValues}
          onSuccess={handleSuccess}
        />
      </main>
    </div>
  );
}

export default App;
