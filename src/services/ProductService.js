import Product from "../models/Product";

/**
 * @interface
 * 
 * Contract for product service.
 */
export default class ProductService {
  /**
   * Get a product by id.
   * @param {number} id
   * @returns {Product} 
   */
  async getById(id) {
    throw new Error("Not Implemented");
  }

  /**
   * Get products by ids.
   * @param {Array<number>} ids
   * @returns {Array<Product>} 
   */
  async getByIds(ids) {
    throw new Error("Not Implemented");
  }

  /**
   * Get all available products.
   * @returns {Array<Object>}
   */
  async getAll() {
    throw new Error("Not Implemented");
  }
}