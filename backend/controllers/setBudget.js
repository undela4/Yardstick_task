
const Budget = require('../models/Budget');

exports.setbudget= async (req, res) => {
    try {
      const updates = req.body;
      const bulkOps = Object.entries(updates).map(([category, amount]) => ({
        updateOne: {
          filter: { category },
          update: { $set: { amount } },
          upsert: true
        }
      }));
      
      await Budget.bulkWrite(bulkOps);
      const budgets = await Budget.find();
      const budgetsObj = budgets.reduce((acc, budget) => {
        acc[budget.category] = budget.amount;
        return acc;
      }, {});
      
      res.status(200).send({status:true,data:budgetsObj});
    } catch (err) {
      res.status(500).send({status:false,msg:'internal error'});

    }
  }