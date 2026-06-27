import type { Product, ProductResponse } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export type BackendProduct = {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  price: number;
  packSize?: string | null;
  status?: boolean;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  brand?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  variants?: {
    id: string;
    packSize: string;
    price: number;
  }[];
};

export type GetProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
};

export async function getProducts(
  params: GetProductsParams = {}
): Promise<BackendProduct[]> {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.category) {
    searchParams.set("categoryId", params.category);
  }

  if (params.brand) {
    searchParams.set("brand", params.brand);
  }

  const queryString = searchParams.toString();
  const response = await fetch(
    `${API_URL}/products${queryString ? `?${queryString}` : ""}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await response.json();

  return result.data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const response = await fetch(`${API_URL}/products/${slug}`, {
    next: {
      revalidate: 60,
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const result = (await response.json()) as ProductResponse;

  return result.data;
}
