const mongoose = require('mongoose');

const khataSchema = mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minLength: [3, 'Title must be at least 3 characters'],
      maxLength: [100, 'Title must be less than 100 characters']
    },
    details: {
      type: String,
      required: [true, 'Details are required'],
      minLength: [10, 'Details must be at least 10 characters'],
    }
  });

module.exports = mongoose.model('khata', khataSchema);