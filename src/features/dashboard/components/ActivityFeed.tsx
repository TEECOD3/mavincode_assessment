import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ActivityItem } from '@/features/dashboard/types/dashboard.types';
import { colorTheme } from '@/lib/constants/theme';
import { formatRelativeTime } from '@/lib/utils';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {


  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                style={{ backgroundColor: colorTheme.primary.blue }}
              >
                {activity.avatar || activity.user.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>
                  <span className="ml-1">{activity.action}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatRelativeTime(activity.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No recent activity
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};