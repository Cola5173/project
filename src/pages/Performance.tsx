import React, { useState } from 'react';
import { Download, Upload, Activity, Zap, TrendingUp, Settings } from 'lucide-react';
import PerformanceMetrics from '../components/performance/PerformanceMetrics';
import PerformanceChart from '../components/performance/PerformanceChart';
import QueryEfficiencyTable from '../components/performance/QueryEfficiencyTable';
import ContentionHeatmap from '../components/performance/ContentionHeatmap';

const Performance: React.FC = () => {
  const [chartPeriod, setChartPeriod] = useState('realtime');

  const metrics = [
    {
      title: '读取速率',
      value: '45.2 MB/s',
      change: '+12%',
      trend: 'up',
      icon: Download,
      color: 'green'
    },
    {
      title: '写入速率',
      value: '28.7 MB/s',
      change: '-5%',
      trend: 'down',
      icon: Upload,
      color: 'blue'
    },
    {
      title: '吞吐量',
      value: '1,247',
      unit: '次/秒',
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: 'purple'
    }
  ];

  const queries = [
    {
      id: 1,
      query: "SELECT * FROM users WHERE status='active' AND created_date > '2024-01-01'",
      executionTime: 1280,
      cpuUsage: 45,
      memoryUsage: 128,
      isSlow: true
    },
    {
      id: 2,
      query: "SELECT id, name FROM products WHERE category_id = 123",
      executionTime: 45,
      cpuUsage: 8,
      memoryUsage: 12,
      isSlow: false
    },
    {
      id: 3,
      query: "UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 456",
      executionTime: 89,
      cpuUsage: 15,
      memoryUsage: 24,
      isSlow: false
    }
  ];

  const contentionData = [
    {
      id: 1,
      resource: 'DB_001',
      time: '14:32:18',
      duration: 15,
      processes: ['web-server', 'batch-job'],
      level: 'high'
    },
    {
      id: 2,
      resource: 'CACHE_001',
      time: '14:31:45',
      duration: 3,
      processes: ['api-service', 'data-sync'],
      level: 'medium'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">数据资源性能监测</h2>
        <p className="text-gray-600">实时监控读写性能、查询效率和资源争用情况</p>
      </div>

      {/* 读写性能指标 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{metric.title}</h3>
              <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold text-${metric.color}-600 mb-2`}>
                {metric.value}
              </div>
              {metric.unit && (
                <div className="text-sm text-gray-600 mb-2">{metric.unit}</div>
              )}
              <div className="text-sm text-gray-600">实时速率</div>
              <div className="mt-2">
                <span className={`text-xs ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? '↑' : '↓'} {metric.change} 较昨日
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 性能波动图 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">24小时性能波动</h3>
          <div className="flex space-x-2">
            {['realtime', '1h', '24h'].map((period) => (
              <button
                key={period}
                onClick={() => setChartPeriod(period)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  chartPeriod === period
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period === 'realtime' ? '实时' : 
                 period === '1h' ? '近1小时' : '近24小时'}
              </button>
            ))}
          </div>
        </div>
        <div className="h-96">
          <PerformanceChart period={chartPeriod} />
        </div>
      </div>

      {/* 查询效率分析 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">查询效率分析</h3>
          <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center">
            <Zap className="w-4 h-4 mr-1" />
            批量优化
          </button>
        </div>
        <QueryEfficiencyTable data={queries} />
      </div>

      {/* 资源争用情况 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">资源争用热力图</h3>
        <ContentionHeatmap data={contentionData} />
      </div>
    </div>
  );
};

export default Performance;