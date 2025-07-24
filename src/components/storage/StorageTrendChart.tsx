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

interface StorageTrendChartProps {
  period: string;
}

const StorageTrendChart: React.FC<StorageTrendChartProps> = ({ period }) => {
  const generateData = (days: number) => {
    const labels = [];
    const actualData = [];
    const predictedData = [];
    
    for (let i = 0; i < days; i++) {
      labels.push(`Day ${i + 1}`);
      actualData.push(1200 + i * 50 + Math.random() * 100);
      if (i >= days - 3) {
        predictedData.push(1200 + i * 60 + Math.random() * 80);
      } else {
        predictedData.push(null);
      }
    }
    
    return { labels, actualData, predictedData };
  };

  const periodDays = period === '7' ? 7 : period === '30' ? 30 : 90;
  const { labels, actualData, predictedData } = generateData(periodDays);

  const data = {
    labels,
    datasets: [
      {
        label: '实际使用量 (GB)',
        data: actualData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: '预测使用量 (GB)',
        data: predictedData,
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
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
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
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

export default StorageTrendChart;