const mongoose = require('mongoose');
const debuglog = require('debug')('development : Mongooseconfig');
mongoose.connect('mongodb://localhost:27017/newdb')

const db = mongoose.connection; 

db.on('error', (err) => {
   console.log(err);
   
});
db.on("open", () => {
    console.log("Database connected");
})

module.exports = db;