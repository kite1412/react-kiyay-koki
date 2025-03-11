import Star from "../assets/star.svg?react";

/**
 * Displays rating represented by stars.
 * @param {number} rating - the rating with a range of 1-5.
 */
export default function Rating({ rating, starSize = 16 }) {
  return (
    <div className="flex gap-1 items center">
      {
        Array.from({ length: 5 }).map((_, i) => (
          <Star
            className={`
              ${(i + 1) <= Math.round(rating) ? "text-gold" : "text-dark-gray"}  
            `}
            style={{
              height: `${starSize}px`,
              width: `${starSize}px`
            }}
          />
        ))
      }
    </div>
  );
}