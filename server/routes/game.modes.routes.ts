import { Router } from "express";
import {
  fetchGameModes,
  fetchGameModeById,
} from "../controllers/game.modes.controllers";

const router = Router();

router.get("/", fetchGameModes);
router.get("/:gameModeId", fetchGameModeById);

export default router;
