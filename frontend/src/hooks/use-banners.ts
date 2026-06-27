import { useQuery } from "@tanstack/react-query";

import {
  getPublicBanners,
} from "@/services/banner.service";

export function useBanners() {
  return useQuery({
    queryKey: ["banners", "public"],
    queryFn: getPublicBanners,
  });
}
