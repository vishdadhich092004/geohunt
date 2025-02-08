import express from "express";
import { getAnalytics } from "../controllers/analytics.controllers";
const router = express.Router();

router.get("/:userId", getAnalytics);

export default router;
