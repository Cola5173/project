import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AccessSource {
  ip: string;
  application: string;
  accessCount: number;
  operations: string[];
  lastAccess: string;
}

interface AccessSourceTableProps {
  data: AccessSource[];
  filter: string;
  searchTerm: string;
}

const AccessSourceTable: React.FC<AccessSourceTableProps> = ({ data, filter, searchTerm }) => {
  const getOperationBadge = (operation: string) => {
    return operation === 'read' 
      ? 'px-2 py-1 text-xs bg-green-100 text-green-600 rounded mr-1'
      : 'px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded mr-1';
  };

  const getOperationText = (operation: string) => {
    return operation === 'read' ? '读' : '写';
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.ip.includes(searchTerm) || 
                         item.application.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'internal') return matchesSearch && item.ip.startsWith('192.168');
    if (filter === 'external') return matchesSearch && !item.ip.startsWith('192.168');
    
    return matchesSearch;
  });

  const handleViewTrace = (ip: string) => {
    console.log('Viewing trace for IP:', ip);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-900">IP地址</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">应用程序</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">访问次数</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">操作类型</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">最后访问</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr 
              key={index}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="py-3 px-4 font-medium text-gray-900">{item.ip}</td>
              <td className="py-3 px-4 text-gray-600">{item.application}</td>
              <td className="py-3 px-4">
                <span className="font-bold text-blue-600">
                  {item.accessCount.toLocaleString()}
                </span>
              </td>
              <td className="py-3 px-4">
                {item.operations.map((op, idx) => (
                  <span key={idx} className={getOperationBadge(op)}>
                    {getOperationText(op)}
                  </span>
                ))}
              </td>
              <td className="py-3 px-4 text-gray-600">{item.lastAccess}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleViewTrace(item.ip)}
                  className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  查看轨迹
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          没有找到符合条件的访问记录
        </div>
      )}
    </div>
  );
};

export default AccessSourceTable;