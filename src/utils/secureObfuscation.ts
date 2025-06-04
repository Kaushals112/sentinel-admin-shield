
// Advanced obfuscation utilities
const _0x9f8e = {
  // ROT13 + Base64 encoding
  encode: (data: string): string => {
    const rot13 = data.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
    return btoa(rot13);
  },
  
  // XOR encryption with rotating key
  xorEnc: (data: string, key: string = 'hP9mK2vL8nQ4wR7t'): string => {
    let result = '';
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(
        data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(result);
  },
  
  // Hex encoding with padding
  hexEnc: (data: string): string => {
    const hex = Array.from(data)
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
    return btoa(hex + Math.random().toString(36).substr(2, 8));
  }
};

// Anti-debugging measures
const _0x7d4a = () => {
  // Detect dev tools
  setInterval(() => {
    const threshold = 160;
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      console.clear();
      // Flood console with fake data
      for (let i = 0; i < 100; i++) {
        console.log(`%c${Math.random().toString(36)}`, 'color: transparent');
      }
    }
  }, 1000);
  
  // Disable right-click in production
  if (process.env.NODE_ENV === 'production') {
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
      }
    });
  }
};

// Initialize anti-debugging
if (typeof window !== 'undefined') {
  _0x7d4a();
}

export { _0x9f8e };
