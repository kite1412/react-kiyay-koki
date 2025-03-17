/**
 * @interface
 * 
 * Contract for wishlist service.
 */
export default class WishlistService {
  /**
   * Get a list of wishlist items based on {@link userId}.
   * @param {number} userId - the user id to which the wishlist items belong.
   * @returns {Array<Object>} a list of wishlist items. 
   */
  async getByUserId(userId) {
    throw new Error("Not Implemented");
  }
}