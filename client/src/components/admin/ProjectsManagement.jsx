import React, { useState } from 'react';
import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/common/Card";
import { Plus, Trash2, Edit } from "lucide-react";
import {
  CardHeader, CardTitle, CardDescription
} from "@/components/common/Card";
// import { useToast } from "@/components/ui/use-toast";
import axios from "../../utils/axiosInstance";
import { ProjectFormDialog } from "./ProjectFormDialog";
import { uploadOnCloudinary } from "../../utils/uploadOnCloudinary";
import { toast } from "react-hot-toast";

export const ProjectsManagement = ({
  projects,
  loading,
  setProjects
}) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    imageFiles: [],
    status: 'active'
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddDialog = () => {
    setCurrentProject(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      imageFiles: [],
      status: 'active'
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title || '',
      category: project.category || '',
      description: project.description || '',
      images: project.images || [], // Store existing URLs
      imageFiles: [],
      status: project.status || 'active'
    });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentProject(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      imageFiles: [],
      status: 'active'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      let projectData;
      let uploadedImageUrls = [];

      // Upload all images if files are provided
      if (formData.imageFiles && formData.imageFiles.length > 0) {
        const fileUploadPromises = Array.from(formData.imageFiles).map(async (file) => {
          const url = await uploadOnCloudinary(file);
          return url;
        });

        uploadedImageUrls = await Promise.all(fileUploadPromises);
      }

      const projectDataToSubmit = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        status: formData.status,
        // Merge remaining existing images with newly uploaded ones
        images: [...(formData.images || []), ...uploadedImageUrls]
      };

      if (!currentProject) {
        // Create new project
        console.log({ projectDataToSubmit })
        response = await axios.post('/api/projects', projectDataToSubmit);
        projectData = response.data.project;
        // toast({
        //   title: "Added",
        //   description: "Project added successfully"
        // });
        toast.success("Project added successfully")
        setProjects([...projects, projectData]);
      } else {
        // Update existing project
        console.log({ projectDataToSubmit })
        response = await axios.put(`/api/projects/${currentProject._id}`, projectDataToSubmit);
        projectData = response.data.project;
        // toast({
        //   title: "Updated",
        //   description: "Project updated successfully"
        // });
        toast.success("Project updated successfully")
        setProjects(projects.map(item => item._id === currentProject._id ? projectData : item));
      }

      handleDialogClose();
    } catch (error) {
      console.error('API Error:', error);

      // toast({
      //   title: "Error",
      //   description: "There was an error saving the project."
      // });

      toast.error(error.response?.data?.errors?.map(error => error.message).join(', ') || "Failed to save project. Please try again.");

      handleDialogClose();
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter(item => item._id !== id));
      // toast({
      //   title: "Deleted",
      //   description: "Project deleted successfully"
      // });
      toast.success("Project deleted successfully")
    } catch (error) {
      console.error('API Error:', error);
      // toast({
      //   title: "Error",
      //   description: "There was an error deleting the project."
      // });
      toast.error(error.response?.data?.errors?.map(error => error.message).join(', ') || "Failed to delete project. Please try again.");
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
          <CardHeader className="flex flex-row justify-between">
            <div className='w-1/2'>

              <CardTitle className="text-2xl font-serif">Manage Projects</CardTitle>
              <CardDescription className="">Add, edit or remove projects displayed on the website</CardDescription>
            </div>

            <Button onClick={openAddDialog} className="w-fit">
              <Plus className="h-4 w-4 mr-0" /> Add New Project
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="py-3 px-4 text-left">Title</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-left">Image</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects && projects.length > 0 ? projects.map((project) => (
                      <tr key={project._id} className="border-b">
                        <td className="py-3 px-4 font-medium">{project.title}</td>
                        <td className="py-3 px-4">{project.category}</td>
                        <td className="py-3 px-4">
                          <div className="h-10 w-16 rounded overflow-hidden">
                            {project.images && project.images.length > 0 ? (
                              <div className="flex -space-x-2">
                                {project.images.slice(0, 3).map((img, i) => (
                                  <img
                                    key={i}
                                    src={img}
                                    alt={`${project.title} preview ${i}`}
                                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                                  />
                                ))}
                                {project.images.length > 3 && (
                                  <div className="h-10 w-10 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">
                                    +{project.images.length - 3}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-gray-500">No Image</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {project.status.toUpperCase()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="secondary"
                              size="sm"

                              onClick={() => openEditDialog(project)}
                            >
                              <Edit className={`h-4 w-4 text-primary`} />
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(project._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="text-center py-4">No Projects found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <ProjectFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        isEditing={!!currentProject}
      />
    </>
  );
};
