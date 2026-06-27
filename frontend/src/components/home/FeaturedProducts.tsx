"use client";

import HomeProductSection from "./HomeProductSection";
import { mapProductsToProductCards } from "@/lib/product-mappers";
import { useProducts } from "@/hooks/use-products";

export default function FeaturedProducts() {
  const {
    data: products = [],
    isLoading,
  } = useProducts({
    limit: 8,
  });

  const mappedProducts = mapProductsToProductCards(products);
  // Temporary: slice the shared product list. When backend supports featured, best-selling, or recommendations, only the data source should change; HomeProductSection should stay unchanged.
  const featuredProducts = mappedProducts.slice(0, 4);

  return (
    <HomeProductSection
      eyebrow="🌱 Featured Collection"
      title="Featured Products"
      description="Best quality agricultural products trusted by farmers."
      products={featuredProducts}
      isLoading={isLoading}
      emptyMessage="No featured products available right now."
    />
  );
}
