
import React, { useState } from 'react';
import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/common/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  CardHeader,CardTitle ,CardDescription
} from "@/components/common/card";  
import { TestimonialFormDialog } from "./TestimonialFormDialog";
import axios from "../../utils/axiosInstance";
import toast from "react-hot-toast"


export const TestimonialsManagement = ({ 
  testimonials, 
  setTestimonials,
  loading
}) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    quote: '',
    author: '',
    position: '',
    rating: 5
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddDialog = () => {
    setCurrentTestimonial(null);
    setFormData({
      quote: '',
      author: '',
      position: '',
      rating: 5
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setFormData(testimonial);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentTestimonial(null);
    setFormData({
      quote: '',
      author: '',
      position: '',
      rating: 5
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      
      if (!currentTestimonial) {
        response = await axios.post('api/testimonials', formData);
        console.log({response})
        setTestimonials([...testimonials, response.data.testimonial]);
        
        toast.success("Testimonial added successfully")
      } else {
        console.log({formData})
        response = await axios.put(`api/testimonials/${currentTestimonial._id}`, formData);
        console.log({response})
        setTestimonials(testimonials.map(item => item._id === currentTestimonial._id ? response.data.testimonial : item));
     
        toast.success("Testimonial update successfully")
      }
      
      handleDialogClose();
    } catch (error) {
      console.error('API Error:', error);
      toast.error(
        (error.response &&
            error.response.data &&
            Array.isArray(error.response.data.errors) &&
            error.response.data.errors
              .map(function (err) {
                return err.field + ": " + err.message;
              })
              .join("\n")) || "Failed to add/update testimonial"
      )
      
      handleDialogClose();
    }
  };  

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/testimonials/${id}`);
      
      if (response.status === 200) {
        setTestimonials(prev => prev.filter(item => item._id !== id));
      
        toast.success("Testimonial deleted successfully")
      } else {
        throw new Error('Delete failed on server');
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        (error.response &&
            error.response.data &&
            Array.isArray(error.response.data.errors) &&
            error.response.data.errors
              .map(function (err) {
                return err.field + ": " + err.message;
              })
              .join("\n")) || "Failed to delete testimonial"
      )
    }
  };
  

  return (
    <>
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-serif">Manage Testimonials</CardTitle>
                  <CardDescription>Add, edit or remove client testimonials</CardDescription>
                </div>
                <Button onClick={openAddDialog}>
                  <Plus className="h-4 w-4 mr-0" /> Add New Testimonial
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted border-b">
                          <th className="py-3 px-4 text-left">Author</th>
                          <th className="py-3 px-4 text-left">Quote</th>
                          <th className="py-3 px-4 text-left">Position</th>
                          <th className="py-3 px-4 text-left">Rating</th>
                          <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testimonials && testimonials.length > 0 ? testimonials.map((testimonial) => (
                          <tr key={testimonial._id} className="border-b">
                            <td className="py-3 px-4 font-medium">{testimonial.author}</td>
                            <td className="py-3 px-4 max-w-xs truncate">{testimonial.quote}</td>
                            <td className="py-3 px-4">{testimonial.position}</td>
                            <td className="py-3 px-4">{testimonial.rating} / 5</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                              <Button 
                                variant="secondary" 
                                size="sm text-primary"
                                onClick={() => openEditDialog(testimonial)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="secondary" 
                                size="sm text-primary"
                                onClick={() => handleDelete(testimonial._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              </div>
                            </td>
                          </tr>
                        )) : <tr><td colSpan={5} className="text-center py-4">No testimonials found</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
      )}

      <TestimonialFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        isEditing={!!currentTestimonial}
      />
    </>
  );
};