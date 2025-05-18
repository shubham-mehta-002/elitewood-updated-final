
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

export const TestimonialFormDialog = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  handleSelectChange,
  isEditing
}) => {
  const dialogTitle = isEditing ? 'Edit Testimonial' : 'Add New Testimonial';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4">
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
              defaultValue={formData.rating?.toString() || '5'}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
              onChange={(e) => handleSelectChange('rating', parseInt(e.target.value))}
            >
            <option className="text-gray-800 bg-white"  value="">Select a rating</option>
            <option className="text-gray-800 bg-white"  value="1">1 Star </option>
            <option className="text-gray-800 bg-white"  value="2">2 Stars</option>
            <option className="text-gray-800 bg-white"  value="3">3 Stars</option>
            <option className="text-gray-800 bg-white"  value="4">4 Stars</option>
            <option className="text-gray-800 bg-white"  value="5">5 Stars</option>
            
            </select>
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