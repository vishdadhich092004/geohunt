import express from "express";
import {
  // generateRandomLocation,
  fetchLocations,
} from "../controllers/location.controllers";
import { verifyToken } from "../middleware/auth.middleware";
const router = express.Router();

// router.get("/random", verifyToken, generateRandomLocation);
router.get("/", fetchLocations);

export default router;
