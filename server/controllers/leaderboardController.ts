import prisma from "../db/db.config";
import { Request, Response } from "express";

interface fetchLeaderboardOutput {
  id: string;
  username: string;
  totalScore: number;
}

export const fetchLeaderboard = async (
  req: Request,
  res: Response
): Promise<fetchLeaderboardOutput | any> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        games: {
          select: {
            score: true,
          },
        },
      },
    });
    const rankedUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      totalScore: user.games.reduce((sum, game) => sum + game.score, 0),
    }));
    rankedUsers.sort((a, b) => b.totalScore - a.totalScore);
    return res.status(200).json(rankedUsers);
  } catch (error) {
    console.error("Error Fetching Leaderboard", error);
    return res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};
