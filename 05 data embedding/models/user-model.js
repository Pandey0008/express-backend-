const mongoose = require('mongoose');
mongoose.set('debug', true);


mongoose.connect('mongodb://localhost:27017/testingdbembedding');

const postSchema = new mongoose.Schema({
        content : String,
        date : {
            type : Date,
            default : Date.now
     }
});
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    posts : [postSchema],
})

module.exports = mongoose.model('user', userSchema);