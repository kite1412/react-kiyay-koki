import { cartItems } from "../../data/mocks";
import CartService from "../CartService";

/**
 * Mock implementation {@link CartService}.
 */
export default class MockCartService extends CartService {
  constructor() {
    super();
    this.items = cartItems;
  }
  
  async getById(id) {
    return this.items.find(i => i.id === id);
  }

  async getByUserId(userId) {
    return this.items.filter((i, _) => i.userId === userId);
  }
}