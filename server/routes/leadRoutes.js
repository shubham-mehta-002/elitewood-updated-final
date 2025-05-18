const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { createLead, deleteLead, getAllLeads, updateLead } = require('../controllers/leadController');

// Public Routes
router.post('/', createLead);

// Protected Routes
router.get('/', authenticate, getAllLeads);
router.delete('/:id', authenticate, deleteLead);
router.put('/:id', authenticate, updateLead);

module.exports = router;
