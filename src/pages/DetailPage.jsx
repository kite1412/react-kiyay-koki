import PageLayout from "../layouts/PageLayout";
import { toPath } from "../utils/paths";

export default function DetailPage() {
  return <PageLayout 
    content={
      <div>
        detail page
      </div>
    }
  />
}

export function productDetailNavigationInfo(product, productType) {
  return {
    path: `/detail/${toPath(productType)}/${product.id}`,
    options: { state: product } 
  }
} 