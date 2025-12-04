import type {
  DashboardData,
  MetricCard,
  ChartData,
  ActivityItem,
  CreateDashboardItemRequest,
  UpdateDashboardItemRequest,
  DashboardFilters,
  DashboardCategory,
  DashboardStatus,
} from '@/features/dashboard/types/dashboard.types';
import { DashboardRepositoryImpl } from './dashboard.repository';

export class DashboardService {
  private dashboardRepository: DashboardRepositoryImpl;

  constructor() {
    this.dashboardRepository = new DashboardRepositoryImpl();
  }

  async getAllDashboardData(): Promise<DashboardData[]> {
    try {
      return await this.dashboardRepository.findAll();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve dashboard data');
    }
  }

  async getDashboardItemById(id: string): Promise<DashboardData | null> {
    if (!id || id.trim() === '') {
      throw new Error('Dashboard item ID is required');
    }

    try {
      return await this.dashboardRepository.findById(id);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve dashboard item');
    }
  }

  async createDashboardItem(data: CreateDashboardItemRequest, createdBy: string): Promise<DashboardData> {
    if (!data.title || data.title.trim() === '') {
      throw new Error('Title is required');
    }

    if (typeof data.value !== 'number' || isNaN(data.value)) {
      throw new Error('Value must be a valid number');
    }

    if (!data.category) {
      throw new Error('Category is required');
    }

    if (!data.status) {
      throw new Error('Status is required');
    }

    if (!createdBy || createdBy.trim() === '') {
      throw new Error('Created by user ID is required');
    }

    const validCategories: DashboardCategory[] = ['SALES', 'MARKETING', 'OPERATIONS', 'FINANCE'];
    if (!validCategories.includes(data.category)) {
      throw new Error('Invalid category. Must be one of: SALES, MARKETING, OPERATIONS, FINANCE');
    }

    const validStatuses: DashboardStatus[] = ['ACTIVE', 'PENDING', 'COMPLETED', 'ARCHIVED'];
    if (!validStatuses.includes(data.status)) {
      throw new Error('Invalid status. Must be one of: ACTIVE, PENDING, COMPLETED, ARCHIVED');
    }

    try {
      return await this.dashboardRepository.create(data, createdBy);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create dashboard item');
    }
  }

  async updateDashboardItem(id: string, data: UpdateDashboardItemRequest): Promise<DashboardData> {
    if (!id || id.trim() === '') {
      throw new Error('Dashboard item ID is required');
    }

    if (data.title !== undefined && data.title.trim() === '') {
      throw new Error('Title cannot be empty');
    }

    if (data.value !== undefined && (typeof data.value !== 'number' || isNaN(data.value))) {
      throw new Error('Value must be a valid number');
    }

    if (data.category !== undefined) {
      const validCategories: DashboardCategory[] = ['SALES', 'MARKETING', 'OPERATIONS', 'FINANCE'];
      if (!validCategories.includes(data.category)) {
        throw new Error('Invalid category. Must be one of: SALES, MARKETING, OPERATIONS, FINANCE');
      }
    }

    if (data.status !== undefined) {
      const validStatuses: DashboardStatus[] = ['ACTIVE', 'PENDING', 'COMPLETED', 'ARCHIVED'];
      if (!validStatuses.includes(data.status)) {
        throw new Error('Invalid status. Must be one of: ACTIVE, PENDING, COMPLETED, ARCHIVED');
      }
    }

    try {
      return await this.dashboardRepository.update(id, data);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update dashboard item');
    }
  }

  async deleteDashboardItem(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new Error('Dashboard item ID is required');
    }

    try {
      await this.dashboardRepository.delete(id);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to delete dashboard item');
    }
  }

  async filterDashboardData(filters: DashboardFilters): Promise<DashboardData[]> {
    try {
      let data = await this.dashboardRepository.findAll();

      if (filters.category) {
        data = data.filter(item => item.category === filters.category);
      }

      if (filters.status) {
        data = data.filter(item => item.status === filters.status);
      }

      if (filters.dateRange) {
        data = data.filter(item => {
          const itemDate = item.updatedAt;
          return itemDate >= filters.dateRange!.start && itemDate <= filters.dateRange!.end;
        });
      }

      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase().trim();
        data = data.filter(item =>
          item.title.toLowerCase().includes(searchTerm) ||
          (item.description && item.description.toLowerCase().includes(searchTerm))
        );
      }

      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to filter dashboard data');
    }
  }

  async getDashboardMetrics(): Promise<MetricCard[]> {
    try {
      return await this.dashboardRepository.getMetrics();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve dashboard metrics');
    }
  }

  async getChartData(): Promise<ChartData[]> {
    try {
      return await this.dashboardRepository.getChartData();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve chart data');
    }
  }

  async getActivities(): Promise<ActivityItem[]> {
    try {
      return await this.dashboardRepository.getActivities();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve activities');
    }
  }

  async getDashboardItemsByCategory(category: DashboardCategory): Promise<DashboardData[]> {
    const validCategories: DashboardCategory[] = ['SALES', 'MARKETING', 'OPERATIONS', 'FINANCE'];
    if (!validCategories.includes(category)) {
      throw new Error('Invalid category. Must be one of: SALES, MARKETING, OPERATIONS, FINANCE');
    }

    try {
      return await this.dashboardRepository.findByCategory(category);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve dashboard items by category');
    }
  }

  async getDashboardItemsByStatus(status: DashboardStatus): Promise<DashboardData[]> {
    const validStatuses: DashboardStatus[] = ['ACTIVE', 'PENDING', 'COMPLETED', 'ARCHIVED'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status. Must be one of: ACTIVE, PENDING, COMPLETED, ARCHIVED');
    }

    try {
      return await this.dashboardRepository.findByStatus(status);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to retrieve dashboard items by status');
    }
  }
}

export const dashboardService = new DashboardService();