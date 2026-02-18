import express from "express";
import {
    createGame,
    fetchGame,
    fetchGameHistory,
} from "../controllers/game.controllers";
import { verifyToken } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/", verifyToken, createGame);
router.get("/history/:userId", verifyToken, fetchGameHistory);
router.get("/:gameId", verifyToken, fetchGame);
export default router;
