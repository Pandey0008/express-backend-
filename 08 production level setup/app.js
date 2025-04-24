const express = require('express');
const app = express();
const indexRouter = require('./routes/index-router');
const userRouter = require('./routes/user-router');
const isLoggedIn = require('./middlewares/isLoggedIn');
app.set('view engine', 'ejs');
const path = require('path');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/' ,indexRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT ||3000, () => {    
    console.log('App listening on port http://localhost:3000');
});