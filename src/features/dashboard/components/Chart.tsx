import type { ChartData } from '@/features/dashboard/types/dashboard.types';
import { LineChart } from './LineChart';
import { DonutChart } from './DonutChart';
import { PieChart } from './PieChart';

interface ChartProps {
  chartData: ChartData;
}

export const Chart = ({ chartData }: ChartProps) => {
  switch (chartData.type) {
    case 'LINE':
      return <LineChart chartData={chartData} />;
    case 'DONUT':
      return <DonutChart chartData={chartData} />;
    case 'PIE':
      return <PieChart chartData={chartData} />;
    case 'BAR':
      return <LineChart chartData={chartData} />;
    default:
      return (
        <div className="p-4 text-center text-gray-500">
          Unsupported chart type: {chartData.type}
        </div>
      );
  }
};