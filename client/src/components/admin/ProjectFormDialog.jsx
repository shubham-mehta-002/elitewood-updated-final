
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


  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  React.useEffect(() => {
    if (isOpen) {
      setExistingImages(formData.images || []);
      setPreviewImages([]);
    }
  }, [isOpen, formData.images]);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviewUrls]);

      const currentFiles = formData.imageFiles || [];
      handleInputChange({
        target: {
          name: 'imageFiles',
          value: [...currentFiles, ...files]
        }
      });
    }
  };

  const removeExistingImage = (indexToRemove) => {
    const updatedImages = existingImages.filter((_, index) => index !== indexToRemove);
    setExistingImages(updatedImages);
    handleInputChange({
      target: {
        name: 'images',
        value: updatedImages
      }
    });
  };

  const removeNewImage = (indexToRemove) => {
    const previewToRemove = previewImages[indexToRemove];
    if (previewToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(previewToRemove);
    }
    setPreviewImages(prev => prev.filter((_, index) => index !== indexToRemove));

    const currentFiles = formData.imageFiles || [];
    handleInputChange({
      target: {
        name: 'imageFiles',
        value: currentFiles.filter((_, index) => index !== indexToRemove)
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl h-[90vh] flex flex-col overflow-hidden bg-white">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title || ''} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={formData.category || ''} onChange={handleInputChange} placeholder="Residential, Commercial..." required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description || ''} onChange={handleInputChange} rows={3} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                value={formData.status ? formData.status.toLowerCase() : 'active'}
                onChange={(e) => handleSelectChange('status', e.target.value)}
                className="w-full p-2 border-2 border-primary/10 bg-muted/30 rounded-md focus:border-primary transition-colors text-sm"
              >
                {projectStatuses.map((status, index) => (
                  <option key={index} value={status.toLowerCase()}>{status}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <Label>Project Images</Label>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Existing Images */}
                {existingImages.map((url, index) => (
                  <div key={`existing-${index}`} className="relative group aspect-square rounded-lg overflow-hidden border">
                    <img src={url} alt="Project" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[10px] text-white px-2 py-0.5">Existing</div>
                  </div>
                ))}

                {/* New Preview Images */}
                {previewImages.map((url, index) => (
                  <div key={`new-${index}`} className="relative group aspect-square rounded-lg overflow-hidden border border-primary/30">
                    <img src={url} alt="Preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-[10px] text-white px-2 py-0.5">New</div>
                  </div>
                ))}

                {/* Add More Button */}
                <div className="relative aspect-square border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center hover:border-primary/50 transition-colors bg-muted/10">
                  <div className="text-center">
                    <Image className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground font-medium">Add Images</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagesChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    multiple
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 border-t mt-auto">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  );
};