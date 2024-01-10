import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { StateContextProvider } from "./context/StateContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
