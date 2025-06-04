
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  Shield,
  Activity
} from 'lucide-react';
import { detectAndTrackXSS } from '../utils/xssDetection';
import { toast } from '@/hooks/use-toast';

interface AdminHeaderProps {
  username: string;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ username, onLogout, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for XSS in search input
    const isXSS = await detectAndTrackXSS(searchQuery, 'header_search');
    
    if (isXSS) {
      toast({
        title: "Invalid Search Query",
        description: "Search query contains invalid characters. Please use only alphanumeric characters and spaces.",
        variant: "destructive"
      });
      return;
    }
    
    onSearch(searchQuery);
    
    // Obfuscated search logging
    const _0x8a4b = ['header_search_query', searchQuery, username, new Date().toISOString()];
    console.log(_0x8a4b.join('|'));
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-gray-900">AIIMS Administration Panel</h1>
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
              <Activity className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600 font-medium">Online</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search patients, documents, appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </form>
          
          <Button variant="outline" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span>{username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel>Account Information</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                <span>Security Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
