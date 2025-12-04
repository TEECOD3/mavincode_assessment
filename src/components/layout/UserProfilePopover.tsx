import { User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { User as UserType } from '@/features/authentication';

interface UserProfilePopoverProps {
  user?: UserType | null;
  onLogoutClick: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

export const UserProfilePopover = ({ 
  user, 
  onLogoutClick,
  onSettingsClick,
  onProfileClick 
}: UserProfilePopoverProps) => {
  return (
    <div className="py-2">
      {/* User Info Header */}
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'JP'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'Jane Pearson'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || 'jane@example.com'}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onProfileClick}
          className="w-full justify-start px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <User className="w-4 h-4 mr-3" />
          View Profile
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onSettingsClick}
          className="w-full justify-start px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Button>
      </div>

      {/* Logout Section */}
      <div className="border-t border-gray-100 pt-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogoutClick}
          className="w-full justify-start px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign out
        </Button>
      </div>
    </div>
  );
};