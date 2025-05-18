
import React from 'react';
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
import { Textarea } from "@/components/common/Textarea";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

export const ServiceFormDialog = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  handleSelectChange,
  isEditing
}) => {
  const dialogTitle = isEditing ? 'Edit Service' : 'Add New Service';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              defaultValue={formData.status || 'Active'}
              onChange={(e) => handleSelectChange('status', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
                        
            >
              <option value="" className="text-gray-800 bg-white"  >Select Status</option> 
              <option value="Active" className="text-gray-800 bg-white" >Active</option>
              <option value="Inactive" className="text-gray-800 bg-white" >Inactive</option>
            </select>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" onClick={onSubmit}>Save</Button>




          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};