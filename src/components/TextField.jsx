export default function TextField({
  label,
  value,
  setValue,
  placeholder,
  leading,
  trailing,
  disabled = false,
  className = ""
}) {
  return (
    <div className={`flex flex-col gap-2 ${className} min-w-[300px]`}>
      <b className="text-start">{label}</b>
      <div className="flex gap-3">
        {leading}
        <input 
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            ${value ? "text-white" : "text-secondary-text italic"} border-2 border-primary
            p-4 rounded-[8px] transition-colors w-full
          `}
        />
        {trailing}
      </div>
    </div>
  );
}

/**
 * Typically used as {@link TextField}'s 'leading' or 'trailing'.
 * @param {any} text
 */
export function Accessory({ text, className = "" }) {
  return (
    <div className={`bg-primary rounded-[8px] font-bold p-4 ${className}`}>
      {text}
    </div>
  );
}