import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  Home, 
  Settings, 
  Package, 
  FileText, 
  Edit, 
  Image, 
  BookOpen,
  User,
  LogOut,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { LogoutModal, useAuth } from '@/features/authentication';
import { UserProfilePopover } from '@/components/layout/UserProfilePopover';

const navigationItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Interface', href: '/interface', icon: Settings },
  { name: 'Components', href: '/components', icon: Package },
  { name: 'Pages', href: '/pages', icon: FileText },
  { name: 'Forms', href: '/forms', icon: Edit },
  { name: 'Gallery', href: '/gallery', icon: Image },
  { name: 'Documentation', href: '/documentation', icon: BookOpen },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);
  const location = useLocation();
  const { logout, isLoading, user } = useAuth();

  const isActive = (href: string) => {
    return location.pathname === href || (href === '/dashboard' && location.pathname === '/');
  };

  const handleUserClick = () => {
    setIsUserPopoverOpen(!isUserPopoverOpen);
  };

  const handleLogoutClick = () => {
    setIsUserPopoverOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleProfileClick = () => {
    setIsUserPopoverOpen(false);
    console.log('Navigate to profile');
  };

  const handleSettingsClick = () => {
    setIsUserPopoverOpen(false);
    console.log('Navigate to settings');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="md:hidden mr-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Play className="h-4 w-4 text-white fill-white" />
                </div>
                <span className="text-xl font-semibold text-neutral-800">tabler</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden sm:flex text-blue-800 hover:text-blue-700 border-blue-800 hover:bg-blue-50">
                Source code
              </Button>
              
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>

              <Popover open={isUserPopoverOpen} onOpenChange={setIsUserPopoverOpen}>
                <PopoverTrigger onClick={handleUserClick}>
                  <button className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-neutral-800">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'JP'}
                      </span>
                    </div>
                    <div className="hidden sm:block text-sm text-left">
                      <div className="font-medium text-neutral-800">
                        {user?.name || 'Jane Pearson'}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {user?.role || 'Administrator'}
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                {isUserPopoverOpen && (
                  <PopoverContent align="end" side="bottom">
                    <UserProfilePopover
                      user={user}
                      onLogoutClick={handleLogoutClick}
                      onProfileClick={handleProfileClick}
                      onSettingsClick={handleSettingsClick}
                    />
                  </PopoverContent>
                )}
              </Popover>
            </div>
          </div>

          <div className="hidden md:block">
            <nav className="flex items-center space-x-8 pb-0">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 py-3 text-sm font-medium transition-colors border-b-2 ${
                      isActive(item.href)
                        ? 'text-blue-500 border-blue-500'
                        : 'text-gray-500 hover:text-gray-700 border-transparent'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent 
          className={`transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetClose onClick={() => setIsMobileMenuOpen(false)} />
          </SheetHeader>
          
          <div className="flex flex-col p-4 space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                      : 'text-neutral-800 hover:text-neutral-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-blue-500 border-blue-500 mb-3"
              >
                Source code
              </Button>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-neutral-800">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'JP'}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-neutral-800 text-sm">
                      {user?.name || 'Jane Pearson'}
                    </div>
                    <div className="text-neutral-800 text-xs">
                      {user?.email || 'jane@example.com'}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleProfileClick}
                    className="w-full justify-start text-gray-700"
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSettingsClick}
                    className="w-full justify-start text-gray-700"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogoutClick();
                    }}
                    className="w-full justify-start text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoading}
      />
    </>
  );
};