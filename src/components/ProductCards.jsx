import Product from "../models/Product";
import ProductCard from "./ProductCard";

/**
 * A component that displays a list of product in a grid layout.
 * @param {Array<Product>} products - a list of product to display in a grid. 
 */
export default function ProductCards({ products }) {
  return (
    <div className={`
      flex gap-8 flex-wrap justify-center
    `}>
      {
        products.map((p, _) => (
          <ProductCard product={p} />
        ))
      }
    </div>
  );
}