
import { trackXSSAttempt } from './trackingApi';

// Common XSS patterns to detect
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /vbscript:/gi,
  /data:text\/html/gi,
  /<svg.*onload/gi,
  /eval\s*\(/gi,
  /alert\s*\(/gi,
  /prompt\s*\(/gi,
  /confirm\s*\(/gi
];

export const detectAndTrackXSS = async (input: string, fieldName: string): Promise<boolean> => {
  const isXSS = XSS_PATTERNS.some(pattern => pattern.test(input));
  
  if (isXSS) {
    await trackXSSAttempt(input, fieldName);
    return true;
  }
  
  return false;
};

export const sanitizeInput = (input: string): string => {
  // Basic HTML entity encoding
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};
