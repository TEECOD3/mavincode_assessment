import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DashboardState, DashboardData, MetricCard, ChartData, ActivityItem, DashboardFilters } from '@/features/dashboard/types/dashboard.types';

const initialState: DashboardState = {
  items: [],
  selectedItem: null,
  filters: {},
  metrics: [],
  charts: [],
  activities: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<{
      items: DashboardData[];
      metrics: MetricCard[];
      charts: ChartData[];
      activities: ActivityItem[];
    }>) => {
      state.isLoading = false;
      state.items = action.payload.items;
      state.metrics = action.payload.metrics;
      state.charts = action.payload.charts;
      state.activities = action.payload.activities;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    createItemStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createItemSuccess: (state, action: PayloadAction<DashboardData>) => {
      state.isLoading = false;
      state.items.push(action.payload);
      state.error = null;
    },
    createItemFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateItemStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateItemSuccess: (state, action: PayloadAction<DashboardData>) => {
      state.isLoading = false;
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      if (state.selectedItem?.id === action.payload.id) {
        state.selectedItem = action.payload;
      }
      state.error = null;
    },
    updateItemFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    deleteItemStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteItemSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.items = state.items.filter(item => item.id !== action.payload);
      if (state.selectedItem?.id === action.payload) {
        state.selectedItem = null;
      }
      state.error = null;
    },
    deleteItemFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    setSelectedItem: (state, action: PayloadAction<DashboardData | null>) => {
      state.selectedItem = action.payload;
    },
    setFilters: (state, action: PayloadAction<DashboardFilters>) => {
      state.filters = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearData: (state) => {
      state.items = [];
      state.metrics = [];
      state.charts = [];
      state.activities = [];
      state.selectedItem = null;
      state.filters = {};
      state.error = null;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  createItemStart,
  createItemSuccess,
  createItemFailure,
  updateItemStart,
  updateItemSuccess,
  updateItemFailure,
  deleteItemStart,
  deleteItemSuccess,
  deleteItemFailure,
  setSelectedItem,
  setFilters,
  clearError,
  clearData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;