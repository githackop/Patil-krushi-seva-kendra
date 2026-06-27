"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useBanners } from "@/hooks/use-banners";
import {
  DEFAULT_BANNER_IMAGE,
  getImageSrc,
} from "@/lib/image-fallbacks";
import type { Banner } from "@/services/banner.service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const defaultBanners: Banner[] = [
  {
    id: "default-banner",
    label: "🌱 Trusted by 10,000+ Farmers",
    title: "All Your Farming\nNeeds In One Place",
    subtitle:
      "Premium quality seeds, fertilizers, pesticides and expert agricultural solutions for modern farmers.",
    image: DEFAULT_BANNER_IMAGE,
    mobileImage: null,
    buttonText: null,
    targetType: "NONE",
    targetSlug: null,
    targetUrl: null,
    placement: "HOME_HERO",
    textTheme: "LIGHT",
    status: true,
    displayOrder: 0,
  },
];

function getBannerHref(banner: Banner) {
  if (banner.targetType === "PRODUCT" && banner.targetSlug) {
    return `/product/${banner.targetSlug}`;
  }

  if (banner.targetType === "CATEGORY" && banner.targetSlug) {
    return `/categories?name=${banner.targetSlug}`;
  }

  if (banner.targetType === "BRAND" && banner.targetSlug) {
    return `/brands/${banner.targetSlug}`;
  }

  if (banner.targetType === "CUSTOM" && banner.targetUrl) {
    return banner.targetUrl;
  }

  return null;
}

function HeroSkeleton() {
  return (
    <section className="w-full">
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        <div className="relative z-10 flex h-full items-center">
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
            <div className="max-w-2xl">
              <div className="h-9 w-56 rounded-full bg-white/20 animate-pulse" />
              <div className="mt-6 h-16 w-full max-w-xl rounded bg-white/20 animate-pulse sm:h-24" />
              <div className="mt-5 h-7 w-full max-w-lg rounded bg-white/20 animate-pulse" />
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="h-9 w-32 rounded-full bg-white/20 animate-pulse" />
                <div className="h-9 w-36 rounded-full bg-white/20 animate-pulse" />
                <div className="h-9 w-32 rounded-full bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderTitle(title: string) {
  const [firstLine, ...remainingLines] = title.split("\n");
  const secondLine = remainingLines.join(" ");

  return (
    <>
      {firstLine}
      {secondLine ? (
        <span className="block text-green-400">
          {secondLine}
        </span>
      ) : null}
    </>
  );
}

function HeroSlide({
  banner,
}: {
  banner: Banner;
}) {
  const href = getBannerHref(banner);
  const isDarkTheme = banner.textTheme === "DARK";
  const textClass = isDarkTheme ? "text-gray-950" : "text-white";
  const subtitleClass = isDarkTheme ? "text-gray-700" : "text-gray-200";
  const chipClass = isDarkTheme
    ? "bg-white/70 text-gray-900"
    : "bg-white/20 text-white";
  const badgeClass = isDarkTheme
    ? "bg-white/70 text-gray-900"
    : "bg-white/20 text-white";
  const image = getImageSrc(
    banner.mobileImage || banner.image,
    DEFAULT_BANNER_IMAGE
  );

  const content = (
    <div
      className="
        relative
        h-[70vh]
        md:h-[80vh]
        bg-cover
        bg-center
      "
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">

          <div className="max-w-2xl">

            {/* Badge */}
            {banner.label ? (
              <span className={`inline-flex items-center rounded-full backdrop-blur px-4 py-2 text-sm font-medium ${badgeClass}`}>
                {banner.label}
              </span>
            ) : null}

            {/* Heading */}
            <h1 className={`mt-6 text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight ${textClass}`}>
              {renderTitle(banner.title)}
            </h1>

            {/* Description */}
            {banner.subtitle ? (
              <p className={`mt-5 text-lg max-w-xl ${subtitleClass}`}>
                {banner.subtitle}
              </p>
            ) : null}

            {/* Trust Chips */}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className={`rounded-full backdrop-blur px-4 py-2 text-sm ${chipClass}`}>
                🚚 Free Delivery
              </span>

              <span className={`rounded-full backdrop-blur px-4 py-2 text-sm ${chipClass}`}>
                ✅ Genuine Products
              </span>

              <span className={`rounded-full backdrop-blur px-4 py-2 text-sm ${chipClass}`}>
                🌾 Expert Support
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              {banner.buttonText && href ? (
                <Button
                  size="lg"
                  className="
                    bg-green-600
                    hover:bg-green-700
                    px-8
                    shadow-lg
                  "
                >
                  {banner.buttonText}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Discount Badge */}
      <div className="absolute top-6 right-6 z-20">
        <div className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-xl">
          🔥 Up To 30% OFF
        </div>
      </div>

      {/* Seasonal Badge */}
      <div className="absolute bottom-8 right-6 z-20">
        <div className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-xl">
          🌱 Kharif Season Specials
        </div>
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}

export default function HeroSlider() {
  const {
    data: banners = [],
    isLoading,
    isError,
  } = useBanners();

  if (isLoading) {
    return <HeroSkeleton />;
  }

  const slides = isError || banners.length === 0 ? defaultBanners : banners;

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full"
      >
        {slides.map((banner) => (
          <SwiperSlide key={banner.id}>
            <HeroSlide banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
