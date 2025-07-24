import React, { useState } from 'react';
import { AlertTriangle, Settings, Trash2, Eye } from 'lucide-react';
import AgingDataTable from '../components/lifecycle/AgingDataTable';
import CleanupReminder from '../components/lifecycle/CleanupReminder';

const Lifecycle: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('90');
  const [showCleanupModal, setShowCleanupModal] = useState(false);

  const agingData = [
    {
      id: 'LOG_2023_Q1_BATCH',
      createdDate: '2023-01-15',
      lastAccess: '2023-06-20',
      agingDays: 234,
      status: 'cleanup',
      size: '1.2 GB'
    },
    {
      id: 'USER_SESSION_2023',
      createdDate: '2023-03-10',
      lastAccess: '2023-08-15',
      agingDays: 156,
      status: 'warning',
      size: '0.8 GB'
    },
    {
      id: 'TEMP_CACHE_DATA',
      createdDate: '2023-05-20',
      lastAccess: '2023-09-10',
      agingDays: 98,
      status: 'warning',
      size: '0.3 GB'
    }
  ];

  const handleCleanup = (dataId: string) => {
    console.log('Cleaning up data:', dataId);
    setShowCleanupModal(true);
  };

  const handleViewDetail = (dataId: string) => {
    console.log('Viewing detail for:', dataId);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">数据生命周期监测</h2>
        <p className="text-gray-600">监控数据老化情况，智能提醒清理，优化存储资源</p>
      </div>

      {/* 清理提醒 */}
      <CleanupReminder 
        count={1247}
        size="2.34 GB"
        onClick={() => setShowCleanupModal(true)}
      />

      {/* 数据老化监控 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">数据老化监控</h3>
          <div className="flex space-x-2">
            <select 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部数据</option>
              <option value="30">老化&gt30天</option>
              <option value="90">老化&gt90天</option>
              <option value="180">老化&gt180天</option>
            </select>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center">
              <Settings className="w-4 h-4 mr-1" />
              规则配置
            </button>
          </div>
        </div>
        
        <AgingDataTable 
          data={agingData}
          filter={selectedFilter}
          onCleanup={handleCleanup}
          onViewDetail={handleViewDetail}
        />
      </div>

      {/* 清理确认模态框 */}
      {showCleanupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-800">确认数据清理</h3>
              <button 
                onClick={() => setShowCleanupModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">待清理数据量:</span>
                <span className="font-medium">1,247 条</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">总大小:</span>
                <span className="font-medium">2.34 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">释放空间:</span>
                <span className="font-medium text-green-600">2.34 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">业务影响:</span>
                <span className="font-medium">无关联活跃业务</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                确认清理
              </button>
              <button 
                onClick={() => setShowCleanupModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                延迟7天
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lifecycle;