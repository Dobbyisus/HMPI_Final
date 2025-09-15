// src/main.tsx

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 👈 Import this
import App from "./App.tsx";
import "./index.css";

// 👇 We wrap the <App /> component with the router here
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
