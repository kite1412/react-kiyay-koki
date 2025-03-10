import Product from "../models/Product";
import ProductCard from "./ProductCard";

/**
 * A component that displays a list of product in a grid layout.
 * @param {Array<Product>} products - a list of product to display in a grid. 
 * @param {(Product) => void} onClick - a callback function when a product clicked. 
 */
export default function ProductCards({
   products,
   onClick 
}) {
  return (
    <div className={`
      flex gap-8 flex-wrap justify-center
    `}>
      {
        products.map((p, _) => (
          <ProductCard
            product={p}
            onClick={() => onClick(p)}
          />
        ))
      }
    </div>
  );
}