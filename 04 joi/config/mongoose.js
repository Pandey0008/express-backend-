const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/joiValidation');

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
    
});
db.on("open", () => {
     console.log("Database connected");
})

module.exports = db;