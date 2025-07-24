import React, { useState } from 'react';
import { Lightbulb, Code } from 'lucide-react';

interface Query {
  id: number;
  query: string;
  executionTime: number;
  cpuUsage: number;
  memoryUsage: number;
  isSlow: boolean;
}

interface QueryEfficiencyTableProps {
  data: Query[];
}

const QueryEfficiencyTable: React.FC<QueryEfficiencyTableProps> = ({ data }) => {
  const [showOptimizeModal, setShowOptimizeModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);

  const handleOptimize = (query: Query) => {
    setSelectedQuery(query);
    setShowOptimizeModal(true);
  };

  const getExecutionTimeColor = (time: number, isSlow: boolean) => {
    if (isSlow) return 'text-red-600';
    if (time > 500) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">查询语句</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">执行时间</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">CPU消耗</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">内存消耗</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((query) => (
              <tr 
                key={query.id}
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block max-w-md truncate">
                    {query.query}
                  </code>
                </td>
                <td className="py-3 px-4">
                  <span className={`font-bold ${getExecutionTimeColor(query.executionTime, query.isSlow)}`}>
                    {query.executionTime}ms
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">{query.cpuUsage}%</td>
                <td className="py-3 px-4 text-gray-600">{query.memoryUsage}MB</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleOptimize(query)}
                    className="text-green-600 hover:text-green-800 transition-colors flex items-center"
                  >
                    <Lightbulb className="w-4 h-4 mr-1" />
                    优化建议
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 优化建议模态框 */}
      {showOptimizeModal && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">查询优化建议</h3>
              <button 
                onClick={() => setShowOptimizeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Code className="w-4 h-4 mr-2" />
                  原查询语句:
                </h4>
                <code className="block bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {selectedQuery.query}
                </code>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  优化建议:
                </h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• 避免使用 SELECT *，指定需要的字段</li>
                  <li>• 在 status 和 created_date 字段上添加复合索引</li>
                  <li>• 考虑分页查询以避免大量数据传输</li>
                  <li>• 使用 LIMIT 限制返回结果数量</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">优化后语句:</h4>
                <code className="block bg-green-50 p-3 rounded text-sm overflow-x-auto">
                    {`SELECT id, name, email FROM users WHERE status='active' AND created_date >= '2024-01-01' LIMIT 100`}
                </code>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-800">
                  <strong>预期提升:</strong> 减少 60% 执行时间，降低 40% 内存消耗
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setShowOptimizeModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                >
                  关闭
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  应用优化
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QueryEfficiencyTable;