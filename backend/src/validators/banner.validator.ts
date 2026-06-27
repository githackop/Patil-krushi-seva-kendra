import { z } from "zod";

const bannerTargetTypeSchema = z.enum([
  "PRODUCT",
  "CATEGORY",
  "BRAND",
  "CUSTOM",
  "NONE",
]);

const bannerPlacementSchema = z.enum([
  "HOME_HERO",
  "HOME_PROMO",
  "CATEGORY_PAGE",
  "BRAND_PAGE",
  "SHOP_PAGE",
]);

const bannerTextThemeSchema = z.enum([
  "LIGHT",
  "DARK",
]);

const dateSchema = z.preprocess(
  (value) => {
    if (value === undefined || value === null || value === "") {
      return undefined;
    }

    return value instanceof Date ? value : new Date(String(value));
  },
  z.date().optional()
);

const bannerBaseSchema = z.object({
  label: z.string().optional(),
  title: z.string().min(2),
  subtitle: z.string().optional(),
  image: z.string().min(1),
  mobileImage: z.string().optional(),
  buttonText: z.string().optional(),
  targetType: bannerTargetTypeSchema,
  targetSlug: z.string().optional(),
  targetUrl: z.string().optional(),
  placement: bannerPlacementSchema,
  textTheme: bannerTextThemeSchema.default("LIGHT"),
  status: z.boolean(),
  displayOrder: z.number().int().min(0),
  startsAt: dateSchema,
  endsAt: dateSchema,
});

function validateBannerRules(
  data: {
    targetType?: string;
    targetSlug?: string;
    targetUrl?: string;
    startsAt?: Date;
    endsAt?: Date;
  },
  ctx: z.RefinementCtx
) {
  if (
    ["PRODUCT", "CATEGORY", "BRAND"].includes(data.targetType ?? "") &&
    !data.targetSlug
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["targetSlug"],
      message: "targetSlug is required for product, category, and brand banners",
    });
  }

  if (data.targetType === "CUSTOM" && !data.targetUrl) {
    ctx.addIssue({
      code: "custom",
      path: ["targetUrl"],
      message: "targetUrl is required for custom banners",
    });
  }

  if (data.startsAt && data.endsAt && data.endsAt <= data.startsAt) {
    ctx.addIssue({
      code: "custom",
      path: ["endsAt"],
      message: "endsAt must be after startsAt",
    });
  }
}

export const createBannerSchema = bannerBaseSchema.superRefine(
  validateBannerRules
);

export const updateBannerSchema = bannerBaseSchema.partial().superRefine(
  validateBannerRules
);
