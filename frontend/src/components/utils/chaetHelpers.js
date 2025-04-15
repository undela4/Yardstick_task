export const getMonthlyChartData = (monthlyExpenses) => {
    const labels = Object.keys(monthlyExpenses).sort();
    const data = labels.map(label => monthlyExpenses[label]);
    
    return {
      labels,
      datasets: [{
        label: 'Monthly Expenses',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    };
  };
  
  export const getCategoryChartData = (categoryExpenses) => {
    const labels = Object.keys(categoryExpenses);
    const data = labels.map(label => categoryExpenses[label]);
    
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
  
    return {
      labels,
      datasets: [{
        data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      }],
    };
  };
  
  export const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };