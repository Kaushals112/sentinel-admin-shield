import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Hospital } from 'lucide-react';
import { trackLoginAttempt } from '../utils/trackingApi';

interface LoginPageProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

// Obfuscated console logging
const _0x3c8f = (data: string[]) => {
  const _0x7a2b = btoa(data.join('|'));
  console.log(_0x7a2b);
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const sessionId = sessionStorage.getItem('_session_id') || 'unknown';
    const attackerIp = sessionStorage.getItem('_attacker_ip') || '127.0.0.1';
    
    // Valid credentials for the honeypot
    const validCredentials = [
      { username: 'admin', password: 'aiims@2024' },
      { username: 'dr.sharma', password: 'medical123' },
      { username: 'nursehead', password: 'hospital@456' },
      { username: 'supervisor', password: 'aiims_admin' },
      { username: 'receptionist', password: 'front_desk2024' },
      { username: 'lab.tech', password: 'laboratory@123' }
    ];
    
    const isValid = validCredentials.some(
      cred => cred.username === username && cred.password === password
    );
    
    // Track login attempt (both successful and failed)
    await trackLoginAttempt(username, password, isValid);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (isValid) {
      onLogin({ username, password });
    } else {
      setError('Invalid credentials. Please contact IT department for assistance or try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Hospital className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">AIIMS Admin Portal</h2>
          <p className="text-gray-600 mt-2">All India Institute of Medical Sciences</p>
          <p className="text-sm text-gray-500">Secure Healthcare Management System</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Administrative Login
            </CardTitle>
            <CardDescription>
              Enter your authorized credentials to access the medical administration system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Username / Employee ID</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1"
                />
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>For technical support, contact IT Helpdesk</p>
              <p className="mt-1">Ext: 2847 | Email: it.support@aiims.edu</p>
              <p className="mt-2 text-xs">Demo Credentials: admin / aiims@2024</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center text-xs text-gray-400">
          <p>© 2024 All India Institute of Medical Sciences. All rights reserved.</p>
          <p>This system is monitored for security purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
