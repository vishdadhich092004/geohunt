import express from "express";
import {
  // generateRandomLocation,
  fetchLocations,
} from "../controllers/locationController";
import { verifyToken } from "../middleware";
const router = express.Router();

// router.get("/random", verifyToken, generateRandomLocation);
router.get("/", fetchLocations);

export default router;
