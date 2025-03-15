import RoundedButton from "./RoundedButton";
import Banner1 from "../assets/Akuarium.jpg";
import { useEffect, useRef } from "react";
import { easeIn, motion, spring, useInView } from "framer-motion";

export default function Banners({ onClick }) {
  return (
    <div className="flex justify-center items-center gap-2">
      <Banner
        title="Akuarium Elegan"
        paragraph={`
          Desain Modern, Kuat, & Estetis.
          Buat habitat sempurna untuk ikan hias dengan akuarium berkualitas tinggi yang cocok untuk pemula hingga profesional.  
        `}
        imageSrc={Banner1}
        onClick={onClick}
        className="max-sm:hidden md:w-[33%]"
        index={0}
      />
      <Banner
        title="Ikan Koki Berkualitas Terbaik"
        paragraph={`
          Bentuk Unik, Warna Cerah, & Sehat.
          Dapatkan ikan koki terbaik untuk akuariummu! Kami menyediakan berbagai jenis ikan koki dengan kualitas unggulan dan harga terbaik.  
        `}
        imageSrc={Banner1}
        isCenter
        onClick={onClick}
        className="md:w-[33%] max-sm:w-[100%]"
        index={1}
      />
      <Banner
        title="Makanan Ikan Sehat"
        paragraph={`
          Formula Lengkap dengan Vitamin & Nutrisi.
          Berikan makanan terbaik untuk ikan kokimu! Pelet berkualitas tinggi untuk pertumbuhan optimal dan warna yang lebih cerah.  
        `}
        imageSrc={Banner1}
        onClick={onClick}
        className="max-sm:hidden md:w-[33%]"
        index={2}
      />
    </div>
  );
}

function Banner({ 
  title,
  paragraph,
  imageSrc,
  isCenter,
  onClick,
  index,
  className = "" 
}) {
  const ref = useRef();
  const isInView = useInView(ref, { once: true,  margin: "-20px" });
  const invisible = {
    opacity: 0,
    scale: 0
  }

  useEffect(() => {
    console.log(isInView);
  }, [isInView]);

  return (
    <motion.div
      className={`
        group relative size-[100%] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out transform ${
          !isCenter && "h-[90%] scale-x-95"
        } flex items-center ${className}
      `}
      ref={ref}
      initial={{
        ...invisible,
        marginRight: `${index * 80}px`
      }}
      animate={
        isInView ? {
          opacity: 1,
          scale: 1,
          marginRight: 0
        } : invisible
      }
      transition={{
        delay: 0.05 * index,
        duration: 0.05 * index
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-2xl" />
      </div>

      <div className="relative px-6 flex flex-col gap-3 text-white py-20">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm">{paragraph}</p>
        <RoundedButton
          action="Temukan Sekarang"
          className="w-fit"
          horizontalPadding={16}
          verticalPadding={4}
          onClick={onClick}
        />
      </div>
    </motion.div>
  );
}
