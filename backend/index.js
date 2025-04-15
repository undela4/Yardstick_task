const express = require('express');;
const app = express();
const cors =require('cors');
app.use(express.json());//body parsing
app.use(cors());//for cross origin resource sharing


//For environament variables
require('dotenv').config()



//For connecting to MongoDB
const {mongoDB} = require('./config/mongoDB.js');
mongoDB()


//For routes
const Route =require('./route.js');
app.use('/yardstick',Route);



app.listen(5000,()=>console.log("Server is running on port 5000"));