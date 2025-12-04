export const colorTheme = {
  primary: {
    blue: '#3B82F6',
    lightBlue: '#EFF6FF',
    darkBlue: '#1E40AF',
  },
  status: {
    success: '#10B981', // Green for positive metrics
    danger: '#EF4444',  // Red for negative metrics
    warning: '#F59E0B', // Yellow for neutral/warning
    info: '#6B7280',    // Gray for info
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    card: '#FFFFFF',
    border: '#E5E7EB',
  },
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    muted: '#9CA3AF',
  },
} as const

export type ColorTheme = typeof colorTheme