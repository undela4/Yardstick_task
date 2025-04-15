const Budget = require('../models/Budget');



exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    const budgetsObject = budgets.reduce((acc, budget) => {
      acc[budget.category] = budget.amount;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: budgetsObject
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};