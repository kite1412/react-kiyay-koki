import RoundedButton from "../components/RoundedButton";
import PageLayout from "../layouts/PageLayout";
import Cancel from "../assets/cancel.svg?react";
import SimpleProductCard from "../components/SimpleProductCard";
import { productService, wishlistService } from "../objects";
import { useEffect, useState } from "react";
import ProductPrice from "../components/ProductPrice";
import QuantityPicker from "../components/QuantityPicker";
import ShoppingCart from "../assets/shopping-cart.svg?react";

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await wishlistService.getByUserId(1);
      setItems(res);

      setProducts(
        await productService.getByIds(res.map(i => i.productId))
      );
    };
    fetch();
  }, []);

  return <PageLayout 
    content={
      <div className="flex flex-col gap-6">
        <h2 className="font-bold">Wishlist</h2>
        <div className="max-xl:hidden">
          <div className="grid grid-cols-[2.5fr_1fr_0.8fr] font-bold text-light-gray text-[24px]">
            <p>Barang</p>
            <p>Harga</p>
            <p>Keranjang</p>
          </div>
          <hr />
        </div>
        {
          products.map(p => (
            <WishlistItem
              quantity={items.find(i => i.productId === p.id).quantity}
              product={p}
            />
          ))
        }
      </div>
    }
  />;
}

function WishlistItem({ 
  product,
  quantity,
  setQuantity
}) {
  return (
    <div className="grid grid-cols-[2.5fr_1fr_0.8fr] items-center">
      <div className="flex items-center gap-4">
        <RoundedButton 
          action={<Cancel className={"size-[20px] p-1"} />}
          verticalPadding={8}
          horizontalPadding={8}
        />
        <SimpleProductCard 
          product={product}
        />
      </div>
      <ProductPrice 
        product={product}
        showOriginalPrice={false}
        showDiscountAmount={true}
        className={"text-[20px] text-light-gray font-bold"}
      />
      <div className="flex items-center gap-3">
        <QuantityPicker
          quantity={quantity}
          setQuantity={setQuantity} 
          iconSizePx={16}
        />
        <RoundedButton 
          action={<ShoppingCart className={"size-[16px]"} />}
          fullyRounded={false}
          verticalPadding={8}
          horizontalPadding={8}
        />
      </div>
    </div>
  );
}