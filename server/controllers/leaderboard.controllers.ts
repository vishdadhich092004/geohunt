import prisma from "../db/db.config";
import { Request, Response } from "express";

/**
 * GET /api/leaderboard?page=1&limit=15
 *
 * Ranks users by total score across all FINISHED games.
 * Uses a DB-level groupBy aggregate so we never load all rows into memory.
 */
export const fetchLeaderboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit as string) || 15)
    );
    const skip = (page - 1) * limit;

    // Step 1: Aggregate scores at the DB level — only finished games count
    const scoreSums = await prisma.game.groupBy({
      by: ["userId"],
      where: { finishedAt: { not: null } },
      _sum: { score: true },
      orderBy: { _sum: { score: "desc" } },
    });

    const total = scoreSums.length;

    // Step 2: Paginate the already-sorted result set
    const paginated = scoreSums.slice(skip, skip + limit);

    if (paginated.length === 0) {
      res.status(200).json({
        data: [],
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      });
      return;
    }

    // Step 3: Fetch only the usernames we need for this page
    const userIds = paginated.map((s) => s.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, username: true, createdAt: true },
    });

    const userMap = new Map(users.map((u) => [u.id, u]));

    // Step 4: Merge and return — preserve the score-sorted order
    const data = paginated.map((s) => {
      const user = userMap.get(s.userId);
      return {
        id: s.userId,
        username: user?.username ?? "Unknown",
        createdAt: user?.createdAt ?? null,
        totalScore: s._sum.score ?? 0,
      };
    });

    res.status(200).json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[leaderboard] Failed to fetch leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

