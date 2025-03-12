import { useMemo, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import ProductType from "../models/ProductType";
import RoundedButton from "../components/RoundedButton";
import { createProductSelections } from "../models/ProductSelections";
import { mockFishesData } from "../data/mocks";
import ProductCards from "../components/ProductCards";
import { useNavigate } from "react-router-dom";
import { productDetailNavigationInfo } from "./DetailPage";

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
  }, [selectedType])
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  return <PageLayout 
    content={
      <div className="h-full w-full flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h2 className="font-bold">Koleksi Kami</h2>
          <div className="flex justify-between">
            <ProductTypes 
              type={selectedType}
              setType={t => setSelectedType(t)}
            />
            <PriceRange
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>
        </div>
        <ProductCards
          products={selectedProducts.items}
          onClick={p => {
            const { path, options } = productDetailNavigationInfo(p, selectedType);
            navigate(path, options);
          }}
          className={"items-stretch"}
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
                    bg-black/70 p-2 hover:cursor-pointer  ${
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