export function Input({
  id,
  name,
  value,
  onChange,
  placeholder,
  required,
  className = "",
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      value={value}
      id={id}
      name={name}
      className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm 
                  transition duration-200 ease-in-out 
                  placeholder:text-gray-400 
                  focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none
                  ${className}`}
    />
  );
}


