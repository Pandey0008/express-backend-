const express = require('express');
const app = express();


const mongooseconnection = require('./config/mongoose');
const userModel = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.post('/create',async(req,res)=>{
    let {name,email,password} = req.body;
    let createuser = await userModel.create({
        name,
        email,
        password
    });
    res.send(createuser)
})

app.get('/read',async(req,res)=>{
    let user = await userModel.find();
res.send(user)
})
app.get('/update',async(req,res)=>{
    let user = await userModel.findOneAndUpdate({name:"Rohit"});
console.log('updated')
res.send(user)
})
app.get('/delete',async(req,res)=>{
    let user = await userModel.findOneAndDelete({name:"Rohit"});
console.log('deleted')
res.send(user)
})

app.listen(3000,()=>{
    console.log('App listening on port http://localhost:3000')
})
