import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { colorTheme } from '@/lib/constants/theme';
import { useState } from 'react';

interface DashboardSidebarProps {
  onLogout?: () => void;
}

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export const DashboardSidebar = ({ onLogout }: DashboardSidebarProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMobileMenu}
          className="bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 
          transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          bg-white border-r border-gray-200 shadow-sm
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colorTheme.primary.blue }}
              >
                D
              </div>
              <span className="text-xl font-bold text-gray-900">Dashboard</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${active 
                      ? 'text-white shadow-sm' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                  style={active ? { backgroundColor: colorTheme.primary.blue } : {}}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: colorTheme.primary.blue }}
              >
                U
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  User Name
                </p>
                <p className="text-xs text-gray-500 truncate">
                  user@example.com
                </p>
              </div>
            </div>
            {onLogout && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};