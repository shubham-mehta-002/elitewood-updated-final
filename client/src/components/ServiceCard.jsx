
import React from "react";
import { Link } from "react-router-dom";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

const ServiceCard = ({ title, description, icon: Icon, className }) => {

  return (
   
      <div
        className={`
          border-none shadow-md transition-all hover:shadow-lg hover:translate-y-[-4px]" px-3 py-5 min-h-[200px] min-w-[350px] rounded-lg
          ${className}
        `}
      >
        <div className="pb-2">
          {Icon && <div className="h-12 w-full rounded-full">
            <Icon className="h-6 w-6 text-primary mx-auto" />
          </div>}
          <h3 className="text-xl font-serif text-foreground text-left">{title}</h3>
        </div>
        <div>
          <p className="text-muted-foreground text-left">{description}</p>
        </div>
      </div>

  );
};

export default ServiceCard;
