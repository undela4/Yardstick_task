const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    unique: true,
    enum: [
      'Food & Dining',
      'Shopping',
      'Transportation',
      'Entertainment',
      'Utilities',
      'Healthcare',
      'Education',
      'Other'
    ]
  },
  amount: {
    type: Number,
    required: [true, 'Budget amount is required'],
    min: [0, 'Budget cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
budgetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to initialize budgets if they don't exist
budgetSchema.statics.initializeBudgets = async function() {
  const categories = [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Healthcare',
    'Education',
    'Other'
  ];
  
  for (const category of categories) {
    const existingBudget = await this.findOne({ category });
    if (!existingBudget) {
      await this.create({ category, amount: 0 });
    }
  }
};

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;