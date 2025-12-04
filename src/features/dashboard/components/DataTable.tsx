import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react';
import type { DashboardData, DashboardCategory, DashboardStatus } from '@/features/dashboard/types/dashboard.types';
import { formatDate } from '@/lib/utils';


interface DataTableProps {
  data: DashboardData[];
  title?: string;
  onRowClick?: (item: DashboardData) => void;
}

type SortField = keyof DashboardData;
type SortDirection = 'asc' | 'desc' | null;

const statusColors = {
  ACTIVE: 'bg-green-50 text-green-800 border border-green-100',
  PENDING: 'bg-yellow-50 text-yellow-800 border border-yellow-100',
  COMPLETED: 'bg-blue-50 text-blue-800 border border-blue-100',
  ARCHIVED: 'bg-gray-50 text-gray-800 border border-gray-100',
};

export const DataTable = ({ data, title = "Data Table", onRowClick }: DataTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<DashboardCategory | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<DashboardStatus | 'ALL'>('ALL');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
      if (sortDirection === 'desc') {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
        if (bValue == null) return sortDirection === 'asc' ? 1 : -1;
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, categoryFilter, statusFilter, sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    if (sortDirection === 'asc') return <ArrowUp className="h-4 w-4" />;
    if (sortDirection === 'desc') return <ArrowDown className="h-4 w-4" />;
    return <ArrowUpDown className="h-4 w-4" />;
  };



  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as DashboardCategory | 'ALL')}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="ALL">All Categories</option>
            <option value="SALES">Sales</option>
            <option value="MARKETING">Marketing</option>
            <option value="OPERATIONS">Operations</option>
            <option value="FINANCE">Finance</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DashboardStatus | 'ALL')}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('title')}
                    className="h-auto p-0 font-medium text-gray-900 hover:text-blue-600"
                  >
                    Title {getSortIcon('title')}
                  </Button>
                </th>
                <th className="text-left py-3 px-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('category')}
                    className="h-auto p-0 font-medium text-gray-900 hover:text-blue-600"
                  >
                    Category {getSortIcon('category')}
                  </Button>
                </th>
                <th className="text-left py-3 px-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('status')}
                    className="h-auto p-0 font-medium text-gray-900 hover:text-blue-600"
                  >
                    Status {getSortIcon('status')}
                  </Button>
                </th>
                <th className="text-left py-3 px-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('value')}
                    className="h-auto p-0 font-medium text-gray-900 hover:text-blue-600"
                  >
                    Value {getSortIcon('value')}
                  </Button>
                </th>
                <th className="text-left py-3 px-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('updatedAt')}
                    className="h-auto p-0 font-medium text-gray-900 hover:text-blue-600"
                  >
                    Updated {getSortIcon('updatedAt')}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onRowClick?.(item)}
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{item.title}</div>
                      {item.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{item.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-gray-900">
                      {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-500">
                      {formatDate(item.updatedAt)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No data found matching your criteria
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};