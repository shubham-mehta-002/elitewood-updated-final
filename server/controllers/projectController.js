const { Project } = require('../models/Project');

const createProject = async (req, res,next) => {
  try {
    const { title, description, category, images, status } = req.body;
    console.log({ title, description, category, images , status})
    const newProject = new Project({ title, description, category, images, status });
    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project : newProject });
  } catch (error) {
    console.error('Create Project Error:', error);
    next(error)
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const { status : statusArray } = req.query; // Get status from query params

    let query = {};

    if (statusArray && statusArray.length > 0) {
      query.status = { $in: statusArray };    
    }

    const projects = await Project.find(query);
    res.json(projects);
  } catch (error) {
    console.error('Get Projects Error:', error);
    next(error);
  }
};



const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('Get Project Error:', error);
    next(error)
  }
};

const updateProject = async (req, res, next) => {
  try {
    const allowedFields = ['title', 'description', 'images', 'status', 'category'];
    const updateData = {};

    // Only add fields that are present in the request body
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Update Project Error:', error);
    next(error);
  }
};


const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete Project Error:', error);
    next(error)
  }
};


module.exports = {
    createProject,
    getAllProjects,
    updateProject,
    deleteProject,
    getProjectById
}