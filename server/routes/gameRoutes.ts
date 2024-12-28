import express from "express";
import { createGame, fetchGame } from "../controllers/gameController";
import { verifyToken } from "../middleware";
const router = express.Router();

router.post("/", verifyToken, createGame);
router.get("/:gameId", fetchGame);
export default router;
