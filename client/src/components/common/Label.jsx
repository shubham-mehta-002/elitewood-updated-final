export function Label({ htmlFor, children, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium font-semibold text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
}
