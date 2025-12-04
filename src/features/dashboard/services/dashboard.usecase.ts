import type {
  DashboardData,
  MetricCard,
  ChartData,
  ActivityItem,
  CreateDashboardItemRequest,
  UpdateDashboardItemRequest,
  DashboardFilters,
  DashboardUseCase,
} from '@/features/dashboard/types/dashboard.types';
import { DashboardService } from './dashboard.service';

export class DashboardUseCaseImpl implements DashboardUseCase {
  private dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
  }

  async getDashboardData(): Promise<DashboardData[]> {
    try {
      return await this.dashboardService.getAllDashboardData();
    } catch (error) {
      console.error('Dashboard UseCase - Get dashboard data error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve dashboard data');
    }
  }

  async getDashboardMetrics(): Promise<MetricCard[]> {
    try {
      return await this.dashboardService.getDashboardMetrics();
    } catch (error) {
      console.error('Dashboard UseCase - Get metrics error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve dashboard metrics');
    }
  }

  async getChartData(): Promise<ChartData[]> {
    try {
      return await this.dashboardService.getChartData();
    } catch (error) {
      console.error('Dashboard UseCase - Get chart data error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve chart data');
    }
  }

  async getActivities(): Promise<ActivityItem[]> {
    try {
      return await this.dashboardService.getActivities();
    } catch (error) {
      console.error('Dashboard UseCase - Get activities error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve activities');
    }
  }

  async createDashboardItem(data: CreateDashboardItemRequest, createdBy: string): Promise<DashboardData> {
    try {
      if (!createdBy) {
        throw new Error('User authentication required to create dashboard items');
      }

      const result = await this.dashboardService.createDashboardItem(data, createdBy);
      console.log(`Dashboard item created: ${result.id} by user: ${createdBy}`);
      
      return result;
    } catch (error) {
      console.error('Dashboard UseCase - Create item error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to create dashboard item');
    }
  }

  async updateDashboardItem(id: string, data: UpdateDashboardItemRequest): Promise<DashboardData> {
    try {
      const existingItem = await this.dashboardService.getDashboardItemById(id);
      if (!existingItem) {
        throw new Error('Dashboard item not found');
      }

      const result = await this.dashboardService.updateDashboardItem(id, data);
      console.log(`Dashboard item updated: ${result.id}`);
      
      return result;
    } catch (error) {
      console.error('Dashboard UseCase - Update item error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to update dashboard item');
    }
  }

  async deleteDashboardItem(id: string): Promise<void> {
    try {
      const existingItem = await this.dashboardService.getDashboardItemById(id);
      if (!existingItem) {
        throw new Error('Dashboard item not found');
      }

      if (existingItem.metadata?.critical === true) {
        throw new Error('Cannot delete critical dashboard items');
      }

      await this.dashboardService.deleteDashboardItem(id);
      console.log(`Dashboard item deleted: ${id}`);
    } catch (error) {
      console.error('Dashboard UseCase - Delete item error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to delete dashboard item');
    }
  }

  async getDashboardItemById(id: string): Promise<DashboardData | null> {
    try {
      return await this.dashboardService.getDashboardItemById(id);
    } catch (error) {
      console.error('Dashboard UseCase - Get item by ID error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve dashboard item');
    }
  }

  async filterDashboardData(filters: DashboardFilters): Promise<DashboardData[]> {
    try {
      if (filters.dateRange) {
        if (filters.dateRange.start > filters.dateRange.end) {
          throw new Error('Start date must be before end date');
        }
      }

      return await this.dashboardService.filterDashboardData(filters);
    } catch (error) {
      console.error('Dashboard UseCase - Filter data error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to filter dashboard data');
    }
  }

  async getDashboardSummary(): Promise<{
    totalItems: number;
    activeItems: number;
    completedItems: number;
    pendingItems: number;
    archivedItems: number;
    categorySummary: Record<string, number>;
  }> {
    try {
      const data = await this.getDashboardData();
      
      const summary = {
        totalItems: data.length,
        activeItems: data.filter(item => item.status === 'ACTIVE').length,
        completedItems: data.filter(item => item.status === 'COMPLETED').length,
        pendingItems: data.filter(item => item.status === 'PENDING').length,
        archivedItems: data.filter(item => item.status === 'ARCHIVED').length,
        categorySummary: data.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
      };

      return summary;
    } catch (error) {
      console.error('Dashboard UseCase - Get summary error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve dashboard summary');
    }
  }

  async refreshDashboardData(): Promise<{
    data: DashboardData[];
    metrics: MetricCard[];
    charts: ChartData[];
    activities: ActivityItem[];
  }> {
    try {
      const [data, metrics, charts, activities] = await Promise.all([
        this.getDashboardData(),
        this.getDashboardMetrics(),
        this.getChartData(),
        this.getActivities(),
      ]);

      return {
        data,
        metrics,
        charts,
        activities,
      };
    } catch (error) {
      console.error('Dashboard UseCase - Refresh data error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to refresh dashboard data');
    }
  }
}

export const dashboardUseCase = new DashboardUseCaseImpl();