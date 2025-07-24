import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface CleanupReminderProps {
  count: number;
  size: string;
  onClick: () => void;
}

const CleanupReminder: React.FC<CleanupReminderProps> = ({ count, size, onClick }) => {
  return (
    <div 
      className="bg-red-50 border border-red-200 rounded-lg p-4 cursor-pointer hover:bg-red-100 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center">
        <AlertTriangle className="text-red-500 w-6 h-6 mr-3" />
        <div className="flex-1">
          <p className="font-semibold text-red-800">
            发现 {count.toLocaleString()} 条数据需要清理
          </p>
          <p className="text-sm text-red-600">
            预计可释放存储空间: {size}
          </p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center">
          <Trash2 className="w-4 h-4 mr-1" />
          查看详情
        </button>
      </div>
    </div>
  );
};

export default CleanupReminder;