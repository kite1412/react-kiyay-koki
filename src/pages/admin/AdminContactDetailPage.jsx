import { useLocation } from "react-router-dom";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import { useEffect, useMemo, useRef, useState } from "react";

const menus = [
  "Daftar Alamat",
  "Ulasan",
  "Keranjang",
  "Wishlist"
];

export default function AdminContactDetailPage() {
  const location = useLocation();
  const user = location.state.user;
  const [currentMenu, setCurrentMenu] = useState(menus[0]);
  
  return <AdminPageLayout>
    <div className="size-full flex flex-col gap-15">
      <h2 className="font-bold">{user.phoneNumber}</h2>
      <div className="flex flex-col gap-6">
        <Menus
          selectedMenu={currentMenu}
          setSelectedMenu={setCurrentMenu}
        />
      </div>
    </div>
  </AdminPageLayout>;
}

function Menus({
  selectedMenu,
  setSelectedMenu
}) {
  const refs = useRef([]);
  const [menuWidths, setMenuWidths] = useState([]);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorOffset, setIndicatorOffset] = useState(0);
  const extraWidth = 40;

  useEffect(() => {
    if (refs.current.length === 4) {
      const updated = [...menuWidths];
      refs.current.forEach((v, i) => {
        if (!v) return;
        const curWidth = v.getBoundingClientRect().width;
        updated[i] = curWidth + extraWidth;
        console.log(updated);
      });
      setIndicatorWidth(updated[0]);
      setMenuWidths(updated);
    }
  }, [refs.current.length]);

  useEffect(() => {
    const curIndex = menus.indexOf(selectedMenu);

    if (!curIndex) {
      setIndicatorOffset(0)
    } else {
        // 32 comes from flex gap
      const offset = (menuWidths
        .filter((_, i) => (i < curIndex))
        .reduce((p, c) => (p + c + 32), 0)) - (curIndex * extraWidth);
      
      setIndicatorOffset(offset - extraWidth / 2);
    }
  }, [selectedMenu]);

  return (
    <>
      <div className="flex gap-8">
        {
          menus.map((m, i) => (
            <div 
              className={`
                font-bold text-[22px] ${
                  selectedMenu === m ? "text-primary" : "text-light-gray"
                } cursor-pointer select-none transition-colors duration-300
              `}
              ref={el => (refs.current[i] = el)}
              onClick={() => {
                setSelectedMenu(m);
                setIndicatorWidth(menuWidths[i]);
              }}
            >
              {m}
            </div>
          ))
        }
      </div>
      <div className="relative">
        <div 
          className={`
            absolute bg-primary z-1 transition-all h-[2px]
          `}
          style={{
            width: `${indicatorWidth}px`,
            marginLeft: `${indicatorOffset}px`
          }}
        />
        <div className="absolute w-full h-[2px] bg-white/70" />
      </div>
    </>
  );
}