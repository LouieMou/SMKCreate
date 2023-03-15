import "./App.css";
import data from "./data/data.json";
import CategoryItem from "./components/CategoryItem";
import { PersonComponent } from "./PersonComponent";

function App() {
  return (
    <div>
      <PersonComponent />
      <CategoryItem
        source={data[0].object_url}
        labelName={data[0].label_name}
      />
      <CategoryItem
        source={data[0].object_url}
        labelName={data[0].label_name}
      />
    </div>
  );
}

export default App;
