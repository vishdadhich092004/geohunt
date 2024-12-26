import { Request, Response } from "express";
import prisma from "../db/db.config";
import { GameType } from "../shared/types";
import { generateRandomLocation } from "../utils/generateRandomLocation";

export const createGame = async (
  req: Request,
  res: Response
): Promise<GameType | any> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ message: "No User Found" });
    }
    const randomLocation = await generateRandomLocation();
    const firstLocation = await prisma.location.create({
      data: {
        latitude: randomLocation.randomLat,
        longitude: randomLocation.randomLon,
      },
    });
    const game = await prisma.game.create({
      data: {
        userId,
        score: 0,
        startedAt: new Date(),
        currentLocationId: firstLocation.id,
      },
      include: {
        currentLocation: true,
      },
    });
    if (!game) {
      return res.status(404).json({ message: "Failed to create a game" });
    }

    return res.status(200).json(game);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create a game" });
  }
};
