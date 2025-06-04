import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, LogOut, Bell, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { detectAndTrackXSS } from '../utils/xssDetection';

interface AdminHeaderProps {
  username: string;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

// Obfuscated console logging
const _0x5d9e = (data: string[]) => {
  const _0x1f4a = btoa(data.join('|'));
  console.log(_0x1f4a);
};

const AdminHeader: React.FC<AdminHeaderProps> = ({ username, onLogout, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const sessionId = sessionStorage.getItem('_session_id') || 'unknown';
    const attackerIp = sessionStorage.getItem('_attacker_ip') || '127.0.0.1';
    
    // Obfuscated search logging
    _0x5d9e([
      'header_search_query',
      searchQuery,
      username,
      sessionId,
      attackerIp,
      new Date().toISOString()
    ]);
    
    // Check for XSS attempts in search
    const isXSS = await detectAndTrackXSS(searchQuery, 'header_search');
    
    if (isXSS) {
      // Show legitimate error for XSS attempts
      alert('Invalid search query. Please use only alphanumeric characters and basic punctuation.');
      setSearchQuery('');
      return;
    }
    
    onSearch(searchQuery);
    setSearchQuery('');
  };

  const handleLogout = () => {
    const sessionId = sessionStorage.getItem('_session_id') || 'unknown';
    const attackerIp = sessionStorage.getItem('_attacker_ip') || '127.0.0.1';
    
    // Obfuscated logout logging
    _0x5d9e([
      'logout',
      username,
      sessionId,
      attackerIp,
      new Date().toISOString()
    ]);
    
    onLogout();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">AIIMS Admin Dashboard</h1>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Live System
          </Badge>
        </div>
        
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search patients, documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Button type="submit" size="sm" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>
          
          <div className="flex items-center space-x-2 text-sm">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">Dr. {username}</span>
          </div>
          
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
