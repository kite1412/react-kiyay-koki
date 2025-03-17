import { useNavigate } from "react-router-dom";
import { resolveStockDesc } from "../utils/product";
import { StrippedPrice } from "./ProductPrice";
import { productDetailNavigationInfo } from "../pages/DetailPage";

export default function SimpleProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-4 hover:cursor-pointer"
      onClick={() => {
        const { path, options } = productDetailNavigationInfo(product, product.type);
        navigate(path, options);
      }}
    >
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
  );
}