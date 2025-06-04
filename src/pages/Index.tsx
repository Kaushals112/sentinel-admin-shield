
import { useState } from 'react';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import PatientRecords from '../components/PatientRecords';
import DocumentUpload from '../components/DocumentUpload';
import { usePageTracking } from '../hooks/usePageTracking';

// Obfuscated console logging
const _0x8f2c = (data: string[]) => {
  const _0x4b7e = btoa(data.join('|'));
  console.log(_0x4b7e);
};

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Enable page tracking
  usePageTracking();

  const handleLogin = (credentials: { username: string; password: string }) => {
    setCurrentUser(credentials.username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setActiveSection('dashboard');
  };

  const handleSectionChange = (section: string) => {
    const sessionId = sessionStorage.getItem('_session_id') || 'unknown';
    const attackerIp = sessionStorage.getItem('_attacker_ip') || '127.0.0.1';
    
    // Obfuscated section navigation logging
    _0x8f2c([
      'section_navigation',
      section,
      currentUser,
      sessionId,
      attackerIp,
      new Date().toISOString()
    ]);
    
    setActiveSection(section);
  };

  const handleSearch = (query: string) => {
    // Search functionality - can be expanded
    console.log('Search query:', query);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'patients':
        return <PatientRecords />;
      case 'documents':
        return <DocumentUpload />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          username={currentUser}
          onLogout={handleLogout}
          onSearch={handleSearch}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
