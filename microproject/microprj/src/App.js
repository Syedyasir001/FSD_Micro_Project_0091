import { useState } from 'react';
import './App.css';
import CardForm from './CardForm';
import CardPreview from './CardPreview';

function App() {
  // Shared form state — drives both the form and the live card preview
  const [formValues, setFormValues] = useState({
    cardholderName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });

  return (
    <div className="App">
      {/* Left column — live card preview */}
      <aside className="app-left">
        <CardPreview formValues={formValues} />
      </aside>

      {/* Right column — card details form */}
      <main className="app-right">
        <CardForm formValues={formValues} setFormValues={setFormValues} />
      </main>
    </div>
  );
}

export default App;
