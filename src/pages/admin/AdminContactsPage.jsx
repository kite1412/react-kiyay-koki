import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import { mockUsers } from "../../data/mocks";
import PagerBar from "../../components/PagerBar";
import { useNavigate } from "react-router-dom";

export default function AdminContactsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const users = mockUsers;
  const itemsPerPage = 6;
  
  return <AdminPageLayout>
    <div className="size-full flex flex-col gap-15">
      <div>
        <h2 className="font-bold">Kontak</h2>
        <SearchBar 
          value={searchValue}
          onValueChange={setSearchValue}
          placeholder="Cari Berdasarkan Nomor"
          className="w-fit ml-auto"
          inputClassName="w-[200px]"
          inputType="number"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[1fr_1fr_1fr] justify-items-center font-bold text-light-gray text-[24px]">
          <p>Nomor WhatsApp</p>
          <p>Jumlah Ulasan</p>
          <p>Tanggal Pendaftaran</p>
        </div>
        <hr />
        {
          users
            .slice(currentPage * itemsPerPage - itemsPerPage, currentPage *itemsPerPage)
            .map(u => (
              <Contact user={u} />
            ))
        }
        {
          users.length > itemsPerPage && <PagerBar 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={mockUsers.length}
            itemsPerPage={itemsPerPage}
          />
        }
      </div>
    </div>
  </AdminPageLayout>
}

function Contact({
  user
}) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col gap-4 cursor-pointer"
      onClick={() => 
        navigate(
          `/kontak/${user.id}`,
          { 
            state: {
              user: user
            }  
          }
        )
      }
    >
      <div className="grid grid-cols-[1fr_1fr_1fr] justify-items-center font-bold">
        <p>{user.phoneNumber}</p>
        <p>{user.totalReviews}</p>
        <p>{user.joinDate}</p>
      </div>
      <hr />
    </div>
  );
}