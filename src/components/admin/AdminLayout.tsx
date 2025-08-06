import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { Container, Nav, Span, Button } from '@/lib/dev-container';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  Shield,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from '@/lib/auth-client';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Audit Logs',
    href: '/admin/audit-logs',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Container componentId="admin-layout">
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-6 border-b">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-purple-600" />
                <span className="text-xl font-bold">Admin Panel</span>
              </div>
            </div>

            {/* Navigation */}
            <Nav 
              devId="admin-nav" 
              devName="Admin Navigation" 
              devDescription="Admin sidebar navigation"
              className="flex-1 space-y-1 px-3 py-4"
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                );
              })}
            </Nav>

            {/* User section */}
            <div className="border-t p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || 'Admin'}
                    </p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  devId="admin-back-to-dashboard-button"
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard')}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
                <Button
                  devId="admin-logout-button"
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pl-64">
          {/* Top bar */}
          <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Activity className="h-4 w-4" />
              <Span devId="admin-system-status-label">System Status: </Span>
              <span className="font-medium text-green-600">Online</span>
            </div>
          </div>

          {/* Page content */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </Container>
  );
};