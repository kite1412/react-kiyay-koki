import Star from "../assets/star.svg?react";

/**
 * A card to display the fish product.
 * @param {string} image - image url. 
 * @param {string} name - name/type of the fish. 
 * @param {number} price - price of the fish. 
 * @param {number} rating - rating of the product. 
 * @param {number} totalVotes - total of votes for the product. 
 * @param {number} discountPercentage - discount percentage the product have. 
 * @returns 
 */
export default function FishCard({
  image,
  name,
  price,
  rating,
  totalVotes,
  discountPercentage = 0,
}) {
  return (
    <div className="relative">
      <div 
        className={`
          w-full h-2/3 absolute bottom-0 bg-black rounded-[8px]
          border-2 border-primary z-1
        `}
      />
      <div className="flex flex-col gap-4 px-12 py-6 relative z-1">
        <img
          src={image}
          className="aspect-[4/3] rounded-[8px]"
        />
        <b className="text-[18px]">{name}</b>
        <div className="flex gap-4 items-center">
          <b className="text-[16px]">
            Rp. {
              !discountPercentage ? price : (price * (1 - discountPercentage / 100))
            }
          </b>
          {
            discountPercentage ? <div className="relative text-primary">
              <b className="text-[16px]">Rp. {price}</b>
              <hr className="absolute top-1/2 left-0 w-full border-t-2 border-primary" />
            </div> : <></>
          }
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1 items-center">
            {
              Array.from({ length: 5 }).map((_, i) => (
                <Star className={`
                  ${(i + 1) <= rating ? "text-gold" : "text-dark-gray"}  
                `} />
              ))
            }
          </div>
          <div className="text-[14px] text-dark-gray">({totalVotes})</div>
        </div>
      </div>
    </div>
  );
}