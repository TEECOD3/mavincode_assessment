import { MetricCard } from '@/features/dashboard/components/MetricCard';
import { DevelopmentActivity } from '@/features/dashboard/components/DevelopmentActivity';
import { SimpleChart } from '@/features/dashboard/components/SimpleChart';
import { DocumentationBanner } from '@/features/dashboard/components/DocumentationBanner';
import { InfoCard } from '@/features/dashboard/components/InfoCard';

export const Component = () => {
  // Sample data matching the design
  const metrics = [
    { title: 'New Tickets', value: '43', change: 6, isPositive: true },
    { title: 'Closed Today', value: '17', change: 3, isPositive: false },
    { title: 'New Replies', value: '7', change: 9, isPositive: true },
    { title: 'Followers', value: '27.3k', change: 3, isPositive: true },
    { title: 'Daily earnings', value: '$95', change: 2, isPositive: false },
    { title: 'Products', value: '621', change: 1, isPositive: false },
  ];

  const chartData1 = [
    { name: 'Complete', value: 60, color: '#22C55E' },
    { name: 'Remaining', value: 40, color: '#E5E7EB' },
  ];

  const chartData2 = [
    { name: 'Desktop', value: 47.4, color: '#1E40AF' },
    { name: 'Tablet', value: 33.1, color: '#3B82F6' },
    { name: 'Mobile', value: 19.5, color: '#93C5FD' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              isPositive={metric.isPositive}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Development Activity */}
          <div className="lg:col-span-1">
            <DevelopmentActivity />
          </div>

          {/* Middle Column - Charts */}
          <div className="lg:col-span-1 space-y-6">
             <DocumentationBanner />

             <div className="grid-cols-1 md:grid-cols-2 grid gap-10">
                <SimpleChart
              title="Chart title"
              data={chartData1}
              type="donut"
            />
            <SimpleChart
              title="Chart title"
              data={chartData2}
              type="pie"
            />

             </div>
          
               
            <div className=" gap-2 grid grid-cols-1  md:grid-cols-2">
              <InfoCard title="New feedback" />
              <InfoCard title="Today profit" />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Component;