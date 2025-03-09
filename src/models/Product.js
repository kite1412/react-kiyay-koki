export default class Product {
  constructor(
    id,
    image,
    name,
    price,
    rating,
    totalVotes,
    discountPercentage = 0
  ) {
    this.id = id;
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
  id,
  image,
  name,
  price,
  rating,
  totalVotes,
  discountPercentage = 0
}) {
  return new Product(
    id,
    image,
    name,
    price,
    rating,
    totalVotes,
    discountPercentage
  )
}