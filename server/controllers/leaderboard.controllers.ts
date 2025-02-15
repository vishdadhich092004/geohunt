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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;
    const skip = (page - 1) * limit;

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

    const paginatedUsers = rankedUsers.slice(skip, skip + limit);
    const total = rankedUsers.length;

    return res.status(200).json({
      data: paginatedUsers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error Fetching Leaderboard", error);
    return res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};
