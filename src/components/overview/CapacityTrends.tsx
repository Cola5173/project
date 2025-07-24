import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 动态生成本周、本月labels
function getWeekLabels() {
  const today = new Date();
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    labels.push(`${d.getMonth() + 1}/${d.getDate()}`);
  }
  return labels;
}
function getMonthLabels() {
  const today = new Date();
  const labels = [];
  for (let i = 1; i <= today.getDate(); i++) {
    labels.push(`${today.getMonth() + 1}/${i}`);
  }
  return labels;
}

const CapacityTrends: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // 横坐标labels
  const weekLabels = getWeekLabels();
  const monthLabels = getMonthLabels();

  const trendData = {
    today: {
      labels: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
      datasets: [
        {
          label: '已用容量 (GB)',
          data: [1200, 1220, 1250, 1300, 1350, 1400, 1420],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: '剩余容量 (GB)',
          data: [800, 780, 750, 700, 650, 600, 580],
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
        }
      ],
    },
    week: {
      labels: weekLabels,
      datasets: [
        {
          label: '已用容量 (GB)',
          data: [1200, 1250, 1300, 1350, 1400, 1450, 1500],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: '剩余容量 (GB)',
          data: [800, 780, 760, 740, 720, 700, 680],
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
        }
      ],
    },
    month: {
      labels: monthLabels,
      datasets: [
        {
          label: '已用容量 (GB)',
          data: Array.from({length: monthLabels.length}, (_, i) => 1100 + i * 20),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: '剩余容量 (GB)',
          data: Array.from({length: monthLabels.length}, (_, i) => 900 - i * 20),
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
        }
      ],
    }
  };

  const data = trendData[selectedPeriod as keyof typeof trendData];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">容量使用趋势</h3>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="today">今日</option>
          <option value="week">本周</option>
          <option value="month">本月</option>
        </select>
      </div>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CapacityTrends;