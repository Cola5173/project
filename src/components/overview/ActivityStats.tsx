import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getRandomCount = () => Math.floor(Math.random() * 7001) + 3000; // 3000-10000

const ActivityStats: React.FC = () => {
  const [activityType, setActivityType] = useState('high');

  const highFrequencyData = [
    { id: 'data001', name: '用户行为数据', business: '电商系统', count: getRandomCount() },
    { id: 'data002', name: '交易流水数据', business: '支付系统', count: getRandomCount() },
    { id: 'data003', name: '库存管理数据', business: '仓储系统', count: getRandomCount() },
    { id: 'data004', name: '日志数据', business: '监控系统', count: getRandomCount() },
    { id: 'data005', name: '配置信息', business: '管理系统', count: getRandomCount() },
  ];

  const lowFrequencyData = [
    { id: 'data006', name: '历史归档', business: '归档系统', count: getRandomCount() },
    { id: 'data007', name: '测试数据', business: '测试系统', count: getRandomCount() },
    { id: 'data008', name: '临时表', business: '临时系统', count: getRandomCount() },
    { id: 'data009', name: '备份数据', business: '备份系统', count: getRandomCount() },
    { id: 'data010', name: '旧日志', business: '日志系统', count: getRandomCount() },
  ];

  // 按activityType排序
  const sortedData = activityType === 'high'
    ? [...highFrequencyData].sort((a, b) => b.count - a.count)
    : [...lowFrequencyData].sort((a, b) => a.count - b.count);

  const chartData = {
    labels: sortedData.map(item => item.name),
    datasets: [
      {
        label: '访问次数',
        data: sortedData.map(item => item.count),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mr-4">数据活跃度统计</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setActivityType('high')}
            className={`px-4 py-2 text-sm rounded transition-colors ${
              activityType === 'high'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            高频数据
          </button>
          <button
            onClick={() => setActivityType('low')}
            className={`px-4 py-2 text-sm rounded transition-colors ${
              activityType === 'low'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            低频数据
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Top 10 {activityType === 'high' ? '高频' : '低频'}数据</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {sortedData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">所属业务: {item.business}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{item.count.toLocaleString()}次</p>
                  <p className="text-xs text-gray-500">近7天</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityStats;