import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JWTUser {
  userId: string;
  username: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        username: string;
      };
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized, No token" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JWTUser;
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e);
    res.status(403).json({ error: "Forbidden, Invalid Token" });
  }
};
