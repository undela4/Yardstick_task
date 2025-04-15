import React from 'react';
import { categories } from '../utils/transactionHelpers';

const TransactionForm = ({ 
  formData, 
  handleInputChange, 
  handleSubmit, 
  errors, 
  editingId, 
  onCancel 
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger">
          {Object.values(errors).map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
      
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount (₹)</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select
          className="form-select"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        {editingId ? 'Update Transaction' : 'Add Transaction'}
      </button>
      
      {editingId && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TransactionForm;