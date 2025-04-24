const express = require('express');
const app = express();
const userModel = require('./models/user-model');
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.post('/create',async(req,res)=>{
    let user = await userModel.create({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password 
    });

    res.send(user);
})
app.post('/:username/create/post',async(req,res)=>{
    let user = await userModel.findOne({username : req.params.username});
    user.posts.push({
        content : req.body.content
    });
    res.send(user)
    await user.save();
})


app.listen(3000,()=>{console.log('App listening on port http://localhost:3000');
})