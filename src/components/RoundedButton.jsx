/**
 * Rounded rectangle text button.
 * @param {any} action - the action name of the button. 
 * @param {Function} onClick - callback function on click event. 
 * @param {number} horizontalPadding - horizontal padding value to the {@link action} in px. 
 * @param {number} verticalPadding - vertical padding value to the {@link action} in px. 
 * @param {string} className - additional class name. 
 * @param {boolean} disabled - whether the button is disabled or not. 
 */
export default function RoundedButton({ 
  action,
  onClick,
  horizontalPadding = 24,
  verticalPadding = 8,
  className = "",
  disabled = false
}) {
  return (
    <div
      className={`
        ${ !disabled ? "bg-primary hover:cursor-pointer hover:opacity-80" : "bg-dark-gray text-gray-400" } rounded-full
        select-none ${className} flex items-center justify-center
      `}
      style={{
        paddingTop: `${verticalPadding}px`,
        paddingBottom: `${verticalPadding}px`,
        paddingLeft: `${horizontalPadding}px`,
        paddingRight: `${horizontalPadding}px`,
      }}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      {action}
    </div>
  );
}