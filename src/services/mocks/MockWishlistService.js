import { wishlistItems } from "../../data/mocks";
import WishlistService from "../WishlistService";

/**
 * Mock implementation of {@link WishlistService}.
 */
export default class MockWishlistService extends WishlistService {
  constructor() {
    super();
    this.items = wishlistItems;
  }
  
  async getByUserId(userId) {
    return this.items.filter(i => i.userId === userId);
  }
}