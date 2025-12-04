/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  DashboardData,
  MetricCard,
  ChartData,
  ActivityItem,
  CreateDashboardItemRequest,
  UpdateDashboardItemRequest,
  ApiResponse,
  DashboardCategory,
  DashboardStatus,
} from '@/features/dashboard/types/dashboard.types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

class DashboardApi {
  private async loadDashboardData(): Promise<DashboardData[]> {
    try {
      const response = await fetch('/data/dashboard.json');
      if (!response.ok) {
        throw new Error('Failed to load dashboard data');
      }
      const data = await response.json();
      return data.map((item: any) => ({
        ...item,
        createdAt: item.createdAt, // Keep as ISO string
        updatedAt: item.updatedAt, // Keep as ISO string
      }));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      throw new Error('Failed to load dashboard data');
    }
  }

  private async loadMetrics(): Promise<MetricCard[]> {
    try {
      const response = await fetch('/data/metrics.json');
      if (!response.ok) {
        throw new Error('Failed to load metrics data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading metrics:', error);
      throw new Error('Failed to load metrics data');
    }
  }

  private async loadChartData(): Promise<ChartData[]> {
    try {
      const response = await fetch('/data/charts.json');
      if (!response.ok) {
        throw new Error('Failed to load chart data');
      }
      const data = await response.json();
      return data.map((chart: any) => ({
        ...chart,
        data: chart.data.map((point: any) => ({
          ...point,
          date: point.date || undefined, // Keep as ISO string
        })),
      }));
    } catch (error) {
      console.error('Error loading chart data:', error);
      throw new Error('Failed to load chart data');
    }
  }

  private async loadActivities(): Promise<ActivityItem[]> {
    try {
      const response = await fetch('/data/activities.json');
      if (!response.ok) {
        throw new Error('Failed to load activities data');
      }
      const data = await response.json();
      return data.map((activity: any) => ({
        ...activity,
        timestamp: activity.timestamp, // Keep as ISO string
      }));
    } catch (error) {
      console.error('Error loading activities:', error);
      throw new Error('Failed to load activities data');
    }
  }

  private async saveDashboardData(data: DashboardData[]): Promise<void> {
    const serializedData = data.map(item => ({
      ...item,
      createdAt: item.createdAt, // Already ISO string
      updatedAt: item.updatedAt, // Already ISO string
    }));
    localStorage.setItem('dashboard_data', JSON.stringify(serializedData));
  }

  private async getStoredDashboardData(): Promise<DashboardData[] | null> {
    try {
      const stored = localStorage.getItem('dashboard_data');
      if (!stored) return null;
      
      const data = JSON.parse(stored);
      return data.map((item: any) => ({
        ...item,
        createdAt: item.createdAt, // Keep as ISO string
        updatedAt: item.updatedAt, // Keep as ISO string
      }));
    } catch {
      return null;
    }
  }

  async getAllDashboardData(): Promise<ApiResponse<DashboardData[]>> {
    await delay(300);

    try {
      let data = await this.getStoredDashboardData();
      if (!data) {
        data = await this.loadDashboardData();
      }

      return {
        data,
        message: 'Dashboard data retrieved successfully',
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: [],
        message: error instanceof Error ? error.message : 'Failed to retrieve dashboard data',
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getDashboardItemById(id: string): Promise<ApiResponse<DashboardData | null>> {
    await delay(200);

    try {
      let data = await this.getStoredDashboardData();
      if (!data) {
        data = await this.loadDashboardData();
      }

      const item = data.find(item => item.id === id);

      return {
        data: item || null,
        message: item ? 'Dashboard item retrieved successfully' : 'Dashboard item not found',
        success: !!item,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: null,
        message: error instanceof Error ? error.message : 'Failed to retrieve dashboard item',
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async createDashboardItem(
    itemData: CreateDashboardItemRequest,
    createdBy: string
  ): Promise<ApiResponse<DashboardData>> {
    await delay(400);

    try {
      let data = await this.getStoredDashboardData();
      if (!data) {
        data = await this.loadDashboardData();
      }

      const newItem: DashboardData = {
        id: generateId(),
        ...itemData,
        metadata: itemData.metadata || {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy,
      };

      data.push(newItem);
      await this.saveDashboardData(data);

      return {
        data: newItem,
        message: 'Dashboard item created successfully',
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: null as any,
        message: error instanceof Error ? error.message : 'Failed to create dashboard item',
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async updateDashboardItem(
    id: string,
    updateData: UpdateDashboardItemRequest
  ): Promise<ApiResponse<DashboardData>> {
    await delay(350);

    try {
      let data = await this.getStoredDashboardData();
      if (!data) {
        data = await this.loadDashboardData();
      }

      const itemIndex = data.findIndex(item => item.id === id);
      if (itemIndex === -1) {
        return {
          data: null as any,
          message: 'Dashboard item not found',
          success: false,
          timestamp: new Date().toISOString(),
        };
      }

      const updatedItem: DashboardData = {
        ...data[itemIndex],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      data[itemIndex] = updatedItem;
      await this.saveDashboardData(data);

      return {
        data: updatedItem,
        message: 'Dashboard item updated successfully',
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: null as any,
        message: error instanceof Error ? error.message : 'Failed to update dashboard item',
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async deleteDashboardItem(id: string): Promise<ApiResponse<void>> {
    await delay(300);

    try {
      let data = await this.getStoredDashboardData();
      if (!data) {
        data = await this.loadDashboardData();
      }

      const itemIndex = data.findIndex(item => item.id === id);
      if (itemIndex === -1) {
        return {
          data: undefined as any,
          message: 'Dashboard item not found',
          success: false,
          timestamp: new Date().toISOString(),
        };
      }

      data.splice(itemIndex, 1);
      await this.saveDashboardData(data);

      return {
        data: undefined as any,
        message: 'Dashboard item deleted successfully',
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: undefined as any,
        message: error instanceof Error ? error.message : 'Failed to delete dashboard item',
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getDashboardItemsByCategory(category: DashboardCategory): Promise<ApiResponse<DashboardData[]>> {
    await delay(250);

    try {
      let data = await this.getStoredDashboardData();
      if (!data) {
        data = await this.loadDashboardData();
      }

      const filteredData = data.filter(item => item.category === category);

      return {
        data: filteredData,
        message: `Dashboard items for category ${category} retrieved successfully`,
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: [],
        message: error instanceof Error ? error.message : 'Failed to retrieve dashboard items by category',
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getDashboardItemsByStatus(status: DashboardStatus): Promise<ApiResponse<DashboardData[]>> {
    await delay(250);

    try {
      let data = await this.getStoredDashboardData();
      if (!data) {
        data = await this.loadDashboardData();
      }

      const filteredData = data.filter(item => item.status === status);

      return {
        data: filteredData,
        message: `Dashboard items with status ${status} retrieved successfully`,
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: [],
        message: error instanceof Error ? error.message : 'Failed to retrieve dashboard items by status',
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getMetrics(): Promise<ApiResponse<MetricCard[]>> {
    await delay(200);

    try {
      const metrics = await this.loadMetrics();

      return {
        data: metrics,
        message: 'Metrics retrieved successfully',
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: [],
        message: error instanceof Error ? error.message : 'Failed to retrieve metrics',
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getChartData(): Promise<ApiResponse<ChartData[]>> {
    await delay(250);

    try {
      const charts = await this.loadChartData();

      return {
        data: charts,
        message: 'Chart data retrieved successfully',
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: [],
        message: error instanceof Error ? error.message : 'Failed to retrieve chart data',
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getActivities(): Promise<ApiResponse<ActivityItem[]>> {
    await delay(150);

    try {
      const activities = await this.loadActivities();

      return {
        data: activities,
        message: 'Activities retrieved successfully',
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: [],
        message: error instanceof Error ? error.message : 'Failed to retrieve activities',
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }
}

export const dashboardApi = new DashboardApi();