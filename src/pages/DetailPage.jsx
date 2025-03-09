import { useLocation } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { toPath } from "../utils/paths";
import ProductType from "../models/ProductType";
import { specToString } from "../models/Product";
import ProductPrice, { formatPrice, subtractByDiscount } from "../components/ProductPrice";
import RoundedButton from "../components/RoundedButton";
import { useState } from "react";
import Add from "../assets/add.svg?react";
import Remove from "../assets/remove.svg?react";
import orandaRoseTail from "../assets/oranda-rose-tail.png";

export default function DetailPage() {
  const location = useLocation();
  const data = location.state;
  const [quantity, setQuantity] = useState(1);

  return <PageLayout 
    content={
      <div className={`flex flex-col gap-30`}>
        <ProductDetail 
          product={data.product}
          productType={data.type}
          quantity={quantity}
          setQuantity={setQuantity}
          className="px-20"
        />
      </div>
    }
  />
}

export function productDetailNavigationInfo(product, productType) {
  return {
    path: `/detail/${toPath(productType)}/${product.id}`,
    options: { 
      state: {
        type: productType,
        product: product
      }
    } 
  }
} 

function ProductDetail({
  product,
  productType,
  quantity,
  setQuantity,
  className = ""
}) {
  return (
    <div 
      className={`
        flex justify-between w-full gap-20 items-center flex-grow
        ${className}
      `}
    >
      <div className="flex flex-col gap-6 flex-2">
        <div className="flex flex-col gap-1">
          <div className="text-[14px] text-primary">{productType}</div>
          <h2 className="font-bold">{product.name}</h2>
          <div>
            Stok: <span className="text-primary">
              {product.stock} {resolveStockDesc(productType)}
            </span> 
          </div>
        </div>
        {
          product.spec ? <div>
            {specToString(product.spec).map((s, _) => (
              <div>{s}</div>
            ))}
          </div> : <></>
        }
        <ProductPrice 
          product={product}
          className="text-[22px]" 
        />
        <div className="flex items-center justify-between">
          <QuantityPicker
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <div>
            Subtotal: <span className="font-bold text-primary">
            Rp. {
              formatPrice(subtractByDiscount(product.price, product.discountPercentage) * quantity)
            }
            </span>
          </div>
        </div>
        <RoundedButton 
          action={"Pesan Sekarang"}
          onClick={() => {}}
          fullyRounded={false}
        />
      </div>
      <ProductImages 
        images={Array.from({ length: 5 }).fill(product.image)}
      />
    </div>
  );
}

function resolveStockDesc(type) {
  switch (type) {
    case ProductType.FISH:
      return "Ekor";
    default:
      return "Buah";
  }
}

/**
 * @param {number} quantity - the quantity state. 
 * @param {(number) => void} setQuantity - callback function when the quantity changed. 
 */
function QuantityPicker({
  quantity,
  setQuantity
}) {
  return (
    <div className="flex gap-6 items-center outline-1 rounded-[4px] text-[20px] px-4 py-1">
      <button 
        className="font-bold"
        onClick={() => {
          if (quantity > 1) setQuantity(quantity - 1);
        }}
      >
        <Remove />
      </button>
      <div>
        {quantity}
      </div>
      <button
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        <Add />
      </button>
    </div>
  );
}

/**
 * @param {Array<string>} images - the image URLs. 
 */
function ProductImages({ images }) {
  if (images.length === 0) return;

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 w-[50%]">
      <img 
        src={images[currentIndex]}
        className="rounded-[8px]"
      />
      <div className="flex relative gap-2 overflow-x-auto">
        {
          images.filter((_, i) => i !== currentIndex).map((image, i) => (
            <img 
              src={image}
              className="rounded-[4px] w-[20%]"
              onClick={() => setCurrentIndex(i)}
            />
          ))
        }
      </div>
    </div>
  );
}