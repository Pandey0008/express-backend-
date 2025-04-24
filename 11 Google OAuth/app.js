const express = require('express');
const app = express();
const connectToDB = require('./config/mongoose-connection');
require('dotenv').config(); 
const authRouter = require('./routes/auth');
const passport = require('passport');
connectToDB();
const expressSession = require('express-session')

require('./config/googlestrategy')




app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(expressSession({
    secret:process.env.EXPRESS_SECRET ,
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())


app.use('/auth', authRouter)

app.get('/',(req,res)=>{
    res.send('Hello World');

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('Authenticated user:', req.user);
    res.redirect('/');
  }
);


})
app.listen(3000,()=>{
    console.log('App listening on port http://localhost:3000');
})