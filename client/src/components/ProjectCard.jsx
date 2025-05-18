
import React from "react";
import { Link } from "react-router-dom";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";


const ProjectCard = ({ id, title, category, imageUrl }) => {

  return (
    <Link to={`/projects/${id}`} className="block group">
      <div className="overflow-hidden transition-transform hover:scale-105 h-full">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={imageUrl || ""} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="py-4">
          <div className="inline-block px-3 py-1 mb-2 text-xs bg-muted rounded-full">
            {category}
          </div>
          <h3 className="text-xl font-serif">{title}</h3>
        </div>
        
        <div className="pt-0 pb-4">
          <span className="text-sm text-primary group-hover:underline">View Project</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
