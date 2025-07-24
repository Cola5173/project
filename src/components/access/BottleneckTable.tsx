import React from 'react';
import { FileText } from 'lucide-react';

interface Bottleneck {
  time: string;
  dataId: string;
  delayTime: number;
  responseTime: number;
  level: 'high' | 'medium' | 'low';
}

interface BottleneckTableProps {
  data: Bottleneck[];
  filter: string;
}

const BottleneckTable: React.FC<BottleneckTableProps> = ({ data, filter }) => {
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'high':
        return 'px-2 py-1 text-xs bg-red-100 text-red-600 rounded';
      case 'medium':
        return 'px-2 py-1 text-xs bg-yellow-100 text-yellow-600 rounded';
      case 'low':
        return 'px-2 py-1 text-xs bg-green-100 text-green-600 rounded';
      default:
        return 'px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '未知';
    }
  };

  const getDelayColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredData = data.filter(item => {
    if (filter === 'all') return true;
    return item.level === filter;
  });

  const handleViewLog = (dataId: string) => {
    console.log('Viewing log for:', dataId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-900">操作时间</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">数据ID</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">延迟时间</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">响应时间</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">瓶颈等级</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr 
              key={index}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="py-3 px-4 text-gray-600">{item.time}</td>
              <td className="py-3 px-4 font-medium text-gray-900">{item.dataId}</td>
              <td className="py-3 px-4">
                <span className={`font-bold ${getDelayColor(item.level)}`}>
                  {item.delayTime}ms
                </span>
              </td>
              <td className="py-3 px-4 text-gray-600">{item.responseTime}ms</td>
              <td className="py-3 px-4">
                <span className={getLevelBadge(item.level)}>
                  {getLevelText(item.level)}
                </span>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleViewLog(item.dataId)}
                  className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  查看日志
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          没有找到符合条件的瓶颈记录
        </div>
      )}
    </div>
  );
};

export default BottleneckTable;