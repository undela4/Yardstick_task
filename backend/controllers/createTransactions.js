const Transaction = require('../models/Transaction');


exports.createTransaction = async (req, res) => {
  try {
    const { amount, date, category, description } = req.body;

    // Basic validation
    if (!amount || !date || !category) {
      return res.status(400).json({ 
        success: false,
        message: 'Amount, date, and category are required fields'
      });
    }

    const transaction = await Transaction.create({
      amount,
      date: new Date(date),
      category,
      description: description || ''
    });

    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};