import { Request, Response } from "express";
import prisma from "../db/db.config";
import { LocationType } from "../shared/types";

export const fetchLocations = async (
  req: Request,
  res: Response
): Promise<LocationType[] | any> => {
  try {
    const locations = await prisma.location.findMany({});

    if (!locations) {
      return res.status(404).json({ message: "No Locations Found" });
    }
    res.status(200).json(locations);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};
