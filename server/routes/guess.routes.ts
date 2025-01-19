import express from "express";
import { createGuess } from "../controllers/guess.controllers";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/:gameId", verifyToken, createGuess);

export default router;
