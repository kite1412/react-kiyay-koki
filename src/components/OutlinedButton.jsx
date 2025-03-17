export default function OutlinedButton({
  action,
  onClick,
  verticalPadding = 8,
  horizontalPadding = 24,
  className = ""
}) {
  return (
    <div
      className={`
        border-2 border-white hover:opacity-80 select-none rounded-[4px] ${className}
        hover:cursor-pointer
      `}
      style={{
        paddingRight: `${horizontalPadding}px`,
        paddingLeft: `${horizontalPadding}px`,
        paddingTop: `${verticalPadding}px`,
        paddingBottom: `${verticalPadding}px`
      }}
      onClick={onClick}
    >
      {action}
    </div>
  );
}