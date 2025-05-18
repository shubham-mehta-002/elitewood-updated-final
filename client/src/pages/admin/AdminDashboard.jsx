
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
// import { Button } from "@/components/ui/button";
import { Button } from "@/components/common/Button";
import {toast} from "react-hot-toast";
import axios from "../../utils/axiosInstance"
import  { jwtDecode } from "jwt-decode";
import { DashboardOverview, ProjectsManagement, ServicesManagement, TestimonialsManagement } from "../../components/admin";


const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([]);
  const [leads,setLeads] = useState([]);
  const [loading, setLoading] = useState(false)
  const [formType, setFormType] = useState('')
  const navigate = useNavigate();

  

  
 
  const fetchContent = async () => {
    try {
      // Call APIs to get services, testimonials, and projects
      const [servicesRes, testimonialsRes, projectsRes, leadsRes] = await Promise.all([
        axios.get("/api/services"),      
        axios.get("/api/testimonials"),   
        axios.get("/api/projects"),       
        axios.get("/api/leads")
      ]);
      console.log({servicesRes, testimonialsRes, projectsRes,leadsRes})
      setServices(servicesRes.data);         
      setTestimonials(testimonialsRes.data); 
      setProjects(projectsRes.data);          
      setLeads(leadsRes.data);
   
    } catch (error) {
      console.error("Fetch Content Error:", error);
      
      if(error.response && error.response.status === 401) {

        toast.error("Unauthorized! You need to login first")
        // navigate("/admin/login");
        return;
      }
      toast.error("Failed to fetch content. Please try again.")
     
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
  
    toast.success("Logged out successfully")
    navigate("/admin/login");
  };


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log({decoded})
      if (decoded.exp < currentTime) {
        // Token expired
        
        toast.error("Unauthorized! You need to login first")
        navigate('/admin/login');
        return;
      }
      fetchContent()
    } catch (error) {
      // Invalid token
      navigate('/admin/login');
      return;
    }


  }, []);


  return (
    <div className="min-h-screen bg-beige-light">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <h1 className="text-2xl font-serif">Admin Dashboard</h1>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>




      <main className="container mx-auto px-4 md:px-6 py-8">
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <DashboardOverview projects={projects} leads={leads} services={services} setLeads={setLeads}/>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManagement
              projects={projects}
              loading={loading}
              setProjects={setProjects}
            />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManagement
              services={services}
              loading={loading}
              setServices={setServices}
            />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManagement
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};


export default AdminDashboard;
