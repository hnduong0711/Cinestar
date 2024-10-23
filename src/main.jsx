import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalContextWrapper from "./context/GlobalContext/GlobalContextWrapper.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <GlobalContextWrapper>
      <App />
    </GlobalContextWrapper>
  // </StrictMode>
);
