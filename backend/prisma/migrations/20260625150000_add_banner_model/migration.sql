-- CreateEnum
CREATE TYPE "BannerTargetType" AS ENUM ('PRODUCT', 'CATEGORY', 'BRAND', 'CUSTOM', 'NONE');

-- CreateEnum
CREATE TYPE "BannerPlacement" AS ENUM ('HOME_HERO', 'HOME_PROMO', 'CATEGORY_PAGE', 'BRAND_PAGE', 'SHOP_PAGE');

-- CreateEnum
CREATE TYPE "BannerTextTheme" AS ENUM ('LIGHT', 'DARK');

-- CreateTable
CREATE TABLE "Banner" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "image" TEXT NOT NULL,
    "mobileImage" TEXT,
    "buttonText" TEXT,
    "targetType" "BannerTargetType" NOT NULL DEFAULT 'NONE',
    "targetSlug" TEXT,
    "targetUrl" TEXT,
    "placement" "BannerPlacement" NOT NULL DEFAULT 'HOME_HERO',
    "textTheme" "BannerTextTheme" NOT NULL DEFAULT 'LIGHT',
    "status" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);
