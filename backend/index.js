const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const connectDB = require('./config/dbconnect');
connectDB();


//routes
app.use(express.json());
app.use('/auth', require('./routes/auth'));



app.listen(process.env.PORT , (err) => err ? console.log(err) : console.log('Server is running on port 5000'));
