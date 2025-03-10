export default class Product {
  constructor(
    id,
    image,
    name,
    price,
    rating,
    totalVotes,
    stock,
    discountPercentage = 0,
    spec = {},
    ratingDistributions
  ) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.price = price;
    this.rating = rating;
    this.totalVotes = totalVotes;
    this.stock = stock;
    this.discountPercentage = discountPercentage;
    this.spec = spec;
    this.ratingDistributions = ratingDistributions;
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
  stock,
  discountPercentage = 0,
  spec = {},
  ratingDistributions
}) {
  return new Product(
    id,
    image,
    name,
    price,
    rating,
    totalVotes,
    stock,
    discountPercentage,
    spec,
    ratingDistributions
  )
}

/**
 * Convert json spec to a list of string that represents fields in json spec.
 * 
 * Example:
 * input = {
 *  color: "Red",
 *  size: "Large"
 * }
 * 
 * output = [
 *  "Color: Red",
 *  "Size: Large"
 * ]
 * 
 * @param {Object} spec - the specification of the product. 
 */
export function specToString(spec) {
  return Object.entries(spec).map(([k, v]) => {
    const keyWords = k.split("_").join(" ");
    const fixedKey = keyWords.charAt(0).toUpperCase() + keyWords.slice(1);
    
    return `${fixedKey}: ${v}`
  });
}