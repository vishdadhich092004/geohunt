import express from "express";
import { createUser, validateToken } from "../controllers/user.controllers";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", createUser);
router.get("/validate-token", verifyToken, validateToken);

export default router;
