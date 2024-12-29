import { Request, Response } from "express";
import prisma from "../db/db.config";
import { calculateDistance } from "../utils/calculateDistance";
import generateRandomPopularLocation from "../utils/generateRandomLocation";

export const createGuess = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.user?.userId;
  const { gameId } = req.params;
  const { latitude, longitude } = req.body;

  if (!userId || !gameId) {
    return res.status(400).json({ error: "Missing userId or gameId" });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid latitude or longitude" });
  }

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      guesses: true,
      currentLocation: true,
    },
  });

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  const distance = calculateDistance(
    latitude,
    longitude,
    game.currentLocation?.latitude!,
    game.currentLocation?.longitude!
  );

  const newScore =
    game.score + Math.max(0, 5000 - (Math.floor(distance) % 5000));

  const nextLocation = await generateRandomPopularLocation();
  if (!nextLocation) {
    return res
      .status(404)
      .json({ error: "Issue with random location generation" });
  }
  const newLocation = await prisma.location.create({
    data: {
      longitude: nextLocation?.lat,
      latitude: nextLocation?.lng,
    },
  });

  const updatedGame = await prisma.game.update({
    where: { id: gameId },
    data: {
      currentLocation: {
        connect: { id: newLocation.id },
      },
      score: newScore,
    },
    include: {
      currentLocation: true,
    },
  });

  res.status(200).json(updatedGame);
};
