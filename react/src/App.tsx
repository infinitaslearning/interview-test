import infinitasLogo from "/infinitas-logo.svg";
import "./App.css";
import { SchoolProvider } from "./school-context";
import { School } from "./containers/School";

function App() {
  return (
    <div className="App">
      <div>
        <a href="/" target="_blank">
          <img src={infinitasLogo} className="logo" alt="Infinitas logo" />
        </a>
      </div>
      <h1>IL Interview</h1>
      <SchoolProvider>
        <School />
      </SchoolProvider>
    </div>
  );
}

export default App;
