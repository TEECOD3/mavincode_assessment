interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  isPositive: boolean;
}

export const MetricCard = ({ title, value, change, isPositive }: MetricCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
      <div className="flex items-center justify-center mb-2">
        <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
        <span className={`ml-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '▲' : '▼'}
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-500">
        {title}
      </div>
    </div>
  );
};