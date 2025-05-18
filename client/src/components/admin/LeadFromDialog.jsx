
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/Dialog";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Label } from "@/components/common/Label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

export const LeadFormDialog = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  handleSelectChange,
  isEditing,
  services
}) => {
  const dialogTitle = isEditing ? 'Edit Lead' : 'Add New Lead';
  const [followUpDate, setFollowUpDate] = useState(formData.nextFollowUp || '');

  

  // Handle date change for nextFollowUp
// const handleDateChange = (e) => {
//   const date = e.target.value;
//     setFollowUpDate(date);
    
//     const newEvent = {
//       target: {
//         name: 'nextFollowUp',
//         value: date
//       }
//     };
//     handleInputChange(newEvent);
//   };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="serviceType">Service Type</Label>
            <select
              value={formData.serviceType?._id || ''}
              onValueChange={(value) => handleSelectChange('serviceType', value)}
               className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
              
            >
             <option value="" className="text-gray-800 bg-white" >Select Service type</option>
                {
                    services.map((service) => (
                        <option key={service._id} value={service._id} className="text-gray-800 bg-white" >
                            {service.title}
                        </option >
                    ))
                }
              
            </select>
          </div>
          
          <div>
            <Label htmlFor="status">Status</Label>
            <select
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
              
              value={formData.status || 'active'}
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              
              <option value="" className="text-gray-800 bg-white">Select Status</option>
                <option value="active" className="text-gray-800 bg-white">Active</option>
                <option value="inactive" className="text-gray-800 bg-white">Inactive</option>
              
            </select>
          </div>          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <buttButtonon type="submit">Save</buttButtonon>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};