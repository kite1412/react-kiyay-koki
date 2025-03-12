import Product from "../models/Product";
import ProductPrice from "./ProductPrice";
import Rating from "./Rating";

/**
 * A card to display a product.
 * @param {Product} product - the data for the card. 
 * @param {Function} onClick - callback function when the product clicked. 
 */
export default function ProductCard({ 
  product,
  onClick
}) {
  return (
    <div 
      className="group relative w-[320px] hover:cursor-pointer"
      onClick={onClick}
    >
      <div 
        className={`
          w-full h-2/3 absolute bottom-0 bg-black rounded-[8px] outline-2
          outline-primary group-hover:outline-0 z-1 group-hover:bg-linear-to-br group-hover:from-primary
          group-hover:to-[rgba(0,0,0,0.5)]
        `}
      />
      <div className="flex flex-col gap-4 px-12 py-6 relative z-1">
        <img
          src={product.image}
          className="aspect-[4/3] rounded-[8px] group-hover:scale-110 transition-transform"
        />
        <b className="text-[18px]">{product.name}</b>
        <ProductPrice product={product} />
        <div className="flex gap-4">
          <Rating rating={product.rating} />
          {
            product.totalVotes ? (
              <div className="text-[14px] text-dark-gray">
                ({product.totalVotes})
              </div>
            ) : <></>
          }
        </div>
      </div>
    </div>
  );
}