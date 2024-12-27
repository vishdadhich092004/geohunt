import express from "express";
import { createUser, validateToken } from "../controllers/userController";
import { verifyToken } from "../middleware";

const router = express.Router();

router.post("/", createUser);
router.get("/validate-token", verifyToken, validateToken);

export default router;
