import React from 'react';

const SummaryCards = ({ 
  totalExpenses, 
  categoryExpenses, 
  recentTransactions 
}) => {
  return (
    <div className="row">
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-header bg-primary text-white">
            <h5>Total Expenses</h5>
          </div>
          <div className="card-body">
            <h2 className="card-title">₹ {totalExpenses.toFixed(2)}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-header bg-success text-white">
            <h5>Top Category</h5>
          </div>
          <div className="card-body">
            {Object.keys(categoryExpenses).length > 0 ? (
              <>
                <h4 className="card-title">
                  {Object.entries(categoryExpenses)
                    .sort((a, b) => b[1] - a[1])[0][0]}
                </h4>
                <p className="card-text">
                  ₹ {Object.entries(categoryExpenses)
                    .sort((a, b) => b[1] - a[1])[0][1].toFixed(2)}
                </p>
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-header bg-info text-white">
            <h5>Recent Transactions</h5>
          </div>
          <div className="card-body">
            {recentTransactions.length > 0 ? (
              <ul className="list-group list-group-flush">
                {recentTransactions.map((tx, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    <span>{tx.description}</span>
                    <span>₹   {tx.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent transactions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;