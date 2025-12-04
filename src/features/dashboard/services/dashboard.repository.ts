import type {
  DashboardData,
  MetricCard,
  ChartData,
  ActivityItem,
  CreateDashboardItemRequest,
  UpdateDashboardItemRequest,
  DashboardRepository,
  DashboardCategory,
  DashboardStatus,
} from '@/features/dashboard/types/dashboard.types';
import { dashboardApi } from '@/features/dashboard/api/dashboard.api';

export class DashboardRepositoryImpl implements DashboardRepository {
  async findAll(): Promise<DashboardData[]> {
    const response = await dashboardApi.getAllDashboardData();
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }

  async findById(id: string): Promise<DashboardData | null> {
    const response = await dashboardApi.getDashboardItemById(id);
    if (!response.success && response.data === null) {
      return null;
    }
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }

  async create(data: CreateDashboardItemRequest, createdBy: string): Promise<DashboardData> {
    const response = await dashboardApi.createDashboardItem(data, createdBy);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }

  async update(id: string, data: UpdateDashboardItemRequest): Promise<DashboardData> {
    const response = await dashboardApi.updateDashboardItem(id, data);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }

  async delete(id: string): Promise<void> {
    const response = await dashboardApi.deleteDashboardItem(id);
    if (!response.success) {
      throw new Error(response.message);
    }
  }

  async findByCategory(category: DashboardCategory): Promise<DashboardData[]> {
    const response = await dashboardApi.getDashboardItemsByCategory(category);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }

  async findByStatus(status: DashboardStatus): Promise<DashboardData[]> {
    const response = await dashboardApi.getDashboardItemsByStatus(status);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }

  async getMetrics(): Promise<MetricCard[]> {
    const response = await dashboardApi.getMetrics();
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }

  async getChartData(): Promise<ChartData[]> {
    const response = await dashboardApi.getChartData();
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }

  async getActivities(): Promise<ActivityItem[]> {
    const response = await dashboardApi.getActivities();
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }
}