import SignOut from "../assets/sign-out.svg?react";

export default function SignOutButton({
  onClick,
  className = ""
}) {
  return (
    <div 
      className={`
        flex items-center gap-4 font-bold hover:cursor-pointer
        hover:opacity-80 select-none ${className}
      `}
      onClick={onClick}
    >
      <SignOut className={"size-[20px]"} />
      Keluar
    </div>
  );
}