import React from 'react';
import { Eye, Trash2 } from 'lucide-react';

interface AgingDataItem {
  id: string;
  createdDate: string;
  lastAccess: string;
  agingDays: number;
  status: 'cleanup' | 'warning' | 'normal';
  size: string;
}

interface AgingDataTableProps {
  data: AgingDataItem[];
  filter: string;
  onCleanup: (dataId: string) => void;
  onViewDetail: (dataId: string) => void;
}

const AgingDataTable: React.FC<AgingDataTableProps> = ({ 
  data, 
  filter, 
  onCleanup, 
  onViewDetail 
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'cleanup':
        return 'px-2 py-1 text-xs bg-red-100 text-red-600 rounded';
      case 'warning':
        return 'px-2 py-1 text-xs bg-yellow-100 text-yellow-600 rounded';
      case 'normal':
        return 'px-2 py-1 text-xs bg-green-100 text-green-600 rounded';
      default:
        return 'px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'cleanup': return '待清理';
      case 'warning': return '预警';
      case 'normal': return '正常';
      default: return '未知';
    }
  };

  const getAgingColor = (days: number) => {
    if (days > 180) return 'text-red-600';
    if (days > 90) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredData = data.filter(item => {
    if (filter === 'all') return true;
    const filterDays = parseInt(filter);
    return item.agingDays > filterDays;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-900">数据ID</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">产生时间</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">最后访问</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">老化天数</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">大小</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">状态</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr 
              key={item.id}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="py-3 px-4 font-medium text-gray-900">{item.id}</td>
              <td className="py-3 px-4 text-gray-600">{item.createdDate}</td>
              <td className="py-3 px-4 text-gray-600">{item.lastAccess}</td>
              <td className="py-3 px-4">
                <span className={`font-bold ${getAgingColor(item.agingDays)}`}>
                  {item.agingDays}天
                </span>
              </td>
              <td className="py-3 px-4 text-gray-600">{item.size}</td>
              <td className="py-3 px-4">
                <span className={getStatusBadge(item.status)}>
                  {getStatusText(item.status)}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCleanup(item.id);
                    }}
                    className="text-red-600 hover:text-red-800 transition-colors flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    清理
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetail(item.id);
                    }}
                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    详情
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          没有找到符合条件的数据
        </div>
      )}
    </div>
  );
};

export default AgingDataTable;