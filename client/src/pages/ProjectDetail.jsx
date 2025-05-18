
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/AnimatedSection";
// import {Button} from "@/components/ui/button";
import {Button } from "@/components/common/Button";
import {Link} from "react-router-dom";



const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProjectDetail = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`);
        console.log({response})
        setProject(response.data);
      } catch (err) {
        console.log(`Using mock data for project: ${id}`);

        toast.error("Project not found");
        // toast({
        //   title: "Error",
        //   description: "Project not found",
        //   variant: "destructive",
        // })
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjectDetail();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-serif mb-4">Project Not Found</h2>
          <p className="text-muted-foreground">The project you're looking for doesn't exist or has been removed.</p>
          <a href="/projects" className="mt-6 text-primary hover:underline">
            View All Projects
          </a>
        </div>
      </>
    );
  }
  console.log({project})
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
<section className="pt-32 md:pt-40 pb-8">
  <div className="container mx-auto px-4 md:px-6">
    <div className="mx-auto text-left">
      <p className="text-primary mb-2 capitalize">{project.category}</p>
      <h1 className="text-4xl md:text-5xl font-serif mb-6">{project.title}</h1>
      <div className="text-sm text-muted-foreground mb-8">
        {/* <div>
          <span className="font-medium">Status:</span> {project.status}
        </div> */}
        <div>
          <span className="font-medium">Created:</span>{" "}
          {new Date(project.createdAt).toLocaleDateString()}
        </div>
        <div>
          <span className="font-medium mt-2">{project.description}</span> 
        </div>
      </div>
    </div>
  </div>
</section>
      
      
  {project.images && project.images.length > 0 && (
  <AnimatedSection className="py-8 md:py-16 bg-beige-light">
    <div className="container mx-auto px-4 md:px-6">
      <h2 className="text-3xl font-serif mb-8 text-center">Project Gallery</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.images.map((img, index) => {
          return (
            <div key={index} className="rounded-lg overflow-hidden aspect-square">
              <img
                src={img}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          );
        })}
        
      </div>
    </div>
  </AnimatedSection>
)}

      
      {/* CTA Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-serif mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project and discover how our design services can bring your vision to life.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
              Get Started
            </a>
            <a href="/projects" className="inline-block bg-white border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors">
              View More Projects
            </a>
          </div> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link to="/contact">Get Started</Link>
                      </Button>
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link to="/projects">View More Projects</Link>
                      </Button>   
                    </div>
        </div>
      </AnimatedSection>
      
      <Footer />
    </>
  );
};

export default ProjectDetail;
