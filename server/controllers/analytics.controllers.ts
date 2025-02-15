import { Request, Response } from "express";
import prisma from "../db/db.config";

export const getAnalytics = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const games = await prisma.game.findMany({
    where: {
      userId: userId,
    },
    include: {
      currentLocation: true,
    },
  });

  if (!games || games.length === 0) {
    return res.status(200).json({
      totalGames: 0,
      firstGame: null,
      lastGame: null,
      playingSinceInDays: 0,
      averageScore: 0,
      user: user,
    });
  }

  // Sort after checking for empty array
  const sortedGames = games.sort(
    (a, b) => a.startedAt.getTime() - b.startedAt.getTime()
  );

  const totalGames = games.length;
  const score = games.reduce((acc, game) => acc + game.score, 0);
  const firstGame = sortedGames[0];
  const lastGame = sortedGames[sortedGames.length - 1];
  const playingSince = new Date(firstGame.startedAt);
  const playingSinceInDays = Math.floor(
    (new Date().getTime() - playingSince.getTime()) / (1000 * 60 * 60 * 24)
  );
  const averageScore = score / totalGames;

  return res.status(200).json({
    totalGames,
    firstGame,
    lastGame,
    playingSinceInDays,
    averageScore,
    user, // Include user information in the response
  });
};
