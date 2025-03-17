import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { toPath } from "../utils/paths";
import ProductType from "../models/ProductType";
import { specToString } from "../models/Product";
import ProductPrice, { formatPrice, subtractByDiscount } from "../components/ProductPrice";
import RoundedButton from "../components/RoundedButton";
import { useEffect, useState } from "react";
import _Rating from "../components/Rating";
import Star from "../assets/star.svg?react";
import ProductCards from "../components/ProductCards";
import { mockFishesData } from "../data/mocks";
import { defaultShowCount } from "../constants/productCards";
import PagerBar from "../components/PagerBar";
import { resolveStockDesc } from "../utils/product";
import QuantityPicker from "../components/QuantityPicker";
import { useAuth } from "../contexts/AuthContext";
import Love from "../assets/love.svg?react";
import { wishlistService } from "../objects";
import OutlinedButton from "../components/OutlinedButton";

export default function DetailPage() {
  const location = useLocation();
  const data = location.state;
  const product = data.product;
  const [wishlist, setWishlist] = useState([]); 
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      const res = await wishlistService.getByUserId(1);
      setWishlist(res);
    };

    fetch();
  }, []);

  return <PageLayout 
    content={
      <div className={`flex flex-col gap-30`}>
        <ProductDetail 
          product={product}
          productType={data.type}
          quantity={quantity}
          setQuantity={setQuantity}
          wishlisted={wishlist.find(i => i.productId === product.id)}
          className="lg:px-20 max-lg:px-10"
        />
        <DescriptionAndReview
          productType={data.type}
          params={{
            fishType: product.spec.jenis_ikan,
            size: product.spec.ukuran_cm
          }}
          productAvgScore={product.rating}
          productTotalReviews={product.reviews.length}
          productRatingDistributions={product.ratingDistributions}
          reviews={product.reviews}
        />
        <Recommendations 
          products={mockFishesData}
        />
      </div>
    }
  />
}

/**
 * Generates path and options needed for route navigation to DetailPage.
 * @param {Product} product - the product that will be displayed in the DetailPage. 
 * @param {ProductType} productType - the product's type, check {@link ProductType}. 
 * @returns {{ path: string, options: NavigateOptions}}
 * 
 * @example
 * const navigate = useNavigate();
 * const { path, options } = productDetailNavigationInfo(p, type);
 * 
 * navigate(path, options);
 */
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
  wishlisted,
  setWishlisted,
  className = ""
}) {
  const mockImages = Array.from({ length: 5 }).fill(product.image);
  const { isAuthenticated } = useAuth();

  return (
    <div 
      className={`
        flex justify-between w-full lg:gap-20 max-lg:gap-10 flex-grow
        max-sm:flex-col max-sm:gap-10 ${className} 
      `}
    >
      <ProductImages 
        images={mockImages}
        className={"min-sm:hidden"}
      />
      <div className="flex flex-col gap-6 flex-2 max-sm:w-full sm:w-[50%]">
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
        <div className="flex flex-col gap-2">
          <ProductPrice 
            product={product}
            className="xl:text-[22px] min-lg:text-[18px]" 
          />
          {
            isAuthenticated && <div 
              className={`
                flex gap-2 items-center hover:cursor-pointer select-none hover:opacity-80
                size-fit
              `}
              onClick={() => setWishlisted(!wishlisted)}
            >
              <Love className={`size-[24px] ${wishlisted ? "text-primary" : "fill-none"}`} />
              Wishlist
            </div>
          }
        </div>
        <div className="flex items-center justify-between gap-2">
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
        images={mockImages}
        className={"max-sm:hidden"}
      />
    </div>
  );
}

/**
 * @param {Array<string>} images - the image URLs. 
 */
function ProductImages({ images, className = "" }) {
  if (images.length === 0) return;

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={`flex flex-col gap-4 sm:w-[50%] select-none ${className}`}>
      <img 
        src={images[currentIndex]}
        className="rounded-[8px]"
      />
      <div className="flex relative gap-2 overflow-x-auto">
        {
          images.filter((_, i) => i !== currentIndex).map((image, i) => (
            <img 
              src={image}
              className="rounded-[4px] w-[20%] hover:cursor-pointer"
              onClick={() => setCurrentIndex(i)}
            />
          ))
        }
      </div>
    </div>
  );
}

