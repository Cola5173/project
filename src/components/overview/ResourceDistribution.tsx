import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ResourceNode {
  id: string;
  name: string;
  type: string;
  status: 'normal' | 'warning' | 'error';
  usage: number;
  icon: LucideIcon;
  color: string;
}

interface ResourceDistributionProps {
  nodes: ResourceNode[];
  selectedFilter: string;
}

const ResourceDistribution: React.FC<ResourceDistributionProps> = ({ nodes, selectedFilter }) => {
  const [selectedNode, setSelectedNode] = useState<ResourceNode | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-600';
      case 'warning': return 'bg-yellow-100 text-yellow-600';
      case 'error': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return '正常';
      case 'warning': return '警告';
      case 'error': return '错误';
      default: return '未知';
    }
  };

  const filteredNodes = nodes.filter(node => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'local') return node.type === 'server';
    if (selectedFilter === 'cloud') return node.type === 'cloud';
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredNodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`border-2 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${getStatusColor(node.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-8 h-8 text-${node.color}-600`} />
                <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(node.status)}`}>
                  {getStatusText(node.status)}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{node.name}</h4>
              <p className="text-sm text-gray-600">容量: {node.usage}% 使用</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-${node.color}-500`}
                  style={{ width: `${node.usage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 节点详情模态框 */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">资源详情</h3>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">资源名称:</span>
                <span className="font-medium">{selectedNode.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">资源类型:</span>
                <span className="font-medium">{selectedNode.type === 'server' ? '服务器' : '云存储'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">使用率:</span>
                <span className="font-medium">{selectedNode.usage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">状态:</span>
                <span className={`px-2 py-1 text-xs rounded ${getStatusBadge(selectedNode.status)}`}>
                  {getStatusText(selectedNode.status)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最近更新:</span>
                <span className="font-medium">2024-01-15 14:32</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setSelectedNode(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceDistribution;