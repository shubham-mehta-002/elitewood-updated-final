const { Testimonial } = require('../models/Testimonial');

const createTestimonial = async (req, res, next) => {
  try {
    const { rating, author, quote, position } = req.body;
    const newTestimonial = new Testimonial({ rating, author, quote, position });
    await newTestimonial.save();
    res.status(201).json({ message: 'Testimonial created successfully' , testimonial : newTestimonial});
  } catch (error) {
    console.error('Create Testimonial Error:', error);
    next(error);
  }
};

const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    console.error('Get Testimonials Error:', error);
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete Testimonial Error:', error);
    next(error);
  }
};
const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial  = req.body;
console.log({testimonial})
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      testimonial,
      {
        new: true,          
        runValidators: true  
      }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({
      message: 'Testimonial updated successfully',
      testimonial: updatedTestimonial
    });
  } catch (error) {
    console.error('Update Testimonial Error:', error);
    next(error); 
  }
};


module.exports = {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  updateTestimonial
}