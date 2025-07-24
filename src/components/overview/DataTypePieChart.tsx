import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DataTypePieChart: React.FC = () => {
    const data = {
        labels: ['结构化数据', '非结构化数据', '半结构化数据'],
        datasets: [
            {
                data: [60, 30, 10],
                backgroundColor: [
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
            {/* 标题 */}
            <h3 className="text-lg font-semibold text-gray-800 mr-4">数据类型占比</h3>
            {/* 图表容器 */}
            <div style={{ width: '100%', height: '100%' }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default DataTypePieChart;