import orandaRoseTail from "../assets/oranda-rose-tail.png";
import { createProduct } from "../models/Product";
import ProductType from "../models/ProductType";

export const mockReviews = Array.from({ length: 20 }).map((_, i) => (
  {
    id: i + 1,
    userId: 1,
    productId: Math.min(8, i + 1),
    phoneNumber: "081234124",
    publishedAt: "22-01-2025",
    content: `
      ${i % 2 === 0 ? `
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
))

export const mockFishesData = Array.from({ length: 8 }).map((_, i) => {
  return createProduct({
    id: i + 1,
    image: orandaRoseTail,
    name: "Oranda Rose Tail",
    description: "Ikan oranda rose tail",
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
    reviews: mockReviews,
    type: ProductType.FISH
  })
})

export const mockUser = {
  id: 1,
  phoneNumber: "08994144513",
  addresses: Array.from({ length: 2 }).map(_ => (
    {
      type: "Rumah",
      name: "Ramayuda M",
      phoneNumber: "08994144513",
      province: "Lampung",
      city: "Bandar Lampung",
      subdistrict: "Kp Baru",
      postalCode: 35666,
      fullAddress: "Jl. Merdeka, Gang Tokyo No.15",
      address: "Jl. Merdeka, Gang Tokyo No.15, Kampung Baru, Kota Bandar Lampung, Lampung, 40112",
      detail: "Kos Cendrawasih, Kamar nomor 5 dari kanan, No. 3 dari kiri, Nomor 2 dari gerbang"
    }
  ))
};

export const mockUsers = Array.from({ length: 4 }).map((_, i) => (
  {
    id: i + 1,
    phoneNumber: "08994144513",
    totalReviews: 2 * (i + 1),
    joinDate: "23-1-2025",
    addresses: Array.from({ length: 5 }).map(_ => (
      {
        type: "Rumah",
        name: "Ramayuda M",
        phoneNumber: "08994144513",
        province: "Lampung",
        city: "Bandar Lampung",
        subdistrict: "Kp Baru",
        postalCode: 35666,
        fullAddress: "Jl. Merdeka, Gang Tokyo No.15",
        address: "Jl. Merdeka, Gang Tokyo No.15, Kampung Baru, Kota Bandar Lampung, Lampung, 40112",
        detail: "Kos Cendrawasih, Kamar nomor 5 dari kanan, No. 3 dari kiri, Nomor 2 dari gerbang"
      }
    ))
  }
));

export const cartItems = Array.from({ length: 5 }).map((_, i) => {
  const num = i + 1;

  return {
    id: num,
    userId: 1,
    productId: num,
    quantity: num
  };
});

export const wishlistItems = Array.from({ length: 5 }).map((_, i) => {
  const num = i + 1;

  return {
    id: num,
    userId: 1,
    productId: num,
    quantity: num
  };
}); 