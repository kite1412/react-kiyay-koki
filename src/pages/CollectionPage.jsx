import { useMemo, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import ProductType from "../models/ProductType";
import RoundedButton from "../components/RoundedButton";
import { createProductSelections } from "../models/ProductSelections";
import { mockFishesData } from "../data/mocks";
import ProductCards from "../components/ProductCards";
import { useNavigate } from "react-router-dom";
import { productDetailNavigationInfo } from "./DetailPage";
import PagerBar from "../components/PagerBar";
import Star from "../assets/star.svg?react";
import ChevronLeft from "../assets/chevron-left.svg?react";

export default function CollectionPage() {
  const [selectedType, setSelectedType] = useState(ProductType.FISH);
  const selections = useMemo(() => {
    return createProductSelections({
      fishItems: mockFishesData,
      aquariumItems: [],
      feedItems: []
    })
  }, []);
  const selectedProducts = useMemo(() => {
    return selections.getProductsByType(selectedType);
  }, [selectedType]);
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);

  return <PageLayout 
    content={
      <div className="h-full w-full flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h2 className="font-bold">Koleksi Kami</h2>
          <div className="flex max-lg:flex-col max-lg:gap-4 lg:justify-between">
            <ProductTypes 
              type={selectedType}
              setType={t => setSelectedType(t)}
            />
            <div className="flex gap-4 flex-wrap">
              <PriceRange
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
              <RatingSelection
                rating={rating}
                setRating={setRating}
              />
            </div>
          </div>
        </div>
        <ProductCards
          products={selectedProducts.items.filter((e, _) => (e.rating === rating || !rating))}
          onClick={p => {
            const { path, options } = productDetailNavigationInfo(p, selectedType);
            navigate(path, options);
          }}
          className={"items-stretch"}
        />
        <PagerBar
          resultPlaceholder="Koleksi"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={selectedProducts.items.length}
          itemsPerPage={15}
        />
      </div>
    }
  />
}

/**
 * @param {string} type - selected {@link ProductType}.
 * @param {(string) => void} setType - set newly selected type.
 */
function ProductTypes({ type, setType }) {
  return (
    <div className="flex gap-4">
      {
        ProductType.values.map((t, _) => (
          <RoundedButton 
            action={t}
            onClick={() => setType(t)}
            fullyRounded={false}
            className={`
              outline-2 outline-primary
              ${
                type != t && ("bg-transparent outline-white")
              }
            `}
            horizontalPadding={8}
            verticalPadding={4}
          />
        ))
      }
    </div>
  );
}

function PriceRange({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}) {
  return (
    <div className="flex gap-2 items-center select-none">
      <PriceField 
        price={minPrice}
        setPrice={setMinPrice}
        placeholder={"Harga Minimum"}
      />
      <div className="w-3 bg-white h-[2px] rounded-full" />
      <PriceField 
        price={maxPrice}
        setPrice={setMaxPrice}
        placeholder={"Harga Maksimum"}
      />
    </div>
  );
}

function RatingSelection({
  rating,
  setRating
}) {
  const [expanded, setExpanded] = useState(false); 

  return (
    <div 
      className={`
        rounded-[2px] outline-1 outline-white items-center relative p-1 px-2
        hover:cursor-pointer select-none
      `}
    >
      <div 
        className="flex gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex gap-1 items-center">
          <Star className="text-gold" />
          <b>{rating || "Semua"}</b>
        </div>
        <ChevronLeft className={`
          ${!expanded ? "rotate-270" : "rotate-90"} size-[24px] transition-transform
        `} />
      </div>
      {
        expanded && (
          <div className="flex flex-col absolute inset-0 top-10 items-center z-100 w-[100px]">
            {
              Array(6).fill(null).map((_, i) => (
                <div
                  className={`
                    px-4 py-2 bg-black/70 flex w-full justify-center
                    ${rating === (5 - i) ? "text-primary" : "text-white"}
                  `}
                  onClick={() => {
                    setExpanded(false);
                    setRating(5 - i);
                  }}
                >
                  <b>{5 - i || "Semua"}</b>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
} 

function PriceField({
  setPrice,
  placeholder
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const priceOptions = [
    { display: "50.000", number: 50000 },
    { display: "100.000", number: 100000 },
    { display: "200.000", number: 200000 },
    { display: "250.000", number: 250000 },
    { display: "None", number: 0 }
  ];

  return (
    <div className="flex gap-2 relative">
      <b className="bg-primary rounded-[4px] py-1 px-2">
        Rp
      </b>
      <div className="flex flex-col relative">
        <div 
          className={`
            outline-1 outline-light-gray rounded-[4px] text-light-gray px-2
            m-auto p-1 hover:cursor-pointer 
          `}
          onClick={() => setShowOptions(!showOptions)}
        >
          {selectedOption ? selectedOption : placeholder}
        </div>
        {
          showOptions && <div className="flex absolute flex-col top-10 z-100">
            {
              priceOptions.map((o, _) => {
                const selected = o.display === selectedOption || o.display == "None" && !selectedOption;
                return <div 
                  className={`
                    bg-black/70 p-2 hover:cursor-pointer ${
                      selected ? "text-primary" : ""
                    }  
                  `}
                  onClick={() => {
                    setShowOptions(false);
                    setSelectedOption(o.display);
                    if (o.display === "None") setSelectedOption("");
                    setPrice(o.number);
                  }}
                >
                  {o.display}
                  <hr className={`
                    ${
                      selected ? "text-primary" : "text-light-gray"
                    }  
                  `} />
                </div>
              })
            }
          </div>
        }
      </div>
    </div>
  );
}