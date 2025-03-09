import { createProducts } from "./Products";
import ProductType from "./ProductType";
import Product from "./Product";

/**
 * A class that represents the whole {@link Products} the app have.
 */
export default class ProductSelections {
  /**
   * 
   * @param {Array<Product>} fishItems - a list of fish product.
   * @param {Array<Product>} aquariumItems - a list of aquarium product.
   * @param {Array<Product>} feedItems - a list of feed product.
   */
  constructor(
    fishItems,
    aquariumItems,
    feedItems
  ) {
    this.fishProducts = createProducts({
      type: ProductType.FISH,
      items: fishItems
    });
    this.aquariumProducts = createProducts({
      type: ProductType.AQUARIUM,
      items: aquariumItems
    });
    this.feedProducts = createProducts({
      type: ProductType.FEED,
      items: feedItems
    });
  }

  getProductsByType(type) {
    switch (type) {
      case ProductType.FISH:
        return this.fishProducts;
      case ProductType.AQUARIUM:
        return this.aquariumProducts;
      case ProductType.FEED:
        return this.feedProducts;
    }
  }
}

/**
 * Convenience function to create a {@link ProductSelections}
 */
export function createProductSelections({
  fishItems,
  aquariumItems,
  feedItems
}) {
  return new ProductSelections(
    fishItems,
    aquariumItems,
    feedItems
  );
}