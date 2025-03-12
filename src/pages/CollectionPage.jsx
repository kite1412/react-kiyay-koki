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
  
  return <PageLayout 
    content={
      <div className="h-full w-full flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h2 className="font-bold">Koleksi Kami</h2>
          <ProductTypes 
            type={selectedType}
            setType={t => setSelectedType(t)}
          />
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
          />
        ))
      }
    </div>
  );
}

function ProductTypeButton() {

}