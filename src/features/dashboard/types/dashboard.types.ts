export type DashboardCategory = 'SALES' | 'MARKETING' | 'OPERATIONS' | 'FINANCE';
export type DashboardStatus = 'ACTIVE' | 'PENDING' | 'COMPLETED' | 'ARCHIVED';
export type ChangeType = 'INCREASE' | 'DECREASE';
export type ChartType = 'LINE' | 'DONUT' | 'PIE' | 'BAR';

export interface DashboardData {
  id: string;
  title: string;
  description?: string;
  value: number;
  category: DashboardCategory;
  status: DashboardStatus;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface MetricCard {
  id: string;
  title: string;
  value: number | string;
  change: number;
  changeType: ChangeType;
  icon?: string;
  color?: string;
}

export interface ColorTheme {
  primary: {
    blue: string;
    lightBlue: string;
    darkBlue: string;
  };
  status: {
    success: string;
    danger: string;
    warning: string;
    info: string;
  };
  background: {
    primary: string;
    secondary: string;
    card: string;
    border: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  date?: string;
  [key: string]: unknown;
}

export interface ChartConfig {
  responsive: boolean;
  showLegend: boolean;
  showTooltip: boolean;
  colors: string[];
  height?: number;
}

export interface ChartData {
  id: string;
  type: ChartType;
  title: string;
  data: ChartDataPoint[];
  config: ChartConfig;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  avatar?: string;
}

export interface DashboardState {
  items: DashboardData[];
  selectedItem: DashboardData | null;
  filters: DashboardFilters;
  metrics: MetricCard[];
  charts: ChartData[];
  activities: ActivityItem[];
  isLoading: boolean;
  error: string | null;
}

export interface DashboardFilters {
  category?: DashboardCategory;
  status?: DashboardStatus;
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateDashboardItemRequest {
  title: string;
  description?: string;
  value: number;
  category: DashboardCategory;
  status: DashboardStatus;
  metadata?: Record<string, unknown>;
}

export interface UpdateDashboardItemRequest {
  title?: string;
  description?: string;
  value?: number;
  category?: DashboardCategory;
  status?: DashboardStatus;
  metadata?: Record<string, unknown>;
}

export interface DashboardRepository {
  findAll(): Promise<DashboardData[]>;
  findById(id: string): Promise<DashboardData | null>;
  create(data: CreateDashboardItemRequest, createdBy: string): Promise<DashboardData>;
  update(id: string, data: UpdateDashboardItemRequest): Promise<DashboardData>;
  delete(id: string): Promise<void>;
  findByCategory(category: DashboardCategory): Promise<DashboardData[]>;
  findByStatus(status: DashboardStatus): Promise<DashboardData[]>;
  getMetrics(): Promise<MetricCard[]>;
  getChartData(): Promise<ChartData[]>;
  getActivities(): Promise<ActivityItem[]>;
}

export interface DashboardUseCase {
  getDashboardData(): Promise<DashboardData[]>;
  getDashboardMetrics(): Promise<MetricCard[]>;
  getChartData(): Promise<ChartData[]>;
  getActivities(): Promise<ActivityItem[]>;
  createDashboardItem(data: CreateDashboardItemRequest, createdBy: string): Promise<DashboardData>;
  updateDashboardItem(id: string, data: UpdateDashboardItemRequest): Promise<DashboardData>;
  deleteDashboardItem(id: string): Promise<void>;
  getDashboardItemById(id: string): Promise<DashboardData | null>;
  filterDashboardData(filters: DashboardFilters): Promise<DashboardData[]>;
}