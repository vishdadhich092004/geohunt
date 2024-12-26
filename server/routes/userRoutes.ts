import express from "express";
import { createUser, validateToken } from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);
router.get("/validate-token", validateToken);

export default router;
