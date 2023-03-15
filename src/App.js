import "./App.css";
import ColorGrid from "./components/ColorGrid";
import data from "./data/data.json";
import { PersonComponent } from "./PersonComponent";

function App() {
  return (
    <div>
      <PersonComponent />
      <p>Anita</p>
    </div>
  );
}

export default App;
