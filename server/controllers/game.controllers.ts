import { Request, Response } from "express";
import prisma from "../db/db.config";
import { GameType } from "../shared/types";
import generateRandomPopularLocation from "../utils/generate-random-location";
import { PopularAreasMap } from "../locations/locations";

interface ContinentAndCountry {
  continent?: string;
  country?: string;
  gameModeId?: string;
}
export const createGame = async (
  req: Request,
  res: Response
): Promise<GameType | any> => {
  try {
    const { continent, country, gameModeId } = req.query as ContinentAndCountry;

    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ message: "No User Found" });
    }

    if (!gameModeId) {
      return res.status(400).json({ message: "Game Mode Id is missing" });
    }
    const gameMode = await prisma.gameMode.findUnique({
      where: {
        id: gameModeId,
      },
    });
    if (!gameMode) {
      return res.status(404).json({ message: "Game Mode Not Found" });
    }

    let randomLocation;
    if (continent === "undefined" || country === "undefined") {
      randomLocation = await generateRandomPopularLocation();
      console.log("Random location:", randomLocation);
    } else {
      randomLocation = await generateRandomPopularLocation(
        continent as keyof PopularAreasMap,
        country || undefined
      );
    }

    if (!randomLocation || !randomLocation.lat || !randomLocation.lng) {
      console.error("Failed to generate a valid location", {
        continent: continent,
        country: country,
        randomLocation,
      });
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

        continent: continent,
        country: country,
        gameModeId: gameModeId,
        lives: gameMode.maxLives!,
        timeLimit: gameMode.timeLimit!,
        maxLocations: gameMode.maxLocations,
      },
      include: {
        currentLocation: true,
        guesses: true,
        gameMode: true,
      },
    });

    if (!game) {
      return res.status(404).json({ message: "Failed to create a game" });
    }
    const timeRemaining = gameMode.timeLimit
      ? gameMode.timeLimit -
        Math.floor((new Date().getTime() - game.startedAt.getTime()) / 1000)
      : null;
    return res.status(200).json({ ...game, timeRemaining });
  } catch (e) {
    console.error("Error creating game:", e);
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
      gameMode: true,
      guesses: true,
    },
  });
  if (!game) {
    return res.status(404).json({ message: "No Game Found" });
  }
  return res.status(200).json(game);
};
