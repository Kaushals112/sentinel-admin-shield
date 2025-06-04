
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './utils/obfuscated.ts'
import './utils/secureObfuscation.ts'

// Enhanced obfuscated initialization
const _0x1a7e = () => {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
  
  // Initialize honeypot tracking with anti-debugging
  if (typeof window !== 'undefined') {
    (window as any)._honeypot_active = true;
    
    // Clear console periodically in production
    if (process.env.NODE_ENV === 'production') {
      setInterval(() => {
        console.clear();
        // Add fake console noise
        console.log('%c', 'font-size:1px;');
      }, 3000);
    }
    
    // Disable debugging in production
    if (process.env.NODE_ENV === 'production') {
      // Override console methods
      const originalLog = console.log;
      console.log = (...args) => {
        // Only show obfuscated logs
        if (args.length === 1 && typeof args[0] === 'string' && args[0].length > 20) {
          originalLog(...args);
        }
      };
    }
  }
};

_0x1a7e();
