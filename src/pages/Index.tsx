
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import LoginPage from '@/components/LoginPage';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import Dashboard from '@/components/Dashboard';
import DocumentUpload from '@/components/DocumentUpload';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [currentSection, setCurrentSection] = useState('dashboard');

  // Obfuscated session management
  useEffect(() => {
    const _0x3f7a = sessionStorage.getItem('aiims_session');
    if (_0x3f7a) {
      try {
        const _0x8b2c = JSON.parse(atob(_0x3f7a));
        if (_0x8b2c.exp > Date.now()) {
          setIsAuthenticated(true);
          setCurrentUser(_0x8b2c.user);
        }
      } catch (e) {
        sessionStorage.removeItem('aiims_session');
      }
    }
  }, []);

  const handleLogin = (credentials: { username: string; password: string }) => {
    setIsAuthenticated(true);
    setCurrentUser(credentials.username);
    
    // Create obfuscated session
    const _0x9d4e = {
      user: credentials.username,
      exp: Date.now() + (8 * 60 * 60 * 1000), // 8 hours
      role: 'admin'
    };
    sessionStorage.setItem('aiims_session', btoa(JSON.stringify(_0x9d4e)));
    
    toast({
      title: "Login Successful",
      description: `Welcome to AIIMS Admin Portal, ${credentials.username}`,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
    sessionStorage.removeItem('aiims_session');
    
    // Log logout event
    const _0x6c8f = ['logout', currentUser, new Date().toISOString()];
    console.log(_0x6c8f.join('|'));
    
    toast({
      title: "Logged Out",
      description: "You have been safely logged out of the system",
    });
  };

  const handleSearch = (query: string) => {
    toast({
      title: "Search Initiated",
      description: `Searching for: ${query}`,
    });
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <DocumentUpload />;
      case 'patients':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Patient Records</h2>
            <p className="text-gray-600">Patient management system will be loaded here...</p>
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Medical Documents</h2>
            <p className="text-gray-600">Document management system will be loaded here...</p>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}</h2>
            <p className="text-gray-600">This section is currently under development...</p>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection} 
        />
        
        <div className="flex-1 flex flex-col">
          <AdminHeader 
            username={currentUser}
            onLogout={handleLogout}
            onSearch={handleSearch}
          />
          
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
