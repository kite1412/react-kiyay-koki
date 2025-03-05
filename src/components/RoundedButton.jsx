/**
 * Rounded rectangle text button.
 * @param {string} action - the action name of the button. 
 * @param {Function} onClick - callback function on click event. 
 * @param {number} horizontalPadding - horizontal padding value to the {@link action} in px. 
 * @param {number} action - vertical padding value to the {@link action} in px. 
 * @param {string} className - additional class name. 
 * @returns 
 */
export default function RoundedButton({ 
  action,
  onClick,
  horizontalPadding = 24,
  verticalPadding = 8,
  className = ""
}) {
  return (
    <div
      className={`
        bg-primary hover:opacity-80 rounded-full hover:cursor-pointer
        select-none ${className} flex items-center justify-center
      `}
      style={{
        paddingTop: `${verticalPadding}px`,
        paddingBottom: `${verticalPadding}px`,
        paddingLeft: `${horizontalPadding}px`,
        paddingRight: `${horizontalPadding}px`,
      }}
      onClick={onClick}
    >
      {action}
    </div>
  );
}