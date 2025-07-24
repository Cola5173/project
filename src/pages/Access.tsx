import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Users, AlertCircle } from 'lucide-react';
import AccessFrequencyChart from '../components/access/AccessFrequencyChart';
import UserGroupChart from '../components/access/UserGroupChart';
import AccessSourceTable from '../components/access/AccessSourceTable';
import BottleneckTable from '../components/access/BottleneckTable';

const Access: React.FC = () => {
  const [accessType, setAccessType] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [bottleneckFilter, setBottleneckFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const accessSources = [
    {
      ip: '192.168.1.101',
      application: 'Web管理系统',
      accessCount: 1245,
      operations: ['read', 'write'],
      lastAccess: '3分钟前'
    },
    {
      ip: '10.0.0.52',
      application: 'API服务',
      accessCount: 892,
      operations: ['read'],
      lastAccess: '1分钟前'
    },
    {
      ip: '172.16.0.23',
      application: '数据同步服务',
      accessCount: 567,
      operations: ['write'],
      lastAccess: '5分钟前'
    }
  ];

  const bottlenecks = [
    {
      time: '2024-01-15 14:32:15',
      dataId: 'LARGE_DATASET_001',
      delayTime: 1250,
      responseTime: 1890,
      level: 'high'
    },
    {
      time: '2024-01-15 14:28:42',
      dataId: 'USER_QUERY_CACHE',
      delayTime: 680,
      responseTime: 920,
      level: 'medium'
    },
    {
      time: '2024-01-15 14:25:18',
      dataId: 'BATCH_PROCESS_DATA',
      delayTime: 320,
      responseTime: 450,
      level: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">数据访问监测</h2>
        <p className="text-gray-600">监控数据访问频次、来源分析和性能瓶颈识别</p>
      </div>

      {/* 访问频次统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">访问频次趋势</h3>
            <div className="flex space-x-2">
              {['all', 'read', 'write'].map((type) => (
                <button
                  key={type}
                  onClick={() => setAccessType(type)}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    accessType === type
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? '全部' : type === 'read' ? '读操作' : '写操作'}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <AccessFrequencyChart type={accessType} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">用户群体访问占比</h3>
          <div className="h-64">
            <UserGroupChart />
          </div>
        </div>
      </div>

      {/* 访问来源分析 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">访问来源分析</h3>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="搜索IP或应用..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select 
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部来源</option>
              <option value="internal">内部IP</option>
              <option value="external">外部IP</option>
            </select>
          </div>
        </div>
        <AccessSourceTable 
          data={accessSources}
          filter={sourceFilter}
          searchTerm={searchTerm}
        />
      </div>

      {/* 性能瓶颈识别 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">性能瓶颈识别</h3>
          <select 
            value={bottleneckFilter}
            onChange={(e) => setBottleneckFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">全部等级</option>
            <option value="high">高风险</option>
            <option value="medium">中风险</option>
            <option value="low">低风险</option>
          </select>
        </div>
        <BottleneckTable 
          data={bottlenecks}
          filter={bottleneckFilter}
        />
      </div>
    </div>
  );
};

export default Access;