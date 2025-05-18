export function Textarea({
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  className = "",
}) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className={`textarea shadow-sm border border-gray-300 textarea-bordered w-full max-w-xs p-2 rounded-md outline-primary resize-y textarea-custom ${className}`}
    />
  );
}
