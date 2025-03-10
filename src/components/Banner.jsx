import RoundedButton from "./RoundedButton";
import Banner1 from "../assets/Akuarium.jpg";

export default function Banners() {
  return (
    <div className="flex justify-center mt-48">
      <Banner
        title="Akuarium Elegan"
        paragraph="Desain Modern, Kuat, & Estetis.
Buat habitat sempurna untuk ikan hias dengan akuarium berkualitas tinggi yang cocok untuk pemula hingga profesional."
        imageSrc={Banner1}
      />
      <Banner
        title="Ikan Koki Berkualitas Terbaik"
        paragraph="Bentuk Unik, Warna Cerah, & Sehat.
Dapatkan ikan koki terbaik untuk akuariummu! Kami menyediakan berbagai jenis ikan koki dengan kualitas unggulan dan harga terbaik."
        imageSrc={Banner1}
        isCenter
      />
      <Banner
        title="Makanan Ikan Sehat"
        paragraph="Formula Lengkap dengan Vitamin & Nutrisi.
Berikan makanan terbaik untuk ikan kokimu! Pelet berkualitas tinggi untuk pertumbuhan optimal dan warna yang lebih cerah."
        imageSrc={Banner1}
      />
    </div>
  );
}

function Banner({ title, paragraph, imageSrc, isCenter, className = "" }) {
  return (
    <div
      className={`group relative h-[300px] w-[500px] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out transform ${
        isCenter ? "scale-100" : "scale-80"
      } ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${imageSrc})` }}>
        <div className="absolute inset-0 bg-black/50 rounded-2xl" />
      </div>

      <div className="relative p-6 flex flex-col gap-3 top-12 text-white">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm">{paragraph}</p>
        <RoundedButton
          action="Temukan Sekarang"
          className="w-fit"
          horizontalPadding={16}
          verticalPadding={4}
        />
      </div>
    </div>
  );
}
