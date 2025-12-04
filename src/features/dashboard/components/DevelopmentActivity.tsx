import { Trash2Icon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const activityData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 25 },
  { name: 'Mar', value: 30 },
  { name: 'Apr', value: 45 },
  { name: 'May', value: 35 },
  { name: 'Jun', value: 40 },
  { name: 'Jul', value: 55 },
  { name: 'Aug', value: 65 },
  { name: 'Sep', value: 75 },
  { name: 'Oct', value: 85 },
];

const commits = [
  {
    user: 'Ronald Bradley',
    avatar: 'RB',
    commit: 'Initial commit',
    date: 'May 6, 2018',
    time: '⏰'
  },
  {
    user: 'Russell Gibson',
    avatar: 'RG',
    commit: 'Main structure',
    date: 'April 22, 2018',
    time: '⏰'
  },
  {
    user: 'Beverly Armstrong',
    avatar: 'BA',
    commit: 'Left sidebar adjustments',
    date: 'April 15, 2018',
    time: '⏰'
  }
];

export const DevelopmentActivity = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Development Activity</h3>
        <div className="flex items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Purchases</span>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
              />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 mb-3 uppercase tracking-wide">
          <div>USER</div>
          <div>COMMIT</div>
          <div>DATE</div>
        </div>
        
        <div className="space-y-3">
          {commits.map((commit, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-center py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">{commit.avatar}</span>
                </div>
                <span className="text-sm text-gray-900">{commit.user}</span>
              </div>
              <div className="text-sm text-gray-600">{commit.commit}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{commit.date}</span>
                <Trash2Icon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};