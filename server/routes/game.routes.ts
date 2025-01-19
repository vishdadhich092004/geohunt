import express from "express";
import { createGame, fetchGame } from "../controllers/game.controllers";
import { verifyToken } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/", verifyToken, createGame);
router.get("/:gameId", fetchGame);
export default router;
