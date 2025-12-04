import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ChartData } from '@/features/dashboard/types/dashboard.types';
import { colorTheme } from '@/lib/constants/theme';

interface LineChartProps {
  chartData: ChartData;
}

export const LineChart = ({ chartData }: LineChartProps) => {
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
          <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colorTheme.background.border} />
            <XAxis 
              dataKey="label" 
              stroke={colorTheme.text.secondary}
              fontSize={12}
            />
            <YAxis 
              stroke={colorTheme.text.secondary}
              fontSize={12}
            />
            {config.showTooltip && (
              <Tooltip 
                contentStyle={{
                  backgroundColor: colorTheme.background.card,
                  border: `1px solid ${colorTheme.background.border}`,
                  borderRadius: '6px',
                }}
              />
            )}
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={config.colors[0] || colorTheme.primary.blue}
              strokeWidth={2}
              dot={{ fill: config.colors[0] || colorTheme.primary.blue, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: config.colors[0] || colorTheme.primary.blue, strokeWidth: 2 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};