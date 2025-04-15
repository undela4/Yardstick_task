const Transaction =require('../models/Transaction.js');

exports.getTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.find().sort({ date: -1 });
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }