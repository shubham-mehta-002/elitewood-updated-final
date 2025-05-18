
import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
import AnimatedSection from "@/components/AnimatedSection";
import {toast} from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import axios from "./../utils/axiosInstance"
import {Button} from "@/components/common/Button"

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);


  useEffect(()=>{
    fetchProjects()
  },[])


  useEffect(() => {
    if (projects.length > 0) {
      const uniqueCategories = Array.from(
        new Set(projects.map(project => project.category))
      );
      setCategories(uniqueCategories);
    }
  }, [projects]);
 

 
  // useEffect(() => {
  //   if (categories.length > 0) {
  //     setActiveCategory(null);
  //   }
  // }, [categories]);

 
  useEffect(() => {
    if (activeCategory === null) {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.category === activeCategory)
      );
    }
  }, [activeCategory, projects]);

  

  const fetchProjects = async()=>{
    try {
      setIsLoading(true);
      const response = await axios.get('/api/projects');
      
      setProjects(response.data);
    } catch (error) {
      console.log('Falling back to mock data');
      toast.error("Sometihng went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    console.log({filteredProjects})

  },[filteredProjects])
  return (
    <>
      <Navbar />
       <section className="pt-10 pb-10 md:pt-40 md:pb-24 bg-beige-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Projects</h1>
            <p className="text-xl text-muted-foreground">
              Explore our portfolio of design projects spanning residential, commercial, and renovation works.
              Each project reflects our commitment to exceptional design and client satisfaction.
            </p>
          </div>
        </div>
        
          <AnimatedSection className="mb-16 mt-4">
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                <buton
                    key={"All"}	
                    onClick={() => setActiveCategory(null)}
                    className={`px-4 py-2 rounded-md cursor-pointer transition-all ${
                      activeCategory === null
                        ? "bg-primary text-white"
                        : "bg-white hover:bg-gray-100  text-primary"
                    }`}
                  >
                    All
                  </buton>
                  
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-md transition-all ${
                      activeCategory === category
                        ? "bg-primary text-white"
                        : "bg-white hover:bg-gray-100  text-primary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
                
              </div>
            </AnimatedSection>
      </section>
      <div className="bg-beige-light pb-24">
        <div className="container mx-auto px-4">
   {isLoading ? (
  <div className="flex justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
) : (
  filteredProjects && filteredProjects.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProjects.map((project, index) => (
        <AnimatedSection key={project._id} delay={index * 100}>
          <ProjectCard
            id={project._id}
            title={project.title}
            category={project.category}
            imageUrl={project.images[0]}
          />
        </AnimatedSection>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center text-muted-foreground text-center min-h-40 w-full">
      No projects available
    </div>
  )
)}


        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;
