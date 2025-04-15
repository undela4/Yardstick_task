import React from 'react';
import { Bar } from 'react-chartjs-2';

const BudgetVsActualChart = ({ budgetData }) => {
  const categories = Object.keys(budgetData);
  const budgetValues = categories.map(cat => budgetData[cat].budget);
  const actualValues = categories.map(cat => budgetData[cat].actual);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Budget',
        data: budgetValues,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Actual',
        data: actualValues,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Budget vs Actual Spending',
      },
      tooltip: {
        callbacks: {
          afterLabel: (context) => {
            const category = context.label;
            const difference = budgetData[category].difference;
            const status = difference >= 0 ? 'under' : 'over';
            return `You are ${status} budget by ₹${Math.abs(difference).toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BudgetVsActualChart;