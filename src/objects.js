import MockCartService from "./services/mocks/MockCartService";
import MockProductService from "./services/mocks/MockProductService";
import MockUserService from "./services/mocks/MockUserService";

export const userService = new MockUserService();
export const productService = new MockProductService();
export const cartService = new MockCartService();