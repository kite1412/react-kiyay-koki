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
import PriceRange from "../components/PriceRange";
import RatingSelection from "../components/RatingSelection";

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