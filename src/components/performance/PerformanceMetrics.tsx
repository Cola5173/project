import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Metric {
  title: string;
  value: string;
  unit?: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: string;
}

interface PerformanceMetricsProps {
  metrics: Metric[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{metric.title}</h3>
              <Icon className={`w-6 h-6 text-${metric.color}-600`} />
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold text-${metric.color}-600 mb-2`}>
                {metric.value}
              </div>
              {metric.unit && (
                <div className="text-sm text-gray-600 mb-2">{metric.unit}</div>
              )}
              <div className="text-sm text-gray-600">实时速率</div>
              <div className="mt-2">
                <span className={`text-xs ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? '↑' : '↓'} {metric.change} 较昨日
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PerformanceMetrics;