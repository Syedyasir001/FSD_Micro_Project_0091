import './App.css';
import CardForm from './CardForm';

function App() {
  return (
    <div className="App">
      {/* Left column — card preview (placeholder for now) */}
      <aside className="app-left">
      </aside>

      {/* Right column — form */}
      <main className="app-right">
        <CardForm />
      </main>
    </div>
  );
}

export default App;
