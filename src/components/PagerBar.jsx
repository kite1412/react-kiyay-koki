import ChevronLeft from "../assets/chevron-left.svg?react";
import ChevronRight from "../assets/chevron-right.svg?react";

/**
 * Pagination component.
 * @param {number} currentPage - a number state of current page, must be of positive integer type. 
 * @param {(number) => void} setCurrentPage - callback to set the {@link currentPage} with new value. 
 * @param {number} totalItems - total number of items, the upperbound of the pager. 
 * @param {number} itemsPerPage - the size of a page. 
 */
export default function PagerBar({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage = 10,
  resultPlaceholder = "Hasil"
}) {
  const iconButton = "size-[32px] hover:cursor-pointer select-none";

  return (
    <div className={`
      flex w-full items-center justify-between py-4 ps-6 pr-8 bg-black
      rounded-[4px]
    `}>
      <div>
        Menampilkan <b>
          {Math.min(itemsPerPage * currentPage - itemsPerPage + 1, totalItems)} - {Math.min(itemsPerPage * currentPage, totalItems)}
        </b> Dari <b>{totalItems}</b> {resultPlaceholder}
      </div>
      <div className="flex gap-4 items-center">
        <ChevronLeft 
          className={`
            ${iconButton} ${
              !(currentPage >= 2) && "text-dark-gray"
            }  
          `}
          onClick={() => {
            if (currentPage >= 2) setCurrentPage(currentPage - 1);
          }}
        />
        <b className="border-2 border-white rounded-[4px] px-4 py-2 text-[18px]">{currentPage}</b>
        <ChevronRight 
          className={`
            ${iconButton} ${
              !(currentPage * itemsPerPage < totalItems) && "text-dark-gray"
            }
          `}
          onClick={() => {
            if (currentPage * itemsPerPage < totalItems) setCurrentPage(currentPage + 1);
          }}
        />
      </div>
    </div>
  );
}