import express from "express";
import { generateHintsForLocation } from "../controllers/hint.controllers";

const router = express.Router();

router.post("/", generateHintsForLocation);

export default router;
