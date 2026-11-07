import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataContextProvider } from "./context/contextApi.tsx";
import { BrowserRouter } from "react-router";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
