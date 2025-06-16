
import React , {useState} from 'react';
import { Card, CardContent } from "@/components/common/Card";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  CardHeader,CardTitle ,CardDescription
} from "@/components/common/Card";  
import axios from "../../utils/axiosInstance"
import {ServiceFormDialog}  from "./ServiceFormDialog"
import { Button } from '@/components/common/Button';
import toast from "react-hot-toast";

export const ServicesManagement = ({ 
  services, 
  loading,
  setServices
}) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Active'
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddDialog = () => {
    setCurrentService(null);
    setFormData({
      title: '',
      description: '',
      status: 'Active'
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (service) => {
    setCurrentService(service);
    setFormData(service);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentService(null);
    setFormData({
      title: '',
      description: '',
      status: 'Active'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      
      if (!currentService) {
        response = await axios.post("/api/services", formData);
        setServices([...services, response.data.service]);
       
        toast.success("Service added successfully")
      } else {
        response = await axios.put("/api/services/"+currentService._id, formData);
        setServices(services.map(item => item._id === currentService._id ? response.data.service : item));
       
        toast.success("Service updated successfully")
      }
      
      handleDialogClose();
    } catch (error) {
      console.error('API Error:', error);
      // toast({
      //   title: "Failed",
      //   description:
      //     (error.response &&
      //       error.response.data &&
      //       Array.isArray(error.response.data.errors) &&
      //       error.response.data.errors
      //         .map(function (err) {
      //           return err.field + ": " + err.message;
      //         })
      //         .join("\n")) || "Failed to add/update service",
      //   variant: "destructive",
      // });
      toast.error(
        (error.response &&
            error.response.data &&
            Array.isArray(error.response.data.errors) &&
            error.response.data.errors
              .map(function (err) {
                return err.field + ": " + err.message;
              })
              .join("\n")) || "Failed to add/update service"
      )
      handleDialogClose();
    }
  };
      
  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/services/"+id);
      setServices(services.filter(item => item._id !== id));
      // toast({
      //   title: "Deleted",
      //   description : "Service deleted successfully"
      // })
      toast.success("Service deleted successfully")
    } catch (error) {
      console.error("API Error:", error);
      // toast({
      //   title: "Deletion Failed",
      //   description: "Something went wrong!",
      //   variant: "destructive",
      // });

      toast.error("Something wnet wrong")
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
                  <CardTitle  className="text-2xl font-serif">Manage Services</CardTitle>
                  <CardDescription>Add, edit or remove services displayed on the website</CardDescription>
                </div>
                <Button onClick={openAddDialog}>
                  <Plus className="h-4 w-4 mr-0" /> Add New Service
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted border-b">
                          <th className="py-3 px-4 text-left">Title</th>
                          <th className="py-3 px-4 text-left">Description</th>
                         <th className="py-3 px-4 text-left">Status</th> 
                          <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services && services.length>0 ? services.map((service) => (
                          <tr key={service.id} className="border-b">
                            <td className="py-3 px-4 font-medium">{service.title}</td>
                            <td className="py-3 px-4">{service.description}</td>
                            <td className="py-3 px-4">
                              <span className={service.status?.trim().toLowerCase()  === 'inactive' ? 'text-red-500' : ''}>
                                {service.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                              <Button 
                                variant="secondary" 
                                size="sm text-primary"
                                onClick={() => openEditDialog(service)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="secondary" 
                                size="sm text-primary"
                                onClick={() =>  handleDelete(service._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              </div>
                            </td>
                          </tr>
                        )) : <tr><td colSpan={5} className="text-center py-4">No Services found</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
      )}

      <ServiceFormDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          isEditing={!!currentService}
      />
    </>
  );
};
