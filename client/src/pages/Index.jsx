
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Layout, Image, Users } from "lucide-react";

import toast from 'react-hot-toast';
import { Button } from "@/components/common/Button";


import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCard from "@/components/TestimonialCard";
import ServiceCard from "@/components/ServiceCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import {useToast} from "@/hooks/use-toast";
import axios from "../utils/axiosInstance"


const HomePage = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([]);

//   const { toast} = useToast()

  const icons = [Home, Layout, Image, Users];

  const fetchContent = async () => {
    try {
      // Call APIs to get services, testimonials, and projects
      const [servicesRes, testimonialsRes, projectsRes] = await Promise.all([
        axios.get("/api/services"),      
        axios.get("/api/testimonials"),   
        axios.get("/api/projects?status=featured"),      
      ]);
      console.log({servicesRes, testimonialsRes, projectsRes})
      setServices(servicesRes.data);         
      setTestimonials(testimonialsRes.data); 
      setProjects(projectsRes.data);          
    } catch (error) {
      console.error("Fetch Content Error:", error);
      toast.error("Failed to fetch content. Please try again.");	
    //   toast({
    //     title: "Error",
    //     description: "Failed to fetch content. Please try again.",
    //     variant: "destructive",
    //   });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  useEffect(()=>{
    fetchContent();
  },[])
    return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
            alt="Elegant Interior"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-6 animate-fade-up text-left">
            Interior Design to suit your lifestyle & Budget
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 animate-fade-up text-left" style={{ animationDelay: "0.2s" }}>
            At Dubai Design Oasis, we redefine the essence of home interiors with a perfect blend of sophistication and innovation. 
            Our commitment lies in crafting bespoke designs that not only meet but exceed your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/projects">Explore Our Work</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-whitesmoke text-white hover:bg-white/10">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection className="py-16 md:py-24 bg-beige-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">About Dubai Design Oasis</h2>
              <p className="text-muted-foreground mb-6">
              At Dubai Design Oasis, we specialize in transforming houses into homes. Our extensive range of products includes: Modular Kitchen, Wardrobe, Bathroom Vanity & LCD Panel Design. 
              Step into a world where each detail is a brushstroke of elegance, turning your living spaces into a canvas of luxury.
              </p>
              <p className="text-muted-foreground mb-8">
              We craft thoughtful environments that reflect your personality and enhance your life.
              </p>
              <Button asChild>
                <Link to="/about" className="flex items-center">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1692&q=80"
                alt="Interior Designer Working"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-8 -left-8 bg-primary p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-4xl font-serif text-white">10+</p>
                <p className="text-white/80">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Services</h2>
            <p className="text-muted-foreground">
              Comprehensive design solutions tailored to your specific needs and vision
            </p>
          </div>
          {services && services.filter(service => service.status.toLowerCase() === "active").length > 0 ? (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {services.filter(service => service.status.toLowerCase() === "active")
      .slice(0, Math.min(services.length, 3))
      .map((service, index) => (
        <ServiceCard
          key={service._id}
          href={`/services/${service._id}`}
          title={service.title}
          description={service.description}
         icon={icons[index % icons.length]}
      
        />
      ))}
  </div>
) : (
  <div className="flex items-center justify-center text-muted-foreground text-center min-h-40">
    No services available
  </div>
)}

          {
            services && services.length > 0 &&
            <div className="text-center mt-12">
            <Button asChild >
              <Link to="/services" className="flex items-center mx-auto">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          }
        </div>
      </AnimatedSection>

      {/* Featured Projects Section */}
      <div className="flex flex-col md:flex-row w-full">
  {projects && projects.length > 0 && (
    <AnimatedSection className="py-16 md:py-24 bg-secondary w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">
             Showcasing our finest interior designs across Dubai
            </p>
          </div>
        

        {/* Grid container OUTSIDE the map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, Math.min(projects.length, 3)).map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              title={project.title}
              category={project.category}
              imageUrl={project.images[0]}
            />
          ))}
        </div>
          {
            projects && projects.length > 0 &&
            <div className="text-center mt-12">
            <Button asChild >
              <Link to="/projects" className="flex items-center mx-auto">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          }
      </div>
    </AnimatedSection>
  )}
</div>

      {/* Testimonials */}
      <AnimatedSection className="py-16 md:py-24">
  <div className="container mx-auto px-4 md:px-6">
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h2 className="text-3xl md:text-4xl font-serif mb-4">Client Testimonials</h2>
      <p className="text-muted-foreground">
        Don't just take our word for it - hear what our clients have to say
      </p>
    </div>
    {testimonials && testimonials.length > 0 ? (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            position={testimonial.position}
            rating={testimonial.rating}
          />
        ))}
      </div>
    ) : (
      <div className="flex items-center justify-center text-muted-foreground text-center min-h-40">
        No testimonials available
      </div>
    )}
  </div>
</AnimatedSection>


      {/* CTA Section */}
      <AnimatedSection className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1930&q=80"
            alt="Elegant Interior"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Transform Your Space?</h2>
            <p className="text-lg md:text-xl mb-8">
              Contact us today to schedule a consultation and take the first step 
              towards creating the interior of your dreams.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </>
  );
};

export default HomePage;