function DescriptionAndReview({ 
  productType,
  params,
  productAvgScore,
  productTotalReviews,
  productRatingDistributions,
  reviews
}) {
  const [showingDescription, setShowingDescription] = useState(true);

  return (
    <div className="flex flex-col w-full items-center gap-10">
      <div className="flex flex-col gap-4 max-sm:w-full w-[50%] select-none max-sm:px-20">
        <div className={`
          flex justify-evenly font-bold text-[18px] max-sm:text-[14px] hover:cursor-pointer 
        `}>
          <div
            onClick={() => setShowingDescription(true)}
            className={`${showingDescription ? "text-light-orange" : "text-secondary-text"} transition-colors`}
          >
            Deskripsi Produk
          </div>
          <div
            onClick={() => setShowingDescription(false)}
            className={`${!showingDescription ? "text-light-orange" : "text-secondary-text"} transition-colors`}
          >
            Ulasan & Rating
          </div>
        </div>
        <div className="relative">
          <div 
            className={`
              absolute w-[50%] h-1 bg-primary z-1 rounded-[8px] ${
                !showingDescription && "ms-[50%]"
              } transition-[margin] duration-200 ease-in-out
            `}
          />
          <div 
            className="absolute w-full h-1 bg-secondary-text rounded-[8px]"
          />
        </div>
      </div>
      { /* 40 = ProductDetail's px * 2 */ }
      <div className="max-sm:px-10 max-lg:px-20 lg:px-40 w-full">
        {
          showingDescription ? <Description 
            descriptionInfo={{
              type: productType,
              params: params
            }}
          /> : <ReviewsAndRating 
            avgScore={productAvgScore}
            totalReviews={productTotalReviews}
            ratingDistributions={productRatingDistributions}
            reviews={reviews}
          />
        }
      </div>
    </div>
  );
}

/**
 * @param {Object} descriptionInfo - contains the {@link ProductType} and params needed for the desc. 
 */
function Description({ descriptionInfo }) {
  return (
    <div>
      {
        descriptionInfo.type === ProductType.FISH ? 
        <FishProductDescription 
          fishType={descriptionInfo.params.fishType}
          size={descriptionInfo.params.size}
        /> : <></>
      }
    </div>
  );
}

function FishProductDescription({ fishType, size }) {
  return (
    <ParagraphsWithLineBreak 
      contents={[
        {
          items: [
            `
              Hadirkan pesona ikan koki ${fishType} di akuariummu! Dengan tubuh yang unik,
              warna cerah, dan gerakan anggun, ikan ini menjadi favorit bagi pecinta ikan hias.
            `
          ]
        },
        {
          items: [
            `✨ Keunggulan Ikan Koki ${fishType}:`,
            "✔ Sehat & Berkualitas – Dipilih langsung dari peternak terbaik dengan perawatan optimal.",
            "✔ Warna Cerah & Menarik – Memiliki warna alami yang semakin indah dengan makanan berkualitas.",
            "✔ Aktif & Lincah – Gerakan anggun yang menambah keindahan dalam akuarium.",
            "✔ Mudah Dipelihara – Cocok untuk pemula maupun kolektor ikan hias.",
            "✔ Bebas Penyakit – Dikarantina sebelum pengiriman untuk memastikan kondisi prima."
          ]
        },
        {
          items: ["📦 Paket Termasuk:"]
        },
        {
          items: [
            `• 1 ekor ikan koki ${fishType}, ukuran ${size} cm`,
            "• Panduan perawatan dasar ikan koki",
            "• Garansi ikan dalam kondisi sehat saat diterima",
            "• 🚚 Gratis Pengiriman ke lokasi tertentu (S&K berlaku)."
          ]
        },
        {
          items: ["💙 Pesan Sekarang dan tambahkan keindahan ikan koki ke dalam akuariummu!"]
        }
      ]}
    />
  );
}

function ReviewsAndRating({
  avgScore,
  totalReviews,
  ratingDistributions,
  reviews
}) {
  return (
    <div className="flex flex-col gap-10 w-full items-center">
      <Rating 
        avgScore={avgScore}
        totalReviews={totalReviews}
        ratingDistributions={ratingDistributions}
      />
      <Reviews reviews={reviews} />
    </div>
  );
}

function Rating({
  avgScore,
  totalReviews,
  ratingDistributions
}) {
  return (
    <div className="flex max-md:gap-10 gap-30">
      <div className="flex flex-col sm:gap-4 max-sm:gap-2">
        <div>
          <p>Rata - Rata Rating</p>
          <div className="flex gap-4 items-center">
            <h1 className="font-bold">{avgScore}</h1>
            <_Rating rating={avgScore} />
          </div>
        </div>
        <div>
          <p>Total Ulasan</p>
          <h1 className="font-bold">{totalReviews}</h1>
        </div>
      </div>
      <RatingDistribution 
        distributions={ratingDistributions}
      />
    </div>
  );
}

