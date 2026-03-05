const { Admin } = require('../models/Admin');

exports.initializeAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const admin = new Admin({
        username: 'admin',
        password: '123!@#qweQWE'
      });
      await admin.save();
      console.log('Admin account created');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};
