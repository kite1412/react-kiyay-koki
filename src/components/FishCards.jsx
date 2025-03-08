import FishCard from "./FishCard";

/**
 * A component that displays a list of fish in a grid layout.
 * @param {Array<Object>} fishes - a list of fish to display in a grid. 
 */
export default function FishCards({ fishes }) {
  return (
    <div className={`
      flex gap-8 flex-wrap justify-center
    `}>
      {
        fishes.map((f, _) => (
          <FishCard  
            image={f.image}
            name={f.name}
            price={f.price}
            rating={f.rating}
            totalVotes={f.totalVotes}
            discountPercentage={f.discountPercentage}
          />
        ))
      }
    </div>
  );
}