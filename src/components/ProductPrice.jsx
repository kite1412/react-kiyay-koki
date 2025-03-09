export default function ProductPrice({
  product,
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
        product.discountPercentage ? <div className="relative text-primary">
          <b>Rp. {formatPrice(product.price)}</b>
          <hr className="absolute top-1/2 left-0 w-full border-t-2 border-primary" />
        </div> : <></>
      }
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
  return actualPrice * (1 - discountPercentage / 100)
}