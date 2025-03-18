import OutlinedButton from "./OutlinedButton";
import RoundedButton from "./RoundedButton";

export default function AlertDialog({
  title,
  desc,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  className = ""
}) {
  const buttonVerticalPadding = 8;

  return (
    <div className={`
      border-2 border-primary rounded-[8px] p-8 flex flex-col 
      bg-black items-center gap-6 max-w-[600px] w-[70%]${className}
    `}>
      <h1 className="font-bold text-light-orange">{title}</h1>
      <p className="text-center">{desc}</p>
      <div className="flex gap-4 justify-between w-full">
        <OutlinedButton 
          action={cancelText}
          onClick={onCancel}
          verticalPadding={buttonVerticalPadding}
          className="w-[49%]"
        />
        <RoundedButton 
          action={confirmText}
          onClick={onConfirm}
          fullyRounded={false}
          verticalPadding={buttonVerticalPadding}
          className="w-[49%]"
        />
      </div>
    </div>
  );
}