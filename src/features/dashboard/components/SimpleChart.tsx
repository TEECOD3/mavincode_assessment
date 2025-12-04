import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SimpleChartProps {
  title: string;
  data: Array<{ name: string; value: number; color: string }>;
  type?: 'donut' | 'pie';
}

export const SimpleChart = ({ title, data, type = 'donut' }: SimpleChartProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={type === 'donut' ? 40 : 0}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-gray-600">{entry.name}</span>
            </div>
            <span className="font-medium text-gray-900">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};