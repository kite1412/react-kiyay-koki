import FacebookLogo from "../assets/facebook.svg?react";
import TiktokLogo from "../assets/tiktok.svg?react";
import InstagramLogo from "../assets/instagram.svg?react";
import WhatsappLogo from "../assets/whatsapp.svg?react";

export default function Header({ className = "" }) {
  const size = "w-[20px] h-[20px]"

  return (
    <div className={`
      w-full h-[40px] bg-black flex gap-8 justify-center items-center ${className}
    `}>
      <TextButton 
        icon={<FacebookLogo className={size} />}
        text={"kiyay_koki"}
      />
      <TextButton 
        icon={<TiktokLogo className={size} />}
        text={"kiyay_koki"}
      />
      <TextButton 
        icon={<InstagramLogo className={size} />}
        text={"kiyay_koki"}
      />
      <TextButton 
        icon={<WhatsappLogo className={size} />}
        text={"0895 4444 4444"}
      />
    </div>
  );
}

function TextButton({
  icon,
  text,
  onClick
}) {
  return (
    <button
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}