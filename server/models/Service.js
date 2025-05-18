const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [100, 'Title must be less than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = { Service };
