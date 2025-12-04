import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/features/authentication/stores/auth.slice'
import dashboardReducer from '@/features/dashboard/stores/dashboard.slice'

// Placeholder reducers - will be replaced with actual feature reducers
const uiReducer = (state = { sidebarOpen: false, theme: 'LIGHT' }) => state

export const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  ui: uiReducer,
})

export type RootState = ReturnType<typeof rootReducer>