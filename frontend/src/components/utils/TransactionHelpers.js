export const categories = [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Healthcare',
    'Education',
    'Other'
  ];
  
  export const validateTransaction = (transaction) => {
    const errors = {};
    if (!transaction.amount || isNaN(transaction.amount)) {
      errors.amount = 'Please enter a valid amount';
    }
    if (!transaction.date) {
      errors.date = 'Please select a date';
    }
    if (!transaction.category) {
      errors.category = 'Please select a category';
    }
    return errors;
  };
  
  export const calculateMonthlyExpenses = (transactions) => {
    const monthlyTotals = {};
    
    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = 0;
      }
      monthlyTotals[monthYear] += parseFloat(tx.amount);
    });
    
    return monthlyTotals;
  };
  
  export const calculateCategoryExpenses = (transactions) => {
    const categoryTotals = {};
    
    categories.forEach(cat => {
      categoryTotals[cat] = 0;
    });
  
    transactions.forEach(tx => {
      categoryTotals[tx.category] += parseFloat(tx.amount);
    });
    
    return categoryTotals;
  };
  
  export const getRecentTransactions = (transactions, count = 5) => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, count);
  };