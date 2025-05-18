const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\d+\-]+$/, 'Phone number can only contain digits, dashes (-), and plus (+) characters']
  },
  serviceType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service Type is required']
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: [
        "New",
        "Contacted",
        "Consultation Scheduled",
        "Consultation Completed",
        "Proposal Sent",
        "Negotiation",
        "Won / Project Confirmed",
        "Lost / Not Interested",
        "On Hold",
        "Cancelled",
      ],
      default: "New",
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Lead = mongoose.model('Lead', LeadSchema);

module.exports = { Lead };
