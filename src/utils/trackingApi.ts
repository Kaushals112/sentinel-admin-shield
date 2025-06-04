
import { v4 as uuidv4 } from 'uuid';

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem('_session_id', sessionId);
  }
  return sessionId;
};

// Get attacker IP (simulated - in real implementation, backend should capture this)
const getAttackerIP = (): string => {
  // In real implementation, this would come from backend
  return sessionStorage.getItem('_attacker_ip') || '127.0.0.1';
};

// Track page visits
export const trackPageVisit = async (pathname: string, timestamp: Date) => {
  const payload = {
    event_type: 'page_visit',
    session_id: getSessionId(),
    attacker_ip: getAttackerIP(),
    pathname,
    timestamp: timestamp.toISOString(),
    user_agent: navigator.userAgent,
    referrer: document.referrer
  };

  try {
    await fetch('/api/track/page-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    // Silent fail for honeypot
    console.log('_track_err', error);
  }
};

// Track XSS attempts
export const trackXSSAttempt = async (payload: string, field: string) => {
  const trackingData = {
    event_type: 'xss_attempt',
    session_id: getSessionId(),
    attacker_ip: getAttackerIP(),
    xss_payload: payload,
    field_name: field,
    timestamp: new Date().toISOString(),
    user_agent: navigator.userAgent
  };

  try {
    await fetch('/api/track/xss-attempt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackingData)
    });
  } catch (error) {
    console.log('_track_err', error);
  }
};

// Track brute force login attempts
export const trackLoginAttempt = async (username: string, password: string, success: boolean) => {
  const payload = {
    event_type: 'login_attempt',
    session_id: getSessionId(),
    attacker_ip: getAttackerIP(),
    username,
    password,
    success,
    timestamp: new Date().toISOString(),
    user_agent: navigator.userAgent
  };

  try {
    await fetch('/api/track/login-attempt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.log('_track_err', error);
  }
};

// Track file uploads
export const trackFileUpload = async (fileName: string, fileSize: number, fileType: string) => {
  const payload = {
    event_type: 'file_upload',
    session_id: getSessionId(),
    attacker_ip: getAttackerIP(),
    file_name: fileName,
    file_size: fileSize,
    file_type: fileType,
    timestamp: new Date().toISOString()
  };

  try {
    await fetch('/api/track/file-upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.log('_track_err', error);
  }
};
