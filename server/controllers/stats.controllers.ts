import { Request, Response } from "express";
import prisma from "../db/db.config";

/**
 * GET /api/stats/public
 * Returns aggregate platform stats — no auth required.
 * Uses parallel Prisma count queries for minimal latency.
 */
export const getPublicStats = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const [totalUsers, totalGames, totalGuesses] = await Promise.all([
      prisma.user.count(),
      prisma.game.count({ where: { finishedAt: { not: null } } }),
      prisma.guess.count(),
    ]);

    res.status(200).json({ totalUsers, totalGames, totalGuesses });
  } catch (error) {
    console.error("[stats] Failed to fetch public stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
