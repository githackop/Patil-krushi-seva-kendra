export const DEFAULT_BANNER_IMAGE = "/banners/banner.webp";
export const DEFAULT_PRODUCT_IMAGE = "/banner.jpg";
export const DEFAULT_BRAND_IMAGE = "/logo.jpeg";

export function getImageSrc(
  image: string | null | undefined,
  fallback: string
) {
  const value = image?.trim();

  if (!value) {
    return fallback;
  }

  if (
    value.startsWith("https://") ||
    value.startsWith("http://") ||
    value.startsWith("/")
  ) {
    return value;
  }

  return fallback;
}
