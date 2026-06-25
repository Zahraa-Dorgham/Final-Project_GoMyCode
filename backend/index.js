const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const connectDB = require('./config/dbconnect');
connectDB();

// Initialize Passport
const passport = require('passport');
require('./middleware/passport');
app.use(passport.initialize());

//routes
app.use(express.json());
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use('/auth', require('./routes/auth'));
app.use('/salle', require('./routes/sallesdesport'));
app.use('/coach', require('./routes/coaches'));
app.use('/classe', require('./routes/classes'));
app.use('/reservation', require('./routes/reservation'));
app.use('/suivi', require('./routes/SuiviCoach'));
app.use('/shop', require('./routes/product'));
app.use('/order', require('./routes/orders'));



app.listen(process.env.PORT , (err) => err ? console.log(err) : console.log('Server is running on port 5000'));
