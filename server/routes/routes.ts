import express from "express";
import locationRoutes from "./location.routes";
import gameRoutes from "./game.routes";
import guessRoutes from "./guess.routes";
import leaderboardRoutes from "./leaderboard.routes";
import userRoutes from "./user.routes";
import hintRoutes from "./hint.routes";
import analyticsRoutes from "./analytics.routes";
const router = express.Router();

router.use("/locations", locationRoutes);
router.use("/games", gameRoutes);
router.use("/guesses", guessRoutes);
router.use("/users", userRoutes);
router.use("/leaderboard", leaderboardRoutes);
router.use("/hints", hintRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
