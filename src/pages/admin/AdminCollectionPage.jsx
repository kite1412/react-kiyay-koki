import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import RoundedButton from "../../components/RoundedButton";
import ChevronRight from "../../assets/chevron-right.svg?react";
import { AnimatePresence, motion } from "framer-motion";
import ProductType from "../../models/ProductType";
import PriceRange from "../../components/PriceRange";
import RatingSelection from "../../components/RatingSelection";
import { mockFishesData } from "../../data/mocks";
import ProductCards from "../../components/ProductCards";
import PagerBar from "../../components/PagerBar";

export default function AdminCollectionPage() {
  const [searchValue, setSearchValue] = useState("");
  const types = ["Semua", ...ProductType.values];
  const availabilities = [
    "Semua", "Terdaftar", "Tidak Terdaftar"
  ];
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [selectedAvailabilityIndex, setSelectedAvailabilityIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const products = mockFishesData;

  return <AdminPageLayout>
    <div className="size-full">
      <h2 className="font-bold">Koleksi</h2>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 ml-auto items-center">
            <SearchBar 
              value={searchValue}
              onValueChange={setSearchValue}
              placeholder="Cari Berdasarkan Nama"
              className={`${!searchValue && "italic"}`}
              inputClassName="w-[200px]"
            />
            <RoundedButton 
              action="Tambah Koleksi"
              fullyRounded={false}
              verticalPadding={6}
              horizontalPadding={16}
              className="h-fit"
            />
          </div>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-6">
              <DropdownMenu 
                selections={types}
                selectedIndex={selectedTypeIndex}
                setSelectedIndex={setSelectedTypeIndex}
              />
              <DropdownMenu 
                selections={availabilities}
                selectedIndex={selectedAvailabilityIndex}
                setSelectedIndex={setSelectedAvailabilityIndex}
              />
            </div>
            <div className="flex gap-6" >
              <PriceRange />
              <RatingSelection />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <ProductCards 
            products={products.slice(currentPage * 3 - 3, currentPage * 3)}
            showCount={3}
            expandable={false}
          />
          {
            products.length && <PagerBar 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={products.length}
              itemsPerPage={3}
            />
          }
        </div>
      </div>
    </div>
  </AdminPageLayout>;
}

/**
 * @param {Array<string>} selections 
 * @param {number} selectedIndex 
 * @param {(number) => void} setSelectedIndex 
 */
function DropdownMenu({
  selections,
  selectedIndex,
  setSelectedIndex
}) {
  if (selections.length === 0 || selections.length - 1 < selectedIndex) return;
  
  const [expanded, setExpanded] = useState(false);
  const hidden = {
    scale: 0.4,
    opacity: 0,
    marginTop: "-50px"
  };

  return (
    <div className="relative">
      <div 
        className={`
          flex justify-between items-center border-1 p-2 ${
            expanded ? "bg-primary border-primary rounded-tl-[4px] rounded-tr-[4px]" 
              : "rounded-[4px] border-white bg-transparent"
          } transition-all gap-4 select-none cursor-pointer duration-200
        `}
        onClick={() => setExpanded(!expanded)}
      >
        {selections[selectedIndex]}
        <ChevronRight className="rotate-90 size-[16px]" />
      </div>
      <AnimatePresence>
        {
          expanded && <motion.div
            className={`
              rounded-bl-[4px] rounded-br-[4px] border-1 border-white bg-black
              absolute
            `}
            initial={hidden}
            animate={{
              scale: 1,
              opacity: 1,
              marginTop: "8px"
            }}
            exit={hidden}
          >
            {
              selections.map((s, i) => (
                <div
                  className="select-none cursor-pointer"
                  onClick={() => {
                    setExpanded(false);
                    setSelectedIndex(i);
                  }}
                >
                  <div className="p-2">
                    {s}
                  </div>
                  {
                    (i !== selections.length - 1) && <hr className="border-1 border-white" />
                  }
                </div>
              ))
            }
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
}