import { BrowserRouter } from "react-router-dom";
import { Documentation } from "./Documentation";
import { Form } from "./Form";
import "./App.scss";

export const App = () => (
  <BrowserRouter>
    <div className="grid">
      <div className="area area--documentation">
        <Documentation />
      </div>
      <div className="area area--form">
        <Form />
      </div>
    </div>
  </BrowserRouter>
);
