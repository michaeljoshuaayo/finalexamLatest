import React, { useEffect, useRef } from 'react';

const SalesBarGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      const labels = data.map((item) => item.category);
      const sales = data.map((item) => item.sales);

      const chartConfig = {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Sales',
              data: sales,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const chart = new Chart(chartRef.current, chartConfig);
      return () => chart.destroy(); // Clean up chart on unmount
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default SalesBarGraph;