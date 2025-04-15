import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TransactionForm from './components/Transactions/TransactionForm';
import TransactionList from './components/Transactions/TransactionList';
import Dashboard from './components/Dashboard/Dashboard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Root URL for the backend API 
const API_URL = 'https://yardstick-task.onrender.com/yardstick';

const App = () => {

  
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: ''
  });


  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  console.log(budgets)
  // Fetch transactions and budgets from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, budgetsRes] = await Promise.all([
          axios.get(`${API_URL}/getTransactions`),
          axios.get(`${API_URL}/getBudget`)
        ]);
        setTransactions(transactionsRes.data);
        setBudgets(budgetsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [transactions.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateTransaction(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (editingId) {
          // Update existing transaction
          await axios.put(`${API_URL}/updateTransactions/${editingId}`, formData);
          const updatedTransactions = transactions.map(tx => 
            tx._id === editingId ? { ...formData, _id: editingId } : tx
          );
          setTransactions(updatedTransactions);
        } else {
          // Add new transaction
          const response = await axios.post(`${API_URL}/createTransactions`, formData);
          setTransactions([...transactions, response.data]);
        }
        handleCloseModal();
      } catch (error) {
        console.error('Error saving transaction:', error);
      }
    }
  };


  const handleEdit = (transaction) => {
    setFormData({
      amount: transaction.amount.toString(),
      date: transaction.date,
      category: transaction.category,
      description: transaction.description
    });
    setEditingId(transaction._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteTransactions/${id}`).then((r)=>{
        if(r.data.status){
          alert("Transaction Deleted Successfully")
        }else{
          alert("Error Deleting Transaction")
        }

      })
      setTransactions(transactions.filter(tx => tx._id !== id));
      if (editingId === id) {
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleAddTransaction = () => {
    setEditingId(null);
    setFormData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      description: ''
    });
    setShowModal(true);
  };

  const handleUpdateBudgets = async (newBudgets) => {
    try {
      await axios.put(`${API_URL}/setBudget`, newBudgets);
      setBudgets(newBudgets);
    } catch (error) {
      console.error('Error updating budgets:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
  };

  const validateTransaction = (transaction) => {
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

  if (isLoading) {
    return <div className="container mt-4 text-center">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Transaction Tracker</h1>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
        </li>
      </ul>

      {activeTab === 'dashboard' ? (
        <Dashboard 
          transactions={transactions} 
          budgets={budgets}
          onUpdateBudgets={handleUpdateBudgets}
        />
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                <h3>Transaction List</h3>
                <button 
                  className="btn btn-primary"
                  onClick={handleAddTransaction}
                >
                  Add Transaction
                </button>
              </div>
              <div className="card-body">
                {transactions.length === 0 ? (
                  <p>No transactions yet. Click "Add Transaction" to get started!</p>
                ) : (
                  <TransactionList 
                    transactions={transactions} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Transaction' : 'Add Transaction'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm 
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            errors={errors}
            editingId={editingId}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;