const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const dbconnection = require('./config/mongoose-connection');
const authRoutes = require('./routes/authRoutes');


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dbconnection()

app.use('/api/auth',authRoutes);

app.listen(3000, () => {
    console.log('App listening on port http://localhost:3000');
});