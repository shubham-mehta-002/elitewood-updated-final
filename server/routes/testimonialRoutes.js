const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { createTestimonial, getAllTestimonials, deleteTestimonial,updateTestimonial } = require('../controllers/testimonialController');

// Public Routes
router.get('/', getAllTestimonials);

// Protected Routes
router.post('/', authenticate, createTestimonial);
router.delete('/:id', authenticate, deleteTestimonial);
router.put('/:id', authenticate, updateTestimonial);

module.exports = router;
