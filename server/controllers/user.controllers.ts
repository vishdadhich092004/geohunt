import { Request, Response } from "express";
import prisma from "../db/db.config";
import jwt from "jsonwebtoken";
import { UserType } from "../shared/types";
import { JWTUser } from "../middleware/auth.middleware";

export const createUser = async (
  req: Request,
  res: Response
): Promise<UserType | any> => {
  const { username } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (findUser) {
    const token = jwt.sign(
      {
        userId: findUser.id,
        username: findUser.username,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(findUser);
  }
  const newUser = await prisma.user.create({
    data: {
      username: username,
      createdAt: new Date(),
    },
  });
  const token = jwt.sign(
    {
      userId: newUser.id,
      username: newUser.username,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("auth_token", token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.status(200).json(newUser);
};

export const validateToken = async (
  req: Request,
  res: Response
): Promise<JWTUser | any> => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Issue with validating Token" });
  }
};
