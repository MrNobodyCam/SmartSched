// // import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(
//   // <StrictMode>
//   <App />
//   // </StrictMode>
// );




import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import InputForm from "./components/Input_form"; // Ensure the component is correctly imported

// Render the InputForm component
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InputForm />
  </React.StrictMode>
);