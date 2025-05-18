const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { createProject, getAllProjects, updateProject, deleteProject, getProjectById} = require('../controllers/projectController');

// Public Routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected Routes
router.post('/', authenticate, createProject);
router.put('/:id', authenticate, updateProject);
router.delete('/:id', authenticate, deleteProject);

module.exports = router;
