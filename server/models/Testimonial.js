const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, 'Quote is required'],
    trim: true,
    maxlength: [1000, 'Quote must not exceed 1000 characters']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Minimum rating is 1'],
    max: [5, 'Maximum rating is 5']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

module.exports = { Testimonial };
