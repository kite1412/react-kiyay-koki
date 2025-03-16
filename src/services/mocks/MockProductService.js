import { mockFishesData } from "../../data/mocks";
import ProductService from "../ProductService";

/**
 * Mock implementation of {@link ProductService}
 */
export default class MockProductService extends ProductService {
  constructor() {
    super();
    this.items = mockFishesData;
  }
  
  async getById(id) {
    return this.items.find(p => p.id === id);
  }

  async getByIds(ids) {
    return this.items.filter((p, _) => ids.includes(p.id))
  }

  async getAll() {
    return this.items;
  }
}