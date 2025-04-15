const Transaction = require('../models/Transaction');


exports.updateTransaction = async (req, res) => {
  try {
   
    const _id = req.params.id
    const { amount, date, category, description } = req.body;

    // Validate MongoDB ID
    if (!Transaction.find({_id})) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction ID'
      });
    }

    // Basic validation
    if (!amount || !date || !category) {
      return res.status(400).json({ 
        success: false,
        message: 'Amount, date, and category are required fields'
      });
    }

    // Find and update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      _id,
      {
        amount,
        date: new Date(date),
        category,
        description: description || '',
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTransaction
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      success: false,
      message: ' Internal Server Error'
    });
  }
};