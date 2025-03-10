import Product from "./Product";
import ProductType from "./ProductType";

/**
 * A class that represents a list of product with its type.
 */
export default class Products {
  /**
   * @param {ProductType} type - type of the products. 
   * @param {Array<Product>} items - items contained in the list. 
   * @returns {Products}
   */
  constructor(type, items) {
    this.type = type;
    this.items = items;
  }
}

/**
 * Convenience function to create a {@link Products}
 */
export function createProducts({
  type,
  items
}) {
  return new Products(type, items)
}