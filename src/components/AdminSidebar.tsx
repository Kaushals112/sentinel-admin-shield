
import React from 'react';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { 
  Hospital,
  Users,
  FileText,
  Calendar,
  Settings,
  Database,
  Shield,
  BarChart3,
  Upload,
  Search,
  Bell,
  Activity
} from 'lucide-react';

interface AdminSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentSection, onSectionChange }) => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: BarChart3,
      section: "dashboard"
    },
    {
      title: "Patient Records",
      icon: Users,
      section: "patients"
    },
    {
      title: "Medical Documents",
      icon: FileText,
      section: "documents"
    },
    {
      title: "Appointments",
      icon: Calendar,
      section: "appointments"
    },
    {
      title: "Upload Center",
      icon: Upload,
      section: "upload"
    },
    {
      title: "Database Query",
      icon: Database,
      section: "database"
    },
    {
      title: "System Monitor",
      icon: Activity,
      section: "monitor"
    },
    {
      title: "Security Logs",
      icon: Shield,
      section: "security"
    },
    {
      title: "Notifications",
      icon: Bell,
      section: "notifications"
    },
    {
      title: "System Settings",
      icon: Settings,
      section: "settings"
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Hospital className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="font-semibold text-gray-900">AIIMS Portal</h3>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Medical Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.slice(0, 5).map((item) => (
                <SidebarMenuItem key={item.section}>
                  <SidebarMenuButton 
                    onClick={() => onSectionChange(item.section)}
                    isActive={currentSection === item.section}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>System Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.slice(5).map((item) => (
                <SidebarMenuItem key={item.section}>
                  <SidebarMenuButton 
                    onClick={() => onSectionChange(item.section)}
                    isActive={currentSection === item.section}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="text-xs text-gray-500">
          <p>Version 3.2.1</p>
          <p>Last updated: Dec 2024</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
