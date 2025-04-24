const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/aggregation');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const User = mongoose.model('user', userSchema);
module.exports= User