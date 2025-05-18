
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

export const FormDialog = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  formType,
  handleInputChange,
  handleSelectChange,
}) => {
  const dialogTitle = formType ? 
    `${formType.startsWith('add') ? 'Add New' : 'Edit'} ${formType.split('-')[1].charAt(0).toUpperCase() + formType.split('-')[1].slice(1)}` : 
    'Dialog';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4">
          {formType?.includes('project') && (
            <>
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
                <select
                  value={formData.category || 'Residential'}
                  onValueChange={(value) => handleSelectChange('category', value)}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
             
                >
                <option value="" className="text-gray-800 bg-white">Select Category</option>
                  
                    <option value="Residential"  className="text-gray-800 bg-white">Residential</option>
                    <option value="Commercial"  className="text-gray-800 bg-white">Commercial</option>
                    <option value="Interior"  className="text-gray-800 bg-white">Interior</option>
                    <option value="Renovation"  className="text-gray-800 bg-white">Renovation</option>
                  
                </select>
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
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </>
          )}
          
          {formType?.includes('service') && (
            <>
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
                <Label htmlFor="icon">Icon</Label>
                <select
                  value={formData.icon || 'layout'}
                  onValueChange={(value) => handleSelectChange('icon', value)}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
             
                >
                
                  <option value=""  className="text-gray-800 bg-white">Select Icon</option>
                    <option  className="text-gray-800 bg-white" value="layout">Layout</option >
                    <option  className="text-gray-800 bg-white" value="home">Home</option >
                    <option  className="text-gray-800 bg-white" value="info">Info</option >
                    <option  className="text-gray-800 bg-white" value="tool">Tool</option >
                  
                </select>
              </div>
            </>
          )}
          
          {formType?.includes('testimonial') && (
            <>
              <div>
                <Label htmlFor="quote">Quote</Label>
                <Textarea
                  id="quote"
                  name="quote"
                  value={formData.quote || ''}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <select
                  value={formData.rating?.toString() || '5'}
                  onValueChange={(value) => handleSelectChange('rating', parseInt(value))}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
             
                >
                  <option value="" className='text-gray-800 bg-white'>Select a rating</option>               
                    <option  className="text-gray-800 bg-white" value="1">1 Star</option >
                    <option  className="text-gray-800 bg-white" value="2">2 Stars</option >
                    <option  className="text-gray-800 bg-white" value="3">3 Stars</option >
                    <option  className="text-gray-800 bg-white" value="4">4 Stars</option >
                    <option  className="text-gray-800 bg-white" value="5">5 Stars</option >
                 
                </select>
              </div>
            </>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};