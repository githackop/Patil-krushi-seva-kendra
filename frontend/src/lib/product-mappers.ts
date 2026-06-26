import type { BackendProduct } from "@/services/product.service";
import {
  DEFAULT_PRODUCT_IMAGE,
  getImageSrc,
} from "@/lib/image-fallbacks";

export type ProductCardProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand?: string;
  category?: string;
  availability: "In Stock" | "Out of Stock";
  unit?: string;
  slug?: string;
};

export function mapProductToProductCard(
  product: BackendProduct
): ProductCardProduct {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: getImageSrc(product.image, DEFAULT_PRODUCT_IMAGE),
    brand: product.brand?.name,
    category: product.category?.name,
    availability: product.status === false ? "Out of Stock" : "In Stock",
    unit: product.packSize || undefined,
    slug: product.slug,
  };
}

export function mapProductsToProductCards(
  products: BackendProduct[]
): ProductCardProduct[] {
  return products.map(mapProductToProductCard);
}
