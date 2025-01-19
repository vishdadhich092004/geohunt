import { Request, Response } from "express";
import { generateHint } from "../utils/gemini-services";
import { parseData } from "../utils/parse-data";

interface LocationQuery {
  lat?: string;
  lng?: string;
}
export const generateHintsForLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { lat, lng } = req.query as LocationQuery;
    if (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) {
      res.status(400).json({
        success: false,
        error: "Valid Latitude and Longitude are required",
      });
    }

    const prompt = `Generate an array of 3 fun and engaging hints for a location based on the given latitude and longitude. The hints should each be of a different type. 
Do NOT reveal the exact name of the location, as this is part of a guessing game. Ensure the hints are subtle yet informative enough to give players clues, use simple words to explain.
Latitude: ${lat}, Longitude:${lng}.

The Output should be an array with length 3 , where:
Index 0 gives hint about Geographical (describes the physical or natural aspects of the area).
Index 1 gives hint about Historical (highlights the history or significance of the place).
Index 2 gives hint about Cultural (focuses on local traditions, events, or lifestyle).

`;
    const result: string = await generateHint(prompt);
    const parsedResult = parseData(result);
    if (!result) {
      res.status(500).json({
        success: false,
        error: "No Hints can be found for this place",
      });
    }
    res.status(200).json({ success: true, data: parsedResult });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error Fetching Hints" });
  }
};
