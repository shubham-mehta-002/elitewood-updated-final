
import React , {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import axios from "../../utils/axiosInstance"
import toast from 'react-hot-toast';
// import {useToast} from "@/hooks/use-toast";

const Footer = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/services");
        console.log({ serviceRes: response });
        setServices(response.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        toast.error('Something went wrong!');
      }
    };
  
    fetchServices();
  }, []);
  
  return (
    <footer className="bg-taupe text-white pt-16 pb-8 text-left">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Elitewood</h3>
            <p className="text-sm text-gray-300 mb-6">
              Creating inspiring spaces that reflect your unique style and needs.
              Transforming interiors across Dubai.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gold-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gold-light transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:amit@elitewooduae.com"
                className="text-white hover:text-gold-light transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {
                services && services.length>0 && services.slice(0,5).map(service => (<li>
                 
                    {service.title}
                
                </li>))
              }
              
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                SABHA BUILD, Plot No. 1414-0 Jabal Ali Industrial First Dubai, Dubai, 261141 United Arab Emirates
                </span>
              </li>
              {/* <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a
                  href="tel:+97144001234"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +971 4 400 1234
                </a>
              </li> */}
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a
                  href="mailto:amit@elitewooduae.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  amit@elitewooduae.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Elitewood rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
