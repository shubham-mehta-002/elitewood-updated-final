const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
  } = require('../controllers/serviceController');
  

// Public Routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Protected Routes (admin only)
router.post('/', authenticate, createService);
router.put('/:id', authenticate,updateService);
router.delete('/:id', authenticate, deleteService);

module.exports = router;
