import { mockReviews } from "../../data/mocks";
import ReviewService from "../ReviewService";

export default class MockReviewService extends ReviewService {
  constructor() {
    super();
    this.items = mockReviews;
  }

  async getByUserId(userId) {
    return this.items.filter(r => r.userId === userId);
  }

  async getByProductId(productId) {
    return this.items.filter(r => r.productId === productId);
  }
}