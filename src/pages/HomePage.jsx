import bg from "../assets/landing-page-bg.png";
import RoundedButton from "../components/RoundedButton";

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
        <Landing className="absolute" />
      </div>
    </div>
  );
}

function Landing({ className = "" }) {
  return (
    <div className={`
      flex items-center justify-between w-3/4 top-[calc(40px*3+80px)]
      left-1/2 transform -translate-x-1/2 px-6 ${className}
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