import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface HealthItem {
  id: number;
  type: 'normal' | 'warning' | 'error';
  icon: LucideIcon;
  message: string;
  detail: string;
  color: string;
}

interface HealthStatusProps {
  score: number;
  items: HealthItem[];
}

const HealthStatus: React.FC<HealthStatusProps> = ({ score, items }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'normal': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreColor(score)}`}>
          <span className="text-2xl font-bold">{score}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">健康评分</p>
      </div>
      
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-2 rounded transition-colors ${
                item.type === 'warning' ? 'hover:bg-gray-50 cursor-pointer' : ''
              }`}
            >
              <div className="flex items-center">
                <Icon className={`w-4 h-4 mr-2 ${getItemColor(item.type)}`} />
                <span className="text-sm text-gray-900">{item.message}</span>
              </div>
              <span className="text-xs text-gray-500">{item.detail}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>建议:</strong> 定期清理临时文件，优化查询语句，监控内存使用情况
        </p>
      </div>
    </div>
  );
};

export default HealthStatus;