function Reviews({ reviews }) {
  if (reviews.length === 0) return;
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col gap-10 w-full">
      {reviews.slice(10 * currentPage - 10, 10 * currentPage).map((r, _) => (
        <UserReview review={r} className="gap-10" />
      ))}
      <PagerBar 
        resultPlaceholder="Ulasan"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={reviews.length}
      />
      {
        isAuthenticated && <RatingAndReviewForm />
      }
    </div>
  );
}

function Recommendations({ products }) {
  const navigate = useNavigate();
  const productType = useLocation().state.type;

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="font-bold">Rekomendasi Lainnya</h1>
      <ProductCards 
        products={products}
        onClick={p => {
          const { path, options } = productDetailNavigationInfo(p, productType);
          navigate(path, options);
        }}
        showCount={defaultShowCount}
      />
    </div>
  );
}

/**
 * @param {Object} review - the review data. 
 */
function UserReview({ review, className = "" }) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <hr className="text-light-gray" />
      <div className="flex flex-col gap-3">
        <b className="text-[18px]">{review.phoneNumber}</b>
        <div className="flex gap-6 items-center">
          <_Rating rating={review.rating} starSize={20} />
          <div className="text-light-gray">{review.publishedAt}</div>
        </div>
        <div className="mt-2">
          {review.content}
        </div>
      </div>
    </div>
  );
}

/**
 * @param {Array<Object>} distributions - a list that consists of pairs of 'score' and 'count'. 
 */
function RatingDistribution({ distributions }) {
  const totalVotes = distributions.map((e, _) => e.count).reduce((a, n) => a + n, 0);

  return (
    <div className="flex flex-col gap-2 font-bold">
      {
        distributions.sort((a, b) => b.score - a.score).map((r, _) => (
          <div className="flex gap-2 items-center">
            <Star className={"text-dark-gray"} />
            <div>{r.score}</div>
            <div className="relative h-[6px] w-[200px] min-w-[150px]">
              <div className="absolute h-full w-full bg-dark-gray rounded-full" />
              <div 
                className="absolute h-full bg-primary rounded-full"
                style={{
                  width: `${r.count / totalVotes * 100}%`
                }} 
              />
            </div>
            <div className="text-light-gray">{r.count}</div>
          </div>
        ))
      }
    </div>
  );
}

function ParagraphsWithLineBreak({ contents }) {
  return (
    <>
      {
        contents ? <ul>
          {
            contents.map((c, _) => (
              c.items.map((t, i) => (
                <>
                  <li>{t}</li>
                  {
                    c.items.length - 1 == i ? <br /> : <></> 
                  }
                </>
              ))
            ))
          }
        </ul> : <></>
      }
    </>
  );
}

function RatingAndReviewForm() {
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  
  return (
    <div className="flex flex-col gap-8">
      <RatingForm 
        rating={rating}
        setRating={setRating}
      />
      <ReviewForm 
        content={reviewContent}
        setContent={setReviewContent}
      />
      <div className="flex gap-6 ml-auto">
        <OutlinedButton 
          action={"Hapus"}
          onClick={() => {}}
          verticalPadding={6}
        />
        <RoundedButton 
          action={"Kirim Ulasan & Rating"}
          onClick={() => {}}
          fullyRounded={false}
          verticalPadding={6}
        />
      </div>
    </div>
  );
}

function ReviewForm({
  content,
  setContent
}) {  
  return (
    <div className="flex flex-col gap-4 font-bold">
      Berikan Ulasan
      <div className="p-4 border-2 border-white bg-black rounded-[8px]">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Masukkan Ulasan Anda..."
          className={`
            ${!content && "italic text-secondary-text"} w-full focus:outline-none
            min-h-[150px]
          `}
        />
      </div>
    </div>
  );
}

function RatingForm({
  rating,
  setRating
}) {
  return (
    <div className="flex flex-col gap-4 font-bold">
      Berikan Rating
      <div className="flex gap-2">
        {
          Array.from({ length: 5 }).map((_, i) => {
            const score = i + 1;
            return <Star 
              className={`
                size-[28px] ${rating >= score ? "text-gold" : "text-secondary-text"}
                hover:cursor-pointer select-none transition-colors
              `}
              onClick={() => setRating(score)}
            />
          })
        }
      </div>
    </div>
  );
}