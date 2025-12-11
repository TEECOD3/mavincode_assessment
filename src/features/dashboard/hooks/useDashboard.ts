import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/stores/rootReducer";
import type {
  DashboardFilters,
  CreateDashboardItemRequest,
  UpdateDashboardItemRequest,
} from "@/features/dashboard/types/dashboard.types";
import {
  fetchDashboardData,
  createDashboardItem,
  updateDashboardItem,
  deleteDashboardItem,
  filterDashboardData,
} from "@/features/dashboard/stores/dashboard.saga";
import {
  clearError,
  setSelectedItem,
} from "@/features/dashboard/stores/dashboard.slice";

interface UseDashboardReturn {
  dashboardData: RootState["dashboard"]["items"];
  metrics: RootState["dashboard"]["metrics"];
  charts: RootState["dashboard"]["charts"];
  activities: RootState["dashboard"]["activities"];
  selectedItem: RootState["dashboard"]["selectedItem"];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  createItem: (data: CreateDashboardItemRequest, createdBy: string) => void;
  updateItem: (id: string, data: UpdateDashboardItemRequest) => void;
  deleteItem: (id: string) => void;
  filterData: (filters: DashboardFilters) => void;
  selectItem: (item: RootState["dashboard"]["selectedItem"]) => void;
  clearError: () => void;
}

export const useDashboard = (): UseDashboardReturn => {
  const dispatch = useDispatch();
  const {
    items: dashboardData,
    metrics,
    charts,
    activities,
    selectedItem,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.dashboard);

  const refreshData = useCallback(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const createItem = (data: CreateDashboardItemRequest, createdBy: string) => {
    dispatch(createDashboardItem(data, createdBy));
  };

  const updateItem = (id: string, data: UpdateDashboardItemRequest) => {
    dispatch(updateDashboardItem(id, data));
  };

  const deleteItem = (id: string) => {
    dispatch(deleteDashboardItem(id));
  };

  const filterData = (filters: DashboardFilters) => {
    dispatch(filterDashboardData(filters));
  };

  const selectItem = (item: RootState["dashboard"]["selectedItem"]) => {
    dispatch(setSelectedItem(item));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return {
    dashboardData,
    metrics,
    charts,
    activities,
    selectedItem,
    isLoading,
    error,
    refreshData,
    createItem,
    updateItem,
    deleteItem,
    filterData,
    selectItem,
    clearError: handleClearError,
  };
};
