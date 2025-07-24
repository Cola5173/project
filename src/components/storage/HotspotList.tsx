import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';

interface HotspotItem {
  id: string;
  dataId: string;
  lastAccess: string;
  accessCount: number;
  level: 'high' | 'medium' | 'low';
}

const HotspotList: React.FC = () => {
  const hotspots: HotspotItem[] = [
    {
      id: 'hot001',
      dataId: 'USER_BEHAVIOR_2024',
      lastAccess: '2分钟前',
      accessCount: 2451,
      level: 'high'
    },
    {
      id: 'hot002',
      dataId: 'TRANSACTION_LOG',
      lastAccess: '5分钟前',
      accessCount: 1892,
      level: 'high'
    },
    {
      id: 'hot003',
      dataId: 'INVENTORY_DATA',
      lastAccess: '8分钟前',
      accessCount: 1234,
      level: 'medium'
    },
    {
      id: 'hot004',
      dataId: 'SESSION_CACHE',
      lastAccess: '12分钟前',
      accessCount: 987,
      level: 'medium'
    },
    {
      id: 'hot005',
      dataId: 'CONFIG_DATA',
      lastAccess: '15分钟前',
      accessCount: 654,
      level: 'low'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelTextColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {hotspots.map((hotspot) => (
        <div
          key={hotspot.id}
          className="flex items-center justify-between p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-3 ${getLevelColor(hotspot.level)}`}></div>
            <div>
              <p className="font-medium text-gray-900">数据ID: {hotspot.dataId}</p>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Clock className="w-3 h-3 mr-1" />
                <span>最近访问: {hotspot.lastAccess}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-bold ${getLevelTextColor(hotspot.level)}`}>
              {hotspot.accessCount.toLocaleString()}次
            </p>
            <p className="text-xs text-gray-500">今日访问</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotspotList;