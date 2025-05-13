
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Adicionar interceptor global para logs
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  const url = args[0];
  console.log(`Fetch request to: ${url instanceof Request ? url.url : url}`);
  
  try {
    const response = await originalFetch.apply(this, args);
    if (!response.ok) {
      console.warn(`Fetch response not ok: ${response.status} ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

createRoot(document.getElementById("root")!).render(<App />);
