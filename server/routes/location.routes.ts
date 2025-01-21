import express from "express";
import { fetchLocations } from "../controllers/location.controllers";
const router = express.Router();

router.get("/", fetchLocations);

export default router;
