import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/lib/stores/rootReducer';
import type { ChartData } from '@/features/dashboard/types/dashboard.types';
import { fetchDashboardData } from '@/features/dashboard/stores/dashboard.saga';

interface UseChartsReturn {
  charts: ChartData[];
  isLoading: boolean;
  error: string | null;
  refreshCharts: () => void;
  getChartById: (id: string) => ChartData | null;
}

export const useCharts = (): UseChartsReturn => {
  const dispatch = useDispatch();
  const {
    charts,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.dashboard);

  const refreshCharts = () => {
    dispatch(fetchDashboardData());
  };

  const getChartById = (id: string): ChartData | null => {
    return charts.find(chart => chart.id === id) || null;
  };

  return {
    charts,
    isLoading,
    error,
    refreshCharts,
    getChartById,
  };
};