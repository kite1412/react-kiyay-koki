import Product from "../models/Product";

/**
 * @param {Product} product - the product. 
 * @param {boolean} showOriginalPrice - whether to show the original price of the product (if discountPercentage > 0). 
 */
export default function ProductPrice({
  product,
  showOriginalPrice = true,
  className = "text-[16px]"
 }) {
  return (
    <div className={`flex gap-4 items-center ${className}`}>
      <b>
        Rp. {
          !product.discountPercentage ? formatPrice(product.price) : 
          formatPrice(subtractByDiscount(product.price, product.discountPercentage))
        }
      </b>
      {
        product.discountPercentage && showOriginalPrice ? <StrippedPrice price={product.price} /> : <></>
      }
    </div>
  );
}

export function StrippedPrice({ price, className = "" }) {
  return (
    <div className={`relative text-light-orange ${className}`}>
      <b>Rp. {formatPrice(price)}</b>
      <hr className="absolute top-1/2 left-0 w-full border-t-2 border-light-orange" />
    </div>
  );
}

export function formatPrice(price) {
  return price.toLocaleString("id-ID");
}

export function subtractByDiscount(
  actualPrice,
  discountPercentage
) {
  return actualPrice * (1 - discountPercentage / 100);
}

export function discountValue(
  actualPrice,
  discountPercentage
) {
  return (actualPrice * discountPercentage) / 100;  
}