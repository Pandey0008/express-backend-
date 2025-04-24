const express = require('express');
const app = express()
const userModel = require('./models/userModel')

const upload = require('./multer-setup');
const ejs = require('ejs');

app.set('view engine','ejs')




app.get('/',(req,res)=>{
    res.render("index")
})

app.post('/upload',upload.single('image'),async(req,res)=>{
let user = await userModel.create({
    name : "image",
    image : req.file.filename
})

    res.send(user)
    console.log(req.file);
    
})

app.listen(3000,()=>{
    console.log("App listening on port http://localhost:3000");
})