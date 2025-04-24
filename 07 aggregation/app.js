const express = require('express') ;
const app = express();
const Post = require('./models/post-model');
const User = require('./models/user-model');
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.post('/create',async(req,res)=>{
    let user = await userModel.create({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password 
    });
res.send(user);
})
app.post('/:username/create/post',async(req,res)=>{
    let user = await User.findOne({username : req.params.username});

    // res.send(user)

    let post = await Post.create({
        content : req.body.content,
        user : user._id
    });
    user.posts.push(post._id);
    await user.save();
    res.send({user,post})
})

app.get('/posts',async(req,res)=>{
    let posts = await Post.find().populate('user');
res.send(posts)
})
app.get('/users',async(req,res)=>{
    let users = await User.find().populate('posts');
res.send(users)
})
app.get('/test',async(req,res)=>{
    let users = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user",
          as: "postData",
        },
      },  
    ])
    res.send(users)
})
app.listen(3000,()=>{console.log('App listening on port http://localhost:3000');
})