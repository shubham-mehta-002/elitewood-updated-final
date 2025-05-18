
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
import { Textarea } from "@/components/common/Textarea";
import { Image, X } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ProjectFormDialog = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  isEditing
}) => {
  const dialogTitle = isEditing ? 'Edit Project' : 'Add New Project';
  const projectStatuses = ['Active', 'Inactive', 'Featured']


  const [previewImages, setPreviewImages] = useState(
    formData.imageUrl ? [formData.imageUrl] : []
  );

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Store files for form submission
      
      // Create preview URLs for the images
      const newPreviewImages = files.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviewImages]);
      
      // Update the form data with the files for submission
      const newEvent = {
        target: {
          name: 'imageFiles',
          value: files
        }
      };
      handleInputChange(newEvent);
    }
  };


  const handleSelectChange = (field, value) => {
    handleInputChange({
      target: {
        name: field,
        value: value.toString(),
      },
    });
  };

  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          // Clean up any created object URLs to avoid memory leaks
          previewImages.forEach(preview => {
            if (preview && preview.startsWith('blob:')) {
              URL.revokeObjectURL(preview);
            }
          });
          onSubmit(e);
        }} className="space-y-4">
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
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
              placeholder="E.g., Residential, Commercial, Interior"
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
              defaultValue={formData.status ? formData.status.toLowerCase() : 'active'}
              onChange={(e) => handleSelectChange('status', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"  
            >
              <option value="" className="text-gray-800 bg-white"  >Select status</option>
              
              {projectStatuses.map((status,index) => (
                <option key={index} value={status.toLowerCase()} className="text-gray-800 bg-white"  >
                  {status}
                </option>
              ))}
            
            </select>
          </div>
          
          <div className="overflow-y-auto flex-1 space-y-4">
            <Label htmlFor="projectImages">Project Images</Label>
            <div className="grid grid-cols-3 gap-2 mb-3">
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-full h-32 border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center">
                {previewImages.length === 0 ? (
                  <div className="text-muted-foreground flex flex-col items-center">
                    <Image className="h-8 w-8 mb-2 " />
                    <span>No images selected</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-muted-foreground">{previewImages.length} image(s) selected</span>
                    <span className="text-xs text-muted-foreground">Click to add more</span>
                  </div>
                )}
                <input
                  id="projectImages"
                  type="file"
                  accept="image/*"
                  onChange={handleImagesChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  multiple
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  );
};