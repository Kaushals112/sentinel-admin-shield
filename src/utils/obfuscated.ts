
// Obfuscated utility functions for honeypot tracking
export const _0x4a8c = {
  log: (data: string[]) => {
    const _0x7f2b = btoa(data.join('|'));
    const _0x3e9c = `honeypot_log_${Date.now()}`;
    localStorage.setItem(_0x3e9c, _0x7f2b);
    
    // Send to honeypot backend (simulate)
    if (typeof window !== 'undefined') {
      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          event: _0x7f2b,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          fingerprint: _0x4a8c.fp()
        })
      }).catch(() => {}); // Silent fail for stealth
    }
  },
  
  fp: () => {
    // Browser fingerprinting for honeypot
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx!.textBaseline = 'top';
    ctx!.font = '14px Arial';
    ctx!.fillText('Honeypot fingerprint', 2, 2);
    return canvas.toDataURL();
  },
  
  track: (action: string, details: any) => {
    const _0x9b5d = [
      action,
      JSON.stringify(details),
      window.location.href,
      document.referrer,
      new Date().toISOString()
    ];
    _0x4a8c.log(_0x9b5d);
  }
};

// Initialize tracking
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    _0x4a8c.track('page_load', {
      url: window.location.href,
      timestamp: Date.now()
    });
  });
  
  // Track keyboard events for potential credential harvesting attempts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
      _0x4a8c.track('view_source_attempt', { key: e.key });
    }
  });
  
  // Track right-click attempts
  document.addEventListener('contextmenu', (e) => {
    _0x4a8c.track('context_menu', { x: e.clientX, y: e.clientY });
  });
}
