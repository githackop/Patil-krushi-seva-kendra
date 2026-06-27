"use client";

import Link from "next/link";
import { Sprout } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCategories } from "@/hooks/use-categories";
import { getImageSrc } from "@/lib/image-fallbacks";

export default function Categories() {
  const {
    data: categories = [],
    isLoading,
  } = useCategories();

  return (
    <section className="py-10">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
            Featured Categories
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-900">
            Shop by Category
          </h2>

          <p className="mt-3 text-gray-600">
            Browse essential farming products by category.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                className="flex flex-col items-center justify-center py-4 px-3 text-center rounded-lg border border-gray-200 bg-white transition-all duration-300"
              >
                <div className="mb-2.5 h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
              </Card>
            ))
            : categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories?name=${category.slug}`}
                className="block"
              >
                <Card
                  className="group flex flex-col items-center justify-center py-4 px-3 text-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:border-green-200 hover:bg-green-50/20"
                >
                  <div className="mb-2.5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-50 text-gray-500 transition-all group-hover:bg-green-100 group-hover:text-green-700">
                    {getImageSrc(category.image, "") ? (
                      <img
                        src={getImageSrc(category.image, "")}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />
                    ) : category.name ? (
                      <span className="text-sm font-extrabold">
                        {category.name
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    ) : (
                      <Sprout className="h-5 w-5" />
                    )}
                  </div>

                  <span className="text-xs font-bold tracking-tight">
                    {category.name}
                  </span>
                </Card>
              </Link>
            ))}
        </div>

        {!isLoading && categories.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No categories available.
          </p>
        ) : null}
      </div>
    </section>
  );
}
