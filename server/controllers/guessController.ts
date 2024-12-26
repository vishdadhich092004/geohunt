import { Request, Response } from "express";
import prisma from "../db/db.config";
import { calculateDistance } from "../utils/calculateDistance";
import { GameType, GuessType, LocationType } from "../shared/types";
import { generateRandomLocation } from "../utils/generateRandomLocation";

interface createGuessOutput {
  guess: GuessType | null;
  game: GameType | null;
}

export const createGuess = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.user?.userId;
  const { gameId } = req.params;
  const { latitude, longitude } = req.body;

  if (!userId || !gameId) {
    return res.status(400).json({ error: "Missing userId or GameId" });
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      guesses: true,
      currentLocation: true,
    },
  });
  if (!game) {
    return res.status(404).json({ error: "Game Not Found" });
  }

  const distance = calculateDistance(
    latitude,
    longitude,
    game.currentLocation?.latitude!,
    game.currentLocation?.longitude!
  );
  const newScore =
    game.score + Math.max(0, 5000 - (Math.floor(distance) % 5000));

  const nextLocation = await generateRandomLocation();
  const newLocation = await prisma.location.create({
    data: {
      longitude: nextLocation.randomLon,
      latitude: nextLocation.randomLat,
    },
  });
  await prisma.game.update({
    where: { id: gameId },
    data: {
      currentLocationId: newLocation.id,
      score: newScore,
    },
  });

  res.status(200).json({ game });
};
