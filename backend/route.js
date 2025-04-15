const express=require('express');
const Route=express.Router();

const {getTransactions} =require('./controllers/getTransactions.js')
const {setbudget} =require('./controllers/setBudget.js')
const {createTransaction} =require('./controllers/createTransactions.js')
const {getBudgets} =require('./controllers/getBudget.js')
const {deleteTransaction} =require('./controllers/deleteTransaction.js')
const{updateTransaction} =require('./controllers/updateTransaction.js')


// http://localhost:5000/yardstick/
Route.get('/',(req,res)=>{
    res.send("Hello World")
})


// http://localhost:5000/yardstick/getTransactions
Route.get('/getTransactions', getTransactions);


// http://localhost:5000/yardstick/getBudget
Route.get('/getBudget', getBudgets);


// http://localhost:5000/yardstick/createTransactions
Route.post('/createTransactions',createTransaction);

// http://localhost:5000/yardstick/deleteTransactions
Route.delete('/deleteTransactions/:id',deleteTransaction);

// http://localhost:5000/yardstick/setBudgets
Route.put('/setBudgets',setbudget);

// http://localhost:5000/yardstick/updateTransactions/:id
Route.put('/updateTransactions/:id',updateTransaction);
  


module.exports=Route;