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
  createdAt: string; // ISO string instead of Date
  updatedAt: string; // ISO string instead of Date
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
    success: string; // Green for positive metrics
    danger: string;  // Red for negative metrics
    warning: string; // Yellow for neutral/warning
    info: string;    // Gray for info
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
  date?: string; // ISO string instead of Date
  [key: string]: unknown; // Index signature for Recharts compatibility
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
  timestamp: string; // ISO string instead of Date
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
    start: string; // ISO string instead of Date
    end: string; // ISO string instead of Date
  };
  search?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string; // ISO string instead of Date
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Request types
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

// Repository interfaces
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

// UseCase interfaces
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