import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import {toast} from "react-hot-toast";
import { Home, Layout, Image, Users } from "lucide-react";
import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import { Button } from "@/components/common/Button";
import axios from "../utils/axiosInstance"

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const icons = [Home, Layout, Image, Users];
  
  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/services");
      setServices(response.data);
    } catch (error) {
      console.log('Falling back to mock data');
      toast.error("Something went wrong")
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-beige-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive interior design solutions tailored to your needs and vision
            </p>
          </div>
        </div>
      </section>
      
     {/* Services List Section */}
<AnimatedSection className="py-16 md:py-24">
  <div className="container mx-auto px-4 md:px-6">
    {services && services.filter(srv => srv.status.toLowerCase() === "active").length > 0 ? (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.filter(s => s.status.toLowerCase() === "active").map((service, index) => (
          <AnimatedSection key={service._id} delay={index * 200} className="h-full">
            <ServiceCard
              title={service.title}
              description={service.description}
              href={`/services/${service._id}`}
              icon={icons[index % icons.length]}
            />
          </AnimatedSection>
        ))}
      </div>
    ) : (
      <p className="flex items-center justify-center text-muted-foreground text-center min-h-40 w-full">No services available</p>
    )}
  </div>
</AnimatedSection>

      
     
      {/* CTA Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-serif mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project and discover how our services can bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/projects">View Our Projects</Link>
            </Button>   
          </div>
        </div>
      </AnimatedSection>

      

      <Footer />
    </>
  );
};

export default Services;
