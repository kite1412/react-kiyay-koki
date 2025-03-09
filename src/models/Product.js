export default class Product {
  constructor(
    image,
    name,
    price,
    rating,
    totalVotes,
    discountPercentage = 0
  ) {
    this.image = image;
    this.name = name;
    this.price = price;
    this.rating = rating;
    this.totalVotes = totalVotes;
    this.discountPercentage = discountPercentage;
  }
}

/**
 * Convenience function to create a {@link Product}.
 */
export function createProduct({
  image,
  name,
  price,
  rating,
  totalVotes,
  discountPercentage = 0
}) {
  return new Product(
    image,
    name,
    price,
    rating,
    totalVotes,
    discountPercentage
  )
}