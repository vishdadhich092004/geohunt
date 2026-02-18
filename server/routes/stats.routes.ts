import express from "express";
import { getPublicStats } from "../controllers/stats.controllers";

const router = express.Router();

// Public — no auth middleware needed
router.get("/", getPublicStats);

export default router;
