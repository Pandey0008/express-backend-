const express = require('express');
const app = express();
const ejs = require('ejs');
const upload = require('./multer-setup');
const userModel = require('./models/userModel');
const sharp = require('sharp');


app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/upload',upload.single('image'),async (req,res)=>{
    if(!req.file){
        return res.status(400).send("Please upload a file");
    }
    let newbuffer = req.file.buffer
    try{
        if (req.file.size>2*1024*1024){
            newbuffer = await sharp(req.file.buffer)
            .resize({width:1000})
            .toBuffer()
            console.log(`purana size ${req.file.size}`);
            console.log(`new size ${Buffer.byteLength(newbuffer)}`);
            let image = await userModel.create({
                name : "image",
                image : newbuffer
            })
            res.send("file uploaded")
            // console.log(image);
        }
    }catch(err){
        console.log(err.message);
    }
   
    })

    app.get('/show',async(req,res)=>{
        let files = await userModel.find();
        res.render('show',{files});
    })
    

app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
})