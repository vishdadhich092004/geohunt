import { Router, RequestHandler } from "express";
import {
  getYoutubeAuthUrl,
  handleYoutubeCallback,
} from "../controllers/youtube.controllers";

const router = Router();

router.get("/auth", getYoutubeAuthUrl as RequestHandler);
router.get("/callback", handleYoutubeCallback as RequestHandler);

export default router;
