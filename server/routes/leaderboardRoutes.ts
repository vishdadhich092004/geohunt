import express from "express";
import { fetchLeaderboard } from "../controllers/leaderboardController";
const router = express.Router();

router.get("/", fetchLeaderboard);

export default router;
