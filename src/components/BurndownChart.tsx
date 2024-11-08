import { useEffect, useRef } from 'react';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

interface ChartComponentProps {
  labels: string[];
  distribution: number[];
  points: number[];
  overrideChartOptions?: ChartOptions;
  onRender?: (chart: Chart) => void;
}

const ChartComponent = ({
  labels,
  distribution,
  points,
  overrideChartOptions,
  onRender,
}: ChartComponentProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chartData: ChartData = {
      labels,
      datasets: [
        {
          label: 'Points Distribution',
          data: distribution,
          backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 1,
        },
        {
          label: 'Points Left',
          data: points,
          backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const chartOptions: ChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      ...overrideChartOptions,
    };

    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });

    if (onRender) {
      onRender(chartInstance);
    }

    return () => chartInstance.destroy();
  }, [labels, distribution, points, overrideChartOptions, onRender]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
