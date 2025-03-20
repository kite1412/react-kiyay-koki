import Search from "../assets/search.svg?react";

/**
 * Search bar component.
 * @param {string} value - text field's value.
 * @param {(newValue: string) => void} onValueChange - callback function when the value changes.
 * @param {string} placeholder - placeholder for the input.
 */
export default function SearchBar({ 
  value,
  onValueChange,
  placeholder = "Pencarian",
  className = "",
  inputClassName = ""
}) {
  return (
    <div
      className={`
        flex lg:py-2 lg:px-4 max-lg:p-2 items-center text-secondary-text
        rounded-full bg-white ${className}
      `}
    >
      <input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        className={`max-lg:hidden outline-none ${inputClassName}`}
      />
      <Search className="w-[20px] h-[20px] select-none" />
    </div>
  );
}