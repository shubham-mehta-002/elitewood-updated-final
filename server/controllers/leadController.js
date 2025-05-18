const { Lead } = require('../models/Lead');
const {Service} = require("../models/Service")


const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, message, serviceType } = req.body;
console.log({ name, email, phone, message, serviceType })
    const service = await Service.findById(serviceType);

    if (!service) {
      throw new Error('Service not found with id: ' + serviceType);
    }

    // Create new lead
    const newLead = new Lead({ name, email, phone, message, serviceType });
    await newLead.save();

    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    console.error('Create Lead Error:', error);
    next(error); // Forward the error to the global error handler
  }
};

const getAllLeads = async (req, res,next) => {
  try {
    const leads = await Lead.find().populate({
      path: "serviceType",
      select: "title description"  // specify which fields you want
    })
    .sort({ date: -1 });
    console.log({leads})
    res.json(leads);
  } catch (error) {
    console.error('Get Leads Error:', error);
    next(error)
  }
};

const deleteLead = async (req, res,next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete Lead Error:', error);
    next(error)
  }
};

const updateLead = async(req,res,next) =>{
  try{
    // const { name, email, phone, message, serviceType } = req.body;
    // const lead = await Lead.findByIdAndUpdate(req.params.id, { name, email, phone, message, serviceType });
    const updateFields = req.body; 
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true } // optional: returns the updated doc
    );
    if (!lead) throw new Error('Lead not found with id: ' + req.params.id);
    res.json({ message: 'Lead updated successfully' });
  } catch (error) {
    console.error('Update Lead Error:', error);
    next(error)
  }
}
module.exports ={
  createLead,
  deleteLead, 
  getAllLeads,
  updateLead
}