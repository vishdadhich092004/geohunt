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

    // Abandon any unfinished games for this user before starting a new one
    await prisma.game.updateMany({
      where: { userId, finishedAt: null },
      data: { finishedAt: new Date() },
    });

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
  // Security check: ensure the user owns this game
  if (game.userId !== req.user.userId) {
    return res.status(403).json({ error: "Unauthorized access to this game" });
  }
  return res.status(200).json(game);
};

export const fetchGameHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  // Security check: ensure requesting user matches the route param
  if (req.user.userId !== userId) {
    return res.status(403).json({ error: "Unauthorized to view this history" });
  }

  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(20, parseInt(req.query.limit as string) || 10);
  const skip = (page - 1) * limit;

  const [games, total] = await Promise.all([
    prisma.game.findMany({
      where: { userId, finishedAt: { not: null } },
      orderBy: { finishedAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        score: true,
        continent: true,
        country: true,
        startedAt: true,
        finishedAt: true,
        lives: true,
        gameMode: { select: { name: true } },
        _count: { select: { guesses: true } },
      },
    }),
    prisma.game.count({ where: { userId, finishedAt: { not: null } } }),
  ]);

  return res.status(200).json({
    games,
    meta: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
};
