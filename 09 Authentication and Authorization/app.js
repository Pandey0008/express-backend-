const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/tokenmaker', (req, res) => {
    let token = jwt.sign({email:"mailatshivm@gmail.com"},"shivam")
    res.send(token)
});
app.get('/datafetch', (req, res) => {
    let data = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haWxhdHNoaXZtQGdtYWlsLmNvbSIsImlhdCI6MTc0NDAyNDc0OX0.W_F4f1Of3-is0mPuvVIALtJ9PGhCI7Fa5GFlq3glFaU","shivam")
    res.send(data)
});

app.post('/encrypt',async(req,res)=>{
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash("shivam",salt)
    res.send(hash)
})
app.post('/check',async(req,res)=>{
    let result = await bcrypt.compare("shivam","$2b$10$AXKOHZ2WSGSI5uGuFwzUue0ZP7LyHIWC8ksTYGNHpGPx5yD3ABZ5a")
    res.send(result)
})

app.get('/cookie', (req, res) => {
    res.cookie('name', 'shivam',{
        maxAge:10000,
        httpOnly:true,
        secure:true
    })
    res.send('Hello World!');
});

app.get('/readcookie', (req, res) => {
    res.send(req.cookies)
});

app.listen(3000, () => {
    console.log('App listening on port http://localhost:3000');
});