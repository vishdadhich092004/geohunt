import { Request, Response } from "express";
import prisma from "../db/db.config";
import jwt from "jsonwebtoken";
import { UserType } from "../shared/types";
import { JWTUser } from "../middleware/auth.middleware";
import bcrypt from "bcrypt";

export const loginUser = async (
  req: Request,
  res: Response
): Promise<UserType | any> => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No User Found with username: ", username });
    }

    if (!user.password) {
      return res
        .status(200)
        .json({ redirect: "/create-password", userId: user.id });
    }
    //  if password exists check if its correct
    const isMatch = await bcrypt.compare(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
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
    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

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
    return res.status(401).json({ message: "User Already exists" });
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

export const createPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update the user's password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password created successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
