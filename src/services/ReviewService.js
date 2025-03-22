/**
 * @interface
 * 
 * Contract for review service.
 */
export default class ReviewService {
  async getByUserId(userId) {
    throw new Error("Not Implemented");
  }

  async getByProductId(productId) {
    throw new Error("Not Implemented");
  }
}