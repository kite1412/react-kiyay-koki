import { useState } from "react";
import ChevronLeft from "../assets/chevron-left.svg?react";
import Star from "../assets/star.svg?react";

export default function RatingSelection({
  rating,
  setRating
}) {
  const [expanded, setExpanded] = useState(false); 

  return (
    <div 
      className={`
        rounded-[2px] border-1 border-white items-center relative p-1 px-2
        hover:cursor-pointer select-none
      `}
    >
      <div 
        className="flex gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex gap-1 items-center">
          <Star className="text-gold" />
          <b>{rating || "Semua"}</b>
        </div>
        <ChevronLeft className={`
          ${!expanded ? "rotate-270" : "rotate-90"} size-[24px] transition-transform
        `} />
      </div>
      {
        expanded && (
          <div className="flex flex-col absolute inset-0 top-10 items-center z-100 w-[100px]">
            {
              Array(6).fill(null).map((_, i) => (
                <div
                  className={`
                    px-4 py-2 bg-black/70 flex w-full justify-center
                    ${rating === (5 - i) ? "text-primary" : "text-white"}
                  `}
                  onClick={() => {
                    setExpanded(false);
                    setRating(5 - i);
                  }}
                >
                  <b>{5 - i || "Semua"}</b>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
}