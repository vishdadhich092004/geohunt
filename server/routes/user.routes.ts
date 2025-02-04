import express from "express";
import {
  createPassword,
  createUser,
  loginUser,
  validateToken,
} from "../controllers/user.controllers";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", createUser);
router.get("/validate-token", verifyToken, validateToken);
router.post("/login", loginUser);
router.post("/create-password", createPassword);

export default router;
