import orandaRoseTail from "../assets/oranda-rose-tail.png";
import { createProduct } from "../models/Product";
import ProductType from "../models/ProductType";

export const mockFishesData = Array.from({ length: 8 }).map((_, i) => {
  return createProduct({
    id: i + 1,
    image: orandaRoseTail,
    name: "Oranda Rose Tail",
    price: 250000,
    rating: i + 1,
    totalVotes: i,
    stock: (i + 1) * (i + 1), 
    discountPercentage: 20,
    spec: {
      warna: "Merah",
      ukuran: "Besar",
      jenis_ikan: "Rose Tail",
      ukuran_cm: 13
    },
    ratingDistributions: [
      {
        score: 1,
        count: 2
      },
      {
        score: 2,
        count: 3
      },
      {
        score: 3,
        count: 3
      },
      {
        score: 4,
        count: 10
      },
      {
        score: 5,
        count: 18
      }
    ],
    reviews: Array.from({ length: 20 }).map((_, i) => (
      {
        phoneNumber: "081234124",
        publishedAt: "22-01-2025",
        content: `
          ${i > 9 ? `
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap
            into electronic typesetting, remaining essentially unchanged.  
          ` : "Empty comment"}
        `,
        rating: 4
      }
    )),
    type: ProductType.FISH
  })
})

export const mockUser = {
  id: 1,
  phoneNumber: "08994144513"
};

export const cartItems = Array.from({ length: 5 }).map((_, i) => {
  const num = i + 1;

  return {
    id: num,
    userId: 1,
    productId: num,
    quantity: num
  };
});