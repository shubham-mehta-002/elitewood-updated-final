const Button = ({ onClick, children, className = "",type="button" ,variant="primary"}) => {
  function getStyle(variant){
    if(variant === "primary") {
      return "bg-primary text-white hover:bg-primary/90";
    }
    if(variant === "secondary") {
      return "bg-white text-primary hover:bg-gray-100";
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 ${getStyle(variant)} text-sm font-medium rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
};

export {Button};
