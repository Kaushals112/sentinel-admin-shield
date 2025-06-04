
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './utils/obfuscated.ts'

// Obfuscated initialization
const _0x1a7e = () => {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
  
  // Initialize honeypot tracking
  if (typeof window !== 'undefined') {
    (window as any)._honeypot_active = true;
    console.clear(); // Clear any debug info
  }
};

_0x1a7e();
