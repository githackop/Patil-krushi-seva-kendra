import { Router } from "express";

import {
  createBannerController,
  deleteBannerController,
  getAllBannersController,
  getBannerByIdController,
  getPublicBannersController,
  updateBannerController,
} from "../controllers/banner.controller";

const router = Router();

router.get("/", getAllBannersController);

router.get("/public", getPublicBannersController);

router.get("/:id", getBannerByIdController);

router.post("/", createBannerController);

router.put("/:id", updateBannerController);

router.delete("/:id", deleteBannerController);

export default router;
