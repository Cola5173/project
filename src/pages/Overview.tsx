import React, { useState } from 'react';
import { Server, Cloud, AlertTriangle, TrendingUp, Activity, Database } from 'lucide-react';
import ResourceDistribution from '../components/overview/ResourceDistribution';
import CapacityTrends from '../components/overview/CapacityTrends';
import ActivityStats from '../components/overview/ActivityStats';
import MetricCard from '../components/common/MetricCard';

const Overview: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const resourceNodes = [
    {
      id: 'server1',
      name: '服务器-01',
      type: 'server',
      status: 'normal',
      usage: 85,
      icon: Server,
      color: 'blue'
    },
    {
      id: 'server2',
      name: '服务器-02',
      type: 'server',
      status: 'normal',
      usage: 62,
      icon: Server,
      color: 'green'
    },
    {
      id: 'server3',
      name: '服务器-03',
      type: 'server',
      status: 'warning',
      usage: 92,
      icon: Server,
      color: 'yellow'
    },
    {
      id: 'cloud1',
      name: '云存储-01',
      type: 'cloud',
      status: 'normal',
      usage: 45,
      icon: Cloud,
      color: 'purple'
    }
  ];

  const metrics = [
    {
      title: '总存储容量',
      value: '2.5 TB',
      change: '+12%',
      trend: 'up',
      icon: Database,
      color: 'blue'
    },
    {
      title: '已用容量',
      value: '1.87 TB',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: '活跃数据源',
      value: '156',
      change: '+5%',
      trend: 'up',
      icon: Activity,
      color: 'purple'
    },
    {
      title: '待处理告警',
      value: '3',
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">数据资源概览</h2>
        <p className="text-gray-600">全面掌握数据资源分布、容量使用和活跃度情况</p>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* 资源分布图 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">资源分布图</h3>
          <div className="flex space-x-2">
            {['all', 'structured', 'unstructured', 'local', 'cloud'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedFilter === filter
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? '全部' : 
                 filter === 'structured' ? '结构化' :
                 filter === 'unstructured' ? '非结构化' :
                 filter === 'local' ? '本地' : '云端'}
              </button>
            ))}
          </div>
        </div>
        <ResourceDistribution nodes={resourceNodes} selectedFilter={selectedFilter} />
      </div>

      {/* 容量使用情况和数据活跃度 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CapacityTrends />
        <ActivityStats />
      </div>
    </div>
  );
};

export default Overview;