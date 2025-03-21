import MockCartService from "./services/mocks/MockCartService";
import MockProductService from "./services/mocks/MockProductService";
import MockReviewService from "./services/mocks/MockReviewService";
import MockUserService from "./services/mocks/MockUserService";
import MockWishlistService from "./services/mocks/MockWishlistService";

export const userService = new MockUserService();
export const productService = new MockProductService();
export const cartService = new MockCartService();
export const wishlistService = new MockWishlistService();
export const reviewService = new MockReviewService();