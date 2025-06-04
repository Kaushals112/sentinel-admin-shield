
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageVisit } from '../utils/trackingApi';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const timestamp = new Date();
    const sessionId = sessionStorage.getItem('_session_id') || 'unknown';
    const attackerIp = sessionStorage.getItem('_attacker_ip') || '127.0.0.1';
    
    trackPageVisit(location.pathname + location.search, timestamp);
    
    // Enhanced logging with session_id and attacker_ip
    const _0x9f4a = [
      'page_tracked', 
      location.pathname + location.search, 
      sessionId, 
      attackerIp, 
      timestamp.toISOString()
    ];
    console.log(_0x9f4a.join('|'));
  }, [location.pathname, location.search]); // Track both pathname and search changes
};
