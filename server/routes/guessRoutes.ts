import express from "express";
import { createGuess } from "../controllers/guessController";
import { verifyToken } from "../middleware";

const router = express.Router();

router.post("/:gameId", verifyToken, createGuess);

export default router;
