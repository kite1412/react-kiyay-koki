import { useLocation } from "react-router-dom";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import { useEffect, useRef, useState } from "react";
import PagerBar from "../../components/PagerBar";
import { cartService, productService, reviewService } from "../../objects";
import Rating from "../../components/Rating";
import { resolveStockDesc } from "../../utils/product";
import ProductPrice from "../../components/ProductPrice";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState(null);
  const [reviewProducts, setReviewProducts] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [cartProducts, setCartProducts] = useState(null);
  const itemsPerPage = 4;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;

  useEffect(() => {
    setCurrentPage(1);

    const fetchReviews = async () => {
      const reviews = await reviewService.getByUserId(user.id);
      setReviews(reviews);

      const products = await productService.getByIds(
        [...new Set(reviews.map(r => r.productId))]
      );
      setReviewProducts(products);
    };

    const fetchCartItems = async () => {
      const items = await cartService.getByUserId(user.id);
      setCartItems(items);

      const products = await productService.getByIds(
        [...new Set(items.map(i => i.productId))]
      );
      setCartProducts(products);
    };
    
    if (currentMenu === menus[1] && !reviews) fetchReviews()
      else if (currentMenu === menus[2] && !cartItems) fetchCartItems();
  }, [currentMenu]);

  return <AdminPageLayout>
    <div className="size-full flex flex-col gap-15">
      <h2 className="font-bold">{user.phoneNumber}</h2>
      <div className="flex flex-col gap-6">
        <Menus
          selectedMenu={currentMenu}
          setSelectedMenu={setCurrentMenu}
        />
      </div>
      {
        currentMenu === menus[0] ? <Addresses addresses={
          user.addresses.slice(startIndex, endIndex)
        } /> : 
        currentMenu === menus[1] && reviews && reviewProducts ? <Reviews
          reviews={reviews.slice(startIndex, endIndex)}
          products={reviewProducts}
        /> : 
        currentMenu === menus[2] && cartItems && cartProducts ? <CartItems 
          items={cartItems.slice(startIndex, endIndex)}
          products={cartProducts}
        /> :
        <></>
      }
      <PagerBar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={
          currentMenu === menus[0] ? user.addresses.length :
          currentMenu === menus[1] ? reviews ? reviews.length : 0 :
          currentMenu === menus[2] ? cartItems ? cartItems.length : 0 : 0
        }
        resultPlaceholder="Koleksi"
      />
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
      <div className="flex gap-8 select-none">
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
      <div className="relative select-none">
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

function ItemsDisplay({ children }) {
  return (
    <div className="flex flex-wrap gap-4 justify-between">
      {children}
    </div>
  );
}

function Addresses({ addresses }) {
  return <ItemsDisplay>
    {
      addresses.map(a => (
        <Address 
          address={a}
          className="w-[49%] h-full"
        />
      ))
    }
  </ItemsDisplay>;
}

function Address({ address, className = "" }) {
  return (
    <div className={`
      flex flex-col p-4 gap-2 bg-black rounded-[8px] border-1 
      ${className}
    `}>
      <div>
        <p className="font-bold italic text-light-orange">{address.type}</p>
        <b>{address.name}</b>
      </div>
      <div className="flex flex-col gap-[2px]">
        <RowInfo label={"Nomor Whatsapp"} value={address.phoneNumber} />
        <RowInfo label={"Provinsi"} value={address.province} />
        <RowInfo label={"Kota/Kabupaten"} value={address.city} />
        <RowInfo label={"Kecamatan"} value={address.subdistrict} />
        <RowInfo label={"Kode Pos"} value={address.postalCode} />
        <RowInfo label={"Alamat Lengkap"} value={address.fullAddress} />
        <RowInfo label={"Detail Tambahan"} value={address.detail} />
      </div>
    </div>
  );
}

function RowInfo({
  label,
  value
}) {
  return (
    <div className="flex items-center gap-4 justify-between">
      <div>{label}</div>
      <div className="text-end">{value}</div>
    </div>
  );
}

function Reviews({ reviews, products }) {
  return <ItemsDisplay>
    {
      reviews.map(r => (
        <Review 
          review={r}
          product={products.find(p => p.id === r.productId)}
          className="w-[49%]"
        />
      ))
    }
  </ItemsDisplay>;
}

function Review({ 
  review, 
  product,
  className = ""
}) {
  return (
    <div className={`
      flex flex-col gap-8 border-1 rounded-[8px] p-4
      ${className}
    `}>
      <div className="flex gap-2 items-center">
        <img 
          src={product?.image}
          className="h-[80px] w-[120px] rounded-[8px]"
        />
        <div className="font-bold">
          <p className="text-[12px] text-light-orange">{product?.type}</p>
          <p className="text-[18px]">{product?.name}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <Rating 
            rating={review.rating}
            starSize={22} 
          />
          <span className="text-light-gray">{review.publishedAt}</span>
        </div>
        <p>{review.content}</p>
      </div>
    </div>
  );
}

function CartItems({ items, products }) {
  return <ItemsDisplay>
    {
      items.map(i => (
        <ProductCard 
          quantity={i.quantity}
          quantityDesc="Jumlah di Keranjang"
          product={products.find(p => p.id === i.productId)}
          className="w-[49%]"
        />
      ))
    }
  </ItemsDisplay>;
}

function ProductCard({ 
  quantity,
  quantityDesc, 
  product, 
  className = ""
}) {
  return (
    <div className={`
      flex gap-2 items-center bg-black border-1 rounded-[8px] p-4
      ${className}
    `}>
      <img 
        src={product.image}
        className="rounded-[8px] w-[210px] h-[140px]"
      />
      <div className="flex flex-col gap-3">
        <p className="text-light-orange text-[12px] ">{product.type}</p>
        <div className="flex flex-col gap-2">
          <b className="text-[18px]">{product.name}</b>
          <span>
            {quantityDesc}: <span className="text-light-orange">
              {quantity} {resolveStockDesc(product.type)}
            </span>
          </span>
          <ProductPrice 
            product={product}
          />
        </div>
      </div>
    </div>
  );
}