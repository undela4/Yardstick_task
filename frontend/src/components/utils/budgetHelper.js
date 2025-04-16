export const initializeBudgets = (categories) => {
    const budgets = {};
    categories.forEach(category => {
      budgets[category] = 0; // Default budget of 0
    });
    return budgets;
  };
  
  export const calculateBudgetVsActual = (transactions, budgets) => {

    const result = {};
    const categorySpending = {};
  
    // Calculate actual spending per category
    transactions.forEach(tx => {
      categorySpending[tx.category] = (categorySpending[tx.category] || 0) + parseFloat(tx.amount);
    });
     
    // Compare with budgets
    Object.keys(budgets.data).forEach(category => {
      result[category] = {
        budget: budgets.data[category],
        actual: categorySpending[category],
        difference: (budgets[category] || 0) - (categorySpending[category] || 0)
      };
    });
    console.log(result)
  

    return result;
  };
  
  export const getSpendingInsights = (transactions) => {
    if (transactions.length === 0) return [];
    
    const insights = [];
    const now = new Date();
    
    
    // Monthly spending trend
    const monthlySpending = {};
    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth()}`;
      monthlySpending[monthYear] = (monthlySpending[monthYear] || 0) + parseFloat(tx.amount);
    });
    
    // Category insights
    const categorySpending = {};
    transactions.forEach(tx => {
      categorySpending[tx.category] = (categorySpending[tx.category] || 0) + parseFloat(tx.amount);
    });
    
    // Biggest expense
    const biggestExpense = [...transactions].sort((a, b) => b.amount - a.amount)[0];
    
    // Spending frequency
    const spendingDays = new Set(transactions.map(tx => tx.date)).size;
    const avgDailySpend = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0) / spendingDays;
    
    insights.push({
      title: "Biggest Expense",
      value: `₹ ${biggestExpense.amount.toFixed(2)} on ${biggestExpense.description}`,
      category: biggestExpense.category
    });
    
    insights.push({
      title: "Top Spending Category",
      value: Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0][0],
      amount: Object.values(categorySpending).sort((a, b) => b - a)[0]
    });
    
    insights.push({
      title: "Average Daily Spend",
      value: `₹ ${avgDailySpend.toFixed(2)}`
    });
    
    return insights;
  };