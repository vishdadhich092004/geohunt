import { Request, Response } from "express";
import prisma from "../db/db.config";
import generateRandomPopularLocation from "../utils/generate-random-location";
import haversineDistance from "../utils/calculate-distance";
import calculateScore from "../utils/calculate-score";
import { PopularAreasMap } from "../locations/random/random";

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

  const distance = haversineDistance(
    latitude,
    longitude,
    game.currentLocation?.latitude!,
    game.currentLocation?.longitude!
  );
  const currentRoundScore = calculateScore(distance);

  // Update lives based on score
  let updatedLives = game.lives;
  if (currentRoundScore <= 3000) {
    updatedLives -= 1;
  } else if (currentRoundScore >= 4750) {
    updatedLives = Math.min(updatedLives + 1, 5); // Assuming max lives is 5
  }

  // Create the guess record
  const guess = await prisma.guess.create({
    data: {
      latitude,
      longitude,
      distance,
      score: currentRoundScore,
      game: {
        connect: { id: gameId },
      },
      user: {
        connect: { id: userId },
      },
    },
  });
  // Check for game over before proceeding with other operations
  if (updatedLives <= 0) {
    await prisma.game.update({
      where: { id: gameId },
      data: {
        lives: updatedLives,
        score: game.score + currentRoundScore,
        currentRoundScore: currentRoundScore,
        finishedAt: new Date(),
      },
    });
  }

  const nextLocation = await generateRandomPopularLocation(
    game.continent as keyof PopularAreasMap,
    game.country!
  );
  if (!nextLocation) {
    return res
      .status(404)
      .json({ error: "Issue with random location generation" });
  }
  const newLocation = await prisma.location.create({
    data: {
      latitude: nextLocation?.lat,
      longitude: nextLocation?.lng,
    },
  });

  const updatedGame = await prisma.game.update({
    where: { id: gameId },
    data: {
      currentLocation: {
        connect: { id: newLocation.id },
      },
      score: game.score + currentRoundScore,
      currentRoundScore: currentRoundScore,
      lives: updatedLives,
    },
    include: {
      currentLocation: true,
      guesses: true,
    },
  });

  res.status(200).json(updatedGame);
};
