import PageLayout from "../layouts/PageLayout";
import Check from "../assets/check.svg?react";
import { cartService, productService } from "../objects";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

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
              checked={false}
              product={p}
              className="gap-6"
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
  onClick,
  className = "" 
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center w-full gap-6">
        <div className="flex gap-2 items-center">
          <div 
            className={`
              relative size-[24px] ${checked ? "bg-primary" : "bg-black"}
              outline-1 outline-primary rounded-[2px]
            `}
            onClick={onClick}
          >
            <Check 
              className={`${!checked && "hidden"} m-auto`}
            />
          </div>
          <img 
            src={product.image}
            className="rounded-[8px] w-[200px] h-[150px]"
          />
        </div>
      </div>
      <hr className="text-secondary-text h-2" />
    </div>
  );
}