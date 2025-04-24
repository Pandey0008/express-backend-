const express = require('express');
const app = express();
const ejs = require('ejs');
app.set('view engine','ejs');

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.get('/greet', (req, res) => {
    res.send('Hello World!');
});

app.get('/create', (req, res) => {
    res.render('index');
    
});

app.post('/create', (req, res) => {
    res.render('index');
    console.log(req.body);
});

app.listen(3000,function (){
    console.log('App listening on port http://localhost:3000');
});

