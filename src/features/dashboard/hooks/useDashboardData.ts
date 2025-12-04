import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/lib/stores/rootReducer';
import type { DashboardData } from '@/features/dashboard/types/dashboard.types';
import { setSelectedItem } from '@/features/dashboard/stores/dashboard.slice';
import { fetchDashboardData } from '@/features/dashboard/stores/dashboard.saga';

interface UseDashboardDataReturn {
  data: DashboardData[];
  selectedItem: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  getItemById: (id: string) => DashboardData | null;
  selectItem: (item: DashboardData | null) => void;
  refreshData: () => void;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  const dispatch = useDispatch();
  const {
    items: data,
    selectedItem,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.dashboard);

  const getItemById = (id: string): DashboardData | null => {
    return data.find(item => item.id === id) || null;
  };

  const selectItem = (item: DashboardData | null) => {
    dispatch(setSelectedItem(item));
  };

  const refreshData = () => {
    dispatch(fetchDashboardData());
  };

  return {
    data,
    selectedItem,
    isLoading,
    error,
    getItemById,
    selectItem,
    refreshData,
  };
};