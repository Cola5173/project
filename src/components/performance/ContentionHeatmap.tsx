import React, { useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface ContentionData {
  id: number;
  resource: string;
  time: string;
  duration: number;
  processes: string[];
  level: 'high' | 'medium' | 'low';
}

interface ContentionHeatmapProps {
  data: ContentionData[];
}

const ContentionHeatmap: React.FC<ContentionHeatmapProps> = ({ data }) => {
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  // 生成24小时的热力图数据
  const generateHeatmapData = () => {
    const heatmapData = [];
    for (let hour = 0; hour < 24; hour++) {
      const intensity = Math.random();
      let level = 'low';
      let color = 'bg-green-200';
      
      if (intensity > 0.7) {
        level = 'high';
        color = 'bg-red-400';
      } else if (intensity > 0.4) {
        level = 'medium';
        color = 'bg-yellow-300';
      } else {
        color = 'bg-green-200';
      }
      
      heatmapData.push({
        hour,
        intensity,
        level,
        color,
        resource: 'DB_001'
      });
    }
    return heatmapData;
  };

  const heatmapData = generateHeatmapData();

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleCellClick = (hour: number) => {
    setSelectedHour(hour);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 热力图 */}
      <div>
        <h4 className="font-semibold mb-3">24小时争用热力图</h4>
        <div className="grid grid-cols-24 gap-1 mb-4">
          {heatmapData.map((cell) => (
            <div
              key={cell.hour}
              onClick={() => handleCellClick(cell.hour)}
              className={`h-4 ${cell.color} cursor-pointer hover:opacity-80 transition-opacity`}
              title={`${cell.hour.toString().padStart(2, '0')}:00 - ${cell.resource}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>00:00</span>
          <span>12:00</span>
          <span>24:00</span>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs">
          <span className="flex items-center">
            <div className="w-3 h-3 bg-green-200 rounded mr-1"></div>
            低争用
          </span>
          <span className="flex items-center">
            <div className="w-3 h-3 bg-yellow-300 rounded mr-1"></div>
            中争用
          </span>
          <span className="flex items-center">
            <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
            高争用
          </span>
        </div>
      </div>

      {/* 实时争用记录 */}
      <div>
        <h4 className="font-semibold mb-3">实时争用记录</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 flex items-center">
                    <AlertTriangle className={`w-4 h-4 mr-2 ${getLevelColor(item.level)}`} />
                    {item.resource} 争用
                  </p>
                  <p className="text-sm text-gray-600">
                    涉及进程: {item.processes.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-xs ${getLevelColor(item.level)}`}>
                    持续: {item.duration}s
                  </p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentionHeatmap;