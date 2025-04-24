const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
      },
      age: {
        type: Number,
        min: 0,
        max: 100,
        default: 18,
      }
    },
  );

validatemodel = (user) => {
    const schema = Joi.object({
        name: Joi.string()
          .min(3)
          .max(50)
          .required()
          .trim(),
        
        email: Joi.string()
          .required()
          .trim()
          .lowercase()
          .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        
        age: Joi.number()
          .min(0)
          .max(100)
          .default(18)
      });
   let {error} = schema.validate(user);
   return error;
//    console.log(result.error?.message);
}

let userModel = mongoose.model('user', userSchema);

module.exports = {userModel,validatemodel}