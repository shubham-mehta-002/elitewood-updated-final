import { useState } from 'react'
import './App.css'

import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact"
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Services from "./pages/Services"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import NotFound from "./pages/NotFound"
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route  path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
         <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </>
  )
}

export default App
