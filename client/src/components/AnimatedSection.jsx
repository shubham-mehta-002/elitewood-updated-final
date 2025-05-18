
import React, { useEffect, useRef } from "react";

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              section.classList.add("animate-fade-in");
              section.classList.remove("opacity-0");
            }, delay);
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      className={`opacity-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
