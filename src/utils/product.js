import ProductType from "../models/ProductType";

export function resolveStockDesc(type) {
  switch (type) {
    case ProductType.FISH:
      return "Ekor";
    default:
      return "Buah";
  }
}