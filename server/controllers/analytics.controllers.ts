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
  const games = (
    await prisma.game.findMany({
      where: {
        userId: userId,
      },
    })
  ).sort((a, b) => a.startedAt.getTime() - b.startedAt.getTime());
  if (!games) {
    return res.status(404).json({ message: "No games found" });
  }
  const totalGames = games.length;
  const score = games.reduce((acc, game) => acc + game.score, 0);
  const firstGame = games[0];
  const lastGame = games[games.length - 1];
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
  });
};
