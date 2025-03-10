import RoundedButton from "../components/RoundedButton";
import ChevronLeft from "../assets/chevron-left.svg?react";
import ChevronRight from "../assets/chevron-right.svg?react";
import Fish1 from "../assets/fish-1.svg?react";
import Fish2 from "../assets/fish-2.svg?react";
import FreeShipping from "../assets/free-shipping.svg?react";
import orandaRoseTail from "../assets/oranda-rose-tail.png";
import fishSample1 from "../assets/fish-sample-1.png";
import fishSample2 from "../assets/fish-sample-2.png";
import fishSample3 from "../assets/fish-sample-3.png";
import PageLayout from "../layouts/PageLayout";
import ProductCards from "../components/ProductCards";
import { useState } from "react";
import { createProduct } from "../models/Product";
import ProductType from "../models/ProductType";
import ProductSelections, { createProductSelections } from "../models/ProductSelections";
import testimonies from "../data/testimonies.json";
import { useNavigate } from "react-router-dom";
import { productDetailNavigationInfo } from "./DetailPage";
import Banners from "../components/Banner";

const fishImages = [fishSample1, fishSample2, fishSample3];

export default function HomePage() {
  return <PageLayout content={
    <div className={`
      relative h-full w-full flex flex-col gap-30
    `}>
      <div className={`
        flex flex-col gap-[120px]
      `}>
        <Landing />
        <Benefits />
        <Banners />
      </div>
      <Recommendation
        selections={
          createProductSelections({
            fishItems: Array.from({ length: 8 }).map((_, i) => {
              return createProduct({
                id: i + 1,
                image: orandaRoseTail,
                name: "Oranda Rose Tail",
                price: 250000,
                rating: i + 1,
                totalVotes: i,
                stock: (i + 1) * (i + 1), 
                discountPercentage: 20,
                spec: {
                  warna: "Merah",
                  ukuran: "Besar",
                  jenis_ikan: "Rose Tail",
                  ukuran_cm: 13
                },
                ratingDistributions: [
                  {
                    score: 1,
                    count: 2
                  },
                  {
                    score: 2,
                    count: 3
                  },
                  {
                    score: 3,
                    count: 3
                  },
                  {
                    score: 4,
                    count: 10
                  },
                  {
                    score: 5,
                    count: 18
                  }
                ]
              })
            }),
            aquariumItems: [],
            feedItems: []
          })
        }
      />
      <Testimonies testimonies={testimonies} />
    </div>
  } />;
}

function Landing({ className = "" }) {
  return (
    <div className={`
      flex items-center justify-between px-6
      ${className} gap-20
    `}>
      <BrandIntroduction />
      <FishesPager images={fishImages} />
    </div>
  );
}

function BrandIntroduction() {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-bold">
        <h1 className="text-primary">Kiyay Goldfish Lampung</h1>
        <h1>Keindahan Akuarium Dimulai di Sini</h1>
      </div>
      <div>
        Jadikan akuariummu lebih hidup dengan ikan koki pilihan terbaik! Kami
        menyediakan ikan koki sehat dengan warna cerah dan kualitas unggul.
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

function FishesPager({ images }) {
  const iconSize = "h-[40px] w-[40px]"

  return (
    <div className="flex flex-col justify-center gap-10 relative">
      <div className="relative ">
        <img 
          src={orandaRoseTail}
          className="rounded-[8px] border-2 "
        />
        <div className="flex justify-between absolute inset-y-0 items-center w-full">
          <ChevronLeft className={`${iconSize}`} />
          <ChevronRight className={`${iconSize}`} />
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {
          images.map((i, _) => {
            return <img 
              src={i}
              // 3:4 ratio 
              className="rounded-[8px] border-2 h-[100px] w-[133px]"
            />
          })
        }
      </div>     
    </div>
  );
}

function Benefits() {
  return (
    <div
      className={`
      flex py-4 px-6 rounded-full bg-primary text-white justify-evenly
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
        className="max-sm:hidden"
      />
      <Benefit
        icon={<FreeShipping />}
        title={"Gratis Pengiriman"}
        desc={"Pengiriman gratis ke lokasi tertentu!"}
        className="max-sm:hidden"
      />
    </div>
  );
}

function Benefit({
  icon,
  title,
  desc,
  className = ""
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {icon}
      <div className="flex flex-col gap-1">
        <div className="text-[16px] font-bold">{title}</div>
        <div className="text-[14px]">{desc}</div>
      </div>
    </div>
  );
}

const defaultLengthToShow = 6;

/**
 * @param {ProductSelections} selections - selections for this recommendation which each selection
 *  contains the type and the products. read {@link ProductSelections} for clarity. 
 */
function Recommendation({ selections }) {
  const [selected, setSelected] = useState(selections.fishProducts);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 items-center">
      <h2 className="font-bold">Rekomendasi Terbaik</h2>
      <div className="flex gap-4">
        {
          ProductType.values.map((p, _) => (
            <RoundedButton 
              action={p}
              onClick={() => setSelected(selections.getProductsByType(p))}
              fullyRounded={false}
              className={`
                outline-2 outline-primary
                ${
                  selected.type != p && ("bg-transparent outline-white")
                }
              `}
            />
          ))
        }
      </div>
      <ProductCards 
        products={
          showAll ? selected.items : selected.items.slice(
            0,
            Math.min(defaultLengthToShow, selected.items.length)
          )
        }
        onClick={p => {
          const { path, options } = productDetailNavigationInfo(p, selected.type);
          navigate(path, options);
        }}
      />
      {
        selected.items.length > defaultLengthToShow && (
          <RoundedButton 
            action={!showAll ? "Lihat Semua" : "Sembunyikan"}
            onClick={() => setShowAll(!showAll)}
            verticalPadding={4}
          />
        )
      }
    </div>
  );
}

/**
 * @param {Array<Object>} testimonies - a list of testimony. 
 */
function Testimonies({ testimonies }) {
  if (testimonies.length === 0) return;

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimony = testimonies[currentIndex];
  const iconSize = "h-[40px] w-[40px]";
  const prevDisabled = !currentIndex;
  const nextDisabled = currentIndex === testimonies.length - 1;

  return (
    <div className="flex flex-col gap-6 items-center lg:px-20 max-lg:px-10 w-full">
      <h2 className="font-bold">Testimoni Pelanggan Kami</h2>
      <div className="flex flex-col gap-4 items-center w-full">
        <div className="flex gap-4 text-center items-center justify-between w-full">
          <CircleIconButton
            icon={
              <ChevronLeft className={`${iconSize}`} />
            }
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className={`${prevDisabled && "opacity-0"}`}
            disabled={prevDisabled}
          />
          {currentTestimony.content}
          <CircleIconButton 
            icon={
              <ChevronRight className={`${iconSize}`} />
            }
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className={`${nextDisabled && "opacity-0"}`}
            disabled={nextDisabled}
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-primary">
            {currentTestimony.name}
          </h3>
          <div>{currentTestimony.role}</div>
        </div>
      </div>
    </div>
  );
}

function CircleIconButton({
  icon,
  onClick,
  className,
  disabled
}) {
  return <RoundedButton 
    action={icon}
    onClick={onClick}
    verticalPadding={0}
    horizontalPadding={0}
    disabled={disabled}
    className={`h-fit w-fit ${className}`}
  />
}
