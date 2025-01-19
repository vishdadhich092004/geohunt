import express from "express";
import { fetchLeaderboard } from "../controllers/leaderboard.controllers";
const router = express.Router();

router.get("/", fetchLeaderboard);

export default router;
