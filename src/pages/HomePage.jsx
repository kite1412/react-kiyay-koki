import bg from "../assets/landing-page-bg.png";
import RoundedButton from "../components/RoundedButton";
import ChevronLeft from "../assets/chevron-left.svg?react";
import ChevronRight from "../assets/chevron-right.svg?react";
import Fish1 from "../assets/fish-1.svg?react";
import Fish2 from "../assets/fish-2.svg?react";
import FreeShipping from "../assets/free-shipping.svg?react";

export default function HomePage() {
  return (
    <div
      className={`
        h-full w-full
      `}
    >
      <div class="select-none relative">
        <div className={`
          absolute inset-0 bg-gradient-to-tr from-[rgb(40,40,40)] to-dark-teal-blue
          mix-blend-multiply
        `} />
        <img src={bg} className="inset-0 w-full h-full object-cover" />
        <Landing />
        <Benefits />
      </div>
    </div>
  );
}

const contentPadding = "absolute w-3/4 left-1/2 transform -translate-x-1/2"

function Landing({ className = "" }) {
  return (
    <div className={`
      flex items-center justify-between top-[calc(40px*3+80px)] px-6
      ${contentPadding} ${className}  
    `}>
      <BrandIntroduction />
    </div>
  );
}

function BrandIntroduction() {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-bold text-4pxl text-[32px]">
        <div className="text-primary">Kiyay Goldfish Lampung</div>
        <div>Keindahan Akuarium Dimulai di Sini</div>
      </div>
      <div>
        Jadikan akuariummu lebih hidup dengan ikan koki
        pilihan terbaik! Kami menyediakan ikan koki sehat
        dengan warna cerah dan kualitas unggul.
      </div>
      <RoundedButton
        action={"Temukan Sekarang"}
        className="w-fit"
        horizontalPadding={16}
        verticalPadding={4}
      />
    </div>
  );
}

function FishesPager() {
  return (
    <div className="flex flex-col gap-6">
      
    </div>
  );
}

function Benefits() {
  return (
    <div className={`
      flex py-4 px-6 rounded-full bg-primary text-white justify-evenly
      ${contentPadding}
    `}>
      <Benefit 
        icon={<Fish1 />}
        title={"Kualitas Terbaik"}
        desc={"Kualitas Ikan koki dengan warna cerah"}
      />
      <Benefit 
        icon={<Fish2 />}
        title={"Ikan Besar & Sehat"}
        desc={"Ikan Koki dengan perawatan terbaik."}
      />
      <Benefit 
        icon={<FreeShipping />}
        title={"Gratis Pengiriman"}
        desc={"Pengiriman gratis ke lokasi tertentu!"}
      />
    </div>
  );
}

function Benefit({
  icon,
  title,
  desc
}) {
  return (
    <div className="flex items-center gap-4">
      {icon}
      <div className="flex flex-col gap-1">
        <div className="text-[16px] font-bold">{title}</div>
        <div className="text-[14px]">{desc}</div>
      </div>
    </div>
  );
}