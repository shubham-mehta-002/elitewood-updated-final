import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/common/Input"
import { Label } from "@/components/common/Label"
import { Textarea } from "@/components/common/Textarea"
import AnimatedSection from "@/components/AnimatedSection";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "react-hot-toast"
import { Button } from "@/components/common/Button";
import axios from "../utils/axiosInstance";

const ContactPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSelectChange = (value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     serviceType: value,
  //   }));
  // };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      serviceType: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log({ formData })
      const response = await axios.post('/api/leads', formData);

      if (!response.data) {
        throw new Error('Failed to submit inquiry');
      }

      toast.success("Thank you for contacting us. We'll be in touch shortly.")

      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        message: "",
      });
    } catch (error) {
      console.log({ error })
      //   toast({
      //     title: "Error",
      //     description: error.response?.data?.errors?.map(error => error.message).join(', ')||"Failed to submit inquiry. Please try again.",
      //     variant: "destructive",
      //   });
      toast.error(error.response?.data?.errors?.map(error => error.message).join(', ') || "Failed to submit inquiry. Please try again.")
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }
  useEffect(() => {
    fetchServices();
  }, [])

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-beige-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Reach out to discuss your project or schedule a consultation
            </p>
          </div>
        </div>
      </section>

      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-left">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below, and one of our design consultants will contact you
                to discuss your project needs and schedule a consultation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Interest</Label>
                    <select
                      value={formData.serviceType || ""}
                      onChange={handleSelectChange}
                      name="serviceType"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
                    >
                      <option value="" disabled required>
                        Select a service
                      </option>
                      {services && services.length > 0 &&
                        services.map((service) => (
                          <option key={service._id} className="text-gray-800 bg-white" value={service._id}>
                            {service.title}
                          </option>
                        ))
                      }
                    </select>

                  </div>
                </div>

                <div className="md:col-span-2 space-y-2 ">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project"
                    className="w-full"
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Send Inquiry"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="lg:pl-12">
              <h2 className="text-3xl font-serif mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Visit our design studio or reach out through any of the following channels:
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-lg mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      Jabal Ali Industrial First Dubai, <br />
                      Dubai, 261141 United Arab Emirates
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email Us</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:dummy@dubaidesignoasis.com" className="hover:text-primary">
                        dummy@dubaidesignoasis.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-lg mb-1">Working Hours</h3>
                    <p className="text-muted-foreground">
                      Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Friday: Closed
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </>
  );
};

export default ContactPage;
