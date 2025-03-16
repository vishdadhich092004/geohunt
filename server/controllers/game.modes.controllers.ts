import { Request, Response } from "express";
import prisma from "../db/db.config";
import { GameModeType } from "../shared/types";
export const fetchGameModes = async (
  req: Request,
  res: Response
): Promise<GameModeType[] | any> => {
  try {
    const gameModes = await prisma.gameMode.findMany();
    if (!gameModes) {
      return res.status(404).json({ message: "No game modes found" });
    }
    const filteredGameModes = gameModes.filter(
      (mode) => mode.id !== "896f42c8-1445-4c2a-9fe5-30995c7c4ce3"
    );

    return res.status(200).json(filteredGameModes);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching game modes" });
  }
};
export const fetchGameModeById = async (
  req: Request,
  res: Response
): Promise<GameModeType | any> => {
  try {
    const { gameModeId } = req.params;
    if (!gameModeId) {
      return res.status(400).json({ message: "Game mode id is required" });
    }
    const gameMode = await prisma.gameMode.findUnique({
      where: { id: gameModeId },
    });
    if (!gameMode) {
      return res.status(404).json({ message: "Game mode not found" });
    }
    return res.status(200).json(gameMode);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching game mode" });
  }
};
