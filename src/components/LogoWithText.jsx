import AppLogo from "../assets/app-logo.svg?react";

export default function LogoWithText({ className = "" }) {
  return (
    <div className={`flex gap-4 items-center ${className}`}>
      <AppLogo className="h-[30px] w-[30px]" />
      <b>Kiyay Goldfish</b>
    </div>
  );
}