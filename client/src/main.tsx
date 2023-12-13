import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppConfigProvider from "./contexts/ApiContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppConfigProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AppConfigProvider>
  </React.StrictMode>
);
