import React from "react"
import ReactDOM from "react-dom/client";
import App from "./App.jsx"
import './index.css'
import { AuthProvider } from "./features/auth/context/AuthContext.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
