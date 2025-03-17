import Add from "../assets/add.svg?react";
import Remove from "../assets/remove.svg?react";

/**
 * @param {number} quantity - the quantity state. 
 * @param {(number) => void} setQuantity - callback function when the quantity changed. 
 */
export default function QuantityPicker({
  quantity,
  setQuantity,
  iconSizePx,
  gap,
  className = ""
}) {
  const iconSize = "max-lg:size-[18px] max-sm:-size[14px]"

  return (
    <div 
      className={`
        flex ${!gap && "gap-6"} items-center outline-1 rounded-[4px] px-4 py-1
        max-lg:px-2 ${!iconSizePx ? "text-[20px]" : ""} ${className}
      `}
      style={gap ? {
        gap: `${gap}px`
      } : {}}
    >
      <button 
        className="font-bold"
        onClick={() => {
          if (quantity > 1) setQuantity(quantity - 1);
        }}
      >
        <Remove 
          className={`${!iconSizePx ? iconSize : ""}`}
          style={iconSizePx ? {
            height: `${iconSizePx}px`,
            width: `${iconSizePx}px`
          } : {}} 
        />
      </button>
      <div style={iconSizePx ? {
        fontSize: `${iconSizePx - 2}px`
      } : {}}>
        {quantity}
      </div>
      <button
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        <Add 
          className={`${!iconSizePx ? iconSize : ""}`}
          style={iconSizePx ? {
            height: `${iconSizePx}px`,
            width: `${iconSizePx}px`
          } : {}}
        />
      </button>
    </div>
  );
}