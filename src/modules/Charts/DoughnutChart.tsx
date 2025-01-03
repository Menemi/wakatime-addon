import React from 'react';
import { ArcElement, Chart as ChartJS, Tooltip, Colors, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Theme } from '../Theme/ThemeProvider';

ChartJS.register(ArcElement, Legend, Title, Colors, Tooltip);

type DoughnutChartProps = {
    title?: string;
    rawData: string[];
    theme: Theme;
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({ title, rawData, theme }) => {
    const data = Object.fromEntries(
        Object.entries(
            rawData.reduce<Record<string, number>>((acc, item) => {
                acc[item] = (acc[item] || 0) + 1;
                return acc;
            }, {}),
        ).sort((a, b) => b[1] - a[1]),
    );

    const processedData = {
        labels: Object.keys(data),
        datasets: [{ data: Object.values(data) }],
    };

    return (
        <Doughnut
            data={processedData}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                    },
                    title: {
                        display: !!title,
                        text: title,
                        padding: 0,
                        fullSize: false,
                    },
                    colors: {
                        forceOverride: true,
                    },
                },
                borderColor: theme === 'light' ? '#e1e1e1' : '#3c424b',
            }}
        />
    );
};

export default DoughnutChart;
