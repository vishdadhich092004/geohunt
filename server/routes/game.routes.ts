import express from "express";
import {
    createGame,
    fetchGame,
    fetchGameHistory,
} from "../controllers/game.controllers";
import { verifyToken } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/", verifyToken, createGame);
router.get("/history/:userId", fetchGameHistory);
router.get("/:gameId", fetchGame);
export default router;
