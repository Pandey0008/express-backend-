const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/multerdbtest');

const userSchema = new mongoose.Schema({
    name: String,
    image: Buffer,
})

module.exports = mongoose.model('user', userSchema)