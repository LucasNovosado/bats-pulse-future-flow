
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Adicionar interceptor global para logs
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  const url = args[0];
  const urlString = url instanceof Request ? url.url : String(url);
  console.log(`Fetch request to: ${urlString}`);
  
  if (urlString.includes('back4app.com') || urlString.includes('parse')) {
    console.log('Back4App request details:', args);
  }
  
  try {
    const response = await originalFetch.apply(this, args);
    if (!response.ok) {
      console.warn(`Fetch response not ok: ${response.status} ${response.statusText}`);
      
      // Para requisições do Parse, tentar log do corpo da resposta
      if (urlString.includes('back4app.com') || urlString.includes('parse')) {
        response.clone().text().then(text => {
          try {
            console.log('Back4App error response:', text);
          } catch (e) {
            console.log('Raw response:', text);
          }
        }).catch(e => console.error('Error reading response body:', e));
      }
    }
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

createRoot(document.getElementById("root")!).render(<App />);
