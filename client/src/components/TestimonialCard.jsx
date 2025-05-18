
import React from "react";
import { Card, CardContent } from "@/components/common/Card";
import { Star } from "lucide-react";

const TestimonialCard = ({ quote, author, position, rating, className }) => {
  return (
    <Card className={`border-none hover:shadow-lg hover:translate-y-[-4px]" shadow-md transition-all min-h-[200px] min-w-[300px] ${className})`}>
      <CardContent className="p-6">
        <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              style={{
                fill: i < rating ? "#FFD700" : "#D1D5DB", 
                stroke: "none",
              }}
            />
          ))}

        </div>
        <blockquote className="mb-6">
          <p className="text-foreground italic text-left">{quote}</p>
        </blockquote>
        <div>
          <p className="font-medium text-foreground text-left">{author}</p>
          {position && <p className="text-sm text-muted-foreground text-left">{position}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
