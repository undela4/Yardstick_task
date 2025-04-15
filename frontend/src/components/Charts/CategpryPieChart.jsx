import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const CategoryPieChart = ({ categoryExpenses }) => {
  const backgroundColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(199, 199, 199, 0.6)',
    'rgba(83, 102, 255, 0.6)'
  ];

  const chartData = {
    labels: Object.keys(categoryExpenses),
    datasets: [{
      data: Object.keys(categoryExpenses).map(label => categoryExpenses[label]),
      backgroundColor: backgroundColors,
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Expenses by Category',
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default CategoryPieChart;