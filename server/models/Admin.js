const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [1, 'Username must be at least 3 characters long']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (value) {
        // Updated regex to include # and other common special characters
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(value);
      },
      message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await require('bcryptjs').genSalt(10);
    this.password = await require('bcryptjs').hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


const Admin = mongoose.model('Admin', AdminSchema);

module.exports = { Admin };
