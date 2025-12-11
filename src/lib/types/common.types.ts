
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  timestamp: Date
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type UserRole = 'ADMIN' | 'USER' | 'VIEWER'
export type DashboardCategory = 'SALES' | 'MARKETING' | 'OPERATIONS' | 'FINANCE'
export type DashboardStatus = 'ACTIVE' | 'PENDING' | 'COMPLETED' | 'ARCHIVED'