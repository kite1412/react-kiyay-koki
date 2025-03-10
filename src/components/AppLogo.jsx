import Logo from "../assets/app-logo.svg?react";

export default function AppLogo({ 
  className = "",
  withText = true
}) {
  return (
    <div className={`flex gap-3 items-center ${className}`}>
      <Logo className="h-[30px] w-[30px]" />
      <b className={`${withText ? "block" : "hidden"}`}>Kiyay Goldfish</b>
    </div>
  );
}