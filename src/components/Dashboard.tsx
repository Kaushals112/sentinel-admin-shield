
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  Calendar, 
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "12,847",
      change: "+5.2%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Cases",
      value: "2,341",
      change: "+12.1%",
      icon: Activity,
      color: "text-green-600"
    },
    {
      title: "Documents",
      value: "45,693",
      change: "+8.7%",
      icon: FileText,
      color: "text-purple-600"
    },
    {
      title: "Appointments",
      value: "1,256",
      change: "+3.4%",
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    { type: 'success', message: 'Patient discharge completed - ID: AIIMS/2024/7845', time: '5 minutes ago' },
    { type: 'warning', message: 'Lab results pending review for 3 patients', time: '15 minutes ago' },
    { type: 'info', message: 'New patient registration - ID: AIIMS/2024/7846', time: '30 minutes ago' },
    { type: 'success', message: 'Emergency room cleared - all patients treated', time: '45 minutes ago' },
    { type: 'warning', message: 'ICU bed capacity at 85%', time: '1 hour ago' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600">Real-time medical facility management and monitoring</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600 font-medium">{stat.change} from last month</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current operational status of medical systems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium">Hospital Management System</span>
              </div>
              <span className="text-sm text-green-600">Online</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium">Laboratory Information System</span>
              </div>
              <span className="text-sm text-green-600">Online</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="font-medium">Radiology System</span>
              </div>
              <span className="text-sm text-yellow-600">Maintenance</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium">Electronic Health Records</span>
              </div>
              <span className="text-sm text-green-600">Online</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border-l-2 border-l-blue-200">
                  {activity.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                  {activity.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                  {activity.type === 'info' && <Activity className="h-4 w-4 text-blue-600 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
