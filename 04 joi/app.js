const express = require('express');
const app = express();
const joi = require('joi');
const ejs = require('ejs');
const {userModel,validatemodel} = require('./models/user-model');
const mongooseconnection = require('./config/mongoose');
app.set('view engine','ejs');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('index');
})
app.post('/create',async(req,res)=>{
    let {name,email,age} = req.body;
let error = validatemodel({name,email,age});
if (error) {
    return res.status(400).send(error.details[0].message);
}
let createduser = await userModel.create({
    name,
    email,
    age
});
res.send(createduser);
})

app.listen(3000,()=>{
    console.log('App listening on port http://localhost:3000')
})