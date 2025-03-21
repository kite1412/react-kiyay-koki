export default class Product {

  /**
   * @param {number} id 
   * @param {string} image 
   * @param {string} name 
   * @param {number} price 
   * @param {number} rating 
   * @param {number} totalVotes 
   * @param {number} stock 
   * @param {number} discountPercentage 
   * @param {Object} spec 
   * @param {number} ratingDistributions 
   * @param {Array<Object>} reviews 
   * @param {string} type
   * @param {string} description 
   */
  constructor(
    id,
    image,
    name,
    description,
    price,
    rating,
    totalVotes,
    stock,
    discountPercentage = 0,
    spec = {},
    ratingDistributions,
    reviews,
    type
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
    this.reviews = reviews;
    this.type = type;
    this.description = description;
  }
}

/**
 * Convenience function to create a {@link Product}.
 */
export function createProduct({
  id,
  image,
  name,
  description,
  price,
  rating,
  totalVotes,
  stock,
  discountPercentage = 0,
  spec = {},
  ratingDistributions,
  reviews,
  type
}) {
  return new Product(
    id,
    image,
    name,
    description,
    price,
    rating,
    totalVotes,
    stock,
    discountPercentage,
    spec,
    ratingDistributions,
    reviews,
    type
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