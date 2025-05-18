const bcrypt = require('bcryptjs');
const { Admin } = require('../models/Admin');

exports.initializeAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('123!@#qweQWE', salt);
      const admin = new Admin({ username: 'admin', password: hashedPassword });
      await admin.save();
      console.log('Admin account created');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};
