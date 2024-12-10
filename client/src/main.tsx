import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Provider from "./redux/provider.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
        <App />
    </Provider>
  </StrictMode>
);
