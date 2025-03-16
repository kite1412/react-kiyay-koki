import PageLayout from "../layouts/PageLayout";
import Check from "../assets/check.svg?react";
import { cartService, productService } from "../objects";
import { useEffect, useState } from "react";
import { resolveStockDesc } from "../utils/product";
import ProductPrice, { discountValue, formatPrice, StrippedPrice, subtractByDiscount } from "../components/ProductPrice";
import QuantityPicker from "../components/QuantityPicker";
import RoundedButton from "../components/RoundedButton";
import Cancel from "../assets/cancel.svg?react";
import { AnimatePresence, motion } from "framer-motion";

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
      </div>
    }
  />;
}

function CartItem({ 
  checked,
  product,
  onCheck,
  quantity,
  onRemove,
  className = ""
}) {
  return (
    <div className={`flex w-full flex-col ${className}`}>
      <div className="flex items-center w-full justify-between">
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
          <img 
            src={product.image}
            className="rounded-[8px] w-[200px] h-[150px] select-none"
          />
          <div className="flex flex-col gap-2">
            <span className="text-[12px] text-light-orange">
              {product.type}
            </span>
            <h2 className="font-bold">{product.name}</h2>
            <span className="text-[14px]">
              Stok: <span className="text-light-orange">
                {product.stock} {resolveStockDesc(product.type)}
              </span>
            </span>
            {
              product.discountPercentage ? <StrippedPrice 
                price={product.price}
                className="w-fit" 
              /> : <></>
            }
          </div>
        </div>
        <ProductPrice 
          product={product}
          showOriginalPrice={false}
          className={"text-[20px] text-light-gray font-bold"}
        />
        <QuantityPicker
          quantity={quantity}
          iconSizePx={16}
          gap={16}
        />
        <div className="font-bold">
          <p className="text-[22px]">
            Rp. {formatPrice(subtractByDiscount(product.price, product.discountPercentage) * quantity)}
          </p>
          {
            product.discountPercentage && <span className="text-light-orange">
              Hemat Rp. {formatPrice(discountValue(product.price, product.discountPercentage))}
            </span>
          }
        </div>
        <RoundedButton 
          action={<Cancel className="size-[20px] p-1" />}
          onClick={onRemove}
          verticalPadding={8}
          horizontalPadding={8}
        />
      </div>
      <hr className="text-secondary-text h-2" />
    </div>
  );
}