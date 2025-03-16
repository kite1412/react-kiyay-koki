/**
 * @interface
 * 
 * Contract for cart service.
 */
export default class CartService {
  /**
   * Get a cart item by id.
   * @param {number} id
   * @returns {Object}
   */
  async getById(id) {
    throw new Error("Not Implemented");
  }

  /**
   * Get cart items by user id.
   * @param {number} userId 
   * @returns {Array<Object>}
   */
  async getByUserId(userId) {
    throw new Error("Not Implemented");
  }
}