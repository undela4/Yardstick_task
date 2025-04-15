import React, { useState, useEffect ,memo} from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { categories } from '../utils/transactionHelpers';
import axios from'axios';
const BudgetManager = ({ budgets, onUpdateBudgets }) => {


  const [editableBudgets, setEditableBudgets] = useState(budgets.data);
  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    
    setEditableBudgets(budgets.data);

  }, [budgets]);


  const handleBudgetChange = (category, value) => {

    setEditableBudgets({
      ...editableBudgets,
      [category]: value
    });
  };

  const handleSave = async() => {
    try{
      axios.put('https://yardstick-task.onrender.com/yardstick/setBudgets', editableBudgets).then((r)=>{
        if(r.data.status){
          alert("Budgets updated successfully")
          onUpdateBudgets(r.data.data);
          setIsEditing(false);
          console.log(editableBudgets)
        }else{
          alert("Error updating budgets")
        }
      })

    }catch(err){
      console.error(err);
    }
    


  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
        <h5>Monthly Budgets</h5>
        {isEditing ? (
          <div>
            <Button variant="success" size="sm" onClick={handleSave} className="me-2">
              Save
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
            Edit Budgets
          </Button>
        )}
      </div>
      <div className="card-body">
        <Table striped bordered>
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget Amount</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category}>
                <td className='fw-bold'>{category}</td>
                <td className='fw-bold'>
                  {isEditing ? (
                    <Form.Control
                      type="number"
                      value={editableBudgets[category] || 0}
                      onChange={(e) => handleBudgetChange(category, e.target.value)}
                    />
                  ) : (
                    `₹ ${editableBudgets[category] ? editableBudgets[category] : '0.00'}`
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};


export default memo(BudgetManager);