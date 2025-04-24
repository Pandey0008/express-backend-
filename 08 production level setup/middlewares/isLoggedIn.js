module.exports = (req,res,next)=>{
    req.randomNumder = Math.random();
    next();
}