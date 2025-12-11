export const colorTheme = {
  primary: {
    blue: '#3B82F6',
    lightBlue: '#EFF6FF',
    darkBlue: '#1E40AF',
  },
  status: {
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    info: '#6B7280',
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