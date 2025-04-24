const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model')

module.exports.protect = async (req, res, next) => {
    let token = req.cookies.token;
    if (token) {
      try{
       const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findOne({email: data.email}).select("-password")
    next();
      }
      catch(err){
        res.status(401).send("Not Authorised ")
      }
    }
    if (!token){
        res.status(401).send("Not Authorised , You dont have permission to access");
    }
}