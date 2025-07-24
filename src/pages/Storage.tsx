import React, { useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Triangle as ExclamationTriangle } from 'lucide-react';
import StorageTrendChart from '../components/storage/StorageTrendChart';
import HotspotList from '../components/storage/HotspotList';
import HealthStatus from '../components/storage/HealthStatus';

const Storage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7');

  const healthItems = [
    {
      id: 1,
      type: 'normal',
      icon: CheckCircle,
      message: '磁盘空间正常',
      detail: '85% 可用',
      color: 'green'
    },
    {
      id: 2,
      type: 'warning',
      icon: ExclamationTriangle,
      message: '内存使用率偏高',
      detail: '87% 使用',
      color: 'yellow'
    },
    {
      id: 3,
      type: 'normal',
      icon: CheckCircle,
      message: '网络连接稳定',
      detail: '正常',
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">数据存储监测</h2>
        <p className="text-gray-600">监控存储使用趋势、识别热点数据，保障存储健康</p>
      </div>

      {/* 存储使用趋势 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">存储使用趋势</h3>
          <div className="flex space-x-2">
            {['7', '30', '90'].map((days) => (
              <button
                key={days}
                onClick={() => setSelectedPeriod(days)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  selectedPeriod === days
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                近{days}天
              </button>
            ))}
          </div>
        </div>
        <div className="h-96">
          <StorageTrendChart period={selectedPeriod} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 热点数据识别 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">热点数据识别</h3>
          <HotspotList />
        </div>

        {/* 存储健康状态 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">存储健康状态</h3>
          <HealthStatus score={87} items={healthItems} />
        </div>
      </div>
    </div>
  );
};

export default Storage;