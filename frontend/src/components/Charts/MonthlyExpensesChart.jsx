import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const MonthlyExpensesChart = ({ monthlyExpenses }) => {
  const chartData = {
    labels: Object.keys(monthlyExpenses).sort(),
    datasets: [{
      label: 'Monthly Expenses',
      data: Object.keys(monthlyExpenses).sort().map(label => monthlyExpenses[label]),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expenses',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default MonthlyExpensesChart;