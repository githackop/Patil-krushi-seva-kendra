export type Category = {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  status?: boolean;
  products?: unknown[];
  _count?: {
    products?: number;
  };
};

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    "http://localhost:5000/api/categories",
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  return data.data;
}
