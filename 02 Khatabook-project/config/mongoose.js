const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/khatabook');

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
    
});
db.on("open", () => {
     console.log("Database connected");
})

module.exports = db;    