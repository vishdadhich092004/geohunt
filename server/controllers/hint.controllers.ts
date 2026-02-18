import { Request, Response } from "express";
import { generateHint } from "../utils/gemini-services";

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
      return;
    }

    const prompt = `You are a hint generator for a competitive geography guessing game (similar to GeoGuessr).
A player is trying to identify a location from a Street View image.
The coordinates are: Latitude ${lat}, Longitude ${lng}.

Generate exactly 3 hints in INCREASING order of specificity (hint 1 is vaguest, hint 3 is most specific):

Hint 1 - VAGUE (Climate & Landscape): Describe only the broad physical environment — terrain type, vegetation, climate zone. Do NOT mention country, region, or any named place.
Example: "A flat, arid landscape with sparse shrubby vegetation and a wide, straight road under a harsh sun."

Hint 2 - MODERATE (Cultural & Architectural): Describe visible human elements — road signs style, architecture, vehicle types, infrastructure, language script on signs if any.
Example: "Road markings and signage follow a European style. Buildings are low-rise with terracotta roofs."

Hint 3 - SPECIFIC (Regional Identity): Give a strong regional clue — describe the broader geographic region, neighboring features, or well-known characteristics of the area WITHOUT naming the exact city or country.
Example: "This area is in the southern part of a large South American country known for its wine regions and Andean backdrop."

Rules:
- NEVER reveal the exact city, country name, or famous landmark names
- Each hint must be a single sentence, max 25 words
- Hints must be factually grounded — do not invent events or landmarks
- Focus on what a player could observe in a Street View image

Return ONLY a valid JSON array of exactly 3 strings. No explanation, no markdown, just the raw JSON array.
Example output: ["hint one here", "hint two here", "hint three here"]`;

    const result: string = await generateHint(prompt);

    if (!result) {
      res.status(500).json({
        success: false,
        error: "No hints could be generated for this location",
      });
      return;
    }

    const parsedResult: string[] = JSON.parse(result);
    res.status(200).json({ success: true, data: parsedResult });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error Fetching Hints" });
  }
};

