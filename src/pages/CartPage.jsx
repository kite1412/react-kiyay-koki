import PageLayout from "../layouts/PageLayout";
import Check from "../assets/check.svg?react";
import { cartService, productService } from "../objects";
import { useEffect, useState } from "react";
import { resolveStockDesc } from "../utils/product";
import ProductPrice, { discountAmount, formatPrice, StrippedPrice, subtractByDiscount } from "../components/ProductPrice";
import QuantityPicker from "../components/QuantityPicker";
import RoundedButton from "../components/RoundedButton";
import Cancel from "../assets/cancel.svg?react";
import { AnimatePresence, motion } from "framer-motion";
import SimpleProductCard from "../components/SimpleProductCard";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const addChecked = (id) => {
    setCheckedIds([...checkedIds, id]);
  };
  const removeChecked = (id) => {
    setCheckedIds(checkedIds.filter(i => i !== id));
  };
  const toggleCheck = (id) => {
    if (checkedIds.includes(id)) removeChecked(id)
      else addChecked(id);
  };
  const purchaseDismissStyle = {
    opacity: 0,
    marginTop: "-50px",
    scale: 0.4
  }

  useEffect(() => {
    const fetchAll = async () => {
      const items = await cartService.getByUserId(1);
      setCartItems(items);

      setProducts(
        await productService.getByIds(items.map((i, _) => i.productId))
      );
    };
    fetchAll();
  }, []);

  return <PageLayout 
    content={
      <div className="flex flex-col gap-6">
        <h2 className="font-bold">Keranjang</h2>
        <div className="max-xl:hidden">
          <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr] text-light-gray font-bold text-[24px]">
            <p>Barang</p>
            <p>Harga</p>
            <p>Jumlah</p>
            <p>Total</p>
          </div>
          <hr />
        </div>
        {
          products.map((p, _) => (
            <CartItem 
              checked={checkedIds.includes(p.id)}
              product={p}
              quantity={cartItems.find(i => i.productId === p.id).quantity}
              className="gap-6"
              onCheck={() => toggleCheck(p.id)}
            />
          ))
        }
        <AnimatePresence>
          {
            checkedIds.length && <motion.div
              className="flex flex-col gap-4 font-bold ml-auto"
              initial={purchaseDismissStyle}
              animate={{
                opacity: 1,
                marginTop: "0px",
                scale: 1
              }}
              exit={purchaseDismissStyle}
            >
              <h3>
                Subtotal: <span className="text-light-orange">
                  Rp. {
                    formatPrice(
                      products
                        .filter(p => checkedIds.includes(p.id))
                        .map(p => {
                          const price = subtractByDiscount(p.price, p.discountPercentage);
                          const q = cartItems.find(i => i.productId === p.id).quantity;
                          return price * q;
                        })
                        .reduce((prev, cur) => prev + cur)
                    )
                  }
                </span>
              </h3>
              <RoundedButton 
                action={"Pesan Sekarang"}
                fullyRounded={false}
                horizontalPadding={60}
                onClick={() => {}}
              />
            </motion.div>
          }
        </AnimatePresence>
      </div>
    }
  />;
}



function CartItem({ 
  checked,
  product,
  onCheck,
  quantity,
  setQuantity,
  onRemove,
  className = ""
}) {
  return (
    <div className={`flex w-full flex-col ${className}`}>
      <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr] items-center">
        <div className="flex gap-4 items-center">
          <div 
            className={`
              relative size-[24px] ${checked ? "bg-primary" : "bg-black"}
              outline-1 outline-primary rounded-[2px] select-none hover:cursor-pointer
              transition-colors
            `}
            onClick={onCheck}
          >
            <AnimatePresence>
              {
                checked && <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2
                  }}
                >
                  <Check 
                    className={`absolute inset-0 m-auto size-[18px]`}
                  />
                </motion.div>
              }
            </AnimatePresence>
          </div>
          <SimpleProductCard 
            product={product}
          />
        </div>
        <ProductPrice 
          product={product}
          showOriginalPrice={false}
          className={"text-[20px] text-light-gray font-bold"}
        />
        <QuantityPicker
          quantity={quantity}
          setQuantity={setQuantity}
          iconSizePx={16}
          gap={16}
          className={"size-fit"}
        />
        <div className="flex items-center justify-between">
          <ProductPrice 
            product={product}
            showOriginalPrice={false}
            showDiscountAmount={true}
            className={"text-[22px]"}
          />
          <RoundedButton 
            action={<Cancel className="size-[20px] p-1" />}
            onClick={onRemove}
            verticalPadding={8}
            horizontalPadding={8}
          />
        </div>
      </div>
      <hr className="text-secondary-text h-2" />
    </div>
  );
}