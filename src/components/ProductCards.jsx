import { useState } from "react";
import Product from "../models/Product";
import ProductCard from "./ProductCard";
import RoundedButton from "./RoundedButton";

/**
 * A component that displays a list of product in a grid layout.
 * @param {Array<Product>} products - a list of product to display in a grid. 
 * @param {(Product) => void} onClick - a callback function when a product clicked. 
 * @param {number} showCount - initial number of products to show before expanded, 0 means show all items. 
 */
export default function ProductCards({
   products,
   onClick,
   showCount = 0
}) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="flex flex-col gap-15 items-center">
      <div className={`
        flex gap-8 flex-wrap justify-center
      `}>
        {
          products
            .filter((_, i) => (!showCount || i < showCount || showAll))
            .map((p, _) => (
              <ProductCard 
                product={p}
                onClick={() => onClick(p)}
              />
            ))
        }
      </div>
      {
        showCount && products.length > showCount ? <RoundedButton 
          action={!showAll ? "Lihat Semua" : "Sembunyikan"}
          onClick={() => setShowAll(!showAll)}
          verticalPadding={4}
        /> : <></>
      }
    </div>
  );
}