const mongoose = require('mongoose');
mongoose.set('debug', true);


const postSchema = new mongoose.Schema({
        user :{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        },
        content : String
});

module.exports = mongoose.model('post', postSchema);