import { Request, Response } from "express";
import prisma from "../db/db.config";

/**
 * GET /api/analytics/:userId
 *
 * Returns enriched per-user statistics computed from finished games.
 * All heavy lifting is done in a single Prisma query + JS aggregation.
 */
export const getAnalytics = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Fetch all finished games with their guesses and current location for this user
  const games = await prisma.game.findMany({
    where: { userId, finishedAt: { not: null } },
    include: {
      guesses: { select: { distance: true } },
      currentLocation: { select: { latitude: true, longitude: true } },
    },
    orderBy: { startedAt: "asc" },
  });

  const totalGames = games.length;

  if (totalGames === 0) {
    return res.status(200).json({
      totalGames: 0,
      totalScore: 0,
      averageScore: 0,
      bestScore: 0,
      averageDistance: null,
      bestDistance: null,
      winRate: 0,
      currentStreak: 0,
      bestStreak: 0,
      mostPlayedContinent: null,
    });
  }

  let totalScore = 0;
  let bestScore = 0;
  let totalDistance = 0;
  let distanceCount = 0;
  let bestDistance: number | null = null;
  let wins = 0;
  const continentCounts: Record<string, number> = {};
  let bestStreak = 0;
  let tempStreak = 0;

  for (const game of games) {
    totalScore += game.score;
    if (game.score > bestScore) bestScore = game.score;

    for (const guess of game.guesses) {
      if (guess.distance !== null && guess.distance !== undefined) {
        totalDistance += guess.distance;
        distanceCount++;
        if (bestDistance === null || guess.distance < bestDistance) {
          bestDistance = guess.distance;
        }
      }
    }

    if (game.lives > 0) {
      wins++;
      tempStreak++;
      if (tempStreak > bestStreak) bestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }

    if (game.continent) {
      continentCounts[game.continent] =
        (continentCounts[game.continent] ?? 0) + 1;
    }
  }

  const currentStreak = tempStreak;

  const mostPlayedContinent =
    Object.keys(continentCounts).length > 0
      ? Object.entries(continentCounts).sort((a, b) => b[1] - a[1])[0][0]
      : null;

  const firstGame = games[0];
  const lastGame = games[games.length - 1];
  const playingSinceInDays = firstGame
    ? Math.floor(
      (Date.now() - new Date(firstGame.startedAt).getTime()) /
      (1000 * 60 * 60 * 24)
    )
    : 0;

  return res.status(200).json({
    // User info (for the profile card)
    user,
    // Game timeline (for the Journey Timeline and map cards)
    firstGame,
    lastGame,
    playingSinceInDays,
    // Aggregate stats
    totalGames,
    totalScore,
    averageScore: Math.round(totalScore / totalGames),
    bestScore,
    averageDistance:
      distanceCount > 0 ? Math.round(totalDistance / distanceCount) : null,
    bestDistance: bestDistance !== null ? Math.round(bestDistance) : null,
    winRate: Math.round((wins / totalGames) * 100),
    currentStreak,
    bestStreak,
    mostPlayedContinent,
  });
};
