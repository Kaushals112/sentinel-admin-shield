
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageVisit } from '../utils/trackingApi';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const timestamp = new Date();
    trackPageVisit(location.pathname + location.search, timestamp);
    
    // Obfuscated logging
    const _0x9f4a = ['page_tracked', location.pathname, timestamp.toISOString()];
    console.log(_0x9f4a.join('|'));
  }, [location]);
};
