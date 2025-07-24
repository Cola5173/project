import React from 'react';
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

interface PerformanceChartProps {
  period: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ period }) => {
  const generateData = (period: string) => {
    let labels = [];
    let readData = [];
    let writeData = [];

    if (period === 'realtime') {
      labels = ['现在-5分钟', '现在-4分钟', '现在-3分钟', '现在-2分钟', '现在-1分钟', '现在'];
      readData = [42, 45, 48, 46, 44, 45];
      writeData = [25, 28, 30, 29, 27, 28];
    } else if (period === '1h') {
      labels = ['1小时前', '50分钟前', '40分钟前', '30分钟前', '20分钟前', '10分钟前', '现在'];
      readData = [38, 42, 45, 48, 46, 44, 45];
      writeData = [22, 25, 28, 30, 29, 27, 28];
    } else {
      labels = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
      readData = [25, 20, 18, 35, 42, 45, 48, 52, 49, 46, 38, 30];
      writeData = [15, 12, 10, 20, 25, 28, 30, 32, 29, 26, 22, 18];
    }

    return { labels, readData, writeData };
  };

  const { labels, readData, writeData } = generateData(period);

  const data = {
    labels,
    datasets: [
      {
        label: '读取速率 (MB/s)',
        data: readData,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: '写入速率 (MB/s)',
        data: writeData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
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

  return <Line data={data} options={options} />;
};

export default PerformanceChart;