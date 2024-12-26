import express from "express";
import { createGame } from "../controllers/gameController";
import { verifyToken } from "../middleware";
const router = express.Router();

router.post("/", verifyToken, createGame);

export default router;
