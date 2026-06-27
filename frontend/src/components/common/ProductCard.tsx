import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DEFAULT_PRODUCT_IMAGE,
  getImageSrc,
} from "@/lib/image-fallbacks";

type Props = {
  name: string;
  price: number;
  image?: string | null;
  brand?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number;
  availability?: "In Stock" | "Out of Stock";
  badge?: string;
  unit?: string;
  slug?: string;
};

export default function ProductCard({
  name,
  price,
  image,
  brand,
  category,
  rating = 4.5,
  reviewCount,
  originalPrice,
  availability = "In Stock",
  badge = "New",
  unit,
  slug,
}: Props) {
  const isAvailable = availability === "In Stock";
  const productHref = slug ? `/product/${slug}` : undefined;
  const productImage = getImageSrc(image, DEFAULT_PRODUCT_IMAGE);

  return (
    <Card className="group flex h-full min-h-[318px] overflow-hidden rounded-xl border border-gray-200 bg-white py-0 text-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex h-[150px] shrink-0 items-center justify-center overflow-hidden bg-white px-4 py-3 sm:h-[158px]">
        {productHref ? (
          <Link
            href={productHref}
            className="flex h-full w-full items-center justify-center"
            aria-label={`View ${name} details`}
          >
            <Image
              src={productImage}
              alt={name}
              width={400}
              height={400}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.06]"
            />
          </Link>
        ) : (
          <Image
            src={productImage}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.06]"
          />
        )}

        {badge ? (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-green-700 px-1.5 py-0.5 text-[9px] font-bold leading-4 text-white shadow-sm">
            {badge}
          </span>
        ) : null}
      </div>

      <CardContent className="flex flex-1 flex-col px-3 pb-3 pt-0">
        <p className="truncate text-[10px] font-bold uppercase tracking-wide text-green-700">
          {category ?? "Product"}
        </p>

        {productHref ? (
          <Link href={productHref}>
            <h3 className="mt-1 h-10 text-[14px] font-bold leading-5 text-gray-950 transition-colors line-clamp-2 group-hover:text-green-700">
              {name}
            </h3>
          </Link>
        ) : (
          <h3 className="mt-1 h-10 text-[14px] font-bold leading-5 text-gray-950 transition-colors line-clamp-2 group-hover:text-green-700">
            {name}
          </h3>
        )}

        <p className="mt-0.5 truncate text-[11px] font-medium text-gray-500">
          Brand: {brand ?? "Generic"}
          {unit ? ` | ${unit}` : ""}
        </p>

        <div className="mt-1 flex items-center gap-1 text-amber-500">
          <Star className="h-3 w-3 fill-current" />
          <span className="text-[11px] font-medium text-gray-700">
            {rating.toFixed(1)}
          </span>
          {reviewCount ? (
            <span className="text-[11px] text-gray-500">({reviewCount})</span>
          ) : null}
        </div>

        <div className="mt-1.5 flex items-baseline gap-2">
          <p className="text-[17px] font-extrabold leading-none text-gray-950">
            Rs. {price}
          </p>

          {originalPrice ? (
            <p className="text-[11px] font-medium text-gray-400 line-through">
              Rs. {originalPrice}
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2.5">
          <Button
            disabled={!isAvailable}
            className="h-9 flex-1 rounded-lg bg-green-700 px-3 text-xs font-bold text-white hover:bg-green-800 disabled:bg-gray-300"
          >
            <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
            Add to Cart
          </Button>

          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-green-200 text-green-700 transition-colors hover:bg-green-50"
            aria-label={`Add ${name} to wishlist`}
          >
            <Heart size={16} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
