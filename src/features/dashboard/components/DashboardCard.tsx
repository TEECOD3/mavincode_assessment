import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import type { DashboardData } from '@/features/dashboard/types/dashboard.types';
import { colorTheme } from '@/lib/constants/theme';
import { formatDate } from '@/lib/utils';

interface DashboardCardProps {
  data: DashboardData;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusColors = {
  ACTIVE: 'bg-green-50 text-green-800 border border-green-100',
  PENDING: 'bg-yellow-50 text-yellow-800 border border-yellow-100',
  COMPLETED: 'bg-blue-50 text-blue-800 border border-blue-100',
  ARCHIVED: 'bg-gray-50 text-gray-800 border border-gray-100',
};

const categoryColors = {
  SALES: colorTheme.primary.blue,
  MARKETING: colorTheme.status.success,
  OPERATIONS: colorTheme.status.warning,
  FINANCE: colorTheme.status.danger,
};

export const DashboardCard = ({ data, onEdit, onDelete }: DashboardCardProps) => {


  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: categoryColors[data.category] }}
          />
          <CardTitle className="text-sm font-medium text-gray-900">
            {data.title}
          </CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-md ${statusColors[data.status]}`}>
            {data.status}
          </span>
          {(onEdit || onDelete) && (
            <div className="flex items-center space-x-1">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(data.id)}
                  className="h-6 w-6 p-0"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(data.id)}
                  className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {data.description && (
          <p className="text-sm text-gray-600 mb-3">
            {data.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            {typeof data.value === 'number' ? data.value.toLocaleString() : data.value}
          </div>
          <div className="text-xs text-gray-500">
            {formatDate(data.updatedAt)}
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Category: {data.category} • Created by {data.createdBy}
        </div>
      </CardContent>
    </Card>
  );
};