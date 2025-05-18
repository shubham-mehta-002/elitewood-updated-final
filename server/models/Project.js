const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'featured'],  
    default: 'active',                       
    required: true
  },
  images: {
    type: [String], 
    required: true
  },
  // images: {
  //   type: [
  //     {
  //       data: {
  //         type: Buffer,      // ← Store file content (binary data)
  //         required: true
  //       },
  //       contentType: {
  //         type: String,      // ← Store MIME type (e.g., 'image/jpeg')
  //         required: true
  //       },
  //       caption: {
  //         type: String,
  //         required: [true, 'Image caption is required'],
  //         trim: true,
  //         maxlength: [200, 'Caption cannot exceed 200 characters']
  //       }
  //     }
  //   ],
    // validate: {
    //   validator: function(value) {
    //     return value && value.length > 0; // Ensure the images array is not empty
    //   },
    //   message: 'At least one image is required'
    // }
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = { Project };
