const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
        title :String,
        content : String,
        author:{type : mongoose.Schema.Types.ObjectId, ref : 'user'},
        createdAt : {type : Date,default : Date.now}
});

const Post = mongoose.model('post', postSchema);

module.exports = Post