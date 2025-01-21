import { Request, Response } from "express";
import prisma from "../db/db.config";
import { GameType } from "../shared/types";
import generateRandomPopularLocation from "../utils/generate-random-location";

export const createGame = async (
  req: Request,
  res: Response
): Promise<GameType | any> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ message: "No User Found" });
    }
    const randomLocation = await generateRandomPopularLocation(
      "europe",
      "sweden"
    );

    if (!randomLocation || !randomLocation.lat || !randomLocation.lng) {
      console.error("Failed to generate a valid location");
      return res
        .status(500)
        .json({ error: "Failed to generate a valid location" });
    }

    const firstLocation = await prisma.location.create({
      data: {
        latitude: randomLocation.lat,
        longitude: randomLocation.lng,
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

export const fetchGame = async (
  req: Request,
  res: Response
): Promise<GameType | any> => {
  const { gameId } = req.params;
  if (!gameId) {
    return res.status(400).json({ error: "Game Id is missing" });
  }
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      currentLocation: true,
    },
  });
  if (!game) {
    return res.status(404).json({ message: "No Game Found" });
  }
  return res.status(200).json(game);
};
