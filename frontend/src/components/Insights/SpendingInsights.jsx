import React from 'react';
import { Card } from 'react-bootstrap';

const SpendingInsights = ({ insights }) => {
  if (insights.length === 0) {
    return <p>No spending insights available. Add transactions to see insights.</p>;
  }

  return (
    <div className="card">
      <div className="card-header bg-info text-white">
        <h5>Spending Insights</h5>
      </div>
      <div className="card-body">
        <div className="row">
          {insights.map((insight, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{insight.title}</Card.Title>
                  <Card.Text>
                    {insight.value}
                    {insight.amount && (
                      <span className="d-block mt-1 fw-bold">
                        ₹ {insight.amount.toFixed(2)}
                      </span>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;