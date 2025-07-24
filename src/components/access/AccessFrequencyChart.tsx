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

interface AccessFrequencyChartProps {
  type: string;
}

const AccessFrequencyChart: React.FC<AccessFrequencyChartProps> = ({ type }) => {
  const generateData = (type: string) => {
    const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    let datasets = [];

    if (type === 'all' || type === 'read') {
      datasets.push({
        label: '读操作',
        data: [120, 89, 245, 389, 456, 234],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      });
    }

    if (type === 'all' || type === 'write') {
      datasets.push({
        label: '写操作',
        data: [80, 65, 180, 290, 320, 180],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      });
    }

    return { labels, datasets };
  };

  const { labels, datasets } = generateData(type);

  const data = {
    labels,
    datasets,
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

export default AccessFrequencyChart;