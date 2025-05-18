const { Service } = require('../models/Service');

// Create a new service
const createService = async (req, res, next) => {
  try {
    const { title, description, icon, href } = req.body;
    const newService = new Service({ title, description, icon, href });
    await newService.save();
    res.status(201).json({ message: 'Service created successfully', service: newService });
  } catch (error) {
    next(error); // Pass the error to error middleware
  }
};

// Get all services
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    next(error);
  }
};

// Get service by ID
const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
};

// Update service
const updateService = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true,runValidators: true }
    );  
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service updated successfully', service });
  } catch (error) {
    next(error);
  }
};

// Delete service
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};
