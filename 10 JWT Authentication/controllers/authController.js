const userModel = require ('../models/user-model')
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    let {name,email,password} = req.body;
        try {
        let user = await userModel.findOne({email})
        if (user)return res.status(400).send("User already exists")
            

    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password,salt)
    

         user = await userModel.create({
            name,
            email,
            password : hash,
        });
        res.send(user);
       let token = generateToken ({email});
       res.cookie('token',token , {
           httpOnly : true,
           secure : true,
           maxAge:30*24*60*60*1000
       })
       res.status(201).send(user);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }; 

module.exports.loginUser = async (req, res) => {
       const {email,password} = req.body;
       try {
        let user = await userModel.findOne({email});
       if (!user){return res.status(400).send("User not found");}
       let isMatch = await bcrypt.compare(password,user.password); 

       if (isMatch){
       let token =generateToken ({email});
       res.cookie('token',token , {
           httpOnly : true,
           secure : true,
           maxAge:30*24*60*60*1000
       })
       res.status(201).send(user);
    }
       else {return res.status(400).send("Invalid credentials");} 
       }
       catch (error) {
           res.status(500).send(error.message);
       }
    };
    
module.exports.logoutUser = (req, res) => {
      req.res.clearCookie('token');
      res.status(200).send("Logged out successfully");
    };
module.exports.getUserProfile = (req, res) => {
    console.log(req.user);
      res.send("loggedIn ho app")
    };