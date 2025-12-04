import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ChartData } from '@/features/dashboard/types/dashboard.types';
import { colorTheme } from '@/lib/constants/theme';

interface PieChartProps {
  chartData: ChartData;
}

export const PieChart = ({ chartData }: PieChartProps) => {
  const { title, data, config } = chartData;

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={config.height || 300}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : '0'}%`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || config.colors[index % config.colors.length]} 
                />
              ))}
            </Pie>
            {config.showTooltip && (
              <Tooltip 
                contentStyle={{
                  backgroundColor: colorTheme.background.card,
                  border: `1px solid ${colorTheme.background.border}`,
                  borderRadius: '6px',
                }}
              />
            )}
            {config.showLegend && (
              <Legend 
                verticalAlign="bottom" 
                height={36}
                wrapperStyle={{ fontSize: '12px' }}
              />
            )}
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};