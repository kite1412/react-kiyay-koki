import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import RoundedButton from "../../components/RoundedButton";
import ProductType from "../../models/ProductType";
import PriceRange from "../../components/PriceRange";
import RatingSelection from "../../components/RatingSelection";
import { mockFishesData } from "../../data/mocks";
import ProductCards from "../../components/ProductCards";
import PagerBar from "../../components/PagerBar";
import { useNavigate } from "react-router-dom";
import { ADMIN_EDIT_PRODUCT_PATH } from "../../constants/adminPaths";
import DropdownMenu from "../../components/DropdownMenu";

export default function AdminCollectionPage() {
  const [searchValue, setSearchValue] = useState("");
  const types = ["Semua", ...ProductType.values];
  const statuses = [
    "Semua", "Terdaftar", "Tidak Terdaftar"
  ];
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const products = mockFishesData;
  const navigate = useNavigate();

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
              onClick={() => navigate(ADMIN_EDIT_PRODUCT_PATH)}
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
                selections={statuses}
                selectedIndex={selectedStatusIndex}
                setSelectedIndex={setSelectedStatusIndex}
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
            onClick={p => 
              navigate(
                ADMIN_EDIT_PRODUCT_PATH,
                { 
                  state: {
                    product: p
                  }
                }
              )
            }
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