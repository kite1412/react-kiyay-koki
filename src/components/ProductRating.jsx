import Star from "../assets/star.svg?react";

/**
 * Displays the rating of a product represented by stars.
 * @param {number} rating - the rating of the product.
 */
export default function ProductRating({ rating }) {
  return (
    <div className="flex gap-1 items center">
      {
        Array.from({ length: 5 }).map((_, i) => (
          <Star className={`
            ${(i + 1) <= Math.round(rating) ? "text-gold" : "text-dark-gray"}  
          `} />
        ))
      }
    </div>
  );
}