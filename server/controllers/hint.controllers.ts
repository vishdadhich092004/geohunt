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

    const prompt = `Act as a expert geoguessing game hint creator. Generate an array of 3 creative but approachable hints for a location based on these coordinates: Latitude ${lat}, Longitude ${lng}. The hints must follow this exact order:
    
    1. Geography: Describe general physical features and surroundings. Example: "Coastal area with sandy beaches and clusters of palm trees"
    2. Recent Events: Mention notable local happenings from last 2-3 years. Example: "Hosted a popular cultural festival featuring traditional music last spring"
    3. History: Reference historical significance without exact dates. Example: "Known for 19th-century architecture styles seen in town centers"
    
    Requirements:
    1. Hints should be distinct but slightly easier than professional-level clues
    2. Focus on observable features rather than deep knowledge
    3. Never reveal exact names or famous landmarks
    4. Use simple, conversational language
    5. Include subtle environmental clues
    6. Strictly maintain the order: Geography, Recent Events, History
    
    Output: Return ONLY a valid JavaScript array with 3 strings in the specified order. Keep hints brief but helpful. Use modern references like transportation types, common architecture styles, or popular local foods. Avoid technical terms. Example elements: bicycle paths, traditional roof designs, street food smells, common tree types.`;
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
