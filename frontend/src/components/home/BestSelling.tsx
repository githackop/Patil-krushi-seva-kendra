"use client";

import HomeProductSection from "./HomeProductSection";
import { useProducts } from "@/hooks/use-products";
import { mapProductsToProductCards } from "@/lib/product-mappers";

export default function BestSelling() {
  const {
    data = [],
    isLoading,
  } = useProducts({
    limit: 8,
  });

  const mappedProducts = mapProductsToProductCards(data);
  // Temporary: slice the shared product list. When backend supports featured, best-selling, or recommendations, only the data source should change; HomeProductSection should stay unchanged.
  const bestSellingProducts = mappedProducts.slice(4, 8);

  return (
    <HomeProductSection
      eyebrow="🔥 Best Sellers"
      title="Best Selling Products"
      description="Popular choices trusted by farmers across India."
      products={bestSellingProducts}
      isLoading={isLoading}
      emptyMessage="No best selling products available right now."
    />
  );
}
