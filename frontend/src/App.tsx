import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Callback from "./components/Callback";
import StartPage from "./components/Start";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
