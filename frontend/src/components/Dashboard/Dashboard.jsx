import React, { useState, useEffect } from 'react';
import SummaryCards from '../Common/SummaryCards.jsx';
import MonthlyExpensesChart from '../Charts/MonthlyExpensesChart.jsx';
import CategoryPieChart from '../Charts/CategpryPieChart.jsx'
import BudgetManager from '../Budget/BudgetManager.jsx';
import BudgetVsActualChart from '../Charts/BudgetVsActualChart.jsx'
';
import SpendingInsights from '../Insights/SpendingInsights.jsx';
import { 
  calculateMonthlyExpenses, 
  calculateCategoryExpenses,
  getRecentTransactions,
  categories
} from '../utils/transactionHelpers';

import {calculateBudgetVsActual,  getSpendingInsights,initializeBudgets} from'../utils/budgetHelper.js';



const Dashboard = ({ transactions, budgets, onUpdateBudgets }) => {
  const totalExpenses = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  const monthlyExpenses = calculateMonthlyExpenses(transactions);
  const categoryExpenses = calculateCategoryExpenses(transactions);
  const recentTransactions = getRecentTransactions(transactions);
  const budgetComparison = calculateBudgetVsActual(transactions, budgets);
  const spendingInsights = getSpendingInsights(transactions);

  return (
    <div className="dashboard">
      <SummaryCards 
        totalExpenses={totalExpenses}
        categoryExpenses={categoryExpenses}
        recentTransactions={recentTransactions}
      />
      
      <BudgetManager 
        budgets={budgets} 
        onUpdateBudgets={onUpdateBudgets} 
      />
      
      <SpendingInsights insights={spendingInsights} />
      
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-success text-white">
              <h5>Monthly Expenses</h5>
            </div>
            <div className="card-body">
              <MonthlyExpensesChart monthlyExpenses={monthlyExpenses} />
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              <h5>Budget vs Actual</h5>
            </div>
            <div className="card-body">
              <BudgetVsActualChart budgetData={budgetComparison} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-info text-white">
              <h5>Expenses by Category</h5>
            </div>
            <div className="card-body">
              <CategoryPieChart categoryExpenses={categoryExpenses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

