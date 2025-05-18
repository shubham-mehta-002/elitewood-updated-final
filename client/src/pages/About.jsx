
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/AnimatedSection";


const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-beige-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">About Our Studio</h1>
            <p className="text-xl text-muted-foreground">
              A premier interior design studio bringing creativity, expertise, 
              and Dubai's unique aesthetic to every project.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-serif mb-6 text-left">Our Story</h2>
              <p className="mb-4 text-muted-foreground text-left">
                Dubai Design Oasis was founded in 2015 by Aisha Rahman, who 
                recognized the need for interior design solutions that balance 
                luxurious aesthetics with practical functionality in the 
                rapidly developing landscape of Dubai.
              </p>
              <p className="mb-4 text-muted-foreground text-left">
                What began as a small studio with a handful of residential projects 
                has grown into a comprehensive design firm handling both residential 
                and commercial projects across the UAE and beyond.
              </p>
              <p className="text-muted-foreground text-left">
                Our journey has been defined by our commitment to understanding 
                each client's unique vision and translating it into spaces that 
                exceed their expectations, all while respecting timelines and budgets.
              </p>
            </div>
            <div className="relative order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                alt="Designer's Workspace"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-serif mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">
              The principles that guide our approach to every project and client relationship
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-serif mb-4">Client-Centric Approach</h3>
              <p className="text-muted-foreground">
                We prioritize understanding your needs, preferences, and lifestyle to create 
                spaces that are uniquely yours and enhance your daily experience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-serif mb-4">Design Excellence</h3>
              <p className="text-muted-foreground">
                We're committed to creating aesthetically stunning spaces that incorporate 
                the latest design trends while maintaining timeless appeal.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-serif mb-4">Attention to Detail</h3>
              <p className="text-muted-foreground">
                From the grand concept to the smallest accessory, we ensure every element 
                contributes to a cohesive and harmonious design.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </>
  );
};

export default AboutPage;



      