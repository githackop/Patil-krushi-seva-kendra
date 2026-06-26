import ProductCard from "../common/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductCardProduct } from "@/lib/product-mappers";

type HomeProductSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  products: ProductCardProduct[];
  isLoading: boolean;
  emptyMessage: string;
};

function ProductCardSkeleton() {
  return (
    <Card className="flex h-full min-h-[318px] overflow-hidden rounded-xl border border-gray-200 bg-white py-0 text-sm shadow-sm">
      <div className="relative flex h-[150px] shrink-0 items-center justify-center overflow-hidden bg-white px-4 py-3 sm:h-[158px]">
        <div className="h-full w-full rounded-lg bg-gray-200 animate-pulse" />
        <span className="absolute left-2.5 top-2.5 h-5 w-10 rounded-md bg-gray-200 animate-pulse" />
      </div>

      <CardContent className="flex flex-1 flex-col px-3 pb-3 pt-0">
        <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
        <div className="mt-2 h-10 rounded bg-gray-200 animate-pulse" />
        <div className="mt-1.5 h-3 w-28 rounded bg-gray-200 animate-pulse" />
        <div className="mt-2 h-3 w-20 rounded bg-gray-200 animate-pulse" />
        <div className="mt-2 h-5 w-24 rounded bg-gray-200 animate-pulse" />

        <div className="mt-auto flex items-center gap-2 pt-2.5">
          <div className="h-9 flex-1 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-9 w-9 shrink-0 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomeProductSection({
  eyebrow,
  title,
  description,
  products,
  isLoading,
  emptyMessage,
}: HomeProductSectionProps) {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-green-50">
      <div className="w-full px-4 md:px-8 lg:px-12">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
              {eyebrow}
            </span>

            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-900">
              {title}
            </h2>

            <p className="mt-3 text-gray-600">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
            : products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
        </div>

        {!isLoading && products.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            {emptyMessage}
          </p>
        ) : null}

      </div>
    </section>
  );
}
